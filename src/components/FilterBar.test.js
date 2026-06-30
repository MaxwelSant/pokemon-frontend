import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar label', () => {
  const renderMarkup = () =>
    ReactDOMServer.renderToStaticMarkup(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );

  test("rendered markup contains 'Search by Pokemon Name:'", () => {
    expect(renderMarkup()).toContain('Search by Pokemon Name:');
  });

  test("rendered markup does NOT contain the old '>Search by Name:<' text node", () => {
    expect(renderMarkup()).not.toContain('>Search by Name:<');
  });

  test('label keeps for="name-filter" associated with id="name-filter"', () => {
    const markup = renderMarkup();
    expect(markup).toContain('for="name-filter"');
    expect(markup).toContain('id="name-filter"');
  });
});
