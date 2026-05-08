import { useNavigate } from "react-router-dom";
import BookCover from "./BookCover";

function BookCard({ book }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <BookCover book={book} />

      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-800">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">{book.author}</p>

        <span className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          {book.status}
        </span>

        <button
          onClick={() => navigate(`/book-details/${book.id}`)}
          className="mt-4 w-full rounded-xl border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default BookCard;