import RegisterUser from './components/RegisterUser'
import LoginUser from './components/LoginUser'
import GetOneBook from './components/GetOneBook'
import GetOneAuthor from './components/GetOneAuthor'
import GetAllAuthors from './components/GetAllAuthors'
import TopRatedBooks from './components/TopRatedBooks'
import GetAllBooks from './components/GetAllBooks'

function App() {

  return (
    <div>
      
      <TopRatedBooks />
      <GetAllAuthors />
      <GetOneAuthor />
      <GetOneBook />
      <RegisterUser />
      <LoginUser />
    </div>
  )
}

export default App
