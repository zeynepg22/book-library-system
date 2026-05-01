import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-72 bg-slate-950 px-8 py-10 text-white">
      
      {/* Logo / Title */}
      <div className="mb-12 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl">
          📚
        </div>
        <h2 className="text-2xl font-bold">Library</h2>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">

        {/* MAIN PAGE */}
        <button
          onClick={() => navigate("/books")}
          className="block w-full rounded-xl px-4 py-3 text-left text-lg transition hover:bg-white/10"
        >
          Browse Books
        </button>

        {/* LOANS */}
        <button
          onClick={() => navigate("/my-loans")}
          className="block w-full rounded-xl px-4 py-3 text-left text-lg transition hover:bg-white/10"
        >
          My Loans
        </button>

        {/* PROFILE (şimdilik boş bırakıyoruz) */}
        <button
          className="block w-full rounded-xl px-4 py-3 text-left text-lg transition hover:bg-white/10"
        >
          Profile
        </button>

        {/* LOGOUT */}
        <button
          onClick={() => navigate("/login")}
          className="block w-full rounded-xl px-4 py-3 text-left text-lg transition hover:bg-white/10"
        >
          Logout
        </button>

      </nav>
    </div>
  );
}

export default Sidebar;