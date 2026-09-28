import React from 'react';
import './PokemonCard.css';

const PokemonCard = ({
  pokemon,
  isFavorite = false,
  onToggleFavorite,
  isCompared = false,
  onToggleCompare
}) => {
  return (
    <div className={`pokemon-card ${pokemon.legendary ? 'legendary' : ''}${isFavorite ? ' favorite' : ''}`}>
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

        {(onToggleFavorite || onToggleCompare) && (
          <div className="pokemon-card-actions">
            {onToggleFavorite && (
              <button
                type="button"
                className={`card-action-button favorite-button${isFavorite ? ' active' : ''}`}
                aria-pressed={isFavorite}
                aria-label={`Favorite ${pokemon.name}`}
                onClick={() => onToggleFavorite(pokemon.id)}
              >
                <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span> Favorite
              </button>
            )}
            {onToggleCompare && (
              <button
                type="button"
                className={`card-action-button compare-button${isCompared ? ' active' : ''}`}
                aria-pressed={isCompared}
                aria-label={`Compare ${pokemon.name}`}
                onClick={() => onToggleCompare(pokemon.id)}
              >
                Compare
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
