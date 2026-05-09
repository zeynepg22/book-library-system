from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from database import get_session
from models import User

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/")
def create_user(user: User, session: Session = Depends(get_session)):
    existing_user = session.exec(
        select(User).where(User.username == user.username)
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    session.add(user)
    session.commit()
    session.refresh(user)

    return user


@router.get("/")
def get_users(session: Session = Depends(get_session)):
    return session.exec(select(User)).all()


@router.post("/login")
def login(username: str, session: Session = Depends(get_session)):
    user = session.exec(
        select(User).where(User.username == username)
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "message": "Login successful",
        "user": user,
    }