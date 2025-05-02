// src/pages/Home.jsx
import React, { useEffect, useState, useMemo } from "react";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";
import SortSelect from "../components/SortSelect";
import SearchBar from "../components/SearchBar";
import TypeFilter from "../components/TypeFilter";
import { sortPokemon } from "../utils/sortUtils";
import { Link } from "react-router";

const itemsPerPageOptions = [10, 20, 50];
const sortOptions = [
  { label: "ID", value: "id" },
  { label: "Name (A-Z)", value: "name-asc" },
  { label: "Name (Z-A)", value: "name-desc" },
];

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        const data = await response.json();
        const details = await Promise.all(
          data.results.map((p) => fetch(p.url).then((res) => res.json()))
        );
        setPokemonList(details);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const filtered = useMemo(() => {
    return pokemonList.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = selectedType
        ? pokemon.types.some((t) => t.type.name === selectedType.toLowerCase())
        : true;
      return matchesSearch && matchesType;
    });
  }, [pokemonList, searchTerm, selectedType]);


  const sortedPokemon = useMemo(() => {
    return sortPokemon(filtered, sortBy);
  }, [filtered, sortBy]);

  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedPokemon.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(sortedPokemon.length / itemsPerPage);


  // Reset page if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType, itemsPerPage, sortBy]);

  if (error) return <p>Failed to load Pokémon.</p>;
  if (loading) return <p>Loading Pokémon...</p>;

  return (
    <div className="container">
      <div className="controls">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <TypeFilter selectedType={selectedType} onChange={setSelectedType} />
        <label>Sort by:</label>
        <SortSelect
          options={sortOptions}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        />

        <label>Items per page:</label>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {itemsPerPageOptions.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <Link className="back-button" to="/favorites">My Favourites</Link>
        <Link className="back-button" to="/compare">Compare Pokemons</Link>
      </div>

      <div className="grid">
        {currentItems.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
