import RegisterUser from "./components/RegisterUser"
import LoginUser from "./components/LoginUser"
import GetOneBook from "./components/GetOneBook"
import GetOneAuthor from "./components/GetOneAuthor"
import GetAllAuthors from "./components/GetAllAuthors"
import TopRatedBooks from "./components/TopRatedBooks"
import BooksByOneCategory from "./components/BooksByOneCategory"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Navbar from "./components/Navbar"
import Userpage from "./pages/Userpage"
import Loginpage from "./pages/Loginpage"
import Registerpage from "./pages/Registerpage"
import Bookpage from "./pages/Bookpage"
import AllBookspage from "./pages/AllBookspage"
import AllAuthorsPage from "./pages/AllAuthorsPage"
import GetAuthorWorks from "./components/GetAuthorWorks"
import Authorpage from "./pages/Authorpage"
import BooksBySubject from "./components/BooksBySubject"
import { ToastContainer } from "react-toastify"
import GetAllBooks from "./components/GetAllBooks"
import SearchBooks from "./components/SearchBooks"
import FindBookPage from "./pages/FindBookPage"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        className="p-4"
        toastClassName="bg-[#EFE8D4] text-black font-semibold rounded-lg shadow-md p-3"
        progressClassName="bg-pink-600"
      />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/test" element={<SearchBooks />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/book/:id" element={<Bookpage />} />
        <Route path="/author/:key" element={<Authorpage />} />
        <Route path="/user" element={<Userpage />} />
        <Route path="/allBooks" element={<GetAllBooks />} />
        <Route path="/allAuthors" element={<AllAuthorsPage />} />
        <Route path="/findBooks" element={<FindBookPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
