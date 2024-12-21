import { useEffect, useState } from "react"
import { BookInterface } from "../interface/BookInterface"
import axios from "axios"
import { Link } from "react-router-dom"

const FavoriteBooks = () => {
  const [book, setBook] = useState<BookInterface[]>([])
  const [allBooks, setallBooks] = useState<BookInterface[]>([])
  const [favoriteId, setfavoriteId] = useState<String[]>([])
  const token = localStorage.getItem("jwtToken")

  const fetchBooks = async () => {
    try {
      const allBooksResponse = await axios.get(
        "http://localhost:8080/database/getAllBooksFromDatabase",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setallBooks(allBooksResponse.data)

      const favoriteIdResponse = await axios.get(
        "http://localhost:8080/user/getFavoriteBooks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setfavoriteId(favoriteIdResponse.data)
      console.log(favoriteIdResponse.data)
    } catch (error) {
      console.error("Error fetching favorites", error)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    const filterFavorites = allBooks.filter((book) =>
      favoriteId.includes(book.id)
    )
    setBook(filterFavorites)
  }, [allBooks, favoriteId])

  return (
    <div className="">
      <div className="flex items-center justify-between mb-2">
        <h2 className="pl-4 text-xl text-[#322c25] font-thin">
          My Favorite Books
        </h2>
      </div>

      {/* Parent div */}
      <div className="relative mb-10 w-[94%] mx-auto">
        {/* Scroll container */}
        <div className="overflow-x-auto pl-6 pr-6">
          <div className="flex space-x-12 min-w-max">
            {book.map((book) => (
              <div
                key={book.id}
                className="relative flex flex-col items-center text-center space-y-2 group"
              >
                {/* Container for book cover */}
                <div className="relative group shadow-md transition-shadow duration-300 max-w-[110px]">
                  <Link to={`/book/${book.id}`}>
                    <img
                      src={book.coverImageUrl}
                      alt="Cover"
                      className="w-[85px] h-[128px] object-cover rounded-sm transition-opacity duration-300 group-hover:opacity-40 bg-transparent shadow-[5px_15px_15px_8px_rgba(0,0,0,0.2)]"
                    />

                    {/* Title only shown when hover */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-normal">{book.title}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book shelf */}
        <div className="absolute bottom-[-10px] w-full h-2 bg-[#F5F1E7] shadow-[10px_10px_10px_5px_rgba(0,0,0,0.2)] rounded-sm"></div>
      </div>
    </div>
  )
}

export default FavoriteBooks
