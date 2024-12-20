import React from 'react'
import GetOneAuthor from '../components/GetOneAuthor'
import GetAuthorWorks from '../components/GetAuthorWorks'

const Authorpage = () => {
  return (
    <div className="h-screen w-full bg-[#EFE8D4] flex justify-center items-center">
      <GetOneAuthor />
      <GetAuthorWorks/>
    </div>
  )
}

export default Authorpage