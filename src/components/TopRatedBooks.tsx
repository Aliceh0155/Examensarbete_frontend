import { useState, useEffect } from "react"
import { BookInterface } from "../interface/BookInterface"
import { Link } from "react-router-dom"
import useGlobalState from "../store/GlobalState"

//This component returns 15 books based on the highest rating

const TopRatedBooks = () => {
  const { allBooks, fetchAllBooks } = useGlobalState()
  const [topRatedBooks, setTopRatedBooks] = useState<BookInterface[]>([])

  useEffect(() => {
    fetchAllBooks()
  }, [])

  useEffect(() => {
    if (allBooks.length > 0) {
      const sortedBooks = allBooks
        .sort((a, b) => b.ratingsAverage - a.ratingsAverage)
        .slice(0, 15)
      setTopRatedBooks(sortedBooks)
      console.log(topRatedBooks)
    }
  }, [allBooks])

  const defaultImage =
    "https://i.pinimg.com/736x/39/63/0d/39630d738fa51ab55d30bd4b0b42cb3a.jpg"

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl text-[#34302c] font-thin">Top Rated Books</h2>
      </div>

      {/* Div with scroll container and shelf */}
      <div className="relative mb-16 w-[98%] mx-auto">
        {/* Scroll container */}
        <div className="overflow-x-auto pl-6 pr-6">
          <div className="flex space-x-16 min-w-max">
            {topRatedBooks.map((book) => (
              <div
                key={book.id}
                className="relative flex flex-col items-center text-center space-y-4 group"
              >
                {/* Book container */}
                <div className="relative group shadow-md transition-shadow duration-300 max-w-[115px]">
                  <Link to={`/book/${book.id}`} className="block">
                    {/* Book cover */}
                    <img
                      src={
                        book.coverImageUrl !== ""
                          ? book.coverImageUrl
                          : defaultImage
                      }
                      alt="Cover"
                      className="w-[110px] h-[170px] object-cover rounded-sm transition-opacity duration-300 group-hover:opacity-15 bg-transparent shadow-[5px_15px_15px_8px_rgba(0,0,0,0.2)]"
                    />

                    {/* Title and rating. Only shown when hovering */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-lg font-light">{book.title}</p>
                      <p className="text-lg font-light">
                        Rating: {book.ratingsAverage}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book shelf */}
        <div className="absolute bottom-[-15px] w-full h-4 bg-[#F5F1E7] shadow-[10px_10px_10px_5px_rgba(0,0,0,0.2)] rounded-sm"></div>
      </div>
    </div>
  )
}

export default TopRatedBooks
