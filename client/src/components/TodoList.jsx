import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (!todos.length) return <div className="text-center text-gray-400 py-8">Không có công việc nào.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-3 text-left">Task</th>
            <th className="py-2 px-3 text-center">Trạng thái</th>
            <th className="py-2 px-3 text-center">Ngày tạo</th>
            <th className="py-2 px-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}