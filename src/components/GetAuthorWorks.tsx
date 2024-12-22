import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import useGlobalState from "../store/GlobalState"

const GetAuthorWorks = () => {

// Todo - Skicka in nyckeln till authorpage? pga refresh
  const { key } = useParams<{ key: string }>()
  const { authorWorks, fetchAuthorWorks } = useGlobalState()

  useEffect(() => {
    if (key) {
      fetchAuthorWorks(key)
    }
  }, [key, fetchAuthorWorks])

  const defaultImage =
    "https://i.pinimg.com/736x/39/63/0d/39630d738fa51ab55d30bd4b0b42cb3a.jpg"

  return (
    <div className="p-6">
      <div>
        <div className="flex justify-center items-center text-center p-8 mb-4">
          <h2 className="text-2xl text-[#34302c] font-light">
            More from this author
          </h2>
        </div>

        {/* Book container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {authorWorks.map((book) => (
            <div
              key={book.key}
              className="relative flex flex-col items-center text-center space-y-2 group"
            >
              {/* Book cover */}
              <div className="relative max-w-[110px]">
                <Link to={`/book/${book.id}`} className="block">
                  <img
                    src={
                      book.coverImageUrl && book.coverImageUrl !== ""
                        ? book.coverImageUrl
                        : defaultImage
                    }
                    alt={book.title}
                    className="w-full h-[150px] object-cover rounded-sm transition-opacity duration-300 group-hover:opacity-75 bg-transparent shadow-[5px_5px_10px_rgba(0,0,0,0.1)]"
                  />
                </Link>
              </div>

              <Link to={`/book/${book.id}`} className="block">
                <p className="text-m text-[#34302c] font-medium">
                  {book.title}
                </p>
              </Link>

              {book.authorName && (
                <p className="text-sm font-light text-[#34302c]">
                  {book.authorName}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GetAuthorWorks
