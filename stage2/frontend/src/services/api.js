const API_BASE_URL = "http://127.0.0.1:8000";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.detail || "API request failed");
  }

  return response.json();
}

function buildQuery(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== "All") {
      searchParams.append(key, value);
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : "";
}

export const bookAPI = {
  getAll: (params = {}) => request(`/books/${buildQuery(params)}`),

  getById: (bookId) => request(`/books/${bookId}`),

  create: (book) =>
    request("/books/", {
      method: "POST",
      body: JSON.stringify(book),
    }),

  update: (bookId, book) =>
    request(`/books/${bookId}`, {
      method: "PUT",
      body: JSON.stringify(book),
    }),

  remove: (bookId) =>
    request(`/books/${bookId}`, {
      method: "DELETE",
    }),
};

export const loanAPI = {
  borrow: (bookId, userId = 1) =>
    request(`/borrow/${bookId}?user_id=${userId}`, {
      method: "POST",
    }),

  returnBook: (bookId) =>
    request(`/return/${bookId}`, {
      method: "POST",
    }),

  getAll: () => request("/loans"),

  getUserLoans: (userId = 1) => request(`/users/${userId}/loans`),
};