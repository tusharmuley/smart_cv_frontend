import { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
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
    const [loading, setLoading] = useState(false)
    const [panelOpen, setPanelOpen] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    const handleUpload = async (file) => {

        try {

            setLoading(true)
            setErrorMessage('')

            const uploadResponse = await uploadResume(file)
            const extractedText = uploadResponse?.data?.resume_text
            if (!extractedText) {
                throw new Error(uploadResponse?.message || 'We could not read text from that PDF.')
            }
            setResumeText(extractedText)

            const analysisResponse = await analyzeResume(
                extractedText,
                jobDescription
            )

            setAnalysis(analysisResponse.data)
            setPanelOpen(false)

        } catch (error) {

            console.error(error)
            const message = error.response?.data?.message || error.message || 'The resume could not be analyzed. Please try again.'
            setErrorMessage(message)

        } finally {

            setLoading(false)

        }

    }

    return (
        <div className="smartcv-page">
            <div className="smartcv-container">
                {/* Hero Section */}
                <section className="smartcv-hero" id="hero">
                    <p className="eyebrow mb-4">AI Resume Analysis</p>
                    <h1 className="smartcv-hero-title">
                        Know exactly why<br />your resume gets <span className="text-indigo-600">skipped</span>.
                    </h1>
                    <p className="smartcv-hero-copy">
                        Paste a job description, upload your resume, and get an ATS score, skill gaps, and interview questions in under a minute — no login required.
                    </p>
                    <div className="smartcv-hero-actions">
                        <a href="#upload" className="smartcv-action smartcv-action-primary">
                            Upload Resume →
                        </a>
                        <button className="smartcv-action smartcv-action-secondary">
                            See Sample Report
                        </button>
                    </div>
                </section>

                {/* Upload Section */}
                <section className="smartcv-section" id="upload">
                    <div className="smartcv-panel">
                        <div className="smartcv-panel-head">
                            <div>
                                <p className="eyebrow mb-2">Resume Setup</p>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 mb-2">Job description + resume upload</h2>
                                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">Add the job description on the left and upload your resume on the right. This section collapses after analysis.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPanelOpen((prev) => !prev)}
                                className="smartcv-collapse-button"
                                aria-label="Toggle input section"
                            >
                                <HiChevronDown className={`h-5 w-5 transition-transform duration-300 ${panelOpen ? '' : 'rotate-180'}`} />
                            </button>
                        </div>

                        <div className={`overflow-hidden transition-all duration-500 ease-out ${panelOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="smartcv-input-grid">
                                <div className="smartcv-input-card">
                                    <p className="eyebrow mb-2">Job Description</p>
                                    <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 mb-4">Paste your job posting</h3>
                                    <JobDescriptionBox
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                    />
                                </div>

                                <div className="smartcv-input-card">
                                    <p className="eyebrow mb-2">Resume Upload</p>
                                    <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 mb-2">Upload your resume</h3>
                                    <p className="text-sm text-slate-600 mb-5 leading-relaxed">Choose a PDF file and start the AI review.</p>
                                    <UploadBox onUpload={handleUpload} loading={loading} />
                                </div>
                            </div>
                        </div>

                        {!panelOpen && (
                            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 border border-slate-200">
                                Inputs collapsed. Click the arrow to reopen the setup section.
                            </div>
                        )}
                        {errorMessage && (
                            <div className="smartcv-error" role="alert">
                                <strong>Analysis could not be completed.</strong> {errorMessage}
                            </div>
                        )}
                    </div>
                </section>

                {/* Results Section */}
                <section className="smartcv-section" id="results">
                    <div className="smartcv-panel">
                        <div className="smartcv-results-head">
                            <p className="eyebrow mb-2">Analysis Results</p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 mb-3">What the AI found</h2>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">Six focused cards — score, summary, skills, gaps, suggestions, and interview prep.</p>
                        </div>

                        {loading && (
                            <div className="mt-8">
                                <LoadingSpinner label="Analyzing your resume..." />
                            </div>
                        )}

                        {analysis ? (
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
                        ) : (
                            <div className="text-center py-12 sm:py-16">
                                <p className="text-slate-500 text-base sm:text-lg">Upload a resume and job description to see the analysis cards below.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );

}

export default Home;
