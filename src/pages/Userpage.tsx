import { useNavigate } from "react-router-dom"
import CurrentlyReading from "../components/CurrentlyReading"
import FavoriteBooks from "../components/FavoriteBooks"
import WantToRead from "../components/WantToRead"
import { useEffect } from "react"

const Userpage = () => {

  return (
    <div className="bg-[#EFE8D4] min-h-screen overflow-hidden pt-[55px]">
      <FavoriteBooks />
      <CurrentlyReading />
      <WantToRead />
    </div>
  )
}

export default Userpage