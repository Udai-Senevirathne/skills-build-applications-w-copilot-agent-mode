import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

console.log('OctoFit Tracker App starting. API base URL:', API_BASE_URL);

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg octofit-navbar">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              <img
                src="/octofit-logo.png"
                alt="OctoFit"
                width="36"
                height="36"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              OctoFit Tracker
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">👤 Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/teams">🏅 Teams</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/activities">🏃 Activities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/leaderboard">🏆 Leaderboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/workouts">💪 Workouts</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="octofit-main">
          <div className="container">
            <Routes>
              <Route path="/" element={
                <div className="octofit-hero">
                  <img
                    src="/octofit-logo.png"
                    alt="OctoFit Logo"
                    className="hero-logo"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <h1>Welcome to OctoFit Tracker</h1>
                  <p className="lead">Fitness tracking for Mergington High School</p>
                  <div className="feature-pills">
                    <span className="badge-feature">👤 User Profiles</span>
                    <span className="badge-feature">🏃 Activity Logging</span>
                    <span className="badge-feature">🏅 Team Competitions</span>
                    <span className="badge-feature">🏆 Leaderboard</span>
                    <span className="badge-feature">💪 Personalized Workouts</span>
                  </div>
                </div>
              } />
              <Route path="/users" element={<Users />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/workouts" element={<Workouts />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="octofit-footer">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} OctoFit Tracker &mdash; Mergington High School
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
