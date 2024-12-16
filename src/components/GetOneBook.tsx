import axios from "axios"
import { useState, useEffect } from "react"
import { BookInterface } from "../interface/BookInterface"

const GetOneBook = () => {
  const [book, setBook] = useState<BookInterface>()

  useEffect(() => {
    fetchBook("675ea897496e13418a9b0411")
  }, [])

  const fetchBook = async (bookId: String) => {
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
    <div>
      <div>GetOneBook</div>
      <p>One book: {book?.title}</p>
    </div>
  )
}

export default GetOneBook
