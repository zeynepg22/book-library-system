from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

books = [
    {"id": 1, "title": "Clean Code", "author": "Robert C. Martin", "available": True},
    {"id": 2, "title": "Design Patterns", "author": "Erich Gamma", "available": True},
    {"id": 3, "title": "Introduction to Algorithms", "author": "Thomas H. Cormen", "available": False},
]

@app.get("/books")
def get_books():
    return books

@app.post("/borrow/{book_id}")
def borrow_book(book_id: int):
    for book in books:
        if book["id"] == book_id:
            if book["available"]:
                book["available"] = False
                return {"message": "Book borrowed successfully", "book": book}
            return {"message": "Book is not available"}
    return {"message": "Book not found"}
