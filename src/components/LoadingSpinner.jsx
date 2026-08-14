function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-xl bg-slate-50 px-6 py-4 text-slate-700 shadow-sm ring-1 ring-slate-200">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />
      <span className="text-sm font-semibold text-slate-900">{label}</span>
    </div>
  )
}

export default LoadingSpinner;
