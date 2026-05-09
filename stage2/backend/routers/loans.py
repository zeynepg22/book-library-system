from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from database import get_session
from models import Book, Loan, User

router = APIRouter(tags=["Loans"])


@router.post("/borrow/{book_id}")
def borrow_book(book_id: int, user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    book = session.get(Book, book_id)

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    if book.status == "Borrowed":
        raise HTTPException(status_code=400, detail="Book is not available")

    loan = Loan(
        user_id=user_id,
        book_id=book_id,
        borrow_date=date.today(),
        status="Active",
    )

    book.status = "Borrowed"

    session.add(loan)
    session.add(book)
    session.commit()
    session.refresh(loan)

    return {"message": "Book borrowed successfully", "loan": loan}


@router.post("/return/{book_id}")
def return_book(book_id: int, user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    book = session.get(Book, book_id)

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    if book.status == "Available":
        raise HTTPException(status_code=400, detail="Book is already available")

    statement = select(Loan).where(
        Loan.book_id == book_id,
        Loan.user_id == user_id,
        Loan.status == "Active",
    )

    loan = session.exec(statement).first()

    if not loan:
        raise HTTPException(
            status_code=404,
            detail="Active loan for this user not found",
        )

    loan.status = "Returned"
    loan.return_date = date.today()
    book.status = "Available"

    session.add(loan)
    session.add(book)
    session.commit()
    session.refresh(loan)

    return {"message": "Book returned successfully", "loan": loan}


@router.get("/loans")
def get_loans(session: Session = Depends(get_session)):
    return session.exec(select(Loan)).all()


@router.get("/users/{user_id}/loans")
def get_user_loans(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    statement = select(Loan).where(Loan.user_id == user_id)
    loans = session.exec(statement).all()

    return loans