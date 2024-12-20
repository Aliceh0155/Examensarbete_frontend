import { useState } from "react"
import axios from "axios"
import { AddListInterface } from "../interface/AddListInterface"

const AddToWantToRead = ({ bookId }: AddListInterface) => {
  const [wantToRead, setwantToReadId] = useState(false)

  const handleWantToRead = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/user/addBookToWantToRead/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      )

      if (response.status === 200) {
        setwantToReadId(true)
        alert("Book added to want to read!")
      } else {
        alert("Failed to add book to want to read.")
      }
    } catch (error) {
      console.error("Error adding book to want to read:", error)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <button onClick={handleWantToRead} disabled={wantToRead}>
      {wantToRead ? "Added to want to read" : "Add to want to read"}
    </button>
  )
}

export default AddToWantToRead
