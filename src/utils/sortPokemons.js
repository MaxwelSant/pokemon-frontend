export const SORT_OPTIONS = [
  { value: 'id-asc', label: 'ID (Low to High)' },
  { value: 'id-desc', label: 'ID (High to Low)' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
];

// Default keeps the previous behaviour: the API already returns Pokemon in ascending id order
export const DEFAULT_SORT = 'id-asc';

const SORT_VALUES = SORT_OPTIONS.map((option) => option.value);

export const normalizeSort = (value) => (SORT_VALUES.includes(value) ? value : DEFAULT_SORT);

const compareById = (a, b) => (Number(a.id) || 0) - (Number(b.id) || 0);

const compareByName = (a, b) =>
  String(a.name || '').localeCompare(String(b.name || ''), undefined, { sensitivity: 'base' }) ||
  compareById(a, b);

// Returns a NEW sorted array; never mutates the input
export const sortPokemons = (pokemons, sort) => {
  const list = Array.isArray(pokemons) ? [...pokemons] : [];
  switch (normalizeSort(sort)) {
    case 'id-desc':
      return list.sort((a, b) => compareById(b, a));
    case 'name-asc':
      return list.sort(compareByName);
    case 'name-desc':
      return list.sort((a, b) => compareByName(b, a));
    default:
      return list.sort(compareById);
  }
};
