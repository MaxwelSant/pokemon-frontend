import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

const baseProps = {
  filters: { name: '', type: '', legendary: '' },
  types: [],
  onFilterChange: () => {},
  onClearFilters: () => {},
};

function renderFilterBar() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    ReactDOM.createRoot(container).render(<FilterBar {...baseProps} />);
  });
  return container;
}

describe('FilterBar', () => {
  it('renders the "Search by Pokemon Name:" label', () => {
    const container = renderFilterBar();
    expect(container.textContent).toContain('Search by Pokemon Name:');
  });

  it('labels the name-filter input with the new copy and not the old "Search by Name:" text', () => {
    const container = renderFilterBar();
    const nameLabel = container.querySelector('label[for="name-filter"]');
    expect(nameLabel).not.toBeNull();
    expect(nameLabel.textContent.trim()).toBe('Search by Pokemon Name:');
  });

  it('preserves the other filter labels', () => {
    const container = renderFilterBar();
    expect(container.textContent).toContain('Filter by Type:');
    expect(container.textContent).toContain('Legendary Status:');
  });
});
