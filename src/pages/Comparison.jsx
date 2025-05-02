import React, { useEffect, useState } from "react";
//import "./Comparison.css";

const Comparison = () => {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [error, setError] = useState("");

  const fetchPokemon = async (name, setter) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setter(data);
      setError("");
    } catch {
      setError("One or both Pokémon not found.");
    }
  };

  useEffect(() => {
    if (input1) fetchPokemon(input1, setPokemon1);
    if (input2) fetchPokemon(input2, setPokemon2);
  }, [input1, input2]);

  return (
    <div className="comparison-container">
      <h2>Compare Pokémon</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter first Pokémon"
          onBlur={(e) => setInput1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter second Pokémon"
          onBlur={(e) => setInput2(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="comparison-grid">
        {[pokemon1, pokemon2].map((pokemon, index) => (
          pokemon ? (
            <div key={pokemon.id} className="poke-card">
              <h3>{pokemon.name} <span className="poke-id">#{pokemon.id}</span></h3>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <div className="types">
                {pokemon.types.map(t => (
                  <span key={t.type.name} className={`type-badge ${t.type.name}`}>
                    {t.type.name}
                  </span>
                ))}
              </div>
              <div className="section">
                <strong>Abilities:</strong>
                <ul>
                  {pokemon.abilities.map(a => (
                    <li key={a.ability.name}>{a.ability.name}</li>
                  ))}
                </ul>
              </div>
              <div className="section">
                <strong>Stats:</strong>
                {pokemon.stats.map(stat => (
                  <div key={stat.stat.name} className="stat-bar">
                    <label>{stat.stat.name}</label>
                    <div className="bar">
                      <div
                        className="fill"
                        style={{ width: `${stat.base_stat / 2}%` }}
                      >
                        {stat.base_stat}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="poke-card placeholder" key={index}>
              <p>Waiting for input...</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Comparison;
