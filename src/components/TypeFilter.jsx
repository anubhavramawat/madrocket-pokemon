// src/components/TypeFilter.jsx
import React, { useEffect, useState } from 'react'

const TypeFilter = ({ selectedType, onChange }) => {
  const [types, setTypes] = useState([])

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/type')
      const data = await res.json()
      // Filter out unused types like 'shadow' and 'unknown'
      const validTypes = data.results.filter(
        t => !['shadow', 'unknown'].includes(t.name)
      )
      setTypes(validTypes)
    }

    fetchTypes()
  }, [])

  return (
    <select value={selectedType} onChange={e => onChange(e.target.value)} className="type-filter">
      <option value="">All Types</option>
      {types.map(type => (
        <option key={type.name} value={type.name}>
          {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
        </option>
      ))}
    </select>
  )
}

export default TypeFilter
