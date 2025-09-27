import React from "react";

export default function Pagination({ page, pages, setPage }) {
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        className={`px-3 py-1 rounded border transition ${
          page <= 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-blue-500 hover:text-white"
        }`}
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span className="mx-2">
        {page}/{pages}
      </span>

      <button
        className={`px-3 py-1 rounded border transition ${
          page >= pages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-blue-500 hover:text-white"
        }`}
        disabled={page >= pages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}




// import React from "react";

// export default function Pagination({ page, pages, setPage }) {
//   if (pages <= 1) return null;
//   return (
//     <div className="flex justify-center items-center gap-2 mt-4">
//       <button
//         className="px-3 py-1 rounded border"
//         disabled={page <= 1}
//         onClick={() => setPage(page - 1)}
//       >
//         Prev
//       </button>
//       <span className="mx-2">{page}/{pages}</span>
//       <button
//         className="px-3 py-1 rounded border"
//         disabled={page >= pages}
//         onClick={() => setPage(page + 1)}
//       >
//         Next
//       </button>
//     </div>
//   );
// }