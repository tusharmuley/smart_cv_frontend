function Navbar() {
  return (
    <header className="mb-8 rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm shadow-slate-200/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">SmartCV</p>
          <h1 className="text-2xl font-semibold text-slate-900">Resume AI Assistant</h1>
        </div>
        <p className="text-sm text-slate-600">Simple resume insights with clean results.</p>
      </div>
    </header>
  )
}

export default Navbar;
