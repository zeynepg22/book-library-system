from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlmodel import Session, select

from auth import hash_password, verify_password
from database import get_session
from models import User

router = APIRouter(prefix="/users", tags=["Users"])


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str = "user"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/")
def create_user(user_data: UserCreate, session: Session = Depends(get_session)):
    existing_user = session.exec(
        select(User).where(User.email == user_data.email)
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    user = User(
        username=user_data.username,
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        role=user_data.role,
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role,
    }


@router.get("/")
def get_users(session: Session = Depends(get_session)):
    users = session.exec(select(User)).all()

    return [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
        }
        for user in users
    ]


@router.post("/login")
def login(login_data: LoginRequest, session: Session = Depends(get_session)):
    user = session.exec(
        select(User).where(User.email == login_data.email)
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(login_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid password")

    return {
        "user_id": user.id,
        "email": user.email,
        "role": user.role,
    }