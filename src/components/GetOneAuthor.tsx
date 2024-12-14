import React, { useEffect, useState } from 'react'
import { AuthorInterface } from '../interface/AuthorInterface'
import axios from 'axios'

const GetOneAuthor = () => {
    const [author, setAuthor] = useState<AuthorInterface>()

    useEffect(() => {
      fetchAuthor("675c11039574f217dc791c3c")
    }, [])

    const fetchAuthor = async (authorId: String) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/database/getOneAuthorFromDatabase/${authorId}`
        )
        setAuthor(response.data)
        console.log(response.data)
      } catch (error) {
        console.log("Error error errorrr...")
      }
    }
    return (
      <div>
        <div>GetOneAuthor</div>
        <p>One Author: {author?.name}</p>
      </div>
    )
  }

export default GetOneAuthor