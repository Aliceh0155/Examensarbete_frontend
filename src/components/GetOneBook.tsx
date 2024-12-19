import axios from "axios"
import { useState, useEffect } from "react"
import { BookInterface } from "../interface/BookInterface"

const GetOneBook = () => {
  const [book, setBook] = useState<BookInterface>()

  useEffect(() => {
    fetchBook("675ea898496e13418a9b0413")
  }, [])

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
  return (
    <div className="flex bg-[#F5F1E7] shadow-md rounded-lg overflow-hidden w-[900px] h-[550px] mx-auto">
      {/* Left Section */}
      <div className="p-8 flex flex-col justify-center text-[#4F483F] max-w-[400px]">
        <h1 className="text-3xl font-bold mb-2">{book?.title}</h1>
        <h2 className="text-xl font-semibold mb-4">
          Author: Antoine de Saint-Exupéry
        </h2>
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
      </div>
    </div>
  )
}

export default GetOneBook
