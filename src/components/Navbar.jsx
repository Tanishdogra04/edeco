import React, { useState, useEffect } from 'react';
import {
  Menu, X, ChevronDown, ChevronRight, GitCompare, Compass,
  GraduationCap, Globe, BookOpen, User, PhoneCall, LogIn, LogOut,
  Sparkles, Award, BookOpenCheck, ArrowRight, Laptop, HeartPulse, Scale, Palette
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
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

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
  const isExamsActive = () => window.location.pathname.startsWith('/exam/');

  const menuItems = {
    explore: {
      title: "Explore",
      subtitle: "Discover colleges & paths",
      icon: Compass,
      columns: [
        {
          title: "Top Domains",
          links: [
            { name: "Engineering Colleges", href: "/stream/engineering", icon: Laptop },
            { name: "Business Schools", href: "/stream/management", icon: GraduationCap },
            { name: "Medical Institutes", href: "/stream/medical", icon: HeartPulse },
            { name: "Law Academies", href: "/stream/law", icon: Scale },
          ]
        },
        {
          title: "Premium Services",
          links: [
            { name: "Admission Guidance", href: "/premium", icon: Sparkles, badge: "Popular" },
            { name: "AI College Finder", href: "/premium#features", icon: Award },
            { name: "Expert Consultation", href: "/premium#features", icon: PhoneCall },
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

    blogs: {
      title: "Resources",
      subtitle: "Latest news & insights",
      icon: BookOpen,
      columns: [
        {
          title: "Latest Content",
          links: [
            { name: "All Resources", href: "/resources" },
            { name: "College Comparison Guides", href: "/resources?category=Guides" },
            { name: "Exam Strategy & Preparation", href: "/resources?category=Strategies" },
            { name: "Admission Policy Updates", href: "/resources?category=Updates", badge: "New" },
            { name: "Student Success Stories", href: "/resources?category=Success+Stories" },
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
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        darkTheme 
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-white/10 shadow-sm' 
          : 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)]'
      }`}>
        {/* Upper Header */}
        <div className={`hidden lg:block border-b transition-colors duration-300 ${
          darkTheme ? 'border-white/5 bg-slate-950/40' : 'border-purple-100/30 bg-purple-50/45'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-6 text-[13.5px] font-normal text-slate-500">
            {/* Links aligned on the right next to contacts */}
            <div className="flex items-center gap-2 ml-auto">
              <Link to="/premium" className={`font-display font-normal px-2 py-1 rounded-md transition-all duration-200 ${darkTheme ? 'text-slate-300 hover:text-white hover:bg-[#110051]' : 'text-slate-900 hover:text-white hover:bg-[#110051]'}`}>
                Advice
              </Link>
              <Link to="/resources" className={`font-display font-normal px-2 py-1 rounded-md transition-all duration-200 ${darkTheme ? 'text-slate-300 hover:text-white hover:bg-[#110051]' : 'text-slate-900 hover:text-white hover:bg-[#110051]'}`}>
                Events
              </Link>
              <div className="relative group py-1">
                <button className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200 cursor-pointer font-display font-normal ${darkTheme ? 'text-slate-300 hover:text-white hover:bg-[#110051]' : 'text-slate-900 hover:text-white hover:bg-[#110051]'}`}>
                  <span>Find us</span>
                  <ChevronDown size={12} className="text-slate-450 group-hover:text-white transition-colors" />
                </button>
                {/* Dropdown list */}
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200/85 rounded-2xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 overflow-hidden text-left">
                  {/* Dropdown Heading */}
                  <div className="px-4 py-3 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2">
                    <Compass size={14} className="text-[#110051]" />
                    <span className="font-display font-bold text-[13px] text-[#110051]">
                      Find nearest AECC office
                    </span>
                  </div>
                  {/* Dropdown Options */}
                  <div className="max-h-72 overflow-y-auto">
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
                        to="/contact"
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

            {/* Right side contact links & country selector */}
            <div className="flex items-center gap-3">
              {/* Phone Pill */}
              <a 
                href="tel:18005724422" 
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[rgb(106,255,217)] hover:bg-[rgb(17,0,81)] text-[#110051] hover:text-white border border-[rgb(106,255,217)]/35 font-display font-bold text-[14px] transition-all duration-200 shadow-xs group/phone"
              >
                <PhoneCall size={12} className="text-[#110051] group-hover/phone:text-white transition-colors" />
                <span>1800 572 4422</span>
              </a>

              {/* WhatsApp Pill */}
              <a 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-[14px] font-display font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-offset-2 focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-[rgb(106,255,217)] text-[#110051] hover:bg-[rgb(17,0,81)] hover:text-white h-8 gap-1.5 px-4.5 hover:opacity-100 shadow-none border border-[rgb(106,255,217)]/35 flex items-center group/wa" 
                data-slot="button" 
                id="whatsappBtn" 
                href="/api/whatsapp?phone=918130784777&amp;url=https%3A%2F%2Fwww.aeccglobal.com%2Fin" 
                target="_blank" 
                rel="nofollow noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="fill-[#110051] group-hover/wa:fill-white transition-colors">
                  <g clipPath="url(#clip0_1_11374)">
                    <path d="M11.8392 9.19396C11.8081 9.17899 10.6416 8.6046 10.4344 8.53001C10.3497 8.49962 10.2591 8.46996 10.1627 8.46996C10.0052 8.46996 9.87285 8.54845 9.76978 8.70263C9.65326 8.87582 9.30054 9.28814 9.19155 9.41131C9.17732 9.42757 9.15789 9.44699 9.14625 9.44699C9.13581 9.44699 8.95529 9.37266 8.90064 9.34892C7.64937 8.80538 6.6996 7.49832 6.56937 7.2779C6.55077 7.24621 6.54999 7.23183 6.54984 7.23183C6.55441 7.21505 6.59649 7.17286 6.6182 7.1511C6.68173 7.08824 6.75056 7.00538 6.81716 6.92523C6.84869 6.88725 6.88028 6.84923 6.91129 6.81338C7.00791 6.70097 7.05093 6.6137 7.1008 6.5126L7.12693 6.46008C7.24869 6.21816 7.14469 6.01401 7.11108 5.94808C7.0835 5.89292 6.59098 4.70424 6.53862 4.57936C6.41269 4.27801 6.2463 4.1377 6.01508 4.1377C5.99363 4.1377 6.01508 4.1377 5.92511 4.14149C5.81555 4.14611 5.21893 4.22466 4.95514 4.39094C4.6754 4.56731 4.20215 5.12949 4.20215 6.11816C4.20215 7.00798 4.76682 7.84814 5.00927 8.16767C5.01529 8.17572 5.02636 8.19209 5.04241 8.21557C5.97088 9.57151 7.12833 10.5764 8.30168 11.0451C9.43129 11.4963 9.9662 11.5485 10.2703 11.5485H10.2704C10.3981 11.5485 10.5004 11.5385 10.5907 11.5296L10.6479 11.5241C11.0381 11.4895 11.8957 11.0452 12.0908 10.5031C12.2444 10.0761 12.285 9.60964 12.1827 9.44034C12.1127 9.32523 11.992 9.26731 11.8392 9.19396Z" fill="currentColor"></path>
                    <path d="M8.14201 0C3.80871 0 0.283313 3.49891 0.283313 7.79964C0.283313 9.19065 0.655572 10.5523 1.36077 11.7439L0.0110009 15.7255C-0.0141419 15.7997 0.00455936 15.8818 0.0594684 15.9377C0.0991048 15.9782 0.152871 16 0.20778 16C0.228819 16 0.250014 15.9968 0.270689 15.9902L4.42238 14.671C5.55848 15.278 6.84253 15.5984 8.14207 15.5984C12.4749 15.5984 16 12.0999 16 7.79964C16 3.49891 12.4749 0 8.14201 0ZM8.14201 13.9737C6.91921 13.9737 5.73484 13.6206 4.71677 12.9526C4.68253 12.9301 4.64279 12.9185 4.60279 12.9185C4.58165 12.9185 4.56045 12.9218 4.53983 12.9283L2.46009 13.5894L3.13147 11.6087C3.15318 11.5446 3.14233 11.4739 3.10233 11.4192C2.32705 10.3599 1.91723 9.10831 1.91723 7.79964C1.91723 4.39481 4.70965 1.62473 8.14196 1.62473C11.5739 1.62473 14.366 4.39481 14.366 7.79964C14.366 11.2041 11.574 13.9737 8.14201 13.9737Z" fill="currentColor"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_1_11374">
                      <rect width="16" height="16" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Country Selector Pill */}
              <div className="relative group py-1">
                <button 
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[rgb(17,0,81)] border border-slate-200 hover:border-[rgb(17,0,81)] text-slate-900 hover:text-white font-display font-bold text-[14px] transition-all duration-200 shadow-xs cursor-pointer group/country"
                >
                  <span className="text-[12px] leading-none" role="img" aria-label="India flag">🇮🇳</span>
                  <span>India</span>
                  <ChevronDown size={12} className="text-slate-450 group-hover/country:text-white transition-colors" />
                </button>
                {/* Country selector dropdown */}
                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-100 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 py-1.5 text-slate-700 text-left">
                  <button className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-[13px] font-semibold text-slate-800 text-left">
                    <span>🇮🇳</span> India
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-[13px] font-semibold text-slate-800 text-left">
                    <span>🇳🇵</span> Nepal
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-[13px] font-semibold text-slate-800 text-left">
                    <span>🇧🇩</span> Bangladesh
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-[13px] font-semibold text-slate-800 text-left">
                    <span>🇱🇰</span> Sri Lanka
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div 
                className="flex items-center cursor-pointer" 
                onClick={() => {
                  if (window.location.pathname === '/') {
                    window.scrollTo({top:0, behavior:'smooth'});
                  } else {
                    navigate('/');
                  }
                }}
              >
                <span className="font-display font-extrabold text-3xl tracking-tight text-[#110051] leading-none">
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
                      <button className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-[14.5px] font-display font-normal transition-all duration-200 cursor-pointer ${darkTheme ? 'text-slate-300 hover:text-white hover:bg-[#110051]' : 'text-slate-900 hover:text-white hover:bg-[#110051]'}`}>
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
                                              handleCounsellingClick();
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

                <button
                  onClick={handleCompareClick}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[14.5px] font-display font-normal transition-all duration-200 cursor-pointer ${darkTheme ? 'text-slate-300 hover:text-white hover:bg-[#110051]' : 'text-slate-900 hover:text-white hover:bg-[#110051]'}`}
                >
                  <span>Compare</span>
                  {compareCount > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-600 text-[11px] font-bold text-white shadow-sm shadow-brand-500/35 animate-bounce">
                      {compareCount}
                    </span>
                  )}
                </button>

                <Link to="/contact" className={`px-2 py-1.5 rounded-lg text-[14.5px] font-display font-normal transition-all ${darkTheme ? 'text-slate-300 hover:text-white hover:bg-[#110051]' : 'text-slate-900 hover:text-white hover:bg-[#110051]'}`}>
                  Contact
                </Link>
              </div>

              {/* Navbar actions */}
              <div className="hidden lg:flex items-center gap-4">
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
                              <div className="px-3 py-1 text-[9px] font-black text-slate-400 uppercase tracking-widest">Student Portal</div>
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
                    className={`flex items-center gap-1.5 text-[14.5px] font-display font-normal transition-all py-2 px-4 rounded-xl border cursor-pointer group/login ${
                      darkTheme 
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
                  className="whitespace-nowrap relative group overflow-hidden px-5 py-2.5 rounded-xl bg-[rgb(106,255,217)] text-[#110051] hover:text-white text-[14.5px] font-display font-normal shadow-md shadow-brand-mint/20 hover:shadow-lg hover:shadow-[#110051]/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Sparkles size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                    Free Counselling
                  </span>
                  <div className="absolute inset-0 bg-[#110051] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>

              {/* Mobile Actions and Hamburger */}
              <div className="flex items-center gap-3 lg:hidden relative z-[60]">
                <button
                  onClick={handleCompareClick}
                  className={`relative p-2 rounded-xl transition-colors cursor-pointer ${darkTheme ? 'text-slate-300 hover:text-orange-400 hover:bg-white/5' : 'text-slate-600 hover:text-brand-800 hover:bg-slate-50'}`}
                >
                  <GitCompare size={20} />
                  {compareCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-brand-600 text-[10px] font-bold text-white">
                      {compareCount}
                    </span>
                  )}
                </button>

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

        {/* Mobile Slide Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={toggleMenu}
                className="fixed inset-0 bg-slate-900 z-40 lg:hidden"
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-white z-50 shadow-2xl p-6 overflow-y-auto flex flex-col lg:hidden"
              >
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <span className="font-display font-bold text-xl text-slate-800">Navigation</span>
                </div>

                <div className="flex-1 py-6 space-y-5">
                  {Object.entries(menuItems).map(([key, item]) => (
                    <div key={key} className="space-y-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        {item.title}
                      </span>
                      <ul className="space-y-1 pl-1">
                        {item.columns.flatMap(c => c.links).map((link, idx) => (
                          <li key={idx}>
                            {link.isAction ? (
                              <button
                                onClick={() => { toggleMenu(); handleCounsellingClick(); }}
                                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-[14px] text-slate-700 font-medium hover:text-[#110051] transition-colors cursor-pointer"
                              >
                                <span>{link.name}</span>
                                {link.badge && (
                                  <span className="px-1.5 py-0.5 text-[8px] font-bold bg-slate-50 text-[#110051] rounded">
                                    {link.badge}
                                  </span>
                                )}
                              </button>
                            ) : (
                              <Link
                                to={link.href}
                                onClick={toggleMenu}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-[14px] text-slate-700 font-medium hover:text-[#110051] transition-colors"
                              >
                                <span>{link.name}</span>
                                {link.badge && (
                                  <span className="px-1.5 py-0.5 text-[8px] font-bold bg-slate-50 text-[#110051] rounded">
                                    {link.badge}
                                  </span>
                                )}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={() => { toggleMenu(); handleCompareClick(); }}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-[14px] text-slate-700 font-semibold hover:text-[#110051] cursor-pointer"
                    >
                      <span>Compare Colleges</span>
                      <span className="bg-slate-100 text-[#110051] text-[11px] px-2 py-0.5 rounded-full font-bold">
                        {compareCount} Selected
                      </span>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <button
                    onClick={() => { toggleMenu(); handleCounsellingClick(); }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[rgb(106,255,217)] hover:bg-[#110051] text-[#110051] hover:text-white font-semibold text-sm shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <Sparkles size={16} />
                    Free Counselling
                  </button>
                  {isLoggedIn && user ? (
                    <div className="p-4 bg-slate-50 border border-slate-250 rounded-2xl flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-extrabold text-sm text-slate-900 truncate">{user.name}</h4>
                          <p className="text-xs text-slate-500 font-semibold truncate">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { toggleMenu(); logout(); navigate('/'); }}
                        className="w-full py-2.5 rounded-xl bg-red-55/70 hover:bg-red-100 text-red-600 border border-red-100 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <Link 
                      to="/login"
                      onClick={toggleMenu}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-[#110051] hover:text-white hover:border-[#110051] transition-all duration-200"
                    >
                      <LogIn size={16} />
                      Log In
                    </Link>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Bottom Navigation Bar (Home | Search | Compare | Exams | Profile) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-100 py-2.5 px-4 flex items-center justify-around z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
        <Link
          to="/"
          className={`flex flex-col items-center gap-0.5 transition-colors ${isActive('/') ? 'text-[#110051] font-bold' : 'text-slate-500 hover:text-[#110051]'}`}
        >
          <Compass size={20} className="transition-colors text-current" />
          <span className="text-[10px] font-semibold">Home</span>
        </Link>

        <button
          onClick={handleCompareClick}
          className="relative flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#110051] transition-colors cursor-pointer"
        >
          <GitCompare size={20} className="transition-colors text-current" />
          <span className="text-[10px] font-semibold">Compare</span>
          {compareCount > 0 && (
            <span className="absolute -top-1.5 right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#110051] text-[9px] font-bold text-white shadow-sm shadow-brand-500/30">
              {compareCount}
            </span>
          )}
        </button>

        <Link
          to="/exam/jee-main"
          className={`flex flex-col items-center gap-0.5 transition-colors ${isExamsActive() ? 'text-[#110051] font-bold' : 'text-slate-500 hover:text-[#110051]'}`}
        >
          <BookOpenCheck size={20} className="transition-colors text-current" />
          <span className="text-[10px] font-semibold">Exams</span>
        </Link>

        {isLoggedIn && user ? (
          <button
            onClick={() => {
              navigate('/login');
            }}
            className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#110051] transition-colors cursor-pointer"
          >
            <img src={user.avatar} alt="Profile" className="w-5 h-5 rounded-lg object-cover border border-slate-300" />
            <span className="text-[10px] font-bold">Profile</span>
          </button>
        ) : (
          <button
            onClick={handleCounsellingClick}
            className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-[#110051] transition-colors cursor-pointer"
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
