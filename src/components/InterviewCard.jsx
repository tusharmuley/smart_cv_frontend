function InterviewCard({ questions }) {
  return (
    <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
      <p className="text-sm uppercase tracking-[0.24em] text-indigo-600">Interview prep</p>
      <h2 className="mt-4 text-xl font-semibold text-slate-900">Potential questions</h2>
      <ol className="mt-4 space-y-3 text-sm text-slate-700">
        {questions?.length ? (
          questions.map((question, index) => (
            <li key={index} className="rounded-3xl bg-slate-50 p-4">
              <span className="font-semibold text-indigo-700">Q{index + 1}.</span> {question}
            </li>
          ))
        ) : (
          <li className="text-slate-500">No interview questions generated yet.</li>
        )}
      </ol>
    </article>
  )
}

export default InterviewCard;
