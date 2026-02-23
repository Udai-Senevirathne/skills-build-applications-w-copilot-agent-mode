import React, { useState, useEffect } from 'react';

const LEADERBOARD_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Leaderboard: fetching from', LEADERBOARD_URL);
    fetch(LEADERBOARD_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        // Handle both paginated (.results) and plain array responses
        const items = Array.isArray(data) ? data : (data.results || []);
        // Sort by score descending
        const sorted = [...items].sort((a, b) => b.score - a.score);
        setEntries(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="octofit-spinner-wrapper"><div className="spinner-border octofit-spinner" role="status" /></div>;
  if (error) return <div className="alert octofit-alert">Error: {error}</div>;

  return (
    <div>
      <h2 className="octofit-page-title">🏆 Leaderboard</h2>
      <div className="octofit-table-wrapper">
        <table className="table octofit-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr><td colSpan="3" className="text-center py-4 text-muted">No leaderboard entries found.</td></tr>
            ) : (
              entries.map((entry, idx) => (
                <tr key={entry._id || idx} className={idx < 3 ? 'fw-bold' : ''}>
                  <td>
                    {idx < 3 ? (
                      <span className="rank-medal">{['🥇', '🥈', '🥉'][idx]}</span>
                    ) : (
                      <span className="text-muted">#{idx + 1}</span>
                    )}
                  </td>
                  <td><strong>{typeof entry.user === 'object' ? entry.user?.name : entry.user}</strong></td>
                  <td>
                    <span className="badge badge-score">{entry.score}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
