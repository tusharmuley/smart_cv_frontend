import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX, HiSparkles } from 'react-icons/hi'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Home', href: '/#hero' },
    { name: 'Resume setup', href: '/#upload' },
    { name: 'Your results', href: '/#results' },
  ]

  return (
    <header className="smartcv-header">
      <div className="smartcv-header-inner">
        <div className="smartcv-header-row">
          {/* Brand */}
          <Link to="/" className="smartcv-brand" onClick={() => setMobileMenuOpen(false)}>
            <div className="smartcv-brand-mark">
              <HiSparkles aria-hidden="true" />
            </div>
            <div className="smartcv-brand-copy">
              <span>SmartCV</span>
              <small>Resume AI Assistant</small>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="smartcv-desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`smartcv-nav-link ${location.pathname === '/' && link.name === 'Home' ? 'is-active' : ''}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <Link
            to="/analyze"
            className="smartcv-header-cta"
          >
            Analyze Resume →
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="smartcv-menu-button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <HiX className="w-6 h-6 text-slate-900" />
            ) : (
              <HiMenu className="w-6 h-6 text-slate-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="smartcv-mobile-nav" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="smartcv-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
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
