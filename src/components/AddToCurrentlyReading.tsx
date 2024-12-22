import { useEffect, useState } from "react"
import { AddListInterface } from "../interface/AddListInterface"
import useGlobalState from "../store/GlobalState"

const AddToCurrentlyReading = ({ bookId }: AddListInterface) => {
  const {
    addToCurrentlyReading,
    removeFromCurrentlyReading,
    currentlyReading,
  } = useGlobalState()
  const [isInCurrentlyReading, setIsInCurrentlyReading] = useState(false)

  useEffect(() => {
    setIsInCurrentlyReading(currentlyReading.some((book) => book.id === bookId))
  }, [currentlyReading, bookId])

  const handleAddToCurrentlyReading = () => {
    addToCurrentlyReading(bookId)
  }

  const handleRemoveFromCurrentlyReading = () => {
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

export default AddToCurrentlyReading
