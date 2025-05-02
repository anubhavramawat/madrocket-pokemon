// src/utils/sortUtils.js
export const sortPokemon = (list, sortBy) => {
    switch (sortBy) {
      case 'id':
        return [...list].sort((a, b) => a.id - b.id)
      case 'name-asc':
        return [...list].sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return [...list].sort((a, b) => b.name.localeCompare(a.name))
      default:
        return list
    }
  }