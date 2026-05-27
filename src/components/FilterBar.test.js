import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const baseProps = () => ({
    filters: { name: '', type: '', legendary: '' },
    types: [],
    onFilterChange: jest.fn(),
    onClearFilters: jest.fn(),
  });

  test("renders the literal text 'Search by Pokemon Name:' on the page", () => {
    const html = renderToStaticMarkup(<FilterBar {...baseProps()} />);
    expect(html).toContain('Search by Pokemon Name:');
  });

  test("the name input (id='name-filter') is associated with the label text 'Search by Pokemon Name:'", () => {
    const html = renderToStaticMarkup(<FilterBar {...baseProps()} />);
    // The <label> has for="name-filter" and contains the expected text.
    expect(html).toMatch(
      /<label[^>]*for="name-filter"[^>]*>[\s\S]*?Search by Pokemon Name:[\s\S]*?<\/label>/
    );
    // The sibling <input> has id="name-filter".
    expect(html).toMatch(/<input[^>]*id="name-filter"/);
  });

  test("other filter-section labels ('Filter by Type:', 'Legendary Status:') remain unchanged", () => {
    const html = renderToStaticMarkup(<FilterBar {...baseProps()} />);
    expect(html).toContain('Filter by Type:');
    expect(html).toContain('Legendary Status:');
  });
});
