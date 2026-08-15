import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DarkModeToggle } from './DarkModeToggle';
import { SearchModal } from './SearchModal';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const location = useLocation();

  const openSearch = () => {
    if (!searchOpen) {
      window.history.pushState({ ...(window.history.state || {}), irtiqaSearch: true }, '', window.location.href);
      setSearchOpen(true);
    }
  };

  const closeSearch = () => {
    if (window.history.state?.irtiqaSearch) {
      window.history.back();
    } else {
      setSearchOpen(false);
    }
  };

  // Keep Android/mobile browser Back inside the search overlay instead of leaving the site.
  useEffect(() => {
    const handlePopState = () => setSearchOpen(false);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        openSearch();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const mobileLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Irtiqa' },
    { path: '/founder', label: 'About Founder' },
    { path: '/services', label: 'Services' },
    { path: '/photography', label: 'Photography' },
    { path: '/industries', label: 'Industries' },
    { path: '/clients', label: 'Clients' },
    { path: '/why-choose-us', label: 'Why Choose Us' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link to="/" className="flex items-center group shrink-0 h-full overflow-hidden" aria-label="Irtiqa Marketing home">
              {/* Use the white logo in dark mode; the regular logo in light mode. */}
              <img
                src="/images/brand/irtiqa-logo.png"
                alt="Irtiqa Marketing"
                className="w-[110px] sm:w-[126px] h-[60px] sm:h-[68px] object-contain dark:hidden"
              />
              <img
                src="/images/brand/irtiqa-logo-footer.png"
                alt="Irtiqa Marketing"
                className="hidden w-[110px] sm:w-[126px] h-[60px] sm:h-[68px] object-contain dark:block"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link
                to="/"
                className="relative text-sm tracking-wide uppercase font-body"
                style={{ letterSpacing: '0.08em' }}
              >
                <span className={`transition-colors ${isActive('/') ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}>
                  Home
                </span>
                {isActive('/') && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>

              {/* About Dropdown */}
              <div 
                className="relative group py-2"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-sm tracking-wide uppercase font-body text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  style={{ letterSpacing: '0.08em' }}
                >
                  <span>About</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180 text-accent' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {aboutDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl py-2 z-50"
                    >
                      {[
                        { path: '/about', label: 'About Irtiqa' },
                        { path: '/founder', label: 'About Founder' },
                        { path: '/why-choose-us', label: 'Why Choose Us' },
                        { path: '/clients', label: 'Clients' },
                        { path: '/testimonials', label: 'Testimonials' },
                      ].map((subLink) => (
                        <Link
                          key={subLink.path}
                          to={subLink.path}
                          className={`block px-4 py-2.5 text-xs tracking-wider uppercase font-body hover:bg-secondary transition-colors ${
                            isActive(subLink.path) ? 'text-accent font-semibold' : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {[
                { path: '/services', label: 'Services' },
                { path: '/photography', label: 'Photography' },
                { path: '/industries', label: 'Industries' },
                { path: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative text-sm tracking-wide group uppercase font-body"
                  style={{ letterSpacing: '0.08em' }}
                >
                  <span
                    className={`transition-colors ${isActive(link.path)
                      ? 'text-accent'
                      : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {link.label}
                  </span>
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              {/* Search Button - Desktop */}
              <button
                onClick={openSearch}
                className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Dark Mode Toggle - Desktop */}
              <DarkModeToggle />
            </div>

            {/* Mobile: Search + Dark Mode Toggle + Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={openSearch}
                className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <DarkModeToggle />
              <button
                className="p-2 text-foreground"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-t border-border overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                {mobileLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 text-base uppercase tracking-wide ${isActive(link.path)
                        ? 'text-accent'
                        : 'text-muted-foreground'
                        }`}
                      style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, letterSpacing: '0.08em' }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: mobileLinks.length * 0.05 }}
                >
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <button className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-full text-sm tracking-widest uppercase mt-4 hover:bg-accent/90 transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Book Free Consultation
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={closeSearch} />
    </>
  );
}
