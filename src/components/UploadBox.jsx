import { useState } from 'react'
import { HiOutlineUpload, HiCheckCircle } from 'react-icons/hi'

function UploadBox({ onUpload, loading }) {
  const [file, setFile] = useState(null)

  const handleClick = () => {
    if (!file) {
      alert('Please select a PDF resume')
      return
    }

    onUpload(file)
  }

  return (
    <div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex-1 cursor-pointer rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100">
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
          {file ? (
            <span className="inline-flex items-center gap-2 text-slate-900">
              <HiCheckCircle className="h-5 w-5 text-emerald-500" />
              {file.name}
            </span>
          ) : (
            'Choose file…'
          )}
        </label>

        <button
          onClick={handleClick}
          disabled={loading}
          className="inline-flex min-w-[180px] items-center justify-center rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? 'Analyzing...' : 'Upload Resume'}
        </button>
      </div>
    </div>
  )
}

export default UploadBox;
