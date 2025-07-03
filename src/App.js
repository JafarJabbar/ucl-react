import React, { useState, useEffect } from 'react';
import LeagueTable from './components/LeagueTable';
import MatchResults from './components/MatchResults';
import WeekNavigation from './components/WeekNavigation';
import Predictions from './components/Predictions';
import ControlPanel from './components/ControlPanel';
import { leagueAPI } from './services/api';

function App() {
  const [standings, setStandings] = useState([]);
  const [matches, setMatches] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <h1 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#007bff' }}>
          ⚽ Champions League Simulation
        </h1>

        <div className="grid grid-2">
          <div>
            <ControlPanel
                onDataUpdate={loadData}
                onPredictionsUpdate={handlePredictionsUpdate}
                matches={matches}
            />
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
          </div>

          <div>
            <LeagueTable standings={standings} />
            {(Array.isArray(predictions) && predictions.length > 0) ||
            (predictions && predictions.predictions && predictions.predictions.length > 0) ? (
                <Predictions predictions={predictions} />
            ) : null}
          </div>
        </div>
      </div>
  );
}

export default App;