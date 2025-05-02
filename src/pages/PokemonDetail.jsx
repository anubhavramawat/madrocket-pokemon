import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
//import "./PokemonDetails.css"; // new CSS file

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);

        // Evolution Chain
        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        const chain = [];
        let current = evoData.chain;
        while (current) {
          chain.push(current.species.name);
          current = current.evolves_to[0];
        }
        setEvolution(chain);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [id]);

  if (error) return <p>❌ Error loading Pokémon details</p>;
  if (loading) return <p>⏳ Loading...</p>;
  if (!pokemon) return null;

  return (
    <div className="details-container">
      <Link className="back-button" to="/">← Back to List</Link>
      <div className="details-card">
        <img
          className="pokemon-img"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <h2>{pokemon.name} <span className="pokemon-id">#{pokemon.id}</span></h2>

        <div className="section">
          <strong>Types:</strong>
          <ul className="type-list">
            {pokemon.types.map((t) => (
              <li key={t.type.name}>{t.type.name}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <strong>Stats:</strong>
          <div className="stats">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="stat-bar">
                <span>{stat.stat.name}</span>
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

        <div className="section">
          <strong>Abilities:</strong>
          <ul>
            {pokemon.abilities.map((a) => (
              <li key={a.ability.name}>{a.ability.name}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <strong>Moves:</strong>
          <ul className="move-list">
            {pokemon.moves.slice(0, 10).map((m) => (
              <li key={m.move.name}>{m.move.name}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <strong>Evolution Chain:</strong>
          <p>{evolution.join(" → ")}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
