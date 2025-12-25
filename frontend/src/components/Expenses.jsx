import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Expenses() {
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [payments, setPayments] = useState([]);

  const { user } = useAuth();          // 👈 logged-in user

  const fetchGroups = async () => {
    if (!user) return;

    const res = await api.get(`/groups?userId=${user._id}`);
    setGroups(res.data);
  };

  const loadMembers = async (id) => {
    setGroupId(id);
    const group = groups.find(g => g._id === id);

    setPayments(
      group.members.map(m => ({
        userId: m._id,
        paid: 0,
        name: m.name
      }))
    );
  };

  const updatePaid = (index, value) => {
    const list = [...payments];
    list[index].paid = Number(value);
    setPayments(list);
  };

  const submitExpense = async () => {
    await api.post("/expenses", { groupId, payments });
    alert("Expense added");
  };

  useEffect(() => { fetchGroups(); }, [user]);

  return (
  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      💰 Add Expense
    </h2>

    <select
      className="border p-2 rounded w-full mb-4"
      onChange={e => loadMembers(e.target.value)}
    >
      <option>Select group</option>
      {groups.map(g => (
        <option key={g._id} value={g._id}>{g.name}</option>
      ))}
    </select>

    {payments.map((p, i) => (
      <div key={p.userId} className="flex justify-between items-center mb-2">
        <span>{p.name}</span>
        <input
          type="number"
          className="border p-1 rounded w-24"
          value={p.paid}
          onChange={e => updatePaid(i, e.target.value)}
        />
      </div>
    ))}

    <button
      onClick={submitExpense}
      className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded w-full"
    >
      Split Expense
    </button>
  </div>
);

}
