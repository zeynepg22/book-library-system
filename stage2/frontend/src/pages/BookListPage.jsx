import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import BookCover from "../components/BookCover";
import { bookAPI } from "../services/api";

const coverColors = [
  "from-orange-300 to-orange-500",
  "from-lime-300 to-lime-500",
  "from-cyan-300 to-cyan-500",
  "from-indigo-300 to-indigo-500",
  "from-pink-300 to-pink-500",
  "from-purple-300 to-purple-500",
];

function BookListPage() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const [limit] = useState(8);
  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchBooks() {
    try {
      setLoading(true);
      setError("");

      const data = await bookAPI.getAll({
        search,
        category,
        status,
        limit,
        offset,
      });

      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAllBooksForCategories() {
    try {
      const data = await bookAPI.getAll();
      setAllBooks(data);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchAllBooksForCategories();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchBooks();
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, category, status, offset]);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setOffset(0);
  }

  function handleCategoryChange(item) {
    setCategory(item);
    setOffset(0);
  }

  function handleStatusChange(item) {
    setStatus(item);
    setOffset(0);
  }

  const categories = useMemo(() => {
    return ["All", ...new Set(allBooks.map((book) => book.category))];
  }, [allBooks]);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-8 rounded-[2rem] bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between gap-8">
            <div>
              <h1 className="text-5xl font-black leading-tight text-slate-900">
                Browse Books
              </h1>
              <p className="mt-2 text-base text-slate-500">
                Explore available books in the library
              </p>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search by title, author, or category..."
                value={search}
                onChange={handleSearchChange}
                className="w-[420px] rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-orange-200"
              />

              <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-lg">
                🔔
              </button>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-5 py-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  👩‍💻
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Library User
                  </p>
                  <p className="text-xs text-slate-400">Student account</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Filter Books
              </h2>
              <p className="text-sm text-slate-400">
                Search, category and availability filters use backend API
              </p>
            </div>

            <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
              {books.length} Results
            </span>
          </div>

          <div className="mb-5 flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => handleCategoryChange(item)}
                className={`rounded-2xl px-5 py-2 text-sm font-bold transition ${
                  category === item
                    ? "bg-orange-500 text-white shadow-md shadow-orange-100"
                    : "bg-slate-100 text-slate-500 hover:bg-orange-100 hover:text-orange-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {["All", "Available", "Borrowed"].map((item) => (
              <button
                key={item}
                onClick={() => handleStatusChange(item)}
                className={`rounded-2xl px-5 py-2 text-sm font-bold transition ${
                  status === item
                    ? "bg-blue-500 text-white shadow-md shadow-blue-100"
                    : "bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="rounded-3xl bg-white p-8 text-slate-500 shadow-sm">
            Loading books...
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl bg-red-100 px-5 py-4 text-red-600">
            {error}
          </div>
        )}

        {!loading && books.length === 0 && (
          <div className="rounded-3xl bg-white p-8 text-slate-500 shadow-sm">
            No books found.
          </div>
        )}

        <div className="grid grid-cols-4 gap-6">
          {books.map((book) => {
            const isAvailable = book.status === "Available";
            const coverColor = coverColors[book.id % coverColors.length];

            return (
              <div
                key={book.id}
                className="rounded-[2rem] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  onClick={() => navigate(`/book-details/${book.id}`)}
                  className="mb-5 cursor-pointer transition hover:scale-[1.02]"
                >
                  <BookCover book={book} coverColor={coverColor} size="h-60" />
                </div>

                <h2
                  onClick={() => navigate(`/book-details/${book.id}`)}
                  className="cursor-pointer text-lg font-black text-slate-800 hover:text-orange-500"
                >
                  {book.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">{book.author}</p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      isAvailable
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {book.status}
                  </span>

                  <span className="text-right text-sm text-slate-400">
                    {book.category}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>{book.pages ? `${book.pages} pages` : "Pages N/A"}</span>
                  <span>{book.isbn ? `ISBN: ${book.isbn}` : "ISBN N/A"}</span>
                </div>

                <button
                  onClick={() => navigate(`/book-details/${book.id}`)}
                  className="mt-5 w-full rounded-2xl bg-orange-500 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            disabled={offset === 0}
            onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
            className={`rounded-2xl px-6 py-3 text-sm font-bold transition ${
              offset === 0
                ? "cursor-not-allowed bg-slate-200 text-slate-400"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            Previous
          </button>

          <span className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-500">
            Page {Math.floor(offset / limit) + 1}
          </span>

          <button
            disabled={books.length < limit}
            onClick={() => setOffset((prev) => prev + limit)}
            className={`rounded-2xl px-6 py-3 text-sm font-bold transition ${
              books.length < limit
                ? "cursor-not-allowed bg-slate-200 text-slate-400"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default BookListPage;