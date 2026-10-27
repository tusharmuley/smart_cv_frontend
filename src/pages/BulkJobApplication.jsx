import { useMemo, useState } from 'react'
import apiClient from '../api/axios'

const MAX_RECIPIENTS = 50
const MAX_BODY_LENGTH = 10000

const DEFAULT_SUBJECT =
  'Application for Python Backend / Full Stack Developer – Tushar Muley'

const DEFAULT_BODY = `Dear Hiring Team,

I hope you are doing well.

I am writing to express my interest in suitable Python Backend Developer, Full Stack Developer, or Generative AI Engineer opportunities at your organization.

My technical interests include Python, FastAPI, Django, REST APIs, React, PostgreSQL, and Generative AI applications.

Please find my resume attached for your review. I would appreciate the opportunity to discuss how my skills and experience could contribute to your team.

Thank you for your time and consideration.

Best regards,
Tushar Muley`

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parseManualEmails(value) {
  const entries = value
    .split(/[\s,;]+/)
    .map((email) => email.trim())
    .filter(Boolean)

  return [...new Set(entries.map((email) => email.toLowerCase()))]
}

function formatError(error) {
  const detail = error?.response?.data?.detail

  if (typeof detail === 'string') return detail
  if (detail?.message) return detail.message

  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg || 'Invalid input').join(', ')
  }

  return error?.message || 'Something went wrong. Please try again.'
}

function FieldLabel({ children, htmlFor, optional = false }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-semibold text-slate-700"
    >
      {children}
      {optional && (
        <span className="ml-1 font-normal text-slate-400">(optional)</span>
      )}
    </label>
  )
}

function Card({ children, className = '' }) {
  return (
    <section className={`smartcv-bulk-card ${className}`}>
      {children}
    </section>
  )
}

const inputClass =
  'smartcv-form-input w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-slate-50'

const primaryButtonClass =
  'smartcv-primary-btn inline-flex w-full items-center justify-center rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-50'
 
const secondaryButtonClass =
  'smartcv-secondary-btn inline-flex w-full items-center justify-center rounded-xl border border-violet-200 bg-violet-50 p-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 focus:outline-none focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-50'

function BulkJobApplication() {
  const [recipientFile, setRecipientFile] = useState(null)
  const [manualEmails, setManualEmails] = useState('')
  const [subject, setSubject] = useState(DEFAULT_SUBJECT)
  const [body, setBody] = useState(DEFAULT_BODY)
  const [resume, setResume] = useState(null)
  const [testRecipient, setTestRecipient] = useState('')
  const [sectionsOpen, setSectionsOpen] = useState({
    recipients: true,
    compose: false,
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [results, setResults] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const parsedManualEmails = useMemo(
    () => parseManualEmails(manualEmails),
    [manualEmails],
  )

  const invalidManualEmails = useMemo(
    () => parsedManualEmails.filter((email) => !EMAIL_REGEX.test(email)),
    [parsedManualEmails],
  )

  const selectedRecipientCount = recipientFile
    ? null
    : parsedManualEmails.length

  const recipientsReady = recipientFile
    ? true
    : parsedManualEmails.length > 0 &&
      invalidManualEmails.length === 0 &&
      parsedManualEmails.length <= MAX_RECIPIENTS

  const canSend =
    !loading &&
    recipientsReady &&
    subject.trim().length > 0 &&
    body.trim().length > 0 &&
    body.length <= MAX_BODY_LENGTH &&
    resume !== null

  function handleRecipientFileChange(event) {
    const file = event.target.files?.[0] || null

    setRecipientFile(file)
    setManualEmails('')
    setResults([])
    setStatus(null)
  }

  function handleDropFile(event) {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer?.files?.[0] || null
    if (!file) return

    setRecipientFile(file)
    setManualEmails('')
    setResults([])
    setStatus(null)
  }

  function handleManualEmailsChange(event) {
    setManualEmails(event.target.value)
    setRecipientFile(null)
    setResults([])
    setStatus(null)
  }

  function handleResumeChange(event) {
    const file = event.target.files?.[0] || null

    if (file && !file.name.toLowerCase().endsWith('.pdf')) {
      setResume(null)
      setStatus({
        type: 'error',
        message: 'Please select a PDF resume.',
      })
      event.target.value = ''
      return
    }

    setResume(file)
    setStatus(null)
  }

  function validateCommonFields() {
    if (!subject.trim()) {
      setStatus({ type: 'error', message: 'Please enter an email subject.' })
      return false
    }

    if (!body.trim()) {
      setStatus({ type: 'error', message: 'Please enter an email body.' })
      return false
    }

    if (body.length > MAX_BODY_LENGTH) {
      setStatus({ type: 'error', message: 'Email body exceeds 10,000 characters.' })
      return false
    }

    if (!resume) {
      setStatus({ type: 'error', message: 'Please attach your PDF resume.' })
      return false
    }

    if (resume.size === 0) {
      setStatus({ type: 'error', message: 'Your resume PDF is empty.' })
      return false
    }

    if (resume.size > 5 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'Resume must be 5 MB or smaller.' })
      return false
    }

    return true
  }

  function validateRecipients() {
    if (recipientFile) {
      const extension = recipientFile.name.split('.').pop()?.toLowerCase()

      if (!['csv', 'xlsx'].includes(extension)) {
        setStatus({
          type: 'error',
          message: 'Please upload a CSV or XLSX recipient file.',
        })
        return false
      }

      if (recipientFile.size > 2 * 1024 * 1024) {
        setStatus({
          type: 'error',
          message: 'Recipient file must be 2 MB or smaller.',
        })
        return false
      }

      return true
    }

    if (parsedManualEmails.length === 0) {
      setStatus({
        type: 'error',
        message: 'Upload a recipient file or enter at least one email address.',
      })
      return false
    }

    if (invalidManualEmails.length > 0) {
      setStatus({
        type: 'error',
        message: `Invalid email address(es): ${invalidManualEmails.join(', ')}`,
      })
      return false
    }

    if (parsedManualEmails.length > MAX_RECIPIENTS) {
      setStatus({
        type: 'error',
        message: `You can send to a maximum of ${MAX_RECIPIENTS} recipients per request.`,
      })
      return false
    }

    return true
  }

  function buildFormData(includeRecipients = true) {
    const formData = new FormData()

    formData.append('subject', subject.trim())
    formData.append('body', body)
    formData.append('resume', resume)

    if (includeRecipients) {
      if (recipientFile) {
        formData.append('recipients_file', recipientFile)
      } else {
        const csvContent = [
          'email',
          ...parsedManualEmails,
        ].join('\r\n')

        const csvFile = new File(
          [csvContent],
          'manual_recipients.csv',
          { type: 'text/csv' },
        )

        formData.append('recipients_file', csvFile)
      }
    }

    return formData
  }

  async function handleTestEmail() {
    setStatus(null)
    setResults([])

    if (!testRecipient.trim() || !EMAIL_REGEX.test(testRecipient.trim())) {
      setStatus({
        type: 'error',
        message: 'Enter a valid test recipient email address.',
      })
      return
    }

    if (!validateCommonFields()) return

    setLoading(true)

    try {
      const formData = buildFormData(false)

      formData.append('recipient', testRecipient.trim())

      const response = await apiClient.post(
        '/email/test-send',
        formData,
      )

      setStatus({
        type: 'success',
        message:
          response.data?.message || 'Test email sent successfully.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: formatError(error),
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleBulkSend() {
    setStatus(null)
    setResults([])

    if (!validateRecipients() || !validateCommonFields()) return

    const confirmed = window.confirm(
      `You are about to send individual application emails to ${
        recipientFile
          ? 'the recipients in your uploaded file'
          : `${parsedManualEmails.length} recipient(s)`
      }.\n\nPlease confirm that the recipient list, email content, and resume are correct.`,
    )

    if (!confirmed) return

    setLoading(true)

    try {
      const formData = buildFormData(true)

      const response = await apiClient.post(
        '/bulk-email/send',
        formData,
      )

      const data = response.data

      setResults(data.results || [])

      setStatus({
        type: data.failed > 0 ? 'warning' : 'success',
        message:
          data.message ||
          `Completed: ${data.sent ?? 0} sent, ${data.failed ?? 0} failed.`,
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: formatError(error),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="smartcv-bulk-shell">
      <div className="smartcv-bulk-heading">
        <div className="smartcv-bulk-eyebrow">SmartCV</div>
        <h1 className="smartcv-bulk-title">Bulk Job Applications</h1>
        <p className="smartcv-bulk-subtitle">
          Upload your recipient list, compose your application email, attach
          your resume, and review everything before sending.
        </p>
      </div>

      {/* Status message */}
      {status && (
        <div
          role="status"
          aria-live="polite"
          className={`smartcv-bulk-status mb-6 rounded-xl border px-4 py-3 text-sm leading-6 ${
            status.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : status.type === 'warning'
                ? 'border-amber-200 bg-amber-50 text-amber-800'
                : 'border-rose-200 bg-rose-50 text-rose-800'
          }`}
        >
          {status.message}
        </div>
      )}

      <div className="smartcv-bulk-grid">
        {/* Left: application form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recipients */}
          <Card className="smartcv-bulk-form-card">
            <div className="smartcv-bulk-step-header smartcv-bulk-step-header-toggle">
              <div className="smartcv-bulk-step-badge">01</div>

              <div className="smartcv-bulk-step-title-wrap">
                <h2 className="smartcv-bulk-section-title">Recipients</h2>
                <p className="smartcv-bulk-section-copy">
                  Upload a CSV or Excel file, or enter addresses manually.
                  Maximum 50 unique recipients per request.
                </p>
              </div>

              <button
                type="button"
                className="smartcv-bulk-toggle"
                onClick={() =>
                  setSectionsOpen((prev) => ({ ...prev, recipients: !prev.recipients }))
                }
                aria-label={sectionsOpen.recipients ? 'Collapse recipients' : 'Expand recipients'}
              >
                {sectionsOpen.recipients ? '−' : '+'}
              </button>
            </div>

            {sectionsOpen.recipients && (
              <>
                <label
                  htmlFor="recipient-file"
                  className={`flex w-full items-center justify-between gap-5 rounded-[20px] leading-[2.5] border-2 border-dashed border-sky-300 p-1 bg-sky-50/30 px-6 py-5 transition-all duration-150 ease-out ${
                    isDragging
                      ? 'border-sky-500 bg-sky-100/70 shadow-[0_0_0_4px_rgba(14,165,233,0.08)]'
                      : 'hover:border-sky-500 hover:bg-sky-50/50'
                  }`}
                  onDragOver={(event) => {
                    event.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={(event) => {
                    event.preventDefault()
                    setIsDragging(false)
                  }}
                  onDrop={handleDropFile}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl text-sky-500 shadow-sm">
                      ⬆
                    </span>

                    <div className="flex min-w-0 flex-1 flex-col items-start text-left">
                      <span className="block text-[15px] font-extrabold tracking-tight text-slate-800">
                        {recipientFile ? recipientFile.name : 'Choose recipient file'}
                      </span>

                      <span className="mt-1 block text-[11px] font-medium text-slate-500">
                        CSV or XLSX · Email column required · Maximum 2 MB
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex min-w-[110px] items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-base font-bold text-white shadow-[0_12px_24px_-16px_rgba(14,165,233,0.9)]">
                    Browse
                  </span>

                  <input
                    id="recipient-file"
                    type="file"
                    accept=".csv,.xlsx"
                    onChange={handleRecipientFileChange}
                    disabled={loading}
                    className="sr-only"
                  />
                </label>

                {recipientFile && (
                  <button
                    type="button"
                    onClick={() => setRecipientFile(null)}
                    disabled={loading}
                    className="mt-3 text-sm font-medium text-rose-600 hover:text-rose-700"
                  >
                    Remove file
                  </button>
                )}

                <div className="smartcv-bulk-divider">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Or enter manually
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <FieldLabel htmlFor="manual-emails">
                  Email addresses
                </FieldLabel>

                <textarea
                  id="manual-emails"
                  value={manualEmails}
                  onChange={handleManualEmailsChange}
                  disabled={loading}
                  rows={4}
                  placeholder={'hr@company.com\ncareers@example.com'}
                  className={`${inputClass} resize-y`}
                />

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-500">
                    Separate addresses with commas, spaces, or new lines.
                  </span>

                  {!recipientFile && parsedManualEmails.length > 0 && (
                    <span
                      className={
                        invalidManualEmails.length > 0 ||
                        parsedManualEmails.length > MAX_RECIPIENTS
                          ? 'font-semibold text-rose-600'
                          : 'font-semibold text-violet-700'
                      }
                    >
                      {parsedManualEmails.length}/{MAX_RECIPIENTS} recipients
                    </span>
                  )}
                </div>

                {!recipientFile && invalidManualEmails.length > 0 && (
                  <p className="mt-3 text-sm text-rose-600">
                    Please correct invalid email addresses before sending.
                  </p>
                )}

                {recipientFile && (
                  <p className="mt-3 text-sm text-violet-700">
                    Recipient file selected. Manual addresses are not being used.
                  </p>
                )}
              </>
            )}
          </Card>

          <Card className="smartcv-bulk-form-card">
            <div className="smartcv-bulk-step-header smartcv-bulk-step-header-toggle">
              <div className="smartcv-bulk-step-badge">02</div>

              <div className="smartcv-bulk-step-title-wrap">
                <h2 className="smartcv-bulk-section-title">Compose email</h2>
                <p className="smartcv-bulk-section-copy">
                  Write the message that each recipient will receive.
                </p>
              </div>

              <button
                type="button"
                className="smartcv-bulk-toggle"
                onClick={() =>
                  setSectionsOpen((prev) => ({ ...prev, compose: !prev.compose }))
                }
                aria-label={sectionsOpen.compose ? 'Collapse email composer' : 'Expand email composer'}
              >
                {sectionsOpen.compose ? '−' : '+'}
              </button>
            </div>

            {sectionsOpen.compose && (
              <>
                <div className="mb-5">
                  <FieldLabel htmlFor="email-subject">Subject</FieldLabel>

                  <input
                    id="email-subject"
                    type="text"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    disabled={loading}
                    maxLength={200}
                    placeholder="Application for Python Backend Developer"
                    className={inputClass}
                  />

                  <p className="mt-1.5 text-right text-xs text-slate-400">
                    {subject.length}/200
                  </p>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <FieldLabel htmlFor="email-body">Email body</FieldLabel>

                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      className="mb-2 text-xs font-semibold text-violet-700 hover:text-violet-900"
                    >
                      {showPreview ? 'Edit email' : 'Preview email'}
                    </button>
                  </div>

                  {showPreview ? (
                    <div className="min-h-72 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                      {body || 'Your email preview will appear here.'}
                    </div>
                  ) : (
                    <textarea
                      id="email-body"
                      value={body}
                      onChange={(event) => setBody(event.target.value)}
                      disabled={loading}
                      rows={14}
                      maxLength={MAX_BODY_LENGTH}
                      placeholder="Write your application email..."
                      className={`${inputClass} resize-y leading-7`}
                    />
                  )}

                  <p className="mt-2 text-right text-xs text-slate-400">
                    {body.length}/{MAX_BODY_LENGTH} characters
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <FieldLabel htmlFor="resume-file">Resume attachment</FieldLabel>

                  <label
                    htmlFor="resume-file"
                    className="smartcv-bulk-file-box"
                  >
                    <div className="smartcv-bulk-file-icon">📄</div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {resume ? resume.name : 'Choose your resume PDF'}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        PDF format · Maximum 5 MB
                      </p>
                    </div>

                    <span className="smartcv-bulk-file-button">Browse</span>

                    <input
                      id="resume-file"
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleResumeChange}
                      disabled={loading}
                      className="sr-only"
                    />
                  </label>

                  {resume && (
                    <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                      <span className="text-emerald-700">
                        Resume selected · {(resume.size / 1024).toFixed(0)} KB
                      </span>

                      <button
                        type="button"
                        onClick={() => setResume(null)}
                        disabled={loading}
                        className="font-semibold text-rose-600 hover:text-rose-700"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </Card>
        </div>

        <aside className="smartcv-bulk-sidebar">
          <Card className="smartcv-bulk-send-card">
            <div className="mb-4 flex items-center gap-3">
              <div className="smartcv-bulk-send-icon">
                ✉️
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Ready to send?
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Test first, then send applications.
                </p>
              </div>
            </div>

            <p className="mb-6 text-sm leading-6 text-slate-600">
              Send a test email to yourself first. Check the formatting and
              attached resume before sending applications to recruiters.
            </p>

            <div className="mb-6">
              <FieldLabel htmlFor="test-recipient">Test recipient</FieldLabel>

              <input
                id="test-recipient"
                type="email"
                value={testRecipient}
                onChange={(event) => setTestRecipient(event.target.value)}
                disabled={loading}
                placeholder="you@example.com"
                className={`${inputClass} smartcv-bulk-inline-input`}
              />

              <button
                type="button"
                onClick={handleTestEmail}
                disabled={loading}
                className={`${secondaryButtonClass} smartcv-bulk-inline-button mt-3`}
              >
                {loading ? 'Please wait...' : 'Send test email'}
              </button>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Sends one email to the test address using your current subject,
                message, and resume.
              </p>
            </div>

            <div className="my-6 h-px bg-slate-100" />

            <div className="mb-5 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">
                Recipient limit
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                50
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Per request, subject to Gmail sending limits.
              </p>

              {selectedRecipientCount !== null && (
                <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-sm">
                  <span className="text-slate-600">Recipients entered</span>
                  <span className="font-semibold text-slate-900">
                    {selectedRecipientCount}
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleBulkSend}
              disabled={!canSend}
              className={`${primaryButtonClass} smartcv-bulk-primary-action`}
            >
              {loading ? 'Sending...' : 'Send applications'}
            </button>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Each recipient receives an individual email. Review the
              recipient list and message before sending.
            </p>

            <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 p-3">
              <span aria-hidden="true">⚠️</span>
              <p className="text-xs leading-5 text-amber-800">
                Bulk sending cannot be undone. Only contact relevant
                recruiters and verify your recipient list before proceeding.
              </p>
            </div>
          </Card>

          {results.length > 0 && (
            <Card className="smartcv-bulk-results-card">
              <h2 className="text-base font-bold text-slate-900">
                Sending results
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-50 p-3">
                  <p className="text-xs font-medium text-emerald-700">Sent</p>
                  <p className="mt-1 text-2xl font-bold text-emerald-800">
                    {results.filter((item) => item.status === 'sent').length}
                  </p>
                </div>

                <div className="rounded-xl bg-rose-50 p-3">
                  <p className="text-xs font-medium text-rose-700">Failed</p>
                  <p className="mt-1 text-2xl font-bold text-rose-800">
                    {results.filter((item) => item.status === 'failed').length}
                  </p>
                </div>
              </div>

              <div className="mt-4 max-h-72 space-y-2 overflow-y-auto">
                {results.map((item, index) => (
                  <div
                    key={`${item.email || item.recipient || 'recipient'}-${index}`}
                    className="rounded-lg border border-slate-100 px-3 py-2.5"
                  >
                    <p className="break-all text-sm font-medium text-slate-800">
                      {item.email || item.recipient || 'Unknown recipient'}
                    </p>

                    <p
                      className={`mt-1 text-xs font-semibold ${
                        item.status === 'sent'
                          ? 'text-emerald-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {item.status || 'Unknown status'}
                    </p>

                    {item.error && (
                      <p className="mt-1 break-words text-xs text-slate-500">
                        {item.error}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </aside>
      </div>
    </div>
  )
}

export default BulkJobApplication
