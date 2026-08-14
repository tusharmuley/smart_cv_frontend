function SuggestionCard({ suggestions }) {
  return (
    <article className="smartcv-result-card smartcv-list-card">
      <p className="eyebrow">Suggestions</p>
      <h2 className="smartcv-card-title">Improve your resume</h2>
      <ul className="smartcv-result-list">
        {suggestions?.length ? suggestions.map((item, index) => (
          <li key={`${item}-${index}`}><span className="smartcv-list-index">{index + 1}</span><span>{item}</span></li>
        )) : <li className="smartcv-empty-state">No suggestions available.</li>}
      </ul>
    </article>
  )
}

export default SuggestionCard
