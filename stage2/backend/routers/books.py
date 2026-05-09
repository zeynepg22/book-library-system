from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select

from database import get_session
from models import Book

router = APIRouter(prefix="/books", tags=["Books"])


def generate_cover_url(isbn: str | None):
    if not isbn:
        return None

    clean_isbn = isbn.replace("-", "").replace(" ", "")
    return f"https://covers.openlibrary.org/b/isbn/{clean_isbn}-L.jpg"


@router.post("/", response_model=Book)
def create_book(book: Book, session: Session = Depends(get_session)):
    if book.isbn and not book.cover_url:
        book.cover_url = generate_cover_url(book.isbn)

    session.add(book)
    session.commit()
    session.refresh(book)
    return book


@router.get("/", response_model=list[Book])
def get_books(
    search: str | None = Query(default=None),
    category: str | None = Query(default=None),
    status: str | None = Query(default=None),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    session: Session = Depends(get_session),
):
    statement = select(Book)

    books = session.exec(statement).all()

    if search:
        search_lower = search.lower()
        books = [
            book
            for book in books
            if search_lower in book.title.lower()
            or search_lower in book.author.lower()
            or search_lower in book.category.lower()
        ]

    if category:
        books = [book for book in books if book.category.lower() == category.lower()]

    if status:
        books = [book for book in books if book.status.lower() == status.lower()]

    return books[offset : offset + limit]


@router.get("/{book_id}", response_model=Book)
def get_book(book_id: int, session: Session = Depends(get_session)):
    book = session.get(Book, book_id)

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    return book


@router.put("/{book_id}", response_model=Book)
def update_book(book_id: int, updated_book: Book, session: Session = Depends(get_session)):
    book = session.get(Book, book_id)

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    book.title = updated_book.title
    book.author = updated_book.author
    book.category = updated_book.category
    book.status = updated_book.status
    book.isbn = updated_book.isbn
    book.pages = updated_book.pages
    book.cover_url = updated_book.cover_url or generate_cover_url(updated_book.isbn)

    session.add(book)
    session.commit()
    session.refresh(book)

    return book


@router.delete("/{book_id}")
def delete_book(book_id: int, session: Session = Depends(get_session)):
    book = session.get(Book, book_id)

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    session.delete(book)
    session.commit()

    return {"message": "Book deleted successfully"}