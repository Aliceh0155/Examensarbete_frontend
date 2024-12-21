import axios from "axios"
import { useState, useEffect } from "react"
import { BookInterface } from "../interface/BookInterface"
import { Link, useParams } from "react-router-dom"
import AddToFavorites from "./AddToFavorites"
import AddToWantToRead from "./AddToWantToRead"
import AddToCurrentlyReading from "./AddToCurrentlyReading"

const GetOneBook = () => {
  const [book, setBook] = useState<BookInterface>()
  const { id } = useParams<{ id?: string }>()

  const fetchBook = async (bookId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/database/getOneBookFromDatabase/${bookId}`
      )
      setBook(response.data)
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching book", error)
    }
  }

  useEffect(() => {
    if (id) {
      fetchBook(id)
    }
  }, [id])

  const defaultImage =
    "https://i.pinimg.com/736x/39/63/0d/39630d738fa51ab55d30bd4b0b42cb3a.jpg"

  return book ? (
    <div className="flex bg-[#F5F1E7] shadow-md rounded-lg overflow-hidden w-[1000px] h-[600px] mx-auto">
      {/* Left Section */}
      <div className="p-10 flex flex-col justify-center space-y-6 text-[#322c25] max-w-[500px]">
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <Link to={`/author/${book.authorKey}`}>
          <h2 className="text-xl font-semibold mb-4">{book.authorName}</h2>
        </Link>
        <div className="text-base leading-relaxed max-h-[140px] overflow-auto">
          {/* Description with scroll if needed */}
          <p>{book.description}</p>
        </div>
        <div className="space-x-2 space-y-4">
          {/* Buttons */}
          {id && (
            <>
              <AddToFavorites bookId={id} />
              <AddToWantToRead bookId={id} />
              <AddToCurrentlyReading bookId={id} />
            </>
          )}
        </div>
      </div>

      {/* Right Section with cover image */}
      <div className="flex-shrink-0 flex flex-col justify-center items-center w-[50%] p-2">
        <img
          src={book.coverImageUrl !== "" ? book.coverImageUrl : defaultImage}
          alt={book.title}
          className="w-[230px] h-[350px] object-cover rounded-md"
        />
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default GetOneBook
