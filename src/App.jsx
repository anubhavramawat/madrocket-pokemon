import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonList from './components/PokemonList';
import usePokemonData from './hooks/usePokemonData';

function App() {
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { pokemons, loading, error, types } = usePokemonData();

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? pokemon.types.includes(selectedType) : true;
    return matchesName && matchesType;
  });

  return (
    <div className="container">
      <Header />
      <div className="controls">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter types={types} selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>

      {loading && <p>Loading Pokémon...</p>}
      {error && <p>Error fetching data!</p>}
      {!loading && !error && (
        <PokemonList pokemons={filteredPokemons} />
      )}

      {!loading && !error && filteredPokemons.length === 0 && (
        <p>No Pokémon match your search!</p>
      )}
    </div>
  );
}

export default App;
