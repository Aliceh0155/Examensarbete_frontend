import { useEffect, useState } from "react"
import { AuthorInterface } from "../interface/AuthorInterface"
import axios from "axios"

const GetAllAuthors = () => {
  const [author, setAuthor] = useState<AuthorInterface[]>([])

   const fetchAuthors = async () => {
     try {
       const response = await axios.get(
         'http://localhost:8080/database/getAllAuthorsFromDatabase'
       )
       console.log(response.data)
       setAuthor(response.data)
     } catch (error) {
       console.error("Error Fetching: ", error)
     }
   }

   useEffect(() => {
     fetchAuthors();
   }, [])
  

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="text-xl font-semibold text-gray-800">GetAllAuthors</div>
      <div className="mt-4 text-gray-700">
        <div className="font-medium text-gray-800">Authors:</div>
        <ul className="list-inside">
          {author.map((author) => (
            <li key={author.id} className="mt-2 p-2 border-b border-gray-300">
              <p className="text-lg text-gray-900">{author.name}</p>
              <p className="text-sm text-gray-600">{author.birth_date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default GetAllAuthors
