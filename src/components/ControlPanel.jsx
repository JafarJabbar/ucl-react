import React, { useState } from 'react';
import { leagueAPI } from '../services/api';

const ControlPanel = ({ onDataUpdate, onPredictionsUpdate }) => {
    const [loading, setLoading] = useState(false);

    const playNextWeek = async () => {
        setLoading(true);
        try {
            await leagueAPI.playNextWeek();
            onDataUpdate();
            alert('Next week completed successfully!');
        } catch (error) {
            console.error('Error playing next week:', error);
            alert('Error playing next week');
        }
        setLoading(false);
    };

    const playAllRemaining = async () => {
        setLoading(true);
        try {
            await leagueAPI.playAllRemaining();
            onDataUpdate();
            onPredictionsUpdate();
            alert('All matches completed!');
        } catch (error) {
            console.error('Error playing all matches:', error);
            alert('Error playing all matches');
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

    return (
        <div className="card">
            <h2>🎮 Control Panel</h2>

            <div className="grid grid-3">
                <button
                    onClick={playNextWeek}
                    disabled={loading}
                    className="btn btn-primary"
                >
                    {loading ? 'Playing...' : '⏭️ Play Next Week'}
                </button>

                <button
                    onClick={playAllRemaining}
                    disabled={loading}
                    className="btn btn-success"
                >
                    {loading ? 'Playing...' : '⏩ Play All Remaining'}
                </button>

                <button
                    onClick={loadPredictions}
                    disabled={loading}
                    className="btn btn-warning"
                >
                    {loading ? 'Loading...' : '🔮 Show Predictions'}
                </button>
            </div>
        </div>
    );
};

export default ControlPanel;