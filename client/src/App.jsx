import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      {/* <nav className="flex gap-4 p-4 bg-gray-100 shadow mb-6">
        <Link to="/" className="font-semibold text-blue-600 hover:underline">Trang chủ</Link>
        <Link to="/stats" className="font-semibold text-blue-600 hover:underline">Thống kê</Link>
      </nav> */}
      <nav className="bg-gray-100 p-4">
  <div className="flex justify-center space-x-6">
    <a href="/" className="text-blue-600 font-semibold hover:underline">
      Trang chủ
    </a>
    <a href="/stats" className="text-blue-600 font-semibold hover:underline">
      Thống kê
    </a>
  </div>
</nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}