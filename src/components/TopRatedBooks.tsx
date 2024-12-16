import axios from "axios"
import { useState, useEffect } from "react"
import { BookInterface } from "../interface/BookInterface"

const TopRatedBooks = () => {
  const [book, setBook] = useState<BookInterface[]>([])
  const [topRatedBooks, setTopRatedBooks] = useState<BookInterface[]>([])

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/database/getAllBooksFromDatabase"
      )

      setBook(response.data)

      const topRatedBooks = response.data
        .sort(
          (a: BookInterface, b: BookInterface) =>
            b.ratingsAverage - a.ratingsAverage
        )
        .slice(0, 15)

      setTopRatedBooks(topRatedBooks)
      console.log(topRatedBooks)
    } catch (error) {
      console.log("Error fetching books", error)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <div className="p-8">
      {/* Rad för titel och böcker */}
      <div className="flex items-center justify-between mb-6">
        {/* Titel för Top Rated Books */}
        <h2 className="text-2xl font-semibold font-serif">Top Rated Books</h2>

        {/* Horisontell scroll-container */}
        <div className="overflow-x-auto">
          {/* Rutnät för böcker, håller böcker i en rad och ger utrymme för scroll */}
          <div className="flex space-x-6 min-w-max">
            {topRatedBooks.map((book) => (
              <div
                key={book.id}
                className="relative flex flex-col items-center text-center space-y-4 group"
                style={{ minWidth: "200px" }} // Sätt ett minsta bredd för varje bok
              >
                {/* Flex-container för bokomslag */}
                <div className="relative group shadow-md transition-shadow duration-300">
                  {/* Bokomslag */}
                  <img
                    src={book.coverImageUrl}
                    alt="Cover"
                    className="w-32 h-48 object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-40 bg-transparent shadow-[15px_6px_12px_4px_rgba(0,0,0,0.1)]"
                  />

                  {/* Texten: Titel och betyg (döljs normalt, visas vid hover) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-lg font-semibold">{book.title}</p>
                    <p className="text-black mt-2">
                      Rating: {book.ratingsAverage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopRatedBooks
