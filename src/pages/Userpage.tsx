import CurrentlyReading from "../components/CurrentlyReading"
import FavoriteBooks from "../components/FavoriteBooks"
import WantToRead from "../components/WantToRead"
import { useEffect, useState } from "react"
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
    isAuthenticated,
    checkAuthentication,
  } = useGlobalState()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authenticateUser = async () => {
      await checkAuthentication() 
      setLoading(false) 
    }

    authenticateUser()
  }, [checkAuthentication])

  useEffect(() => {
    if (loading) return 

    if (!isAuthenticated) {
      toast.error("Please login to access Userpage")
      navigate("/login")
      return
    }

    if (allBooks.length === 0) {
      fetchAllBooks()
    }
    fetchCurrentlyReadingBooks()
    fetchFavoriteBooks()
    fetchWantToReadBooks()
  }, [
    loading,
    isAuthenticated,
    allBooks,
    fetchAllBooks,
    fetchCurrentlyReadingBooks,
    fetchFavoriteBooks,
    fetchWantToReadBooks,
    navigate,
  ])


  return (
    <div className="bg-[#EFE8D4] min-h-screen overflow-hidden pt-[55px]">
      <FavoriteBooks />
      <CurrentlyReading />
      <WantToRead />
    </div>
  )
}

export default Userpage
