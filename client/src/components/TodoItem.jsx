import React, { useState } from "react";
import { updateTodo, deleteTodo } from "../api/todoApi";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleToggle = async () => {
    await updateTodo(todo._id, { status: !todo.status });
    if (onToggle) onToggle();
  };

  const handleDelete = async () => {
    await deleteTodo(todo._id);
    if (onDelete) onDelete();
  };

  const handleEdit = async () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      await updateTodo(todo._id, { title: editTitle });
      if (onEdit) onEdit();
    }
    setEditing(false);
  };

  return (
    <tr className="border-b">
      <td className="py-2 px-3">
        {editing ? (
          <input
            className="border rounded px-2 py-1 w-full"
            value={editTitle}
            autoFocus
            onChange={e => setEditTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={e => {
              if (e.key === "Enter") handleEdit();
              if (e.key === "Escape") setEditing(false);
            }}
          />
        ) : (
          <span
            className={`cursor-pointer ${todo.status ? "line-through text-gray-400" : ""}`}
            title="Click để sửa"
            onClick={() => setEditing(true)}
          >
            {todo.title}
          </span>
        )}
      </td>
      <td className="py-2 px-3 text-center">
        <button
          className={`px-3 py-1 rounded text-white font-semibold ${todo.status ? "bg-green-500" : "bg-orange-400"}`}
          onClick={handleToggle}
        >
          {todo.status ? "Hoàn thành" : "Chưa xong"}
        </button>
      </td>
      <td className="py-2 px-3 text-center text-gray-500">
        {new Date(todo.createdAt).toLocaleString("vi-VN")}
      </td>
      <td className="py-2 px-3 text-center">
        <button
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
          onClick={handleDelete}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
}