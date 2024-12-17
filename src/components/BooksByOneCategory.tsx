import axios from "axios"
import { useEffect, useState } from "react"
import { BookInterface } from "../interface/BookInterface"

const BooksByOneCategory = () => {
  const [book, setBook] = useState<BookInterface[]>([])
  const [fictionBooks, setFictionBooks] = useState<BookInterface[]>([])

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/database/getAllBooksFromDatabase"
      )

      setBook(response.data)

      const fictionBooks = response.data
        .filter((book: BookInterface) =>
          book.subjects?.includes("Children's books")
        )
        .slice(0, 15)

      setFictionBooks(fictionBooks)
      console.log(fictionBooks)
    } catch (error) {
      console.log("Error fetching books", error)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <div className="p-6">
      {/* Rad för titel och böcker */}
      <div className="flex items-center justify-between mb-2">
        {/* Titel för Top Rated Books */}
        <h2 className="text-2xl font-semibold font-serif">Children's Books</h2>

        {/* Horisontell scroll-container */}
        <div className="overflow-x-auto">
          {/* Rutnät för böcker, håller böcker i en rad och ger utrymme för scroll */}
          <div className="flex space-x-6 min-w-max">
            {fictionBooks.map((book) => (
              <div
                key={book.id}
                className="relative flex flex-col items-center text-center space-y-4 group"
                style={{ minWidth: "160px" }} // Sätt ett minsta bredd för varje bok
              >
                {/* Flex-container för bokomslag */}
                <div className="relative group shadow-md transition-shadow duration-300">
                  {/* Bokomslag */}
                  <img
                    src={book.coverImageUrl}
                    alt="Cover"
                    className="w-22 h-40 object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-40 bg-transparent shadow-[15px_6px_12px_4px_rgba(0,0,0,0.1)]"
                  />

                  {/* Texten: Titel och betyg (döljs normalt, visas vid hover) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-lg font-semibold">{book.title}</p>
                    
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

export default BooksByOneCategory
