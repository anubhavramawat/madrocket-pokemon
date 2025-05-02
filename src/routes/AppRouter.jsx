import { Routes, Route } from 'react-router'
import Home from '../pages/Home'
import Favorites from '../pages/Favourites'
import PokemonDetail from '../pages/PokemonDetail'
import Comparison from '../pages/Comparison'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
      <Route path="/compare" element={<Comparison />} />
    </Routes>
  )
}
