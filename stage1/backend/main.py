from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Book Library System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.get("/books")
def get_books():
    return books

@app.get("/books/{book_id}")
def get_book(book_id: int):
    for book in books:
        if book["id"] == book_id:
            return book
    return {"message": "Book not found"}

@app.post("/borrow/{book_id}")
def borrow_book(book_id: int):
    for book in books:
        if book["id"] == book_id:
            if book["status"] == "Available":
                book["status"] = "Borrowed"
                return {"message": "Book borrowed successfully", "book": book}
            return {"message": "Book is not available"}
    return {"message": "Book not found"}

@app.post("/return/{book_id}")
def return_book(book_id: int):
    for book in books:
        if book["id"] == book_id:
            if book["status"] == "Borrowed":
                book["status"] = "Available"
                return {"message": "Book returned successfully", "book": book}
            return {"message": "Book is already available"}
    return {"message": "Book not found"}
