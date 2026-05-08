import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { bookAPI, loanAPI } from "../services/api";

function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

function isOverdue(loan) {
  if (loan.status !== "Active") return false;

  const dueDate = new Date(addDays(loan.borrow_date, 14));
  const today = new Date();

  return today > dueDate;
}

function getUserEmailById(userId) {
  const savedUsers = JSON.parse(localStorage.getItem("libraryUsers")) || {};

  const foundEmail = Object.keys(savedUsers).find(
    (email) => String(savedUsers[email]) === String(userId)
  );

  return foundEmail || `User #${userId}`;
}

function AdminDashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || "overview";

  const [books, setBooks] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  async function fetchAdminData() {
    try {
      setLoading(true);

      const bookData = await bookAPI.getAll();
      const loanData = await loanAPI.getAll();

      setBooks(bookData);
      setLoans(loanData);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdminData();
  }, []);

  async function handleCreateBook(e) {
    e.preventDefault();

    try {
      await bookAPI.create({
        title,
        author,
        category,
        status: "Available",
      });

      setTitle("");
      setAuthor("");
      setCategory("");

      await fetchAdminData();
      alert("Book created successfully!");
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDeleteBook(bookId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      await bookAPI.remove(bookId);
      await fetchAdminData();
      alert("Book deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  }

  function getBookTitle(bookId) {
    const book = books.find((item) => item.id === bookId);
    return book ? book.title : `Book #${bookId}`;
  }

  const activeLoans = useMemo(
    () => loans.filter((loan) => loan.status === "Active").length,
    [loans]
  );

  const returnedLoans = useMemo(
    () => loans.filter((loan) => loan.status !== "Active").length,
    [loans]
  );

  const overdueLoans = useMemo(
    () => loans.filter((loan) => isOverdue(loan)).length,
    [loans]
  );

  const availableBooks = useMemo(
    () => books.filter((book) => book.status === "Available").length,
    [books]
  );

  const borrowedBooks = books.length - availableBooks;

  const tabs = [
    { key: "overview", label: "Overview", icon: "📊" },
    { key: "books", label: "Manage Books", icon: "📚" },
    { key: "loans", label: "Loan Tracking", icon: "🧾" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f4f7fb]">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar
          title="Admin Dashboard"
          subtitle="Manage books, loans, users, and library inventory"
          showSearch={false}
        />

        <div className="mb-6 grid grid-cols-4 gap-5">
  <div className="rounded-[2rem] bg-gradient-to-br from-purple-50 to-purple-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
      📚
    </div>

    <p className="text-sm font-bold text-slate-500">Total Books</p>

    <h3 className="mt-2 text-4xl font-black text-slate-800">
      {books.length}
    </h3>
  </div>

  <div className="rounded-[2rem] bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
      ✅
    </div>

    <p className="text-sm font-bold text-slate-500">Available</p>

    <h3 className="mt-2 text-4xl font-black text-emerald-600">
      {availableBooks}
    </h3>
  </div>

  <div className="rounded-[2rem] bg-gradient-to-br from-orange-50 to-orange-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
      👜
    </div>

    <p className="text-sm font-bold text-slate-500">Active Loans</p>

    <h3 className="mt-2 text-4xl font-black text-orange-600">
      {activeLoans}
    </h3>
  </div>

  <div className="rounded-[2rem] bg-gradient-to-br from-rose-50 to-rose-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
      ⚠️
    </div>

    <p className="text-sm font-bold text-slate-500">Overdue</p>

    <h3 className="mt-2 text-4xl font-black text-rose-600">
      {overdueLoans}
    </h3>
  </div>
</div>

        <div className="mb-6 flex w-fit gap-2 rounded-3xl bg-white p-2 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                tab.key === "overview"
                  ? setSearchParams({})
                  : setSearchParams({ tab: tab.key })
              }
              className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${
                activeTab === tab.key
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-8 text-slate-500 shadow-sm">
            Loading admin data...
          </div>
        ) : (
          <>
            {activeTab === "overview" && (
              <div className="grid grid-cols-3 gap-6">
                <section className="col-span-2 rounded-3xl bg-white p-7 shadow-sm">
                  <h2 className="mb-5 text-2xl font-black text-slate-800">
                    Library Overview
                  </h2>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="rounded-3xl bg-blue-50 p-6">
                      <p className="text-sm font-bold text-slate-500">
                        Book Availability
                      </p>
                      <h3 className="mt-3 text-4xl font-black text-blue-500">
                        {books.length === 0
                          ? "0%"
                          : `${Math.round(
                              (availableBooks / books.length) * 100
                            )}%`}
                      </h3>
                      <p className="mt-2 text-sm text-slate-400">
                        {availableBooks} available / {borrowedBooks} borrowed
                      </p>
                    </div>

                    <div className="rounded-3xl bg-pink-50 p-6">
                      <p className="text-sm font-bold text-slate-500">
                        Loan Completion
                      </p>
                      <h3 className="mt-3 text-4xl font-black text-pink-500">
                        {loans.length === 0
                          ? "0%"
                          : `${Math.round(
                              (returnedLoans / loans.length) * 100
                            )}%`}
                      </h3>
                      <p className="mt-2 text-sm text-slate-400">
                        {returnedLoans} returned / {activeLoans} active
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl bg-slate-50 p-6">
                    <h3 className="mb-4 text-lg font-black text-slate-800">
                      Recent Loans
                    </h3>

                    <div className="max-h-64 overflow-y-auto pr-2">
                      {loans.length === 0 ? (
                        <p className="text-slate-400">No recent loans.</p>
                      ) : (
                        loans.slice(-6).reverse().map((loan) => (
                          <div
                            key={loan.id}
                            className="mb-3 flex items-center justify-between rounded-2xl bg-white px-4 py-3"
                          >
                            <div>
                              <p className="font-bold text-slate-700">
                                {getBookTitle(loan.book_id)}
                              </p>
                              <p className="text-sm text-slate-400">
                                {getUserEmailById(loan.user_id)} • Borrowed {loan.borrow_date}  
                              </p>
                            </div>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-bold ${
                                loan.status === "Active"
                                  ? "bg-orange-100 text-orange-600"
                                  : "bg-emerald-100 text-emerald-600"
                              }`}
                            >
                              {loan.status}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </section>

                <section className="rounded-3xl bg-white p-7 shadow-sm">
                  <h2 className="mb-5 text-2xl font-black text-slate-800">
                    Quick Actions
                  </h2>

                  <div className="space-y-4">
                    <button
                      onClick={() => setSearchParams({ tab: "books" })}
                      className="w-full rounded-3xl bg-orange-500 p-5 text-left font-bold text-white transition hover:bg-orange-600"
                    >
                      📚 Add or Delete Books
                    </button>

                    <button
                      onClick={() => setSearchParams({ tab: "loans" })}
                      className="w-full rounded-3xl bg-blue-500 p-5 text-left font-bold text-white transition hover:bg-blue-600"
                    >
                      🧾 View Loan Tracking
                    </button>

                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-sm font-bold text-slate-400">
                        System Note
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Due date is calculated as 14 days after the borrow date.
                        Overdue loans are highlighted automatically.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "books" && (
              <div className="grid grid-cols-3 gap-6">
                <section className="rounded-3xl bg-white p-7 shadow-sm">
                  <h2 className="mb-5 text-2xl font-black text-slate-800">
                    Add New Book
                  </h2>

                  <form onSubmit={handleCreateBook} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Book title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:ring-2 focus:ring-orange-200"
                      required
                    />

                    <input
                      type="text"
                      placeholder="Author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:ring-2 focus:ring-orange-200"
                      required
                    />

                    <input
                      type="text"
                      placeholder="Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:ring-2 focus:ring-orange-200"
                      required
                    />

                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-orange-500 px-5 py-4 font-bold text-white transition hover:bg-orange-600"
                    >
                      Add Book
                    </button>
                  </form>
                </section>

                <section className="col-span-2 rounded-3xl bg-white p-7 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-800">
                      Library Books
                    </h2>

                    <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
                      {books.length} Books
                    </span>
                  </div>

                  <div className="max-h-[270px] overflow-y-auto pr-2">
                    <table className="w-full">
                      <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-slate-100 text-left">
                          <th className="pb-4 text-sm font-bold text-slate-400">
                            Title
                          </th>
                          <th className="pb-4 text-sm font-bold text-slate-400">
                            Author
                          </th>
                          <th className="pb-4 text-sm font-bold text-slate-400">
                            Category
                          </th>
                          <th className="pb-4 text-sm font-bold text-slate-400">
                            Status
                          </th>
                          <th className="pb-4 text-sm font-bold text-slate-400">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {books.map((book) => (
                          <tr key={book.id} className="border-b border-slate-50">
                            <td className="py-5 font-bold text-slate-700">
                              {book.title}
                            </td>
                            <td className="py-5 text-slate-500">{book.author}</td>
                            <td className="py-5 text-slate-500">
                              {book.category}
                            </td>
                            <td className="py-5">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${
                                  book.status === "Available"
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-red-100 text-red-600"
                                }`}
                              >
                                {book.status}
                              </span>
                            </td>
                            <td className="py-5">
                              <button
                                onClick={() => handleDeleteBook(book.id)}
                                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "loans" && (
              <section className="rounded-3xl bg-white p-7 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-800">
                    Loan Tracking
                  </h2>

                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-600">
                    {loans.length} Loans
                  </span>
                </div>

                {loans.length === 0 ? (
                  <p className="text-slate-500">No loan records found.</p>
                ) : (
                  <div className="max-h-[520px] overflow-y-auto pr-2">
                    <table className="w-full">
                      <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-slate-100 text-left">
                          <th className="pb-4 text-sm font-bold text-slate-400">
                            User
                          </th>
                          <th className="pb-4 text-sm font-bold text-slate-400">
                            Book
                          </th>
                          <th className="pb-4 text-sm font-bold text-slate-400">
                            Borrow Date
                          </th>
                          <th className="pb-4 text-sm font-bold text-slate-400">
                            Due Date
                          </th>
                          <th className="pb-4 text-sm font-bold text-slate-400">
                            Status
                          </th>
                          <th className="pb-4 text-sm font-bold text-slate-400">
                            Delay
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {loans.map((loan) => {
                          const overdue = isOverdue(loan);

                          return (
                            <tr key={loan.id} className="border-b border-slate-50">
                              <td className="py-5 font-bold text-slate-700">
                                {getUserEmailById(loan.user_id)}
                              </td>
                              <td className="py-5 text-slate-500">
                                {getBookTitle(loan.book_id)}
                              </td>
                              <td className="py-5 text-slate-500">
                                {loan.borrow_date}
                              </td>
                              <td className="py-5 text-slate-500">
                                {addDays(loan.borrow_date, 14)}
                              </td>
                              <td className="py-5">
                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                                    loan.status === "Active"
                                      ? "bg-orange-100 text-orange-600"
                                      : "bg-emerald-100 text-emerald-600"
                                  }`}
                                >
                                  {loan.status}
                                </span>
                              </td>
                              <td className="py-5">
                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                                    overdue
                                      ? "bg-red-100 text-red-600"
                                      : "bg-slate-100 text-slate-500"
                                  }`}
                                >
                                  {overdue ? "Overdue" : "On Time"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboardPage;