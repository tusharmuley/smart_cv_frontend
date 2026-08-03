function SkillCard({ title, items }) {
  return (
    <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
      <p className="text-sm uppercase tracking-[0.24em] text-indigo-600">{title}</p>
      <div className="mt-4 space-y-2">
        {items?.length ? (
          items.map((item, index) => (
            <div key={index} className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {item}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">No items found.</p>
        )}
      </div>
    </article>
  )
}

export default SkillCard;
