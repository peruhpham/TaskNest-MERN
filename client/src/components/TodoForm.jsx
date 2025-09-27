import React, { useState } from "react";
import { addTodo } from "../api/todoApi";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTodo({ title });
    setTitle("");
    if (onAdd) onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="flex-1 border rounded px-3 py-2 outline-none focus:border-blue-500"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Nhập công việc mới..."
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
        Thêm
      </button>
    </form>
  );
}