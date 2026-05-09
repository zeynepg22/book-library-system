# 📚 Book Library System

A web-based Book Library System developed as part of a Software Architecture course project.

The system allows users to browse books, view book details, borrow and return books, and enables administrators to manage the book collection.

---

## 🚀 Project Overview

This project demonstrates the application of **Software Architecture principles** using the **4+1 View Model** and a **layered (N-tier) architecture**.

The project is organized into two stages:

- **Stage 1:** Core functionality and initial architecture implementation
- **Stage 2:** Improved backend with database integration, REST API endpoints, borrowing logic, seed data, and frontend-ready book data

---

## 🧱 Architecture

The system follows a **layered architecture**:

| Layer | Description |
|---|---|
| Presentation Layer | Frontend UI for user interaction, pages, navigation, and book display |
| Application Layer | FastAPI backend that handles business logic, API endpoints, borrowing and returning books |
| Data Layer | SQLite database managed with SQLModel |

---

## 🧩 Features

### 👤 User Features

- View book list
- Search books by title, author, or category
- Filter books by category or availability status
- View book details
- Borrow books
- Return books
- View user loan records
- See book cover images
- See ISBN and page count information

### 🛠 Admin Features

- Add books
- Update books
- Delete books
- Manage book availability
- Add ISBN and page count information
- Automatically generate book cover URLs using ISBN

---

## 🔌 API Endpoints

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

---

## 🖥 Backend

The backend is implemented using **FastAPI**, **SQLModel**, and **SQLite**.

Backend responsibilities:

- REST API endpoints
- Database connection
- Book CRUD operations
- Borrow / Return logic
- Availability control
- User loan records
- Seed data
- Cover URL generation
- CORS configuration for frontend integration

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```
---

## Frontend

The frontend is implemented with React and communicates with the backend through REST API requests.

Frontend responsibilities:

- Display book list
- Display book details
- Show book cover images
- Show ISBN and page count
- Borrow and return books
- Add, update, and delete books
- Use search, filter, and pagination parameters from the backend

---

  ## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| FastAPI | Backend API |
| Python | Backend language |
| SQLModel | ORM and database models |
| SQLite | Database |
| React | Frontend UI |
| REST API | Frontend-backend communication |
| Swagger UI | API documentation and testing |
| Open Library Covers API | Automatic book cover images |
| UML | System design |
| 4+1 View Model | Software architecture documentation |
