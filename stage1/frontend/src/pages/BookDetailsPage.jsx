import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import BookCover from "../components/BookCover";
import mockBooks from "../data/mockBooks";

function BookDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const book = mockBooks.find((item) => item.id === Number(id));

  if (!book) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-slate-800">Book not found</h1>
          <button
            onClick={() => navigate("/books")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-white"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <button
          onClick={() => navigate("/books")}
          className="mb-6 text-sm text-slate-500 hover:text-slate-700"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <BookCover book={book} large />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-800">{book.title}</h1>

            <p className="mt-2 text-lg text-slate-500">{book.author}</p>

            <span className="mt-4 inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
              {book.status}
            </span>

            <div className="mt-6 space-y-2 text-sm text-slate-600">
              <p>
                <strong>Category:</strong> {book.category}
              </p>
              <p>
                <strong>Published:</strong> {book.published}
              </p>
              <p>
                <strong>Pages:</strong> {book.pages}
              </p>
            </div>

            <p className="mt-6 leading-7 text-slate-600">{book.description}</p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
                Borrow Book
              </button>

              <button className="rounded-xl border px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100">
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailsPage;