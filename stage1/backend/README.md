# Stage 1 Backend

This backend provides a basic FastAPI implementation for the Book Library System.

## Features

- Get all books
- Get book details
- Borrow a book
- Return a book

## API Endpoints

- GET /books
- GET /books/{book_id}
- POST /borrow/{book_id}
- POST /return/{book_id}

## Run

```bash
pip install -r requirements.txt
uvicorn main:app --reload
