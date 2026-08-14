function SkillCard({ title, items }) {
  return (
    <article className="smartcv-result-card smartcv-skills-card">
      <p className="eyebrow">{title}</p>
      <h4 className="smartcv-card-title">Skills identified</h4>
      <div className="smartcv-skill-list">
        {items?.length ? items.map((item, index) => (
          <span key={`${item}-${index}`} className="smartcv-skill-tag">{item}</span>
        )) : <p className="smartcv-empty-state">No items found.</p>}
      </div>
    </article>
  )
}

export default SkillCard
