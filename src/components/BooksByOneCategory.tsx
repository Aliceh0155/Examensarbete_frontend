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
        {/* Titel för Children's Books */}
        <h2 className="text-2xl font-semibold font-thin">Children's Books</h2>
      </div>

      {/* Föräldradiv som håller både scrollcontainer och hylla */}
      <div className="relative mb-16 w-[98%] mx-auto">
        {/* Scroll-container för böcker */}
        <div className="overflow-x-auto pl-6 pr-6">
          {/* Rutnät för böcker, håller böcker i en rad */}
          <div className="flex space-x-16 min-w-max">
            {fictionBooks.map((book) => (
              <div
                key={book.id}
                className="relative flex flex-col items-center text-center space-y-4 group"
              >
                {/* Flex-container för bokomslag */}
                <div className="relative group shadow-md transition-shadow duration-300 max-w-[115px]">
                  {/* Bokomslag */}
                  <img
                    src={book.coverImageUrl}
                    alt="Cover"
                    className=" w-full h-[160px] object-cover rounded-sm transition-opacity duration-300 group-hover:opacity-40 bg-transparent shadow-[5px_15px_15px_8px_rgba(0,0,0,0.2)]"
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

        {/* Hyllan under böckerna */}
        <div className="absolute bottom-[-15px] w-full h-4 bg-[#F5F1E7] shadow-[10px_10px_10px_5px_rgba(0,0,0,0.2)] rounded-sm"></div>
      </div>
    </div>
  )
}

export default BooksByOneCategory
