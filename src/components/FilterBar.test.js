import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FilterBar from './FilterBar';

const noop = () => {};

const baseProps = {
  filters: { name: '', type: '', legendary: '' },
  types: [],
  onFilterChange: noop,
  onClearFilters: noop,
};

test('rendered FilterBar markup contains "Search by Pokemon Name:"', () => {
  const markup = ReactDOMServer.renderToStaticMarkup(<FilterBar {...baseProps} />);
  expect(markup).toContain('Search by Pokemon Name:');
});

test('rendered FilterBar markup does not contain the standalone label ">Search by Name:<"', () => {
  const markup = ReactDOMServer.renderToStaticMarkup(<FilterBar {...baseProps} />);
  expect(markup).not.toContain('>Search by Name:<');
});
