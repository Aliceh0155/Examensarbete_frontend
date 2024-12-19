import RegisterUser from './components/RegisterUser'
import LoginUser from './components/LoginUser'
import GetOneBook from './components/GetOneBook'
import GetOneAuthor from './components/GetOneAuthor'
import GetAllAuthors from './components/GetAllAuthors'
import TopRatedBooks from './components/TopRatedBooks'
import BooksByOneCategory from './components/BooksByOneCategory'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from "./pages/Homepage"
import Navbar from './components/Navbar'
import Userpage from './pages/Userpage'
import Loginpage from './pages/Loginpage'
import Registerpage from './pages/Registerpage'
import Bookpage from './pages/Bookpage'


function App() {

  return (
    <BrowserRouter>
      <Navbar /> {/* Navbar kommer att vara synlig på alla sidor */}
      <div className="pt-[55px]">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/user" element={<Userpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/book" element={<Bookpage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
