import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useGlobalState from "../store/GlobalState"
import { BookInterface } from "../interface/BookInterface"

const SearchBooks = () => {
  const { allBooks, fetchAllBooks } = useGlobalState()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredBooks, setFilteredBooks] = useState<BookInterface[]>([])

  useEffect(() => {
    console.log("All books:", allBooks)
    if (searchQuery.length === 0) {
      setFilteredBooks([])
      return
    }

    const filtered = allBooks.filter(
      (book) => book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    console.log("Filtered books:", filtered)

    setFilteredBooks(filtered)
  }, [searchQuery, allBooks])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="relative w-full pt-[75px] max-w-md mx-auto">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full p-2 border border-[#F5F1E7] bg-[#faf8f3] rounded-2xl text-[#322c25]"
        placeholder="Search for a book title"
      />

      {/* Dropdown*/}
      {filteredBooks.length > 0 && searchQuery.length > 0 && (
        <div className="absolute w-full bg-[#F5F1E7] border border-[#F5F1E7] shadow-lg max-h-60 overflow-auto z-50 mt-2">
          <ul>
            {filteredBooks.map((book) => (
              <li key={book.id}>
                <Link
                  to={`/book/${book.id}`}
                  className="block p-2 text-sm text-[#322c25] hover:bg-[#E0D8C7]"
                >
                  {book.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBooks
