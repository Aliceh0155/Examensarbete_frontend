import CurrentlyReading from "../components/CurrentlyReading"
import FavoriteBooks from "../components/FavoriteBooks"
import LoginUser from "../components/LoginUser"
import RegisterUser from "../components/RegisterUser"
import WantToRead from "../components/WantToRead"

const Userpage = () => {
  return (
    <div className="bg-[#EFE8D4]">
      <FavoriteBooks/>
      <CurrentlyReading/>
      <WantToRead/>
    </div>
  )
}

export default Userpage