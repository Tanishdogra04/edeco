import React, { useState, useEffect } from 'react';
import {
  Menu, X, ChevronDown, GitCompare, Compass,
  GraduationCap, Globe, BookOpen, User, PhoneCall, LogIn,
  Sparkles, Award, BookOpenCheck, ArrowRight, Laptop, HeartPulse, Scale, Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar({ onCounsellingClick, onCompareClick, compareCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

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
            { name: "Admission Guidance", href: "#counselling", isAction: true, icon: Sparkles, badge: "Popular" },
            { name: "AI College Finder", href: "#counselling", isAction: true, icon: Award },
            { name: "Expert Consultation", href: "#counselling", isAction: true, icon: PhoneCall },
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
            { name: "College Comparison Guides", href: "/news/jee-main-cutoff" },
            { name: "Exam Strategy & Preparation", href: "/news/gen-ai-mba" },
            { name: "Admission Policy Updates", href: "/news/ugc-guidelines", badge: "New" },
            { name: "Student Success Stories", href: "/news/jee-main-cutoff" },
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
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-100 shadow-sm py-3'
          : 'bg-transparent py-5'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer px-3.5 py-1.5 rounded-full bg-slate-50/50 hover:bg-slate-100/70 border border-slate-100/40 hover:border-slate-200/50 shadow-sm transition-all duration-300 group" 
              onClick={() => {
                if (window.location.pathname === '/') {
                  window.scrollTo({top:0, behavior:'smooth'});
                } else {
                  navigate('/');
                }
              }}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
                <GraduationCap size={20} className="animate-pulse-slow" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                <span className="text-gradient">Ed</span>
                <span className="text-slate-800">Evolving</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 ml-8">
              {Object.entries(menuItems).map(([key, item]) => {
                return (
                  <div
                    key={key}
                    className="relative group py-2"
                    onMouseEnter={() => handleDropdownHover(key)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[15px] font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition-all duration-200">
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
                                          <span className="text-[14px] font-semibold text-slate-800 group-hover/item:text-brand-600 transition-colors">
                                            {link.name}
                                          </span>
                                          {link.badge && (
                                            <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase bg-gradient-brand text-white rounded-md">
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
                                            onCounsellingClick();
                                          }}
                                          className="w-full text-left group/item flex items-start gap-3 p-2 rounded-xl hover:bg-brand-50/50 transition-all duration-200"
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
                                        className="group/item flex items-start gap-3 p-2 rounded-xl hover:bg-brand-50/50 transition-all duration-200"
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
                            <button onClick={() => { setActiveDropdown(null); onCounsellingClick(); }} className="flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700 transition-colors group/link cursor-pointer">
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
                onClick={onCompareClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[15px] font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition-all duration-200"
              >
                <span>Compare</span>
                {compareCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-600 text-[11px] font-bold text-white shadow-sm shadow-brand-500/35 animate-bounce">
                    {compareCount}
                  </span>
                )}
              </button>

              <Link to="/contact" className="px-3 py-1.5 rounded-lg text-[15px] font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition-all">
                Contact
              </Link>
            </div>

            {/* Navbar actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/login" className="flex items-center gap-1.5 text-[15px] font-semibold text-slate-700 hover:text-brand-600 transition-colors py-2 px-3">
                <LogIn size={16} />
                <span>Login</span>
              </Link>

              <button
                onClick={onCounsellingClick}
                className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-brand text-white text-[15px] font-semibold shadow-lg shadow-brand-600/20 hover:shadow-brand-600/35 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <Sparkles size={16} className="animate-spin-slow" />
                  Free Counselling
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>

            {/* Mobile Actions and Hamburger */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={onCompareClick}
                className="relative p-2 rounded-xl text-slate-600 hover:text-brand-600 hover:bg-slate-50"
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
                className="p-2 rounded-xl text-slate-700 hover:text-brand-600 hover:bg-slate-50 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
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
                  <button onClick={toggleMenu} className="p-1 rounded-lg text-slate-500 hover:bg-slate-50">
                    <X size={20} />
                  </button>
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
                                onClick={() => { toggleMenu(); onCounsellingClick(); }}
                                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-[14px] text-slate-700 font-medium hover:text-brand-600 transition-colors"
                              >
                                <span>{link.name}</span>
                                {link.badge && (
                                  <span className="px-1.5 py-0.5 text-[8px] font-bold bg-brand-50 text-brand-600 rounded">
                                    {link.badge}
                                  </span>
                                )}
                              </button>
                            ) : (
                              <Link
                                to={link.href}
                                onClick={toggleMenu}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-[14px] text-slate-700 font-medium hover:text-brand-600 transition-colors"
                              >
                                <span>{link.name}</span>
                                {link.badge && (
                                  <span className="px-1.5 py-0.5 text-[8px] font-bold bg-brand-50 text-brand-600 rounded">
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
                      onClick={() => { toggleMenu(); onCompareClick(); }}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-[14px] text-slate-700 font-semibold hover:text-brand-600"
                    >
                      <span>Compare Colleges</span>
                      <span className="bg-brand-100 text-brand-600 text-[11px] px-2 py-0.5 rounded-full font-bold">
                        {compareCount} Selected
                      </span>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <button
                    onClick={() => { toggleMenu(); onCounsellingClick(); }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-brand text-white font-semibold text-sm shadow-md shadow-brand-500/25"
                  >
                    <Sparkles size={16} />
                    Free Counselling
                  </button>
                  <Link 
                    to="/login"
                    onClick={toggleMenu}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
                  >
                    <LogIn size={16} />
                    Log In
                  </Link>
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
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-brand-600 transition-colors"
        >
          <Compass size={20} className="text-slate-600 hover:text-brand-600" />
          <span className="text-[10px] font-semibold text-slate-500">Home</span>
        </Link>

        <button
          onClick={onCompareClick}
          className="relative flex flex-col items-center gap-0.5 text-slate-400 hover:text-brand-600 transition-colors"
        >
          <GitCompare size={20} className="text-slate-600 hover:text-brand-600" />
          <span className="text-[10px] font-semibold text-slate-500">Compare</span>
          {compareCount > 0 && (
            <span className="absolute -top-1.5 right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-brand-600 text-[9px] font-bold text-white shadow-sm shadow-brand-500/30">
              {compareCount}
            </span>
          )}
        </button>

        <Link
          to="/exam/jee-main"
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-brand-600 transition-colors"
        >
          <BookOpenCheck size={20} className="text-slate-600 hover:text-brand-600" />
          <span className="text-[10px] font-semibold text-slate-500">Exams</span>
        </Link>

        <button
          onClick={onCounsellingClick}
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-brand-600 transition-colors"
        >
          <User size={20} className="text-slate-600 hover:text-brand-600" />
          <span className="text-[10px] font-semibold text-slate-500">Counselling</span>
        </button>
      </div>
    </>
  );
}
