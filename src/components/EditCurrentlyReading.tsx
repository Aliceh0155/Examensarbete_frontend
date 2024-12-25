import { useEffect, useState } from "react"
import { AddListInterface } from "../interface/AddListInterface"
import useGlobalState from "../store/GlobalState"
import { toast } from "react-toastify"

const EditToCurrentlyReading = ({ bookId }: AddListInterface) => {
  const {
    addToCurrentlyReading,
    removeFromCurrentlyReading,
    currentlyReading,
    isAuthenticated,
  } = useGlobalState()
  const [isInCurrentlyReading, setIsInCurrentlyReading] = useState(false)

  useEffect(() => {
    setIsInCurrentlyReading(currentlyReading.some((book) => book.id === bookId))
  }, [currentlyReading, bookId])

  const handleAddToCurrentlyReading = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to edit lists")
      return
    }
    addToCurrentlyReading(bookId)
  }

  const handleRemoveFromCurrentlyReading = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to edit lists")
      return
    }
    removeFromCurrentlyReading(bookId)
  }

  return (
    <button
      className="bg-[#EFE8D4] text-[#322c25] p-2 rounded-lg hover:scale-105 transition-transform duration-300"
      onClick={
        isInCurrentlyReading
          ? handleRemoveFromCurrentlyReading
          : handleAddToCurrentlyReading
      }
      disabled={false}
    >
      {isInCurrentlyReading
        ? "Remove from 'Currently Reading'"
        : "Add to 'Currently Reading'"}
    </button>
  )
}

export default EditToCurrentlyReading
