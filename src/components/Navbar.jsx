import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { HiMenu, HiX, HiSparkles } from 'react-icons/hi'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Home', to: '/', exact: true },
    { name: 'Resume setup', to: '/#upload' },
    { name: 'Your results', to: '/#results' },
  ]

  return (
    <header className="smartcv-header">
      <div className="smartcv-header-inner">
        <div className="smartcv-header-row">
          <Link to="/" className="smartcv-brand" onClick={() => setMobileMenuOpen(false)}>
            <div className="smartcv-brand-mark">
              <HiSparkles aria-hidden="true" />
            </div>
            <div className="smartcv-brand-copy">
              <span>SmartCV</span>
              <small>Resume AI Assistant</small>
            </div>
          </Link>

          <nav className="smartcv-desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const isCurrent =
                link.exact
                  ? location.pathname === '/'
                  : location.pathname === '/'

              return (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`smartcv-nav-link ${isCurrent ? 'is-active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            })}

            <NavLink
              to="/bulk-apply"
              className={({ isActive }) =>
                `smartcv-header-nav-pill ${isActive ? 'is-active' : ''}`
              }
            >
              Bulk Apply
            </NavLink>
          </nav>

          <Link to="/analyze" className="smartcv-header-cta">
            Analyze Resume →
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="smartcv-menu-button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <HiX className="h-6 w-6 text-slate-900" />
            ) : (
              <HiMenu className="h-6 w-6 text-slate-900" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="smartcv-mobile-nav" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="smartcv-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <NavLink
              to="/bulk-apply"
              className="smartcv-mobile-cta"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bulk Apply
            </NavLink>
            <Link
              to="/analyze"
              className="smartcv-mobile-cta"
              onClick={() => setMobileMenuOpen(false)}
            >
              Analyze Resume →
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar
