import { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import Navbar from '../components/Navbar'
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

    const handleUpload = async (file) => {

        try {

            setLoading(true)

            const uploadResponse = await uploadResume(file)
            const extractedText = uploadResponse.data.resume_text
            setResumeText(extractedText)

            const analysisResponse = await analyzeResume(
                extractedText,
                jobDescription
            )

            setAnalysis(analysisResponse.data)
            setPanelOpen(false)

        } catch (error) {

            console.error(error)

            alert('Something went wrong.')

        } finally {

            setLoading(false)

        }

    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <Navbar />

                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Resume setup</p>
                            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Job description + resume upload</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-600">Add the job description on the left and upload your resume on the right. This section collapses after analysis.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setPanelOpen((prev) => !prev)}
                            className="rounded-full border border-slate-200 bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
                            aria-label="Toggle input section"
                        >
                            <HiChevronDown className={`h-5 w-5 transition-transform ${panelOpen ? '' : 'rotate-180'}`} />
                        </button>
                    </div>

                    <div className={`mt-6 overflow-hidden transition-all duration-500 ease-out ${panelOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr] lg:items-start">
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Job description</p>
                                <h3 className="mt-2 text-xl font-semibold text-slate-900">Paste your job posting</h3>
                                <div className="mt-4">
                                    <JobDescriptionBox
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Resume upload</p>
                                <h3 className="mt-2 text-xl font-semibold text-slate-900">Upload your resume</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">Choose a PDF file and start the AI review.</p>
                                <div className="mt-4">
                                    <UploadBox onUpload={handleUpload} loading={loading} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {!panelOpen && (
                        <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-200">
                            Inputs collapsed. Click the arrow to reopen the setup section.
                        </div>
                    )}
                </section>

                <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40 transition duration-700 ease-out">
                    <h2 className="text-2xl font-semibold text-slate-900">Analysis results</h2>
                    <p className="mt-2 text-sm text-slate-600">Your resume analysis appears here after upload. The output is shown clearly in separate cards.</p>

                    {loading && (
                        <div className="mt-6">
                            <LoadingSpinner label="Analyzing your resume..." />
                        </div>
                    )}

                    {analysis ? (
                        <div className="mt-6 space-y-6 opacity-0 animate-fadeInUp">
                            <div className="grid gap-6 lg:grid-cols-3">
                                <ScoreCard score={analysis.ats_score} />
                                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Summary</p>
                                    <p className="mt-3 text-sm leading-7 text-slate-700">{analysis.summary ?? 'No summary available.'}</p>
                                </div>
                                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Resume preview</p>
                                    <div className="mt-3 max-h-60 overflow-auto rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                                        <pre className="whitespace-pre-wrap">{resumeText}</pre>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-2">
                                <SkillCard title="Matched Skills" items={analysis.matched_skills ?? []} />
                                <SkillCard title="Missing Skills" items={analysis.missing_skills ?? []} />
                            </div>

                            <div className="grid gap-6 lg:grid-cols-2">
                                <SuggestionCard suggestions={analysis.suggestions ?? []} />
                                <InterviewCard questions={analysis.interview_questions ?? []} />
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 text-sm text-slate-600">Upload a resume and job description to see the analysis cards below.</div>
                    )}
                </section>
            </div>
        </div>
    );

}

export default Home;