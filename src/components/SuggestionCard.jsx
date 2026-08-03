function SuggestionCard({ suggestions }) {
  return (
    <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
      <p className="text-sm uppercase tracking-[0.24em] text-indigo-600">Suggestions</p>
      <h2 className="mt-4 text-xl font-semibold text-slate-900">Improve your resume</h2>
      <ul className="mt-4 space-y-3 text-sm text-slate-700">
        {suggestions?.length ? (
          suggestions.map((item, index) => (
            <li key={index} className="rounded-3xl bg-slate-50 p-4">
              {item}
            </li>
          ))
        ) : (
          <li className="text-slate-500">No suggestions available.</li>
        )}
      </ul>
    </article>
  )
}

export default SuggestionCard;
