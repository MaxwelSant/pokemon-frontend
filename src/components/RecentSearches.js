import React from 'react';
import './RecentSearches.css';

const RecentSearches = ({ searches, onSelect, onClear }) => (
  <section className="recent-searches" aria-labelledby="recent-searches-heading">
    <div className="recent-searches-header">
      <h2 id="recent-searches-heading" className="recent-searches-heading">
        Recent Searches
      </h2>
      {searches.length > 0 && (
        <button type="button" className="recent-searches-clear" onClick={onClear}>
          Clear recent searches
        </button>
      )}
    </div>
    {searches.length === 0 && <p className="recent-searches-empty">No recent searches yet.</p>}
    {/* The list always mounts so it stays a stable anchor; only its items are conditional */}
    <ul className="recent-searches-list" aria-labelledby="recent-searches-heading">
      {searches.map((term) => (
        <li key={term}>
          <button
            type="button"
            className="recent-search-button"
            title={`Search again for ${term}`}
            onClick={() => onSelect(term)}
          >
            {term}
          </button>
        </li>
      ))}
    </ul>
  </section>
);

export default RecentSearches;
