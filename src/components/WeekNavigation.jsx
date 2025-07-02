import React from 'react';

const WeekNavigation = ({ currentWeek, onWeekChange, matches }) => {
    console.log(matches)
    const weeks = [...new Set(matches.map(match => match.week))].sort();

    return (
        <div className="card">
            <h3>📅 Select Week</h3>

            <div className="week-nav">
                {weeks.map(week => {
                    const weekMatches = matches.filter(m => m.week === week);
                    const completedMatches = weekMatches.filter(m => m.is_finished).length;
                    const totalMatches = weekMatches.length;

                    return (
                        <button
                            key={week}
                            onClick={() => onWeekChange(week)}
                            className={`week-btn ${currentWeek === week ? 'active' : ''}`}
                        >
                            <div>
                                <div><strong>Week {week}</strong></div>
                                <div style={{ fontSize: '12px', opacity: 0.7 }}>
                                    {completedMatches}/{totalMatches} played
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default WeekNavigation;