const fs = require('fs');
const path = require('path');

describe('FilterBar name-filter label', () => {
  const source = fs.readFileSync(
    path.join(__dirname, 'FilterBar.js'),
    'utf8'
  );

  test('renders the label "Search by Pokemon Name:"', () => {
    expect(source).toContain('Search by Pokemon Name:');
  });

  test('does not render the legacy label "Search by Name:"', () => {
    // Negative lookbehind would also work, but a simple regex matching the
    // exact legacy label (with no preceding word characters) is sufficient
    // since the new label ends with "Pokemon Name:" not "Name:".
    expect(source).not.toMatch(/(^|[^a-zA-Z])Search by Name:/);
  });
});
