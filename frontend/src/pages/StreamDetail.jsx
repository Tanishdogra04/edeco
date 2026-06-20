import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Laptop, Briefcase, HeartPulse, Scale, 
  Search, Filter, ChevronDown, ChevronRight, Sparkles, MapPin,
  MessageCircle, PhoneCall, ArrowRight, SlidersHorizontal
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CounsellingModal from '../components/CounsellingModal';
import DarkPremiumCollegeCard from '../components/DarkPremiumCollegeCard';
import CompareDrawer from '../components/CompareDrawer';
import { useToast } from '../context/ToastContext';
import collegeCampusBg from '../assets/college_campus_bg.png';

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
    description: 'Discover top management and business administration institutes across India. Filter by specialization, package, and locations to find your ideal business school.',
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
    description: 'Discover top medical institutes, MBBS programs, and dental schools across India. Filter by location and budget.',
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
    description: 'Discover top law academies, LLB/LLM programs, and law schools across India. Filter by specializations, exams, and states.',
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
    description: 'Discover premier design academies and fashion institutes across India. Filter by specialization, mode, and fees.',
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

const STREAM_CONFIGS = {
  engineering: {
    courseTypes: ['B.Tech / B.E.', 'M.Tech', 'BCA', 'MCA', 'Ph.D.'],
    areasOfStudy: ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'AI & ML', 'Data Science'],
    studyModes: ['Full-Time', 'Part-Time']
  },
  business: {
    courseTypes: ['MBA', 'PGDM', 'BBA', 'Executive MBA'],
    areasOfStudy: ['Finance', 'Marketing', 'HR', 'Strategy', 'Operations'],
    studyModes: ['Full-Time', 'Part-Time', 'Distance Learning']
  },
  medical: {
    courseTypes: ['MBBS', 'BDS', 'B.Sc Nursing', 'MD', 'MS'],
    areasOfStudy: ['General Medicine', 'Surgery', 'Pediatrics', 'Dental Science', 'Nursing'],
    studyModes: ['Full-Time']
  },
  law: {
    courseTypes: ['BA LLB', 'BBA LLB', 'LL.B.', 'LL.M.'],
    areasOfStudy: ['Corporate Law', 'Criminal Law', 'Civil Law', 'Constitutional Law', 'Intellectual Property'],
    studyModes: ['Full-Time', 'Part-Time']
  },
  design: {
    courseTypes: ['B.Des', 'M.Des', 'B.Arch', 'B.F.A.'],
    areasOfStudy: ['Product Design', 'Fashion Design', 'UI/UX Design', 'Graphic Design', 'Interior Design'],
    studyModes: ['Full-Time', 'Part-Time']
  }
};

const getStreamConfigKey = (streamId) => {
  const lowerId = streamId?.toLowerCase() || '';
  if (lowerId.includes('mba') || lowerId.includes('business') || lowerId.includes('management')) return 'business';
  if (lowerId.includes('medical') || lowerId.includes('mbbs')) return 'medical';
  if (lowerId.includes('law') || lowerId.includes('llb')) return 'law';
  if (lowerId.includes('design')) return 'design';
  return 'engineering';
};

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
  const [courseFilter, setCourseFilter] = useState(stream.name);
  const [comparedColleges, setComparedColleges] = useState([]);

  // New dashboard search & filter states
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' or 'institutes'
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

  const handleTriggerSearchScroll = () => {
    const el = document.getElementById('results-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
  }, [stream, sortBy, searchQuery, stateFilter, courseType, areaOfStudy, levelOfStudy, estimatedCost, studyMode]);

  useEffect(() => {
    // Reset filters on stream change
    handleClearAllFilters();
    window.scrollTo(0, 0);
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
