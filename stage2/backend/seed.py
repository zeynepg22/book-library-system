from sqlmodel import Session

from database import engine
from models import Book

books = [
    Book(
        title="1984",
        author="George Orwell",
        category="Dystopian"
    ),
    Book(
        title="The Hobbit",
        author="J.R.R. Tolkien",
        category="Fantasy"
    ),
    Book(
        title="To Kill a Mockingbird",
        author="Harper Lee",
        category="Classic"
    ),
]

with Session(engine) as session:
    for book in books:
        session.add(book)

    session.commit()

print("Seed data inserted successfully.")