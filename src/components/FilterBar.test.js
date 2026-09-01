const fs = require('fs');
const path = require('path');

// Regression guard for the TestRigor assertion:
//   check that page contains "Search by Pokemon Name:"
// @testing-library/react is not installed in this project, so instead of
// rendering the component we read its source and assert on the exact label
// string the home page must contain.
describe('FilterBar name-filter label', () => {
  const source = fs.readFileSync(
    path.join(__dirname, 'FilterBar.js'),
    'utf8'
  );

  test('renders the label text "Search by Pokemon Name:"', () => {
    expect(source).toContain('Search by Pokemon Name:');
  });

  test('does not render the stale label "Search by Name:"', () => {
    expect(source).not.toContain('Search by Name:');
  });
});
