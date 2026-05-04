from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from data import books

app = FastAPI(title="Book Library System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
