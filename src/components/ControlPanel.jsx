import React, { useState } from 'react';
import { leagueAPI } from '../services/api';

const ControlPanel = ({ onDataUpdate, onPredictionsUpdate, matches }) => {
    const [loading, setLoading] = useState(false);

    const hasPendingMatches = matches.some(match => !match.is_finished);

    const pendingMatches = matches.filter(m => !m.is_finished);
    const currentWeek = pendingMatches.length > 0 ? Math.min(...pendingMatches.map(m => m.week)) : null;
    const hasNextWeek = currentWeek !== null && pendingMatches.some(m => m.week === currentWeek);

    const allMatchesCompleted = matches.length > 0 && matches.every(match => match.is_finished);

    const completedMatches = matches.filter(m => m.is_finished).length;
    const totalMatches = matches.length;

    const playNextWeek = async () => {
        if (!hasNextWeek || allMatchesCompleted) {
            alert('Cannot play next week: All matches have been completed!');
            return;
        }

        setLoading(true);
        try {
            const response = await leagueAPI.playNextWeek();
            onDataUpdate();
            alert(response.data.message || 'Next week completed successfully!');
        } catch (error) {
            console.error('Error playing next week:', error);
            const errorMessage = error.response?.data?.message || 'Error playing next week';
            alert(errorMessage);
        }
        setLoading(false);
    };

    const playAllRemaining = async () => {
        if (!hasPendingMatches || allMatchesCompleted) {
            alert('Cannot play remaining matches: All matches have been completed!');
            return;
        }

        setLoading(true);
        try {
            const response = await leagueAPI.playAllRemaining();
            onDataUpdate();
            onPredictionsUpdate();
            alert(response.data.message || 'All matches completed!');
        } catch (error) {
            console.error('Error playing all matches:', error);
            const errorMessage = error.response?.data?.message || 'Error playing all matches';
            alert(errorMessage);
        }
        setLoading(false);
    };

    const loadPredictions = async () => {
        setLoading(true);
        try {
            await onPredictionsUpdate();
        } catch (error) {
            console.error('Error loading predictions:', error);
            alert('Error loading predictions');
        }
        setLoading(false);
    };

    const resetAll = async () => {
        if (!window.confirm('Are you sure you want to reset all matches and standings? This action cannot be undone.')) {
            return;
        }

        setLoading(true);
        try {
            await leagueAPI.resetAll();
            onDataUpdate();
            onPredictionsUpdate([]);
            alert('All matches and standings have been reset successfully!');
        } catch (error) {
            console.error('Error resetting all data:', error);
            alert('Error resetting all data');
        }
        setLoading(false);
    };

    const getButtonText = (baseText, loadingText, disabledReason) => {
        if (loading) return loadingText;
        if (disabledReason) return `${baseText} (${disabledReason})`;
        return baseText;
    };

    return (
        <div className="card">
            <h2>🎮 Control Panel</h2>

            {allMatchesCompleted && (
                <div style={{
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '15px',
                    textAlign: 'center'
                }}>
                    🏆 All matches completed! Season finished.
                </div>
            )}

            <div className="grid grid-2">
                <button
                    onClick={playNextWeek}
                    disabled={loading || !hasNextWeek || allMatchesCompleted}
                    className={`btn ${(!hasNextWeek || allMatchesCompleted) ? 'btn-secondary' : 'btn-primary'}`}
                    title={!hasNextWeek ? 'No more weeks to play' : allMatchesCompleted ? 'All matches completed' : ''}
                >
                    {getButtonText('⏭️ Play Next Week', 'Playing...',
                        allMatchesCompleted ? 'Season Complete' : !hasNextWeek ? 'No Next Week' : null)}
                </button>

                <button
                    onClick={playAllRemaining}
                    disabled={loading || !hasPendingMatches || allMatchesCompleted}
                    className={`btn ${(!hasPendingMatches || allMatchesCompleted) ? 'btn-secondary' : 'btn-success'}`}
                    title={allMatchesCompleted ? 'All matches already completed' : !hasPendingMatches ? 'No pending matches' : ''}
                >
                    {getButtonText('⏩ Play All Remaining', 'Playing...',
                        allMatchesCompleted ? 'Season Complete' : !hasPendingMatches ? 'No Pending' : null)}
                </button>

                <button
                    onClick={loadPredictions}
                    disabled={loading}
                    className="btn btn-warning"
                >
                    {loading ? 'Loading...' : '🔮 Show Predictions'}
                </button>

                <button
                    onClick={resetAll}
                    disabled={loading}
                    className="btn btn-danger"
                >
                    {loading ? 'Resetting...' : '🔄 Reset All'}
                </button>
            </div>

            <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
                <div>
                    📊 Status: {completedMatches} / {totalMatches} matches completed
                    {totalMatches > 0 && (
                        <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                            ({Math.round((completedMatches / totalMatches) * 100)}%)
                        </span>
                    )}
                </div>
                {hasNextWeek && !allMatchesCompleted && (
                    <div>
                        ⏭️ Next Week: {currentWeek} ({pendingMatches.filter(m => m.week === currentWeek).length} matches)
                    </div>
                )}
                {!hasPendingMatches && totalMatches > 0 && (
                    <div style={{ color: '#28a745', fontWeight: 'bold' }}>
                        ✅ All matches have been played!
                    </div>
                )}
                {totalMatches === 0 && (
                    <div style={{ color: '#ffc107', fontWeight: 'bold' }}>
                        ⚠️ No matches available. Please reset to initialize.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ControlPanel;