const fs = require('fs');
const path = require('path');

describe('FilterBar name-filter label', () => {
  const source = fs.readFileSync(
    path.join(__dirname, 'FilterBar.js'),
    'utf8'
  );

  test('renders the label as "Search by Pokemon Name:"', () => {
    expect(source).toContain('Search by Pokemon Name:');
  });

  test('does not render the old "Search by Name:" label', () => {
    // Match the old label only when it is NOT preceded by the word "Pokemon ".
    const oldLabel = /(?<!Pokemon )Search by Name:/;
    expect(source).not.toMatch(oldLabel);
  });
});
