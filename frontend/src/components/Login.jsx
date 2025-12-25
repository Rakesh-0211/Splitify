import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import { FaEnvelope, FaUser } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (mode === "register") {
        const res = await api.post("/users", { name, email });
        setUser(res.data);
      } else {
        const res = await api.get(`/users?email=${email}`);
        if (!res.data || res.data.length === 0) {
          return setError("User not found — please register first");
        }
        setUser(res.data[0]);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 to-green-200">
      <div className="bg-white shadow-xl p-8 w-[360px] rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === "login" ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="flex items-center border px-3 py-2 rounded">
              <FaUser className="text-gray-400 mr-2" />
              <input
                className="w-full outline-none"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="flex items-center border px-3 py-2 rounded">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              className="w-full outline-none"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-semibold">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          {mode === "login" ? (
            <>New user? <button className="text-emerald-600" onClick={() => setMode("register")}>Register</button></>
          ) : (
            <>Already have an account? <button className="text-emerald-600" onClick={() => setMode("login")}>Login</button></>
          )}
        </p>
      </div>
    </div>
  );
}
