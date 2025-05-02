import React from 'react'

const StatComparison = ({ pokemon1, pokemon2 }) => {
  console.log(pokemon1, pokemon2)
  if (!pokemon1 || !pokemon2) return <p>Select two Pokémon to compare.</p>

  return (
    <div className="comparison">
      <h3>Comparison</h3>
      <table>
        <thead>
          <tr>
            <th>Stat</th>
            <th>{pokemon1.name}</th>
            <th>{pokemon2.name}</th>
          </tr>
        </thead>
        <tbody>
          {pokemon1.stats.map((stat, i) => (
            <tr key={stat.stat.name}>
              <td>{stat.stat.name}</td>
              <td>{stat.base_stat}</td>
              <td>{pokemon2.stats[i]?.base_stat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StatComparison