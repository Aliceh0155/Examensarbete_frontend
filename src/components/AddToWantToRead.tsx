import { useEffect, useState } from "react"
import { AddListInterface } from "../interface/AddListInterface"
import useGlobalState from "../store/GlobalState"

const AddToWantToRead = ({ bookId }: AddListInterface) => {
  const { addToWantToRead, removeFromWantToRead, wantToRead } = useGlobalState()
  const [isInWantToRead, setIsInWantToRead] = useState(false)

  useEffect(() => {
    setIsInWantToRead(wantToRead.some((book) => book.id === bookId))
  }, [wantToRead, bookId])

  const handleAddToWantToRead = () => {
    addToWantToRead(bookId)
  }

  const handleRemoveFromWantToRead = () => {
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

export default AddToWantToRead
