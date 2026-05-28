import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Star, ShieldCheck, Users, ChevronRight, Award, MessageCircle, Play, BadgeCheck, TrendingUp } from 'lucide-react';

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
    <section className="relative min-h-screen bg-gradient-premium pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Decorative Blur Background Blobs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[120px] animate-pulse-slow delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and Search */}
          <div className="lg:col-span-7 text-left space-y-8">
            
            {/* Trust badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100/50 shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center text-white">
                <Sparkles size={11} />
              </div>
              <span className="text-[12px] font-bold text-brand-700 tracking-wide uppercase">
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
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.1] tracking-tight">
                Find The Right College. <br />
                <span className="text-gradient">Shape Your Future.</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-xl font-normal leading-relaxed">
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
              <div className="flex items-center gap-2 p-2 bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 focus-within:border-brand-500/50 transition-all duration-300">
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
                  className="px-6 py-3.5 rounded-xl bg-gradient-brand text-white text-[15px] font-semibold hover:shadow-lg hover:shadow-brand-500/20 active:scale-[0.98] transition-all duration-200 cursor-pointer"
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
                    className="absolute left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-30 overflow-hidden divide-y divide-slate-50"
                  >
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map((item, idx) => (
                        <div 
                          key={idx}
                          onClick={() => handleSuggestionClick(item.name)}
                          className="flex items-center justify-between p-4 hover:bg-brand-50/30 cursor-pointer transition-colors"
                        >
                          <div className="flex flex-col text-left">
                            <span className="text-[14px] font-bold text-slate-800">{item.name}</span>
                            <span className="text-[12px] text-slate-400 mt-0.5">{item.location} • {item.type}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-lg text-xs font-bold">
                            <Star size={12} fill="currentColor" />
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
              <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block">
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
                    className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl border text-[13px] font-bold transition-all duration-200 cursor-pointer ${
                      selectedCategory === cat.name
                        ? 'bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-500/25'
                        : 'bg-white border-slate-100 text-slate-600 hover:border-brand-200 hover:bg-slate-50'
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
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[15px] font-semibold hover:shadow-lg transition-all duration-200"
              >
                Start Exploring
              </a>
              <button 
                onClick={onCounsellingClick}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[15px] font-semibold transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                  <Play size={12} fill="currentColor" />
                </div>
                <span>Book Call with Expert</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Premium App-like UI mockup */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            
            {/* Outer rotating decorative border */}
            <div className="absolute w-[440px] h-[440px] rounded-full border-2 border-dashed border-brand-200/50 animate-[spin_40s_linear_infinite]"></div>

            {/* Inner glow */}
            <div className="absolute w-[360px] h-[360px] bg-gradient-to-tr from-brand-500/20 to-brand-purple/20 rounded-full blur-3xl"></div>

            {/* Mock Dashboard container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-[400px] h-[460px] rounded-3xl bg-white/70 backdrop-blur-md border border-white/50 shadow-2xl p-6 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="text-xs font-bold text-slate-500">College Match Analytics</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-slate-100 text-[9px] font-bold text-slate-500">
                  AI ENGINE v2.5
                </div>
              </div>

              {/* Central Matching Ring and Stats */}
              <div className="my-auto flex flex-col items-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  {/* Matching circle path SVG */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="72" cy="72" r="64" className="stroke-slate-100 fill-transparent" strokeWidth="8" />
                    <motion.circle 
                      cx="72" 
                      cy="72" 
                      r="64" 
                      className="stroke-brand-600 fill-transparent" 
                      strokeWidth="8"
                      strokeDasharray={402}
                      initial={{ strokeDashoffset: 402 }}
                      animate={{ strokeDashoffset: 402 - (402 * 0.95) }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-4xl font-display font-extrabold text-slate-800">95%</span>
                    <p className="text-[10px] font-semibold text-brand-600 mt-0.5 uppercase tracking-wider">Match Score</p>
                  </div>
                </div>

                <div className="mt-6 w-full bg-white/80 rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-xs text-slate-400 font-medium">Top Match Recommended</span>
                    <p className="text-[14px] font-bold text-slate-800">IIT Bombay (CSE)</p>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                    <TrendingUp size={14} />
                    <span>#1 Choice</span>
                  </div>
                </div>
              </div>

              {/* Bottom counselors list */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Active Online Counselors</span>
                  <span className="font-semibold text-brand-600">See All (12)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
                        SK
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></div>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-800">Dr. Sunita K.</p>
                      <span className="text-[10px] text-slate-400">Chief Admissions Officer</span>
                    </div>
                  </div>
                  <button 
                    onClick={onCounsellingClick}
                    className="px-3 py-1.5 rounded-xl bg-brand-600 text-[11px] font-bold text-white shadow-sm shadow-brand-500/20 cursor-pointer"
                  >
                    Connect Now
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 1: AI Match Verification */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-10 bg-white/95 border border-slate-100 rounded-2xl p-4 shadow-xl shadow-slate-100 flex items-center gap-3 w-48"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <BadgeCheck size={20} />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Verified Stats</span>
                <p className="text-[13px] font-bold text-slate-800">100% Placement</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Highest CTC */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-8 bg-white/95 border border-slate-100 rounded-2xl p-4 shadow-xl shadow-slate-100 flex items-center gap-3 w-52"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <Award size={20} />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Highest CTC</span>
                <p className="text-[13px] font-bold text-slate-800">₹68.5 Lakhs P.A.</p>
              </div>
            </motion.div>

            {/* Floating Card 3: Trust Rating */}
            <motion.div 
              animate={{ x: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 left-6 bg-white/95 border border-slate-100 rounded-2xl p-3.5 shadow-xl shadow-slate-100 flex items-center gap-3 w-48"
            >
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[9px] font-bold">A1</div>
                <div className="w-7 h-7 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[9px] font-bold">B2</div>
                <div className="w-7 h-7 rounded-full bg-slate-400 border-2 border-white flex items-center justify-center text-[9px] font-bold">C3</div>
              </div>
              <div className="text-left">
                <div className="flex items-center text-yellow-500">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[12px] font-bold text-slate-800 ml-1">4.9/5</span>
                </div>
                <span className="text-[10px] text-slate-400">by 50K+ Students</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
