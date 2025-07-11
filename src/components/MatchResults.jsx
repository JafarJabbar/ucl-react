import React from 'react';
import EditableMatch from './EditableMatch';

const MatchResults = ({ matches, currentWeek, onMatchUpdate }) => {
    const weekMatches = matches.filter(match => match.week === currentWeek);

    return (
        <div className="card">
            <h2>⚽ Week {currentWeek} Matches</h2>

            <div>
                {weekMatches.map(match => (
                    <EditableMatch
                        key={match.id}
                        match={match}
                        onUpdate={onMatchUpdate}
                    />
                ))}
            </div>

            {weekMatches.length === 0 && (
                <div className="text-center" style={{ padding: '40px', color: '#666' }}>
                    No matches for this week
                </div>
            )}
        </div>
    );
};

export default MatchResults;