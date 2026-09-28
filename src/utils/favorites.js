// Favorites are per user browser profile: the app has no authentication or user accounts
// (same model as src/utils/savedFilters.js).
export const FAVORITES_STORAGE_KEY = 'pokemonExplorer.favorites.v1';
export const MAX_FAVORITES = 500;

const isValidId = (value) => Number.isInteger(value) && value > 0;

export const loadFavorites = () => {
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return [...new Set(parsed.filter(isValidId))].slice(0, MAX_FAVORITES);
  } catch (err) {
    return [];
  }
};

export const persistFavorites = (ids) => {
  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids.slice(0, MAX_FAVORITES)));
    return true;
  } catch (err) {
    return false;
  }
};

export const toggleFavoriteId = (ids, id) =>
  ids.includes(id) ? ids.filter((favoriteId) => favoriteId !== id) : [id, ...ids].slice(0, MAX_FAVORITES);
