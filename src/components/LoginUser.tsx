"use client"
import { ChangeEvent, FormEvent, useState } from "react"
export interface IUser {
  username: string
  password: string
}

const LoginUser = () => {
  const [user, setUser] = useState<IUser>({ username: "", password: "" })

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevData) => ({ ...prevData, [name]: value }))
  }
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!user.username || !user.password) {
      return
    }
    try {
      // Create the body to send in the POST request
      const createUrlEncodedBody = new URLSearchParams({
        username: user.username,
        password: user.password,
      })

      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log(response)

      if (response.status === 401 || response.status === 403) {
        alert("Invalid credentials. Please try again.")
      }

      if (response.status === 200) {
        const data = await response.text()
        console.log("Login successful:", data)
        // Spara token
        localStorage.setItem("jwtToken", data)
      }
    } catch (error) {
      console.error("Error occurred during login:", error)
    }
  }

  return (
    <div>
      <div >
        <h2 >Login User</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            
            <input
            
              type="text"
              name="username"
              value={user.username}
              onChange={handleUserChange}
              required
            />
          </div>
          <div>
            
            <input
              
              type="password"
              name="password"
              value={user.password}
              onChange={handleUserChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginUser
