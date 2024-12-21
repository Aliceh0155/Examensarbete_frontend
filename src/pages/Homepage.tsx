import BooksByOneCategory from "../components/BooksByOneCategory"
import GetAllBooks from "../components/GetAllBooks"
import Navbar from "../components/Navbar"
import TopRatedBooks from "../components/TopRatedBooks"

const Homepage = () => {
  return (
    <div className="bg-[#EFE8D4] pt-[55px] min-h-screen overflow-x-hidden">
      <TopRatedBooks />
      <BooksByOneCategory />
      <GetAllBooks/>
    </div>
  )
}

export default Homepage
