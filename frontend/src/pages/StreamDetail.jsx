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
import { useToast } from '../context/ToastContext';

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

    // Ensure we start at the top showing the filters
    window.scrollTo(0, 0);

    // After 0.5 seconds, smoothly scroll down to the results section
    const timer = setTimeout(() => {
      const el = document.getElementById('results-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);

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
        lightTextBeforeScroll={false}
      />
      
      <main className="flex-1 pb-24">
        
        {/* ====================================================
            SIMPLIFIED SEARCH & FILTER PANEL (MATCHING SCREENSHOT)
        ==================================================== */}
        <div className="relative bg-gradient-to-b from-blue-50/90 via-slate-50/50 to-white pt-44 pb-32 border-b border-[#E2E8F0] overflow-hidden">
          
          {/* Faint Background Warli-style Graphics - Dynamic Edeco Theme Accents */}
          
          {/* Motif 1: Rich Sun / Wheel (Top Left) */}
          <div className="absolute left-10 top-12 w-28 h-28 opacity-[0.09] text-[#0f71cd] pointer-events-none hidden md:block animate-[spin_60s_linear_infinite]">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
              <circle cx="50" cy="50" r="22" strokeDasharray="3,3" />
              <circle cx="50" cy="50" r="14" />
              <circle cx="50" cy="50" r="6" fill="currentColor" />
              <line x1="50" y1="10" x2="50" y2="22" strokeWidth="2" />
              <line x1="50" y1="78" x2="50" y2="90" strokeWidth="2" />
              <line x1="10" y1="50" x2="22" y2="50" strokeWidth="2" />
              <line x1="78" y1="50" x2="90" y2="50" strokeWidth="2" />
              <line x1="22" y1="22" x2="31" y2="31" strokeWidth="2" />
              <line x1="69" y1="69" x2="78" y2="78" strokeWidth="2" />
              <line x1="78" y1="22" x2="69" y2="31" strokeWidth="2" />
              <line x1="31" y1="69" x2="22" y2="78" strokeWidth="2" />
            </svg>
          </div>

          {/* Motif 2: Row of Dancers holding hands (Left Center) */}
          <div className="absolute left-6 top-[35%] w-60 h-36 opacity-[0.09] text-[#0f71cd] pointer-events-none hidden md:block">
            <svg viewBox="0 0 150 100" fill="currentColor" className="w-full h-full">
              {/* Dancer 1 */}
              <circle cx="25" cy="30" r="5" />
              <polygon points="25,50 17,35 33,35" />
              <polygon points="25,50 17,65 33,65" />
              <path d="M17,65 L10,80" stroke="currentColor" strokeWidth="1.5" />
              <path d="M33,65 L40,80" stroke="currentColor" strokeWidth="1.5" />
              
              {/* Dancer 2 */}
              <circle cx="55" cy="30" r="5" />
              <polygon points="55,50 47,35 63,35" />
              <polygon points="55,50 47,65 63,65" />
              <path d="M47,65 L42,80" stroke="currentColor" strokeWidth="1.5" />
              <path d="M63,65 L68,80" stroke="currentColor" strokeWidth="1.5" />

              {/* Dancer 3 */}
              <circle cx="85" cy="30" r="5" />
              <polygon points="85,50 77,35 93,35" />
              <polygon points="85,50 77,65 93,65" />
              <path d="M77,65 L72,80" stroke="currentColor" strokeWidth="1.5" />
              <path d="M93,65 L98,80" stroke="currentColor" strokeWidth="1.5" />

              {/* Connected hands */}
              <path d="M17,35 Q30,25 47,35" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M47,35 Q60,25 77,35" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* Motif 3: Traditional Tree & Birds (Right Top) */}
          <div className="absolute right-12 top-12 w-48 h-48 opacity-[0.09] text-[#0f71cd] pointer-events-none hidden md:block">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <line x1="50" y1="95" x2="50" y2="35" stroke="currentColor" strokeWidth="3" />
              <circle cx="50" cy="25" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="50" cy="25" r="5" />
              
              <line x1="50" y1="50" x2="25" y2="35" stroke="currentColor" strokeWidth="2" />
              <line x1="50" y1="65" x2="75" y2="50" stroke="currentColor" strokeWidth="2" />
              <line x1="50" y1="80" x2="30" y2="65" stroke="currentColor" strokeWidth="1.5" />
              
              <circle cx="25" cy="35" r="4" />
              <circle cx="75" cy="50" r="4" />
              <circle cx="30" cy="65" r="3.5" />

              {/* Faint birds */}
              <path d="M15,20 Q20,15 25,20 Q22,17 15,20" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M80,35 Q85,30 90,35 Q87,32 80,35" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* Motif 4: Peacock & Nature (Right Center) */}
          <div className="absolute right-8 top-[38%] w-36 h-36 opacity-[0.09] text-[#0f71cd] pointer-events-none hidden lg:block">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <polygon points="50,45 42,30 58,30" />
              <polygon points="50,45 40,60 60,60" />
              <path d="M50,30 Q50,15 42,12" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="42" cy="12" r="3" />
              {/* Crown */}
              <line x1="42" y1="12" x2="38" y2="6" stroke="currentColor" strokeWidth="1" />
              <line x1="42" y1="12" x2="42" y2="5" stroke="currentColor" strokeWidth="1" />
              <line x1="42" y1="12" x2="46" y2="6" stroke="currentColor" strokeWidth="1" />
              <line x1="43" y1="78" x2="38" y2="82" stroke="currentColor" strokeWidth="1.5" />
              <line x1="43" y1="78" x2="44" y2="83" stroke="currentColor" strokeWidth="1.5" />
              <line x1="57" y1="78" x2="62" y2="82" stroke="currentColor" strokeWidth="1.5" />
              <line x1="57" y1="78" x2="56" y2="83" stroke="currentColor" strokeWidth="1.5" />
              {/* Feathers */}
              <path d="M57,48 Q75,40 85,18" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M58,52 Q82,50 88,34" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="85" cy="18" r="2.5" />
              <circle cx="88" cy="34" r="2.5" />
            </svg>
          </div>

          {/* Motif 5: Musical Figures (Right Bottom) */}
          <div className="absolute right-10 bottom-10 w-44 h-44 opacity-[0.09] text-[#0f71cd] pointer-events-none hidden md:block">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              {/* Drum player */}
              <circle cx="35" cy="35" r="6" />
              <polygon points="35,60 25,43 45,43" />
              <polygon points="35,60 25,77 45,77" />
              <path d="M25,77 L18,90" stroke="currentColor" strokeWidth="1.5" />
              <path d="M45,77 L52,90" stroke="currentColor" strokeWidth="1.5" />
              {/* Drum */}
              <ellipse cx="35" cy="63" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="25" y1="63" x2="25" y2="70" stroke="currentColor" strokeWidth="1.5" />
              <line x1="45" y1="63" x2="45" y2="70" stroke="currentColor" strokeWidth="1.5" />
              <ellipse cx="35" cy="70" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              
              {/* Flute player */}
              <circle cx="75" cy="32" r="5" />
              <polygon points="75,55 67,40 83,40" />
              <polygon points="75,55 67,70 83,70" />
              <path d="M67,70 L62,83" stroke="currentColor" strokeWidth="1.5" />
              <path d="M83,70 L88,83" stroke="currentColor" strokeWidth="1.5" />
              {/* Flute */}
              <line x1="72" y1="40" x2="52" y2="45" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Motif 6: Traditional Deer & Fauna (Left Bottom) */}
          <div className="absolute left-16 bottom-10 w-36 h-36 opacity-[0.09] text-[#0f71cd] pointer-events-none hidden lg:block">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <polygon points="30,55 15,40 45,40" />
              <polygon points="30,55 15,70 45,70" />
              <line x1="15" y1="70" x2="8" y2="85" stroke="currentColor" strokeWidth="1.5" />
              <line x1="45" y1="70" x2="52" y2="85" stroke="currentColor" strokeWidth="1.5" />
              <path d="M45,40 Q55,30 58,25" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="58" cy="25" r="3" />
              <line x1="58" y1="25" x2="62" y2="15" stroke="currentColor" strokeWidth="1" />
              <line x1="58" y1="25" x2="54" y2="15" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Tabs Area */}
            <div className="flex items-center gap-8 mb-6 pb-3">
              <button
                onClick={() => setActiveTab('courses')}
                className={`text-base font-bold pb-2 relative transition-colors cursor-pointer ${
                  activeTab === 'courses' ? 'text-[#0f71cd]' : 'text-slate-450 hover:text-slate-650'
                }`}
              >
                Courses
                {activeTab === 'courses' && (
                  <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0f71cd]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('institutes')}
                className={`text-base font-bold pb-2 relative transition-colors cursor-pointer ${
                  activeTab === 'institutes' ? 'text-[#0f71cd]' : 'text-slate-450 hover:text-slate-650'
                }`}
              >
                Institutes
                {activeTab === 'institutes' && (
                  <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0f71cd]" />
                )}
              </button>
            </div>

            {/* Search Input Box */}
            <div className="mb-4 relative">
              <div className="flex items-center gap-3 bg-white border border-slate-200 focus-within:border-[#0f71cd]/35 focus-within:ring-2 focus-within:ring-[#0f71cd]/5 rounded-xl px-4 py-3.5 transition-all shadow-xs">
                <Search size={20} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    activeTab === 'courses' 
                      ? `Search by courses (eg. Bachelors of Science)`
                      : `Search by institutes`
                  }
                  className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm font-normal"
                />
              </div>
            </div>

            {/* Filters Row Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              
              {/* 1. Course Type */}
              <div className="relative">
                <select
                  value={courseType}
                  onChange={(e) => setCourseType(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:border-[#0f71cd] cursor-pointer shadow-xs"
                >
                  <option value="">Course Type</option>
                  {STREAM_CONFIGS[getStreamConfigKey(streamId)].courseTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* 2. Area of Study */}
              <div className="relative">
                <select
                  value={areaOfStudy}
                  onChange={(e) => setAreaOfStudy(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:border-[#0f71cd] cursor-pointer shadow-xs"
                >
                  <option value="">Area of Study</option>
                  {STREAM_CONFIGS[getStreamConfigKey(streamId)].areasOfStudy.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* 3. Level of Study */}
              <div className="relative">
                <select
                  value={levelOfStudy}
                  onChange={(e) => setLevelOfStudy(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:border-[#0f71cd] cursor-pointer shadow-xs"
                >
                  <option value="">Level of Study</option>
                  <option value="UG">Undergraduate (UG)</option>
                  <option value="PG">Postgraduate (PG)</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* 4. Estimated Total Cost */}
              <div className="relative">
                <select
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:border-[#0f71cd] cursor-pointer shadow-xs"
                >
                  <option value="">Estimated Total Cost (INR)</option>
                  {stream.filters.fees.map(fee => (
                    <option key={fee} value={fee}>{fee}/yr</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* 5. Study Mode */}
              <div className="relative">
                <select
                  value={studyMode}
                  onChange={(e) => setStudyMode(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:border-[#0f71cd] cursor-pointer shadow-xs"
                >
                  <option value="">Study Mode</option>
                  {STREAM_CONFIGS[getStreamConfigKey(streamId)].studyModes.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

            </div>

            {/* Second row: Location + Clear all */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="w-full sm:w-60 relative">
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-500 py-3 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:border-[#0f71cd] cursor-pointer shadow-xs"
                >
                  <option value="">Location</option>
                  {stream.filters.state.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              
              <button
                onClick={handleClearAllFilters}
                className="text-sm font-bold text-[#0f71cd] hover:text-[#0c62b2] hover:underline cursor-pointer"
              >
                Clear all
              </button>
            </div>

            {/* Search Button centered */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleTriggerSearchScroll}
                className="px-20 py-3.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white text-base font-bold rounded-xl active:scale-[0.98] transition-all cursor-pointer shadow-md tracking-wider uppercase font-tt-talent"
                style={{ fontFamily: '"TT Talent", sans-serif' }}
              >
                Search
              </button>
            </div>

          </div>
        </div>

        {/* ====================================================
            RESULTS HEADER
        ==================================================== */}
        <div id="results-section" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-2">
            <h2 className="text-xl font-bold text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              Showing <span className="text-[#0f71cd]">{filteredColleges.length}</span> Colleges
            </h2>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500 font-semibold hidden sm:block">Sort By:</span>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 text-slate-800 py-2 pl-4 pr-10 rounded-lg text-sm font-semibold focus:outline-none focus:border-[#0f71cd] cursor-pointer shadow-sm"
                >
                  <option value="popularity">Popularity</option>
                  <option value="highest-package">Highest Package</option>
                  <option value="fees-asc">Lowest Fees</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
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
              <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-slate-200 shadow-sm">
                <Search size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-2xl font-bold text-[#0F141E] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>No colleges found</h3>
                <p className="text-slate-500 font-semibold">Try adjusting your filters to discover more institutions.</p>
              </div>
            )}
          </div>

          {/* ====================================================
              PAGINATION
          ==================================================== */}
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

    </div>
  );
}
