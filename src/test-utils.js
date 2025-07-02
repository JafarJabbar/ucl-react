import { render } from '@testing-library/react';

export const mockTeams = [
    { id: 1, name: 'Chelsea', short_name: 'CHE', strength_rating: 0.85 },
    { id: 2, name: 'Arsenal', short_name: 'ARS', strength_rating: 0.82 },
    { id: 3, name: 'Manchester City', short_name: 'MCI', strength_rating: 0.90 },
    { id: 4, name: 'Liverpool', short_name: 'LIV', strength_rating: 0.88 }
];

export const mockStandings = [
    {
        id: 1,
        team_id: 3,
        team: mockTeams[2], // Man City
        points: 9,
        played: 3,
        won: 3,
        drawn: 0,
        lost: 0,
        goals_for: 8,
        goals_against: 2,
        goal_difference: 6,
        position: 1
    },
    {
        id: 2,
        team_id: 1,
        team: mockTeams[0], // Chelsea
        points: 6,
        played: 3,
        won: 2,
        drawn: 0,
        lost: 1,
        goals_for: 5,
        goals_against: 3,
        goal_difference: 2,
        position: 2
    }
];

export const mockMatches = [
    {
        id: 1,
        team_home_id: 1,
        team_away_id: 2,
        home_team: mockTeams[0], // Chelsea
        away_team: mockTeams[1], // Arsenal
        home_goals: 2,
        away_goals: 1,
        week: 1,
        status: 'completed'
    },
    {
        id: 2,
        team_home_id: 3,
        team_away_id: 4,
        home_team: mockTeams[2], // Man City
        away_team: mockTeams[3], // Liverpool
        home_goals: null,
        away_goals: null,
        week: 2,
        status: 'pending'
    }
];

export const mockPredictions = [
    {
        team_id: 3,
        team_name: 'Manchester City',
        current_points: 9,
        projected_points: 15.5,
        championship_probability: 0.8
    },
    {
        team_id: 1,
        team_name: 'Chelsea',
        current_points: 6,
        projected_points: 12.3,
        championship_probability: 0.3
    }
];

export const customRender = (ui, options = {}) => {
    return render(ui, {
        ...options,
    });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };