import { useState } from 'react';
import AppRouter from './routes/AppRouter'
import Header from './components/Header'
import { FavoritesProvider } from './contexts/FavoritesContext'
// import SearchBar from './components/SearchBar';
// import TypeFilter from './components/TypeFilter';
// import PokemonList from './components/PokemonList';
// import usePokemonData from './hooks/usePokemonData';

function App() {
  return (
    <FavoritesProvider>
      <Header />
      <AppRouter />
    </FavoritesProvider>
  );
}

export default App;
