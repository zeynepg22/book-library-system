import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import { bookAPI, loanAPI } from "../services/api";

function DashboardPage() {
  const [books, setBooks] = useState([]);
  const [loans, setLoans] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      const bookData = await bookAPI.getAll();
      const userId = localStorage.getItem("userId") || "1";
      const loanData = await loanAPI.getUserLoans(userId);
      const favoriteData = JSON.parse(localStorage.getItem("favorites")) || [];

      setBooks(bookData);
      setLoans(loanData);
      setFavorites(favoriteData);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const availableBooks = useMemo(
    () => books.filter((book) => book.status === "Available").length,
    [books]
  );

  const borrowedBooks = useMemo(
    () => books.filter((book) => book.status !== "Available").length,
    [books]
  );

  const activeLoans = useMemo(
    () => loans.filter((loan) => loan.status === "Active").length,
    [loans]
  );

  const recentBooks = books.slice(-4).reverse();

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar
          title="Dashboard"
          subtitle="Track your books, loans, and favorites"
          showSearch={false}
        />

        {loading ? (
          <div className="rounded-3xl bg-white p-8 text-slate-500 shadow-sm">
            Loading dashboard...
          </div>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-4 gap-5">
              <StatCard title="Total Books" value={books.length} icon="📚" color="bg-purple-100 text-purple-600" />
              <StatCard title="Available Books" value={availableBooks} icon="✅" color="bg-emerald-100 text-emerald-600" />
              <StatCard title="Borrowed Books" value={borrowedBooks} icon="👜" color="bg-orange-100 text-orange-600" />
              <StatCard title="Favorites" value={favorites.length} icon="❤️" color="bg-pink-100 text-pink-600" />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <section className="col-span-2 rounded-3xl bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-800">Recently Added Books</h2>
                  <span className="text-sm font-semibold text-orange-500">{books.length} books</span>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {recentBooks.map((book) => (
                    <div key={book.id} className="rounded-3xl bg-slate-50 p-4">
                      <div className="mb-4 flex h-36 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-indigo-400">
                        <p className="px-3 text-center text-sm font-bold text-white">{book.title}</p>
                      </div>

                      <h3 className="text-sm font-bold text-slate-800">{book.title}</h3>
                      <p className="text-xs text-slate-400">{book.author}</p>

                      <span
                        className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          book.status === "Available"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {book.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-xl font-bold text-slate-800">Quick Summary</h2>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-orange-50 p-4">
                    <p className="text-sm text-slate-500">Active Loans</p>
                    <p className="mt-1 text-3xl font-bold text-orange-600">{activeLoans}</p>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <p className="text-sm text-slate-500">Available Rate</p>
                    <p className="mt-1 text-3xl font-bold text-emerald-600">
                      {books.length === 0 ? "0%" : `${Math.round((availableBooks / books.length) * 100)}%`}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-pink-50 p-4">
                    <p className="text-sm text-slate-500">Saved Favorites</p>
                    <p className="mt-1 text-3xl font-bold text-pink-600">{favorites.length}</p>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;