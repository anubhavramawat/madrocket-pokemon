import { useEffect, useState } from 'react';

const usePokemonData = () => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default,
              types: details.types.map(typeInfo => typeInfo.type.name),
            };
          })
        );

        setPokemons(pokemonDetails);

        // Extract all types
        const allTypes = [...new Set(pokemonDetails.flatMap(p => p.types))];
        setTypes(allTypes);

      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  return { pokemons, types, loading, error };
};

export default usePokemonData;
