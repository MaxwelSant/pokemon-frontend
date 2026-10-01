const toExportRecord = (pokemon) => ({
  id: pokemon.id,
  name: pokemon.name,
  type: Array.isArray(pokemon.type) ? [...pokemon.type] : [],
  generation: pokemon.generation ?? null,
  legendary: Boolean(pokemon.legendary),
  image: pokemon.image ?? null,
});

// Serialises the current view (filtered + favorites-only + sorted list) with its view settings
export const pokemonsToJson = (pokemons, view = {}) =>
  JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      view: {
        filters: view.filters ?? null,
        sort: view.sort ?? null,
        favoritesOnly: Boolean(view.favoritesOnly),
      },
      count: pokemons.length,
      pokemons: pokemons.map(toExportRecord),
    },
    null,
    2
  );

export const downloadJson = (json, filename) => {
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 0);
};
