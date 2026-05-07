# Stage 2 Backend

This backend implements the Stage 2 API for the Book Library System using FastAPI, SQLModel, and SQLite.

## Features

- SQLite database integration
- Book CRUD operations
- Borrow book operation
- Return book operation
- Get user loan records
- Availability control for borrowing

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/` | Get all users |
| POST | `/users/` | Create a user |
| GET | `/books/` | Get all books |
| POST | `/books/` | Create a book |
| GET | `/books/{book_id}` | Get book details |
| PUT | `/books/{book_id}` | Update book |
| DELETE | `/books/{book_id}` | Delete book |
| POST | `/borrow/{book_id}` | Borrow a book |
| POST | `/return/{book_id}` | Return a book |
| GET | `/loans` | Get all loans |
| GET | `/users/{user_id}/loans` | Get loans of a specific user |

## Run

```bash
cd stage2/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

