import { useState } from 'react'
import { HiCheckCircle } from 'react-icons/hi'

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

      <div className="smartcv-upload-controls">
        <label className="smartcv-file-picker">
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
          className="smartcv-upload-button"
        >
          {loading ? 'Analyzing...' : 'Upload Resume'}
        </button>
      </div>
    </div>
  )
}

export default UploadBox;
