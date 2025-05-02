import { useState } from 'react'

const usePagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(items.length / itemsPerPage)

  const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return { currentItems, currentPage, maxPage, setCurrentPage }
}

export default usePagination
