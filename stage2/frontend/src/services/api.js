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
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== "All") {
      query.append(key, value);
    }
  });

  const queryString = query.toString();
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

export const userAPI = {
  getAll: () => request("/users/"),

  create: (user) =>
    request("/users/", {
      method: "POST",
      body: JSON.stringify(user),
    }),
};

export const authAPI = {
  login: async (email, password) => {
    const response = await fetch("http://127.0.0.1:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.detail || "Invalid email or password");
    }

    return response.json();
  },
};