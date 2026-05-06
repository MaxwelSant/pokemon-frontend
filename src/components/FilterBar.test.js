const fs = require('fs');
const path = require('path');

test('FilterBar renders the Pokemon name search label per the Jira ticket', () => {
  const source = fs.readFileSync(path.join(__dirname, 'FilterBar.js'), 'utf8');
  expect(source).toContain('Search by Pokemon Name:');
  // Guard against regressing to the old label. Match the exact 'Search by Name:'
  // literal but allow the new 'Search by Pokemon Name:' literal to coexist.
  const legacyLabel = /Search by Name:/;
  const newLabel = /Search by Pokemon Name:/g;
  const sourceWithoutNewLabel = source.replace(newLabel, '');
  expect(legacyLabel.test(sourceWithoutNewLabel)).toBe(false);
});
