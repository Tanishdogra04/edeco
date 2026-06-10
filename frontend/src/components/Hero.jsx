import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Star, ShieldCheck, Users, ChevronRight, Award, MessageCircle, Play, BadgeCheck, TrendingUp } from 'lucide-react';
import educationPlatformHero from '../assets/education_platform_hero.png';

export default function Hero({ onSearchSubmit, onCounsellingClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const dropdownRef = useRef(null);

  const categories = [
    { name: "Engineering", icon: "💻" },
    { name: "MBA", icon: "📈" },
    { name: "Medical", icon: "🩺" },
    { name: "Law", icon: "⚖️" },
    { name: "Design", icon: "🎨" },
    { name: "Commerce", icon: "📊" }
  ];

  const collegeSuggestions = [
    { name: "Indian Institute of Technology (IIT) Bombay", type: "Engineering", rating: "4.9", location: "Mumbai" },
    { name: "Indian Institute of Management (IIM) Ahmedabad", type: "MBA", rating: "4.9", location: "Ahmedabad" },
    { name: "All India Institute of Medical Sciences (AIIMS)", type: "Medical", rating: "4.8", location: "Delhi" },
    { name: "National Law School of India University (NLSIU)", type: "Law", rating: "4.7", location: "Bangalore" },
    { name: "National Institute of Design (NID)", type: "Design", rating: "4.6", location: "Ahmedabad" },
    { name: "BITS Pilani", type: "Engineering", rating: "4.7", location: "Pilani" },
    { name: "FMS Delhi", type: "MBA", rating: "4.8", location: "Delhi" },
    { name: "Symbiosis Institute of Design", type: "Design", rating: "4.4", location: "Pune" }
  ];

  const filteredSuggestions = collegeSuggestions.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setShowSuggestions(false);
    onSearchSubmit(name);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      onSearchSubmit(searchTerm);
    }
  };

  return (
    <section className="relative min-h-screen bg-white pt-20 pb-16 lg:pt-24 lg:pb-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Heading and Search */}
          <div className="lg:col-span-7 text-left space-y-8">

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-white">
                <Sparkles size={11} className="text-white" />
              </div>
              <span className="text-[12px] font-bold text-slate-700 tracking-wide uppercase">
                98% College Match Accuracy
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-[56px] text-slate-900 leading-[1.15] tracking-tight">
                Find the right college. <br />
                <span className="text-slate-900">Shape your future.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                Connect with institutional partners, compare placement statistics, and get personalized counseling driven by career analytics.
              </p>
            </motion.div>

            {/* Large Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative max-w-2xl"
              ref={dropdownRef}
            >
              <div className="flex items-center gap-2 p-2 bg-white rounded-2xl shadow-md shadow-slate-100/50 border border-slate-200 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-100 transition-all duration-300">
                <div className="pl-3 text-slate-400">
                  <Search size={22} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyPress={handleSearchKeyPress}
                  placeholder="Search for colleges, exams (e.g. IIT, MBA, NEET)..."
                  className="w-full py-3.5 px-2 bg-transparent text-slate-800 placeholder-slate-400 text-[15px] font-medium outline-none"
                />

                <button
                  onClick={() => onSearchSubmit(searchTerm)}
                  className="px-6 py-3.5 rounded-xl bg-[#110051] text-white hover:bg-[#1a0073] text-[15px] font-bold shadow-md active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  Search
                </button>
              </div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && searchTerm && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 overflow-hidden divide-y divide-slate-100"
                  >
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSuggestionClick(item.name)}
                          className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <div className="flex flex-col text-left">
                            <span className="text-[14px] font-bold text-slate-800">{item.name}</span>
                            <span className="text-[12px] text-slate-400 mt-0.5">{item.location} • {item.type}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-slate-50 text-slate-600 px-2 py-0.5 rounded-lg text-xs font-bold border border-slate-100">
                            <Star size={12} fill="currentColor" className="text-amber-400" />
                            {item.rating}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-slate-400 text-[14px]">
                        No matching colleges found. Try "MBA" or "Engineering"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Category Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-3"
            >
              <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block">
                Popular Streams:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setSearchTerm(cat.name);
                      onSearchSubmit(cat.name);
                    }}
                    className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl border text-[13px] font-bold transition-all duration-200 cursor-pointer ${selectedCategory === cat.name
                      ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-800 hover:text-slate-900'
                      }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href="#colleges"
                className="px-6 py-3.5 rounded-xl bg-[#110051] hover:bg-[#1a0073] text-white text-[15px] font-bold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Start Exploring
              </a>
            </motion.div>
          </div>

          {/* Right Column: Premium Illustration */}
          <div className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-[500px]"
            >
              <img
                src={educationPlatformHero}
                alt="Education Platform Hero"
                className="w-full h-auto object-contain drop-shadow-xl rounded-2xl"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
