function JobDescriptionBox({ value, onChange }) {
  return (
    <div>
      <textarea
        rows={6}
        value={value}
        onChange={onChange}
        placeholder="Paste the job description here to compare it against your resume..."
        className="min-h-[12rem] w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  )
}

export default JobDescriptionBox;
