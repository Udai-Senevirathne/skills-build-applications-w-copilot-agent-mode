import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/leaderboard/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // Sort by score descending
        const sorted = [...data].sort((a, b) => b.score - a.score);
        setEntries(sorted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status" /></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32'];

  return (
    <div>
      <h2 className="mb-4">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr><td colSpan="3" className="text-center">No leaderboard entries found.</td></tr>
            ) : (
              entries.map((entry, idx) => (
                <tr key={entry._id || idx} className={idx < 3 ? 'fw-bold' : ''}>
                  <td>
                    {idx < 3 ? (
                      <span style={{ fontSize: '1.2rem', color: medalColors[idx] }}>
                        {['🥇', '🥈', '🥉'][idx]}
                      </span>
                    ) : (
                      `#${idx + 1}`
                    )}
                  </td>
                  <td>{typeof entry.user === 'object' ? entry.user?.name : entry.user}</td>
                  <td>
                    <span className="badge bg-success fs-6">{entry.score}</span>
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
