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
    <div>
      <div>GetAllAuthors</div>
      <div>
        {" "}
        Authors:{" "}
        {author.map((author) => (
          <div key={author.id}>
            <p>{author.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetAllAuthors
