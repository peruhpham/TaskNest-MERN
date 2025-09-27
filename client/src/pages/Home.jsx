import React, { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo, getStats } from "../api/todoApi";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer
} from "recharts";

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [filter, setFilter] = useState({});
    const [stats, setStats] = useState({ completed: 0, pending: 0 });
    const [chartType, setChartType] = useState("bar");

    const chartData = [
        { name: "Nhiệm vụ Hoàn thành", value: stats.completed },
        { name: "Nhiệm vụ Chưa hoàn thành", value: stats.pending },
    ];
    const COLORS = ["#22c55e", "#f97316"];

    const fetchTodos = async () => {
        const res = await getTodos({ page, ...filter });
        setTodos(res.data.data);
        setPages(res.data.pages);
    };
    

    const fetchStats = async () => {
        const res = await getStats();
        setStats(res.data);
    };

    const handleAdd = async () => {
        await fetchTodos();
        await fetchStats();
    };
    const handleEdit = async () => {
        await fetchTodos();
        await fetchStats();
    };
    const handleDelete = async () => {
        await fetchTodos();
        await fetchStats();
    };

    useEffect(() => {
        fetchTodos();
        fetchStats();
        // eslint-disable-next-line
    }, [page, filter]);

    const total = stats.completed + stats.pending;
    const percent = total > 0 ? Math.round((stats.completed / total) * 100) : 0;



    const dailyData = [
        { date: "2025-09-23", completed: 10, pending: 5 },
        { date: "2025-09-24", completed: 8, pending: 7 },
        { date: "2025-09-25", completed: 12, pending: 3 }
    ].map(item => {
        const total = item.completed + item.pending;
        const completedPercent = total > 0 ? (item.completed / total) * 100 : 0;
        const pendingPercent = total > 0 ? (item.pending / total) * 100 : 0;
        return {
            date: item.date,
            completedPercent,
            pendingPercent
        };
    });

    

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                {/* Thống kê bên trái */}
                <div className="w-full md:w-1/3 bg-white rounded shadow p-6">
                    <h2 className="text-xl font-bold mb-4 text-center">Thống kê Nhiệm vụ</h2>

                    <div className="flex justify-between mb-4">
                        <div>
                            <div className="text-gray-500">Nhiệm vụ Hoàn thành</div>
                            <div className="text-xl font-bold text-green-600">{stats.completed}</div>
                        </div>
                        <div>
                            <div className="text-gray-500">Nhiệm vụ Chưa hoàn thành</div>
                            <div className="text-xl font-bold text-orange-500">{stats.pending}</div>
                        </div>
                        <div>
                            <div className="text-gray-500">Tổng số Nhiệm vụ</div>
                            <div className="text-xl font-bold">{total}</div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mr-2 font-semibold">Kiểu hiển thị Thống kê:</label>
                        <select
                            value={chartType}
                            onChange={(e) => setChartType(e.target.value)}
                            className="border rounded p-1"
                        >
                            <option value="bar">Thanh Ngang</option>
                            <option value="pie">Biểu đồ Tròn</option>
                            <option value="line">Biểu đồ Đường</option>
                        </select>
                    </div>

                    <div className="mt-4 flex justify-center">
                        {chartType === "bar" && (
                            <div className="w-full">
                                <div className="flex items-center mb-2">
                                    <span className="text-gray-600 mr-4">Tiến độ Hoàn thành:</span>
                                    <span className="font-semibold">{percent}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
                                    <div
                                        className="bg-green-500 h-4 transition-all duration-500"
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {chartType === "pie" && (
                            <PieChart width={250} height={250}>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        )}

                        {chartType === "line" && (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={dailyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                                    <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="completedPercent"
                                        stroke={COLORS[0]}
                                        name="Nhiệm vụ Hoàn thành (%)"
                                        strokeWidth={2}
                                        dot={{ r: 3 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="pendingPercent"
                                        stroke={COLORS[1]}
                                        name="Nhiệm vụ Chưa hoàn thành (%)"
                                        strokeWidth={2}
                                        dot={{ r: 3 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Quản lý công việc bên phải */}
                <div className="w-full md:w-2/3">
                    <div className="bg-white rounded shadow p-6">
                        <h1 className="text-2xl font-bold mb-4 text-center">
                            TaskNest | Quản lý Công việc Cá Nhân
                        </h1>
                        <TodoForm onAdd={handleAdd} />
                        <FilterBar filter={filter} setFilter={setFilter} />
                        <TodoList
                            todos={todos}
                            onToggle={handleEdit}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                        <Pagination page={page} pages={pages} setPage={setPage} />
                    </div>
                </div>
            </div>
        </div>
    );
}














// import React, { useEffect, useState } from "react";
// import { getTodos, addTodo, updateTodo, deleteTodo, getStats } from "../api/todoApi";
// import TodoList from "../components/TodoList";
// import TodoForm from "../components/TodoForm";
// import FilterBar from "../components/FilterBar";
// import Pagination from "../components/Pagination";

// export default function Home() {
//     const [todos, setTodos] = useState([]);
//     const [page, setPage] = useState(1);
//     const [pages, setPages] = useState(1);
//     const [filter, setFilter] = useState({});
//       const [stats, setStats] = useState({ completed: 0, pending: 0 });
//     // const [stats, setStats] = useState({ done: 0, notDone: 0 });

//     const fetchTodos = async () => {
//         const res = await getTodos({ page, ...filter });
//         setTodos(res.data.data);
//         setPages(res.data.pages);
//     };

//     const fetchStats = async () => {
//         const res = await getStats();
//         setStats(res.data);
//     };

//     const handleAdd = async () => {
//         await fetchTodos();
//         await fetchStats();
//     };

//     const handleEdit = async () => {
//         await fetchTodos();
//         await fetchStats();
//     };

//     const handleDelete = async () => {
//         await fetchTodos();
//         await fetchStats();
//     };

//     useEffect(() => {
//         fetchTodos();
//         fetchStats();
//         // eslint-disable-next-line
//     }, [page, filter]);

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
//             <TodoForm onAdd={handleAdd} />
//             <FilterBar filter={filter} setFilter={setFilter} />
//             <TodoList
//                 todos={todos}
//                 onToggle={handleEdit}
//                 onDelete={handleDelete}
//                 onEdit={handleEdit}
//             />
//             <Pagination page={page} pages={pages} setPage={setPage} />
//             <div className="mt-4">
//                 {/* <b>Thống kê:</b> Hoàn thành: {stats.done} | Chưa hoàn thành: {stats.notDone} */}
//                 <b>Thống kê:</b> Hoàn thành: {stats.completed} | Chưa hoàn thành: {stats.pending}
//             </div>
//         </div>
//     );
// }





// import React, { useEffect, useState } from "react";
// import { getTodos, addTodo, updateTodo, deleteTodo, getStats } from "../api/todoApi";
// import TodoList from "../components/TodoList";
// import TodoForm from "../components/TodoForm";
// import FilterBar from "../components/FilterBar";
// import Pagination from "../components/Pagination";

// import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";



// export default function Home() {
//   const [todos, setTodos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [filter, setFilter] = useState({});
//   const [stats, setStats] = useState({ completed: 0, pending: 0 });

//   const [chartType, setChartType] = useState("bar"); 

//     const chartData = [
//   { name: "Hoàn thành", value: stats.completed },
//   { name: "Chưa hoàn thành", value: stats.pending },
// ];

// const COLORS = ["#22c55e", "#f97316"]; // xanh cho hoàn thành, cam cho chưa hoàn thành


//   const fetchTodos = async () => {
//     const res = await getTodos({ page, ...filter });
//     setTodos(res.data.data);
//     setPages(res.data.pages);
//   };

//   const fetchStats = async () => {
//     const res = await getStats();
//     setStats(res.data);
//   };

//   const handleAdd = async () => {
//     await fetchTodos();
//     await fetchStats();
//   };

//   const handleEdit = async () => {
//     await fetchTodos();
//     await fetchStats();
//   };

//   const handleDelete = async () => {
//     await fetchTodos();
//     await fetchStats();
//   };

//   useEffect(() => {
//     fetchTodos();
//     fetchStats();
//     // eslint-disable-next-line
//   }, [page, filter]);

//   const total = stats.completed + stats.pending;
//   const percent = total > 0 ? Math.round((stats.completed / total) * 100) : 0;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
//         {/* Thống kê bên trái */}
//         <div className="w-full md:w-1/3">
//           <div className="bg-white rounded shadow p-6 mb-8">
//             <h2 className="text-xl font-bold mb-4 text-center">Thống kê công việc</h2>
//             <div className="flex justify-between mb-4">
//               <div>
//                 <div className="text-gray-500">Đã hoàn thành</div>
//                 <div className="text-xl font-bold text-green-600">{stats.completed}</div>
//               </div>
//               <div>
//                 <div className="text-gray-500">Chưa hoàn thành</div>
//                 <div className="text-xl font-bold text-orange-500">{stats.pending}</div>
//               </div>
//               <div>
//                 <div className="text-gray-500">Tổng cộng</div>
//                 <div className="text-xl font-bold">{total}</div>
//               </div>
//             </div>
//             <div className="mt-4">
//               <div className="flex items-center mb-2">
//                 <span className="text-gray-600 mr-4">Tiến độ hoàn thành:</span>
//                 <span className="font-semibold">{percent}%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
//                 <div
//                   className="bg-green-500 h-4 transition-all"
//                   style={{ width: `${percent}%` }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Quản lý công việc bên phải */}
//         <div className="w-full md:w-2/3">
//           <div className="bg-white rounded shadow p-6">
//             <h1 className="text-2xl font-bold mb-4 text-center">Quản lý công việc</h1>
//             <TodoForm onAdd={handleAdd} />
//             <FilterBar filter={filter} setFilter={setFilter} />
//             <TodoList
//               todos={todos}
//               onToggle={handleEdit}
//               onDelete={handleDelete}
//               onEdit={handleEdit}
//             />
//             <Pagination page={page} pages={pages} setPage={setPage} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { getTodos, addTodo, updateTodo, deleteTodo, getStats } from "../api/todoApi";
// import TodoList from "../components/TodoList";
// import TodoForm from "../components/TodoForm";
// import FilterBar from "../components/FilterBar";
// import Pagination from "../components/Pagination";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend
// } from "recharts";

// export default function Home() {
//   const [todos, setTodos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [filter, setFilter] = useState({});
//   const [stats, setStats] = useState({ completed: 0, pending: 0 });
//   const [chartType, setChartType] = useState("bar"); // bar, pie, line

//   const chartData = [
//     { name: "Hoàn thành", value: stats.completed },
//     { name: "Chưa hoàn thành", value: stats.pending },
//   ];
//   const COLORS = ["#22c55e", "#f97316"];

//   // Lấy danh sách công việc
//   const fetchTodos = async () => {
//     const res = await getTodos({ page, ...filter });
//     setTodos(res.data.data);
//     setPages(res.data.pages);
//   };

//   // Lấy thống kê công việc
//   const fetchStats = async () => {
//     const res = await getStats();
//     setStats(res.data);
//   };

//   // Các hành động thêm/sửa/xóa đều gọi lại API
//   const handleAdd = async () => {
//     await fetchTodos();
//     await fetchStats();
//   };
//   const handleEdit = async () => {
//     await fetchTodos();
//     await fetchStats();
//   };
//   const handleDelete = async () => {
//     await fetchTodos();
//     await fetchStats();
//   };

//   useEffect(() => {
//     fetchTodos();
//     fetchStats();
//     // eslint-disable-next-line
//   }, [page, filter]);

//   // Tính toán phần trăm hoàn thành
//   const total = stats.completed + stats.pending;
//   const percent = total > 0 ? Math.round((stats.completed / total) * 100) : 0;



//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
//         {/* Thống kê bên trái */}
//         <div className="w-full md:w-1/3 bg-white rounded shadow p-6">
//           <h2 className="text-xl font-bold mb-4 text-center">Thống kê công việc</h2>

//           {/* Tổng quan số liệu */}
//           <div className="flex justify-between mb-4">
//             <div>
//               <div className="text-gray-500">Đã hoàn thành</div>
//               <div className="text-xl font-bold text-green-600">{stats.completed}</div>
//             </div>
//             <div>
//               <div className="text-gray-500">Chưa hoàn thành</div>
//               <div className="text-xl font-bold text-orange-500">{stats.pending}</div>
//             </div>
//             <div>
//               <div className="text-gray-500">Tổng cộng</div>
//               <div className="text-xl font-bold">{total}</div>
//             </div>
//           </div>

//           {/* Chọn kiểu hiển thị */}
//           <div className="mb-4">
//             <label className="mr-2 font-semibold">Chọn kiểu hiển thị:</label>
//             <select
//               value={chartType}
//               onChange={(e) => setChartType(e.target.value)}
//               className="border rounded p-1"
//             >
//               <option value="bar">Thang ngang</option>
//               <option value="pie">Biểu đồ tròn</option>
//               <option value="line">Biểu đồ đường</option>
//             </select>
//           </div>

//           {/* Hiển thị biểu đồ */}
//           <div className="mt-4 flex justify-center">
//             {chartType === "bar" && (
//               <div className="w-full">
//                 <div className="flex items-center mb-2">
//                   <span className="text-gray-600 mr-4">Tiến độ hoàn thành:</span>
//                   <span className="font-semibold">{percent}%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
//                   <div
//                     className="bg-green-500 h-4 transition-all"
//                     style={{ width: `${percent}%` }}
//                   ></div>
//                 </div>
//               </div>
//             )}

//             {chartType === "pie" && (
//               <PieChart width={250} height={250}>
//                 <Pie
//                   data={chartData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label
//                 >
//                   {chartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             )}

//             {chartType === "line" && (
//               <LineChart width={300} height={250} data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="value" stroke="#8884d8" />
//               </LineChart>
//             )}
//           </div>
//         </div>

//         {/* Quản lý công việc bên phải */}
//         <div className="w-full md:w-2/3">
//           <div className="bg-white rounded shadow p-6">
//             <h1 className="text-2xl font-bold mb-4 text-center">Quản lý công việc</h1>
//             <TodoForm onAdd={handleAdd} />
//             <FilterBar filter={filter} setFilter={setFilter} />
//             <TodoList
//               todos={todos}
//               onToggle={handleEdit}
//               onDelete={handleDelete}
//               onEdit={handleEdit}
//             />
//             <Pagination page={page} pages={pages} setPage={setPage} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// src/pages/Home.jsx
// import React, { useEffect, useState } from "react";
// import { getTodos, getStats } from "../api/todoApi";
// import TodoList from "../components/TodoList";
// import TodoForm from "../components/TodoForm";
// import FilterBar from "../components/FilterBar";
// import Pagination from "../components/Pagination";

// import {
//     PieChart,
//     Pie,
//     Cell,
//     Tooltip,
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Legend,
//     ResponsiveContainer,
//     BarChart,
//     Bar
// } from "recharts";

// export default function Home() {
//     const [todos, setTodos] = useState([]);
//     const [page, setPage] = useState(1);
//     const [pages, setPages] = useState(1);
//     const [filter, setFilter] = useState({});
//     // statsSummary lưu tổng (completed, pending)
//     const [statsSummary, setStatsSummary] = useState({ completed: 0, pending: 0 });
//     // statsDaily lưu mảng theo ngày [{ date, completedPercent, pendingPercent }]
//     const [statsDaily, setStatsDaily] = useState([]);
//     const [chartType, setChartType] = useState("bar"); // "bar" | "pie" | "line"

//     const COLORS = ["#22c55e", "#f97316"]; // xanh, cam

//     // fetch todos
//     const fetchTodos = async () => {
//         try {
//             const res = await getTodos({ page, ...filter });
//             if (res?.data) {
//                 setTodos(res.data.data || []);
//                 setPages(res.data.pages || 1);
//             }
//         } catch (err) {
//             console.error("fetchTodos error:", err);
//         }
//     };

//     // fetch stats: API có thể trả dạng {completed, pending} hoặc array per-day
//     const fetchStats = async () => {
//         try {
//             const res = await getStats();
//             const data = res?.data;

//             // Nếu API trả mảng (dữ liệu theo ngày)
//             if (Array.isArray(data)) {
//                 // map sang phần trăm theo ngày
//                 const daily = data.map((item) => {
//                     const c = Number(item.completed) || 0;
//                     const p = Number(item.pending) || 0;
//                     const total = c + p;
//                     const completedPercent = total > 0 ? (c / total) * 100 : 0;
//                     const pendingPercent = total > 0 ? (p / total) * 100 : 0;
//                     return {
//                         date: item.date, // mong API trả date ở dạng 'YYYY-MM-DD' hoặc tương tự
//                         completedPercent: Number(completedPercent.toFixed(2)),
//                         pendingPercent: Number(pendingPercent.toFixed(2)),
//                     };
//                 });
//                 setStatsDaily(daily);
//                 // Đồng thời set summary (tổng của toàn bộ mảng)
//                 const totalCompleted = data.reduce((s, it) => s + (Number(it.completed) || 0), 0);
//                 const totalPending = data.reduce((s, it) => s + (Number(it.pending) || 0), 0);
//                 setStatsSummary({ completed: totalCompleted, pending: totalPending });
//             } else if (data && typeof data === "object") {
//                 // Nếu API trả object tổng hợp { completed, pending }
//                 const c = Number(data.completed) || 0;
//                 const p = Number(data.pending) || 0;
//                 setStatsSummary({ completed: c, pending: p });
//                 // Không có chuỗi theo ngày -> để trống statsDaily
//                 setStatsDaily([]);
//             } else {
//                 // fallback: reset
//                 setStatsSummary({ completed: 0, pending: 0 });
//                 setStatsDaily([]);
//             }
//         } catch (err) {
//             console.error("fetchStats error:", err);
//             setStatsSummary({ completed: 0, pending: 0 });
//             setStatsDaily([]);
//         }
//     };

//     // Các handler sau khi add/edit/delete => refresh cả todos + stats
//     const handleAdd = async () => {
//         await fetchTodos();
//         await fetchStats();
//     };
//     const handleEdit = async () => {
//         await fetchTodos();
//         await fetchStats();
//     };
//     const handleDelete = async () => {
//         await fetchTodos();
//         await fetchStats();
//     };

//     useEffect(() => {
//         fetchTodos();
//         fetchStats();
//         // eslint-disable-next-line
//     }, [page, filter]);

//     // Summary percent
//     const total = statsSummary.completed + statsSummary.pending;
//     const percent = total > 0 ? Math.round((statsSummary.completed / total) * 100) : 0;

//     // Data cho Pie & Bar
//     const chartData = [
//         { name: "Hoàn thành", value: statsSummary.completed },
//         { name: "Chưa hoàn thành", value: statsSummary.pending },
//     ];

//     // Nếu statsDaily rỗng nhưng bạn muốn demo (fallback), có thể uncomment đoạn demo dưới
//     const fallbackDaily = [
//         { date: "2025-09-23", completedPercent: 66.67, pendingPercent: 33.33 },
//         { date: "2025-09-24", completedPercent: 53.33, pendingPercent: 46.67 },
//         { date: "2025-09-25", completedPercent: 80.00, pendingPercent: 20.00 },
//     ];
//     const usedDaily = statsDaily.length ? statsDaily : fallbackDaily;
//     //   const usedDaily = statsDaily;

//     return (
//         <div className="container mx-auto p-4">
//             <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
//                 {/* Thống kê bên trái */}
//                 <div className="w-full md:w-1/3 bg-white rounded shadow p-6">
//                     <h2 className="text-xl font-bold mb-4 text-center">Thống kê công việc</h2>

//                     {/* Tổng quan số liệu */}
//                     <div className="flex justify-between mb-4">
//                         <div>
//                             <div className="text-gray-500">Đã hoàn thành</div>
//                             <div className="text-xl font-bold text-green-600">{statsSummary.completed}</div>
//                         </div>
//                         <div>
//                             <div className="text-gray-500">Chưa hoàn thành</div>
//                             <div className="text-xl font-bold text-orange-500">{statsSummary.pending}</div>
//                         </div>
//                         <div>
//                             <div className="text-gray-500">Tổng cộng</div>
//                             <div className="text-xl font-bold">{total}</div>
//                         </div>
//                     </div>

//                     {/* Chọn kiểu hiển thị */}
//                     <div className="mb-4">
//                         <label className="mr-2 font-semibold">Chọn kiểu hiển thị:</label>
//                         <select
//                             value={chartType}
//                             onChange={(e) => setChartType(e.target.value)}
//                             className="border rounded p-1"
//                         >
//                             <option value="bar">Thang ngang</option>
//                             <option value="pie">Biểu đồ tròn</option>
//                             <option value="line">Biểu đồ đường</option>
//                         </select>
//                     </div>

//                     {/* Hiển thị biểu đồ */}
//                     <div className="mt-4 flex justify-center">
//                         {chartType === "bar" && (
//                             <div className="w-full">
//                                 <div className="flex items-center mb-2">
//                                     <span className="text-gray-600 mr-4">Tiến độ hoàn thành:</span>
//                                     <span className="font-semibold">{percent}%</span>
//                                 </div>
//                                 <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
//                                     <div
//                                         className="bg-green-500 h-4 transition-all duration-500"
//                                         style={{ width: `${percent}%` }}
//                                     ></div>
//                                 </div>
//                             </div>
//                         )}


//                         {chartType === "pie" && (
//                             <PieChart width={250} height={250}>
//                                 <Pie
//                                     data={chartData}
//                                     cx="50%"
//                                     cy="50%"
//                                     outerRadius={80}
//                                     fill="#8884d8"
//                                     dataKey="value"
//                                     label={(entry) =>
//                                         `${entry.name}: ${entry.value ?? 0}`
//                                     }
//                                 >
//                                     {chartData.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                     ))}
//                                 </Pie>
//                                 <Tooltip formatter={(value) => `${value}`} />
//                             </PieChart>
//                         )}

//                         {chartType === "line" && (
//                             <div style={{ width: "100%", height: 300 }}>
//                                 {usedDaily.length === 0 ? (
//                                     <div className="text-center text-gray-500">
//                                         Chưa có dữ liệu theo ngày để hiển thị biểu đồ đường.
//                                     </div>
//                                 ) : (
//                                     <ResponsiveContainer>
//                                         <LineChart data={usedDaily}>
//                                             <CartesianGrid strokeDasharray="3 3" />
//                                             <XAxis dataKey="date" />
//                                             <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
//                                             <Tooltip formatter={(value) => `${value}%`} />
//                                             <Legend />
//                                             <Line
//                                                 type="monotone"
//                                                 dataKey="completedPercent"
//                                                 stroke={COLORS[0]}
//                                                 name="Hoàn thành (%)"
//                                                 strokeWidth={2}
//                                                 dot={{ r: 3 }}
//                                             />
//                                             <Line
//                                                 type="monotone"
//                                                 dataKey="pendingPercent"
//                                                 stroke={COLORS[1]}
//                                                 name="Chưa hoàn thành (%)"
//                                                 strokeWidth={2}
//                                                 dot={{ r: 3 }}
//                                             />
//                                         </LineChart>
//                                     </ResponsiveContainer>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Quản lý công việc bên phải */}
//                 <div className="w-full md:w-2/3">
//                     <div className="bg-white rounded shadow p-6">
//                         <h1 className="text-2xl font-bold mb-4 text-center">Quản lý công việc</h1>
//                         <TodoForm onAdd={handleAdd} />
//                         <FilterBar filter={filter} setFilter={setFilter} />
//                         <TodoList todos={todos} onToggle={handleEdit} onDelete={handleDelete} onEdit={handleEdit} />
//                         <Pagination page={page} pages={pages} setPage={setPage} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }




