const CSV_HEADERS = ['ID', 'Name', 'Types', 'Generation', 'Legendary', 'Image'];
// Guard against CSV/spreadsheet formula injection (cells starting with = + - @ tab CR)
const FORMULA_PREFIX = /^[=+\-@\t\r]/;

export const escapeCsvCell = (value) => {
  let text = value === null || value === undefined ? '' : String(value);
  if (FORMULA_PREFIX.test(text)) {
    text = `'${text}`;
  }
  if (/[",\r\n]/.test(text)) {
    text = `"${text.replace(/"/g, '""')}"`;
  }
  return text;
};

export const pokemonsToCsv = (pokemons) => {
  const rows = pokemons.map((pokemon) => [
    pokemon.id,
    pokemon.name,
    Array.isArray(pokemon.type) ? pokemon.type.join('/') : '',
    pokemon.generation ?? '',
    pokemon.legendary ? 'Yes' : 'No',
    pokemon.image,
  ]);
  return [CSV_HEADERS, ...rows].map((row) => row.map(escapeCsvCell).join(',')).join('\r\n');
};

export const downloadCsv = (csv, filename) => {
  // Prefix a BOM so spreadsheet apps detect UTF-8
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 0);
};
