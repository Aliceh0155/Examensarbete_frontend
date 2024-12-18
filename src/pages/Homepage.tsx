import BooksByOneCategory from "../components/BooksByOneCategory"
import Navbar from "../components/Navbar"
import TopRatedBooks from "../components/TopRatedBooks"

const Homepage = () => {
  return (
    <div className="bg-[#EFE8D4]">
      <TopRatedBooks />
      <BooksByOneCategory />
    </div>
  )
}

export default Homepage
