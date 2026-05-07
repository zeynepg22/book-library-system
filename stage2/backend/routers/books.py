from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from database import get_session
from models import Book

router = APIRouter(prefix="/books", tags=["Books"])


@router.post("/")
def create_book(book: Book, session: Session = Depends(get_session)):
    session.add(book)
    session.commit()
    session.refresh(book)
    return book


@router.get("/")
def get_books(session: Session = Depends(get_session)):
    return session.exec(select(Book)).all()


@router.get("/{book_id}")
def get_book(book_id: int, session: Session = Depends(get_session)):
    book = session.get(Book, book_id)

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    return book


@router.put("/{book_id}")
def update_book(book_id: int, updated_book: Book, session: Session = Depends(get_session)):
    book = session.get(Book, book_id)

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    book.title = updated_book.title
    book.author = updated_book.author
    book.category = updated_book.category
    book.status = updated_book.status

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