from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from database import get_session
from models import User

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/")
def create_user(user: User, session: Session = Depends(get_session)):
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.get("/")
def get_users(session: Session = Depends(get_session)):
    return session.exec(select(User)).all()