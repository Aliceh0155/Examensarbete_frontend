import axios from "axios"
import { useState, useEffect } from "react"
import { BookInterface } from "../interface/BookInterface"
import { Link, useNavigate, useParams } from "react-router-dom"
import AddToFavorites from "./AddToFavorites"
import AddToWantToRead from "./AddToWantToRead"
import AddToCurrentlyReading from "./AddToCurrentlyReading"

const GetOneBook = () => {
  const [book, setBook] = useState<BookInterface>()
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const token = localStorage.getItem("jwtToken")
  

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token, navigate])

  const fetchBook = async (bookId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/database/getOneBookFromDatabase/${bookId}`
      )
      setBook(response.data)
      console.log(response.data)
    } catch (error) {
      console.log("Error error errorrr...")
    }
  }

  useEffect(() => {
    if (id && token) {
      fetchBook(id)
    }
  }, [id, token])



  return (
    <div className="flex bg-[#F5F1E7] shadow-md rounded-lg overflow-hidden w-[900px] h-[550px] mx-auto">
      {/* Left Section */}
      <div className="p-8 flex flex-col justify-center text-[#4F483F] max-w-[400px]">
        <h1 className="text-3xl font-bold mb-2">{book?.title}</h1>
        <Link to={`/author/${book?.authorKey}`}>
          <h2 className="text-xl font-semibold mb-4">{book?.authorName}</h2>
        </Link>
        <p className="text-base leading-relaxed">{book?.description}</p>
      </div>

      {/* Right Section */}
      <div className="flex-shrink-0 flex justify-center items-center w-[50%]">
        <div className="p-4">
          <img
            src={book?.coverImageUrl}
            alt={book?.title}
            className="w-[200px] h-[300px] object-cover rounded-md"
          />
        </div>
        {id && <AddToFavorites bookId={id} />}
        {id && <AddToWantToRead bookId={id} />}
        {id && <AddToCurrentlyReading bookId={id} />}
      </div>
    </div>
  )
}

export default GetOneBook
