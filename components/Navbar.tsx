import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => setIsOpen(!isOpen);

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      // Only run spy on home page where sections exist
      if (location.pathname !== '/') return;

      const sections = ['home', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better trigger

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
             setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Update active section based on path if not home
  useEffect(() => {
      if (location.pathname === '/about') setActiveSection('about');
      else if (location.pathname === '/contact') setActiveSection('contact');
      else if (location.pathname === '/') {
          // Re-check scroll on route change to /
          // (covered by scroll listener but good for initial load)
      }
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, sectionId: string) => {
      if (location.pathname === '/') {
          e.preventDefault();
          const element = document.getElementById(sectionId);
          if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
          } else {
             // Fallback if element not found (shouldn't happen if on Home)
             navigate(path);
          }
      }
      // If on another page, let the Link handle navigation to the route
  };

  const navLinks = [
    { path: '/', id: 'home', label: 'stuff i made' },
    { path: '/about', id: 'about', label: 'about' },
    { path: '/contact', id: 'contact', label: 'contact' },
  ];

  return (
    <>
      <nav 
        role="navigation" 
        aria-label="Main navigation"
        className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-6 md:py-6 flex justify-between items-center mix-blend-difference text-white font-['JetBrains_Mono']"
      >
        <Link 
          to="/" 
          onClick={(e) => handleNavClick(e, '/', 'home')}
          className="text-xl md:text-2xl font-bold tracking-tighter relative z-50 lowercase focus:outline-none focus:underline"
          aria-label="Home"
        >
          m.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(e) => handleNavClick(e, link.path, link.id)}
              className={`text-sm font-medium lowercase tracking-wide transition-colors focus:outline-none focus:underline underline-offset-4 ${
                activeSection === link.id
                  ? 'text-stone-500' 
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
            className="md:hidden relative z-50 focus:outline-none" 
            onClick={toggleMenu} 
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col items-center justify-center space-y-8 md:hidden font-['JetBrains_Mono']"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={toggleMenu}
                className="text-white text-3xl font-light lowercase tracking-widest hover:text-stone-400 transition-colors focus:outline-none focus:text-stone-400"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;