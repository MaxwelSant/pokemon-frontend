const fs = require('fs');
const path = require('path');

describe('FilterBar name-filter label', () => {
  const filterBarSource = fs.readFileSync(
    path.join(__dirname, 'FilterBar.js'),
    'utf8'
  );

  test('renders the literal label text "Search by Pokemon Name:"', () => {
    expect(filterBarSource).toContain('Search by Pokemon Name:');
  });

  test('does not render the prior label text "Search by Name:" without the word Pokemon', () => {
    // Guards against accidental revert. The new label contains the old one as a substring,
    // so check that the bare "Search by Name:" does not appear without "Pokemon" preceding
    // the word "Name".
    expect(filterBarSource).not.toMatch(/Search by Name:/);
  });
});
