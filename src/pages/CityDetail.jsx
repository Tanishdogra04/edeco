import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Search, GraduationCap, Building2, Briefcase, 
  TrendingUp, Award, CheckCircle, ChevronDown, ChevronRight,
  Heart, Share2, ChevronLeft, Building, Users, Star, 
  Filter, SlidersHorizontal, ArrowRight, ShieldCheck,
  BookOpen, Landmark
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import CounsellingModal from '../components/CounsellingModal';

// Mock Data
const categories = ['Engineering', 'MBA', 'Medical', 'Law', 'Design', 'Commerce', 'Science', 'Arts'];

const stats = [
  { label: "Total Colleges", value: "500+", icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Engineering", value: "120+", icon: GraduationCap, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Highest Package", value: "₹54 LPA", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
  { label: "Top Recruiters", value: "200+", icon: Briefcase, color: "text-lime-600", bg: "bg-lime-50" },
];

const getMockColleges = (city, category) => [
  {
    id: `iit-${city.toLowerCase()}`,
    name: `Indian Institute of Technology (IIT) ${city}`,
    location: `${city}, India`,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    logo: `https://ui-avatars.com/api/?name=IIT+${city}&background=059669&color=fff`,
    description: `Premier ${category.toLowerCase()} institute in ${city} with global recognition and top-tier placement records.`,
    nirf: 1,
    avgPackage: "₹25.5 LPA",
    placement: "100%",
    fees: "₹2.5 L/yr",
    badges: ["Government", "Autonomous", "Approved"],
    type: "Public"
  },
  {
    id: `${city.toLowerCase()}-college-of-${category.toLowerCase()}`,
    name: `${city} College of ${category}`,
    location: `Central District, ${city}`,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    logo: `https://ui-avatars.com/api/?name=C${category.charAt(0)}&background=0d9488&color=fff`,
    description: `Top private ${category.toLowerCase()} college in ${city} known for excellence in education.`,
    nirf: 89,
    avgPackage: "₹12.4 LPA",
    placement: "95%",
    fees: "₹4.5 L/yr",
    badges: ["Private", "NAAC A+", "University"],
    type: "Private"
  },
  {
    id: `${city.toLowerCase()}-${category.toLowerCase()}-university`,
    name: `${city} ${category} University`,
    location: `University Road, ${city}`,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    logo: `https://ui-avatars.com/api/?name=U&background=10b981&color=fff`,
    description: `Leading private university offering multi-disciplinary programs with industry tie-ups in ${city}.`,
    nirf: 100,
    avgPackage: "₹10.8 LPA",
    placement: "92%",
    fees: "₹3.8 L/yr",
    badges: ["Private", "UGC Approved", "Autonomous"],
    type: "Private"
  },
  {
    id: `nit-${city.toLowerCase()}`,
    name: `National Institute of ${category} (NIT) ${city}`,
    location: `Campus Road, ${city}`,
    image: "https://images.unsplash.com/photo-1592289658098-b80c102b5e28?auto=format&fit=crop&w=800&q=80",
    logo: `https://ui-avatars.com/api/?name=NIT&background=059669&color=fff`,
    description: `Renowned multi-disciplinary government university famous for its ${category.toLowerCase()} programs.`,
    nirf: 60,
    avgPackage: "₹15.5 LPA",
    placement: "96%",
    fees: "₹2.2 L/yr",
    badges: ["Government", "Deemed", "AICTE"],
    type: "Public"
  },
  {
    id: `${city.toLowerCase()}-institute-of-${category.toLowerCase()}`,
    name: `${city} Institute of ${category}`,
    location: `Tech Park, ${city}`,
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=800&q=80",
    logo: `https://ui-avatars.com/api/?name=IT&background=84cc16&color=fff`,
    description: `One of the oldest and most respected ${category.toLowerCase()} colleges in ${city}.`,
    nirf: 73,
    avgPackage: "₹9.2 LPA",
    placement: "94%",
    fees: "₹3.5 L/yr",
    badges: ["Private", "Autonomous", "NBA Accredited"],
    type: "Private"
  },
  {
    id: `symbiosis-${city.toLowerCase()}`,
    name: `Symbiosis Institute of ${category === 'MBA' ? 'Business Management' : category} ${city}`,
    location: `Electronic City, ${city}`,
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80",
    logo: `https://ui-avatars.com/api/?name=SI&background=047857&color=fff`,
    description: `Premier institute offering world-class ${category.toLowerCase()} education and corporate exposure in ${city}.`,
    nirf: 35,
    avgPackage: "₹18.5 LPA",
    placement: "98%",
    fees: "₹9.5 L/yr",
    badges: ["Private", "AACSB", "AIU"],
    type: "Private"
  }
];

const recruiters = [
  "Google", "Amazon", "Microsoft", "Infosys", "TCS", "Wipro", "IBM", "Accenture", "Cognizant", "Deloitte"
];

const faqs = [
  { q: "Which is the best engineering college here?", a: "The best engineering college varies based on your specific branch interest. However, institutes like RVCE, PES University, and BMSCE are consistently ranked at the top for engineering." },
  { q: "What is the average placement package?", a: "The average placement package across top tier colleges is around ₹8-12 LPA, with highest packages often exceeding ₹40+ LPA for computer science and IT branches." },
  { q: "What are the MBA fees in this city?", a: "MBA fees vary widely. Government aided institutions charge around ₹1-3 Lakhs, while top private B-Schools charge between ₹8-20 Lakhs for the complete course." },
  { q: "Are there good hostel facilities available?", a: "Yes, almost all top colleges offer in-campus hostel facilities. Additionally, the city has a massive ecosystem of PGs and student housing options." }
];

const relatedCities = [
  { name: "Pune", image: "https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&w=400&q=80", count: "110+ Colleges" },
  { name: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80", count: "150+ Colleges" },
  { name: "Mumbai", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80", count: "90+ Colleges" },
  { name: "Chennai", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80", count: "130+ Colleges" },
];

export default function CityDetail() {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Engineering');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  // Format city name from URL parameter
  const cityName = cityId ? cityId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Bangalore';
  const allMockColleges = getMockColleges(cityName, activeCategory);

  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    fee: [],
    approval: []
  });
  
  const [sortBy, setSortBy] = useState('Popularity');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleShare = async (e, collegeName) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: collegeName,
          text: `Check out ${collegeName} on EdEvolving!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value) 
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({ type: [], fee: [], approval: [] });
    setSearchQuery('');
  };

  const filteredColleges = allMockColleges.filter(c => {
    const typeMatch = selectedFilters.type.length === 0 || selectedFilters.type.some(t => c.badges.includes(t) || c.type === t);
    const approvalMatch = selectedFilters.approval.length === 0 || selectedFilters.approval.some(a => c.badges.some(b => b.includes(a)));
    
    let feeMatch = true;
    if (selectedFilters.fee.length > 0) {
      const feeNum = parseFloat(c.fees.replace('₹', '').replace(' L/yr', ''));
      feeMatch = selectedFilters.fee.some(f => {
        if (f === '< 1 Lakh') return feeNum < 1;
        if (f === '1 - 2 Lakhs') return feeNum >= 1 && feeNum <= 2;
        if (f === '2 - 5 Lakhs') return feeNum > 2 && feeNum <= 5;
        if (f === '> 5 Lakhs') return feeNum > 5;
        return false;
      });
    }

    const searchMatch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.location.toLowerCase().includes(searchQuery.toLowerCase());

    return typeMatch && approvalMatch && feeMatch && searchMatch;
  });

  const parseLPA = (str) => parseFloat(str.replace('₹', '').replace(' LPA', '')) || 0;
  const parseFees = (str) => parseFloat(str.replace('₹', '').replace(' L/yr', '')) || 0;

  const sortedColleges = [...filteredColleges].sort((a, b) => {
    if (sortBy === 'Highest Package') {
      return parseLPA(b.avgPackage) - parseLPA(a.avgPackage);
    }
    if (sortBy === 'Top Rated') {
      return a.nirf - b.nirf; // Lower NIRF rank is better
    }
    if (sortBy === 'Fees Low to High') {
      return parseFees(a.fees) - parseFees(b.fees);
    }
    // Default: Popularity
    return 0;
  });

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    const collegeSection = document.getElementById('colleges-grid');
    if (collegeSection) {
      const yOffset = -100; // offset for sticky navbar
      const y = collegeSection.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cityId]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-200 selection:text-brand-900">
      <Navbar onCounsellingClick={() => setIsApplyOpen(true)} />
      
      <main className="flex-1">
        
        {/* Premium Full-Width Hero Section */}
        <div className="relative bg-slate-900 pt-32 pb-24 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1920&q=80" 
              alt={`${cityName} Skyline`} 
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/30"></div>
            <div className="absolute inset-0 bg-brand-900/20 mix-blend-multiply"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Breadcrumbs */}
            <div className="flex justify-center items-center text-sm text-slate-300 gap-2 mb-8 font-medium">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-500" />
              <Link to="/cities" className="hover:text-white transition-colors">Cities</Link>
              <ChevronRight size={14} className="text-slate-500" />
              <span className="text-brand-400 font-bold">{cityName}</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-100 mb-6 shadow-sm">
                <MapPin size={16} />
                <span className="text-xs font-bold tracking-widest uppercase">Top Educational Hub</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-tight drop-shadow-sm">
                Top Colleges in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-100">{cityName}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                Explore the best engineering, management, medical, and technology institutes in {cityName}. Discover fees, placements, and rankings.
              </p>

              {/* Premium Glassmorphic Search Bar */}
              <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl flex items-center gap-2 mb-10 transition-all hover:bg-white/20 focus-within:bg-white/20 focus-within:border-white/40 group">
                <div className="pl-4 text-white/70 group-focus-within:text-white transition-colors">
                  <Search size={24} />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search in ${cityName}...`}
                  className="w-full py-3 px-2 bg-transparent border-none outline-none text-white placeholder:text-white/60 text-lg font-medium"
                />
                <button className="bg-white text-brand-900 hover:bg-brand-50 px-8 py-3 rounded-xl font-bold transition-colors whitespace-nowrap shadow-lg">
                  Search
                </button>
              </div>

              {/* Quick Category Pills */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 backdrop-blur-md border ${
                      activeCategory === cat 
                        ? 'bg-brand-600 text-white border-brand-500 shadow-lg shadow-brand-500/40' 
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 shadow-sm'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Bottom SVG Wave connecting to slate-50 background */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
            <svg className="relative block w-full h-12 md:h-16 lg:h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.3,191.7,106.8Z" className="fill-slate-50"></path>
            </svg>
          </div>
        </div>



        {/* Main Content Layout */}
        <section id="colleges-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar / Filters (Desktop) */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 overflow-y-auto max-h-[calc(100vh-120px)] no-scrollbar">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Filter size={20} className="text-brand-600" />
                    Filters
                  </h2>
                  <button onClick={clearFilters} className="text-sm text-brand-600 font-medium hover:text-brand-700">Clear All</button>
                </div>

                {/* Filter Groups */}
                <div className="space-y-6">
                  {/* College Type */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">College Type</h3>
                    <div className="space-y-2">
                      {['Private', 'Government', 'Deemed', 'Autonomous'].map(type => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" checked={selectedFilters.type.includes(type)} onChange={() => toggleFilter('type', type)} className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                          <span className="text-slate-600 group-hover:text-slate-900 font-medium text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Fees */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Fees (Per Year)</h3>
                    <div className="space-y-2">
                      {['< 1 Lakh', '1 - 2 Lakhs', '2 - 5 Lakhs', '> 5 Lakhs'].map(fee => (
                        <label key={fee} className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" checked={selectedFilters.fee.includes(fee)} onChange={() => toggleFilter('fee', fee)} className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                          <span className="text-slate-600 group-hover:text-slate-900 font-medium text-sm">{fee}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Approvals */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Approvals</h3>
                    <div className="space-y-2">
                      {['AICTE', 'UGC', 'NAAC A+', 'NBA'].map(app => (
                        <label key={app} className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" checked={selectedFilters.approval.includes(app)} onChange={() => toggleFilter('approval', app)} className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                          <span className="text-slate-600 group-hover:text-slate-900 font-medium text-sm">{app}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
              
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Found {filteredColleges.length} Colleges</h2>
                  <p className="text-sm text-slate-500 font-medium">Showing top results for {activeCategory} in {cityName}</p>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Mobile Filter Button */}
                  <button 
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex items-center justify-center gap-2 flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl font-semibold transition-colors"
                  >
                    <SlidersHorizontal size={18} />
                    Filters
                  </button>

                  {/* Sort Dropdown */}
                  <div className="relative flex-1 sm:w-48">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent cursor-pointer"
                    >
                      <option value="Popularity">Popularity</option>
                      <option value="Highest Package">Highest Package</option>
                      <option value="Top Rated">Top Rated</option>
                      <option value="Fees Low to High">Fees Low to High</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Colleges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedColleges.map((college) => (
                  <motion.div 
                    key={college.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 group flex flex-col"
                  >
                    {/* Card Header (Image) */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={college.image} 
                        alt={college.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                      
                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button 
                          onClick={(e) => handleShare(e, college.name)}
                          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-brand-600 transition-colors"
                          title="Share"
                        >
                          <Share2 size={16} />
                        </button>
                        <button 
                          onClick={(e) => toggleFavorite(e, college.id)}
                          className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                            favorites.has(college.id) 
                              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                              : 'bg-white/20 text-white hover:bg-white hover:text-red-500'
                          }`}
                          title="Favorite"
                        >
                          <Heart size={16} fill={favorites.has(college.id) ? "currentColor" : "none"} />
                        </button>
                      </div>

                      {/* College Logo */}
                      <div className="absolute -bottom-6 left-6 w-16 h-16 rounded-xl border-4 border-white overflow-hidden bg-white shadow-md z-10">
                        <img src={college.logo} alt="logo" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 pt-10 flex-1 flex flex-col">
                      <div className="mb-2">
                        <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-brand-600 transition-colors">
                          {college.name}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium flex items-center gap-1 mt-1">
                          <MapPin size={14} />
                          {college.location}
                        </p>
                      </div>

                      <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">
                        {college.description}
                      </p>

                      {/* Key Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Avg Package</span>
                          <span className="text-sm font-extrabold text-slate-900">{college.avgPackage}</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Placement</span>
                          <span className="text-sm font-extrabold text-brand-600">{college.placement}</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Fees/Yr</span>
                          <span className="text-sm font-extrabold text-slate-900">{college.fees}</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">NIRF Rank</span>
                          <span className="text-sm font-extrabold text-slate-900">#{college.nirf}</span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {college.badges.slice(0, 3).map((badge, i) => (
                          <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                            {badge}
                          </span>
                        ))}
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex gap-3 mt-auto">
                        <Link to={`/colleges/${college.id}`} className="flex-1 text-center py-2.5 rounded-xl border-2 border-brand-100 text-brand-700 font-bold text-sm hover:bg-brand-50 transition-colors">
                          View Details
                        </Link>
                        <button onClick={() => setIsApplyOpen(true)} className="flex-1 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition-colors shadow-md shadow-brand-500/20">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination (Mock) */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-brand-600 transition-colors">
                    <ChevronLeft size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-brand-600 text-white font-bold shadow-md shadow-brand-500/20">1</button>
                  <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 font-bold hover:bg-slate-50 hover:text-brand-600 transition-colors">2</button>
                  <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 font-bold hover:bg-slate-50 hover:text-brand-600 transition-colors">3</button>
                  <span className="text-slate-400 font-bold px-2">...</span>
                  <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-brand-600 transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </nav>
              </div>

            </div>
          </div>
        </section>

        {/* Top Recruiters Carousel */}
        <section className="bg-white py-16 border-y border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
            <h2 className="text-2xl font-extrabold text-slate-900">Top Recruiters in {cityName}</h2>
            <p className="text-slate-500 font-medium mt-2">Leading companies hiring from these campuses</p>
          </div>
          
          <div className="relative flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <motion.div 
              className="flex items-center gap-12 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {[...recruiters, ...recruiters].map((company, idx) => (
                <div key={idx} className="flex items-center justify-center h-20 w-48 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-brand-200 hover:shadow-md transition-all cursor-pointer">
                  <span className="text-xl font-black text-slate-400 group-hover:text-brand-600 transition-colors tracking-tight uppercase">
                    {company}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500 font-medium text-lg">Everything you need to know about studying in {cityName}.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-brand-200 transition-colors">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-slate-900 pr-8">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-brand-600 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Related Cities */}
        <section className="py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900">Explore Other Educational Hubs</h2>
                <p className="text-slate-500 font-medium mt-2">Find top colleges in other major cities</p>
              </div>
              <Link to="/cities" className="hidden sm:flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700">
                View All <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCities.filter(c => c.name.toLowerCase() !== cityName.toLowerCase()).slice(0, 4).map((city, idx) => (
                <Link 
                  key={idx} 
                  to={`/cities/${city.name.toLowerCase()}`}
                  className="group relative h-64 rounded-2xl overflow-hidden block shadow-md hover:shadow-xl transition-shadow"
                >
                  <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-extrabold text-white mb-1">{city.name}</h3>
                    <p className="text-brand-300 font-semibold text-sm flex items-center gap-2">
                      <Building size={14} /> {city.count}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            
            <Link to="/cities" className="sm:hidden mt-8 flex items-center justify-center gap-2 w-full py-4 bg-white rounded-xl text-brand-600 font-bold border border-slate-200">
              View All Cities <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Counselling CTA */}


      </main>

      <Footer />

      {/* Mobile Filter Drawer Overflow */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 inset-x-0 h-[85vh] bg-white rounded-t-3xl z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Mobile Filter content (duplicate of desktop sidebar content for simplicity) */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">College Type</h3>
                  <div className="space-y-3">
                    {['Private', 'Government', 'Deemed', 'Autonomous'].map(type => (
                      <label key={type} className="flex items-center gap-3">
                        <input type="checkbox" checked={selectedFilters.type.includes(type)} onChange={() => toggleFilter('type', type)} className="w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                        <span className="text-slate-700 font-medium text-base">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Fees</h3>
                  <div className="space-y-3">
                    {['< 1 Lakh', '1 - 2 Lakhs', '2 - 5 Lakhs', '> 5 Lakhs'].map(fee => (
                      <label key={fee} className="flex items-center gap-3">
                        <input type="checkbox" checked={selectedFilters.fee.includes(fee)} onChange={() => toggleFilter('fee', fee)} className="w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                        <span className="text-slate-700 font-medium text-base">{fee}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 flex gap-3 bg-white">
                <button onClick={() => { clearFilters(); setIsFilterOpen(false); }} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold">
                  Clear All
                </button>
                <button onClick={() => setIsFilterOpen(false)} className="flex-[2] py-3 rounded-xl bg-brand-600 text-white font-bold shadow-lg shadow-brand-500/30">
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CounsellingModal 
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />

    </div>
  );
}
