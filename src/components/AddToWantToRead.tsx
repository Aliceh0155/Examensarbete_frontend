import { useState } from "react"
import axios from "axios"
import { AddListInterface } from "../interface/AddListInterface"
import { toast } from "react-toastify"

const AddToWantToRead = ({ bookId }: AddListInterface) => {
  const [wantToRead, setwantToReadId] = useState(false)
  const token = localStorage.getItem("jwtToken")

  const handleWantToRead = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/user/addBookToWantToRead/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setwantToReadId(true)
      toast.success("Book added to Want To Read")
      console.log(response.data)
    } catch (error) {
      console.error("Error adding book to Want To Read: ", error)
      toast.error("This book is already in your Want To Read list")
    }
  }

  return (
    <button
      className="bg-[#EFE8D4] text-[#322c25] p-2 rounded-lg hover:scale-105 transition-transform duration-300"
      onClick={handleWantToRead}
      disabled={wantToRead}
    >
      {wantToRead ? "Added to want to read" : "Add to want to read"}
    </button>
  )
}

export default AddToWantToRead
