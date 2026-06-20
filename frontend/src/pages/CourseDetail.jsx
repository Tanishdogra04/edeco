import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowRight, MapPin, Building2, Download, Search, Filter,
  ChevronDown, Star, ChevronRight, Award, ShieldCheck, Banknote
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CounsellingModal from '../components/CounsellingModal';
import ApplicationModal from '../components/ApplicationModal';

import { getMockCourseData } from '../data/courses';

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = getMockCourseData(courseId);
  
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);
  const [selectedCollegeForApply, setSelectedCollegeForApply] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter State
  const [activeFilters, setActiveFilters] = useState({
    state: [],
    city: [],
    exam: [],
    type: [],
    fees: []
  });

  const [searchQueries, setSearchQueries] = useState({
    state: '',
    city: '',
    exam: ''
  });

  const [activeTag, setActiveTag] = useState(null);
  const [sortBy, setSortBy] = useState('popularity');

  const [collapsedFilters, setCollapsedFilters] = useState({
    state: false,
    city: false,
    exam: false,
    type: false,
    fees: false
  });

  const [prevCourseId, setPrevCourseId] = useState(courseId);
  if (courseId !== prevCourseId) {
    setPrevCourseId(courseId);
    setActiveTag(null);
    setSortBy('popularity');
    setActiveFilters({
      state: [],
      city: [],
      exam: [],
      type: [],
      fees: []
    });
  }

  const toggleFilterCollapse = (category) => {
    setCollapsedFilters(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      state: [],
      city: [],
      exam: [],
      type: [],
      fees: []
    });
  };

  // Reset page scroll when course changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  const handleFilterChange = (category, value) => {
    setActiveFilters(prev => {
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const handleSearchChange = (category, e) => {
    setSearchQueries(prev => ({
      ...prev,
      [category]: e.target.value.toLowerCase()
    }));
  };

  // Derived filtered colleges
  const filteredColleges = useMemo(() => {
    let result = course.topColleges.filter(college => {
      if (activeFilters.state.length > 0 && !activeFilters.state.includes(college.state)) return false;
      if (activeFilters.city.length > 0 && !activeFilters.city.includes(college.city)) return false;
      if (activeFilters.type.length > 0 && !activeFilters.type.includes(college.type)) return false;
      if (activeFilters.fees.length > 0 && !activeFilters.fees.includes(college.feesCategory)) return false;
      if (activeFilters.exam.length > 0 && !college.exams?.some(e => activeFilters.exam.includes(e))) return false;
      if (activeTag && !college.tags?.includes(activeTag)) return false;
      return true;
    });

    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'fees-asc') {
      result.sort((a, b) => a.numericFees - b.numericFees);
    } else if (sortBy === 'fees-desc') {
      result.sort((a, b) => b.numericFees - a.numericFees);
    } else {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [course.topColleges, activeFilters, activeTag, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar onCounsellingClick={() => setIsCounsellingOpen(true)} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-slate-500 gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link to="/" className="hover:text-[#0f71cd] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#0F141E] font-medium">Courses</span>
            <ChevronRight size={14} />
            <span className="text-[#0F141E] font-medium">{course.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0F141E] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                {course.title}
              </h1>
              <p className="text-slate-500 text-sm md:text-base max-w-2xl">
                {course.description}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#0f71cd]/5 rounded-xl p-4 text-center border border-[#0f71cd]/10">
                <p className="text-xl font-bold text-[#0f71cd]" style={{ fontFamily: '"TT Talent", sans-serif' }}>{course.stats.totalColleges}</p>
                <p className="text-xs font-semibold text-[#0f71cd] uppercase tracking-wide">Colleges</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout: Sidebar + Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="font-bold text-[#0F141E]">Filter Colleges</span>
          <button 
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 bg-[#0f71cd]/10 text-[#0f71cd] px-4 py-2 rounded-lg font-semibold font-tt-talent"
            style={{ fontFamily: '"TT Talent", sans-serif' }}
          >
            <Filter size={18} /> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Filters */}
          <div className={`lg:col-span-1 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:sticky lg:top-24 shadow-sm max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-[#0F141E] flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                  <Filter size={20} className="text-[#0f71cd]" /> Filters
                </h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm font-semibold text-[#0f71cd] hover:text-[#0c62b2]"
                >
                  Clear All
                </button>
              </div>

              {/* Dynamic Filter Sections based on Course */}
              {Object.entries(course.filters).map(([key, options]) => {
                // Apply search filter if applicable
                const visibleOptions = (key === 'state' || key === 'city' || key === 'exam') 
                  ? options.filter(opt => opt.toLowerCase().includes(searchQueries[key]))
                  : options;

                return (
                  <div key={key} className="mb-6 last:mb-0">
                    <button 
                      onClick={() => toggleFilterCollapse(key)}
                      className="w-full font-bold text-slate-800 uppercase tracking-wider text-xs mb-3 flex items-center justify-between hover:text-[#0f71cd] transition-colors"
                    >
                      {key} <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${collapsedFilters[key] ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <div className={`transition-all duration-300 overflow-hidden ${collapsedFilters[key] ? 'max-h-0 opacity-0 hidden' : 'max-h-[500px] opacity-100 block'}`}>
                      {/* Small Search for State/City/Exam */}
                      {(key === 'state' || key === 'city' || key === 'exam') && (
                        <div className="relative mb-3">
                          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder={`Search ${key}...`} 
                            value={searchQueries[key]}
                            onChange={(e) => handleSearchChange(key, e)}
                            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0f71cd]"
                          />
                        </div>
                      )}

                      <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {visibleOptions.length > 0 ? visibleOptions.map((opt, i) => (
                          <label key={i} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                              <input 
                                type="checkbox" 
                                checked={activeFilters[key].includes(opt)}
                                onChange={() => handleFilterChange(key, opt)}
                                className="w-4 h-4 border-slate-300 rounded text-[#0f71cd] focus:ring-[#0f71cd] peer" 
                              />
                            </div>
                            <span className="text-sm text-slate-600 group-hover:text-[#0F141E] transition-colors">{opt}</span>
                          </label>
                        )) : (
                          <p className="text-xs text-slate-400">No matches found.</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - College Listings */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Quick Specialization Tags */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {course.tags.map((tag, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`whitespace-nowrap px-4 py-2 border rounded-full text-sm font-medium transition-colors shadow-sm font-tt-talent ${activeTag === tag ? 'bg-[#0f71cd] text-white border-[#0f71cd]' : 'bg-white border-slate-200 text-slate-600 hover:border-[#0f71cd] hover:text-[#0f71cd]'}`}
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Sort & Count Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500 font-medium">Found <span className="font-bold text-[#0F141E]">{filteredColleges.length}</span> Colleges</p>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-sm text-slate-500">Sort By:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-semibold text-[#0F141E] bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg focus:outline-none focus:border-[#0f71cd]"
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating (High to Low)</option>
                  <option value="fees-asc">Fees (Low to High)</option>
                  <option value="fees-desc">Fees (High to Low)</option>
                </select>
              </div>
            </div>

            {/* College Cards List */}
            <div className="space-y-5">
              {filteredColleges.length > 0 ? filteredColleges.map((college, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0f71cd]/40 transition-all overflow-hidden flex flex-col md:flex-row text-left group">
                  
                  {/* Image/Logo area (Left) */}
                  <div className="md:w-64 h-48 md:h-auto relative bg-slate-100 flex-shrink-0">
                    <img src={college.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80'} alt={college.name || 'College Image'} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-[#0F141E] flex items-center gap-1 shadow-sm">
                       <Star size={12} className="text-orange-500 fill-orange-500" /> {college.rating} ({college.reviews})
                    </div>
                  </div>

                  {/* Content Area (Right) */}
                  <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <Link to={`/colleges/${college.id}`} className="hover:text-[#0f71cd] transition-colors">
                          <h3 className="text-xl font-bold text-[#0F141E] leading-tight group-hover:text-[#0f71cd] transition-colors font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{college.name}</h3>
                        </Link>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-[#0F141E]/60 mb-4 flex-wrap">
                        <span className="flex items-center gap-1"><MapPin size={14} className="text-slate-400" /> {college.location}</span>
                        <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-[#0f71cd]" /> {college.approved}</span>
                        <span className="flex items-center gap-1"><Building2 size={14} className="text-[#0f71cd]" /> {college.type}</span>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 mb-6">
                        <div className="bg-slate-50 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-slate-100 flex-1">
                          <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-0.5 flex items-center gap-1"><Banknote size={12}/> First Year Fees</p>
                          <p className="font-black text-[#0f71cd] text-sm sm:text-base">{college.fees}</p>
                        </div>
                        <div className="bg-slate-50 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-slate-100 flex-1">
                          <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-0.5 flex items-center gap-1"><Award size={12}/> Average Package</p>
                          <p className="font-black text-[#0f71cd] text-sm sm:text-base">{college.placement}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
                      <button onClick={() => { setSelectedCollegeForApply(college); setIsApplyOpen(true); }} className="w-full sm:flex-1 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm cursor-pointer font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                        Apply Now <ArrowRight size={16} />
                      </button>
                      <button className="w-full sm:flex-1 bg-white hover:bg-slate-50 text-[#0F141E] border border-slate-200 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                        <Download size={16} /> Download Brochure
                      </button>
                    </div>
                  </div>

                </div>
              )) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Search size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F141E] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>No colleges found</h3>
                  <p className="text-slate-500 mb-6">Try adjusting your filters or search criteria.</p>
                  <button 
                    onClick={clearFilters}
                    className="bg-[#0f71cd]/10 hover:bg-[#0f71cd]/20 text-[#0f71cd] font-bold py-2.5 px-6 rounded-xl transition-colors font-tt-talent"
                    style={{ fontFamily: '"TT Talent", sans-serif' }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination / Load More */}
            {filteredColleges.length > 0 && (
              <div className="py-8 text-center">
                <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-3 px-8 rounded-xl shadow-sm transition-colors inline-flex items-center gap-2">
                  Load More Colleges <ChevronDown size={18} />
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      <Footer />

      <ApplicationModal 
        isOpen={isApplyOpen}
        onClose={() => {
          setIsApplyOpen(false);
          setSelectedCollegeForApply(null);
        }}
        initialData={{
          courseName: course.name,
          collegeName: selectedCollegeForApply?.name,
          stream: courseId
        }}
      />

      <CounsellingModal 
        isOpen={isCounsellingOpen}
        onClose={() => setIsCounsellingOpen(false)}
      />
    </div>
  );
}
