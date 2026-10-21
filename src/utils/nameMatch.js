// Minimum query length for which a typo is tolerated; shorter queries
// must match exactly, otherwise nearly every name would match.
const MIN_LENGTH_FOR_TYPO = 5;
const MAX_TYPOS = 1;

// Approximate substring match (Sellers' algorithm): true if `query` occurs
// somewhere in `name` with at most `maxTypos` insertions, deletions or
// substitutions.
const matchesWithTypos = (name, query, maxTypos) => {
  let previous = Array.from({ length: query.length + 1 }, (_, i) => i);

  for (let i = 1; i <= name.length; i += 1) {
    const current = [0];
    for (let j = 1; j <= query.length; j += 1) {
      const cost = name[i - 1] === query[j - 1] ? 0 : 1;
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + cost
      );
    }
    if (current[query.length] <= maxTypos) {
      return true;
    }
    previous = current;
  }

  return false;
};

// Case-insensitive name search that tolerates a single typo in longer queries.
export const nameMatchesQuery = (name, query) => {
  const normalizedName = name.toLowerCase();
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedName.includes(normalizedQuery)) {
    return true;
  }

  return (
    normalizedQuery.length >= MIN_LENGTH_FOR_TYPO &&
    matchesWithTypos(normalizedName, normalizedQuery, MAX_TYPOS)
  );
};
