import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Laptop, Briefcase, HeartPulse, Scale, 
  Palette, BarChart3, Globe2, ArrowRight,
  MapPin, Building2, Download, Search, Filter,
  ChevronDown, Star, ChevronRight,
  Award, ShieldCheck, Banknote, Monitor, Target
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CounsellingModal from '../components/CounsellingModal';

// Mock Data Generator for all courses
const getMockCourseData = (id) => {
  const lowerId = id?.toLowerCase() || '';

  // 1. B.Tech Data
  const btechData = {
    id: 'btech',
    name: 'B.Tech / B.E.',
    title: 'Top B.Tech Colleges in India',
    description: 'Find the best Engineering colleges in India based on ranking, fees, placements, and reviews.',
    icon: Monitor,
    stats: { totalColleges: '4,200+', avgPackage: '₹6 - ₹12 LPA', highestPackage: '₹50+ LPA' },
    filters: {
      state: ['Maharashtra', 'Delhi NCR', 'Karnataka', 'Tamil Nadu', 'Rajasthan', 'Telangana'],
      city: ['Mumbai', 'New Delhi', 'Bangalore', 'Chennai', 'Vellore', 'Pilani', 'Tiruchirappalli'],
      exam: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'SRMJEEE', 'MHT CET'],
      type: ['Private', 'Public/Government'],
      fees: ['< 1 Lakh', '1 - 2 Lakhs', '2 - 3 Lakhs', '3 - 5 Lakhs', '> 5 Lakhs']
    },
    tags: ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'AI & ML', 'Data Science'],
    topColleges: [
      { id: 'iit-bombay', name: 'IIT Bombay - Indian Institute of Technology', location: 'Mumbai, Maharashtra', state: 'Maharashtra', city: 'Mumbai', fees: '₹2.30 Lakhs (1st Year Fees)', feesCategory: '2 - 3 Lakhs', numericFees: 230000, tags: ['Computer Science', 'Mechanical', 'Civil'], placement: '₹36.9 LPA (Avg)', rating: 4.8, reviews: 450, type: 'Public/Government', exams: ['JEE Advanced'], approved: 'AICTE, UGC', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80' },
      { id: 'iit-delhi', name: 'IIT Delhi - Indian Institute of Technology', location: 'New Delhi, Delhi NCR', state: 'Delhi NCR', city: 'New Delhi', fees: '₹2.20 Lakhs (1st Year Fees)', feesCategory: '2 - 3 Lakhs', numericFees: 220000, tags: ['Mechanical', 'Electrical', 'Civil'], placement: '₹32.5 LPA (Avg)', rating: 4.7, reviews: 380, type: 'Public/Government', exams: ['JEE Advanced'], approved: 'AICTE, UGC', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80' },
      { id: 'bits-pilani', name: 'BITS Pilani - Birla Institute of Technology', location: 'Pilani, Rajasthan', state: 'Rajasthan', city: 'Pilani', fees: '₹5.50 Lakhs (1st Year Fees)', feesCategory: '> 5 Lakhs', numericFees: 550000, tags: ['Computer Science', 'Data Science', 'Electrical'], placement: '₹30.3 LPA (Avg)', rating: 4.6, reviews: 520, type: 'Private', exams: ['BITSAT'], approved: 'AICTE, UGC', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80' },
      { id: 'nit-trichy', name: 'NIT Trichy - National Institute of Technology', location: 'Tiruchirappalli, Tamil Nadu', state: 'Tamil Nadu', city: 'Tiruchirappalli', fees: '₹1.80 Lakhs (1st Year Fees)', feesCategory: '1 - 2 Lakhs', numericFees: 180000, tags: ['Mechanical', 'Civil', 'Electrical'], placement: '₹27.5 LPA (Avg)', rating: 4.5, reviews: 310, type: 'Public/Government', exams: ['JEE Main'], approved: 'AICTE, UGC', image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=400&q=80' },
      { id: 'vit-vellore', name: 'VIT Vellore - Vellore Institute of Technology', location: 'Vellore, Tamil Nadu', state: 'Tamil Nadu', city: 'Vellore', fees: '₹1.98 Lakhs (1st Year Fees)', feesCategory: '1 - 2 Lakhs', numericFees: 198000, tags: ['Computer Science', 'AI & ML', 'Data Science'], placement: '₹9.2 LPA (Avg)', rating: 4.2, reviews: 1200, type: 'Private', exams: ['VITEEE'], approved: 'AICTE, UGC', image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=400&q=80' }
    ]
  };

  // 2. MBA Data
  const mbaData = {
    id: 'mba',
    name: 'MBA / PGDM',
    title: 'Top MBA Colleges in India',
    description: 'Find the best MBA and PGDM colleges in India based on ranking, fees, placements, and reviews.',
    icon: Briefcase,
    stats: { totalColleges: '3,100+', avgPackage: '₹8 - ₹15 LPA', highestPackage: '₹60+ LPA' },
    filters: {
      state: ['Gujarat', 'Karnataka', 'Telangana', 'Maharashtra', 'Delhi NCR', 'West Bengal'],
      city: ['Ahmedabad', 'Bangalore', 'Hyderabad', 'Mumbai', 'New Delhi', 'Kolkata'],
      exam: ['CAT', 'XAT', 'MAT', 'CMAT', 'GMAT', 'SNAP'],
      type: ['Private', 'Public/Government'],
      fees: ['< 5 Lakhs', '5 - 10 Lakhs', '10 - 20 Lakhs', '> 20 Lakhs']
    },
    tags: ['Finance', 'Marketing', 'HR', 'Operations', 'International Business', 'Business Analytics'],
    topColleges: [
      { id: 'iim-a', name: 'IIM Ahmedabad - Indian Institute of Management', location: 'Ahmedabad, Gujarat', state: 'Gujarat', city: 'Ahmedabad', fees: '₹31.50 Lakhs (Total Fees)', feesCategory: '> 20 Lakhs', numericFees: 3150000, tags: ['Finance', 'Marketing', 'Operations', 'Business Analytics'], placement: '₹32.8 LPA (Avg)', rating: 4.9, reviews: 850, type: 'Public/Government', exams: ['CAT'], approved: 'AICTE', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80' },
      { id: 'iim-b', name: 'IIM Bangalore - Indian Institute of Management', location: 'Bangalore, Karnataka', state: 'Karnataka', city: 'Bangalore', fees: '₹24.50 Lakhs (Total Fees)', feesCategory: '> 20 Lakhs', numericFees: 2450000, tags: ['Marketing', 'HR', 'Operations'], placement: '₹35.3 LPA (Avg)', rating: 4.9, reviews: 720, type: 'Public/Government', exams: ['CAT'], approved: 'AICTE', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80' },
      { id: 'isb-hyd', name: 'ISB Hyderabad - Indian School of Business', location: 'Hyderabad, Telangana', state: 'Telangana', city: 'Hyderabad', fees: '₹39.00 Lakhs (Total Fees)', feesCategory: '> 20 Lakhs', numericFees: 3900000, tags: ['Finance', 'International Business'], placement: '₹34.2 LPA (Avg)', rating: 4.8, reviews: 640, type: 'Private', exams: ['GMAT'], approved: 'AMBA, EQUIS, AACSB', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80' },
      { id: 'xlri', name: 'XLRI Xavier School of Management', location: 'Jamshedpur, Jharkhand', state: 'Jharkhand', city: 'Jamshedpur', fees: '₹27.40 Lakhs (Total Fees)', feesCategory: '> 20 Lakhs', numericFees: 2740000, tags: ['HR', 'Business Analytics'], placement: '₹32.7 LPA (Avg)', rating: 4.8, reviews: 510, type: 'Private', exams: ['XAT'], approved: 'AICTE', image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=400&q=80' },
      { id: 'spjimr', name: 'SPJIMR - SP Jain Institute', location: 'Mumbai, Maharashtra', state: 'Maharashtra', city: 'Mumbai', fees: '₹20.40 Lakhs (Total Fees)', feesCategory: '> 20 Lakhs', numericFees: 2040000, tags: ['Finance', 'Operations', 'Marketing'], placement: '₹32.0 LPA (Avg)', rating: 4.7, reviews: 460, type: 'Private', exams: ['CAT', 'GMAT'], approved: 'AICTE, NBA', image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=400&q=80' }
    ]
  };

  // 3. MBBS Data
  const mbbsData = {
    id: 'mbbs',
    name: 'MBBS',
    title: 'Top MBBS Colleges in India',
    description: 'Find the best Medical colleges in India based on ranking, fees, placements, and reviews.',
    icon: Target,
    stats: { totalColleges: '800+', avgPackage: '₹8 - ₹18 LPA', highestPackage: '₹40+ LPA' },
    filters: {
      state: ['Delhi NCR', 'Tamil Nadu', 'Maharashtra', 'Karnataka', 'Uttar Pradesh'],
      city: ['New Delhi', 'Vellore', 'Mumbai', 'Bangalore', 'Lucknow', 'Pune'],
      exam: ['NEET UG', 'AIIMS', 'JIPMER'],
      type: ['Private', 'Public/Government'],
      fees: ['< 5 Lakhs', '5 - 15 Lakhs', '15 - 25 Lakhs', '> 25 Lakhs']
    },
    tags: ['MBBS', 'BDS', 'BAMS', 'BHMS'],
    topColleges: [
      { id: 'aiims-delhi', name: 'AIIMS New Delhi', location: 'New Delhi, Delhi NCR', state: 'Delhi NCR', city: 'New Delhi', fees: '₹6.8k (1st Year Fees)', feesCategory: '< 5 Lakhs', numericFees: 6800, tags: ['MBBS'], placement: '₹12.0 LPA (Avg)', rating: 4.9, reviews: 950, type: 'Public/Government', exams: ['NEET UG', 'AIIMS'], approved: 'NMC', image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=400&q=80' },
      { id: 'cmc-vellore', name: 'CMC Vellore - Christian Medical College', location: 'Vellore, Tamil Nadu', state: 'Tamil Nadu', city: 'Vellore', fees: '₹1.50 Lakhs (1st Year Fees)', feesCategory: '< 5 Lakhs', numericFees: 150000, tags: ['MBBS', 'BDS'], placement: '₹8.5 LPA (Avg)', rating: 4.8, reviews: 520, type: 'Private', exams: ['NEET UG'], approved: 'NMC', image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=400&q=80' },
      { id: 'afmc-pune', name: 'AFMC Pune - Armed Forces Medical College', location: 'Pune, Maharashtra', state: 'Maharashtra', city: 'Pune', fees: '₹64.4k (1st Year Fees)', feesCategory: '< 5 Lakhs', numericFees: 64400, tags: ['MBBS'], placement: '₹10.0 LPA (Avg)', rating: 4.7, reviews: 410, type: 'Public/Government', exams: ['NEET UG'], approved: 'NMC', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80' }
    ]
  };

  // 4. LLB Data
  const llbData = {
    id: 'llb',
    name: 'LLB / LLM',
    title: 'Top Law Colleges in India',
    description: 'Find the best Law universities in India based on ranking, fees, placements, and reviews.',
    icon: Scale,
    stats: { totalColleges: '1,200+', avgPackage: '₹6 - ₹12 LPA', highestPackage: '₹40+ LPA' },
    filters: {
      state: ['Karnataka', 'Delhi NCR', 'Telangana', 'West Bengal', 'Maharashtra'],
      city: ['Bangalore', 'New Delhi', 'Hyderabad', 'Kolkata', 'Pune'],
      exam: ['CLAT', 'LSAT', 'AILET', 'SLAT', 'MH CET Law'],
      type: ['Private', 'Public/Government'],
      fees: ['< 2 Lakhs', '2 - 5 Lakhs', '> 5 Lakhs']
    },
    tags: ['BA LLB', 'BBA LLB', 'LLM', 'Corporate Law', 'Criminal Law', 'Cyber Law'],
    topColleges: [
      { id: 'nlsiu-blr', name: 'NLSIU Bangalore - National Law School', location: 'Bangalore, Karnataka', state: 'Karnataka', city: 'Bangalore', fees: '₹3.30 Lakhs (1st Year Fees)', feesCategory: '2 - 5 Lakhs', numericFees: 330000, tags: ['BA LLB', 'LLM', 'Corporate Law'], placement: '₹16.0 LPA (Avg)', rating: 4.9, reviews: 480, type: 'Public/Government', exams: ['CLAT'], approved: 'BCI, UGC', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80' },
      { id: 'nlu-delhi', name: 'NLU Delhi - National Law University', location: 'New Delhi, Delhi NCR', state: 'Delhi NCR', city: 'New Delhi', fees: '₹2.80 Lakhs (1st Year Fees)', feesCategory: '2 - 5 Lakhs', numericFees: 280000, tags: ['BA LLB', 'LLM', 'Criminal Law'], placement: '₹14.0 LPA (Avg)', rating: 4.8, reviews: 390, type: 'Public/Government', exams: ['AILET'], approved: 'BCI, UGC', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80' },
      { id: 'sls-pune', name: 'Symbiosis Law School', location: 'Pune, Maharashtra', state: 'Maharashtra', city: 'Pune', fees: '₹4.20 Lakhs (1st Year Fees)', feesCategory: '2 - 5 Lakhs', numericFees: 420000, tags: ['BBA LLB', 'Corporate Law', 'Cyber Law'], placement: '₹11.0 LPA (Avg)', rating: 4.6, reviews: 310, type: 'Private', exams: ['SLAT'], approved: 'BCI, UGC', image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=400&q=80' }
    ]
  };

  if (lowerId.includes('mba') || lowerId.includes('business') || lowerId.includes('bba')) return mbaData;
  if (lowerId.includes('medical') || lowerId.includes('mbbs')) return mbbsData;
  if (lowerId.includes('law') || lowerId.includes('llb')) return llbData;
  
  return btechData; // Default to B.Tech
};

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = getMockCourseData(courseId);
  
  const [isApplyOpen, setIsApplyOpen] = useState(false);
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

  const toggleFilterCollapse = (category) => {
    setCollapsedFilters(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Reset filters when course changes
  useEffect(() => {
    window.scrollTo(0, 0);
    clearFilters();
    setActiveTag(null);
    setSortBy('popularity');
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

  const clearFilters = () => {
    setActiveFilters({
      state: [],
      city: [],
      exam: [],
      type: [],
      fees: []
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
      <Navbar onCounsellingClick={() => setIsApplyOpen(true)} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-slate-500 gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-medium">Courses</span>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-medium">{course.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                {course.title}
              </h1>
              <p className="text-slate-500 text-sm md:text-base max-w-2xl">
                {course.description}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-brand-50 rounded-xl p-4 text-center border border-brand-100">
                <p className="text-xl font-bold text-brand-700">{course.stats.totalColleges}</p>
                <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Colleges</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout: Sidebar + Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="font-bold text-slate-800">Filter Colleges</span>
          <button 
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 bg-brand-50 text-brand-600 px-4 py-2 rounded-lg font-semibold"
          >
            <Filter size={18} /> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Filters */}
          <div className={`lg:col-span-1 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:sticky lg:top-24 shadow-sm max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Filter size={20} className="text-brand-600" /> Filters
                </h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm font-semibold text-brand-600 hover:text-brand-700"
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
                      className="w-full font-bold text-slate-800 uppercase tracking-wider text-xs mb-3 flex items-center justify-between hover:text-brand-600 transition-colors"
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
                            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
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
                                className="w-4 h-4 border-slate-300 rounded text-brand-600 focus:ring-brand-500 peer" 
                              />
                            </div>
                            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{opt}</span>
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
                  className={`whitespace-nowrap px-4 py-2 border rounded-full text-sm font-medium transition-colors shadow-sm ${activeTag === tag ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-slate-200 text-slate-600 hover:border-brand-600 hover:text-brand-600'}`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Sort & Count Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500 font-medium">Found <span className="font-bold text-slate-900">{filteredColleges.length}</span> Colleges</p>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-sm text-slate-500">Sort By:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg focus:outline-none focus:border-brand-500"
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
                <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col md:flex-row">
                  
                  {/* Image/Logo area (Left) */}
                  <div className="md:w-64 h-48 md:h-auto relative bg-slate-100 flex-shrink-0">
                    <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                       <Star size={12} className="text-orange-500 fill-orange-500" /> {college.rating} ({college.reviews})
                    </div>
                  </div>

                  {/* Content Area (Right) */}
                  <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <Link to={`/colleges/${college.id}`} className="hover:text-brand-600 transition-colors">
                          <h3 className="text-xl font-bold text-slate-900 leading-tight">{college.name}</h3>
                        </Link>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 flex-wrap">
                        <span className="flex items-center gap-1"><MapPin size={14} className="text-slate-400" /> {college.location}</span>
                        <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-green-500" /> {college.approved}</span>
                        <span className="flex items-center gap-1"><Building2 size={14} className="text-emerald-500" /> {college.type}</span>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 mb-6">
                        <div className="bg-brand-50/50 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-brand-100 flex-1">
                          <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-brand-600/70 mb-0.5 flex items-center gap-1"><Banknote size={12}/> First Year Fees</p>
                          <p className="font-black text-brand-900 text-sm sm:text-base">{college.fees}</p>
                        </div>
                        <div className="bg-emerald-50/50 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-emerald-100 flex-1">
                          <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-emerald-600/70 mb-0.5 flex items-center gap-1"><Award size={12}/> Average Package</p>
                          <p className="font-black text-emerald-900 text-sm sm:text-base">{college.placement}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
                      <button onClick={() => setIsApplyOpen(true)} className="w-full sm:flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
                        Apply Now <ArrowRight size={16} />
                      </button>
                      <button className="w-full sm:flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
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
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No colleges found</h3>
                  <p className="text-slate-500 mb-6">Try adjusting your filters or search criteria.</p>
                  <button 
                    onClick={clearFilters}
                    className="bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold py-2.5 px-6 rounded-xl transition-colors"
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

      <CounsellingModal 
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />
    </div>
  );
}
