import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import useGlobalState from "../store/GlobalState"

const RegisterUser = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { register } = useGlobalState()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!username || !password) {
      return "Username and password are required."
    }

    const isRegistered = await register({ username, password })

    if (isRegistered) {
      navigate("/login")
    } else {
      console.error("Registration failed")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[#F5F1E7] rounded-lg shadow-lg p-8 w-80">
        <h2 className="text-xl font-semibold text-center mb-6 text-[#4F483F]">
          Register User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
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

          <button
            type="submit"
            className="w-full bg-[#EFE8D4] text-[#4F483F] py-2 px-4 rounded-lg hover:bg-[#9e8f83] transition"
          >
            Register
          </button>
        </form>

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
