import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Building2, Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopCities() {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const cities = [
    { 
      name: "Bangalore", 
      colleges: "120+ Colleges", 
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80",
      desc: "IT & Start-up Capital",
      avgPackage: "8.2 LPA",
      keyStreams: "Engineering, MBA, MCA"
    },
    { 
      name: "Delhi NCR", 
      colleges: "150+ Colleges", 
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80",
      desc: "National Capital Region",
      avgPackage: "7.8 LPA",
      keyStreams: "MBA, Law, B.Tech"
    },
    { 
      name: "Mumbai", 
      colleges: "90+ Colleges", 
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80",
      desc: "Financial & Media Hub",
      avgPackage: "8.5 LPA",
      keyStreams: "Finance, Design, MBA"
    },
    { 
      name: "Pune", 
      colleges: "110+ Colleges", 
      image: "https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&w=400&q=80",
      desc: "Oxford of the East",
      avgPackage: "7.2 LPA",
      keyStreams: "Engineering, MBA, Arts"
    },
    { 
      name: "Hyderabad", 
      colleges: "80+ Colleges", 
      image: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&w=400&q=80",
      desc: "Tech & Heritage Center",
      avgPackage: "7.5 LPA",
      keyStreams: "B.Tech, Pharmacy, MBA"
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowDropdown(true);

    const matched = cities.find(c => c.name.toLowerCase() === query.toLowerCase().trim());
    if (matched) {
      setSelectedCity(matched);
    } else if (query === '') {
      setSelectedCity(null);
    }
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setSearchQuery(city.name);
    setShowDropdown(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCity(null);
    setShowDropdown(false);
  };

  const filteredDropdownCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.6;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header containing left-side title and right-side controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="text-left space-y-2">
            <span className="text-[12px] font-bold text-brand-600 uppercase tracking-widest block">
              Study Destinations
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-800 tracking-tight">
              Explore Colleges by City
            </h2>
            <p className="text-[14px] text-brand-800/60 max-w-md font-medium">
              Discover top educational hubs across the country with active recruiting networks.
            </p>
          </div>

          {/* Right Side: Search Input and Slide Buttons */}
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            {/* Search Input Bar (reduced size) */}
            <div className="relative w-64 text-left z-20">
              <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-brand-500 rounded-xl px-3 py-2 group transition-all shadow-sm">
                <Search size={14} className="text-slate-400 group-focus-within:text-brand-500 transition-colors shrink-0 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search city..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowDropdown(true)}
                  className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 font-semibold outline-none"
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={handleClearSearch}
                    className="text-[10px] font-bold text-slate-400 hover:text-slate-600 px-1 py-0.5 rounded hover:bg-slate-200/50 transition-all cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown */}
              {showDropdown && filteredDropdownCities.length > 0 && (
                <>
                  <div className="fixed inset-0 z-35" onClick={() => setShowDropdown(false)}></div>
                  <ul className="absolute top-full right-0 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-40 py-1 max-h-48 overflow-y-auto no-scrollbar animate-in fade-in-50 slide-in-from-top-2 duration-150">
                    {filteredDropdownCities.map((city) => (
                      <li key={city.name}>
                        <button
                          type="button"
                          onClick={() => handleSelectCity(city)}
                          className="w-full px-3 py-2.5 hover:bg-slate-50 text-left text-xs text-slate-700 hover:text-[#110051] font-semibold transition-colors flex items-center justify-between"
                        >
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-brand-600 shrink-0" />
                            {city.name}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1 py-0.5 rounded">
                            {city.colleges}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Desktop Arrow Controls (now below the search bar) */}
            {!selectedCity && (
              <div className="hidden sm:flex items-center gap-2.5">
                <button 
                  type="button"
                  onClick={() => scroll('left')}
                  className="p-2.5 rounded-xl bg-white border border-slate-100 hover:border-brand-200 text-slate-600 hover:text-brand-600 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  type="button"
                  onClick={() => scroll('right')}
                  className="p-2.5 rounded-xl bg-white border border-slate-100 hover:border-brand-200 text-slate-600 hover:text-brand-600 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Selected City Result Card vs Scroll Slider */}
        {selectedCity ? (
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-slate-50/50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 mb-10 max-w-3xl animate-in fade-in-50 slide-in-from-bottom-3 duration-300">
            {/* The single City Card */}
            <div 
              onClick={() => navigate(`/cities/${selectedCity.name.toLowerCase().replace(/ /g, '-')}`)}
              className="w-full sm:w-[280px] h-[320px] bg-white rounded-none p-3 border border-slate-200 flex flex-col cursor-pointer group hover:-translate-y-1 hover:shadow-md transition-all duration-200 shrink-0 text-left"
            >
              <div className="w-full h-32 rounded-none overflow-hidden relative mb-3 bg-slate-50 shrink-0">
                <img 
                  src={selectedCity.image} 
                  alt={selectedCity.name} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                />
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-none bg-[#110051]/95 text-white text-[9px] font-bold uppercase tracking-wider border border-white/10 shadow-sm">
                  {selectedCity.desc}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-[#110051] tracking-tight leading-none">
                    {selectedCity.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded-none bg-slate-50 border border-slate-200/60 text-[10px] font-bold text-slate-650 flex items-center gap-1 shadow-3xs">
                      <Building2 size={11} className="text-[#110051]/80" />
                      {selectedCity.colleges}
                    </span>
                    <span className="px-2 py-0.5 rounded-none bg-indigo-50/40 border border-indigo-100/50 text-[10px] font-bold text-indigo-750 flex items-center gap-1 shadow-3xs">
                      <span className="font-extrabold text-[8px] uppercase">Avg CTC:</span>
                      {selectedCity.avgPackage}
                    </span>
                  </div>
                  <div className="mt-3 text-left">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Popular Fields</span>
                    <span className="text-[11.5px] font-medium text-slate-500 truncate block mt-0.5">{selectedCity.keyStreams}</span>
                  </div>
                </div>
                <div className="pt-2.5 border-t border-slate-100/50 flex items-center justify-between text-slate-400 group-hover:text-[#110051] transition-all duration-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Explore Colleges</span>
                  <ChevronRight size={13} className="text-slate-400 group-hover:text-[#110051] group-hover:translate-x-0.5 transition-all duration-200" />
                </div>
              </div>
            </div>

            {/* Quick stats and details about selected destination */}
            <div className="flex-1 flex flex-col justify-between text-left space-y-5 pt-3 w-full">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10.5px] font-extrabold text-indigo-700 uppercase tracking-wider w-fit">
                  <MapPin size={12} /> Selected Destination
                </span>
                <h3 className="text-3xl font-black text-[#110051] tracking-tight leading-none">{selectedCity.name}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-md">
                  {selectedCity.name} is a premier study destination with an active recruiting ecosystem of {selectedCity.colleges} and strong placement statistics (average packages around {selectedCity.avgPackage}). Discover top institutes and find courses matching your score.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-3">
                <button 
                  type="button"
                  onClick={() => navigate(`/cities/${selectedCity.name.toLowerCase().replace(/ /g, '-')}`)}
                  className="px-6 py-3 rounded-xl bg-[#110051] hover:bg-[#1a0073] text-white text-xs font-bold transition-all duration-300 cursor-pointer shadow-md hover:shadow-indigo-950/20 active:scale-[0.98]"
                >
                  Explore {selectedCity.name} Colleges
                </button>
                <button 
                  type="button"
                  onClick={handleClearSearch}
                  className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-800 text-xs font-bold transition-all duration-300 cursor-pointer hover:bg-slate-100/40"
                >
                  View All Cities
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* City Cards Horizontal Scroll Container */
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pt-4 pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {cities.map((city, idx) => (
              <motion.div
                key={idx}
                onClick={() => navigate(`/cities/${city.name.toLowerCase().replace(/ /g, '-')}`)}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="min-w-[260px] sm:min-w-[290px] h-[320px] bg-white rounded-none p-3 border border-slate-200 flex flex-col snap-start cursor-pointer text-left group hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                {/* Image with subtle zoom on hover */}
                <div className="w-full h-32 rounded-none overflow-hidden relative mb-3 bg-slate-50 shrink-0">
                  <img 
                    src={city.image} 
                    alt={city.name} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-none bg-[#110051]/95 text-white text-[9px] font-bold uppercase tracking-wider border border-white/10 shadow-sm">
                    {city.desc}
                  </div>
                </div>

                {/* Card Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#110051] tracking-tight leading-none">
                      {city.name}
                    </h3>
                    
                    {/* Badges Row */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="px-2 py-0.5 rounded-none bg-slate-50 border border-slate-200/60 text-[10px] font-bold text-slate-650 flex items-center gap-1 shadow-3xs">
                        <Building2 size={11} className="text-[#110051]/80" />
                        {city.colleges}
                      </span>
                      <span className="px-2 py-0.5 rounded-none bg-indigo-50/40 border border-indigo-100/50 text-[10px] font-bold text-indigo-750 flex items-center gap-1 shadow-3xs">
                        <span className="font-extrabold text-[8px] uppercase">Avg CTC:</span>
                        {city.avgPackage}
                      </span>
                    </div>

                    {/* Popular streams list */}
                    <div className="mt-3 text-left">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Popular Fields</span>
                      <span className="text-[11.5px] font-medium text-slate-500 truncate block mt-0.5">{city.keyStreams}</span>
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="pt-2.5 border-t border-slate-100/50 flex items-center justify-between text-slate-400 group-hover:text-[#110051] transition-all duration-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Explore Colleges</span>
                    <ChevronRight size={13} className="text-slate-400 group-hover:text-[#110051] group-hover:translate-x-0.5 transition-all duration-200" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* View All Cities Button */}
        <div className="flex justify-center mt-10">
          <button 
            type="button"
            onClick={() => navigate('/cities')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-slate-200 hover:border-[#110051] text-slate-700 hover:text-white hover:bg-[#110051] text-sm font-bold shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group active:scale-[0.98]"
          >
            <span>View All Study Destinations</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
