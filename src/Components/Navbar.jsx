// components/Navbar.jsx
import React, { useState } from 'react';
import { FaBars, FaTimes, FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Explore', path: '/explore' },
    { name: 'Post Beat', path: '/post' },
    { name: 'Feed', path: '/feed' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="bg-gray-900 p-4 shadow-xl relative z-50 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center py-2">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-extrabold tracking-wide hover:text-lime-400 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(100,250,0,0.6)]">
          QuotedBeats
        </Link>

        {/* Desktop Menu & Icons */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative text-lg font-medium text-gray-300 transition duration-300
                ${location.pathname === link.path ? 'text-lime-400' : 'hover:text-teal-300'}
                before:absolute before:bottom-[-4px] before:left-0 before:w-full before:h-0.5 before:bg-gradient-to-r before:from-lime-400 before:to-teal-300 before:transition-all before:duration-300 before:scale-x-0
                ${location.pathname === link.path ? 'before:scale-x-100 before:animate-pulse-slow' : 'hover:before:scale-x-100'}
              `}
            >
              {link.name}
            </Link>
          ))}
          <button className="text-gray-300 hover:text-teal-300 transition-all duration-300 transform hover:rotate-6 focus:outline-none">
            <FaSearch size={22} />
          </button>
          <Link to="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-lime-400 transition-all duration-300 transform hover:scale-105">
            <FaUserCircle size={24} />
            <span className="text-lg hidden lg:inline">My Account</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex-shrink-0">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Fade-in/out) */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-gray-900 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col space-y-6 px-4 py-6">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-white text-2xl font-semibold hover:text-lime-400 transition-colors duration-300 text-center py-2" onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}
          <div className="flex justify-center space-x-8 mt-4">
            <button className="text-white hover:text-teal-300 transition-colors duration-300">
              <FaSearch size={28} />
            </button>
            <Link to="/profile" className="text-white hover:text-lime-400 transition-colors duration-300">
              <FaUserCircle size={30} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
