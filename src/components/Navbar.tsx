import logo from "../assets/images/Examensarbete logo.png"
import { Link, useNavigate } from "react-router-dom"
import useGlobalState from "../store/GlobalState"
import { useEffect } from "react"

const Navbar = () => {
  const navigate = useNavigate()
  const { checkAuthentication, isAuthenticated, logout } = useGlobalState()

  useEffect(() => {
    checkAuthentication() // Kontrollera om användaren är inloggad vid sidladdning
  }, [checkAuthentication])

  const handleLogout = () => {
    logout()
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
          {!isAuthenticated ? (
            <Link to="/login" className="text-[#4F483F] mr-4 hover:underline">
              Login
            </Link>
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
