import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, Scale, ArrowRight,
  TrendingUp, Banknote,
  ShieldCheck, Trophy, Sparkles
} from 'lucide-react';
import { getDeterministicRank } from '../utils/helpers';

export default function PremiumCollegeCard({ college, streamName = "Engineering", onCompareClick }) {
  const rank = college.rank || getDeterministicRank(college.name, 50);
  const placementPercent = college.placementPercentage || "94%";
  const estYear = college.estYear || "1994";
  const logo = (college.logo && (college.logo.startsWith('http') || college.logo.startsWith('/') || college.logo.startsWith('data:')))
    ? college.logo
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(college.logo || college.name)}&background=0D8ABC&color=fff&size=128&bold=true`;
  const streamBadge = college.streamBadge || streamName;

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
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(15,113,205,0.05)] hover:border-slate-200/60 transition-all duration-300 group flex flex-col overflow-hidden relative"
    >
      {/* Top Background Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f71cd]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Banner and Logo */}
      <div className="relative h-48 w-full overflow-hidden shrink-0">
        {/* Banner Image with hover zoom */}
        <img 
          src={college.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80'} 
          alt={college.name || 'College Image'} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        {/* Gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
        
        {/* Top Left: Stream Badge */}
        <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1 border border-slate-100/50">
          <Sparkles size={12} className="text-[#0f71cd]/80" />
          <span className="text-[10px] font-bold text-slate-800 tracking-wide uppercase">{streamBadge}</span>
        </div>

        {/* Bottom Left Floating: College Logo */}
        <div className="absolute -bottom-5 left-5 w-12 h-12 rounded-lg border-2 border-white bg-white shadow-md z-10 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
          <img src={logo} alt="logo" className="w-full h-full object-cover" />
        </div>

        {/* Bottom Right Floating: Ranking Badge */}
        <div className="absolute bottom-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1 font-bold text-xs">
          <Trophy size={12} />
          <span>#{rank}</span>
        </div>
      </div>

      {/* College Info Body */}
      <div className="p-5 pt-8 flex-1 flex flex-col relative z-10 text-left">
        
        {/* Title & Location */}
        <div className="mb-3">
          <Link to={`/colleges/${college.id}`} className="block group/link">
            <h3 className="text-base font-bold text-[#0F141E] font-tt-talent leading-snug mb-1 hover:text-[#0f71cd] transition-colors line-clamp-2" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              {college.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-400 font-semibold flex items-center gap-1">
            <MapPin size={13} className="text-slate-400" />
            {college.location}
          </p>
        </div>

        {/* Relocated Badges Section (Replaces Description) */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="px-2 py-0.5 bg-slate-50 border border-slate-200/60 text-slate-600 text-[10px] font-bold rounded-md shadow-2xs">
            {college.type}
          </span>
          <span className="px-2 py-0.5 bg-slate-50 border border-slate-200/60 text-slate-600 text-[10px] font-bold rounded-md shadow-2xs">
            Estd {estYear}
          </span>
          {college.approved && college.approved.split(',').map((badge, i) => (
            <span key={i} className="px-2 py-0.5 bg-slate-50 border border-slate-200/60 text-slate-600 text-[10px] font-bold rounded-md shadow-2xs flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-500" />
              {badge.trim()}
            </span>
          ))}
          <span className="px-2 py-0.5 bg-slate-50 border border-slate-200/60 text-slate-600 text-[10px] font-bold rounded-md shadow-2xs">
            NAAC A+
          </span>
        </div>

        {/* Stats Strip */}
        <div className="bg-slate-50 rounded-lg p-3 flex items-center justify-between border border-slate-100 mb-5">
          <div className="flex flex-col items-center flex-1 border-r border-slate-200/50 last:border-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <TrendingUp size={11} className="text-slate-400" /> Placements
            </span>
            <span className="text-xs font-bold text-slate-700">{placementPercent}</span>
          </div>
          <div className="flex flex-col items-center flex-1 border-r border-slate-200/50 last:border-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <Banknote size={11} className="text-slate-400" /> Avg Pkg
            </span>
            <span className="text-xs font-bold text-slate-700">{college.placement || college.package || college.stats?.avgPackage || "₹16.5 LPA"}</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <Banknote size={11} className="text-slate-400" /> Fees
            </span>
            <span className="text-xs font-bold text-slate-700">{college.fees || college.avgFees || "₹2.0 L/Yr"}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-100">
          <Link 
            to={`/colleges/${college.id}`} 
            className="flex-1 h-9 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-tt-talent font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 shadow-xs group/btn text-xs text-center"
            style={{ fontFamily: '"TT Talent", sans-serif' }}
          >
            View Details 
            <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
          
          <button 
            onClick={handleCompare}
            className="h-9 w-9 rounded-lg bg-slate-50 text-slate-500 border border-slate-200 flex items-center justify-center transition-all duration-300 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
            title="Compare College"
          >
            <Scale size={16} />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
