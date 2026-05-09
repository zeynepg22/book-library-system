import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getOrCreateUserId(email) {
  const normalizedEmail = email.trim().toLowerCase();

  const savedUsers = JSON.parse(localStorage.getItem("libraryUsers")) || {};

  if (savedUsers[normalizedEmail]) {
    return savedUsers[normalizedEmail];
  }

  const newUserId = Date.now();

  const updatedUsers = {
    ...savedUsers,
    [normalizedEmail]: newUserId,
  };

  localStorage.setItem("libraryUsers", JSON.stringify(updatedUsers));

  return newUserId;
}


function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginAsUser(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const userId = getOrCreateUserId(normalizedEmail);

    localStorage.setItem("role", "user");
    localStorage.setItem("userId", userId);
    localStorage.setItem("userEmail", normalizedEmail);

    navigate("/books");
  }

  function loginAsAdmin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    localStorage.setItem("role", "admin");
    localStorage.setItem("userEmail", email.trim().toLowerCase());

    navigate("/admin-dashboard");
  }

  return (
    <div className="grid h-screen grid-cols-2 overflow-hidden bg-slate-50">
      <div className="flex items-center justify-center bg-[#f4f8ff] px-10">
        <div className="w-full max-w-sm rounded-[28px] bg-white p-8 shadow-lg shadow-blue-100/60">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              📖
            </div>

            <h1 className="text-2xl font-black text-slate-900">
              Book Library System
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Welcome back! Please sign in to continue
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Email or Username
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100"
              />
            </div>

            <button
              onClick={loginAsUser}
              className="w-full rounded-2xl bg-pink-400 py-3 text-sm font-bold text-white shadow-lg shadow-pink-100 transition hover:bg-pink-500"
            >
              Login as User
            </button>

            <button
              onClick={loginAsAdmin}
              className="w-full rounded-2xl border border-blue-200 bg-white py-3 text-sm font-bold text-blue-500 transition hover:bg-blue-50"
            >
              Login as Admin
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-400">
            Demo account • Any password works
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#eef7ff] via-[#fff7fb] to-[#ffeef7] px-12">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-44 w-44 rounded-full bg-pink-200/50 blur-3xl" />

        <div className="absolute left-14 top-16 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-md">
          📚
        </div>

        <div className="absolute right-16 top-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-md">
          🔍
        </div>

        <div className="absolute bottom-20 left-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-md">
          📝
        </div>

        <div className="absolute bottom-24 right-24 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-md">
          ⭐
        </div>

        <div className="relative z-10 max-w-xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-pink-400">
            Digital Library Experience
          </p>

          <h2 className="text-5xl font-black leading-tight text-slate-900">
            Manage books,
            <span className="block text-pink-400">track loans,</span>
            and simplify
            <span className="block text-blue-400">library operations.</span>
          </h2>

          <p className="mt-5 max-w-lg text-base leading-7 text-slate-500">
            A modern and user-friendly interface for students and administrators
            to search, borrow, return, and manage library resources.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white/80 p-5 shadow-md shadow-blue-100">
              <div className="mb-2 text-2xl">📘</div>
              <h3 className="text-3xl font-black text-slate-900">500+</h3>
              <p className="text-sm text-slate-500">Books Available</p>
            </div>

            <div className="rounded-3xl bg-white/80 p-5 shadow-md shadow-pink-100">
              <div className="mb-2 text-2xl">👥</div>
              <h3 className="text-3xl font-black text-slate-900">120+</h3>
              <p className="text-sm text-slate-500">Active Users</p>
            </div>

            <div className="rounded-3xl bg-white/80 p-5 shadow-md shadow-blue-100">
              <div className="mb-2 text-2xl">👜</div>
              <h3 className="text-3xl font-black text-slate-900">45</h3>
              <p className="text-sm text-slate-500">Current Loans</p>
            </div>

            <div className="rounded-3xl bg-white/80 p-5 shadow-md shadow-pink-100">
              <div className="mb-2 text-2xl">⚡</div>
              <h3 className="text-3xl font-black text-slate-900">24/7</h3>
              <p className="text-sm text-slate-500">Easy Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;