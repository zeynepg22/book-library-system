# Stage 2 – Full Implementation

## Book Library System

This stage includes the full implementation of the Book Library System with improved frontend UI, backend API integration, and database-ready system structure.

---

## Project Overview

The Book Library System allows users to browse books, search books, view book details, borrow books, return books, and manage their loans. Admin users can manage the book collection and monitor system data through an admin dashboard.

Stage 2 improves the Stage 1 partial implementation by adding a more complete user interface, working navigation, REST API integration, and a more complete backend structure.

---

## Technologies Used

### Frontend
- React
- Vite
- Tailwind CSS
- React Router

### Backend
- Python
- FastAPI
- Uvicorn
- REST API

### Architecture
- Layered Architecture
- REST API communication
- Frontend + Backend separation

---

## Folder Structure

```text
stage2/
  backend/
    main.py
    requirements.txt
  frontend/
    src/
      components/
      pages/
      services/
      data/
    package.json
    vite.config.js
```

## Demo Login Information

The login page supports role-based demo access.

### User Login

Use the **Login as User** button.

User role can:

- Browse books
- Search books
- View book details
- Borrow books
- Return books
- View loans
- Add books to favorites

### Admin Login

Use the **Login as Admin** button.

Admin role can:

- Open Admin Dashboard
- View system statistics
- Manage book-related actions
- Monitor book and loan data

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieves all books |
| GET | `/books/{book_id}` | Retrieves details of a selected book |
| POST | `/borrow/{book_id}` | Borrows a selected book |
| POST | `/return/{book_id}` | Returns a borrowed book |

Backend base URL:

```text
http://127.0.0.1:8000
```

# How to Run the Project

You need to run backend and frontend in two separate terminals.

---

# Windows Setup

## 1. Clone the repository

```powershell
git clone https://github.com/zeynepg22/book-library-system.git
cd book-library-system
```

## 2. Run Backend

```powershell
cd stage2/backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

Backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

## 3. Run Frontend

Open a new terminal:

```powershell
cd stage2/frontend
npm install
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

# macOS Setup

## 1. Clone the repository

```bash
git clone https://github.com/zeynepg22/book-library-system.git
cd book-library-system
```

## 2. Run Backend

```bash
cd stage2/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 -m uvicorn main:app --reload
```

Backend will run at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

## 3. Run Frontend

Open a new terminal:

```bash
cd stage2/frontend
npm install
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

# Frontend Features

- Modern soft-colored dashboard UI
- Login page with User/Admin role selection
- Browse Books page
- Search and category filter
- Book Details page
- Borrow Book action
- My Loans page
- Return Book action
- Favorites page
- Admin Dashboard page
- Responsive layout structure

---

# Backend Features

- FastAPI backend
- CORS support for frontend-backend communication
- Book list endpoint
- Book detail endpoint
- Borrow book endpoint
- Return book endpoint
- In-memory data structure for Stage 2 demonstration

---

# Frontend and Backend Integration

The frontend communicates with the backend using REST API calls.

Example API service file:

```js
const API_BASE_URL = "http://127.0.0.1:8000";

export async function getBooks() {
  const response = await fetch(`${API_BASE_URL}/books`);
  return response.json();
}
```

The frontend uses API functions to retrieve books, view book details, borrow books, and return borrowed books.

---

# Notes

- Backend must be running before testing API-connected frontend features.
- Frontend and backend should be run in separate terminals.
- If ports are busy, stop the previous server and restart the project.
- Do not upload `node_modules` or virtual environment folders to GitHub.