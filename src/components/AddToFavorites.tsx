import { useEffect, useState } from "react"
import useGlobalState from "../store/GlobalState"

const AddToFavorites = ({ bookId }: { bookId: string }) => {
  const { addToFavorites, removeFromFavorites, favoriteBooks } =
    useGlobalState()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(favoriteBooks.some((book) => book.id === bookId))
  }, [favoriteBooks, bookId])

  const handleAddToFavorites = () => {
    addToFavorites(bookId)
  }

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(bookId)
  }
  return (
    <button
      className="bg-[#EFE8D4] text-[#322c25] p-2 rounded-lg hover:scale-105 transition-transform duration-300"
      onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
      disabled={false}
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  )
}

export default AddToFavorites
