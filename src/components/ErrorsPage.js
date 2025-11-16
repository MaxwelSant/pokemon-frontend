import React, { useState } from 'react';
import './ErrorsPage.css';

function ErrorsPage() {
  const [errors] = useState([
    {
      id: 1,
      message: "TypeError: Cannot read property 'map' of undefined",
      timestamp: "2025-01-15 10:30:00",
      severity: "error",
      component: "PokemonList"
    },
    {
      id: 2,
      message: "Network request failed: 500 Internal Server Error",
      timestamp: "2025-01-15 10:25:00",
      severity: "error",
      component: "API"
    },
    {
      id: 3,
      message: "Warning: Each child in a list should have a unique key prop",
      timestamp: "2025-01-15 10:20:00",
      severity: "warning",
      component: "FilterBar"
    }
  ]);

  const handleCreateJiraIssue = (error) => {
    console.log('Creating Jira issue for error:', error);
    alert(`Creating Jira issue for: ${error.message}`);
  };

  const handleLinkJiraIssue = (error) => {
    console.log('Linking Jira issue for error:', error);
    alert(`Linking Jira issue for: ${error.message}`);
  };

  return (
    <div className="errors-page-container">
      <div className="errors-content">
        <h2>Errors</h2>
        <p>Application errors and warnings are displayed here.</p>
        
        <div className="errors-list">
          {errors.map(error => (
            <div key={error.id} className={`error-item ${error.severity}`}>
              <div className="error-header">
                <span className={`severity-badge ${error.severity}`}>
                  {error.severity.toUpperCase()}
                </span>
                <span className="error-component">{error.component}</span>
                <span className="error-timestamp">{error.timestamp}</span>
              </div>
              <div className="error-message">
                {error.message}
              </div>
              <div className="error-actions">
                <button 
                  className="jira-btn create-jira"
                  onClick={() => handleCreateJiraIssue(error)}
                >
                  Create Jira Issue
                </button>
                <button 
                  className="jira-btn link-jira"
                  onClick={() => handleLinkJiraIssue(error)}
                >
                  Link Jira Issue
                </button>
              </div>
            </div>
          ))}
        </div>

        {errors.length === 0 && (
          <div className="no-errors">
            <p>No errors to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ErrorsPage;