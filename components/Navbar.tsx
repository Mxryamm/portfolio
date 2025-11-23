import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: '/', label: 'stuff i made' },
    { path: '/about', label: 'about' },
    { path: '/contact', label: 'contact' },
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
              className={`text-sm font-medium lowercase tracking-wide hover:opacity-50 transition-opacity focus:outline-none focus:underline underline-offset-4 ${
                location.pathname === link.path ? 'opacity-50' : ''
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