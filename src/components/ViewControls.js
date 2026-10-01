import React from 'react';
import './ViewControls.css';
import { SORT_OPTIONS } from '../utils/sortPokemons';
import { PAGE_SIZE_OPTIONS } from '../utils/pagination';

const ViewControls = ({
  sort,
  pageSize,
  favoritesOnly,
  favoritesCount,
  onSortChange,
  onPageSizeChange,
  onFavoritesOnlyChange
}) => (
  <div className="view-controls">
    <div className="view-control">
      <label htmlFor="sort-select" className="view-control-label">
        Sort by:
      </label>
      <select
        id="sort-select"
        className="view-control-select"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>

    <div className="view-control">
      <label htmlFor="page-size-select" className="view-control-label">
        Page size:
      </label>
      <select
        id="page-size-select"
        className="view-control-select"
        value={String(pageSize)}
        onChange={(e) => onPageSizeChange(e.target.value)}
      >
        {PAGE_SIZE_OPTIONS.map((size) => (
          <option key={size} value={String(size)}>
            {size} per page
          </option>
        ))}
      </select>
    </div>

    <div className="view-control view-control-checkbox">
      <input
        id="favorites-only"
        type="checkbox"
        checked={favoritesOnly}
        onChange={(e) => onFavoritesOnlyChange(e.target.checked)}
      />
      <label htmlFor="favorites-only" className="view-control-label">
        Show favorites only ({favoritesCount})
      </label>
    </div>
  </div>
);

export default ViewControls;
