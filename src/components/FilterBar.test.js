import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FilterBar from './FilterBar';

const defaultProps = {
  filters: { name: '', type: '', legendary: '' },
  types: [],
  onFilterChange: () => {},
  onClearFilters: () => {},
};

test('renders the "Search by Pokemon Name:" label for the name filter input', () => {
  const html = ReactDOMServer.renderToString(<FilterBar {...defaultProps} />);
  expect(html).toContain('Search by Pokemon Name:');
});

test('does not render the legacy "Search by Name:" label', () => {
  const html = ReactDOMServer.renderToString(<FilterBar {...defaultProps} />);
  expect(html).not.toMatch(/Search by Name:/);
});
