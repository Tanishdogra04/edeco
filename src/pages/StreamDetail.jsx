import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Laptop, Briefcase, HeartPulse, Scale, 
  Search, Filter, ChevronDown, ChevronRight, Sparkles, MapPin,
  MessageCircle, PhoneCall, ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CounsellingModal from '../components/CounsellingModal';
import DarkPremiumCollegeCard from '../components/DarkPremiumCollegeCard';
import CompareDrawer from '../components/CompareDrawer';

// Mock Data Generator for all streams
const getMockStreamData = (id) => {
  const lowerId = id?.toLowerCase() || '';

  // 1. Engineering Data
  const engineeringData = {
    id: 'engineering',
    name: 'Engineering',
    title: 'Explore Engineering Colleges',
    description: 'Discover top engineering colleges across India. Filter by state, category, and placements to find your ideal institution.',
    icon: Laptop,
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
      { id: 'iit-bombay', name: 'IIT Bombay - Indian Institute of Technology', location: 'Mumbai, Maharashtra', state: 'Maharashtra', city: 'Mumbai', fees: '₹2.30 Lakhs/yr', feesCategory: '2 - 3 Lakhs', numericFees: 230000, tags: ['Computer Science', 'Mechanical', 'Civil'], placement: '₹36.9 LPA', rating: 4.8, reviews: 450, type: 'Public', exams: ['JEE Advanced'], approved: 'AICTE, UGC', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80', placementPercentage: '98%', estYear: '1958', rank: 1 },
      { id: 'iit-delhi', name: 'IIT Delhi - Indian Institute of Technology', location: 'New Delhi, Delhi NCR', state: 'Delhi NCR', city: 'New Delhi', fees: '₹2.20 Lakhs/yr', feesCategory: '2 - 3 Lakhs', numericFees: 220000, tags: ['Mechanical', 'Electrical', 'Civil'], placement: '₹32.5 LPA', rating: 4.7, reviews: 380, type: 'Public', exams: ['JEE Advanced'], approved: 'AICTE, UGC', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80', placementPercentage: '96%', estYear: '1961', rank: 2 },
      { id: 'bits-pilani', name: 'BITS Pilani - Birla Institute of Technology', location: 'Pilani, Rajasthan', state: 'Rajasthan', city: 'Pilani', fees: '₹5.50 Lakhs/yr', feesCategory: '> 5 Lakhs', numericFees: 550000, tags: ['Computer Science', 'Data Science', 'Electrical'], placement: '₹30.3 LPA', rating: 4.6, reviews: 520, type: 'Private', exams: ['BITSAT'], approved: 'AICTE, UGC', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80', placementPercentage: '94%', estYear: '1964', rank: 5 },
      { id: 'nit-trichy', name: 'NIT Trichy - National Institute of Technology', location: 'Tiruchirappalli, Tamil Nadu', state: 'Tamil Nadu', city: 'Tiruchirappalli', fees: '₹1.80 Lakhs/yr', feesCategory: '1 - 2 Lakhs', numericFees: 180000, tags: ['Mechanical', 'Civil', 'Electrical'], placement: '₹27.5 LPA', rating: 4.5, reviews: 310, type: 'Public', exams: ['JEE Main'], approved: 'AICTE, UGC', image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=400&q=80', placementPercentage: '92%', estYear: '1964', rank: 9 },
      { id: 'vit-vellore', name: 'VIT Vellore - Vellore Institute of Technology', location: 'Vellore, Tamil Nadu', state: 'Tamil Nadu', city: 'Vellore', fees: '₹1.98 Lakhs/yr', feesCategory: '1 - 2 Lakhs', numericFees: 198000, tags: ['Computer Science', 'AI & ML', 'Data Science'], placement: '₹9.2 LPA', rating: 4.2, reviews: 1200, type: 'Private', exams: ['VITEEE'], approved: 'AICTE, UGC', image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=400&q=80', placementPercentage: '89%', estYear: '1984', rank: 11 },
      { id: 'srm-chennai', name: 'SRM Institute of Science and Technology', location: 'Chennai, Tamil Nadu', state: 'Tamil Nadu', city: 'Chennai', fees: '₹2.50 Lakhs/yr', feesCategory: '2 - 3 Lakhs', numericFees: 250000, tags: ['Computer Science', 'IT'], placement: '₹7.5 LPA', rating: 4.1, reviews: 800, type: 'Private', exams: ['SRMJEEE'], approved: 'AICTE, UGC', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80', placementPercentage: '85%', estYear: '1985', rank: 24 }
    ]
  };

  const businessData = { 
    ...engineeringData, 
    id: 'business', 
    name: 'Management', 
    title: 'Explore MBA Colleges', 
    tags: ['Finance', 'Marketing', 'HR'],
    topColleges: [
      { id: 'iim-ahmedabad', name: 'IIM Ahmedabad - Indian Institute of Management', location: 'Ahmedabad, Gujarat', state: 'Gujarat', city: 'Ahmedabad', fees: '₹25.0 Lakhs/yr', feesCategory: '> 5 Lakhs', numericFees: 2500000, tags: ['Finance', 'Marketing', 'Strategy'], placement: '₹32.8 LPA', rating: 4.9, reviews: 600, type: 'Public', exams: ['CAT'], approved: 'AICTE, UGC', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80', placementPercentage: '100%', estYear: '1961', rank: 1 },
      { id: 'iim-bangalore', name: 'IIM Bangalore - Indian Institute of Management', location: 'Bangalore, Karnataka', state: 'Karnataka', city: 'Bangalore', fees: '₹24.5 Lakhs/yr', feesCategory: '> 5 Lakhs', numericFees: 2450000, tags: ['Marketing', 'Operations', 'Finance'], placement: '₹35.3 LPA', rating: 4.8, reviews: 550, type: 'Public', exams: ['CAT'], approved: 'AICTE, UGC', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80', placementPercentage: '100%', estYear: '1973', rank: 2 },
      { id: 'isb-hyderabad', name: 'ISB Hyderabad - Indian School of Business', location: 'Hyderabad, Telangana', state: 'Telangana', city: 'Hyderabad', fees: '₹38.0 Lakhs/yr', feesCategory: '> 5 Lakhs', numericFees: 3800000, tags: ['Strategy', 'Leadership', 'Finance'], placement: '₹34.0 LPA', rating: 4.7, reviews: 400, type: 'Private', exams: ['GMAT', 'GRE'], approved: 'AACSB, EQUIS', image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=400&q=80', placementPercentage: '98%', estYear: '2001', rank: 6 },
    ]
  };
  
  const medicalData = { 
    ...engineeringData, 
    id: 'medical', 
    name: 'Medical Science', 
    title: 'Explore Medical Institutes', 
    tags: ['MBBS', 'BDS', 'Nursing'],
    topColleges: [
      { id: 'aiims-delhi', name: 'AIIMS Delhi - All India Institute of Medical Sciences', location: 'New Delhi, Delhi NCR', state: 'Delhi NCR', city: 'New Delhi', fees: '₹1.60 Thousands/yr', feesCategory: '< 1 Lakh', numericFees: 1600, tags: ['MBBS', 'MD', 'MS'], placement: '₹12.0 LPA', rating: 4.9, reviews: 750, type: 'Public', exams: ['NEET'], approved: 'MCI', image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=400&q=80', placementPercentage: '100%', estYear: '1956', rank: 1 },
      { id: 'cmc-vellore', name: 'CMC Vellore - Christian Medical College', location: 'Vellore, Tamil Nadu', state: 'Tamil Nadu', city: 'Vellore', fees: '₹1.50 Lakhs/yr', feesCategory: '1 - 2 Lakhs', numericFees: 150000, tags: ['MBBS', 'Nursing'], placement: '₹10.5 LPA', rating: 4.8, reviews: 520, type: 'Private', exams: ['NEET'], approved: 'MCI', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80', placementPercentage: '99%', estYear: '1900', rank: 3 },
    ]
  };

  const lawData = { 
    ...engineeringData, 
    id: 'law', 
    name: 'Law', 
    title: 'Explore Law Academies', 
    tags: ['BA LLB', 'LLM', 'Corporate Law'],
    topColleges: [
      { id: 'nlsiu-bangalore', name: 'NLSIU Bangalore - National Law School of India', location: 'Bangalore, Karnataka', state: 'Karnataka', city: 'Bangalore', fees: '₹3.20 Lakhs/yr', feesCategory: '3 - 5 Lakhs', numericFees: 320000, tags: ['BA LLB', 'Corporate Law'], placement: '₹16.0 LPA', rating: 4.8, reviews: 310, type: 'Public', exams: ['CLAT'], approved: 'BCI', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80', placementPercentage: '95%', estYear: '1986', rank: 1 },
      { id: 'nlu-delhi', name: 'NLU Delhi - National Law University', location: 'New Delhi, Delhi NCR', state: 'Delhi NCR', city: 'New Delhi', fees: '₹1.80 Lakhs/yr', feesCategory: '1 - 2 Lakhs', numericFees: 180000, tags: ['BA LLB', 'LLM'], placement: '₹14.5 LPA', rating: 4.7, reviews: 290, type: 'Public', exams: ['AILET'], approved: 'BCI', image: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=400&q=80', placementPercentage: '92%', estYear: '2008', rank: 2 },
    ]
  };

  const designData = { 
    ...engineeringData, 
    id: 'design', 
    name: 'Design', 
    title: 'Explore Design Colleges', 
    tags: ['B.Des', 'M.Des', 'Fashion'],
    topColleges: [
      { id: 'nid-ahmedabad', name: 'NID Ahmedabad - National Institute of Design', location: 'Ahmedabad, Gujarat', state: 'Gujarat', city: 'Ahmedabad', fees: '₹3.80 Lakhs/yr', feesCategory: '3 - 5 Lakhs', numericFees: 380000, tags: ['Product Design', 'Animation'], placement: '₹18.0 LPA', rating: 4.8, reviews: 210, type: 'Public', exams: ['NID DAT'], approved: 'UGC', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80', placementPercentage: '90%', estYear: '1961', rank: 1 },
      { id: 'nift-delhi', name: 'NIFT Delhi - National Institute of Fashion Technology', location: 'New Delhi, Delhi NCR', state: 'Delhi NCR', city: 'New Delhi', fees: '₹2.90 Lakhs/yr', feesCategory: '2 - 3 Lakhs', numericFees: 290000, tags: ['Fashion Design', 'Textile'], placement: '₹8.5 LPA', rating: 4.6, reviews: 340, type: 'Public', exams: ['NIFT Entrance'], approved: 'UGC', image: 'https://images.unsplash.com/photo-1558769132-cb1fac08c04c?auto=format&fit=crop&w=400&q=80', placementPercentage: '88%', estYear: '1986', rank: 1 },
    ]
  };

  if (lowerId.includes('mba') || lowerId.includes('business') || lowerId.includes('management')) return businessData;
  if (lowerId.includes('medical') || lowerId.includes('mbbs')) return medicalData;
  if (lowerId.includes('law') || lowerId.includes('llb')) return lawData;
  if (lowerId.includes('design')) return designData;
  
  return engineeringData;
};

export default function StreamDetail() {
  const { streamId } = useParams();
  const navigate = useNavigate();
  const stream = getMockStreamData(streamId);
  
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState(stream.name);
  const [comparedColleges, setComparedColleges] = useState([]);

  const handleToggleCompare = (college) => {
    setComparedColleges((prev) => {
      const exists = prev.some((c) => c.id === college.id);
      if (exists) {
        return prev.filter((c) => c.id !== college.id);
      } else {
        if (prev.length >= 3) {
          alert("You can compare up to 3 colleges at a time.");
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

  // Sorting and Filtering logic
  const filteredColleges = useMemo(() => {
    let result = [...stream.topColleges];

    if (searchQuery) {
      result = result.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.location.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    if (stateFilter) {
      result = result.filter(c => c.state === stateFilter);
    }

    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'fees-asc') {
      result.sort((a, b) => a.numericFees - b.numericFees);
    } else if (sortBy === 'fees-desc') {
      result.sort((a, b) => b.numericFees - a.numericFees);
    }
    return result;
  }, [stream, sortBy, searchQuery, stateFilter]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [streamId]);

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col font-sans selection:bg-brand-200 selection:text-brand-800">
      
      {/* Navbar with default light theme */}
      <Navbar 
        compareCount={comparedColleges.length} 
        onCompareClick={() => {
          // Simply scroll down a bit if they click the compare icon in the header
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onCounsellingClick={() => setIsApplyOpen(true)}
      />
      
      <main className="flex-1 pb-24">
        
        {/* ====================================================
            HERO BANNER SECTION
        ==================================================== */}
        <div className="relative pt-44 pb-20 lg:pt-56 lg:pb-24 overflow-hidden border-b border-white/5 text-center">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80" 
              alt="University Campus" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-900/85"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 font-display">
                {stream.title}
              </h1>
              <p className="text-base md:text-lg text-brand-100/90 max-w-2xl mx-auto font-medium">
                {stream.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* ====================================================
            FILTER BAR
        ==================================================== */}
        <div id="filter-section" className="scroll-mt-24 bg-white border-b border-brand-200 relative z-20 mb-8 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col md:flex-row items-center gap-4"
            >
            {/* Search */}
            <div className="flex-1 w-full bg-brand-50 rounded-xl px-4 py-3 flex items-center gap-3 border border-brand-200 focus-within:border-brand-500 focus-within:bg-white transition-colors">
              <Search size={20} className="text-brand-800/40" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search colleges by name, city, state..."
                className="w-full bg-transparent border-none outline-none text-brand-800 placeholder:text-brand-800/40 text-sm font-medium"
              />
            </div>

            {/* State Filter */}
            <div className="w-full md:w-48 relative">
              <select 
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full appearance-none bg-brand-50 border border-brand-200 text-brand-800 py-3 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-500 cursor-pointer"
              >
                <option value="">All States</option>
                {stream.filters.state.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-800/40 pointer-events-none" />
            </div>

            {/* Course Filter */}
            <div className="w-full md:w-48 relative">
              <select 
                value={stream.name}
                onChange={(e) => {
                  const val = e.target.value;
                  let route = 'engineering';
                  if (val === 'Management') route = 'management';
                  if (val === 'Medical Science') route = 'medical';
                  if (val === 'Law') route = 'law';
                  if (val === 'Design') route = 'design';
                  // Navigate and scroll to top
                  navigate(`/stream/${route}`);
                }}
                className="w-full appearance-none bg-brand-50 border border-brand-200 text-brand-800 py-3 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-500 cursor-pointer"
              >
                <option value="Engineering">Engineering</option>
                <option value="Management">MBA</option>
                <option value="Medical Science">Medical</option>
                <option value="Law">Law</option>
                <option value="Design">Design</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-800/40 pointer-events-none" />
            </div>

            {/* Clear Button */}
            <button 
              onClick={() => { setSearchQuery(''); setStateFilter(''); }}
              className="w-full md:w-auto px-6 py-3 bg-white hover:bg-brand-50 text-brand-800 rounded-xl text-sm font-bold transition-all border border-brand-200 whitespace-nowrap cursor-pointer shadow-sm"
            >
              Clear
            </button>
            </motion.div>
          </div>
        </div>

        {/* ====================================================
            RESULTS HEADER
        ==================================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b border-brand-200">
            <h2 className="text-xl font-bold text-brand-800 flex items-center gap-2 font-display">
              <Sparkles className="text-brand-500" size={20} />
              Showing <span className="text-brand-500">{filteredColleges.length}</span> Colleges
            </h2>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-brand-800/60 font-medium hidden sm:block">Sort By:</span>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-brand-200 text-brand-800 py-2 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:border-brand-500 cursor-pointer shadow-sm"
                >
                  <option value="popularity">Popularity</option>
                  <option value="highest-package">Highest Package</option>
                  <option value="fees-asc">Lowest Fees</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-800/40 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            COLLEGE LISTING GRID
        ==================================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredColleges.length > 0 ? filteredColleges.map((college, i) => (
              <DarkPremiumCollegeCard 
                key={i}
                college={college}
                streamName={stream.name}
                onCompareClick={() => handleToggleCompare(college)}
              />
            )) : (
              <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-brand-200 shadow-sm">
                <Search size={48} className="mx-auto text-brand-800/30 mb-4" />
                <h3 className="text-2xl font-bold text-brand-800 mb-2 font-display">No colleges found</h3>
                <p className="text-brand-800/70">Try adjusting your filters to discover more institutions.</p>
              </div>
            )}
          </div>

          {/* ====================================================
              PAGINATION
          ==================================================== */}
          {filteredColleges.length > 0 && (
            <div className="mt-16 flex justify-center gap-2">
              <button className="w-10 h-10 rounded-xl bg-white border border-brand-200 text-brand-800 font-bold hover:bg-brand-50 transition-all shadow-sm cursor-pointer">1</button>
              <button className="w-10 h-10 rounded-xl bg-brand-500 text-white font-bold shadow-sm">2</button>
              <button className="w-10 h-10 rounded-xl bg-white border border-brand-200 text-brand-800 font-bold hover:bg-brand-50 transition-all shadow-sm cursor-pointer">3</button>
              <span className="w-10 h-10 flex items-center justify-center text-brand-800/40 font-bold">...</span>
              <button className="px-4 h-10 rounded-xl bg-white border border-brand-200 text-brand-800 font-bold hover:bg-brand-50 transition-all shadow-sm flex items-center gap-1 cursor-pointer">
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* ====================================================
            COUNSELLING CTA SECTION
        ==================================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 text-left">
          <div className="relative bg-gradient-brand rounded-[2.5rem] border border-brand-200 p-10 md:p-16 overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Particles / Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight drop-shadow-md font-display">
                Need Help Choosing The Right College?
              </h2>
              <p className="text-brand-100/90 text-lg mb-8 font-medium">
                Our expert counselors are here to guide you through the admission process, scholarships, and career choices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => setIsApplyOpen(true)}
                  className="px-8 py-4 bg-brand-mint hover:bg-brand-blue text-brand-800 hover:text-white font-bold rounded-2xl shadow-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-brand-200/50 hover:border-transparent"
                >
                  Book Free Counselling <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => setIsApplyOpen(true)}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer"
                >
                  <PhoneCall size={18} /> Talk To Expert
                </button>
              </div>
            </div>

            <div className="relative z-10 hidden md:block">
              <div className="w-64 h-64 bg-white/10 rounded-full border-8 border-white/20 flex items-center justify-center relative overflow-hidden shadow-2xl backdrop-blur-md">
                <MessageCircle size={80} className="text-white" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl z-20 border-4 border-brand-500">
                  <span className="text-3xl font-black text-brand-500">24/7</span>
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

    </div>
  );
}
