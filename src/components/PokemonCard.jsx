// src/components/PokemonCard.jsx
import React, { useContext } from 'react'
import { FavoritesContext } from '../contexts/FavoritesContext'
import { Link } from 'react-router'

const PokemonCard = ({ pokemon }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext)
  const isFavorite = favorites.includes(pokemon.id)

  return (
    <div className="pokemon-card">
      <div className="card-header">
        <h3>{pokemon.name} #{pokemon.id}</h3>
        <button
          className={`fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => toggleFavorite(pokemon.id)}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <Link to={`/pokemon/${pokemon.id}`}>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </Link>

      <div className="types">
        {pokemon.types.map(t => (
          <span key={t.type.name} className={`type ${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PokemonCard