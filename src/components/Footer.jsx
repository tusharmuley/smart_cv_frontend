import { Link } from 'react-router-dom'
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="smartcv-footer">
      <div className="smartcv-footer-main">
        <div className="smartcv-footer-brand">
          <Link to="/" className="smartcv-footer-logo">
            <span>✦</span> SmartCV
          </Link>
          <p>
              A resume that passes the filter and impresses the recruiter — scored, gapped, and interview-ready in one pass.
          </p>
          <div className="smartcv-trust-note"><HiCheckCircle /> Private by default. No account required.</div>
        </div>

        <div className="smartcv-footer-links">
          <div>
            <h3>Explore</h3>
            <ul>
              <li>
                <a href="/#hero">
                  Home
                </a>
              </li>
              <li>
                <a href="/#upload">
                  Resume setup
                </a>
              </li>
              <li>
                <a href="/#results">
                  Analysis results
                </a>
              </li>
              <li>
                <Link to="/analyze">
                  Analyze Resume
                </Link>
              </li>
            </ul>
          </div>

          <div className="smartcv-footer-newsletter">
            <h3>Get better applications</h3>
            <p>Short, useful tips for creating an ATS-ready resume.</p>
            <form className="smartcv-newsletter-form" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                placeholder="you@email.com"
                aria-label="Email address"
              />
              <button type="submit" aria-label="Subscribe to updates">
                <HiArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="smartcv-footer-bottom">
        <span>© {currentYear} SmartCV. All rights reserved.</span>
        <span>Made for clearer applications.</span>
      </div>
    </footer>
  )
}

export default Footer
