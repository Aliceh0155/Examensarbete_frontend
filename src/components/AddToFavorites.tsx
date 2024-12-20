import { useState } from "react"
import axios from "axios"
import { AddListInterface } from "../interface/AddListInterface"

const AddToFavorites = ({ bookId }: AddListInterface ) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/user/addBookToFavorites/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      )

      if (response.status === 200) {
        setIsFavorite(true)
        alert("Book added to favorites!")
      } else {
        alert("Failed to add book to favorites.")
      }
    } catch (error) {
      console.error("Error adding book to favorites:", error)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <button onClick={handleAddToFavorites} disabled={isFavorite}>
      {isFavorite ? "Added to Favorites" : "Add to Favorites"}
    </button>
  )
}

export default AddToFavorites
