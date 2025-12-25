import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Groups() {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [person, setPerson] = useState("");
  const [members, setMembers] = useState([user._id]);   // creator auto-added
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    const g = await api.get(`/groups?userId=${user._id}`);
    setGroups(g.data);
  };

  // add by name
  const addMember = async () => {
    if (!person.trim()) return;

    const res = await api.post("/users/find-or-create-name", { name: person });

    const id = res.data._id;

    if (!members.includes(id)) {
      setMembers([...members, id]);
    }

    setPerson("");
  };

  const createGroup = async () => {
    await api.post("/groups", { name, members });

    setName("");
    setMembers([user._id]);
    fetchGroups();
  };

  useEffect(() => { fetchGroups(); }, []);

  return (
  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      👥 Create Group
    </h2>

    <input
      className="border p-2 rounded w-full mb-3"
      placeholder="Group Name"
      value={name}
      onChange={e => setName(e.target.value)}
    />

    <div className="flex gap-2 mb-3">
      <input
        className="border p-2 rounded w-full"
        placeholder="Add member name"
        value={person}
        onChange={e => setPerson(e.target.value)}
      />
      <button onClick={addMember} className="bg-blue-500 text-white px-4 rounded">
        ➕
      </button>
    </div>

    <p className="text-sm text-gray-600 mb-3">
      Members added: {members.length}
    </p>

    <button
      onClick={createGroup}
      className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded w-full"
    >
      Create Group
    </button>

    <h3 className="mt-6 font-semibold">Your Groups</h3>

    {groups.map(g => (
      <div
        key={g._id}
        className="mt-2 p-3 border rounded flex justify-between hover:bg-gray-50"
      >
        <span>{g.name}</span>
        <span className="text-gray-500">{g.members.length} members</span>
      </div>
    ))}
  </div>
);

}
