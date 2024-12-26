import BooksByOneCategory from "../components/BooksByOneCategory"
import GetAllBooks from "../components/GetAllBooks"
import TopRatedBooks from "../components/TopRatedBooks"

const Homepage = () => {
  return (
    <div className=" bg-[#EFE8D4] pt-[34px] min-h-screen overflow-x-hidden">
      <TopRatedBooks />
      <BooksByOneCategory />
    </div>
  )
}

export default Homepage
