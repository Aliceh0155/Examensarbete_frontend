import axios from "axios"
import { useState, useEffect } from "react"
import { BookInterface } from "../interface/BookInterface"
import { Link } from "react-router-dom"

const WantToRead = () => {
  const [book, setBook] = useState<BookInterface[]>([])
  const [allBooks, setallBooks] = useState<BookInterface[]>([])
  const [wantToReadId, setwantToReadId] = useState<String[]>([])

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("jwtToken")
      const allBooksResponse = await axios.get(
        "http://localhost:8080/database/getAllBooksFromDatabase",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setallBooks(allBooksResponse.data)

      const wantToReadResponse = await axios.get(
        "http://localhost:8080/user/getWantToRead",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setwantToReadId(wantToReadResponse.data)
    } catch (error) {
      console.error("Error fetching want to read", error)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    const filterWantToRead = allBooks.filter((book) =>
      wantToReadId.includes(book.id)
    )
    setBook(filterWantToRead)
  }, [allBooks, wantToReadId])

  return (
    <div className="">
      {/* Rad för titel och böcker */}
      <div className="flex items-center justify-between mb-2">
        {/* Titel för Children's Books */}
        <h2 className="text-2xl font-semibold font-thin">Want To Read</h2>
      </div>

      {/* Föräldradiv som håller både scrollcontainer och hylla */}
      <div className="relative mb-16 w-[88%] mx-auto">
        {/* Scroll-container för böcker */}
        <div className="overflow-x-auto pl-6 pr-6">
          {/* Rutnät för böcker, håller böcker i en rad */}
          <div className="flex space-x-16 min-w-max">
            {book.map((book) => (
              <div
                key={book.id}
                className="relative flex flex-col items-center text-center space-y-4 group"
              >
                {/* Flex-container för bokomslag */}
                <div className="relative group shadow-md transition-shadow duration-300 max-w-[115px]">
                  {/* Bokomslag */}
                  <Link to={`/book/${book.id}`}>
                    <img
                      src={book.coverImageUrl}
                      alt="Cover"
                      className=" w-full h-[100px] object-cover rounded-sm transition-opacity duration-300 group-hover:opacity-40 bg-transparent shadow-[5px_15px_15px_8px_rgba(0,0,0,0.2)]"
                    />
                  </Link>

                  {/* Texten: Titel och betyg (döljs normalt, visas vid hover) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/book/${book.id}`}>
                      <p className="text-lg font-semibold">{book.title}</p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hyllan under böckerna */}
        <div className="absolute bottom-[-10px] w-full h-2 bg-[#F5F1E7] shadow-[10px_10px_10px_5px_rgba(0,0,0,0.2)] rounded-sm"></div>
      </div>
    </div>
  )
}

export default WantToRead
