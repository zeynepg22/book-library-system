function BookCover({ book, large = false }) {
  const sizeClasses = large
    ? "h-[420px] w-full max-w-sm text-4xl"
    : "h-56 w-full text-2xl";

  return (
    <div
      className={`${book.coverColor} ${book.textColor} ${sizeClasses} flex flex-col justify-between rounded-t-2xl p-6`}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.3em] opacity-80">
        Book Library
      </div>

      <div>
        <h3 className="text-left font-bold leading-tight">{book.title}</h3>
        <p className="mt-3 text-sm opacity-90">{book.author}</p>
      </div>
    </div>
  );
}

export default BookCover;