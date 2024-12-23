import { create } from "zustand"
import { BookInterface } from "../interface/BookInterface"
import { AuthorInterface } from "../interface/AuthorInterface"
import axios from "axios"
import { toast } from "react-toastify"

interface GlobalState {
  allBooks: BookInterface[]
  oneBook: BookInterface | null
  oneAuthor: AuthorInterface | null
  favoriteBooks: BookInterface[]
  wantToRead: BookInterface[]
  currentlyReading: BookInterface[]
  authorWorks: BookInterface[]
  filteredBooks: BookInterface[]

  setAllBooks: (books: BookInterface[]) => void
  fetchAllBooks: () => Promise<void>
  setOneBook: (book: BookInterface) => void
  fetchOneBook: (id: string) => Promise<void>
  setOneAuthor: (author: AuthorInterface) => void
  fetchOneAuthor: (authorKey: string) => Promise<void>
  fetchAuthorWorks: (key: string) => void
  fetchFavoriteBooks: () => Promise<void>
  addToFavorites: (bookId: string) => void
  removeFromFavorites: (bookId: string) => void
  fetchWantToReadBooks: () => Promise<void>
  addToWantToRead: (bookId: string) => void
  removeFromWantToRead: (bookId: string) => void
  fetchCurrentlyReadingBooks: () => Promise<void>
  addToCurrentlyReading: (bookId: string) => void
  removeFromCurrentlyReading: (bookId: string) => void
  fetchBooksByCategory: (category: string) => void
}

const useGlobalState = create<GlobalState>((set) => ({
  allBooks: [],
  oneBook: null,
  oneAuthor: null,
  favoriteBooks: [],
  wantToRead: [],
  currentlyReading: [],
  authorWorks: [],
  filteredBooks: [],

  setAllBooks: (books) => set({ allBooks: books }),

  fetchAllBooks: async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/database/getAllBooksFromDatabase"
      )
      console.log("Fetched books:", response.data)
      set({ allBooks: response.data })
    } catch (error) {
      console.error("Error fetching books:", error)
    }
  },

  fetchOneBook: async (bookId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/database/getOneBookFromDatabase/${bookId}`
      )
      set({ oneBook: response.data })
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching book", error)
    }
  },

  setOneBook: (book) => set({ oneBook: book }),

  fetchOneAuthor: async (authorKey: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/database/getOneAuthorFromDatabase/${authorKey}`
      )
      set({ oneAuthor: response.data })
      console.log(response.data)
    } catch (error) {
      console.log("Error fetching author", error)
    }
  },

  setOneAuthor: (author) => set({ oneAuthor: author }),

  fetchAuthorWorks: async (key: string) => {
    try {
      const bookKeysResponse = await axios.get(
        `http://localhost:8080/database/booksByAuthor/${key}`
      )
      const bookKeys = bookKeysResponse.data

      set((state) => {
        const filteredBooks = state.allBooks.filter((book) =>
          bookKeys.includes(book.key)
        )
        return { authorWorks: filteredBooks }
      })

      console.log("Filtered books:", bookKeys)
    } catch (error) {
      console.error("Error fetching author books:", error)
    }
  },

  fetchFavoriteBooks: async () => {
    const token = localStorage.getItem("jwtToken")
    try {
      const favoriteIdResponse = await axios.get(
        "http://localhost:8080/user/getFavoriteBooks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      set((state) => ({
        favoriteBooks: state.allBooks.filter((book) =>
          favoriteIdResponse.data.includes(book.id)
        ),
      }))
      console.log(favoriteIdResponse.data)
    } catch (error) {
      console.error("Error fetching favorites", error)
    }
  },

  addToFavorites: async (bookId: string) => {
    const token = localStorage.getItem("jwtToken")
    try {
      const response = await axios.post(
        `http://localhost:8080/user/addBookToFavorites/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      set((state) => ({
        favoriteBooks: [...state.favoriteBooks, response.data],
      }))
      toast.success("Book added to Favorites")
      console.log(response.data)
    } catch (error) {
      console.error("Error adding book to Favorites: ", error)
      toast.error("Error adding book to Favorites")
    }
  },

  removeFromFavorites: async (bookId: string) => {
    const token = localStorage.getItem("jwtToken")
    try {
      const response = await axios.delete(
        `http://localhost:8080/user/removeBookFromFavorites/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      set((state) => ({
        favoriteBooks: state.favoriteBooks.filter((book) => book.id !== bookId),
      }))
      toast.success("Book removed from Favorites")
      console.log(response.data)
    } catch (error) {
      console.error("Error removing book from Favorites:", error)
      toast.error("Error removing the book from Favorites")
    }
  },

  fetchWantToReadBooks: async () => {
    const token = localStorage.getItem("jwtToken")
    try {
      const wantToReadResponse = await axios.get(
        "http://localhost:8080/user/getWantToRead",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      set((state) => ({
        wantToRead: state.allBooks.filter((book) =>
          wantToReadResponse.data.includes(book.id)
        ),
      }))
      console.log(wantToReadResponse.data)
    } catch (error) {
      console.error("Error fetching Want to Read books", error)
    }
  },

  addToWantToRead: async (bookId: string) => {
    const token = localStorage.getItem("jwtToken")
    try {
      const response = await axios.post(
        `http://localhost:8080/user/addBookToWantToRead/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      set((state) => ({
        wantToRead: [...state.wantToRead, response.data],
      }))
      toast.success("Book added to 'Want to Read'")
      console.log(response.data)
    } catch (error) {
      console.error("Error adding book to Want to Read", error)
      toast.error("Error adding book to Want to Read")
    }
  },

  removeFromWantToRead: async (bookId: string) => {
    const token = localStorage.getItem("jwtToken")
    try {
      const response = await axios.delete(
        `http://localhost:8080/user/removeBookFromWantToRead/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      set((state) => ({
        wantToRead: state.wantToRead.filter((book) => book.id !== bookId),
      }))
      toast.success("Book removed from Want to Read")
      console.log(response.data)
    } catch (error) {
      console.error("Error removing book from Want to Read:", error)
      toast.error("Error removing the book from Want to Read")
    }
  },

  fetchCurrentlyReadingBooks: async () => {
    const token = localStorage.getItem("jwtToken")
    try {
      const currentlyReadingResponse = await axios.get(
        "http://localhost:8080/user/getCurrentlyReading",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      set((state) => ({
        currentlyReading: state.allBooks.filter((book) =>
          currentlyReadingResponse.data.includes(book.id)
        ),
      }))
      console.log(currentlyReadingResponse.data)
    } catch (error) {
      console.error("Error fetching Currently Reading books", error)
    }
  },

  addToCurrentlyReading: async (bookId: string) => {
    const token = localStorage.getItem("jwtToken")
    try {
      const response = await axios.post(
        `http://localhost:8080/user/addBookToCurrentlyReading/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      set((state) => ({
        currentlyReading: [...state.currentlyReading, response.data],
      }))
      toast.success("Book added to 'Currently Reading'")
      console.log(response.data)
    } catch (error) {
      console.error("Error adding book to Currently Reading", error)
      toast.error("Error adding book to Currently Reading")
    }
  },

  removeFromCurrentlyReading: async (bookId: string) => {
    const token = localStorage.getItem("jwtToken")
    try {
      const response = await axios.delete(
        `http://localhost:8080/user/removeBookFromCurrentlyReading/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      set((state) => ({
        currentlyReading: state.currentlyReading.filter(
          (book) => book.id !== bookId
        ),
      }))
      toast.success("Book removed from Currently Reading")
      console.log(response.data)
    } catch (error) {
      console.error("Error removing book from Currently Reading:", error)
      toast.error("Error removing the book from Currently Reading")
    }
  },
  fetchBooksByCategory: (category: string) => {
    set((state) => {
      const filtered = state.allBooks.filter((book) =>
        book.subjects?.includes(category)
      )
      return { filteredBooks: filtered }
    })
  },
}))

export default useGlobalState
