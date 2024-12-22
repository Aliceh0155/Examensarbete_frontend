import { useEffect, useState } from "react"
import { BookInterface } from "../interface/BookInterface"
import { Link } from "react-router-dom"
import useGlobalState from "../store/GlobalState"

//This component returns 15 books from the category/subject "Children's books"

const BooksByOneCategory = () => {
  const { allBooks } = useGlobalState()
  const [childrensBooks, setChildrensBooks] = useState<BookInterface[]>([])

  useEffect(() => {
    if (allBooks.length > 0) {
      const filteredBooks = allBooks
        .filter((book: BookInterface) =>
          book.subjects?.includes("Children's books")
        )
        .slice(0, 15)
      setChildrensBooks(filteredBooks)
    }
  }, [allBooks])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl text-[#322c25] font-thin">Children's Books</h2>
      </div>

      {/* Div with scroll container and shelf */}
      <div className="relative mb-16 w-[98%] mx-auto">
        {/* Scroll ontainer for books */}
        <div className="overflow-x-auto pl-6 pr-6">
          <div className="flex space-x-16 min-w-max">
            {childrensBooks.map((book) => (
              <div
                key={book.id}
                className="relative flex flex-col items-center text-center space-y-4 group"
              >
                {/* Container for book cover */}
                <div className="relative group shadow-md transition-shadow duration-300 max-w-[115px]">
                  <Link to={`/book/${book.id}`} className="block">
                    {/* Book cover */}
                    <img
                      src={book.coverImageUrl}
                      alt="Cover"
                      className="w-[110px] h-[170px] object-cover rounded-sm transition-opacity duration-300 group-hover:opacity-15 bg-transparent shadow-[5px_15px_15px_8px_rgba(0,0,0,0.2)]"
                    />

                    {/* Title, Only shown when hover*/}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-lg font-light">{book.title}</p>
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

export default BooksByOneCategory
