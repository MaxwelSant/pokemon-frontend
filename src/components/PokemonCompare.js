import React from 'react';
import './PokemonCompare.css';

const COMPARE_ROWS = [
  { key: 'id', label: 'ID', render: (pokemon) => `#${String(pokemon.id).padStart(3, '0')}` },
  {
    key: 'type',
    label: 'Types',
    render: (pokemon) => (Array.isArray(pokemon.type) ? pokemon.type.join(' / ') : '')
  },
  { key: 'generation', label: 'Generation', render: (pokemon) => String(pokemon.generation ?? '-') },
  { key: 'legendary', label: 'Legendary', render: (pokemon) => (pokemon.legendary ? 'Yes' : 'No') }
];

const PokemonCompare = ({ selected, onRemove, onClear }) => {
  if (!selected || selected.length === 0) {
    return null;
  }
  return (
    <section className="pokemon-compare" aria-labelledby="pokemon-compare-heading">
      <div className="pokemon-compare-header">
        <h2 id="pokemon-compare-heading" className="pokemon-compare-heading">
          Compare Pokemon
        </h2>
        <button type="button" className="action-button" onClick={onClear}>
          Clear comparison
        </button>
      </div>
      {selected.length < 2 ? (
        <p className="pokemon-compare-hint">
          Select one more Pokemon to compare with {selected[0].name}.
        </p>
      ) : (
        <table className="pokemon-compare-table">
          <thead>
            <tr>
              <th scope="col">Attribute</th>
              {selected.map((pokemon) => (
                <th key={pokemon.id} scope="col">
                  <img src={pokemon.image} alt={pokemon.name} className="pokemon-compare-image" />
                  <span className="pokemon-compare-name">{pokemon.name}</span>
                  <button
                    type="button"
                    className="pokemon-compare-remove"
                    aria-label={`Remove ${pokemon.name} from comparison`}
                    onClick={() => onRemove(pokemon.id)}
                  >
                    Remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.key}>
                <th scope="row">{row.label}</th>
                {selected.map((pokemon) => (
                  <td key={pokemon.id}>{row.render(pokemon)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default PokemonCompare;
