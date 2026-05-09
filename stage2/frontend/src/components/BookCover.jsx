import { useEffect, useMemo, useState } from "react";

const customCoverImages = {
  Intermezzo:
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1719333180i/208931300.jpg",

  "The Seven Husbands of Evelyn Hugo":
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1664458703i/32620332.jpg",
};

function BookCover({
  book,
  coverColor = "from-orange-300 to-orange-500",
  size = "h-60",
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    setImageIndex(0);
    setShowFallback(false);
  }, [book.id, book.title, book.cover_url]);

  const imageSources = useMemo(() => {
    const sources = [];

    // 1. Önce custom cover dene
    if (customCoverImages[book.title]) {
      sources.push(customCoverImages[book.title]);
    }

    // 2. Sonra backend cover_url dene
    if (book.cover_url) {
      const safeCoverUrl = book.cover_url.includes("?")
        ? book.cover_url
        : `${book.cover_url}?default=false`;

      sources.push(safeCoverUrl);
    }

    return sources;
  }, [book]);

  const currentImage = imageSources[imageIndex];

  function tryNextImage() {
    if (imageIndex < imageSources.length - 1) {
      setImageIndex((prev) => prev + 1);
    } else {
      setShowFallback(true);
    }
  }

  if (currentImage && !showFallback) {
    return (
      <div
        className={`${size} flex items-center justify-center overflow-hidden rounded-3xl bg-white`}
      >
        <img
          src={currentImage}
          alt={book.title}
          onError={tryNextImage}
          onLoad={(e) => {
            if (
              e.currentTarget.naturalWidth < 80 ||
              e.currentTarget.naturalHeight < 80
            ) {
              tryNextImage();
            }
          }}
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