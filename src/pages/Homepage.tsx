import BooksByOneCategory from "../components/BooksByOneCategory"
import Navbar from "../components/Navbar"
import TopRatedBooks from "../components/TopRatedBooks"

const Homepage = () => {
  return (
    <div className="bg-[#EFE8D4] pt-[55px] min-h-screen max-h-screen overflow-hidden">
      <TopRatedBooks />
      <BooksByOneCategory />
    </div>
  )
}

export default Homepage
