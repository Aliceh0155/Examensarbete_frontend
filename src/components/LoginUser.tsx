"use client"
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
export interface IUser {
  username: string
  password: string
}

const LoginUser = () => {
  const [user, setUser] = useState<IUser>({ username: "", password: "" })
  const navigate = useNavigate()

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

      const response = await fetch("http://localhost:8080/user/login", {
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
        navigate("/")
        alert("Login successful!")
      }
    } catch (error) {
      console.error("Error occurred during login:", error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[#f7f6ee] rounded-lg shadow-lg p-8 w-80">
        {/* Titel */}
        <h2 className="text-xl font-semibold text-center mb-6 text-[#4F483F]">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="User ID"
              value={user.username}
              onChange={handleUserChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5a89d] focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleUserChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5a89d] focus:border-transparent"
            />
          </div>

          {/* Login-knapp */}
          <button
            type="submit"
            className="w-full bg-[#EFE8D4] text-[#4F483F] py-2 px-4 rounded-lg hover:bg-[#9e8f83] transition"
          >
            Login
          </button>
        </form>

        <p
          className="text-center mt-4 text-sm text-[#4F483F] hover:underline cursor-pointer"
          onClick={() => navigate("/register")}
        >
          No account yet? Register here!
        </p>
      </div>
    </div>
  )
}

export default LoginUser
