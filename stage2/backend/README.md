# Stage 2 Backend

This backend implements the Stage 2 API for the Book Library System using FastAPI, SQLModel, and SQLite.

## Features

- SQLite database integration
- Book CRUD operations
- Borrow / Return operations
- User loan records
- Availability control for borrowing
- ISBN support
- Pages support
- Automatic cover image generation
- Open Library Covers API integration
- Search, filter, and pagination support
- Swagger API documentation
- CORS support for React frontend
- Environment variable configuration with `.env`

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /users/ | Get all users |
| POST | /users/ | Create a user |
| GET | /books/ | Get all books |
| POST | /books/ | Create a book |
| GET | /books/{book_id} | Get book details |
| PUT | /books/{book_id} | Update book |
| DELETE | /books/{book_id} | Delete book |
| POST | /borrow/{book_id} | Borrow a book |
| POST | /return/{book_id} | Return a book |
| GET | /loans | Get all loans |
| GET | /users/{user_id}/loans | Get loans of a specific user |

---

## Book Search / Filter / Pagination

Examples:

```http
/books?search=harry
/books?category=Fantasy
/books?status=Available
/books?limit=5&offset=0
```
---

## Automatic Cover Images

Book covers are automatically generated using the Open Library Covers API based on ISBN values.

---

## Run Backend

```bash
cd stage2/backend

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

python seed.py

uvicorn main:app --reload
```
### Swagger Documentation
```bash
http://127.0.0.1:8000/docs
```
---

## Tech Stack
- FastAPI
- SQLModel
- SQLite
- REST API
- Swagger UI
- Open Library Covers API
