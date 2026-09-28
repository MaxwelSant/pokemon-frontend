export const DEFAULT_FILTERS = Object.freeze({ name: '', type: '', legendary: '', generation: '' });
export const QUICK_TYPES = ['Fire', 'Water', 'Grass', 'Electric'];
export const GENERATIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const FILTER_KEYS = Object.keys(DEFAULT_FILTERS);
const LEGENDARY_LABELS = { true: 'Legendary Only', false: 'Non-Legendary Only' };

// Coerce untrusted input (URL params, localStorage) into a valid filters object
export const normalizeFilters = (raw) => {
  const source = raw && typeof raw === 'object' ? raw : {};
  const name = typeof source.name === 'string' ? source.name.slice(0, 100) : '';
  const type = typeof source.type === 'string' ? source.type.slice(0, 50) : '';
  const legendary = source.legendary === 'true' || source.legendary === 'false' ? source.legendary : '';
  const generationNumber = Number.parseInt(source.generation, 10);
  const generation = GENERATIONS.includes(generationNumber) ? String(generationNumber) : '';
  return { name, type, legendary, generation };
};

export const parseFiltersFromSearch = (search) => {
  const params = new URLSearchParams(search);
  const raw = {};
  FILTER_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value !== null) {
      raw[key] = value;
    }
  });
  return normalizeFilters(raw);
};

// Returns '' when no filter is active, otherwise '?name=..&type=..' (non-empty keys only, fixed order)
export const buildSearchFromFilters = (filters) => {
  const params = new URLSearchParams();
  FILTER_KEYS.forEach((key) => {
    if (filters[key]) {
      params.set(key, filters[key]);
    }
  });
  const query = params.toString();
  return query ? `?${query}` : '';
};

export const hasActiveFilters = (filters) => FILTER_KEYS.some((key) => Boolean(filters[key]));

export const applyFilters = (pokemons, filters) => {
  let filtered = Array.isArray(pokemons) ? [...pokemons] : [];

  // Filter by name (case-insensitive substring)
  if (filters.name) {
    const needle = filters.name.toLowerCase();
    filtered = filtered.filter((pokemon) =>
      String(pokemon.name || '').toLowerCase().includes(needle)
    );
  }

  // Filter by type (case-insensitive exact match on any type)
  if (filters.type) {
    const wanted = filters.type.toLowerCase();
    filtered = filtered.filter((pokemon) =>
      Array.isArray(pokemon.type) && pokemon.type.some((t) => String(t).toLowerCase() === wanted)
    );
  }

  // Filter by legendary status
  if (filters.legendary !== '') {
    const isLegendary = filters.legendary === 'true';
    filtered = filtered.filter((pokemon) => pokemon.legendary === isLegendary);
  }

  // Filter by generation
  if (filters.generation) {
    const generationNumber = Number(filters.generation);
    filtered = filtered.filter((pokemon) => pokemon.generation === generationNumber);
  }

  return filtered;
};

export const getActiveFilterChips = (filters) => {
  const chips = [];
  if (filters.name) {
    chips.push({ key: 'name', label: `Name: ${filters.name}` });
  }
  if (filters.type) {
    chips.push({ key: 'type', label: `Type: ${filters.type}` });
  }
  if (filters.legendary) {
    chips.push({ key: 'legendary', label: `Legendary: ${LEGENDARY_LABELS[filters.legendary]}` });
  }
  if (filters.generation) {
    chips.push({ key: 'generation', label: `Generation ${filters.generation}` });
  }
  return chips;
};

export const describeFilters = (filters) => {
  const chips = getActiveFilterChips(filters);
  return chips.length > 0 ? chips.map((chip) => chip.label).join(', ') : 'All Pokemon';
};
