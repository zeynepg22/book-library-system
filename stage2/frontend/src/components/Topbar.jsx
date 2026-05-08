function Topbar({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  showSearch = true,
}) {
  const role = localStorage.getItem("role") || "user";

  return (
    <div className="mb-8 flex items-center justify-between gap-6 rounded-3xl bg-white px-6 py-4 shadow-sm">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {showSearch && (
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-80 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-200"
          />
        )}

        <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 transition hover:bg-slate-200">
          🔔
        </button>

        <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
            {role === "admin" ? "👩‍💼" : "👩‍💻"}
          </div>

          <div>
            <p className="text-sm font-bold text-slate-700">
              {role === "admin" ? "Admin" : "Library User"}
            </p>
            <p className="text-xs text-slate-400">
              {role === "admin" ? "Manager account" : "Student account"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;