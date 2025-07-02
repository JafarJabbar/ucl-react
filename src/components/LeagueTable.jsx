import React from 'react';

const LeagueTable = ({ standings }) => {
    return (
        <div className="card">
            <h2>📊 League Table</h2>

            <table className="table">
                <thead>
                <tr>
                    <th>Pos</th>
                    <th>Team</th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GD</th>
                    <th>Pts</th>
                </tr>
                </thead>
                <tbody>
                {standings.map((standing, index) => (
                    <tr key={standing.team.id}>
                        <td>
                <span style={{
                    display: 'inline-block',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    color: 'white',
                    textAlign: 'center',
                    lineHeight: '24px',
                    fontSize: '12px',
                    backgroundColor: index === 0 ? '#ffc107' : index === 1 ? '#6c757d' : index === 2 ? '#fd7e14' : '#dee2e6'
                }}>
                  {index + 1}
                </span>
                        </td>
                        <td>
                            <strong>{standing.team.name}</strong>
                            <small style={{ marginLeft: '10px', color: '#666' }}>
                                {standing.team.short_name}
                            </small>
                        </td>
                        <td>{standing.played}</td>
                        <td className="text-green">{standing.won}</td>
                        <td style={{ color: '#ffc107' }}>{standing.drawn}</td>
                        <td className="text-red">{standing.lost}</td>
                        <td className={standing.goal_difference >= 0 ? 'text-green' : 'text-red'}>
                            {standing.goal_difference > 0 ? '+' : ''}{standing.goal_difference}
                        </td>
                        <td className="text-blue"><strong>{standing.points}</strong></td>
                    </tr>
                ))}
                </tbody>
            </table>

            {standings.length === 0 && (
                <div className="text-center" style={{ padding: '40px', color: '#666' }}>
                    No standings data available
                </div>
            )}
        </div>
    );
};

export default LeagueTable;