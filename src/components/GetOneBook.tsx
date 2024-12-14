import axios from "axios"
import { useState, useEffect } from "react"
import { OneBookInterface } from "../interface/OneBookInterface"

const GetOneBook = () => {
  const [book, setbook] = useState<OneBookInterface>()

  useEffect(() => {
    fetchBook("675c1f41fb5bda1ae9cd654d")
  }, [])

  const fetchBook = async (bookId: String) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/database/getOneBookFromDatabase/${bookId}`
      )
      setbook(response.data)
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
