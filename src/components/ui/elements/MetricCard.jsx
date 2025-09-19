
function MetricCard({ label, value, change, icon, bg, padding=6 }) {
  return (
    <div className={`rounded-xl border-gray-300 bg-white px-6 shadow-sm border flex justify-between items-center w-full h-full py-${padding}`}>
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{change}</p>
      </div>
      <div className={`rounded-lg ${bg} flex items-center justify-center w-12 h-12`}>
        {icon}
      </div>
    </div>
  );
}

export default MetricCard;