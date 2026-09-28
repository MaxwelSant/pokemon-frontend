import React from 'react';
import './FilterBar.css';
import { QUICK_TYPES, GENERATIONS, hasActiveFilters } from '../utils/pokemonFilters';

const FilterBar = ({ filters, types, onFilterChange, onClearFilters }) => {
  const handleInputChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  const showClearButton = hasActiveFilters(filters);

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <label htmlFor="name-filter" className="filter-label">
          Search Pokemon by Name:
        </label>
        <input
          id="name-filter"
          type="text"
          placeholder="Enter Pokemon name..."
          value={filters.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-section">
        <label htmlFor="type-filter" className="filter-label">
          Filter by Type:
        </label>
        <select
          id="type-filter"
          value={filters.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
          className="filter-select"
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <span id="quick-type-label" className="filter-label">
          Quick Type Filters:
        </span>
        <div className="quick-type-filters" role="group" aria-labelledby="quick-type-label">
          {QUICK_TYPES.map((quickType) => {
            const isActive = filters.type.toLowerCase() === quickType.toLowerCase();
            return (
              <button
                key={quickType}
                type="button"
                className={`quick-type-button quick-type-${quickType.toLowerCase()}${isActive ? ' active' : ''}`}
                aria-pressed={isActive}
                onClick={() => handleInputChange('type', isActive ? '' : quickType)}
              >
                {quickType}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-section">
        <label htmlFor="legendary-filter" className="filter-label">
          Legendary Status:
        </label>
        <select
          id="legendary-filter"
          value={filters.legendary}
          onChange={(e) => handleInputChange('legendary', e.target.value)}
          className="filter-select"
        >
          <option value="">All Pokemon</option>
          <option value="true">Legendary Only</option>
          <option value="false">Non-Legendary Only</option>
        </select>
      </div>

      <div className="filter-section">
        <label htmlFor="generation-filter" className="filter-label">
          Filter by Generation:
        </label>
        <select
          id="generation-filter"
          value={filters.generation}
          onChange={(e) => handleInputChange('generation', e.target.value)}
          className="filter-select"
        >
          <option value="">All Generations</option>
          {GENERATIONS.map((generation) => (
            <option key={generation} value={String(generation)}>
              Generation {generation}
            </option>
          ))}
        </select>
      </div>

      {showClearButton && (
        <div className="filter-section">
          <button
            onClick={onClearFilters}
            className="clear-filters-button"
            title="Clear all filters"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
