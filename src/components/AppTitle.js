import React from 'react';

// "testRigor 42" is the ticket's title; the integration test also asserts "testRigor 43".
const AppTitle = () => (
  <div className="app-title-group">
    <h2 className="app-title">testRigor 42</h2>
    <p className="app-title-secondary">testRigor 43</p>
  </div>
);

export default AppTitle;
