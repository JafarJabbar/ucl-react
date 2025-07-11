import React, { useState, useEffect } from 'react';
import { teamAPI } from '../services/api';

const TeamManagement = ({ onDataUpdate }) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showJsonImport, setShowJsonImport] = useState(false);
    const [fixturePreview, setFixturePreview] = useState(null);
    const [showFixturePreview, setShowFixturePreview] = useState(false);

    const [newTeam, setNewTeam] = useState({
        name: '',
        short_name: '',
        strength_rating: 0.5,
        logo_url: ''
    });

    const [jsonInput, setJsonInput] = useState('');
    const [rounds, setRounds] = useState(2);

    useEffect(() => {
        loadTeams();
    }, []);

    const loadTeams = async () => {
        try {
            const response = await teamAPI.getTeams();
            setTeams(response.data.results || []);
        } catch (error) {
            console.error('Error loading teams:', error);
        }
    };

    const handleAddTeam = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await teamAPI.addTeam(newTeam);
            await loadTeams();
            setNewTeam({ name: '', short_name: '', strength_rating: 0.5, logo_url: '' });
            setShowAddForm(false);
            alert('Team added successfully!');
        } catch (error) {
            console.error('Error adding team:', error);
            const errorMessage = error.response?.data?.message || 'Error adding team';
            alert(errorMessage);
        }

        setLoading(false);
    };

    const handleImportJson = async () => {
        setLoading(true);

        try {
            const teamsData = JSON.parse(jsonInput);

            if (!Array.isArray(teamsData)) {
                throw new Error('JSON must be an array of teams');
            }

            await teamAPI.importTeamsFromJson({ teams: teamsData });
            await loadTeams();
            setJsonInput('');
            setShowJsonImport(false);
            alert('Teams imported successfully!');
        } catch (error) {
            console.error('Error importing teams:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Error importing teams';
            alert(errorMessage);
        }

        setLoading(false);
    };

    const handleDeleteTeam = async (teamId, teamName) => {
        if (!window.confirm(`Are you sure you want to delete ${teamName}? This will also delete all related matches and standings.`)) {
            return;
        }

        setLoading(true);

        try {
            await teamAPI.deleteTeam(teamId);
            await loadTeams();
            alert('Team deleted successfully!');
        } catch (error) {
            console.error('Error deleting team:', error);
            alert('Error deleting team');
        }

        setLoading(false);
    };

    const handlePreviewFixtures = async () => {
        setLoading(true);

        try {
            const response = await teamAPI.previewFixtures(rounds);
            setFixturePreview(response.data.results);
            setShowFixturePreview(true);
        } catch (error) {
            console.error('Error previewing fixtures:', error);
            alert(error.response?.data?.message || 'Error generating fixture preview');
        }

        setLoading(false);
    };

    const handleGenerateFixtures = async () => {
        if (!window.confirm(`Generate ${rounds === 1 ? 'single' : 'double'} round-robin fixtures? This will clear all existing matches.`)) {
            return;
        }

        setLoading(true);

        try {
            await teamAPI.generateFixtures({ rounds, clear_existing: true });
            await onDataUpdate(); // Refresh main app data
            setShowFixturePreview(false);
            alert('Fixtures generated successfully!');
        } catch (error) {
            console.error('Error generating fixtures:', error);
            alert(error.response?.data?.message || 'Error generating fixtures');
        }

        setLoading(false);
    };

    const handleClearAllTeams = async () => {
        if (!window.confirm('Are you sure you want to delete ALL teams, matches, and standings? This action cannot be undone.')) {
            return;
        }

        setLoading(true);

        try {
            await teamAPI.clearAllTeams();
            await loadTeams();
            await onDataUpdate();
            alert('All teams and data cleared successfully!');
        } catch (error) {
            console.error('Error clearing teams:', error);
            alert('Error clearing teams');
        }

        setLoading(false);
    };

    const getSampleJsonData = () => {
        return JSON.stringify([
            {
                "name": "Manchester United",
                "short_name": "MUN",
                "strength_rating": 0.85,
                "logo_url": "https://example.com/united.png"
            },
            {
                "name": "Bayern Munich",
                "short_name": "BAY",
                "strength_rating": 0.90,
                "logo_url": "https://example.com/bayern.png"
            },
            {
                "name": "Paris Saint-Germain",
                "short_name": "PSG",
                "strength_rating": 0.88,
                "logo_url": "https://example.com/psg.png"
            },
            {
                "name": "Real Madrid",
                "short_name": "RMA",
                "strength_rating": 0.92,
                "logo_url": "https://example.com/madrid.png"
            }
        ], null, 2);
    };

    return (
        <div className="card">
            <h2>⚙️ Team Management</h2>

            {/* Action Buttons */}
            <div className="grid grid-3" style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="btn btn-primary"
                    disabled={loading}
                >
                    ➕ Add Team
                </button>

                <button
                    onClick={() => setShowJsonImport(!showJsonImport)}
                    className="btn btn-success"
                    disabled={loading}
                >
                    📁 Import JSON
                </button>

                <button
                    onClick={handleClearAllTeams}
                    className="btn btn-danger"
                    disabled={loading || teams.length === 0}
                >
                    🗑️ Clear All
                </button>
            </div>

            {/* Add Team Form */}
            {showAddForm && (
                <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
                    <h4>Add New Team</h4>
                    <form onSubmit={handleAddTeam}>
                        <div className="grid grid-2" style={{ gap: '10px', marginBottom: '10px' }}>
                            <div>
                                <label>Team Name:</label>
                                <input
                                    type="text"
                                    value={newTeam.name}
                                    onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                    placeholder="e.g., Manchester City"
                                />
                            </div>
                            <div>
                                <label>Short Name (3 letters):</label>
                                <input
                                    type="text"
                                    value={newTeam.short_name}
                                    onChange={(e) => setNewTeam({...newTeam, short_name: e.target.value.toUpperCase()})}
                                    maxLength="3"
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                    placeholder="e.g., MCI"
                                />
                            </div>
                        </div>

                        <div className="grid grid-2" style={{ gap: '10px', marginBottom: '15px' }}>
                            <div>
                                <label>Strength Rating (0.1 - 1.0):</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0.1"
                                    max="1.0"
                                    value={newTeam.strength_rating}
                                    onChange={(e) => setNewTeam({...newTeam, strength_rating: parseFloat(e.target.value)})}
                                    required
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </div>
                            <div>
                                <label>Logo URL (optional):</label>
                                <input
                                    type="url"
                                    value={newTeam.logo_url}
                                    onChange={(e) => setNewTeam({...newTeam, logo_url: e.target.value})}
                                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                    placeholder="https://example.com/logo.png"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading ? 'Adding...' : 'Add Team'}
                            </button>
                            <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {showJsonImport && (
                <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
                    <h4>Import Teams from JSON</h4>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                        Paste JSON array of teams. Each team should have: name, short_name, strength_rating, and optional logo_url.
                    </p>

                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder={getSampleJsonData()}
                        style={{
                            width: '100%',
                            height: '200px',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            marginBottom: '10px'
                        }}
                    />

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={handleImportJson} className="btn btn-success" disabled={loading || !jsonInput.trim()}>
                            {loading ? 'Importing...' : 'Import Teams'}
                        </button>
                        <button onClick={() => setJsonInput(getSampleJsonData())} className="btn btn-warning">
                            Load Sample Data
                        </button>
                        <button onClick={() => setShowJsonImport(false)} className="btn btn-secondary">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div>
                <h4>Current Teams ({teams.length})</h4>

                {teams.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                        No teams available. Add teams to get started.
                    </div>
                ) : (
                    <div style={{ marginBottom: '20px' }}>
                        {teams.map((team) => (
                            <div key={team.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                marginBottom: '5px',
                                backgroundColor: 'white'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    {team.logo_url && (
                                        <img
                                            src={team.logo_url}
                                            alt={team.name}
                                            style={{ width: '30px', height: '30px', objectFit: 'contain' }}
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    )}
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{team.name}</div>
                                        <div style={{ fontSize: '12px', color: '#666' }}>
                                            {team.short_name} • Strength: {team.strength_rating}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDeleteTeam(team.id, team.name)}
                                    className="btn btn-danger"
                                    style={{ fontSize: '12px', padding: '5px 10px' }}
                                    disabled={loading}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {teams.length >= 2 && (
                <div style={{ borderTop: '1px solid #ddd', paddingTop: '20px' }}>
                    <h4>🏆 Generate Fixtures</h4>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Tournament Format:</label>
                        <select
                            value={rounds}
                            onChange={(e) => setRounds(parseInt(e.target.value))}
                            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                        >
                            <option value={1}>Single Round-Robin (each team plays once)</option>
                            <option value={2}>Double Round-Robin (each team plays twice)</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <button
                            onClick={handlePreviewFixtures}
                            className="btn btn-warning"
                            disabled={loading || teams.length % 2 !== 0}
                        >
                            👁️ Preview Fixtures
                        </button>

                        <button
                            onClick={handleGenerateFixtures}
                            className="btn btn-success"
                            disabled={loading || teams.length % 2 !== 0}
                        >
                            🏗️ Generate Fixtures
                        </button>
                    </div>

                    {teams.length % 2 !== 0 && (
                        <div style={{ color: '#dc3545', fontSize: '14px', marginBottom: '10px' }}>
                            ⚠️ You need an even number of teams to generate fixtures.
                        </div>
                    )}

                    <div style={{ fontSize: '14px', color: '#666' }}>
                        <div>• Teams: {teams.length}</div>
                        <div>• Expected weeks: {teams.length > 1 ? (teams.length - 1) * rounds : 0}</div>
                        <div>• Expected matches: {teams.length > 1 ? (teams.length * (teams.length - 1) / 2) * rounds : 0}</div>
                    </div>
                </div>
            )}

            {showFixturePreview && fixturePreview && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        maxWidth: '80%',
                        maxHeight: '80%',
                        overflow: 'auto',
                        minWidth: '500px'
                    }}>
                        <h3>🗓️ Fixture Preview</h3>
                        <p>
                            {fixturePreview.rounds === 1 ? 'Single' : 'Double'} Round-Robin •
                            {fixturePreview.total_weeks} weeks •
                            {fixturePreview.total_matches} matches
                        </p>

                        <div style={{ maxHeight: '400px', overflow: 'auto', marginBottom: '15px' }}>
                            {fixturePreview.preview.map((week) => (
                                <div key={week.week} style={{ marginBottom: '15px' }}>
                                    <h5>Week {week.week}</h5>
                                    {week.matches.map((match, index) => (
                                        <div key={index} style={{
                                            padding: '8px',
                                            backgroundColor: '#f8f9fa',
                                            marginBottom: '5px',
                                            borderRadius: '3px'
                                        }}>
                                            <strong>{match.home_team.name}</strong> vs <strong>{match.away_team.name}</strong>
                                            <span style={{ color: '#666', marginLeft: '10px', fontSize: '12px' }}>
                                                ({match.home_team.short_name} vs {match.away_team.short_name})
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={handleGenerateFixtures} className="btn btn-success" disabled={loading}>
                                {loading ? 'Generating...' : 'Confirm & Generate'}
                            </button>
                            <button onClick={() => setShowFixturePreview(false)} className="btn btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamManagement;