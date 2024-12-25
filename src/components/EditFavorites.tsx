import { useEffect, useState } from "react"
import useGlobalState from "../store/GlobalState"
import { toast } from "react-toastify"

const EditFavorites = ({ bookId }: { bookId: string }) => {
   const { addToFavorites, removeFromFavorites, favoriteBooks, isAuthenticated } =
     useGlobalState()
   const [isFavorite, setIsFavorite] = useState(false)

   useEffect(() => {
     setIsFavorite(favoriteBooks.some((book) => book.id === bookId))
   }, [favoriteBooks, bookId])

   const handleAddToFavorites = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to edit lists")
      return
    }
     addToFavorites(bookId)
   }

   const handleRemoveFromFavorites = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to edit lists")
      return
    }
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

export default EditFavorites
