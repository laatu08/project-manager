import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiGrid, FiPlusCircle, FiLogOut } from "react-icons/fi";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-5 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem to="/admin/dashboard" icon={<FiHome />} label="Dashboard" />
          <NavItem to="/admin/projects" icon={<FiGrid />} label="Projects" />
          <NavItem to="/admin/projects/new" icon={<FiPlusCircle />} label="Create Project" />
        </nav>

        <button
          onClick={handleLogout}
          className="p-4 text-left border-t border-gray-700 hover:bg-gray-800 flex items-center gap-3"
        >
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">

        {/* Sticky Top Navbar */}
        <header className="p-4 bg-white shadow flex justify-between items-center sticky top-0 z-50">
          <h2 className="text-xl font-semibold">Project Manager</h2>

          <div className="text-gray-600 text-sm">
            Logged in as <span className="font-medium">Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
