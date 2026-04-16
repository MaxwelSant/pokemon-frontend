import React, { useState } from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const [loved, setLoved] = useState(false);

  return (
    <div className={`pokemon-card ${pokemon.legendary ? 'legendary' : ''}`}>
      <div className="pokemon-image-container">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="pokemon-image"
          onError={(e) => {
            e.target.src = '/placeholder-pokemon.png';
          }}
        />
        {pokemon.legendary && <div className="legendary-badge">✨ Legendary</div>}
      </div>

      <div className="pokemon-info">
        <h3 className="pokemon-name">{pokemon.name}</h3>

        <div className="pokemon-types">
          {pokemon.type.map((type, index) => (
            <span
              key={index}
              className={`type-badge type-${type.toLowerCase()}`}
            >
              {type}
            </span>
          ))}
        </div>

        <div className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</div>

        <button
          type="button"
          className={`love-button ${loved ? 'loved' : ''}`}
          aria-pressed={loved}
          onClick={() => setLoved(!loved)}
        >
          Love
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
