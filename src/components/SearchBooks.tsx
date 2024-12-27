import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useGlobalState from "../store/GlobalState"
import { BookInterface } from "../interface/BookInterface"
import { AuthorInterface } from "../interface/AuthorInterface"

const SearchBooks = () => {
  const { allBooks, fetchAllBooks, allAuthors, fetchAllAuthors } =
    useGlobalState()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredBooks, setFilteredBooks] = useState<BookInterface[]>([])
  const [filteredAuthors, setFilteredAuthors] = useState<AuthorInterface[]>([])

  useEffect(() => {
    if (allBooks.length === 0) fetchAllBooks()
    if (allAuthors.length === 0) fetchAllAuthors()
  }, [allBooks, allAuthors, fetchAllBooks, fetchAllAuthors])

  useEffect(() => {
    if (searchQuery.length === 0) {
      setFilteredBooks([])
      setFilteredAuthors([])
      return
    }

    const books = allBooks.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const authors = allAuthors.filter((author) =>
      author.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setFilteredBooks(books)
    setFilteredAuthors(authors)
  }, [searchQuery, allBooks, allAuthors])

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
        placeholder="Search for a book or author"
      />

      {/* Dropdown */}
      {(filteredBooks.length > 0 || filteredAuthors.length > 0) &&
        searchQuery.length > 0 && (
          <div className="absolute w-full bg-[#F5F1E7] border border-[#F5F1E7] shadow-lg max-h-60 overflow-auto z-50 mt-2">
            <ul>
              {filteredBooks.map((book) => (
                <li key={book.id}>
                  <Link
                    to={`/book/${book.id}`}
                    className="block p-2 text-sm text-[#322c25] hover:bg-[#E0D8C7]"
                  >
                    📚 {book.title}
                  </Link>
                </li>
              ))}
              {filteredAuthors.map((author) => (
                <li key={author.key}>
                  <Link
                    to={`/author/${author.key}`}
                    className="block p-2 text-sm text-[#322c25] hover:bg-[#E0D8C7]"
                  >
                    🧑🏻‍💼🖋️ {author.name}
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
