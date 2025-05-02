// src/components/SearchBar.jsx
import React from 'react'

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokémon by name..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="search-bar"
    />
  )
}

export default SearchBar
