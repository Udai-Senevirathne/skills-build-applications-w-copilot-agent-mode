import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const ACTIVITIES_URL = `${API_BASE_URL}/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Activities: fetching from', ACTIVITIES_URL);
    fetch(ACTIVITIES_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Activities: fetched data', data);
        // Handle both paginated (.results) and plain array responses
        const items = Array.isArray(data) ? data : (data.results || []);
        setActivities(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="octofit-spinner-wrapper"><div className="spinner-border octofit-spinner" role="status" /></div>;
  if (error) return <div className="alert octofit-alert">Error: {error}</div>;

  return (
    <div>
      <h2 className="octofit-page-title">🏃 Activities</h2>
      <div className="octofit-table-wrapper">
        <table className="table octofit-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Activity Type</th>
              <th>Duration (min)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-4 text-muted">No activities found.</td></tr>
            ) : (
              activities.map((activity, idx) => (
                <tr key={activity._id || idx}>
                  <td>{idx + 1}</td>
                  <td><strong>{typeof activity.user === 'object' ? activity.user?.name : activity.user}</strong></td>
                  <td>
                    <span className="badge badge-activity">{activity.activity_type}</span>
                  </td>
                  <td>{activity.duration}</td>
                  <td>{activity.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
