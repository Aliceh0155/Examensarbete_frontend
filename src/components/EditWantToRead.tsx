import { useEffect, useState } from "react"
import { AddListInterface } from "../interface/AddListInterface"
import useGlobalState from "../store/GlobalState"
import { toast } from "react-toastify"

const EditWantToRead = ({ bookId }: AddListInterface) => {
  const { addToWantToRead, removeFromWantToRead, wantToRead, isAuthenticated } = useGlobalState()
  const [isInWantToRead, setIsInWantToRead] = useState(false)

  useEffect(() => {
    setIsInWantToRead(wantToRead.some((book) => book.id === bookId))
  }, [wantToRead, bookId])

  const handleAddToWantToRead = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to edit lists")
      return
    }
    addToWantToRead(bookId)
  }

  const handleRemoveFromWantToRead = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to edit lists")
      return
    }
    removeFromWantToRead(bookId)
  }

  return (
    <button
      className="bg-[#EFE8D4] text-[#322c25] p-2 rounded-lg hover:scale-105 transition-transform duration-300"
      onClick={
        isInWantToRead ? handleRemoveFromWantToRead : handleAddToWantToRead
      }
      disabled={false}
    >
      {isInWantToRead ? "Remove from 'Want to Read'" : "Add to 'Want to Read'"}
    </button>
  )
}

export default EditWantToRead
