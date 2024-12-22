import React from "react"
import BooksBySubject from "../components/BooksBySubject"
import SearchBooks from "../components/SearchBooks"

const FindBookPage = () => {
  return (
    <div className="bg-[#EFE8D4] pt-[55px] min-h-screen overflow-x-hidden">
      <SearchBooks />
      <BooksBySubject />
    </div>
  )
}

export default FindBookPage
