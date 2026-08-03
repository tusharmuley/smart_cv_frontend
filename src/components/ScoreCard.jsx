function ScoreCard({ score }) {
  return (
    <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
      <p className="text-sm uppercase tracking-[0.24em] text-indigo-600">ATS score</p>
      <div className="mt-6 flex items-end gap-4">
        <span className="text-5xl font-bold text-slate-900">{score ?? 0}</span>
        <span className="text-sm text-slate-500">/100</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        Your resume score is based on the job description and shows how well your resume is aligned.
      </p>
    </article>
  )
}

export default ScoreCard;
