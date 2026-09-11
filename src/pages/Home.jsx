import { useState } from 'react'
import UploadBox from '../components/UploadBox'
import JobDescriptionBox from '../components/JobDescriptionBox'
import ScoreCard from '../components/ScoreCard'
import SkillCard from '../components/SkillCard'
import SuggestionCard from '../components/SuggestionCard'
import InterviewCard from '../components/InterviewCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { uploadResume, analyzeResume } from '../services/resumeService'

function Home() {
    const [resumeText, setResumeText] = useState('')
    const [analysis, setAnalysis] = useState(null)
    const [jobDescription, setJobDescription] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [analyzing, setAnalyzing] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleFileSelect = (file) => {
        setSelectedFile(file)
        setErrorMessage('')
    }

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) {
            setErrorMessage('Please add a job description before analyzing.')
            return
        }

        if (!selectedFile && !resumeText) {
            setErrorMessage('Please choose a resume PDF before analyzing.')
            return
        }

        try {
            setAnalyzing(true)
            setErrorMessage('')

            let finalResumeText = resumeText

            if (selectedFile) {
                setUploading(true)
                const uploadResponse = await uploadResume(selectedFile)
                const payload = uploadResponse?.data ?? uploadResponse
                finalResumeText = payload?.resume_text || payload?.resumeText

                if (!finalResumeText) {
                    throw new Error(uploadResponse?.message || 'We could not read text from that PDF.')
                }

                setResumeText(finalResumeText)
                setUploading(false)
            }

            const analysisResponse = await analyzeResume(finalResumeText, jobDescription)
            const payload = analysisResponse?.data ?? analysisResponse
            setAnalysis(payload)
        } catch (error) {
            console.error(error)
            const message = error.response?.data?.message || error.message || 'The resume could not be analyzed. Please try again.'
            setErrorMessage(message)
        } finally {
            setUploading(false)
            setAnalyzing(false)
        }
    }

    const handleRemove = () => {
        setSelectedFile(null)
        setResumeText('')
        setAnalysis(null)
        setErrorMessage('')
    }

    return (
        <div className="smartcv-homepage">
            <div className="smartcv-input-grid">
                <section className="smartcv-input-panel smartcv-job-panel">
                    <p className="smartcv-panel-label">JOB DESCRIPTION</p>
                    <h2>Paste your job posting</h2>
                    <JobDescriptionBox
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                </section>

                <section className="smartcv-input-panel smartcv-upload-panel">
                    <p className="smartcv-panel-label">RESUME UPLOAD</p>
                    <h2>Upload your resume</h2>
                    <p className="smartcv-panel-copy">Choose a PDF file and start the AI review.</p>
                    <UploadBox
                        file={selectedFile}
                        onFileSelect={handleFileSelect}
                        onRemove={handleRemove}
                        uploaded={!!resumeText}
                    />
                </section>
            </div>

            <div className="smartcv-analyze-wrap">
                <button
                    onClick={handleAnalyze}
                    disabled={!(jobDescription.trim().length > 0 && (selectedFile || resumeText)) || analyzing || uploading}
                    className="smartcv-analyze-button"
                >
                    {analyzing ? 'Analyzing...' : uploading ? 'Uploading...' : 'Analyze'}
                </button>
            </div>

            {errorMessage && (
                <div className="smartcv-error" role="alert">
                    <strong>Analysis could not be completed.</strong> {errorMessage}
                </div>
            )}

            {analysis && (
                <section className="smartcv-section" id="results">
                    <div className="smartcv-panel">
                        <div className="smartcv-results-head">
                            <p className="eyebrow mb-2">Analysis Results</p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 mb-3">What the AI found</h2>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">Six focused cards — score, summary, skills, gaps, suggestions, and interview prep.</p>
                        </div>

                        <div className="smartcv-results-grid animate-fadeInUp">
                            <div className="smartcv-results-overview">
                                <ScoreCard score={analysis.ats_score} />
                                <div className="smartcv-result-card smartcv-summary-card">
                                    <p className="eyebrow">Summary</p>
                                    <p className="smartcv-summary-copy">{analysis.summary ?? 'No summary available.'}</p>
                                </div>
                                <div className="smartcv-result-card smartcv-preview-card">
                                    <p className="eyebrow">Resume preview</p>
                                    <div className="smartcv-preview-content">
                                        <pre>{resumeText}</pre>
                                    </div>
                                </div>
                            </div>

                            <div className="smartcv-results-pair">
                                <SkillCard title="Matched Skills" items={analysis.matched_skills ?? []} />
                                <SkillCard title="Missing Skills" items={analysis.missing_skills ?? []} />
                            </div>

                            <div className="smartcv-results-pair">
                                <SuggestionCard suggestions={analysis.suggestions ?? []} />
                                <InterviewCard questions={analysis.interview_questions ?? []} />
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

export default Home
