import React, { useState } from 'react';
import './SavedFilters.css';
import { hasActiveFilters, describeFilters } from '../utils/pokemonFilters';
import {
  loadSavedFilters,
  persistSavedFilters,
  createSavedFilter,
  MAX_SAVED_FILTERS,
} from '../utils/savedFilters';

const SavedFilters = ({ filters, onApplyFilter }) => {
  const [savedFilters, setSavedFilters] = useState(() => loadSavedFilters());
  const [filterName, setFilterName] = useState('');
  const [message, setMessage] = useState('');
  const canSave = hasActiveFilters(filters);

  const updateSavedFilters = (next, successMessage) => {
    setSavedFilters(next);
    setMessage(persistSavedFilters(next) ? successMessage : 'Could not save filters in this browser.');
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!canSave) {
      return;
    }
    const entry = createSavedFilter(filterName.trim() || describeFilters(filters), filters);
    const next = [entry, ...savedFilters.filter((saved) => saved.name !== entry.name)].slice(
      0,
      MAX_SAVED_FILTERS
    );
    updateSavedFilters(next, `Saved filter "${entry.name}"`);
    setFilterName('');
  };

  const handleDelete = (id) => {
    const removed = savedFilters.find((saved) => saved.id === id);
    updateSavedFilters(
      savedFilters.filter((saved) => saved.id !== id),
      `Deleted saved filter "${removed ? removed.name : ''}"`
    );
  };

  return (
    <section className="saved-filters" aria-labelledby="saved-filters-heading">
      <h2 id="saved-filters-heading" className="saved-filters-heading">
        Saved Filters
      </h2>
      <form className="saved-filters-form" onSubmit={handleSave}>
        <label htmlFor="saved-filter-name" className="saved-filters-label">
          Filter name:
        </label>
        <input
          id="saved-filter-name"
          type="text"
          className="saved-filters-input"
          maxLength={60}
          placeholder="Optional, e.g. Legendary fire"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <button
          type="submit"
          className="action-button"
          disabled={!canSave}
          title={canSave ? 'Save the current filters' : 'Select at least one filter to save'}
        >
          Save filter
        </button>
      </form>
      <p className="saved-filters-message" role="status" aria-live="polite">
        {message}
      </p>
      {savedFilters.length === 0 ? (
        <p className="saved-filters-empty">No saved filters yet.</p>
      ) : (
        <ul className="saved-filters-list" aria-labelledby="saved-filters-heading">
          {savedFilters.map((saved) => (
            <li key={saved.id} className="saved-filter-item">
              <button
                type="button"
                className="saved-filter-apply"
                onClick={() => onApplyFilter(saved.filters)}
                title={`Apply saved filter ${saved.name}`}
              >
                {saved.name}
              </button>
              <span className="saved-filter-summary">{describeFilters(saved.filters)}</span>
              <button
                type="button"
                className="saved-filter-delete"
                onClick={() => handleDelete(saved.id)}
                aria-label={`Delete saved filter ${saved.name}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SavedFilters;
