import { useEffect, useState } from "react"
import useGlobalState from "../store/GlobalState"

const GetAllAuthors = () => {
   const { allAuthors, fetchAllAuthors } = useGlobalState()

   useEffect(() => {
     fetchAllAuthors()
   }, [])

  

  return (
    <div>
      <h2>All Authors</h2>
      <ul>
        {allAuthors.map((author) => (
          <li key={author.id}>{author.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default GetAllAuthors
