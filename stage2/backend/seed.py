from sqlmodel import Session, SQLModel, select

from auth import hash_password
from database import engine
from models import Book, User

SQLModel.metadata.create_all(engine)

users = [
    User(
        username="Test User",
        email="user@test.com",
        password_hash=hash_password("password123"),
        role="user",
    ),
    User(
        username="Admin User",
        email="admin@test.com",
        password_hash=hash_password("admin123"),
        role="admin",
    ),
]

books = [
    Book(
        title="1984",
        author="George Orwell",
        category="Dystopian",
        status="Available",
        isbn="9780451524935",
        pages=328,
        cover_url="https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    ),
    Book(
        title="The Hobbit",
        author="J.R.R. Tolkien",
        category="Fantasy",
        status="Available",
        isbn="9780547928227",
        pages=310,
        cover_url="https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
    ),
    Book(
        title="Harry Potter and the Sorcerer's Stone",
        author="J.K. Rowling",
        category="Fantasy",
        status="Available",
        isbn="9780590353427",
        pages=309,
        cover_url="https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
    ),
    Book(
        title="The Little Prince",
        author="Antoine de Saint-Exupéry",
        category="Classic",
        status="Available",
        isbn="9780156012195",
        pages=96,
        cover_url="https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
    ),
    Book(
        title="Pride and Prejudice",
        author="Jane Austen",
        category="Romance",
        status="Available",
        isbn="9780141439518",
        pages=279,
        cover_url="https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    ),
    Book(
        title="The Great Gatsby",
        author="F. Scott Fitzgerald",
        category="Classic",
        status="Available",
        isbn="9780743273565",
        pages=180,
        cover_url="https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    ),
    Book(
        title="To Kill a Mockingbird",
        author="Harper Lee",
        category="Classic",
        status="Available",
        isbn="9780061120084",
        pages=336,
        cover_url="https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
    ),
    Book(
        title="Animal Farm",
        author="George Orwell",
        category="Political Satire",
        status="Available",
        isbn="9780451526342",
        pages=112,
        cover_url="https://covers.openlibrary.org/b/isbn/9780451526342-L.jpg",
    ),
]

with Session(engine) as session:

    for user in users:
        existing_user = session.exec(
            select(User).where(User.email == user.email)
        ).first()

        if not existing_user:
            session.add(user)

    for book in books:
        existing_book = session.exec(
            select(Book).where(Book.isbn == book.isbn)
        ).first()

        if not existing_book:
            session.add(book)

    session.commit()

print("Seed data checked successfully.")
