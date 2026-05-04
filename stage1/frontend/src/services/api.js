const API_BASE_URL = "http://127.0.0.1:8000";

export async function getBooks() {
  const response = await fetch(`${API_BASE_URL}/books`);
  return response.json();
}

export async function getBook(bookId) {
  const response = await fetch(`${API_BASE_URL}/books/${bookId}`);
  return response.json();
}

export async function borrowBook(bookId) {
  const response = await fetch(`${API_BASE_URL}/borrow/${bookId}`, {
    method: "POST",
  });
  return response.json();
}

export async function returnBook(bookId) {
  const response = await fetch(`${API_BASE_URL}/return/${bookId}`, {
    method: "POST",
  });
  return response.json();
}
