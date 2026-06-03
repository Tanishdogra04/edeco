import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen, Search, Mail, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MOCK_RESOURCES = [
  {
    id: "jee-main-cutoff",
    title: "JEE Main Session 1 Cutoff Analysis & Tier-1 College Trends",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    date: "May 24, 2026",
    readTime: "6 Min Read"
  },
  {
    id: "ugc-guidelines",
    title: "UGC Guidelines Issued for Foreign University Campuses in India",
    category: "Updates",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    date: "May 20, 2026",
    readTime: "5 Min Read"
  },
  {
    id: "gen-ai-mba",
    title: "How Gen-AI is Reshaping MBA Curriculums: Top Skills in Demand",
    category: "Strategies",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    date: "May 15, 2026",
    readTime: "7 Min Read"
  },
  {
    id: "top-10-nits",
    title: "Top 10 NITs for Computer Science in 2026",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    date: "May 22, 2026",
    readTime: "4 Min Read"
  },
  {
    id: "cuet-prep-strategy",
    title: "Last 30 Days CUET Preparation Strategy",
    category: "Strategies",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    date: "May 18, 2026",
    readTime: "8 Min Read"
  },
  {
    id: "study-abroad-scholarships",
    title: "10 Fully Funded Scholarships for MS in USA",
    category: "Success Stories",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    date: "May 12, 2026",
    readTime: "6 Min Read"
  }
];

const CATEGORIES = ["All", "Guides", "Strategies", "Updates", "Success Stories"];

export default function Resources() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredResources = MOCK_RESOURCES.filter(res => {
    const matchesCategory = activeCategory === "All" || res.category === activeCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setSearchParams(cat === "All" ? {} : { category: cat });
  };

  return (
    <div className="min-h-screen bg-brand-50 font-sans selection:bg-brand-200 selection:text-brand-800">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white border-b border-brand-200 pt-32 pb-16 text-left md:text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 mb-6 shadow-sm border border-brand-200">
            <BookOpen size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-800 mb-4 tracking-tight font-display">
            Resources & Insights
          </h1>
          <p className="text-lg text-brand-800/70 max-w-2xl mx-auto font-medium">
            Discover our latest guides, admission strategies, policy updates, and student success stories to help you navigate your educational journey.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar">
            {CATEGORIES.map((cat, i) => (
              <button 
                key={i}
                onClick={() => handleCategoryClick(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === cat 
                  ? 'bg-brand-800 text-white shadow-md shadow-brand-800/10' 
                  : 'bg-white border border-brand-200 text-brand-800/70 hover:border-brand-500 hover:text-brand-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-800/40" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-brand-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm text-brand-800 placeholder:text-brand-800/40"
            />
          </div>

        </div>

        {/* Resource Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((article, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link to={`/news/${article.id}`} className="group bg-white rounded-3xl overflow-hidden border border-brand-200 hover:border-brand-500 hover:shadow-md transition-all duration-300 flex flex-col h-full">
                  <div className="h-56 overflow-hidden relative">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm text-brand-800 text-[10px] font-black uppercase tracking-wider shadow-sm border border-brand-200">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-brand-800/40 mb-4">
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="font-bold text-xl text-brand-800 group-hover:text-brand-500 transition-colors leading-snug font-display">
                        {article.title}
                      </h3>
                    </div>
                    <div className="mt-8 pt-4 border-t border-brand-200 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800/70 group-hover:text-brand-500 transition-colors">
                      Read Full Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-brand-200">
            <Search size={48} className="mx-auto text-brand-800/30 mb-4" />
            <h3 className="text-xl font-bold text-brand-800 mb-2 font-display">No articles found</h3>
            <p className="text-brand-800/70">Try adjusting your search or category filter.</p>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-white py-20 border-y border-brand-200 mt-10 text-left md:text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 mb-6 shadow-sm border border-brand-200">
            <Mail size={32} />
          </div>
          <h2 className="text-3xl font-black text-brand-800 mb-4 font-display">Stay Ahead of the Curve</h2>
          <p className="text-brand-800/70 mb-8 max-w-xl mx-auto font-medium">Join 50,000+ students receiving weekly admission insights, deadline alerts, and expert strategies directly in their inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-brand-50 border border-brand-200 rounded-xl px-5 py-3.5 text-brand-800 placeholder:text-brand-800/40 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 font-medium"
            />
            <button className="bg-[#110051] hover:bg-[#1a0073] text-white font-bold px-8 py-3.5 rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
