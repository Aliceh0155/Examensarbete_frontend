import { useEffect, useState } from "react"
import axios from "axios"
import { BookInterface } from "../interface/BookInterface"
import { Link } from "react-router-dom"

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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl text-[#34302c] font-thin">All Books</h2>
      </div>

      {/* Grid för böcker */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-6">
        {book.map((book) => (
          <div
            key={book.id}
            className="relative flex flex-col items-center text-center space-y-2 group"
          >
            {/* Flex-container för bokomslag */}
            <div className="relative max-w-[110px]">
              <Link to={`/book/${book.id}`} className="block">
                {/* Bokomslag */}
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
              {/* Titel */}
              <p className="text-m text-[#34302c]">{book.title}</p>
            </Link>
            {/* Författarens namn */}
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

export default GetAllBooks
