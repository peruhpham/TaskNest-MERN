import React from "react";

export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <select
        className="border rounded px-2 py-1"
        value={filter.status || ""}
        onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
      >
        <option value="">Tất cả</option>
        <option value="true">Hoàn thành</option>
        <option value="false">Chưa hoàn thành</option>
      </select>
      <input
        type="date"
        className="border rounded px-2 py-1"
        value={filter.from || ""}
        onChange={e => setFilter(f => ({ ...f, from: e.target.value }))}
      />
      <input
        type="date"
        className="border rounded px-2 py-1"
        value={filter.to || ""}
        onChange={e => setFilter(f => ({ ...f, to: e.target.value }))}
      />
      <button
        className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-100"
        type="button"
        onClick={() => setFilter({})}
      >
        Xóa lọc
      </button>
    </div>
  );
}