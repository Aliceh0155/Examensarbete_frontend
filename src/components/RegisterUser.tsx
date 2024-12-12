import { useState, FormEvent } from "react"

const RegisterUser = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!username || !password) {
      return "Username and password are required."
    }

    try {
      const response = await fetch("http://localhost:8080/register", {
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
    <div>
      <div >
        <h2 >Register User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
export default RegisterUser