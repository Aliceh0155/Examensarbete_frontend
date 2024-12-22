import logo from "../assets/images/Examensarbete logo.png"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("jwtToken")

  const handleLogout = () => {
    // Ta bort token från localStorage och logga ut användaren
    localStorage.removeItem("jwtToken")
    navigate("/")
  }

  return (
    <div className="fixed justify-evenly bg-[#EFE8D4] top-0 left-0 w-full z-50 text-[#4F483F]">
      <nav className="flex justify-between space-x-6  p-4">
        <div>
          <Link to="/">
            <img
              className="w-40 h-auto hover:opacity-80 transition-opacity"
              src={logo}
              alt="Examensarbete Logo"
            />
          </Link>
        </div>
        <div>
          <Link to="/user">User Page</Link>
        </div>
        <div>
          <Link to="/findBooks">Find books</Link>
        </div>
        <div>
          {!token ? (
            <>
              <Link to="/login" className="text-[#4F483F] mr-4 hover:underline">
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-[#4F483F] mr-4 hover:underline"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
