import React from "react"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="fixed justify-evenly bg-[#EFE8D4] top-0 left-0 w-full text-[#4F483F]">
      {/* Meny innehåll */}
      <ul className="flex  justify-evenly space-x-6 p-4">
        <li>
          <Link to="/" className="mr-4 text-[#4F483F]">
            Home
          </Link>
        </li>
        <li>
          <Link to="/login" className="mr-4 text-[#4F483F]">
            Login
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
