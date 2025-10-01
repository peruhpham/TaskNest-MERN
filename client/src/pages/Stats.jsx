import React, { useEffect, useState } from "react";
import { getStats } from "../api/todoApi";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#f97316"]; // Màu: Hoàn thành, Chưa hoàn thành

export default function Stats() {
  const [stats, setStats] = useState({ completed: 0, pending: 0 });
  const [range, setRange] = useState("all"); // all, month, week, day

  useEffect(() => {
    fetchStats();
  }, [range]);

  const fetchStats = async () => {
    // Gọi API với tham số range
    const res = await getStats({ range });
    setStats(res.data);
  };

  const total = stats.completed + stats.pending;
  const percent = total > 0 ? Math.round((stats.completed / total) * 100) : 0;

  // Dữ liệu cho biểu đồ
  const chartData = [
    { name: "Done", value: stats.completed },
    { name: "In Process", value: stats.pending },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Thống kê công việc
      </h2>

      {/* Bộ lọc phạm vi thời gian */}
      <div className="mb-6 text-center">
        <label className="mr-2 font-semibold">Chọn phạm vi:</label>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border rounded p-1"
        >
          <option value="all">Từ trước đến nay</option>
          <option value="month">Trong tháng này</option>
          <option value="week">Trong tuần này</option>
          <option value="day">Trong ngày này</option>
        </select>
      </div>

      {/* Thống kê tổng quan */}
      <div className="flex justify-between mb-6">
        <div>
          <div className="text-gray-500">Đã hoàn thành</div>
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
        </div>
        <div>
          <div className="text-gray-500">Chưa hoàn thành</div>
          <div className="text-2xl font-bold text-orange-500">{stats.pending}</div>
        </div>
        <div>
          <div className="text-gray-500">Tổng cộng</div>
          <div className="text-2xl font-bold">{total}</div>
        </div>
      </div>

      {/* Thanh tiến độ */}
      <div className="mt-6 mb-10">
        <div className="flex items-center mb-2">
          <span className="text-gray-600 mr-4">Tiến độ hoàn thành:</span>
          <span className="font-semibold">{percent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
          <div
            className="bg-green-500 h-4 transition-all"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>

      {/* Các biểu đồ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div>
          <h3 className="text-center font-semibold mb-2">Biểu đồ Cột</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>



        {/* Line Chart */}
        <div>
          <h3 className="text-center font-semibold mb-2">Biểu đồ Đường</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div>
          <h3 className="text-center font-semibold mb-2">Biểu đồ Tròn</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}








// import React, { useEffect, useState } from "react";
// import { getStats } from "../api/todoApi";

// export default function Stats() {
//   const [stats, setStats] = useState({ completed: 0, pending: 0 });

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     const res = await getStats();
//     setStats(res.data);
//   };

//   const total = stats.completed + stats.pending;
//   const percent = total > 0 ? Math.round((stats.completed / total) * 100) : 0;

//   return (
//     <div className="max-w-xl mx-auto bg-white rounded shadow p-8 mt-8">
//       <h2 className="text-2xl font-bold mb-6 text-center">Thống kê công việc</h2>
//       <div className="flex justify-between mb-4">
//         <div>
//           <div className="text-gray-500">Đã hoàn thành</div>
//           <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
//         </div>
//         <div>
//           <div className="text-gray-500">Chưa hoàn thành</div>
//           <div className="text-2xl font-bold text-orange-500">{stats.pending}</div>
//         </div>
//         <div>
//           <div className="text-gray-500">Tổng cộng</div>
//           <div className="text-2xl font-bold">{total}</div>
//         </div>
//       </div>
//       <div className="mt-8">
//         <div className="flex items-center mb-2">
//           <span className="text-gray-600 mr-4">Tiến độ hoàn thành:</span>
//           <span className="font-semibold">{percent}%</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
//           <div
//             className="bg-green-500 h-4 transition-all"
//             style={{ width: `${percent}%` }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { getStats } from "../api/todoApi";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// const COLORS = ["#22c55e", "#f97316"]; // Màu: Hoàn thành, Chưa hoàn thành

// export default function Stats() {
//   const [stats, setStats] = useState({ completed: 0, pending: 0 });

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     const res = await getStats();
//     setStats(res.data);
//   };

//   const total = stats.completed + stats.pending;
//   const percent = total > 0 ? Math.round((stats.completed / total) * 100) : 0;

//   // Dữ liệu cho biểu đồ
//   const chartData = [
//     { name: "Hoàn thành", value: stats.completed },
//     { name: "Chưa hoàn thành", value: stats.pending },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded shadow p-8 mt-8">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Thống kê công việc
//       </h2>

//       {/* Thống kê tổng quan */}
//       <div className="flex justify-between mb-6">
//         <div>
//           <div className="text-gray-500">Đã hoàn thành</div>
//           <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
//         </div>
//         <div>
//           <div className="text-gray-500">Chưa hoàn thành</div>
//           <div className="text-2xl font-bold text-orange-500">{stats.pending}</div>
//         </div>
//         <div>
//           <div className="text-gray-500">Tổng cộng</div>
//           <div className="text-2xl font-bold">{total}</div>
//         </div>
//       </div>

//       {/* Thanh tiến độ */}
//       <div className="mt-6 mb-10">
//         <div className="flex items-center mb-2">
//           <span className="text-gray-600 mr-4">Tiến độ hoàn thành:</span>
//           <span className="font-semibold">{percent}%</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
//           <div
//             className="bg-green-500 h-4 transition-all"
//             style={{ width: `${percent}%` }}
//           ></div>
//         </div>
//       </div>

//       {/* Các biểu đồ */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Bar Chart */}
//         <div>
//           <h3 className="text-center font-semibold mb-2">Biểu đồ Cột</h3>
//           <ResponsiveContainer width="100%" height={200}>
//             <BarChart data={chartData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Line Chart */}
//         <div>
//           <h3 className="text-center font-semibold mb-2">Biểu đồ Đường</h3>
//           <ResponsiveContainer width="100%" height={200}>
//             <LineChart data={chartData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Pie Chart */}
//         <div>
//           <h3 className="text-center font-semibold mb-2">Biểu đồ Tròn</h3>
//           <ResponsiveContainer width="100%" height={200}>
//             <PieChart>
//               <Pie
//                 data={chartData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={60}
//                 label
//               >
//                 {chartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }








