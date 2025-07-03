import React from 'react';

const Predictions = ({ predictions }) => {
    const predictionData = Array.isArray(predictions) ?
        { predictions: predictions, season_complete: false } :
        predictions;

    const { predictions: predictionsList, season_complete } = predictionData;
    const sortedPredictions = [...predictionsList].sort((a, b) => {
        if (season_complete) {
            return a.final_position - b.final_position;
        }
        return b.projected_points - a.projected_points;
    });

    return (
        <div className="card">
            <h2>
                {season_complete ? '🏆 Final Season Results' : '🔮 Final Predictions'}
            </h2>

            {season_complete && (
                <div style={{
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '15px',
                    textAlign: 'center'
                }}>
                    🎉 Season Complete! Here are the final standings.
                </div>
            )}

            <div>
                {sortedPredictions.map((prediction, index) => (
                    <div key={prediction.team_id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '15px',
                        backgroundColor: season_complete ?
                            (index === 0 ? '#fff3cd' : '#f8f9fa') : '#f8f9fa',
                        borderRadius: '5px',
                        marginBottom: '10px',
                        border: season_complete && index === 0 ? '2px solid #ffc107' : 'none'
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    marginRight: '10px'
                                }}>
                                    {season_complete ? prediction.final_position : (index + 1)}.
                                </span>
                                <span style={{ fontWeight: 'bold' }}>
                                    {prediction.team_name}
                                    {season_complete && index === 0 && ' 👑'}
                                </span>
                            </div>
                            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                                {season_complete ? (
                                    <>Final Points: {prediction.current_points}</>
                                ) : (
                                    <>Current: {prediction.current_points} pts → Projected: {prediction.projected_points.toFixed(1)} pts</>
                                )}
                            </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <div style={{
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: season_complete ?
                                    (index === 0 ? '#28a745' : '#6c757d') : '#6f42c1'
                            }}>
                                {season_complete ? (
                                    index === 0 ? 'CHAMPION!' : `${getPositionSuffix(prediction.final_position)} Place`
                                ) : (
                                    `${(prediction.championship_probability * 100).toFixed(0)}%`
                                )}
                            </div>
                            {!season_complete && (
                                <div style={{ fontSize: '12px', color: '#666' }}>championship</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {predictionsList.length === 0 && (
                <div className="text-center" style={{ padding: '40px', color: '#666' }}>
                    No predictions available. Play some matches first!
                </div>
            )}
        </div>
    );
};

const getPositionSuffix = (position) => {
    if (position === 1) return '1st';
    if (position === 2) return '2nd';
    if (position === 3) return '3rd';
    return `${position}th`;
};

export default Predictions;