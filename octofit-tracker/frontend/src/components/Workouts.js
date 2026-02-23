import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const WORKOUTS_URL = `${API_BASE_URL}/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Workouts: fetching from', WORKOUTS_URL);
    fetch(WORKOUTS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Workouts: fetched data', data);
        // Handle both paginated (.results) and plain array responses
        const items = Array.isArray(data) ? data : (data.results || []);
        setWorkouts(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="octofit-spinner-wrapper"><div className="spinner-border octofit-spinner" role="status" /></div>;
  if (error) return <div className="alert octofit-alert">Error: {error}</div>;

  return (
    <div>
      <h2 className="octofit-page-title">💪 Workouts</h2>
      <div className="row">
        {workouts.length === 0 ? (
          <p className="text-muted">No workouts found.</p>
        ) : (
          workouts.map((workout, idx) => (
            <div className="col-md-4 mb-4" key={workout._id || idx}>
              <div className="card octofit-card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">💪 {workout.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{workout.description}</p>
                </div>
                <div className="card-footer">
                  <small>⏱ <strong>{workout.duration}</strong> minutes</small>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Workouts;
