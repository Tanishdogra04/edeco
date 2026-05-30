import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, Heart, Scale, ArrowRight,
  TrendingUp, Banknote, CalendarDays,
  ShieldCheck, Trophy, Sparkles
} from 'lucide-react';

export default function DarkPremiumCollegeCard({ college, streamName = "Engineering", onCompareClick }) {
  const [isSaved, setIsSaved] = useState(false);

  // Parse dummy data or fallback
  const rank = college.rank || Math.floor(Math.random() * 50) + 1;
  const placementPercent = college.placementPercentage || "94%";
  const estYear = college.estYear || "1994";
  const logo = college.logo || `https://ui-avatars.com/api/?name=${college.name.replace(/[^a-zA-Z]/g, '+')}&background=0f172a&color=f97316&size=128`;
  const streamBadge = college.streamBadge || streamName;

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCompareClick) onCompareClick();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:border-brand-500/30 hover:shadow-xl transition-all duration-300 group flex flex-col relative overflow-hidden"
    >
      {/* Background Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* ====================================================
          TOP SECTION
      ==================================================== */}
      <div className="p-6 pb-2 flex items-start justify-between relative z-10">
        
        {/* Floating College Logo */}
        <div className="w-16 h-16 rounded-2xl border border-slate-100 bg-white shadow-md overflow-hidden transform group-hover:scale-105 transition-transform duration-300 flex-shrink-0 p-1">
          <img src={logo} alt="logo" className="w-full h-full object-cover rounded-xl" />
        </div>

        {/* Right Side Badges & Wishlist */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-brand-50 px-3 py-1 rounded-full border border-brand-100 flex items-center gap-1.5 shadow-sm">
              <Sparkles size={12} className="text-brand-600" />
              <span className="text-[10px] font-bold text-brand-700 tracking-wider uppercase">{streamBadge}</span>
            </div>
            
            <button 
              onClick={handleSave}
              className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-red-500 hover:border-red-200 transition-all shadow-sm"
            >
              <Heart size={14} fill={isSaved ? "currentColor" : "none"} className={isSaved ? "text-red-500" : ""} />
            </button>
          </div>

          <div className="bg-gradient-to-r from-brand-50 to-brand-100 border border-brand-100 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
            <Trophy size={12} className="text-brand-600" />
            <span className="text-[11px] font-bold text-brand-700">#{rank} Ranked</span>
          </div>
        </div>
      </div>

      {/* ====================================================
          CONTENT SECTION 
      ==================================================== */}
      <div className="px-6 pt-2 pb-6 flex-1 flex flex-col relative z-10">
        
        {/* Title & Location */}
        <div className="mb-4">
          <Link to={`/colleges/${college.id}`} className="block group/link">
            <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 group-hover/link:text-brand-600 transition-colors line-clamp-2">
              {college.name}
            </h3>
          </Link>
          <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
            <MapPin size={16} className="text-slate-400" />
            {college.location}
          </p>
        </div>

        {/* Short Description */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-6 flex-1 font-medium leading-relaxed">
          {college.description || `Leading institution in ${college.location}, recognized for outstanding academics, modern infrastructure, and excellent placement records.`}
        </p>

        {/* ====================================================
            MIDDLE HIGHLIGHTS STRIP 
        ==================================================== */}
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100 mb-6">
          <div className="flex flex-col items-center flex-1 border-r border-slate-200 last:border-0">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
               Placements
            </span>
            <span className="text-sm font-black text-brand-600">{placementPercent}</span>
          </div>
          <div className="flex flex-col items-center flex-1 border-r border-slate-200 last:border-0">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
               Avg Pkg
            </span>
            <span className="text-sm font-black text-brand-600">{college.placement}</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
               Fees
            </span>
            <span className="text-sm font-black text-brand-600">{college.fees || college.avgFees || "₹2.0 L/Yr"}</span>
          </div>
        </div>

        {/* ====================================================
            BADGES SECTION 
        ==================================================== */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] uppercase tracking-wider font-bold rounded-lg">
            {college.type}
          </span>
          <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] uppercase tracking-wider font-bold rounded-lg">
            Estd {estYear}
          </span>
          {college.approved && college.approved.split(',').map((badge, i) => (
            <span key={i} className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] uppercase tracking-wider font-bold rounded-lg flex items-center gap-1">
              {badge.trim()}
            </span>
          ))}
          <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] uppercase tracking-wider font-bold rounded-lg">
            NAAC A+
          </span>
        </div>

        {/* ====================================================
            BOTTOM ACTIONS 
        ==================================================== */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
          <Link 
            to={`/colleges/${college.id}`} 
            className="flex-1 bg-gradient-brand text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl shadow-brand-500/20 hover:shadow-brand-500/30 group/btn"
          >
            View Details 
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          
          <button 
            onClick={handleCompare}
            className="p-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 font-bold transition-all shadow-sm hover:border-brand-500/30 hover:text-brand-600 flex-shrink-0"
            title="Compare College"
          >
            <Scale size={20} />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
