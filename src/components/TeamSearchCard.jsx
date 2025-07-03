import React, { useState } from 'react';

const TeamSearchCard = ({ team, onAdd, isAdded, isLoading }) => {
    const [strength, setStrength] = useState(0.75);

    const handleAdd = () => {
        onAdd({
            ...team,
            strength_rating: strength
        });
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px',
            backgroundColor: isAdded ? '#e9ecef' : 'white',
            borderRadius: '8px',
            border: '1px solid #ddd',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                {team.logo_url && (
                    <img
                        src={team.logo_url}
                        alt={team.name}
                        style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'contain',
                            borderRadius: '4px'
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                )}
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                        {team.name}
                    </div>
                    <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                        {team.short_name} • {team.area}
                        {team.founded && ` • Founded: ${team.founded}`}
                    </div>
                    {!isAdded && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <label style={{ fontSize: '12px', color: '#666' }}>
                                Strength:
                            </label>
                            <input
                                type="range"
                                min="0.1"
                                max="1.0"
                                step="0.05"
                                value={strength}
                                onChange={(e) => setStrength(parseFloat(e.target.value))}
                                style={{ width: '100px' }}
                            />
                            <span style={{ fontSize: '12px', fontWeight: 'bold', minWidth: '35px' }}>
                                {strength.toFixed(2)}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginLeft: '15px' }}>
                <button
                    onClick={handleAdd}
                    disabled={isLoading || isAdded}
                    className={`btn ${isAdded ? 'btn-secondary' : 'btn-success'}`}
                    style={{
                        fontSize: '13px',
                        padding: '8px 16px',
                        minWidth: '100px'
                    }}
                >
                    {isAdded ? '✅ Added' : isLoading ? 'Adding...' : '+ Add Team'}
                </button>
            </div>
        </div>
    );
};

export default TeamSearchCard;