import { useEffect, useState } from "react"
import axios from "axios"
import { BookInterface } from "../interface/BookInterface"

const GetAllBooks = () => {
  const [book, setBook] = useState<BookInterface[]>([])

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/database/getAllBooksFromDatabase"
      )
      console.log(response.data)
      setBook(response.data)
    } catch (error) {
      console.log("Error fetching books", error)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const defaultImage =
    "https://i.pinimg.com/736x/39/63/0d/39630d738fa51ab55d30bd4b0b42cb3a.jpg"

  https: return (
    <div className="p-6">
      {/* Titel för sidan */}
      <h2 className="text-3xl font-semibold text-center mb-6">All Books</h2>

      {/* Grid för böcker */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-6">
        {book.map((book) => (
          <div
            key={book.id}
            className="relative flex flex-col items-center text-center space-y-2 group"
          >
            {/* Flex-container för bokomslag */}
            <div className="relative max-w-[110px]">
              {/* Bokomslag */}
              <img
                src={
                  book.coverImageUrl !== "" ? book.coverImageUrl : defaultImage
                }
                alt="Cover"
                className="w-full h-[160px] object-cover rounded-sm transition-opacity duration-300 group-hover:opacity-75 bg-transparent shadow-[5px_5px_10px_rgba(0,0,0,0.1)]"
              />
            </div>

            {/* Titel */}
            <p className="text-lg font-semibold text-gray-800">{book.title}</p>

            {/* Författarens namn */}
            <p className="text-sm text-gray-600">{book.authorName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetAllBooks
