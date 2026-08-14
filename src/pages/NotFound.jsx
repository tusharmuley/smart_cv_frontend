import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="wrap py-20 text-center">
    <div className="max-w-2xl mx-auto">
      <div className="text-6xl font-bold font-display text-indigo-600 mb-4">404</div>
      <h1 className="text-4xl font-bold font-display text-slate-900 mb-4">
        Page Not Found
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-600/40"
      >
        Go Home
      </Link>
    </div>
  </div>
)

export default NotFound
