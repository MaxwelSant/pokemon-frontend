import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import FilterBar from './FilterBar';

// Opt this jsdom test into React 18's concurrent act() environment so render() updates
// are flushed synchronously and the test runner stays free of "act(...) not configured"
// warnings. See https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
global.IS_REACT_ACT_ENVIRONMENT = true;

// Uses only react / react-dom (already declared dependencies). Avoids @testing-library/react,
// which is not installed in this project, so the test runs under react-scripts' default jest
// configuration without additional packages.
describe('FilterBar', () => {
  const baseProps = {
    filters: { name: '', type: '', legendary: '' },
    types: [],
    onFilterChange: () => {},
    onClearFilters: () => {},
  };

  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  const renderFilterBar = (props = baseProps) => {
    act(() => {
      createRoot(container).render(<FilterBar {...props} />);
    });
  };

  test("renders the literal text 'Search by Pokemon Name:' inside FilterBar", () => {
    renderFilterBar();
    const label = container.querySelector('label[for="name-filter"]');
    expect(label).not.toBeNull();
    expect(label.textContent.trim()).toBe('Search by Pokemon Name:');
  });

  test("still renders an <input id='name-filter'> bound to the renamed label (preservation boundary)", () => {
    renderFilterBar();
    const input = container.querySelector('input#name-filter');
    expect(input).not.toBeNull();
    const label = container.querySelector('label[for="name-filter"]');
    expect(label).not.toBeNull();
    // The label's htmlFor must still point at the input id, preserving the a11y association
    expect(label.getAttribute('for')).toBe('name-filter');
  });
});
