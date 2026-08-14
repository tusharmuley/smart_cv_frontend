function ScoreCard({ score }) {
  const normalizedScore = Math.min(Math.max(score ?? 0, 0), 100)

  return (
    <article className="smartcv-result-card smartcv-score-card">
      <p className="eyebrow">ATS score</p>
      <div className="smartcv-score-value"><span>{normalizedScore}</span><small>/100</small></div>
      <div className="smartcv-score-track" aria-label={`ATS score: ${normalizedScore} out of 100`}>
        <div className="smartcv-score-progress" style={{ width: `${normalizedScore}%` }} />
      </div>
      <p className="smartcv-score-note">Strong match. A few keyword tweaks would push this into the 90s.</p>
    </article>
  )
}

export default ScoreCard
