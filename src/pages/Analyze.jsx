import { Link } from 'react-router-dom'

const Analyze = () => (
  <div className="wrap py-20 text-center">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold font-display text-slate-900 mb-4">
        Resume Analysis
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        Upload your resume on the home page to get started with your AI-powered analysis.
      </p>
      <Link
        to="/"
        className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-600/40"
      >
        Go to Analysis Tool →
      </Link>
    </div>
  </div>
)

export default Analyze
