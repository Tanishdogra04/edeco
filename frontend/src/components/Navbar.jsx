import { useState, useEffect } from 'react';
import {
  Menu, X, ChevronDown, ChevronRight, Compass,
  BookOpen, User, PhoneCall, LogIn, BookOpenCheck
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CounsellingModal from './CounsellingModal';
import { useAuth } from '../context/AuthContext';
import { menuItems } from '../data/navbarItems';
import MegaMenu from './navbar/MegaMenu';
import MobileDrawer from './navbar/MobileDrawer';
import ProfileDropdown from './navbar/ProfileDropdown';

export default function Navbar({
  onCounsellingClick,
  onCompareClick,
  compareCount = 0,
  darkTheme = false,
  lightTextBeforeScroll = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [localCounsellingOpen, setLocalCounsellingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setExpandedCategory(null);
  };

  const handleCounsellingClick = () => {
    if (onCounsellingClick) {
      onCounsellingClick();
    } else {
      setLocalCounsellingOpen(true);
    }
  };

  const handleCompareClick = () => {
    if (onCompareClick) {
      onCompareClick();
    } else {
      if (window.location.pathname === '/') {
        const el = document.getElementById('colleges');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate('/');
        localStorage.setItem('scrollToColleges', 'true');
      }
    }
  };

  const isActive = (path) => window.location.pathname === path;
  const isExamsActive = () => window.location.pathname.startsWith('/exam/') || window.location.pathname === '/exams';


  const handleDropdownHover = (key) => {
    setActiveDropdown(key);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? darkTheme
            ? 'bg-slate-950/95 backdrop-blur-md border-b border-white/10 shadow-sm'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)]'
          : 'bg-transparent border-b border-transparent shadow-none'
      }`}>
        {/* Main Navbar */}
        <div className="py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  if (window.location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigate('/');
                  }
                }}
              >
                <span className={`font-display font-extrabold text-3xl tracking-tight leading-none transition-colors duration-300 ${
                  darkTheme || (lightTextBeforeScroll && !isScrolled && !isOpen) ? 'text-white' : 'text-[#0f71cd]'
                }`}>
                  edeco
                </span>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-1 xl:gap-2 ml-auto">
                {Object.entries(menuItems).map(([key, item]) => {
                  return (
                    <div
                      key={key}
                      className="relative group py-2"
                      onMouseEnter={() => handleDropdownHover(key)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                        className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-[16px] font-tt-talent font-normal transition-all duration-200 cursor-pointer ${
                          darkTheme || (lightTextBeforeScroll && !isScrolled && !isOpen)
                            ? 'text-slate-300 hover:text-white hover:bg-white/10'
                            : 'text-[#0F141E] hover:text-[#0f71cd] hover:bg-[#0f71cd]/10'
                        }`}
                        style={{ fontFamily: '"TT Talent", sans-serif' }}
                      >
                        <span>{item.title}</span>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Mega Menu Dropdown */}
                      <AnimatePresence>
                        {activeDropdown === key && (
                          <MegaMenu
                            item={item}
                            compareCount={compareCount}
                            onCompareClick={handleCompareClick}
                            onCounsellingClick={handleCounsellingClick}
                            onClose={() => setActiveDropdown(null)}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <Link
                  to="/resources"
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[16px] font-tt-talent font-normal transition-all duration-200 cursor-pointer ${
                    darkTheme || (lightTextBeforeScroll && !isScrolled && !isOpen)
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'text-[#0F141E] hover:text-[#0f71cd] hover:bg-[#0f71cd]/10'
                  }`}
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  Resources
                </Link>

                <Link
                  to="/events"
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[16px] font-tt-talent font-normal transition-all duration-200 cursor-pointer ${
                    darkTheme || (lightTextBeforeScroll && !isScrolled && !isOpen)
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'text-[#0F141E] hover:text-[#0f71cd] hover:bg-[#0f71cd]/10'
                  }`}
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  Events
                </Link>

                <div className="relative group py-2">
                  <Link
                    to="/find-us"
                    className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-[16px] font-tt-talent font-normal transition-all duration-200 cursor-pointer ${
                      darkTheme || (lightTextBeforeScroll && !isScrolled && !isOpen)
                        ? 'text-slate-300 hover:text-white hover:bg-white/10'
                        : 'text-[#0F141E] hover:text-[#0f71cd] hover:bg-[#0f71cd]/10'
                    }`}
                    style={{ fontFamily: '"TT Talent", sans-serif' }}
                  >
                    <span>Find Us</span>
                    <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                  {/* Dropdown list */}
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200/85 rounded-2xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 overflow-hidden text-left">
                    {/* General Support Option */}
                    <Link
                      to="/contact"
                      className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-100/70 border-b border-slate-100 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <PhoneCall size={14} className="text-[#0f71cd]" />
                      <span className="font-display font-bold text-[13px] text-[#0f71cd]">
                        Get in Touch / Support
                      </span>
                    </Link>
                    {/* Find us Option */}
                    <Link
                      to="/find-us"
                      className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-100/70 border-b border-slate-100 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Compass size={14} className="text-[#0f71cd]" />
                      <span className="font-display font-bold text-[13px] text-[#0f71cd]">
                        Find nearest Edeco office
                      </span>
                    </Link>
                    {/* Dropdown Options */}
                    <div className="max-h-60 overflow-y-auto">
                      {[
                        "Andhra Pradesh",
                        "Delhi",
                        "Gujarat",
                        "Haryana",
                        "Karnataka",
                        "Kerala",
                        "Maharashtra",
                        "Punjab",
                        "Tamil Nadu",
                        "Telangana"
                      ].map((state) => (
                        <Link
                          key={state}
                          to={`/find-us?state=${encodeURIComponent(state === 'Delhi' ? 'Delhi NCR' : state === 'Punjab' ? 'Punjab & Chandigarh' : state)}`}
                          className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 text-[13px] text-slate-700 hover:text-[#0f71cd] transition-colors font-sans border-b border-slate-50 last:border-b-0"
                        >
                          <span>{state}</span>
                          <ChevronRight size={12} className="text-slate-400" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navbar actions */}
              <div className={`hidden lg:flex items-center gap-4 pl-6 border-l ${
                darkTheme || (lightTextBeforeScroll && !isScrolled && !isOpen) ? 'border-white/10' : 'border-slate-200'
              }`}>
                {isLoggedIn && user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className={`flex items-center gap-2 p-1.5 rounded-xl border backdrop-blur-md transition-all cursor-pointer shadow-sm focus:outline-none ${
                        darkTheme || (lightTextBeforeScroll && !isScrolled && !isOpen)
                          ? 'border-white/10 hover:border-[#0f71cd] bg-white/5'
                          : 'border-slate-200 hover:border-slate-350 bg-slate-50/50'
                      }`}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-7 h-7 rounded-lg object-cover border border-slate-100"
                      />
                      <span className={`text-[13px] font-bold pr-1 max-w-[100px] truncate ${
                        darkTheme || (lightTextBeforeScroll && !isScrolled && !isOpen) ? 'text-slate-200' : 'text-slate-800'
                      }`}>{user.name.split(' ')[0]}</span>
                      <ChevronDown size={12} className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''} ${
                        darkTheme || (lightTextBeforeScroll && !isScrolled && !isOpen) ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                    </button>

                    <ProfileDropdown
                      isProfileOpen={isProfileOpen}
                      setIsProfileOpen={setIsProfileOpen}
                      user={user}
                      logout={logout}
                      navigate={navigate}
                    />
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className={`flex items-center gap-1.5 text-[14.5px] font-display font-normal transition-all py-2 px-4 rounded-xl border cursor-pointer group/login ${
                      darkTheme || (lightTextBeforeScroll && !isScrolled && !isOpen)
                        ? 'border-white/10 hover:border-white bg-white/5 hover:bg-white text-slate-200 hover:text-slate-950'
                        : 'border-[#0f71cd]/20 hover:border-[#0f71cd] bg-[#0f71cd]/5 hover:bg-[#0f71cd] text-[#0f71cd] hover:text-white'
                    }`}
                  >
                    <LogIn size={16} className={`transition-colors ${
                      darkTheme || (lightTextBeforeScroll && !isScrolled && !isOpen)
                        ? 'text-slate-400 group-hover/login:text-slate-950'
                        : 'text-[#0f71cd] group-hover/login:text-white'
                    }`} />
                    <span>Login</span>
                  </Link>
                )}

                <button
                  onClick={handleCounsellingClick}
                  className="whitespace-nowrap relative group overflow-hidden px-5 py-2.5 rounded-xl bg-[#0f71cd] text-white hover:bg-[#0c62b2] text-[14.5px] font-display font-semibold shadow-md shadow-blue-950/20 hover:shadow-lg hover:shadow-blue-950/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <PhoneCall size={16} className="transition-transform duration-300 group-hover:scale-110" />
                    Book Call with Expert
                  </span>
                </button>
              </div>

              {/* Mobile Actions and Hamburger */}
              <div className="flex items-center gap-3 lg:hidden relative z-[60]">
                <a
                  href="/api/whatsapp?phone=918130784777&amp;url=https%3A%2F%2Fwww.aeccglobal.com%2Fin"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className={`p-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center ${
                    darkTheme || (lightTextBeforeScroll && !isScrolled && !isOpen)
                      ? 'text-slate-300 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-[rgb(15,113,205)] hover:bg-slate-50'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <g>
                      <path d="M11.8392 9.19396C11.8081 9.17899 10.6416 8.6046 10.4344 8.53001C10.3497 8.49962 10.2591 8.46996 10.1627 8.46996C10.0052 8.46996 9.87285 8.54845 9.76978 8.70263C9.65326 8.87582 9.30054 9.28814 9.19155 9.41131C9.17732 9.42757 9.15789 9.44699 9.14625 9.44699C9.13581 9.44699 8.95529 9.37266 8.90064 9.34892C7.64937 8.80538 6.6996 7.49832 6.56937 7.2779C6.55077 7.24621 6.54999 7.23183 6.54984 7.23183C6.55441 7.21505 6.59649 7.17286 6.6182 7.1511C6.68173 7.08824 6.75056 7.00538 6.81716 6.92523C6.84869 6.88725 6.88028 6.84923 6.91129 6.81338C7.00791 6.70097 7.05093 6.6137 7.1008 6.5126L7.12693 6.46008C7.24869 6.21816 7.14469 6.01401 7.11108 5.94808C7.0835 5.89292 6.59098 4.70424 6.53862 4.57936C6.41269 4.27801 6.2463 4.1377 6.01508 4.1377C5.99363 4.1377 6.01508 4.1377 5.92511 4.14149C5.81555 4.14611 5.21893 4.22466 4.95514 4.39094C4.6754 4.56731 4.20215 5.12949 4.20215 6.11816C4.20215 7.00798 4.76682 7.84814 5.00927 8.16767C5.01529 8.17572 5.02636 8.19209 5.04241 8.21557C5.97088 9.57151 7.12833 10.5764 8.30168 11.0451C9.43129 11.4963 9.9662 11.5485 10.2703 11.5485H10.2704C10.3981 11.5485 10.5004 11.5385 10.5907 11.5296L10.6479 11.5241C11.0381 11.4895 11.8957 11.0452 12.0908 10.5031C12.2444 10.0761 12.285 9.60964 12.1827 9.44034C12.1127 9.32523 11.992 9.26731 11.8392 9.19396Z" />
                      <path d="M8.14201 0C3.80871 0 0.283313 3.49891 0.283313 7.79964C0.283313 9.19065 0.655572 10.5523 1.36077 11.7439L0.0110009 15.7255C-0.0141419 15.7997 0.00455936 15.8818 0.0594684 15.9377C0.0991048 15.9782 0.152871 16 0.20778 16C0.228819 16 0.250014 15.9968 0.270689 15.9902L4.42238 14.671C5.55848 15.278 6.84253 15.5984 8.14207 15.5984C12.4749 15.5984 16 12.0999 16 7.79964C16 3.49891 12.4749 0 8.14201 0ZM8.14201 13.9737C6.91921 13.9737 5.73484 13.6206 4.71677 12.9526C4.68253 12.9301 4.64279 12.9185 4.60279 12.9185C4.58165 12.9185 4.56045 12.9218 4.53983 12.9283L2.46009 13.5894L3.13147 11.6087C3.15318 11.5446 3.14233 11.4739 3.10233 11.4192C2.32705 10.3599 1.91723 9.10831 1.91723 7.79964C1.91723 4.39481 4.70965 1.62473 8.14196 1.62473C11.5739 1.62473 14.366 4.39481 14.366 7.79964C14.366 11.2041 11.574 13.9737 8.14201 13.9737Z" />
                    </g>
                  </svg>
                </a>

                <button
                  onClick={toggleMenu}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    darkTheme || (lightTextBeforeScroll && !isScrolled && !isOpen)
                      ? 'text-slate-200 hover:text-white hover:bg-white/5'
                      : 'text-slate-700 hover:text-[#0f71cd] hover:bg-slate-50'
                  }`}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Drawer Menu */}
      <MobileDrawer
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        darkTheme={darkTheme}
        menuItems={menuItems}
        compareCount={compareCount}
        isLoggedIn={isLoggedIn}
        user={user}
        logout={logout}
        navigate={navigate}
        expandedCategory={expandedCategory}
        setExpandedCategory={setExpandedCategory}
        handleCompareClick={handleCompareClick}
        handleCounsellingClick={handleCounsellingClick}
      />

      {/* Mobile Bottom Navigation Bar (Home | Search | Compare | Exams | Profile) */}
      <div className={`lg:hidden fixed bottom-0 left-0 w-full py-2.5 px-4 flex items-center justify-around z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] backdrop-blur-lg border-t transition-colors duration-300 ${darkTheme
        ? 'bg-slate-950/90 border-white/10 text-slate-400'
        : 'bg-white/90 border-slate-100 text-slate-500'
        }`}>
        <Link
          to="/"
          className={`flex flex-col items-center gap-0.5 transition-colors ${isActive('/')
            ? (darkTheme ? 'text-white font-bold' : 'text-[#0f71cd] font-bold')
            : (darkTheme ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#0f71cd]')
            }`}
        >
          <Compass size={20} className="transition-colors text-current" />
          <span className="text-[10px] font-semibold">Home</span>
        </Link>

        <Link
          to="/events"
          className={`flex flex-col items-center gap-0.5 transition-colors ${isActive('/events')
            ? (darkTheme ? 'text-white font-bold' : 'text-[#0f71cd] font-bold')
            : (darkTheme ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#0f71cd]')
            }`}
        >
          <BookOpen size={20} className="transition-colors text-current" />
          <span className="text-[10px] font-semibold">Events</span>
        </Link>

        <Link
          to="/exam/jee-main"
          className={`flex flex-col items-center gap-0.5 transition-colors ${isExamsActive()
            ? (darkTheme ? 'text-white font-bold' : 'text-[#0f71cd] font-bold')
            : (darkTheme ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#0f71cd]')
            }`}
        >
          <BookOpenCheck size={20} className="transition-colors text-current" />
          <span className="text-[10px] font-semibold">Exams</span>
        </Link>

        {isLoggedIn && user ? (
          <button
            onClick={() => {
              navigate(user.role === 'admin' ? '/admin' : '/login');
            }}
            className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${darkTheme ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#0f71cd]'
              }`}
          >
            <img src={user.avatar} alt="Profile" className={`w-5 h-5 rounded-lg object-cover border ${darkTheme ? 'border-white/20' : 'border-slate-300'
              }`} />
            <span className="text-[10px] font-bold">{user.role === 'admin' ? 'Admin' : 'Profile'}</span>
          </button>
        ) : (
          <button
            onClick={handleCounsellingClick}
            className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${darkTheme ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#0f71cd]'
              }`}
          >
            <User size={20} className="transition-colors text-current" />
            <span className="text-[10px] font-bold">Counselling</span>
          </button>
        )}
      </div>

      <CounsellingModal isOpen={localCounsellingOpen} onClose={() => setLocalCounsellingOpen(false)} />
    </>
  );
}
