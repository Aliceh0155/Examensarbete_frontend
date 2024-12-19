import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"

const RegisterUser = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!username || !password) {
      return "Username and password are required."
    }

    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      if (response.ok) {
        console.log("User registered successfully!")
        alert("User registered successfully!")
        navigate("/")
    
      } else {
        const errorData = await response.text()
        alert(errorData)
        throw new Error(errorData)
      }
    } catch (error) {
      console.log("An error occurred while registering.")
      console.error(error)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[#F5F1E7] rounded-lg shadow-lg p-8 w-80">
        {/* Titel */}
        <h2 className="text-xl font-semibold text-center mb-6 text-[#4F483F]">
          Register User
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="User ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5a89d] focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5a89d] focus:border-transparent"
            />
          </div>

          {/* Register-knapp */}
          <button
            type="submit"
            className="w-full bg-[#EFE8D4] text-[#4F483F] py-2 px-4 rounded-lg hover:bg-[#9e8f83] transition"
          >
            Register
          </button>
        </form>

        {/* Länk till login */}
        <p
          className="text-center mt-4 text-sm text-[#4F483F] hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login here!
        </p>
      </div>
    </div>
  )
}
export default RegisterUser