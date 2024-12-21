import axios from "axios"
import React, { useEffect, useState } from "react"
import { BookInterface } from "../interface/BookInterface"

const BooksBySubject = () => {
  const [books, setBooks] = useState<BookInterface[]>([])
  const [filteredBooks, setFilteredBooks] = useState<BookInterface[]>([])

  const categories = [
    "Fiction",
    "Cooking",
    "Art",
    "Travel",
    "History",
    "Children's books",
    "Fantasy",
    "Science",
    "Romance",
  ]

  // Hämtar alla böcker
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/database/getAllBooksFromDatabase"
      )
      setBooks(response.data)
      setFilteredBooks(response.data) // Initiera med alla böcker
    } catch (error) {
      console.log("Error fetching books", error)
    }
  }

  // Filtrera böcker baserat på kategori
  const filterBooksByCategory = (category: string) => {
    const filtered = books.filter((book: BookInterface) =>
      book.subjects?.includes(category)
    )
    setFilteredBooks(filtered)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Books By Category
      </h2>

      {/* Kategoriknappar */}
      <div className="flex flex-wrap justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterBooksByCategory(category)}
            className="px-4 py-2 mx-2 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid för böcker */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-600">
            No books found for this category.
          </p>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="relative flex flex-col items-center text-center space-y-2 group"
            >
              {/* Flex-container för bokomslag */}
              <div className="relative max-w-[110px]">
                {/* Bokomslag */}
                <img
                  src={
                    book.coverImageUrl !== ""
                      ? book.coverImageUrl
                      : "default-image-url"
                  }
                  alt="Cover"
                  className="w-full h-[160px] object-cover rounded-sm transition-opacity duration-300 group-hover:opacity-75 bg-transparent shadow-[5px_5px_10px_rgba(0,0,0,0.1)]"
                />
              </div>

              {/* Titel */}
              <p className="text-lg font-semibold text-gray-800">
                {book.title}
              </p>

              {/* Författarens namn */}
              <p className="text-sm text-gray-600">{book.authorName}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default BooksBySubject
