function InterviewCard({ questions }) {
  return (
    <article className="smartcv-result-card smartcv-list-card">
      <p className="eyebrow">Interview prep</p>
      <h2 className="smartcv-card-title">Potential questions</h2>
      <ol className="smartcv-result-list">
        {questions?.length ? questions.map((question, index) => (
          <li key={`${question}-${index}`}><span className="smartcv-list-index">Q{index + 1}</span><span>{question}</span></li>
        )) : <li className="smartcv-empty-state">No interview questions generated yet.</li>}
      </ol>
    </article>
  )
}

export default InterviewCard
