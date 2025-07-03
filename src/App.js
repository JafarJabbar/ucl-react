import React, { useState, useEffect } from 'react';
import LeagueTable from './components/LeagueTable';
import MatchResults from './components/MatchResults';
import WeekNavigation from './components/WeekNavigation';
import Predictions from './components/Predictions';
import ControlPanel from './components/ControlPanel';
import TeamManagement from './components/TeamManagement';
import { leagueAPI } from './services/api';

function App() {
  const [standings, setStandings] = useState([]);
  const [matches, setMatches] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('league'); // 'league' or 'management'

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [standingsRes, matchesRes] = await Promise.all([
        leagueAPI.getStandings(),
        leagueAPI.getMatches()
      ]);

      setStandings(standingsRes.data.results);
      setMatches(matchesRes.data.results);

      // Set current week to first week with matches if available
      if (matchesRes.data.results.length > 0) {
        const weeks = [...new Set(matchesRes.data.results.map(match => match.week))].sort();
        setCurrentWeek(weeks[0]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const loadPredictions = async () => {
    try {
      const response = await leagueAPI.getPredictions();
      const predictionData = response.data.results;
      setPredictions(predictionData);
    } catch (error) {
      console.error('Error loading predictions:', error);
    }
  };

  const clearPredictions = () => {
    setPredictions([]);
  };

  const handlePredictionsUpdate = (data) => {
    if (Array.isArray(data) || (data && typeof data === 'object')) {
      setPredictions(data);
    } else {
      loadPredictions();
    }
  };

  if (loading) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>Loading...</div>
        </div>
    );
  }

  return (
      <div className="container">
        <h1 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#007bff' }}>
          ⚽ Champions League Simulation
        </h1>

        {/* Tab Navigation */}
        <div style={{ marginBottom: '20px', borderBottom: '1px solid #ddd' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button
                onClick={() => setActiveTab('league')}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderBottom: activeTab === 'league' ? '3px solid #007bff' : '3px solid transparent',
                  background: 'transparent',
                  color: activeTab === 'league' ? '#007bff' : '#666',
                  fontWeight: activeTab === 'league' ? 'bold' : 'normal',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
            >
              🏆 League Management
            </button>
            <button
                onClick={() => setActiveTab('management')}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderBottom: activeTab === 'management' ? '3px solid #007bff' : '3px solid transparent',
                  background: 'transparent',
                  color: activeTab === 'management' ? '#007bff' : '#666',
                  fontWeight: activeTab === 'management' ? 'bold' : 'normal',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
            >
              ⚙️ Team & Fixture Setup
            </button>
          </div>
        </div>

        {activeTab === 'league' && (
            <div className="grid grid-2">
              <div>
                <ControlPanel
                    onDataUpdate={loadData}
                    onPredictionsUpdate={handlePredictionsUpdate}
                    matches={matches}
                />

                {matches.length > 0 && (
                    <>
                      <WeekNavigation
                          currentWeek={currentWeek}
                          onWeekChange={setCurrentWeek}
                          matches={matches}
                      />
                      <MatchResults
                          matches={matches}
                          currentWeek={currentWeek}
                          onMatchUpdate={loadData}
                      />
                    </>
                )}

                {matches.length === 0 && (
                    <div className="card">
                      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                        <h3>No matches available</h3>
                        <p>Switch to "Team & Fixture Setup" tab to add teams and generate fixtures.</p>
                      </div>
                    </div>
                )}
              </div>

              <div>
                <LeagueTable standings={standings} />

                {(Array.isArray(predictions) && predictions.length > 0) ||
                (predictions && predictions.predictions && predictions.predictions.length > 0) ? (
                    <Predictions predictions={predictions} />
                ) : null}
              </div>
            </div>
        )}

        {activeTab === 'management' && (
            <div>
              <TeamManagement onDataUpdate={loadData} />
            </div>
        )}
      </div>
  );
}

export default App;