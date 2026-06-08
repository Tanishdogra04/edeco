import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Laptop, Briefcase, HeartPulse, Scale, Palette, 
  BarChart3, Search, ArrowLeft, ChevronRight, Sparkles, 
  Building2, ArrowUpRight, GraduationCap, ShieldCheck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Dynamic lists of domains categorized by group
const domainsList = [
  {
    id: "engineering",
    name: "Engineering & Tech",
    category: "tech",
    icon: Laptop,
    stats: "4,200+ Colleges",
    avgPackage: "₹6 - ₹12 LPA",
    highestPackage: "₹50+ LPA",
    subCourses: ["B.Tech", "M.Tech", "AI & ML", "Data Science"],
    desc: "Design the future with software development, hardware architecture, AI research, and civil structures.",
    themeColor: "text-blue-600 bg-blue-50 border-blue-100",
    gradientColor: "from-blue-500/10 to-indigo-500/5",
    hoverBorder: "hover:border-blue-500/50"
  },
  {
    id: "mba-&-business",
    name: "MBA & Business",
    category: "business",
    icon: Briefcase,
    stats: "3,100+ Colleges",
    avgPackage: "₹8 - ₹18 LPA",
    highestPackage: "₹45+ LPA",
    subCourses: ["MBA", "BBA", "Strategy", "Operations Management"],
    desc: "Learn organizational leadership, financial strategies, business development, and market positioning.",
    themeColor: "text-amber-600 bg-amber-50 border-amber-100",
    gradientColor: "from-amber-500/10 to-orange-500/5",
    hoverBorder: "hover:border-amber-500/50"
  },
  {
    id: "medical",
    name: "Medical Science",
    category: "healthcare",
    icon: HeartPulse,
    stats: "1,500+ Colleges",
    avgPackage: "₹9 - ₹22 LPA",
    highestPackage: "₹60+ LPA",
    subCourses: ["MBBS", "BDS", "Nursing", "Pharmacy"],
    desc: "Dedicate your career to saving lives, biomedical research, clinical diagnosis, and healthcare systems.",
    themeColor: "text-rose-600 bg-rose-50 border-rose-100",
    gradientColor: "from-rose-500/10 to-pink-500/5",
    hoverBorder: "hover:border-rose-500/50"
  },
  {
    id: "law-&-justice",
    name: "Law & Justice",
    category: "humanities",
    icon: Scale,
    stats: "900+ Colleges",
    avgPackage: "₹5 - ₹14 LPA",
    highestPackage: "₹28+ LPA",
    subCourses: ["BA LLB", "LLM", "Corporate Law", "Cyber Law"],
    desc: "Uphold justice, specialize in corporate contracts, intellectual property rights, and courtroom advocacy.",
    themeColor: "text-purple-600 bg-purple-50 border-purple-100",
    gradientColor: "from-purple-500/10 to-violet-500/5",
    hoverBorder: "hover:border-purple-500/50"
  },
  {
    id: "design-&-arts",
    name: "Design & Arts",
    category: "creative",
    icon: Palette,
    stats: "1,200+ Colleges",
    avgPackage: "₹6 - ₹15 LPA",
    highestPackage: "₹35+ LPA",
    subCourses: ["B.Des", "Fashion Design", "Animation & VFX", "B.Arch"],
    desc: "Innovate visually through digital product design, architecture, communication systems, and apparel.",
    themeColor: "text-teal-600 bg-teal-50 border-teal-100",
    gradientColor: "from-teal-500/10 to-emerald-500/5",
    hoverBorder: "hover:border-teal-500/50"
  },
  {
    id: "commerce-&-finance",
    name: "Commerce & Finance",
    category: "business",
    icon: BarChart3,
    stats: "2,800+ Colleges",
    avgPackage: "₹4 - ₹11 LPA",
    highestPackage: "₹30+ LPA",
    subCourses: ["B.Com", "M.Com", "Fintech", "Actuarial Science"],
    desc: "Master global investment strategies, accounting standards, actuarial studies, and financial analysis.",
    themeColor: "text-cyan-600 bg-cyan-50 border-cyan-100",
    gradientColor: "from-cyan-500/10 to-sky-500/5",
    hoverBorder: "hover:border-cyan-500/50"
  },
  {
    id: "information-technology",
    name: "Information Tech (IT)",
    category: "tech",
    icon: Laptop,
    stats: "2,500+ Colleges",
    avgPackage: "₹5 - ₹10 LPA",
    highestPackage: "₹25+ LPA",
    subCourses: ["BCA", "MCA", "Cybersecurity", "Cloud Architecture"],
    desc: "Develop scalable cloud applications, manage security protocols, and engineer cloud environments.",
    themeColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    gradientColor: "from-emerald-500/10 to-teal-500/5",
    hoverBorder: "hover:border-emerald-500/50"
  },
  {
    id: "science-&-research",
    name: "Science & Research",
    category: "tech",
    icon: Sparkles,
    stats: "1,800+ Colleges",
    avgPackage: "₹4 - ₹9 LPA",
    highestPackage: "₹22+ LPA",
    subCourses: ["B.Sc", "M.Sc", "Biotechnology", "Microbiology"],
    desc: "Explore core physics, biochemical interactions, environmental policies, and laboratory research.",
    themeColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
    gradientColor: "from-indigo-500/10 to-violet-500/5",
    hoverBorder: "hover:border-indigo-500/50"
  }
];

export default function AllDomains() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Explore All Academic Domains | Edeco";
  }, []);

  const tabs = [
    { id: 'all', name: 'All Domains' },
    { id: 'tech', name: 'Tech & IT' },
    { id: 'business', name: 'Business & Finance' },
    { id: 'healthcare', name: 'Healthcare & Medical' },
    { id: 'humanities', name: 'Law & Humanities' },
    { id: 'creative', name: 'Creative & Arts' }
  ];

  // Filter domains based on active tab and search query
  const filteredDomains = domainsList.filter(dom => {
    const matchesSearch = dom.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      dom.desc.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      dom.subCourses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase().trim()));

    if (activeTab === 'all') return matchesSearch;
    return dom.category === activeTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#110051]/20">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative pt-24 pb-16 bg-[#110051] text-white overflow-hidden text-left">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.12),transparent_50%)]"></div>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,rgba(106,255,217,0.08),transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              {/* Breadcrumbs */}
              <div className="flex items-center text-xs text-slate-400 gap-2 mb-4 font-bold uppercase tracking-wider">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight size={12} className="text-slate-600" />
                <span className="text-indigo-400 font-bold">Academic Domains</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-display">
                Explore Career Streams
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-2 font-medium max-w-xl leading-relaxed">
                Browse our complete list of educational streams and domains. Discover key certifications, placement package metrics, and top-tier colleges.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white px-4 py-2.5 bg-white/10 rounded-xl hover:bg-white/15 transition-all w-fit border border-white/10 shrink-0 shadow-sm"
            >
              <ArrowLeft size={14} /> Back to Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Toolbar: Categories Tabs & Search Input */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-20">
        <div className="bg-white border border-slate-200 p-5 shadow-xs flex flex-col lg:flex-row gap-5 items-center justify-between rounded-3xl">
          
          {/* Tabs Filter */}
          <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4.5 py-2.5 text-xs font-extrabold rounded-xl border transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#110051] text-white border-[#110051] shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/50 hover:text-slate-900'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full lg:w-72 flex items-center bg-slate-50 border border-slate-200 focus-within:border-brand-500 rounded-xl px-3.5 py-2.5 group transition-all">
            <Search size={15} className="text-slate-400 group-focus-within:text-[#110051] transition-colors shrink-0 mr-2" />
            <input 
              type="text" 
              placeholder="Search by stream name or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 font-semibold outline-none"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[10px] font-bold text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded-md hover:bg-slate-200/50 transition-all cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Grid listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-left">
        {filteredDomains.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
            <GraduationCap size={48} className="text-slate-350 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No matching domains found</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto font-medium">
              We couldn't find any streams that match your filter or query. Please update your search criteria.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
              className="mt-5 px-5 py-2.5 bg-[#110051] text-white font-bold text-xs rounded-xl shadow-sm hover:bg-[#1a0073] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDomains.map((dom) => {
              const Icon = dom.icon;
              return (
                <div
                  key={dom.id}
                  onClick={() => navigate(`/stream/${dom.id}`)}
                  className="bg-white border border-slate-200 rounded-[2rem] p-6 flex flex-col justify-between hover:shadow-md cursor-pointer group text-left transition-shadow"
                >
                  <div>
                    {/* Icon & Category Tag */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-4 rounded-2xl border ${dom.themeColor}`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100/60 px-3 py-1 rounded-full border border-slate-200/40">
                        {dom.category}
                      </span>
                    </div>

                    {/* Header Title & Description */}
                    <div className="space-y-2.5">
                      <h3 className="font-display font-bold text-lg text-[#110051] group-hover:text-brand-500 transition-colors">
                        {dom.name}
                      </h3>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-3">
                        {dom.desc}
                      </p>
                    </div>

                    {/* Metrics Badges */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/50 text-[10px] font-bold text-slate-500 flex items-center gap-1.5 shadow-sm">
                        <Building2 size={12} className="text-[#110051]" />
                        {dom.stats}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100/50 text-[10px] font-bold text-emerald-700 flex items-center gap-1 shadow-sm">
                        <span className="font-extrabold text-[8px] uppercase">Avg:</span>
                        {dom.avgPackage}
                      </span>
                    </div>

                    {/* Popular certification tags */}
                    <div className="pt-5 border-t border-slate-100 mt-5">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Popular Sub-Streams</span>
                      <div className="flex flex-wrap gap-1.5">
                        {dom.subCourses.map((c, i) => (
                          <span key={i} className="px-2 py-0.5 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-100 rounded-md">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA link at bottom */}
                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-slate-400 group-hover:text-[#110051] transition-all">
                    <span className="text-[9px] font-black uppercase tracking-wider">Explore Colleges & Guide</span>
                    <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-[#110051] group-hover:text-white flex items-center justify-center transition-all">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
