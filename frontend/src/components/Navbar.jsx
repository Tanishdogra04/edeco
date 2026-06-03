import React, { useState, useEffect } from 'react';
import {
  Menu, X, ChevronDown, ChevronRight, GitCompare, Compass,
  GraduationCap, Globe, BookOpen, User, PhoneCall, LogIn, LogOut,
  Sparkles, Award, BookOpenCheck, ArrowRight, Laptop, HeartPulse, Scale, Palette,
  BarChart3, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import CounsellingModal from './CounsellingModal';
import { useAuth } from '../context/AuthContext';

export default function Navbar({
  onCounsellingClick,
  onCompareClick,
  compareCount = 0,
  darkTheme = false
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

  const menuItems = {
    institution: {
      title: "Institution",
      subtitle: "Discover colleges & paths",
      icon: Compass,
      columns: [
        {
          title: "Technical & Medical",
          links: [
            { name: "Engineering Colleges", href: "/stream/engineering", icon: Laptop },
            { name: "Medical Institutes", href: "/stream/medical", icon: HeartPulse },
            { name: "Design & Arts Academies", href: "/stream/design-&-arts", icon: Palette },
          ]
        },
        {
          title: "Business & Professional",
          links: [
            { name: "Business Schools", href: "/stream/mba-&-business", icon: GraduationCap },
            { name: "Law Academies", href: "/stream/law-&-justice", icon: Scale },
            { name: "Commerce & Finance", href: "/stream/commerce-&-finance", icon: BarChart3 },
          ]
        }
      ]
    },
    courses: {
      title: "Courses",
      subtitle: "Choose your specialization",
      icon: GraduationCap,
      columns: [
        {
          title: "Undergraduate (UG)",
          links: [
            { name: "B.Tech / B.E.", desc: "4 Years • Technology", href: "/course/btech" },
            { name: "BBA / BCA", desc: "3 Years • Management/IT", href: "/course/bba" },
            { name: "MBBS", desc: "5.5 Years • Medical", href: "/course/mbbs" },
            { name: "B.Des / B.Arch", desc: "4-5 Years • Creative", href: "/course/bdes" },
          ]
        },
        {
          title: "Postgraduate (PG)",
          links: [
            { name: "MBA / PGDM", desc: "2 Years • Business Leaders", href: "/course/mba", badge: "Hot" },
            { name: "M.Tech", desc: "2 Years • Specialization", href: "/course/mtech" },
            { name: "MCA / M.Sc", desc: "2 Years • Advanced Tech", href: "/course/mca" },
            { name: "LL.B / LL.M", desc: "3-2 Years • Law", href: "/course/llb" },
          ]
        }
      ]
    },
    exams: {
      title: "Exams",
      subtitle: "Ace your entrance tests",
      icon: BookOpenCheck,
      columns: [
        {
          title: "Engineering & Medical",
          links: [
            { name: "JEE Main / Advanced", desc: "Engineering Entrance", href: "/exam/jee-main" },
            { name: "NEET UG", desc: "Medical Entrance", href: "/exam/neet" },
            { name: "GATE", desc: "Postgrad Tech", href: "/exam/gate" },
          ]
        },
        {
          title: "Management & Others",
          links: [
            { name: "CAT / XAT / CMAT", desc: "Management Admissions", href: "/exam/cat", badge: "Trending" },
            { name: "CUET", desc: "Central Universities", href: "/exam/cuet" },
            { name: "CLAT", desc: "Law Admissions", href: "/exam/clat" },
          ]
        }
      ]
    },
    services: {
      title: "Services",
      subtitle: "Premium guidance & tools",
      icon: Sparkles,
      columns: [
        {
          title: "Admission Guidance",
          links: [
            { name: "Admission Guidance", href: "/premium", icon: Sparkles, badge: "Popular" },
            { name: "AI College Finder", href: "/premium#features", icon: Award },
          ]
        },
        {
          title: "Student Tools",
          links: [
            { name: "Expert Consultation", href: "/premium#features", icon: PhoneCall },
            { name: "Compare Colleges", isAction: true, actionType: "compare", icon: GitCompare },
          ]
        }
      ]
    }
  };

  const handleDropdownHover = (key) => {
    setActiveDropdown(key);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${darkTheme
        ? 'bg-slate-950/95 backdrop-blur-md border-b border-white/10 shadow-sm'
        : 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)]'
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
                <span className={`font-display font-extrabold text-3xl tracking-tight leading-none transition-colors duration-300 ${darkTheme ? 'text-white' : 'text-[#110051]'
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
                        className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-[14.5px] font-display font-normal transition-all duration-200 cursor-pointer ${darkTheme ? 'text-slate-300 hover:text-white hover:bg-[#110051]' : 'text-slate-900 hover:text-white hover:bg-[#110051]'}`}
                      >
                        <span>{item.title}</span>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Mega Menu Dropdown */}
                      <AnimatePresence>
                        {activeDropdown === key && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[480px] xl:w-[560px] p-6 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 grid grid-cols-2 gap-6 z-50"
                          >
                            {item.columns.map((column, colIdx) => (
                              <div key={colIdx} className="space-y-4">
                                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                  {column.title}
                                </h3>
                                <ul className="space-y-2">
                                  {column.links.map((link, lIdx) => {
                                    const LinkIcon = link.icon;

                                    const LinkContent = (
                                      <>
                                        {LinkIcon && (
                                          <div className="p-1.5 rounded-lg bg-slate-100 group-hover/item:bg-brand-100 group-hover/item:text-brand-600 text-slate-500 transition-colors duration-200">
                                            <LinkIcon size={16} />
                                          </div>
                                        )}
                                        <div className="flex-1">
                                          <div className="flex items-center gap-1.5">
                                            <span className="text-[14px] font-semibold text-slate-800 group-hover/item:text-[#110051] transition-colors">
                                              {link.name}
                                            </span>
                                            {link.badge && (
                                              <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase bg-[#110051] text-white rounded-md">
                                                {link.badge}
                                              </span>
                                            )}
                                            {link.actionType === "compare" && compareCount > 0 && (
                                              <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wide bg-[#110051] text-white rounded-md flex items-center justify-center min-w-5 h-5 shadow-xs">
                                                {compareCount}
                                              </span>
                                            )}
                                          </div>
                                          {link.desc && (
                                            <p className="text-[12px] text-slate-400 mt-0.5 line-clamp-1">
                                              {link.desc}
                                            </p>
                                          )}
                                        </div>
                                      </>
                                    );

                                    if (link.isAction) {
                                      return (
                                        <li key={lIdx}>
                                          <button
                                            onClick={() => {
                                              setActiveDropdown(null);
                                              if (link.actionType === "compare") {
                                                handleCompareClick();
                                              } else {
                                                handleCounsellingClick();
                                              }
                                            }}
                                            className="w-full text-left group/item flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                                          >
                                            {LinkContent}
                                          </button>
                                        </li>
                                      );
                                    }

                                    return (
                                      <li key={lIdx}>
                                        <Link
                                          to={link.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="group/item flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-all duration-200"
                                        >
                                          {LinkContent}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}

                            {/* Dropdown footer info banner */}
                            <div className="col-span-2 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
                              <span>{item.subtitle}</span>
                              <button onClick={() => { setActiveDropdown(null); handleCounsellingClick(); }} className="flex items-center gap-1 font-semibold text-[#110051] hover:text-brand-900 transition-colors group/link cursor-pointer">
                                Talk to Counselors
                                <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <Link
                  to="/resources"
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[14.5px] font-display font-normal transition-all duration-200 cursor-pointer ${darkTheme ? 'text-slate-300 hover:text-white hover:bg-[#110051]' : 'text-slate-900 hover:text-white hover:bg-[#110051]'}`}
                >
                  Resources
                </Link>

                <Link
                  to="/events"
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[14.5px] font-display font-normal transition-all duration-200 cursor-pointer ${darkTheme ? 'text-slate-300 hover:text-white hover:bg-[#110051]' : 'text-slate-900 hover:text-white hover:bg-[#110051]'}`}
                >
                  Events
                </Link>

                <div className="relative group py-2">
                  <Link to="/find-us" className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-[14.5px] font-display font-normal transition-all duration-200 cursor-pointer ${darkTheme ? 'text-slate-300 hover:text-white hover:bg-[#110051]' : 'text-slate-900 hover:text-white hover:bg-[#110051]'}`}>
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
                      <PhoneCall size={14} className="text-[#110051]" />
                      <span className="font-display font-bold text-[13px] text-[#110051]">
                        Get in Touch / Support
                      </span>
                    </Link>
                    {/* Find us Option */}
                    <Link
                      to="/find-us"
                      className="w-full px-4 py-3 bg-slate-50/50 hover:bg-slate-100/70 border-b border-slate-100 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Compass size={14} className="text-[#110051]" />
                      <span className="font-display font-bold text-[13px] text-[#110051]">
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
                          className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 text-[13px] text-slate-700 hover:text-[#110051] transition-colors font-sans border-b border-slate-50 last:border-b-0"
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
              <div className={`hidden lg:flex items-center gap-4 pl-6 border-l ${darkTheme ? 'border-white/10' : 'border-slate-200'
                }`}>
                {isLoggedIn && user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-slate-350 bg-slate-50/50 backdrop-blur-md transition-all cursor-pointer shadow-sm focus:outline-none"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-7 h-7 rounded-lg object-cover border border-slate-100"
                      />
                      <span className="text-[13px] font-bold text-slate-800 pr-1 max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                      <ChevronDown size={12} className={`text-slate-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isProfileOpen && (
                        <>
                          <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsProfileOpen(false)}></div>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2.5 w-64 rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 z-50 text-slate-800"
                          >
                            <div className="flex items-center gap-3 pb-3 mb-3 border-b border-slate-100">
                              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover border border-slate-100" />
                              <div className="min-w-0">
                                <h4 className="font-black text-sm text-slate-900 truncate">{user.name}</h4>
                                <p className="text-xs text-slate-500 font-semibold truncate">{user.email}</p>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="px-3 py-1 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                {user.role === 'admin' ? 'Admin Portal' : 'Student Portal'}
                              </div>
                              {user.role !== 'admin' ? (
                                <button
                                  onClick={() => {
                                    setIsProfileOpen(false);
                                    navigate('/login');
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors text-left"
                                >
                                  <User size={14} />
                                  <span>My Dashboard</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setIsProfileOpen(false);
                                    navigate('/admin');
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-indigo-700 hover:bg-indigo-50 text-xs font-bold transition-colors text-left cursor-pointer"
                                >
                                  <ShieldCheck size={14} />
                                  <span>Admin Panel</span>
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setIsProfileOpen(false);
                                  logout();
                                  navigate('/');
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold transition-colors text-left cursor-pointer"
                              >
                                <LogOut size={14} />
                                <span>Sign Out</span>
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className={`flex items-center gap-1.5 text-[14.5px] font-display font-normal transition-all py-2 px-4 rounded-xl border cursor-pointer group/login ${darkTheme
                      ? 'border-white/10 hover:border-orange-400 bg-white/5 hover:bg-orange-400 text-slate-200 hover:text-slate-950'
                      : 'border-[#110051]/20 hover:border-[#110051] bg-[#110051]/5 hover:bg-[#110051] text-[#110051] hover:text-white'
                      }`}
                  >
                    <LogIn size={16} className={`transition-colors ${darkTheme ? 'text-slate-400 group-hover/login:text-slate-950' : 'text-[#110051] group-hover/login:text-white'}`} />
                    <span>Login</span>
                  </Link>
                )}

                <button
                  onClick={handleCounsellingClick}
                  className="whitespace-nowrap relative group overflow-hidden px-5 py-2.5 rounded-xl bg-[#110051] text-white hover:bg-[#1a0073] text-[14.5px] font-display font-semibold shadow-md shadow-indigo-950/20 hover:shadow-lg hover:shadow-indigo-950/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
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
                  className={`p-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center ${darkTheme
                    ? 'text-slate-300 hover:text-[rgb(106,255,217)] hover:bg-white/5'
                    : 'text-slate-600 hover:text-[rgb(17,0,81)] hover:bg-slate-50'
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
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${darkTheme ? 'text-slate-200 hover:text-orange-400 hover:bg-white/5' : 'text-slate-700 hover:text-[#110051] hover:bg-slate-50'}`}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          />
        )}

        {isOpen && (
          <motion.div
            key="drawer-container"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 w-80 max-w-[85vw] h-full z-50 shadow-2xl p-6 overflow-y-auto flex flex-col lg:hidden transition-colors duration-300 ${darkTheme
              ? 'bg-slate-950 text-white border-l border-white/10'
              : 'bg-white text-slate-800'
              }`}
          >
            {/* Drawer Header with themed logo and close button */}
            <div className={`flex items-center justify-between pb-6 border-b transition-colors ${darkTheme ? 'border-white/10' : 'border-slate-100'
              }`}>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  toggleMenu();
                  if (window.location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigate('/');
                  }
                }}
              >
                <span className={`font-display font-extrabold text-2xl tracking-tight leading-none ${darkTheme ? 'text-white' : 'text-[#110051]'
                  }`}>
                  edeco
                </span>
              </div>
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${darkTheme
                  ? 'text-slate-400 hover:text-white hover:bg-white/5'
                  : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
                  }`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 py-6 space-y-6">
              {Object.entries(menuItems).map(([key, item]) => {
                const ItemIcon = item.icon;
                return (
                  <div key={key} className="space-y-2.5">
                    {/* Category Title */}
                    <div className={`flex items-center gap-2 px-1 text-[11px] font-bold uppercase tracking-wider ${darkTheme ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                      {ItemIcon && <ItemIcon size={14} className={darkTheme ? 'text-slate-500' : 'text-slate-400'} />}
                      <span>{item.title}</span>
                    </div>

                    {/* Category Links List */}
                    <ul className="space-y-1">
                      {item.columns.flatMap(c => c.links).map((link, idx) => {
                        const LinkIcon = link.icon;

                        const LinkContent = (
                          <div className="flex items-start gap-3 w-full">
                            {LinkIcon && (
                              <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${darkTheme
                                ? 'bg-white/5 text-slate-400 group-hover/drawerlink:bg-white/10 group-hover/drawerlink:text-white'
                                : 'bg-slate-50 text-slate-500 group-hover/drawerlink:bg-slate-100 group-hover/drawerlink:text-[#110051]'
                                }`}>
                                <LinkIcon size={14} />
                              </div>
                            )}
                            <div className="flex-1 min-w-0 text-left">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[13.5px] font-semibold truncate">
                                  {link.name}
                                </span>
                                {link.badge && (
                                  <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded shrink-0 uppercase tracking-wider ${darkTheme ? 'bg-white/10 text-white' : 'bg-[#110051]/10 text-[#110051]'
                                    }`}>
                                    {link.badge}
                                  </span>
                                )}
                                {link.actionType === "compare" && compareCount > 0 && (
                                  <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full text-white ${darkTheme ? 'bg-[rgb(106,255,217)] text-slate-950' : 'bg-[#110051]'}`}>
                                    {compareCount}
                                  </span>
                                )}
                              </div>
                              {link.desc && (
                                <p className="text-[11px] text-slate-400 mt-0.5 font-normal truncate">
                                  {link.desc}
                                </p>
                              )}
                            </div>
                          </div>
                        );

                        return (
                          <li key={idx}>
                            {link.isAction ? (
                              <button
                                onClick={() => {
                                  toggleMenu();
                                  if (link.actionType === "compare") {
                                    handleCompareClick();
                                  } else {
                                    handleCounsellingClick();
                                  }
                                }}
                                className={`w-full group/drawerlink flex items-start p-2.5 rounded-xl transition-colors cursor-pointer ${darkTheme
                                  ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#110051]'
                                  }`}
                              >
                                {LinkContent}
                              </button>
                            ) : (
                              <Link
                                to={link.href}
                                onClick={toggleMenu}
                                className={`group/drawerlink flex items-start p-2.5 rounded-xl transition-colors ${darkTheme
                                  ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#110051]'
                                  }`}
                              >
                                {LinkContent}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}

              {/* Resources Shortcut */}
              <div className={`pt-4 border-t transition-colors ${darkTheme ? 'border-white/10' : 'border-slate-100'}`}>
                <Link
                  to="/resources"
                  onClick={toggleMenu}
                  className={`w-full flex items-center gap-2 p-2.5 rounded-xl text-[14px] font-semibold transition-colors ${darkTheme
                    ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#110051]'
                    }`}
                >
                  <BookOpen size={16} className={darkTheme ? 'text-slate-400' : 'text-slate-500'} />
                  <span>Resources</span>
                </Link>
              </div>

              {/* Events Shortcut */}
              <div className="pt-1">
                <Link
                  to="/events"
                  onClick={toggleMenu}
                  className={`w-full flex items-center gap-2 p-2.5 rounded-xl text-[14px] font-semibold transition-colors ${darkTheme
                    ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#110051]'
                    }`}
                >
                  <Sparkles size={16} className={darkTheme ? 'text-slate-400' : 'text-slate-500'} />
                  <span>Events</span>
                </Link>
              </div>

              {/* Compare Colleges Shortcut */}
              <div className={`pt-4 border-t transition-colors ${darkTheme ? 'border-white/10' : 'border-slate-100'
                }`}>
                <button
                  onClick={() => { toggleMenu(); handleCompareClick(); }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-[14px] font-semibold transition-colors cursor-pointer ${darkTheme
                    ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#110051]'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <GitCompare size={16} />
                    Compare Colleges
                  </span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold transition-colors ${darkTheme ? 'bg-white/10 text-white' : 'bg-slate-100 text-[#110051]'
                    }`}>
                    {compareCount} Selected
                  </span>
                </button>
              </div>

              {/* Collapsible Find Us & Branches accordion */}
              <div className={`border-t pt-4 transition-colors ${darkTheme ? 'border-white/10' : 'border-slate-100'}`}>
                <button
                  onClick={() => setExpandedCategory(expandedCategory === 'contact' ? null : 'contact')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-[14px] font-semibold transition-colors cursor-pointer ${darkTheme
                    ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#110051]'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Compass size={16} />
                    Find Us & Branches
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${expandedCategory === 'contact' ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {expandedCategory === 'contact' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4 pr-2 mt-1 space-y-1 text-left"
                    >
                      {/* Mobile support link */}
                      <Link
                        to="/contact"
                        onClick={toggleMenu}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13.5px] font-bold transition-colors ${darkTheme
                          ? 'text-slate-300 hover:text-white hover:bg-white/5'
                          : 'text-[#110051] hover:bg-slate-50'
                          }`}
                      >
                        <PhoneCall size={14} />
                        <span>Get in Touch / Support</span>
                      </Link>

                      {/* Mobile branches heading */}
                      <div className={`text-[10px] font-bold uppercase tracking-wider px-3 pt-2 pb-1 ${darkTheme ? 'text-slate-500' : 'text-slate-400'}`}>
                        Our Branches
                      </div>

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
                          onClick={toggleMenu}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${darkTheme
                            ? 'text-slate-400 hover:text-white hover:bg-white/5'
                            : 'text-slate-600 hover:text-[#110051] hover:bg-slate-50'
                            }`}
                        >
                          <span>{state}</span>
                          <ChevronRight size={12} className="text-slate-400" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Drawer Actions */}
            <div className={`pt-6 border-t space-y-3 transition-colors ${darkTheme ? 'border-white/10' : 'border-slate-100'
              }`}>
              <button
                onClick={() => { toggleMenu(); handleCounsellingClick(); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm shadow-md transition-all duration-300 cursor-pointer bg-[#110051] hover:bg-[#1a0073] text-white shadow-indigo-950/20"
              >
                <PhoneCall size={16} />
                Book Call with Expert
              </button>

              {isLoggedIn && user ? (
                <div className={`p-4 border rounded-2xl flex flex-col gap-3 transition-colors ${darkTheme
                  ? 'bg-slate-900 border-white/5'
                  : 'bg-slate-50 border-slate-200'
                  }`}>
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className={`w-10 h-10 rounded-xl object-cover border ${darkTheme ? 'border-white/10' : 'border-slate-200'
                        }`}
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className={`font-extrabold text-sm truncate ${darkTheme ? 'text-white' : 'text-slate-900'}`}>{user.name}</h4>
                      <p className="text-xs text-slate-500 font-semibold truncate">{user.email}</p>
                    </div>
                  </div>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => { toggleMenu(); navigate('/admin'); }}
                      className="w-full py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-100"
                    >
                      <ShieldCheck size={14} />
                      Admin Panel
                    </button>
                  )}
                  <button
                    onClick={() => { toggleMenu(); logout(); navigate('/'); }}
                    className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${darkTheme
                      ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/10'
                      : 'bg-red-55/70 hover:bg-red-100 text-red-600 border-red-100'
                      }`}
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition-all duration-200 ${darkTheme
                    ? 'border-white/10 text-slate-300 hover:bg-white hover:text-[#110051] hover:border-white'
                    : 'border-slate-200 text-slate-700 hover:bg-[#110051] hover:text-white hover:border-[#110051]'
                    }`}
                >
                  <LogIn size={16} />
                  Log In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation Bar (Home | Search | Compare | Exams | Profile) */}
      <div className={`lg:hidden fixed bottom-0 left-0 w-full py-2.5 px-4 flex items-center justify-around z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] backdrop-blur-lg border-t transition-colors duration-300 ${darkTheme
        ? 'bg-slate-950/90 border-white/10 text-slate-400'
        : 'bg-white/90 border-slate-100 text-slate-500'
        }`}>
        <Link
          to="/"
          className={`flex flex-col items-center gap-0.5 transition-colors ${isActive('/')
            ? (darkTheme ? 'text-white font-bold' : 'text-[#110051] font-bold')
            : (darkTheme ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#110051]')
            }`}
        >
          <Compass size={20} className="transition-colors text-current" />
          <span className="text-[10px] font-semibold">Home</span>
        </Link>

        <Link
          to="/events"
          className={`flex flex-col items-center gap-0.5 transition-colors ${isActive('/events')
            ? (darkTheme ? 'text-white font-bold' : 'text-[#110051] font-bold')
            : (darkTheme ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#110051]')
            }`}
        >
          <BookOpen size={20} className="transition-colors text-current" />
          <span className="text-[10px] font-semibold">Events</span>
        </Link>

        <Link
          to="/exam/jee-main"
          className={`flex flex-col items-center gap-0.5 transition-colors ${isExamsActive()
            ? (darkTheme ? 'text-white font-bold' : 'text-[#110051] font-bold')
            : (darkTheme ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#110051]')
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
            className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${darkTheme ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#110051]'
              }`}
          >
            <img src={user.avatar} alt="Profile" className={`w-5 h-5 rounded-lg object-cover border ${darkTheme ? 'border-white/20' : 'border-slate-300'
              }`} />
            <span className="text-[10px] font-bold">{user.role === 'admin' ? 'Admin' : 'Profile'}</span>
          </button>
        ) : (
          <button
            onClick={handleCounsellingClick}
            className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${darkTheme ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#110051]'
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
