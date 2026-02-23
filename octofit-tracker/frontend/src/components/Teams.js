import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/teams/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status" /></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2 className="mb-4">Teams</h2>
      <div className="row">
        {teams.length === 0 ? (
          <p className="text-muted">No teams found.</p>
        ) : (
          teams.map((team, idx) => (
            <div className="col-md-6 mb-4" key={team._id || idx}>
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-dark text-white">
                  <h5 className="card-title mb-0">{team.name}</h5>
                </div>
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Members</h6>
                  {team.members && team.members.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {team.members.map((member, mIdx) => (
                        <li className="list-group-item" key={mIdx}>
                          {typeof member === 'object' ? member.name || JSON.stringify(member) : member}
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
