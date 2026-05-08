import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import BookCover from "../components/BookCover";
import { bookAPI, loanAPI } from "../services/api";

const pageCounts = {
  "Atomic Habits": 320,
  "1984": 328,
  "The Hobbit": 310,
  "To Kill a Mockingbird": 336,
  "The Little Prince": 96,
  "The Midnight Library": 304,
  "Intermezzo" : 412,
};

function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borrowLoading, setBorrowLoading] = useState(false);

  async function fetchBook() {
    try {
      setLoading(true);
      const data = await bookAPI.getById(id);
      setBook(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBook();
  }, [id]);

  async function handleBorrow() {
    try {
      setBorrowLoading(true);
      const userId = localStorage.getItem("userId") || "1";
      await loanAPI.borrow(book.id, userId);
      await fetchBook();
      alert("Book borrowed successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setBorrowLoading(false);
    }
  }

  function addToFavorites() {
    const existingFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyExists = existingFavorites.find(
      (item) => item.id === book.id
    );

    if (alreadyExists) {
      alert("Book already in favorites!");
      return;
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify([...existingFavorites, book])
    );

    alert("Book added to favorites!");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />
        <main className="flex-1 p-8 text-slate-500">Loading book...</main>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />
        <main className="flex-1 p-8 text-slate-500">Book not found.</main>
      </div>
    );
  }

  const isAvailable = book.status === "Available";
  const pageCount = pageCounts[book.title] || "Unknown";

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <button
          onClick={() => navigate("/books")}
          className="mb-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          ← Back to Books
        </button>

        <div className="grid min-h-[calc(100vh-120px)] grid-cols-[360px_1fr] gap-6">
          {/* COVER */}
          <section className="rounded-[2rem] bg-white p-6 shadow-sm">
            <div className="mx-auto max-w-[280px]">
              <BookCover
                book={book}
                size="h-[430px]"
                coverColor="from-indigo-300 to-pink-500"
              />
            </div>
          </section>

          {/* DETAILS */}
          <section className="rounded-[2rem] bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <span
                  className={`inline-block rounded-full px-4 py-2 text-sm font-bold ${
                    isAvailable
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {book.status}
                </span>

                <h1 className="mt-5 text-5xl font-black text-slate-900">
                  {book.title}
                </h1>

                <p className="mt-3 text-xl text-slate-500">
                  by {book.author}
                </p>
              </div>

              <div className="rounded-3xl bg-orange-50 px-6 py-4 text-center">
                <p className="text-sm font-bold text-orange-400">Pages</p>
                <p className="mt-1 text-3xl font-black text-orange-600">
                  {pageCount}
                </p>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-bold text-slate-400">Category</p>
                <p className="mt-2 text-xl font-black text-slate-800">
                  {book.category}
                </p>
              </div>

              <div className="rounded-3xl bg-blue-50 p-5">
                <p className="text-sm font-bold text-blue-400">
                  Borrow Period
                </p>
                <p className="mt-2 text-xl font-black text-slate-800">
                  14 Days
                </p>
              </div>

              <div className="rounded-3xl bg-pink-50 p-5">
                <p className="text-sm font-bold text-pink-400">
                  Late Tracking
                </p>
                <p className="mt-2 text-xl font-black text-slate-800">
                  Admin Panel
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 p-6">
              <h2 className="text-xl font-black text-slate-800">
                Borrowing Information
              </h2>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-500">
                After borrowing this book, the user is expected to return it
                within 14 days. Admins can track active loans, due dates, and
                overdue records from the Loan Management panel.
              </p>
            </div>

            <div className="mt-7 flex gap-4">
              <button
                disabled={!isAvailable || borrowLoading}
                onClick={handleBorrow}
                className={`rounded-2xl px-8 py-4 font-bold text-white transition ${
                  isAvailable
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "cursor-not-allowed bg-slate-300"
                }`}
              >
                {borrowLoading
                  ? "Borrowing..."
                  : isAvailable
                  ? "Borrow Book"
                  : "Unavailable"}
              </button>

              <button
                onClick={addToFavorites}
                className="rounded-2xl border border-pink-200 bg-pink-50 px-8 py-4 font-bold text-pink-600 transition hover:bg-pink-100"
              >
                Add to Favorites
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default BookDetailsPage;