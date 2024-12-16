import { useEffect, useState } from "react"
import axios from "axios"
import { BookInterface } from "../interface/BookInterface"

const GetAllBooks = () => {
  const [book, setBook] = useState<BookInterface[]>([])

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/database/getAllBooksFromDatabase"
      )
      console.log(response.data)
      setBook(response.data)
    } catch (error) {
      console.log("Error fetching books", error)
    }
  }

  useEffect(() => {
    fetchBooks();
  }, [])
  

  return (
    <div>
      <div>GetAllBooks</div>
      <div>Books: {book.map((book) =>(
        <div key= {book.id}>
        <p>{book.title}</p>
        <img src={book.coverImageUrl} alt="IMAGE" />
        </div>
        ))}</div>
    </div>
  )
}

export default GetAllBooks
