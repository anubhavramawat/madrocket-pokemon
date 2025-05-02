// src/pages/Favorites.jsx
import React, { useState, useEffect, useContext } from 'react'
import { FavoritesContext } from '../contexts/FavoritesContext'
import PokemonCard from '../components/PokemonCard'

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext)
  const [pokemonList, setPokemonList] = useState([])

  useEffect(() => {
    const fetchFavorites = async () => {
      const results = await Promise.all(
        favorites.map(id =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
        )
      )
      setPokemonList(results)
    }

    if (favorites.length > 0) {
      fetchFavorites()
    }
  }, [favorites])

  if (!favorites.length) return <p>No favorites yet.</p>

  return (
    <div className="container">
        <div className="grid">
      {pokemonList.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
    </div>
  )
}

export default Favorites
