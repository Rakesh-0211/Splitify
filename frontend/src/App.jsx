import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./components/Login";
import Groups from "./components/Groups";
import Expenses from "./components/Expenses";
import Balances from "./components/Balances";
import ActionButton from "./components/ActionButton";

import { FaPlus, FaUsers, FaWallet, FaUserCircle } from "react-icons/fa";

function HomeLayout() {
  const { user } = useAuth();
  const [screen, setScreen] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="w-full bg-gradient-to-r from-emerald-500 to-green-500 py-4 shadow-lg">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-6">
          <h1 className="text-2xl font-bold text-white">💸 Splitify</h1>

          <div className="flex items-center gap-2 text-white">
            <FaUserCircle size={22} />
            <span className="font-semibold">{user?.name}</span>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto mt-12 px-6 flex gap-12 items-center">

        {/* LEFT IMAGE */}
        <div className="w-1/2 hidden md:flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3441/3441557.png"
            className="w-80 opacity-90"
            alt="split"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">
            Welcome to Splitify 👋
          </h1>
          <p className="text-gray-600 mb-8">
            Manage group expenses smartly and stress-free.
          </p>

          <div className="space-y-4">
            <ActionButton
              icon={<FaPlus />}
              text="Add an expense"
              onClick={() => setScreen("expenses")}
            />

            <ActionButton
              icon={<FaUsers />}
              text="Create / View groups"
              onClick={() => setScreen("groups")}
            />

            <ActionButton
              icon={<FaWallet />}
              text="Check balances"
              onClick={() => setScreen("balances")}
              outline
            />
          </div>

          <div className="mt-10">
            {screen === "groups" && <Groups />}
            {screen === "expenses" && <Expenses />}
            {screen === "balances" && <Balances />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Wrapper() {
  const { user } = useAuth();
  return user ? <HomeLayout /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <Wrapper />
    </AuthProvider>
  );
}
