import React, { useState } from 'react';
import { leagueAPI } from '../services/api';

const EditableMatch = ({ match, onUpdate }) => {
    const [homeGoals, setHomeGoals] = useState(match.home_goals || 0);
    const [awayGoals, setAwayGoals] = useState(match.away_goals || 0);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            await leagueAPI.updateMatch(match.id, {
                home_goals: homeGoals,
                away_goals: awayGoals
            });
            onUpdate();
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating match:', error);
            alert('Error updating match result');
        }
        setLoading(false);
    };

    const getResultDisplay = () => {
        if (match.is_finished ) {
            return `${match.home_goals}-${match.away_goals}`;
        }
        return 'vs';
    };

    if (isEditing) {
        return (
            <div className="match-item" style={{ backgroundColor: '#e3f2fd', borderColor: '#2196f3' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontWeight: 'bold', width: '120px', textAlign: 'right' }}>
            {match.home_team.name}
          </span>
                    <input
                        type="number"
                        value={homeGoals}
                        onChange={(e) => setHomeGoals(parseInt(e.target.value) || 0)}
                        style={{ width: '50px', textAlign: 'center', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}
                        min="0"
                        max="10"
                    />
                    <span style={{ fontWeight: 'bold', fontSize: '18px' }}>-</span>
                    <input
                        type="number"
                        value={awayGoals}
                        onChange={(e) => setAwayGoals(parseInt(e.target.value) || 0)}
                        style={{ width: '50px', textAlign: 'center', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}
                        min="0"
                        max="10"
                    />
                    <span style={{ fontWeight: 'bold', width: '120px' }}>
            {match.away_team.name}
          </span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="btn btn-success"
                        style={{ fontSize: '12px', padding: '5px 10px' }}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="btn btn-secondary"
                        style={{ fontSize: '12px', padding: '5px 10px' }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={() => setIsEditing(true)}
            className="match-item"
            style={{
                backgroundColor: match.is_finished ? '#e8f5e8' : '#f8f9fa',
                borderColor: match.is_finished  ? '#28a745' : '#dee2e6'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontWeight: 'bold', width: '120px', textAlign: 'right' }}>
          {match.home_team.name}
        </span>
                <span style={{ fontWeight: 'bold', fontSize: '18px', minWidth: '40px', textAlign: 'center' }}>
          {getResultDisplay()}
        </span>
                <span style={{ fontWeight: 'bold', width: '120px' }}>
          {match.away_team.name}
        </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
            padding: '3px 8px',
            borderRadius: '3px',
            fontSize: '12px',
            backgroundColor: match.is_finished ? '#d4edda' : '#fff3cd',
            color: match.is_finished ? '#155724' : '#856404'
        }}>
          {match.is_finished ? 'Completed' : 'Pending'}
        </span>
                <span style={{ fontSize: '12px', color: '#666' }}>Click to edit</span>
            </div>
        </div>
    );
};

export default EditableMatch;