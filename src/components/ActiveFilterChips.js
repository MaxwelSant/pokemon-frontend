import React from 'react';
import './ActiveFilterChips.css';
import { getActiveFilterChips } from '../utils/pokemonFilters';

const ActiveFilterChips = ({ filters, onRemoveFilter }) => {
  const chips = getActiveFilterChips(filters);

  // The container always renders so it stays a stable anchor; only its content is conditional
  return (
    <div className="active-filter-chips">
      {chips.length > 0 && (
        <>
          <span id="active-filters-label" className="active-filter-chips-label">
            Active filters:
          </span>
          <ul className="filter-chip-list" aria-labelledby="active-filters-label">
            {chips.map((chip) => (
              <li key={chip.key} className="filter-chip">
                <span className="filter-chip-text">{chip.label}</span>
                <button
                  type="button"
                  className="filter-chip-remove"
                  aria-label={`Remove ${chip.label} filter`}
                  title={`Remove ${chip.label} filter`}
                  onClick={() => onRemoveFilter(chip.key)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ActiveFilterChips;
