import { useEffect} from "react"
import { Link } from "react-router-dom"
import useGlobalState from "../store/GlobalState"

const GetAllBooks = () => {
  const { fetchAllBooks, allBooks } = useGlobalState()

  useEffect(() => {
    fetchAllBooks()
  }, [])

  const defaultImage =
    "https://i.pinimg.com/736x/39/63/0d/39630d738fa51ab55d30bd4b0b42cb3a.jpg"

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl text-[#34302c] font-thin">All Books</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-6">
        {allBooks.map((book) => (
          <div
            key={book.id}
            className="relative flex flex-col items-center text-center space-y-2 group"
          >
            {/* Book cover container */}
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
              {/* Title */}
              <p className="text-m text-[#34302c]">{book.title}</p>
            </Link>
            {/* Author name*/}
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
