import { useRef, useEffect } from 'react'
import { HiCheckCircle } from 'react-icons/hi'
import { HiX } from 'react-icons/hi'

function UploadBox({ file, onFileSelect, onRemove, uploaded }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (!uploaded && !file) {
      if (inputRef.current) inputRef.current.value = ''
    }
  }, [uploaded, file])

  const handleRemove = () => {
    if (inputRef.current) inputRef.current.value = ''
    onRemove?.()
  }

  return (
    <div>
      <div className="smartcv-upload-controls">
        <label className="smartcv-file-picker">
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(event) => onFileSelect?.(event.target.files?.[0] ?? null)}
            disabled={uploaded}
          />
          {file ? (
            <span className="file-label text-slate-900">
              <HiCheckCircle className="h-5 w-5 text-emerald-500" />
              {file.name}
            </span>
          ) : (
            <span className="file-label">
              {uploaded ? <><HiCheckCircle className="h-5 w-5 text-emerald-500" />Uploaded</> : 'Choose file…'}
            </span>
          )}
        </label>

        {file && (
          <button
            onClick={handleRemove}
            className="smartcv-rm-button"
            aria-label="Remove selected resume"
          >
            <HiX className="h-5 w-5 text-slate-700" />
          </button>
        )}
      </div>
    </div>
  )
}

export default UploadBox;
