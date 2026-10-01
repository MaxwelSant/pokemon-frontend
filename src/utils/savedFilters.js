import { normalizeFilters } from './pokemonFilters';

// Saved filters are per user browser profile: the app has no authentication or user accounts.
export const SAVED_FILTERS_STORAGE_KEY = 'pokemonExplorer.savedFilters.v1';
export const MAX_SAVED_FILTERS = 20;
const MAX_NAME_LENGTH = 60;

export const loadSavedFilters = () => {
  try {
    const raw = window.localStorage.getItem(SAVED_FILTERS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .filter((entry) => entry && typeof entry.id === 'string' && typeof entry.name === 'string')
      .map((entry) => ({
        id: entry.id,
        name: entry.name.slice(0, MAX_NAME_LENGTH),
        filters: normalizeFilters(entry.filters),
      }))
      .slice(0, MAX_SAVED_FILTERS);
  } catch (err) {
    return [];
  }
};

export const persistSavedFilters = (savedFilters) => {
  try {
    window.localStorage.setItem(
      SAVED_FILTERS_STORAGE_KEY,
      JSON.stringify(savedFilters.slice(0, MAX_SAVED_FILTERS))
    );
    return true;
  } catch (err) {
    return false;
  }
};

export const createSavedFilter = (name, filters) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  name: name.trim().slice(0, MAX_NAME_LENGTH),
  filters: normalizeFilters(filters),
});
