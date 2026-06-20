import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Star, School } from 'lucide-react';
import educationPlatformHero from '../assets/education_platform_hero.png';

export default function Hero2({ onSearchSubmit, onCounsellingClick }) {
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
    <section className="relative min-h-[80vh] flex items-center pt-24 pb-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and Search */}
          <div className="lg:col-span-7 text-left flex flex-col items-start space-y-8 w-full max-w-2xl lg:max-w-none">
            
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-100/50 shadow-sm"
            >
              <div className="w-5 h-5 rounded-full bg-[#0f71cd]/10 flex items-center justify-center text-[#0f71cd]">
                <Sparkles size={11} className="text-[#0f71cd]" />
              </div>
              <span className="text-[11px] sm:text-[12px] font-bold text-[#0f71cd] tracking-wide uppercase">
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
              <h1 className="font-tt-talent font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-[#0F141E] leading-[1.15] tracking-tight" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                Find the right college. <br />
                <span className="text-[#0f71cd]">Shape your future.</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-700 max-w-xl font-normal leading-relaxed">
                Connect with institutional partners, compare placement statistics, and get personalized counseling driven by career analytics.
              </p>
            </motion.div>

            {/* Large Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative max-w-2xl w-full"
              ref={dropdownRef}
            >
              <div className="flex items-center gap-2 p-1.5 sm:p-2 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-100 focus-within:border-[#0f71cd]/30 focus-within:ring-2 focus-within:ring-[#0f71cd]/5 transition-all duration-300 shadow-sm w-full">
                <div className="pl-2 sm:pl-3 text-slate-400 shrink-0">
                  <Search size={20} className="sm:w-[22px] sm:h-[22px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyPress={handleSearchKeyPress}
                    placeholder="Search colleges, exams..."
                    className="w-full py-2.5 sm:py-3.5 px-1 bg-transparent text-slate-800 placeholder-slate-400 text-[14px] sm:text-[15px] font-medium outline-none"
                  />
                </div>

                <button
                  onClick={() => onSearchSubmit(searchTerm)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-[#0f71cd] text-white hover:bg-[#0c62b2] text-[13px] sm:text-[15px] font-bold active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-sm text-center shrink-0"
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
                    className="absolute left-0 w-full mt-2 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-lg z-30 overflow-hidden divide-y divide-slate-100"
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
              className="space-y-3 w-full overflow-hidden"
            >
              <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block">
                Popular Streams:
              </span>
              <div className="flex flex-wrap gap-2.5 w-full">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setSearchTerm(cat.name);
                      onSearchSubmit(cat.name);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1.5 sm:gap-1.5 sm:px-4.5 sm:py-2.5 rounded-xl border text-[11px] sm:text-[13px] font-bold transition-all duration-200 cursor-pointer shadow-xs shrink-0 ${selectedCategory === cat.name
                      ? 'bg-[#0f71cd] border-[#0f71cd] text-white'
                      : 'bg-white/80 border-slate-100 text-slate-700 hover:bg-slate-50 hover:border-[#0f71cd]/50 hover:text-[#0f71cd]'
                      }`
                    }
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
              className="flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center w-full sm:w-auto"
            >
              <a
                href="#colleges"
                className="px-6 py-3.5 rounded-xl bg-[#0f71cd] hover:bg-[#0c62b2] text-white text-[15px] font-bold shadow-sm transition-all duration-300 text-center"
              >
                Start Exploring
              </a>
              <button
                onClick={onCounsellingClick}
                className="px-6 py-3.5 rounded-xl border border-[#0f71cd]/30 hover:border-[#0f71cd] text-[#0f71cd] bg-white hover:bg-slate-50 text-[15px] font-bold shadow-xs transition-all duration-300 cursor-pointer text-center"
              >
                Get Free Counselling
              </button>
            </motion.div>
          </div>

          {/* Right Column: Student Image */}
          <div className="lg:col-span-5 w-full flex items-center justify-start lg:justify-end mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-[500px]"
            >
              <img
                src={educationPlatformHero}
                alt="Students Illustration"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
