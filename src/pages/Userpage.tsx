import CurrentlyReading from "../components/CurrentlyReading"
import FavoriteBooks from "../components/FavoriteBooks"
import WantToRead from "../components/WantToRead"
import { useEffect } from "react"
import useGlobalState from "../store/GlobalState"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Userpage = () => {
  const {
    allBooks,
    fetchAllBooks,
    fetchCurrentlyReadingBooks,
    fetchFavoriteBooks,
    fetchWantToReadBooks,
    isAuthenticated
  } = useGlobalState()

   const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to access Userpage")
      navigate("/login")
      return
    }
    if (allBooks.length === 0) {
      fetchAllBooks().then(() => {
      })
    }
    fetchCurrentlyReadingBooks()
    fetchFavoriteBooks()
    fetchWantToReadBooks()
  }, [allBooks])

  return (
    <div className="bg-[#EFE8D4] min-h-screen overflow-hidden pt-[55px]">
      <FavoriteBooks />
      <CurrentlyReading />
      <WantToRead />
    </div>
  )
}

export default Userpage
