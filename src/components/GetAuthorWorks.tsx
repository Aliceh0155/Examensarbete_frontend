import axios from "axios"
import { useState, useEffect } from "react"
import { BookInterface } from "../interface/BookInterface"
import { useParams } from "react-router-dom"

const GetAuthorWorks = () => {
  const [bookKeys, setBookKeys] = useState<string[]>([])
  const [books, setBooks] = useState<BookInterface[]>([])
  const { key } = useParams<{ key: string }>()

  const fetchBookKeys = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/database/booksByAuthor/${key}`
      )
      setBookKeys(response.data)
      console.log(response.data)
    } catch (error) {
      console.log("Error fetching books for this author", error)
    }
  }

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/database/getAllBooksFromDatabase"
      )
      const filteredBooks = response.data.filter((book: BookInterface) =>
        bookKeys.includes(book.key)
      )
      setBooks(filteredBooks)
      console.log(filteredBooks)
    } catch (error) {
      console.log("Error fetching filtered books", error)
    }
  }

  useEffect(() => {
    fetchBookKeys()
  }, [key])

  useEffect(() => {
    fetchBooks()
  }, [bookKeys])

  const defaultImage =
    "https://i.pinimg.com/736x/39/63/0d/39630d738fa51ab55d30bd4b0b42cb3a.jpg"

  return (
    <div className="p-6">
      <div>
        {/* Titel */}
        <div className="flex justify-center items-center text-center p-8 mb-4">
          <h2 className="text-2xl text-[#34302c] font-light">
            More from this author
          </h2>
        </div>

        {/* Grid för böcker */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {books.map((book) => (
            <div
              key={book.key}
              className="relative flex flex-col items-center text-center space-y-2 group"
            >
              {/* Flex-container för bokomslag */}
              <div className="relative max-w-[110px]">
                {/* Bokomslag */}
                <img
                  src={
                    book.coverImageUrl && book.coverImageUrl !== ""
                      ? book.coverImageUrl
                      : defaultImage
                  }
                  alt={book.title}
                  className="w-full h-[150px] object-cover rounded-sm transition-opacity duration-300 group-hover:opacity-75 bg-transparent shadow-[5px_5px_10px_rgba(0,0,0,0.1)]"
                />
              </div>

              {/* Titel */}
              <p className="text-m text-[#34302c] font-medium">{book.title}</p>

              {/* Författarens namn */}
              {book.authorName && (
                <p className="text-sm font-light text-[#34302c]">
                  {book.authorName}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GetAuthorWorks
