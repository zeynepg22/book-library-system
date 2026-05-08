import BookCover from "../components/BookCover";import Topbar from "../components/Topbar";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { bookAPI, loanAPI } from "../services/api";

const coverColors = [
  "from-red-300 to-red-500",
  "from-orange-300 to-orange-500",
  "from-lime-300 to-lime-500",
  "from-cyan-300 to-cyan-500",
  "from-indigo-300 to-indigo-500",
  "from-pink-300 to-pink-500",
];

function BookListPage() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [borrowLoading, setBorrowLoading] = useState(null);
  const [error, setError] = useState("");

  async function fetchBooks() {
    try {
      setLoading(true);
      setError("");
      const data = await bookAPI.getAll();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  async function handleBorrow(bookId) {
    try {
      setBorrowLoading(bookId);
      await loanAPI.borrow(bookId, 1);
      await fetchBooks();
      alert("Book borrowed successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setBorrowLoading(null);
    }
  }

  function addToFavorites(book) {
    const existingFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyExists = existingFavorites.find(
      (item) => item.id === book.id
    );

    if (alreadyExists) {
      alert("Book already in favorites!");
      return;
    }

    const updatedFavorites = [...existingFavorites, book];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert("Book added to favorites!");
  }

  const categories = useMemo(() => {
    return ["All", ...new Set(books.map((book) => book.category))];
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === "All" || book.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [books, search, category]);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between gap-6">
          <Topbar
            title="Browse Books"
            subtitle="Explore available books in the library"
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search by title, author, or category..."
          />

          
        </div>

        <div className="mb-8 flex gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-2xl px-5 py-2 text-sm font-semibold transition ${
                category === item
                  ? "bg-orange-500 text-white"
                  : "bg-white text-slate-500 hover:bg-orange-100 hover:text-orange-600"
              }`}
            >
              {item}
            </button>
          ))}
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

        {!loading && filteredBooks.length === 0 && (
          <div className="rounded-3xl bg-white p-8 text-slate-500 shadow-sm">
            No books found.
          </div>
        )}

        <div className="grid grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const isAvailable = book.status === "Available";
            const coverColor = coverColors[book.id % coverColors.length];

            return (
              <div
                key={book.id}
                className="rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  onClick={() => navigate(`/book-details/${book.id}`)}
                  className="mb-5 cursor-pointer transition hover:scale-[1.02]"
                >
                  <BookCover book={book} coverColor={coverColor} />
                </div>

                <h2
                  onClick={() => navigate(`/book-details/${book.id}`)}
                  className="cursor-pointer text-lg font-bold text-slate-800 hover:text-orange-500"
                >
                  {book.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">{book.author}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      isAvailable
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {book.status}
                  </span>

                  <span className="text-sm text-slate-400">
                    {book.category}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/book-details/${book.id}`)}
                  className="mt-5 w-full rounded-2xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default BookListPage;