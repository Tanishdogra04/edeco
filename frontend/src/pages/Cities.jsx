import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Building2, Search, ArrowLeft, ChevronRight, 
  Building
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { processedCities } from '../data/cities';

export default function Cities() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { id: 'all', name: 'All Destinations' },
    { id: 'tier1', name: 'Tier 1' },
    { id: 'tier2', name: 'Tier 2' },
    { id: 'tier3', name: 'Tier 3' },
    { id: 'tier4', name: 'Tier 4' },
    { id: 'capitals', name: 'Capitals' }
  ];

  // Filter cities by tab selection & search query
  const filteredCities = processedCities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      city.desc.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      city.keyStreams.toLowerCase().includes(searchQuery.toLowerCase().trim());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'capitals') return city.isCapital && matchesSearch;
    return city.tier === activeTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#0f71cd]/20">
      <Navbar lightTextBeforeScroll={true} />

      {/* Hero Banner Header */}
      <section className="relative pt-24 pb-16 bg-[#0F141E] text-white overflow-hidden text-left">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(15,113,205,0.12),transparent_50%)]"></div>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,rgba(106,255,217,0.08),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              {/* Breadcrumbs */}
              <div className="flex items-center text-xs text-slate-400 gap-2 mb-4 font-bold uppercase tracking-wider">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight size={12} className="text-slate-600" />
                <span className="text-[#0f71cd] font-bold">Study Destinations</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                Indian Study Destinations
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-2 font-medium max-w-xl leading-relaxed">
                Explore educational hubs across India. Search by city name and find campus directories, placement packages, and recruitment statistics.
              </p>
            </div>
            
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white px-4 py-2.5 bg-white/10 rounded-xl hover:bg-white/15 transition-all w-fit border border-white/10 shrink-0 shadow-sm font-tt-talent"
              style={{ fontFamily: '"TT Talent", sans-serif' }}
            >
              <ArrowLeft size={14} /> Back to Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Toolbar: Tabs & Search Input */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-20">
        <div className="bg-white border border-slate-200 rounded-none p-5 shadow-xs flex flex-col lg:flex-row gap-5 items-center justify-between">
          
          {/* Tabs Filter */}
          <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4.5 py-2 text-xs font-extrabold rounded-none border transition-all cursor-pointer font-tt-talent ${
                  activeTab === tab.id
                    ? 'bg-[#0f71cd] text-white border-[#0f71cd] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/50 hover:text-slate-900'
                }`}
                style={{ fontFamily: '"TT Talent", sans-serif' }}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full lg:w-72 flex items-center bg-slate-50 border border-slate-200 focus-within:border-[#0f71cd] rounded-none px-3 py-2 group transition-all shadow-3xs">
            <Search size={15} className="text-slate-400 group-focus-within:text-[#0f71cd] transition-colors shrink-0 mr-2" />
            <input 
              type="text" 
              placeholder="Search by name, stream..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 font-semibold outline-none"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[9px] font-bold text-slate-400 hover:text-slate-600 px-1 py-0.5 rounded-none hover:bg-slate-200/50 transition-all cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Grid listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-left">
        {filteredCities.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-none p-16 text-center shadow-xs">
            <MapPin size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>No destinations match your search</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto font-medium">
              Try typing a different city name, or clear the search query to browse all regions.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
              className="mt-5 px-5 py-2.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold text-xs rounded-none shadow-sm transition-all cursor-pointer font-tt-talent"
              style={{ fontFamily: '"TT Talent", sans-serif' }}
            >
              Reset Search & Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredCities.map((city) => (
                <motion.div
                  key={city.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => navigate(`/cities/${city.id}`)}
                  className="bg-white border border-slate-200 rounded-none p-3 flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer group text-left"
                >
                  <div>
                    {/* City Image */}
                    <div className="w-full h-36 rounded-none overflow-hidden relative mb-3 bg-slate-50 shrink-0">
                      <img 
                        src={city.image} 
                        alt={city.name} 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-550 ease-out"
                      />
                      <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-none bg-[#0f71cd]/95 text-white text-[8px] font-extrabold uppercase tracking-widest border border-white/10 shadow-sm">
                        {city.tier === 'tier1' ? 'Tier 1' : city.tier === 'tier2' ? 'Tier 2' : city.tier === 'tier3' ? 'Tier 3' : 'Tier 4'}
                      </span>
                      {city.isCapital && (
                        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-none bg-[#0f71cd] text-white text-[8px] font-black uppercase tracking-widest border border-white/10 shadow-sm">
                          Capital
                        </span>
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="px-1.5 space-y-2">
                      <h3 className="font-tt-talent font-bold text-base text-[#0F141E] tracking-tight group-hover:text-[#0f71cd] transition-colors leading-none" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                        {city.name}
                      </h3>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed line-clamp-2">
                        {city.desc}
                      </p>

                      {/* Stat Metrics Row */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="px-2 py-0.5 rounded-none bg-slate-50 border border-slate-200/60 text-[9px] font-bold text-slate-500 flex items-center gap-1 shadow-3xs">
                          <Building size={11} className="text-[#0f71cd]" />
                          {city.colleges}
                        </span>
                        <span className="px-2 py-0.5 rounded-none bg-indigo-50/40 border border-indigo-100/50 text-[9px] font-bold text-indigo-700 flex items-center gap-1 shadow-3xs">
                          <span className="font-extrabold text-[7px] uppercase">Avg CTC:</span>
                          ₹{city.avgPackage}
                        </span>
                      </div>

                      {/* Popular Fields */}
                      <div className="pt-2 text-left">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Core Streams</span>
                        <span className="text-slate-600 text-xs font-medium truncate block mt-0.5">{city.keyStreams}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="pt-3 px-1.5 mt-3 border-t border-slate-100 flex items-center justify-between text-slate-400 group-hover:text-[#0f71cd] transition-all duration-200">
                    <span className="text-[9px] font-black uppercase tracking-wider">Explore Colleges</span>
                    <ChevronRight size={12} className="text-slate-400 group-hover:text-[#0f71cd] group-hover:translate-x-0.5 transition-all duration-200" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
