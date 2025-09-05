import React from 'react';
import './MockSuite.css';

function MockSuite() {
  return (
    <div className="mock-suite-container">
      <div className="mock-suite-content">
        <h2>NEW_MOCK_SUITE</h2>
        <p>Mock suite functionality will be implemented here.</p>
        <div className="mock-suite-actions">
          <button className="primary-btn">Create New Suite</button>
          <button className="secondary-btn">Import Suite</button>
        </div>
      </div>
    </div>
  );
}

export default MockSuite;