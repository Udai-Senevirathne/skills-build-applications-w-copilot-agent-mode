import React, { useState, useEffect } from 'react';

const TEAMS_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Teams: fetching from', TEAMS_URL);
    fetch(TEAMS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Teams: fetched data', data);
        // Handle both paginated (.results) and plain array responses
        const items = Array.isArray(data) ? data : (data.results || []);
        setTeams(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="octofit-spinner-wrapper"><div className="spinner-border octofit-spinner" role="status" /></div>;
  if (error) return <div className="alert octofit-alert">Error: {error}</div>;

  return (
    <div>
      <h2 className="octofit-page-title">🏅 Teams</h2>
      <div className="row">
        {teams.length === 0 ? (
          <p className="text-muted">No teams found.</p>
        ) : (
          teams.map((team, idx) => (
            <div className="col-md-6 mb-4" key={team._id || idx}>
              <div className="card octofit-card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">🏅 {team.name}</h5>
                </div>
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Members</h6>
                  {team.members && team.members.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {team.members.map((member, mIdx) => (
                        <li className="list-group-item" key={mIdx}>
                          👤 {typeof member === 'object' ? member.name || JSON.stringify(member) : member}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No members</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Teams;
