import { useState } from "react";

const coverImages = {
  "Atomic Habits": "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  "1984": "https://i.dr.com.tr/cache/600x600-0/originals/0000000064038-1.jpg",
  "The Hobbit": "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
  "To Kill a Mockingbird": "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
  "The Little Prince": "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",

  "The Midnight Library": "https://i.dr.com.tr/cache/500x400-0/originals/0001924079001-1.jpg",
  "Intermezzo": "https://i.dr.com.tr/cache/600x600-0/originals/0002172929001-1.jpg",
};

function BookCover({
  book,
  coverColor = "from-orange-300 to-orange-500",
  size = "h-60",
}) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = coverImages[book.title];

  if (imageUrl && !imageError) {
    return (
      <div
        className={`${size} flex items-center justify-center overflow-hidden rounded-3xl bg-white`}
      >
        <img
          src={imageUrl}
          alt={book.title}
          onError={() => setImageError(true)}
          className="h-full w-full object-contain p-2"
        />
      </div>
    );
  }

  return (
    <div
      className={`${size} flex items-center justify-center rounded-3xl bg-gradient-to-br ${coverColor}`}
    >
      <h2 className="px-4 text-center text-2xl font-bold text-white">
        {book.title}
      </h2>
    </div>
  );
}

export default BookCover;
