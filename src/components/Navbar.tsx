import React from "react"

const Navbar = () => {
  return (
    <div className="fixed justify-evenly bg-[#EFE8D4] top-0 left-0 w-full text-[#8C7764]">
      {/* Meny innehåll */}
      <ul className="flex  justify-evenly space-x-6 p-4">
        <li>
          <a href="#" className="hover:text-">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-400">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-400">
            Services
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-yellow-400">
            Contact
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
