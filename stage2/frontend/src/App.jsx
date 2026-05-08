import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BookListPage from "./pages/BookListPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import MyLoansPage from "./pages/MyLoansPage";
import FavoritesPage from "./pages/FavoritesPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/books" element={<BookListPage />} />
        <Route path="/book-details/:id" element={<BookDetailsPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/my-loans" element={<MyLoansPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;