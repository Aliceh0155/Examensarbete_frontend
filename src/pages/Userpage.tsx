import CurrentlyReading from "../components/CurrentlyReading"
import FavoriteBooks from "../components/FavoriteBooks"
import WantToRead from "../components/WantToRead"
import { useEffect } from "react"
import useGlobalState from "../store/GlobalState"

const Userpage = () => {
  const {
    allBooks,
    fetchAllBooks,
    fetchCurrentlyReadingBooks,
    fetchFavoriteBooks,
    fetchWantToReadBooks,
  } = useGlobalState()

  useEffect(() => {
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
