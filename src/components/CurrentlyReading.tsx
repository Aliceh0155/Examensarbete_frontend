import { Link } from "react-router-dom"
import useGlobalState from "../store/GlobalState"

const CurrentlyReading = () => {
  const { currentlyReading } = useGlobalState()

  const defaultImage =
    "https://i.pinimg.com/736x/39/63/0d/39630d738fa51ab55d30bd4b0b42cb3a.jpg"


  return (
    <div className="">
      <div className="flex items-center justify-between mb-2">
        <h2 className="pl-4 text-xl text-[#322c25] font-thin">
          Currently Reading
        </h2>
      </div>

      {/* Parent div */}
      <div className="relative mb-10 w-[94%] mx-auto">
        {/* Scroll container */}
        <div className="overflow-x-auto pl-6 pr-6">
          <div className="flex space-x-12 min-w-max">
            {currentlyReading.map((book) => (
              <div
                key={book.id}
                className="relative flex flex-col items-center text-center space-y-2 group"
              >
                {/* Container for book cover */}
                <div className="relative group shadow-md transition-shadow duration-300 max-w-[110px]">
                  <Link to={`/book/${book.id}`}>
                    <img
                      src={
                        book.coverImageUrl !== ""
                          ? book.coverImageUrl
                          : defaultImage
                      }
                      alt="Cover"
                      className="w-[85px] h-[128px] object-cover rounded-sm transition-opacity duration-300 group-hover:opacity-40 bg-transparent shadow-[5px_15px_15px_8px_rgba(0,0,0,0.2)]"
                    />

                    {/* Title only shown when hover */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-normal">{book.title}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book shelf */}
        <div className="absolute bottom-[-10px] w-full h-2 bg-[#F5F1E7] shadow-[10px_10px_10px_5px_rgba(0,0,0,0.2)] rounded-sm"></div>
      </div>
    </div>
  )
}

export default CurrentlyReading
