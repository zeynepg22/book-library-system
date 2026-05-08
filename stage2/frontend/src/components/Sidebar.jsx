import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role") || "user";

  const userMenuItems = [
    { label: "Dashboard", path: "/dashboard", icon: "🏠" },
    { label: "Browse Books", path: "/books", icon: "📚" },
    { label: "My Loans", path: "/my-loans", icon: "👜" },
    { label: "Favorites", path: "/favorites", icon: "❤️" },
  ];

  const adminMenuItems = [
    { label: "Admin Dashboard", path: "/admin-dashboard", icon: "📊" },
    { label: "Manage Books", path: "/admin-dashboard?tab=books", icon: "📚" },
    { label: "Loan Tracking", path: "/admin-dashboard?tab=loans", icon: "🧾" },
    { label: "View User Site", path: "/books", icon: "👤" },
  ];

  const menuItems = role === "admin" ? adminMenuItems : userMenuItems;

  function logout() {
    localStorage.removeItem("role");
    navigate("/login");
  }

  function isActive(item) {
    if (item.path.includes("?tab=books")) {
      return location.pathname === "/admin-dashboard" && location.search === "?tab=books";
    }

    if (item.path.includes("?tab=loans")) {
      return location.pathname === "/admin-dashboard" && location.search === "?tab=loans";
    }

    if (item.path === "/admin-dashboard") {
      return location.pathname === "/admin-dashboard" && location.search === "";
    }

    return location.pathname === item.path;
  }

  return (
    <aside className="min-h-screen w-72 bg-gradient-to-b from-white via-orange-50/40 to-pink-50/40 px-6 py-8 shadow-sm">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
          📖
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-800">BookHub</h2>
          <p className="text-xs font-medium text-slate-400">
            {role === "admin" ? "Admin Panel" : "Library System"}
          </p>
        </div>
      </div>

      <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
        Menu
      </p>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const active = isActive(item);

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                active
                  ? "bg-white text-orange-500 shadow-sm"
                  : "text-slate-500 hover:bg-white/80 hover:text-slate-800"
              }`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/70">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          );
        })}

        <button
          onClick={logout}
          className="mt-8 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold text-slate-500 transition hover:bg-white/80 hover:text-slate-800"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/70">
            🚪
          </span>
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;