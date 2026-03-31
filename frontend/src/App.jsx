import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>Personal Contact Manager</h1>
          <p>Quản lý liên hệ cá nhân với React + Node.js + MongoDB</p>
        </div>
        <nav>
          <Link to="/">Trang chủ</Link>
          <Link to="/about">Thông tin cá nhân</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}
