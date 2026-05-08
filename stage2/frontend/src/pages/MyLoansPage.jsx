import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import BookCover from "../components/BookCover";
import { bookAPI, loanAPI } from "../services/api";

function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

function MyLoansPage() {
  const [loans, setLoans] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returnLoading, setReturnLoading] = useState(null);
  const [error, setError] = useState("");

  async function fetchData() {
    try {
      setLoading(true);
      setError("");

      const userId = localStorage.getItem("userId") || "1";
      const loanData = await loanAPI.getUserLoans(userId);
      const bookData = await bookAPI.getAll();

      setLoans(loanData);
      setBooks(bookData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function getBookById(bookId) {
    return books.find((book) => book.id === bookId);
  }

  async function handleReturn(bookId) {
    try {
      setReturnLoading(bookId);

      await loanAPI.returnBook(bookId);

      await fetchData();

      alert("Book returned successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setReturnLoading(null);
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar
          title="My Loans"
          subtitle="Track borrowed and returned books"
          showSearch={false}
        />

        {loading && (
          <div className="rounded-3xl bg-white p-8 text-slate-500 shadow-sm">
            Loading loans...
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl bg-red-100 px-5 py-4 text-red-600">
            {error}
          </div>
        )}

        {!loading && loans.length === 0 && (
          <div className="rounded-3xl bg-white p-8 text-slate-500 shadow-sm">
            You have no loans yet.
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          {loans.map((loan) => {
            const isActive = loan.status === "Active";
            const book = getBookById(loan.book_id);
            const dueDate = addDays(loan.borrow_date, 14);

            const fallbackBook = {
              id: loan.book_id,
              title: `Book #${loan.book_id}`,
              author: "Unknown Author",
              category: "Unknown",
              status: loan.status,
            };

            const displayBook = book || fallbackBook;

            return (
              <div
                key={loan.id}
                className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5">
                  <BookCover
                    book={displayBook}
                    size="h-52"
                    coverColor="from-orange-300 to-orange-500"
                  />
                </div>

                <h2 className="text-xl font-bold text-slate-800">
                  {displayBook.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {displayBook.author}
                </p>

                <div className="mt-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Loan ID</span>
                    <span className="font-semibold text-slate-700">
                      #{loan.id}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Borrow Date</span>
                    <span className="font-semibold text-slate-700">
                      {loan.borrow_date}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Due Date</span>
                    <span className="font-semibold text-slate-700">
                      {dueDate}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Return Date</span>
                    <span className="font-semibold text-slate-700">
                      {loan.return_date || "-"}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Status</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isActive
                          ? "bg-orange-100 text-orange-600"
                          : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </div>
                </div>

                <button
                  disabled={!isActive || returnLoading === loan.book_id}
                  onClick={() => handleReturn(loan.book_id)}
                  className={`mt-6 w-full rounded-2xl py-3 text-sm font-semibold text-white transition ${
                    isActive
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "cursor-not-allowed bg-slate-300"
                  }`}
                >
                  {returnLoading === loan.book_id
                    ? "Returning..."
                    : isActive
                    ? "Return Book"
                    : "Returned"}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default MyLoansPage;