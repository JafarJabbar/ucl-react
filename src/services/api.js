import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export const leagueAPI = {
    getStandings: () => apiClient.get('/standings'),
    getMatches: (week) => apiClient.get(`/matches${week ? `/${week}` : ''}`),
    playNextWeek: () => apiClient.post('/play-week'),
    playAllRemaining: () => apiClient.post('/play-all'),
    getPredictions: () => apiClient.get('/predictions'),
    updateMatch: (id, result) => apiClient.put(`/matches/${id}`, result),
    resetAll: () => apiClient.post('/reset-all'),
};

export const teamAPI = {
    getTeams: () => apiClient.get('/teams'),

    addTeam: (teamData) => apiClient.post('/teams', teamData),

    importTeamsFromJson: (data) => apiClient.post('/teams/import-json', data),
    deleteTeam: (id) => apiClient.delete(`/teams/${id}`),

    clearAllTeams: () => apiClient.delete('/teams/clear-all'),

    generateFixtures: (data) => apiClient.post('/fixtures/generate', data),

    previewFixtures: (rounds = 2) => apiClient.get(`/fixtures/preview?rounds=${rounds}`),

    validateFixtures: () => apiClient.get('/fixtures/validate'),
};