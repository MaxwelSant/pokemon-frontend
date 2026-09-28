export const MAX_COMPARE = 2;

// Toggle a Pokemon in/out of the comparison; selecting a third one replaces the oldest selection
export const toggleCompareId = (ids, id) =>
  ids.includes(id) ? ids.filter((compareId) => compareId !== id) : [...ids, id].slice(-MAX_COMPARE);
