import { FaPlus, FaUsers, FaWallet } from "react-icons/fa";

export default function ActionButton({ icon, text, onClick, outline }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl text-lg font-medium transition
        ${
          outline
            ? "border border-gray-300 hover:bg-gray-100"
            : "bg-orange-500 text-white hover:bg-orange-600 shadow"
        }
      `}
    >
      {icon}
      {text}
    </button>
  );
}
