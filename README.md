# 📚 Book Library System

A web-based Book Library System developed as part of a Software Architecture course project.  
The system allows users to browse books, view details, borrow and return books, and enables administrators to manage the book collection.

---

## 🚀 Project Overview

This project demonstrates the application of **Software Architecture principles** using the **4+1 View Model** and a **layered (N-tier) architecture**.

The system is implemented in two stages:

- **Stage 1:** Core functionality + partial implementation (current)
- **Stage 2:** Full system with database and authentication (planned)

---

## 🧱 Architecture

The system follows a **layered architecture**:

| Layer | Description |
|------|------------|
| Presentation Layer | Frontend UI (user interaction, pages, navigation) |
| Application Layer | Backend API implemented using FastAPI |
| Data Layer | In-memory data (Stage 1), database planned for Stage 2 |

---

## 🧩 Features

### 👤 User Features

- View book list  
- Search books (title, author, category)  
- View book details  
- Borrow book  
- Return book  

### 🛠 Admin Features

- Add books  
- Update books  
- Delete books  

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/books` | Retrieve all books |
| GET | `/books/{book_id}` | Get book details |
| POST | `/borrow/{book_id}` | Borrow a book |
| POST | `/return/{book_id}` | Return a book |

---

## Backend (FastAPI)

The backend is implemented using **FastAPI** and provides RESTful API endpoints.

### Example: Borrow Book Logic

```bash
@app.post("/borrow/{book_id}")
def borrow_book(book_id: int):
    for book in books:
        if book["id"] == book_id:
            if book["status"] == "Available":
                book["status"] = "Borrowed"
                return {"message": "Book borrowed successfully"}
            return {"message": "Book is not available"}
    return {"message": "Book not found"}
```

## Frontend (Partial UI)

The UI includes:

Login page (role selection)
Book list page
Book detail page
Borrow / Return actions
Admin dashboard

The frontend communicates with the backend via HTTP requests.

## Technologies Used
Technology	| Purpose |
|------|---------|
FastAPI	| Backend API |
Python	| Backend language |
React (partial/planned)	| Frontend |
REST API	| Communication |
UML	| System design |
