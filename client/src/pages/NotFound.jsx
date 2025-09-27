import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-80 text-gray-500">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-2">Không tìm thấy trang!</p>
      <a href="/" className="text-blue-600 hover:underline">Quay về trang chủ</a>
    </div>
  );
}