import GetOneAuthor from "../components/GetOneAuthor"
import GetAuthorWorks from "../components/GetAuthorWorks"


const Authorpage = () => {
  return (
    <div className="bg-[#EFE8D4] flex flex-col items-center pt-[55px] min-h-screen overflow-hidden">
      <div className="mb-8 w-full flex justify-center">
        <GetOneAuthor />
      </div>

      <div className="w-full flex justify-center">
        <GetAuthorWorks />
      </div>
    </div>
  )
}

export default Authorpage
