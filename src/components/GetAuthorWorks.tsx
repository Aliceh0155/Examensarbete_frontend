import axios from "axios"
import { useState, useEffect } from "react"
import { BookInterface } from "../interface/BookInterface"
import { useParams } from "react-router-dom"

const GetAuthorWorks = () => {
  const [bookKeys, setBookKeys] = useState<string[]>([])
  const [books, setBooks] = useState<BookInterface[]>([])
  const { key } = useParams<{ key: string }>()


  const fetchBookKeys = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/database/booksByAuthor/${key}`
      )
      setBookKeys(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/database/getAllBooksFromDatabase"
      )
      const filteredBooks = response.data.filter((book: BookInterface) =>
        bookKeys.includes(book.key)
      )
      setBooks(filteredBooks)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (key) {
      fetchBookKeys()
    }
  }, [key])

  useEffect(() => {
    if (bookKeys.length > 0) {
      fetchBooks()
    }
  }, [bookKeys])

  return (
    <div>
      {books.length === 0 ? (
        <p>No books found for this author.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.key}>
              <h2>{book.title}</h2>
              <p>{book.authorName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default GetAuthorWorks 
