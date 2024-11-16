import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import logo from '/logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Signup', link: '/signup' },
  { name: 'Login', link: '/login' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      try {
        await signOut(auth);
        navigate('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-14 h-auto" />
        </div>

        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-6">
            {navItems.map((item, index) => (
              <li key={index} className="md:mx-4 my-2 md:my-0">
                <Link
                  to={item.link}
                  className={`text-gray-800 font-bold px-4 py-2 rounded-md transition-all duration-300 transform hover:bg-[#68e1fd] hover:text-black hover:scale-105 ${
                    (location.pathname === '/login' || location.pathname === '/signup') && item.name === 'Home'
                      ? 'pointer-events-none text-slate-600 cursor-not-allowed'
                      : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center space-x-4" ref={dropdownRef}>
          <button
            className="text-gray-800 font-bold flex items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaUserCircle size={24} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-32">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-[#68e1fd] hover:text-black"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden ml-auto">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
            <ul className="flex flex-col items-center space-y-4 py-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className={`text-gray-800 font-bold px-4 py-2 rounded-md transition-all duration-300 transform hover:bg-[#68e1fd] hover:text-black hover:scale-105 ${
                      (location.pathname === '/login' || location.pathname === '/signup') && item.name === 'Home'
                        ? 'pointer-events-none text-gray-400 cursor-not-allowed'
                        : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="absolute bottom-4 left-4 text-gray-800 font-bold"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUserCircle size={24} />
            </button>
            {isDropdownOpen && (
              <div className="absolute bottom-16 left-4 bg-white border rounded shadow-md w-32">
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-800 hover:bg-[#68e1fd] hover:text-black"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-[#68e1fd] hover:text-black"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
