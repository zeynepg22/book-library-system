import Sidebar from "../components/Sidebar";
import BookCover from "../components/BookCover";
import mockLoans from "../data/mockLoans";

function MyLoansPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">My Loans</h1>
          <p className="mt-2 text-slate-500">
            Books you have currently borrowed
          </p>
        </div>

        <div className="space-y-6">
          {mockLoans.map((loan) => (
            <div
              key={loan.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:flex-row"
            >
              <div className="md:w-64">
                <BookCover book={loan} />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {loan.title}
                  </h2>
                  <p className="mt-1 text-slate-500">{loan.author}</p>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p>
                      <strong>Borrowed on:</strong> {loan.borrowedDate}
                    </p>
                    <p>
                      <strong>Due date:</strong> {loan.dueDate}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700">
                    Return Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyLoansPage;