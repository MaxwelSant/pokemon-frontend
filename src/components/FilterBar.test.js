const fs = require('fs');
const path = require('path');

describe("FilterBar label reads 'Search by Pokemon Name:'", () => {
  const filterBarSource = fs.readFileSync(
    path.join(__dirname, 'FilterBar.js'),
    'utf8'
  );

  test("FilterBar.js source contains the literal 'Search by Pokemon Name:'", () => {
    expect(filterBarSource).toContain('Search by Pokemon Name:');
  });

  test("FilterBar.js source no longer contains the obsolete standalone label 'Search by Name:'", () => {
    // The fix replaces the old label, it does not duplicate it. Ensure the old
    // text is gone so we cannot regress to the original failing string.
    expect(filterBarSource).not.toMatch(/Search by Name:/);
  });
});
