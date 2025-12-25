import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Balances() {
  const [balances, setBalances] = useState([]);
  const { user } = useAuth();          // 👈 logged-in user

  const fetchBalances = async () => {
    if (!user) return;

    const res = await api.get(`/balances?userId=${user._id}`);
    setBalances(res.data);
  };

  useEffect(() => {
    fetchBalances();
  }, [user]);                           // 👈 refetch when user changes

  return (
    <div>
      <h2>Who owes whom</h2>

      {balances.length === 0 && <p>No balances yet</p>}

      {balances.map(b => (
        <div key={b._id}>
          <strong>{b?.fromUser?.name || "Unknown"}</strong> owes{" "}
          <strong>{b?.toUser?.name || "Unknown"}</strong>{" "}
          ₹{b.amount}
        </div>
      ))}
    </div>
  );
}
