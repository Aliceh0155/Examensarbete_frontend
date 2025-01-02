
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import useGlobalState from "../store/GlobalState"

export interface IUser {
  username: string
  password: string
}

const LoginUser = () => {
  const [user, setUser] = useState<IUser>({ username: "", password: "" })
  const navigate = useNavigate()
  const { login } = useGlobalState()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!user.username || !user.password) return

    await login(user)

    navigate("/user")
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[#f7f6ee] rounded-lg shadow-lg p-8 w-80">
        <h2 className="text-xl font-semibold text-center mb-6 text-[#4F483F]">
          Login
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="User ID"
              value={user.username}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
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
