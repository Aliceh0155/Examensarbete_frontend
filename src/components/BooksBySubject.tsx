import axios from "axios"
import React, { useEffect, useState } from "react"
import { BookInterface } from "../interface/BookInterface"
import useGlobalState from "../store/GlobalState"
import { Link } from "react-router-dom"

const BooksBySubject = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { allBooks, filteredBooks, fetchBooksByCategory, fetchAllBooks } =
    useGlobalState()

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

  useEffect(() => {
    if (allBooks.length === 0) {
      fetchAllBooks()
    }
  }, [allBooks, fetchAllBooks])

  const filterBooks = (category: string) => {
    setActiveCategory(category)
    fetchBooksByCategory(category)
  }

  const resetToAllBooks = () => {
    setActiveCategory(null)
    fetchBooksByCategory("")
  }

  const defaultImage =
    "https://i.pinimg.com/736x/39/63/0d/39630d738fa51ab55d30bd4b0b42cb3a.jpg"

  return (
    <div className="p-6">
      {/* Buttons for category */}
      <div className="flex flex-wrap justify-center p-10 mb-6">
        <button
          onClick={resetToAllBooks}
          className={`px-4 py-2 mx-2 mb-2 rounded-lg transition duration-200 ${
            activeCategory === null
              ? "bg-[#E0D8C7] text-[#322c25]"
              : "bg-[#F5F1E7] text-[#322c25] hover:bg-[#E0D8C7]"
          }`}
        >
          All Books
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterBooks(category)}
            className={`px-4 py-2 mx-2 mb-2 rounded-lg transition duration-200 ${
              activeCategory === category
                ? "bg-[#E0D8C7] text-[#322c25]"
                : "bg-[#F5F1E7] text-[#322c25] hover:bg-[#E0D8C7]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Book container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-6">
        {(filteredBooks.length > 0 ? filteredBooks : allBooks).map((book) => (
          <div
            key={book.id}
            className="relative flex flex-col items-center text-center space-y-2 group"
          >
            <div className="relative max-w-[110px]">
              <Link to={`/book/${book.id}`} className="block">
                <img
                  src={
                    book.coverImageUrl !== ""
                      ? book.coverImageUrl
                      : defaultImage
                  }
                  alt={book.title}
                  className="w-full h-[150px] object-cover rounded-sm transition-opacity duration-300 group-hover:opacity-75 bg-transparent shadow-[5px_5px_10px_rgba(0,0,0,0.1)]"
                />
              </Link>
            </div>
            <Link to={`/book/${book.id}`} className="block">
              <p className="text-m text-[#34302c]">{book.title}</p>
            </Link>
            <Link to={`/author/${book.authorKey}`} className="block">
              <p className="text-m font-light text-[#34302c]">
                {book.authorName}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BooksBySubject
