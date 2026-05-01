import Sidebar from "../components/Sidebar";
import BookCard from "../components/BookCard";
import mockBooks from "../data/mockBooks";

function BookListPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">Browse Books</h1>
            <p className="mt-2 text-slate-500">
              Find and borrow your favorite books
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
              🔔
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
              👤
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <input
            type="text"
            placeholder="Search books by title, author or category..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 lg:max-w-2xl"
          />

          <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none">
            <option>All Categories</option>
            <option>Fiction</option>
            <option>Dystopian</option>
            <option>Classic</option>
            <option>Fantasy</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {mockBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookListPage;