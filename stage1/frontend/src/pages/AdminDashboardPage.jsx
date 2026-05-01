function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
              Admin Panel
            </p>
            <h1 className="mt-2 text-4xl font-bold text-slate-800">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-slate-500">
              Manage books and monitor basic library data
            </p>
          </div>

          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
            <span className="text-sm font-medium text-slate-600">
              Logged in as Admin
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Books</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800">320</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Users</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800">128</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Active Loans</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800">45</h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Overdue Loans</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800">7</h2>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800">
              Recent Activity
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• New book added: The Great Gatsby</li>
              <li>• Book returned: 1984</li>
              <li>• Loan created: The Hobbit</li>
              <li>• Book updated: To Kill a Mockingbird</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800">
              Quick Actions
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                Add New Book
              </button>
              <button className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                Manage Books
              </button>
              <button className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                View Loans
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;