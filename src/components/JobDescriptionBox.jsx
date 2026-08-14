function JobDescriptionBox({ value, onChange }) {
  return (
    <div>
      <textarea
        rows={7}
        value={value}
        onChange={onChange}
        placeholder="Paste the job description here to compare it against your resume..."
        className="smartcv-textarea"
      />
    </div>
  )
}

export default JobDescriptionBox;
