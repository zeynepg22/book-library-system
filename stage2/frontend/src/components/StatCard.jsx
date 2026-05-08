function StatCard({ title, value, icon, color }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${color}`}
        >
          {icon}
        </div>
      </div>

      <h3 className="text-sm font-medium text-slate-500">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

export default StatCard;