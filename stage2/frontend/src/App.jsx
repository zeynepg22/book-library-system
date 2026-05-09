import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import BookListPage from "./pages/BookListPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import MyLoansPage from "./pages/MyLoansPage";
import FavoritesPage from "./pages/FavoritesPage";
import DashboardPage from "./pages/DashboardPage";

function ProtectedAdminRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <Navigate to="/books" replace />;
  }

  return children;
}

function ProtectedUserRoute({ children }) {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedUserRoute>
              <DashboardPage />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/books"
          element={
            <ProtectedUserRoute>
              <BookListPage />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/book-details/:id"
          element={
            <ProtectedUserRoute>
              <BookDetailsPage />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/my-loans"
          element={
            <ProtectedUserRoute>
              <MyLoansPage />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedUserRoute>
              <FavoritesPage />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;