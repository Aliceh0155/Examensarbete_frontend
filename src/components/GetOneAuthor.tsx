import { useEffect, useState } from "react"
import { AuthorInterface } from "../interface/AuthorInterface"
import axios from "axios"
import { useParams } from "react-router-dom"

const GetOneAuthor = () => {
  const [author, setAuthor] = useState<AuthorInterface>()
  const { key } = useParams<{ key?: string }>()

  const fetchAuthor = async (authorKey: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/database/getOneAuthorFromDatabase/${authorKey}`
      )
      setAuthor(response.data)
      console.log(response.data)
    } catch (error) {
      console.log("Error fetching author", error)
    }
  }

  useEffect(() => {
    if (key) {
      fetchAuthor(key)
    }
  }, [key])

  return (
    author ? (
    <div className="bg-[#F5F1E7] shadow-md rounded-lg w-[1000px] max-h-full mx-auto flex flex-col items-center justify-center p-10">
      {/* Författarens namn */}
      <h1 className="text-3xl font-bold text-[#4F483F] mb-4">{author.name}</h1>
      <p className="font-semibold text-[#4F483F] mb-4">{author.birth_date}</p>

      {/* Författarens bio */}
      <div className=" text-base leading-relaxed max-h-[380px] overflow-auto text-center text-[#4F483F] max-w-[750px]">
        <p>{author?.bio}</p>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  ))
}

export default GetOneAuthor
