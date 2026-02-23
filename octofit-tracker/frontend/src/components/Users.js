import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const USERS_URL = `${API_BASE_URL}/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Users: fetching from', USERS_URL);
    fetch(USERS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Users: fetched data', data);
        // Handle both paginated (.results) and plain array responses
        const items = Array.isArray(data) ? data : (data.results || []);
        setUsers(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []); 

  if (loading) return <div className="octofit-spinner-wrapper"><div className="spinner-border octofit-spinner" role="status" /></div>;
  if (error) return <div className="alert octofit-alert">Error: {error}</div>;

  return (
    <div>
      <h2 className="octofit-page-title">👤 Users</h2>
      <div className="octofit-table-wrapper">
        <table className="table octofit-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="3" className="text-center py-4 text-muted">No users found.</td></tr>
            ) : (
              users.map((user, idx) => (
                <tr key={user._id || idx}>
                  <td>{idx + 1}</td>
                  <td><strong>{user.name}</strong></td>
                  <td>{user.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
