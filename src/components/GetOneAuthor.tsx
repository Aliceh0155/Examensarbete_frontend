import React, { useEffect, useState } from 'react'
import { AuthorInterface } from '../interface/AuthorInterface'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const GetOneAuthor = () => {
    const [author, setAuthor] = useState<AuthorInterface>()
    const { key } = useParams<{ key?: string }>()
    const navigate = useNavigate()
    const token = localStorage.getItem("jwtToken")

    useEffect(() => {
      if (!token) {
        navigate("/login")
      }
    }, [token, navigate])

    const fetchBook = async (authorKey: string) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/database/getOneAuthorFromDatabase/${authorKey}`
        )
        setAuthor(response.data)
        console.log(response.data)
      } catch (error) {
        console.log("Error error errorrr...")
      }
    }

    useEffect(() => {
      if (key && token) {
        fetchBook(key)
      }
    }, [key, token])

    return (
      <div className="flex bg-[#F5F1E7] shadow-md rounded-lg overflow-hidden w-[900px] h-[550px] mx-auto">
        {/* Left Section */}
        <div className="p-8 flex flex-col justify-center text-[#4F483F] max-w-[400px]">
          <h1 className="text-3xl font-bold mb-2">{author?.name}</h1>
          <h2 className="text-xl font-semibold mb-4">{author?.work_count}</h2>
          <p className="text-base leading-relaxed">{author?.top_work}</p>
        </div>

        {/* Right Section */}
        <div className="flex-shrink-0 flex justify-center items-center w-[50%]">
          <div className="p-4">
            <p className="text-base leading-relaxed">{author?.bio}</p>
            <p className="text-base leading-relaxed">{author?.birth_date}</p>
          </div>
        </div>
      </div>
    )
  }

export default GetOneAuthor