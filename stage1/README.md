# Stage 1 – Architecture Design & Initial Implementation

## Overview
This stage focuses on the initial design of the Book Library System using the 4+1 architectural model.

## Contents
* System Selection
* Use Case View
* Logical View
* Partial Backend Implementation

---

## User Interface Screenshots
The following links point to the UI design and initial implementation screenshots:

- **Login Page Interface:** [./screenshots/login.png](./screenshots/login.png)
- **Book Browsing Panel:** [./screenshots/browse_book.png](./screenshots/browse_book.png)
- **Loan Tracking View:** [./screenshots/my_loan.png](./screenshots/my_loan.png)
- **Detailed Book View:** [./screenshots/detail.png](./screenshots/detail.png)
- **Admin Dashboard:** [./screenshots/admin_dashboard.png](./screenshots/admin_dashboard.png)

---

## Backend
The initial API structure includes the following endpoints:
* `GET /books` - Retrieves the list of available books.
* `POST /borrow/{book_id}` - Handles book borrowing requests.

## Frontend
Basic UI screens are implemented to demonstrate system functionality:
* **Framework:** React.
* **Key Features:** Role-based login (User/Admin), interactive book cards, and a dashboard for managing loans.

