import { useState } from "react"
import axios from "axios"
import { AddListInterface } from "../interface/AddListInterface"
import { toast } from "react-toastify"

const AddToCurrentlyReading = ({ bookId }: AddListInterface) => {
  const [currentlyReading, setcurrentlyReading] = useState(false)
  const token = localStorage.getItem("jwtToken")

  const handleAddCurrentlyReading = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/user/addBookToCurrentlyReading/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setcurrentlyReading(true)
      toast.success("Book added to Currently Reading")
      console.log(response.data)
    } catch (error) {
      console.error("Error adding book to Currently Reading: ", error)
      toast.error("This book is already in your Currently Reading list")
    }
  }

  return (
    <button
      className="bg-[#EFE8D4] text-[#322c25] p-2 rounded-lg hover:scale-105 transition-transform duration-300"
      onClick={handleAddCurrentlyReading}
      disabled={currentlyReading}
    >
      {currentlyReading
        ? "Added to currently reading"
        : "Add to currently reading"}
    </button>
  )
}

export default AddToCurrentlyReading
