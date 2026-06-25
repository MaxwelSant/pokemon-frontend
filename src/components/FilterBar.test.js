import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

// Note: this project does not depend on @testing-library/react, so we render
// with react-dom (already a dependency) to assert the same cases.
describe('FilterBar search label', () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    container = null;
  });

  const renderBar = () => {
    act(() => {
      root.render(
        <FilterBar
          filters={{ name: '', type: '', legendary: '' }}
          types={[]}
          onFilterChange={() => {}}
          onClearFilters={() => {}}
        />
      );
    });
  };

  test("renders label text 'Search by Pokemon Name:'", () => {
    renderBar();
    const label = container.querySelector('label[for="name-filter"]');
    expect(label).not.toBeNull();
    expect(label.textContent.trim()).toBe('Search by Pokemon Name:');
  });

  test("does not render an exact label 'Search by Name:'", () => {
    renderBar();
    const labels = Array.from(container.querySelectorAll('label'));
    const hasOldExactLabel = labels.some(
      (l) => l.textContent.trim() === 'Search by Name:'
    );
    expect(hasOldExactLabel).toBe(false);
  });

  test('label remains associated with the name-filter input', () => {
    renderBar();
    const label = container.querySelector('label[for="name-filter"]');
    const input = container.querySelector('#name-filter');
    expect(label).not.toBeNull();
    expect(input).not.toBeNull();
    expect(input.getAttribute('id')).toBe(label.getAttribute('for'));
  });
});
