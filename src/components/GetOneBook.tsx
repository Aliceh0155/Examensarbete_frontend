import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import EditFavorites from "./EditFavorites"
import EditWantToRead from "./EditWantToRead"
import EditCurrentlyReading from "./EditCurrentlyReading"
import useGlobalState from "../store/GlobalState"

const GetOneBook = () => {
  const { id } = useParams<{ id?: string }>()
  const { oneBook, fetchOneBook } = useGlobalState()

  useEffect(() => {
    if (id) {
      fetchOneBook(id)
      console.log(oneBook)
    }
  }, [id, fetchOneBook])

  const defaultImage =
    "https://i.pinimg.com/736x/39/63/0d/39630d738fa51ab55d30bd4b0b42cb3a.jpg"

  return oneBook ? (
    <div className="flex bg-[#F5F1E7] shadow-md rounded-lg overflow-hidden w-[1000px] h-[600px] mx-auto">
      {/* Left Section */}
      <div className="p-10 flex flex-col justify-center space-y-6 text-[#322c25] max-w-[500px]">
        <h1 className="text-3xl font-bold mb-2">{oneBook.title}</h1>
        <Link to={`/author/${oneBook.authorKey}`}>
          <h2 className="text-xl font-semibold mb-4">{oneBook.authorName}</h2>
        </Link>
        <div className="text-base leading-relaxed max-h-[140px] overflow-auto">
          {/* Description with scroll if needed */}
          <p>{oneBook.description}</p>
        </div>
        <div className="space-x-2 space-y-4">
          {/* Buttons */}
          {id && (
            <>
              <EditFavorites bookId={id} />
              <EditWantToRead bookId={id} />
              <EditCurrentlyReading bookId={id} />
            </>
          )}
        </div>
      </div>

      {/* Right Section with cover image */}
      <div className="flex-shrink-0 flex flex-col justify-center items-center w-[50%] p-2">
        <img
          src={
            oneBook.coverImageUrl !== "" ? oneBook.coverImageUrl : defaultImage
          }
          alt={oneBook.title}
          className="w-[230px] h-[350px] object-cover rounded-md"
        />
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default GetOneBook
