import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useGlobalState from "../store/GlobalState"

const GetOneAuthor = () => {
  const { key } = useParams<{ key?: string }>()
  const { oneAuthor, fetchOneAuthor } = useGlobalState()

  useEffect(() => {
    if (key) {
      fetchOneAuthor(key)
    }
  }, [key, fetchOneAuthor])

  return oneAuthor ? (
    <div className="bg-[#F5F1E7] shadow-md rounded-lg w-[1000px] max-h-full mx-auto flex flex-col items-center justify-center p-10">
      {/* Author name */}
      <h1 className="text-3xl font-bold text-[#4F483F] mb-4">
        {oneAuthor.name}
      </h1>
      <p className="font-semibold text-[#4F483F] mb-4">
        {oneAuthor.birth_date}
      </p>

      {/* Author bio */}
      <div className=" text-base leading-relaxed max-h-[380px] overflow-auto text-center text-[#4F483F] max-w-[750px]">
        <p>{oneAuthor?.bio}</p>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default GetOneAuthor
