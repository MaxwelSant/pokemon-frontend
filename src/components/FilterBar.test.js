const fs = require('fs');
const path = require('path');

describe('FilterBar source — name-search label literal', () => {
  const filterBarSourcePath = path.join(__dirname, 'FilterBar.js');
  let source;

  beforeAll(() => {
    source = fs.readFileSync(filterBarSourcePath, 'utf8');
  });

  test('renders the label literal "Search by Pokemon Name:"', () => {
    // The TestRigor assertion `check that page contains "Search by Pokemon Name:"`
    // is satisfied only when this literal text is present in the JSX source that
    // produces the home-page filter bar. FilterBar.js is the sole producer of the
    // rendered name-search label (see debug_analysis.json evidence trace).
    expect(source).toContain('Search by Pokemon Name:');
  });

  test('does not contain the legacy literal "Search by Name:"', () => {
    // Guards against an accidental partial revert that would re-introduce the
    // pre-fix wording. The substring "Search by Name:" is NOT present in the
    // corrected literal "Search by Pokemon Name:", so this check is precise.
    expect(source).not.toContain('Search by Name:');
  });

  test('preserves the name-filter input id (preservation boundary)', () => {
    // debug_analysis.json preservation_boundary: the <input id="name-filter" ...>
    // element and its htmlFor association must remain untouched. If either is
    // missing, the fix has overreached and broken accessibility wiring.
    expect(source).toContain('id="name-filter"');
    expect(source).toContain('htmlFor="name-filter"');
  });
});
