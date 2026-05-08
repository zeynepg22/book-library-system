import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import BookCover from "../components/BookCover";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
  }, []);

  function removeFavorite(bookId) {
    const updatedFavorites = favorites.filter(
      (book) => book.id !== bookId
    );

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar
          title="Favorites"
          subtitle="Your saved favorite books"
          showSearch={false}
        />

        {favorites.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-700">
              No favorite books yet
            </h2>

            <p className="mt-2 text-slate-400">
              Add books to favorites from Browse Books page
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {favorites.map((book) => (
              <div
                key={book.id}
                className="rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5">
                  <BookCover
                    book={book}
                    size="h-60"
                    coverColor="from-pink-300 to-pink-500"
                  />
                </div>

                <h2 className="text-lg font-bold text-slate-800">
                  {book.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {book.author}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600">
                    Favorite
                  </span>

                  <span className="text-sm text-slate-400">
                    {book.category}
                  </span>
                </div>

                <button
                  onClick={() => removeFavorite(book.id)}
                  className="mt-5 w-full rounded-2xl bg-red-500 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  Remove Favorite
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default FavoritesPage;