import { useState } from 'react'
import RegisterUser from './components/RegisterUser'
import LoginUser from './components/LoginUser'
import GetOneBook from './components/GetOneBook'
import GetOneAuthor from './components/GetOneAuthor'
import GetAllAuthors from './components/GetAllAuthors'

function App() {

  return (
    <div>
      <GetAllAuthors/>
      <GetOneAuthor/>
      <GetOneBook/>
      <RegisterUser/>
      <LoginUser/>
    </div>
  )
}

export default App
