import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, Heart, Scale, ArrowRight,
  TrendingUp, Banknote, CalendarDays,
  ShieldCheck, Trophy, Sparkles
} from 'lucide-react';

export default function PremiumCollegeCard({ college, streamName = "Engineering", onCompareClick }) {
  const [isSaved, setIsSaved] = useState(false);

  // Parse dummy data or fallback
  const rank = college.rank || Math.floor(Math.random() * 50) + 1;
  const placementPercent = college.placementPercentage || "94%";
  const estYear = college.estYear || "1994";
  const logo = college.logo || `https://ui-avatars.com/api/?name=${college.name.replace(/[^a-zA-Z]/g, '+')}&background=0D8ABC&color=fff&size=128`;
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
      className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-brand-200 transition-all duration-300 group flex flex-col overflow-hidden relative"
    >
      {/* Top Background Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* ====================================================
          TOP IMAGE SECTION 
      ==================================================== */}
      <div className="relative h-56 overflow-hidden">
        {/* Banner Image with hover zoom */}
        <img 
          src={college.image} 
          alt={college.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none" />
        
        {/* Top Left: Stream Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
          <Sparkles size={14} className="text-brand-500" />
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">{streamBadge}</span>
        </div>

        {/* Top Right: Save / Wishlist */}
        <button 
          onClick={handleSave}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-red-500 hover:shadow-lg transition-all z-10"
        >
          <Heart size={18} fill={isSaved ? "currentColor" : "none"} className={isSaved ? "text-red-500" : ""} />
        </button>

        {/* Bottom Left Floating: College Logo */}
        <div className="absolute -bottom-6 left-6 w-16 h-16 rounded-2xl border-4 border-white bg-white shadow-md z-10 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
          <img src={logo} alt="logo" className="w-full h-full object-cover" />
        </div>

        {/* Bottom Right Floating: Ranking Badge */}
        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 font-bold text-sm transform group-hover:translate-y-[-2px] transition-transform">
          <Trophy size={14} />
          <span>#{rank}</span>
        </div>
      </div>

      {/* ====================================================
          CONTENT SECTION 
      ==================================================== */}
      <div className="p-6 pt-10 flex-1 flex flex-col relative z-10">
        
        {/* Title & Location */}
        <div className="mb-4">
          <Link to={`/colleges/${college.id}`} className="block group/link">
            <h3 className="text-xl font-black text-slate-900 leading-tight mb-2 group-hover/link:text-brand-600 transition-colors line-clamp-2">
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
          {college.description || `One of the top institutions located in ${college.location}, recognized for academic excellence and outstanding industry placement records.`}
        </p>

        {/* ====================================================
            STATS STRIP 
        ==================================================== */}
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100 mb-6">
          <div className="flex flex-col items-center flex-1 border-r border-slate-200 last:border-0">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <TrendingUp size={12} className="text-slate-400" /> Placements
            </span>
            <span className="text-sm font-black text-orange-600">{placementPercent}</span>
          </div>
          <div className="flex flex-col items-center flex-1 border-r border-slate-200 last:border-0">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <Banknote size={12} className="text-slate-400" /> Avg Pkg
            </span>
            <span className="text-sm font-black text-orange-600">{college.placement}</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <CalendarDays size={12} className="text-slate-400" /> Est. Year
            </span>
            <span className="text-sm font-black text-orange-600">{estYear}</span>
          </div>
        </div>

        {/* ====================================================
            BADGES SECTION 
        ==================================================== */}
        <div className="flex flex-wrap gap-2 mb-6">
          {/* Base type badge */}
          <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg shadow-sm">
            {college.type}
          </span>
          {/* Other approvals */}
          {college.approved && college.approved.split(',').map((badge, i) => (
            <span key={i} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1">
              <ShieldCheck size={12} className="text-green-500" />
              {badge.trim()}
            </span>
          ))}
          {/* Mock NAAC / Auto */}
          <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg shadow-sm">
            NAAC A+
          </span>
        </div>

        {/* ====================================================
            BOTTOM ACTIONS 
        ==================================================== */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
          <Link 
            to={`/colleges/${college.id}`} 
            className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-brand-500/25 group/btn"
          >
            View Details 
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          
          <button 
            onClick={handleCompare}
            className="p-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold transition-all shadow-sm hover:border-brand-300 hover:text-brand-600 flex-shrink-0"
            title="Compare College"
          >
            <Scale size={20} />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
