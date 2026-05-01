import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Login Card */}
        <div className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                <span className="text-3xl text-blue-600">📘</span>
              </div>

              <h1 className="text-3xl font-bold text-slate-800">
                Book Library System
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Select your role to continue as a User or Admin
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email or Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your email or username"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>

              <div className="space-y-3">
                <button
                    type="button"
                    onClick={() => navigate("/books")}
                    className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    Login as User
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/admin-dashboard")}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                    Login as Admin
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
                Select a role above to continue to the system dashboard.
            </p>
          </div>
        </div>

        {/* Right Side - Visual Panel */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 px-8">
          <div className="max-w-lg text-white">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-200">
              Digital Library Experience
            </p>
            <h2 className="text-4xl font-bold leading-tight">
              Manage books, track loans, and simplify library operations.
            </h2>
            <p className="mt-6 text-base leading-7 text-slate-300">
              A modern and user-friendly interface for students and
              administrators to access books, manage borrowing, and keep the
              library organized.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">500+</p>
                <p className="mt-1 text-sm text-slate-300">Books Available</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">120+</p>
                <p className="mt-1 text-sm text-slate-300">Active Users</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">45</p>
                <p className="mt-1 text-sm text-slate-300">Current Loans</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">24/7</p>
                <p className="mt-1 text-sm text-slate-300">Easy Access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;