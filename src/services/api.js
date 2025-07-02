import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

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
};