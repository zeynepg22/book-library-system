import logging
import time
from datetime import datetime

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware

# ── Logging setup ──────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler("library.log", encoding="utf-8"),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger("library")

# ── App ────────────────────────────────────────────────────────────────────────
app = FastAPI(title="Book Library System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Latency tracking middleware ────────────────────────────────────────────────
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()
    response: Response = await call_next(request)
    latency_ms = round((time.perf_counter() - start) * 1000, 2)

    level = logging.WARNING if response.status_code >= 400 else logging.INFO
    logger.log(
        level,
        "REQUEST | %s %s | status=%d | latency=%sms",
        request.method,
        request.url.path,
        response.status_code,
        latency_ms,
    )
    return response


# ── Data ───────────────────────────────────────────────────────────────────────
books = [
    {
        "id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "category": "Fiction",
        "status": "Available",
        "published": 1925,
        "pages": 180,
        "description": "A classic novel set in the Roaring Twenties, focusing on wealth, love, and the American Dream.",
        "coverColor": "bg-blue-900",
        "textColor": "text-yellow-100",
    },
    {
        "id": 2,
        "title": "1984",
        "author": "George Orwell",
        "category": "Dystopian",
        "status": "Available",
        "published": 1949,
        "pages": 328,
        "description": "A dystopian social science fiction novel about totalitarianism, surveillance, and control.",
        "coverColor": "bg-red-700",
        "textColor": "text-white",
    },
    {
        "id": 3,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "category": "Classic",
        "status": "Available",
        "published": 1960,
        "pages": 281,
        "description": "A powerful novel about justice, morality, and racism in the American South.",
        "coverColor": "bg-stone-700",
        "textColor": "text-white",
    },
    {
        "id": 4,
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "category": "Fantasy",
        "status": "Available",
        "published": 1937,
        "pages": 310,
        "description": "A fantasy adventure following Bilbo Baggins on a journey filled with danger and discovery.",
        "coverColor": "bg-emerald-800",
        "textColor": "text-yellow-100",
    },
]


# ── Endpoints ──────────────────────────────────────────────────────────────────
@app.get("/books")
def get_books():
    logger.info("BOOKS_LIST | Returned %d books", len(books))
    return books


@app.get("/books/{book_id}")
def get_book(book_id: int):
    for book in books:
        if book["id"] == book_id:
            logger.info("BOOK_DETAIL | book_id=%d | title='%s'", book_id, book["title"])
            return book

    logger.warning("BOOK_NOT_FOUND | book_id=%d", book_id)
    return {"message": "Book not found"}


@app.post("/borrow/{book_id}")
def borrow_book(book_id: int):
    for book in books:
        if book["id"] == book_id:
            if book["status"] == "Available":
                book["status"] = "Borrowed"
                logger.info("BORROW_SUCCESS | book_id=%d | title='%s'", book_id, book["title"])
                return {"message": "Book borrowed successfully", "book": book}

            logger.warning(
                "BORROW_FAILED | book_id=%d | title='%s' | reason=already_borrowed",
                book_id,
                book["title"],
            )
            return {"message": "Book is not available"}

    logger.warning("BORROW_FAILED | book_id=%d | reason=book_not_found", book_id)
    return {"message": "Book not found"}


@app.post("/return/{book_id}")
def return_book(book_id: int):
    for book in books:
        if book["id"] == book_id:
            if book["status"] == "Borrowed":
                book["status"] = "Available"
                logger.info("RETURN_SUCCESS | book_id=%d | title='%s'", book_id, book["title"])
                return {"message": "Book returned successfully", "book": book}

            logger.warning(
                "RETURN_FAILED | book_id=%d | title='%s' | reason=not_borrowed",
                book_id,
                book["title"],
            )
            return {"message": "Book is already available"}

    logger.warning("RETURN_FAILED | book_id=%d | reason=book_not_found", book_id)
    return {"message": "Book not found"}
