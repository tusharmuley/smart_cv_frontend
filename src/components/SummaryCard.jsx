function SummaryCard({ text }) {
  return (
    <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
      <p className="text-sm uppercase tracking-[0.24em] text-indigo-600">Summary</p>
      <h2 className="mt-4 text-xl font-semibold text-slate-900">What AI found</h2>
      <p className="mt-4 leading-7 text-slate-600">{text ?? 'No summary available yet.'}</p>
    </article>
  )
}

export default SummaryCard;
