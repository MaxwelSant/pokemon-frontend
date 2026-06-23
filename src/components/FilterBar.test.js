import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FilterBar from './FilterBar';

const renderFilterBar = () =>
  ReactDOMServer.renderToStaticMarkup(
    React.createElement(FilterBar, {
      filters: { name: '', type: '', legendary: '' },
      types: [],
      onFilterChange: () => {},
      onClearFilters: () => {}
    })
  );

test("renders the 'Search by Pokemon Name:' label", () => {
  const markup = renderFilterBar();
  expect(markup).toContain('Search by Pokemon Name:');
});

test("no longer renders the old 'Search by Name:' label", () => {
  const markup = renderFilterBar();
  expect(markup).not.toContain('Search by Name:');
});
