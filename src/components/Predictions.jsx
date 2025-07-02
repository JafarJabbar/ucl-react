import React from 'react';

const Predictions = ({ predictions }) => {
    const sortedPredictions = [...predictions].sort((a, b) => b.projected_points - a.projected_points);

    return (
        <div className="card">
            <h2>🔮 Final Predictions</h2>

            <div>
                {sortedPredictions.map((prediction, index) => (
                    <div key={prediction.team_id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '15px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '5px',
                        marginBottom: '10px'
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '18px', marginRight: '10px' }}>
                  {index + 1}.
                </span>
                                <span style={{ fontWeight: 'bold' }}>{prediction.team_name}</span>
                            </div>
                            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                                Current: {prediction.current_points} pts → Projected: {prediction.projected_points.toFixed(1)} pts
                            </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#6f42c1' }}>
                                {(prediction.championship_probability * 100).toFixed(0)}%
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>championship</div>
                        </div>
                    </div>
                ))}
            </div>

            {predictions.length === 0 && (
                <div className="text-center" style={{ padding: '40px', color: '#666' }}>
                    No predictions available. Play some matches first!
                </div>
            )}
        </div>
    );
};

export default Predictions;