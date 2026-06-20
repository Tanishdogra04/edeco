import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, ChevronDown, ChevronRight,
  MessageCircle, PhoneCall, ArrowRight, SlidersHorizontal
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CounsellingModal from '../components/CounsellingModal';
import DarkPremiumCollegeCard from '../components/DarkPremiumCollegeCard';
import CompareDrawer from '../components/CompareDrawer';
import { useToast } from '../context/ToastContext';
import collegeCampusBg from '../assets/college_campus_bg.png';

import { getMockStreamData, STREAM_CONFIGS, getStreamConfigKey } from '../data/streams';

export default function StreamDetail() {
  const toast = useToast();
  const { streamId } = useParams();
  const navigate = useNavigate();
  const stream = getMockStreamData(streamId);
  
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [comparedColleges, setComparedColleges] = useState([]);

  // New dashboard search & filter states
  const [courseType, setCourseType] = useState('');
  const [areaOfStudy, setAreaOfStudy] = useState('');
  const [levelOfStudy, setLevelOfStudy] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [studyMode, setStudyMode] = useState('');

  const handleToggleCompare = (college) => {
    setComparedColleges((prev) => {
      const exists = prev.some((c) => c.id === college.id);
      if (exists) {
        return prev.filter((c) => c.id !== college.id);
      } else {
        if (prev.length >= 3) {
          toast.warning("You can compare up to 3 colleges at a time.");
          return prev;
        }
        return [...prev, college];
      }
    });
  };

  const handleRemoveCompare = (college) => {
    setComparedColleges((prev) => prev.filter((c) => c.id !== college.id));
  };

  const handleClearAllCompare = () => {
    setComparedColleges([]);
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setCourseType('');
    setAreaOfStudy('');
    setLevelOfStudy('');
    setEstimatedCost('');
    setStudyMode('');
    setStateFilter('');
  };



  // Sorting and Filtering logic
  const filteredColleges = useMemo(() => {
    let result = [...stream.topColleges];

    // Search Query (filters by name, location, tags, exams)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.location.toLowerCase().includes(q) ||
        (c.tags && c.tags.some(t => t.toLowerCase().includes(q))) ||
        (c.exams && c.exams.some(e => e.toLowerCase().includes(q)))
      );
    }
    
    // State Filter (Location)
    if (stateFilter) {
      result = result.filter(c => c.state === stateFilter);
    }

    // Course Type Filter
    if (courseType) {
      const level = courseType.toLowerCase();
      if (level.includes('m.tech') || level.includes('mca') || level.includes('pgdm') || level.includes('md') || level.includes('ms') || level.includes('ll.m') || level.includes('m.des') || level.includes('executive')) {
        result = result.filter(c => 
          c.name.includes('IIT') || 
          c.name.includes('IIM') || 
          c.name.includes('BITS') || 
          c.name.includes('AIIMS') || 
          c.name.includes('NID') || 
          c.name.includes('NLSIU') || 
          c.name.includes('NLU')
        );
      }
    }

    // Area of Study (Specialization)
    if (areaOfStudy) {
      result = result.filter(c => c.tags && c.tags.some(t => t.toLowerCase() === areaOfStudy.toLowerCase()));
    }

    // Level of Study (UG/PG)
    if (levelOfStudy) {
      if (levelOfStudy === 'UG') {
        result = result.filter(c => !c.name.includes('Executive') && !c.name.includes('Post Graduate'));
      } else if (levelOfStudy === 'PG') {
        result = result.filter(c => 
          c.name.includes('IIT') || 
          c.name.includes('IIM') || 
          c.name.includes('BITS') || 
          c.name.includes('AIIMS') || 
          c.name.includes('NID') || 
          c.name.includes('NLSIU') || 
          c.name.includes('NLU') || 
          c.name.includes('SRM') || 
          c.name.includes('VIT')
        );
      }
    }

    // Estimated Cost
    if (estimatedCost) {
      result = result.filter(c => c.feesCategory === estimatedCost);
    }

    // Sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'fees-asc') {
      result.sort((a, b) => a.numericFees - b.numericFees);
    } else if (sortBy === 'fees-desc') {
      result.sort((a, b) => b.numericFees - a.numericFees);
    } else if (sortBy === 'highest-package') {
      const parsePackage = (pkgStr) => {
        if (!pkgStr) return 0;
        const val = parseFloat(pkgStr.replace(/[^\d.]/g, ''));
        return isNaN(val) ? 0 : val;
      };
      result.sort((a, b) => parsePackage(b.placement) - parsePackage(a.placement));
    }
    return result;
  }, [stream, sortBy, searchQuery, stateFilter, courseType, areaOfStudy, levelOfStudy, estimatedCost]);

  useEffect(() => {
    // Reset filters on stream change
    const timer = setTimeout(() => {
      handleClearAllFilters();
    }, 0);
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, [streamId]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-slate-200 selection:text-slate-800">
      
      {/* Navbar with default light theme */}
      <Navbar 
        compareCount={comparedColleges.length} 
        onCompareClick={() => {
          // Simply scroll down a bit if they click the compare icon in the header
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onCounsellingClick={() => setIsApplyOpen(true)}
        lightTextBeforeScroll={true}
      />
      
      <main className="flex-1 pb-24">
        
        {/* ====================================================
            HERO BANNER SECTION
        ==================================================== */}
        <div className="relative bg-[#0F141E] pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden text-center">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={collegeCampusBg} 
              alt="University Campus" 
              className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F141E] via-[#0F141E]/90 to-[#0F141E]/40"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight drop-shadow-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                {stream.title}
              </h1>
              <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
                {stream.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* ====================================================
            MAIN LAYOUT: SIDEBAR + CARDS GRID
        ==================================================== */}
        <section id="results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-20">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar / Filters (Desktop) */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 overflow-y-auto max-h-[calc(100vh-120px)] no-scrollbar sticky top-24">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    <Filter size={20} className="text-[#0f71cd]" />
                    Filters
                  </h2>
                  <button 
                    onClick={handleClearAllFilters} 
                    className="text-sm text-[#0f71cd] font-bold hover:text-[#0c62b2] hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {/* Filter Inputs Stack */}
                <div className="space-y-5 text-left">
                  
                  {/* 1. Search Bar */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Search</label>
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-[#0f71cd]/40 focus-within:bg-white rounded-xl px-3 py-2.5 transition-all">
                      <Search size={16} className="text-slate-400 shrink-0" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search colleges..."
                        className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-450 text-sm font-medium"
                      />
                    </div>
                  </div>

                  {/* 2. Select Stream */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Select Stream</label>
                    <div className="relative">
                      <select
                        value={stream.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          let route = 'engineering';
                          if (val === 'Management') route = 'management';
                          if (val === 'Medical Science') route = 'medical';
                          if (val === 'Law') route = 'law';
                          if (val === 'Design') route = 'design';
                          navigate(`/stream/${route}`);
                        }}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#0f71cd] cursor-pointer"
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Management">MBA / Management</option>
                        <option value="Medical Science">Medical Science</option>
                        <option value="Law">Law & Justice</option>
                        <option value="Design">Design & Arts</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none" />
                    </div>
                  </div>

                  {/* 3. Course Type */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Course Type</label>
                    <div className="relative">
                      <select
                        value={courseType}
                        onChange={(e) => setCourseType(e.target.value)}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#0f71cd] cursor-pointer"
                      >
                        <option value="">All Course Types</option>
                        {STREAM_CONFIGS[getStreamConfigKey(streamId)].courseTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none" />
                    </div>
                  </div>

                  {/* 4. Area of Study */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Area of Study</label>
                    <div className="relative">
                      <select
                        value={areaOfStudy}
                        onChange={(e) => setAreaOfStudy(e.target.value)}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#0f71cd] cursor-pointer"
                      >
                        <option value="">All Specializations</option>
                        {STREAM_CONFIGS[getStreamConfigKey(streamId)].areasOfStudy.map(area => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none" />
                    </div>
                  </div>

                  {/* 5. Level of Study */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Level of Study</label>
                    <div className="relative">
                      <select
                        value={levelOfStudy}
                        onChange={(e) => setLevelOfStudy(e.target.value)}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#0f71cd] cursor-pointer"
                      >
                        <option value="">All Levels</option>
                        <option value="UG">Undergraduate (UG)</option>
                        <option value="PG">Postgraduate (PG)</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none" />
                    </div>
                  </div>

                  {/* 6. Estimated Cost */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Estimated Cost</label>
                    <div className="relative">
                      <select
                        value={estimatedCost}
                        onChange={(e) => setEstimatedCost(e.target.value)}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#0f71cd] cursor-pointer"
                      >
                        <option value="">All Budgets</option>
                        {stream.filters.fees.map(fee => (
                          <option key={fee} value={fee}>{fee}/yr</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none" />
                    </div>
                  </div>

                  {/* 7. Study Mode */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Study Mode</label>
                    <div className="relative">
                      <select
                        value={studyMode}
                        onChange={(e) => setStudyMode(e.target.value)}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#0f71cd] cursor-pointer"
                      >
                        <option value="">All Modes</option>
                        {STREAM_CONFIGS[getStreamConfigKey(streamId)].studyModes.map(mode => (
                          <option key={mode} value={mode}>{mode}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none" />
                    </div>
                  </div>

                  {/* 8. Location / State */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Location</label>
                    <div className="relative">
                      <select
                        value={stateFilter}
                        onChange={(e) => setStateFilter(e.target.value)}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#0f71cd] cursor-pointer"
                      >
                        <option value="">All Locations</option>
                        {stream.filters.state.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none" />
                    </div>
                  </div>

                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
              
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 text-left">
                <div>
                  <h2 className="text-xl font-bold text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    Showing <span className="text-[#0f71cd]">{filteredColleges.length}</span> Colleges
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">Discover top-tier accredited {stream.name} institutions</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex items-center justify-center gap-2 flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl font-semibold transition-colors cursor-pointer border-none"
                  >
                    <SlidersHorizontal size={18} />
                    Filters
                  </button>

                  {/* Sort Dropdown */}
                  <div className="relative flex-1 sm:w-48">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-755 py-2.5 pl-4 pr-10 rounded-xl font-semibold focus:outline-none focus:border-[#0f71cd] cursor-pointer text-xs"
                    >
                      <option value="popularity">Popularity</option>
                      <option value="highest-package">Highest Package</option>
                      <option value="fees-asc">Lowest Fees</option>
                      <option value="rating">Top Rated</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Colleges Listing Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredColleges.length > 0 ? filteredColleges.map((college, i) => (
                  <DarkPremiumCollegeCard 
                    key={i}
                    college={college}
                    streamName={stream.name}
                    onCompareClick={() => handleToggleCompare(college)}
                  />
                )) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-slate-200 shadow-sm">
                    <Search size={48} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-2xl font-bold text-[#0F141E] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>No colleges found</h3>
                    <p className="text-slate-500 font-semibold">Try adjusting your filters to discover more institutions.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredColleges.length > 0 && (
                <div className="mt-16 flex justify-center gap-2">
                  <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0F141E] font-bold hover:bg-slate-50 transition-all shadow-sm cursor-pointer font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>1</button>
                  <button className="w-10 h-10 rounded-xl bg-[#0f71cd] text-white font-bold shadow-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>2</button>
                  <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0F141E] font-bold hover:bg-slate-50 transition-all shadow-sm cursor-pointer font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>3</button>
                  <span className="w-10 h-10 flex items-center justify-center text-slate-400 font-bold">...</span>
                  <button className="px-4 h-10 rounded-xl bg-white border border-slate-200 text-[#0F141E] font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-1 cursor-pointer font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* ====================================================
            COUNSELLING CTA SECTION
        ==================================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 text-left">
          <div className="relative bg-[#0F141E] rounded-[2.5rem] border border-slate-800 p-10 md:p-16 overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Particles / Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0f71cd]/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight drop-shadow-md font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                Need Help Choosing The Right College?
              </h2>
              <p className="text-slate-300 text-lg mb-8 font-semibold">
                Our expert counselors are here to guide you through the admission process, scholarships, and career choices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => setIsApplyOpen(true)}
                  className="px-8 py-4 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold rounded-2xl shadow-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-transparent font-tt-talent"
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  Book Free Counselling <ArrowRight size={18} />
                </button>
                <a 
                  href="tel:8278713791"
                  className="px-8 py-4 bg-slate-800/60 hover:bg-slate-850 text-white font-bold rounded-2xl border border-slate-700/80 transition-all flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer font-tt-talent"
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  <PhoneCall size={18} /> Talk To Expert
                </a>
              </div>
            </div>

            <div className="relative z-10 hidden md:block">
              <div className="w-64 h-64 bg-slate-800/40 rounded-full border-8 border-slate-700/50 flex items-center justify-center relative overflow-hidden shadow-2xl backdrop-blur-md">
                <MessageCircle size={80} className="text-white" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl z-20 border-4 border-[#0f71cd]">
                  <span className="text-3xl font-black text-[#0f71cd]">24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />

      <CounsellingModal 
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />

      <CompareDrawer 
        comparedColleges={comparedColleges}
        onRemove={handleRemoveCompare}
        onClearAll={handleClearAllCompare}
      />

      {/* Mobile Filter Drawer Overflow */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 inset-x-0 h-[80vh] bg-white rounded-t-[2rem] z-50 lg:hidden flex flex-col shadow-2xl text-left"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold">
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Search */}
                <div>
                  <label className="text-[11px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Search</label>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                    <Search size={16} className="text-slate-455 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search colleges..."
                      className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Course Type */}
                <div>
                  <label className="text-[11px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Course Type</label>
                  <div className="relative">
                    <select
                      value={courseType}
                      onChange={(e) => setCourseType(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold outline-none"
                    >
                      <option value="">All Course Types</option>
                      {STREAM_CONFIGS[getStreamConfigKey(streamId)].courseTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none" />
                  </div>
                </div>

                {/* Area of Study */}
                <div>
                  <label className="text-[11px] font-bold text-slate-455 uppercase tracking-wider block mb-1.5">Area of Study</label>
                  <div className="relative">
                    <select
                      value={areaOfStudy}
                      onChange={(e) => setAreaOfStudy(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold outline-none"
                    >
                      <option value="">All Specializations</option>
                      {STREAM_CONFIGS[getStreamConfigKey(streamId)].areasOfStudy.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none" />
                  </div>
                </div>

                {/* Level of Study */}
                <div>
                  <label className="text-[11px] font-bold text-slate-455 uppercase tracking-wider block mb-1.5">Level of Study</label>
                  <div className="relative">
                    <select
                      value={levelOfStudy}
                      onChange={(e) => setLevelOfStudy(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold outline-none"
                    >
                      <option value="">All Levels</option>
                      <option value="UG">Undergraduate (UG)</option>
                      <option value="PG">Postgraduate (PG)</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none" />
                  </div>
                </div>

                {/* Estimated Cost */}
                <div>
                  <label className="text-[11px] font-bold text-slate-455 uppercase tracking-wider block mb-1.5">Estimated Cost</label>
                  <div className="relative">
                    <select
                      value={estimatedCost}
                      onChange={(e) => setEstimatedCost(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold outline-none"
                    >
                      <option value="">All Budgets</option>
                      {stream.filters.fees.map(fee => (
                        <option key={fee} value={fee}>{fee}/yr</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none" />
                  </div>
                </div>

                {/* Study Mode */}
                <div>
                  <label className="text-[11px] font-bold text-slate-455 uppercase tracking-wider block mb-1.5">Study Mode</label>
                  <div className="relative">
                    <select
                      value={studyMode}
                      onChange={(e) => setStudyMode(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold outline-none"
                    >
                      <option value="">All Modes</option>
                      {STREAM_CONFIGS[getStreamConfigKey(streamId)].studyModes.map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none" />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-[11px] font-bold text-slate-455 uppercase tracking-wider block mb-1.5">Location</label>
                  <div className="relative">
                    <select
                      value={stateFilter}
                      onChange={(e) => setStateFilter(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold outline-none"
                    >
                      <option value="">All Locations</option>
                      {stream.filters.state.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-455 pointer-events-none" />
                  </div>
                </div>

              </div>
              <div className="p-4 border-t border-slate-100 flex gap-3 bg-white">
                <button 
                  onClick={() => { handleClearAllFilters(); setIsFilterOpen(false); }} 
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setIsFilterOpen(false)} 
                  className="flex-[2] py-3 rounded-xl bg-[#0f71cd] text-white font-bold shadow-lg shadow-[#0f71cd]/20"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
