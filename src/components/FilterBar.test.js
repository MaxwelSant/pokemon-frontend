const fs = require('fs');
const path = require('path');

describe('FilterBar name-filter label text', () => {
  const source = fs.readFileSync(
    path.join(__dirname, 'FilterBar.js'),
    'utf8'
  );

  test('renders the literal label "Search by Pokemon Name:"', () => {
    expect(source).toContain('Search by Pokemon Name:');
  });

  test('no longer contains the old label "Search by Name:"', () => {
    // Match the bare label text only; reject 'Search by Name:' but allow
    // 'Search by Pokemon Name:' (which contains the substring 'Name:').
    expect(source).not.toMatch(/Search by Name:/);
  });
});
