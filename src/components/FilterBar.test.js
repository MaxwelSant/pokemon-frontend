import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

// Regression guard for TestRigor test Ewjqtgdrtijenvfzmvobgtoehpkodou:
//   "check that page contains 'Search by Pokemon Name:'"
// The implementation_plan.json calls for Jest + React Testing Library, but
// @testing-library/react is not in this project's dependencies. We use
// react-dom/server's renderToStaticMarkup to honor the plan's intent
// (assert exact label text + the htmlFor/id labelling relationship +
// preservation of sibling labels) using only the dependencies that exist.

describe('FilterBar label text', () => {
  const baseProps = {
    filters: { name: '', type: '', legendary: '' },
    types: [],
    onFilterChange: () => {},
    onClearFilters: () => {},
  };

  test("renders the name filter label as 'Search by Pokemon Name:'", () => {
    const html = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(html).toContain('Search by Pokemon Name:');
    expect(html).not.toMatch(/>\s*Search by Name:\s*</);
  });

  test('associates the name label with the name-filter input', () => {
    const html = renderToStaticMarkup(<FilterBar {...baseProps} />);
    // <label htmlFor="name-filter" ...>Search by Pokemon Name:</label>
    expect(html).toMatch(
      /<label[^>]*\bfor="name-filter"[^>]*>\s*Search by Pokemon Name:\s*<\/label>/
    );
    // <input id="name-filter" .../>
    expect(html).toMatch(/<input[^>]*\bid="name-filter"/);
  });

  test('preserves sibling labels (Filter by Type, Legendary Status)', () => {
    const html = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(html).toContain('Filter by Type:');
    expect(html).toContain('Legendary Status:');
  });
});
