// Recent name searches are stored per user browser profile (no accounts exist).
export const RECENT_SEARCHES_STORAGE_KEY = 'pokemonExplorer.recentSearches.v1';
export const MAX_RECENT_SEARCHES = 5;
export const MIN_RECENT_SEARCH_LENGTH = 2;
const MAX_TERM_LENGTH = 100;

const cleanTerm = (term) => (typeof term === 'string' ? term.trim().slice(0, MAX_TERM_LENGTH) : '');

const dedupe = (terms) => {
  const seen = new Set();
  return terms.filter((term) => {
    const key = term.toLowerCase();
    if (!term || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export const loadRecentSearches = () => {
  try {
    const raw = window.localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return dedupe(parsed.map(cleanTerm)).slice(0, MAX_RECENT_SEARCHES);
  } catch (err) {
    return [];
  }
};

export const persistRecentSearches = (terms) => {
  try {
    window.localStorage.setItem(
      RECENT_SEARCHES_STORAGE_KEY,
      JSON.stringify(terms.slice(0, MAX_RECENT_SEARCHES))
    );
    return true;
  } catch (err) {
    return false;
  }
};

// Most recent first, case-insensitive de-duplication, capped at MAX_RECENT_SEARCHES.
// Returns the SAME array reference when nothing changes so callers can skip re-renders.
export const addRecentSearch = (terms, term) => {
  const cleaned = cleanTerm(term);
  if (cleaned.length < MIN_RECENT_SEARCH_LENGTH) {
    return terms;
  }
  const key = cleaned.toLowerCase();
  if (terms[0] && terms[0].toLowerCase() === key) {
    return terms;
  }
  return [cleaned, ...terms.filter((existing) => existing.toLowerCase() !== key)].slice(
    0,
    MAX_RECENT_SEARCHES
  );
};
