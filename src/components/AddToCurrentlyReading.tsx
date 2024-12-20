import { useState } from "react"
import axios from "axios"
import { AddListInterface } from "../interface/AddListInterface"

const AddToCurrentlyReading = ({ bookId }: AddListInterface) => {
  const [currentlyReading, setcurrentlyReading] = useState(false)

  const handleAddCurrentlyReading = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/user/addBookToCurrentlyReading/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      )

      if (response.status === 200) {
        setcurrentlyReading(true)
        alert("Book added to currently reading!")
      } else {
        alert("Failed to add book to currently reading.")
      }
    } catch (error) {
      console.error("Error adding book to currently reading:", error)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <button onClick={handleAddCurrentlyReading} disabled={currentlyReading}>
      {currentlyReading ? "Added to currently reading" : "Add to currently reading"}
    </button>
  )
}

export default AddToCurrentlyReading
