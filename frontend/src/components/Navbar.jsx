import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-3 flex gap-6">
      <Link to="/groups">Groups</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/balances">Balances</Link>
    </nav>
  );
}
