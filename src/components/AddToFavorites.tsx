import { useState } from "react"
import axios from "axios"
import { AddListInterface } from "../interface/AddListInterface"
import { toast } from "react-toastify"

const AddToFavorites = ({ bookId }: AddListInterface) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const token = localStorage.getItem("jwtToken")

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/user/addBookToFavorites/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setIsFavorite(true)
      toast.success("Book added to Favorites")
      console.log(response.data)
    } catch (error) {
      console.error("Error adding book to Favorites: ", error)
      toast.error("This book is already in your Favorites")
    }
  }

  return (
    <button
      className="bg-[#EFE8D4] text-[#322c25] p-2 rounded-lg hover:scale-105 transition-transform duration-300"
      onClick={handleAddToFavorites}
      disabled={isFavorite}
    >
      {isFavorite ? "Added to Favorites" : "Add to Favorites"}
    </button>
  )
}

export default AddToFavorites
