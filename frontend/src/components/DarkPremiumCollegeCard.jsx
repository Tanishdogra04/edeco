import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, Scale, ArrowRight,
  TrendingUp, Banknote, CalendarDays,
  ShieldCheck, Trophy, Sparkles
} from 'lucide-react';
import { getDeterministicRank } from '../utils/helpers';

const formatFeeShort = (feeStr) => {
  if (!feeStr) return "2.0 lakh/year";
  let str = feeStr.replace('₹', '').trim();
  const match = str.match(/^([\d.,]+)\s*(\w+)(.*)$/);
  if (match) {
    let num = parseFloat(match[1]);
    let unit = match[2].toLowerCase();
    let suffix = "/year";
    if (unit.startsWith('lakh')) {
      return `${num} lakh${suffix}`;
    } else if (unit.startsWith('thousand')) {
      return `${num}k${suffix}`;
    }
  }
  return str.toLowerCase().replace('/yr', '/year').replace('/ yr', '/year').replace('/ yr', '/year');
};

export default function DarkPremiumCollegeCard({ college, streamName = "Engineering", onCompareClick }) {

  const rank = college.rank || getDeterministicRank(college.name, 50);
  const placementPercent = college.placementPercentage || "94%";
  const estYear = college.estYear || "1994";
  const logo = (college.logo && (college.logo.startsWith('http') || college.logo.startsWith('/') || college.logo.startsWith('data:')))
    ? college.logo
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(college.logo || college.name)}&background=0f172a&color=f97316&size=128&bold=true`;
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
      whileHover={{ y: -6 }}
      className="bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:border-[#0f71cd]/30 hover:shadow-md transition-all duration-300 group flex flex-col relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f71cd]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top Header Card Info */}
      <div className="p-6 pb-2 flex items-start justify-between relative z-10">
        
        {/* Floating College Logo */}
        <div className="w-16 h-16 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transform group-hover:scale-105 transition-transform duration-300 flex-shrink-0 p-1">
          <img src={logo} alt="logo" className="w-full h-full object-cover rounded-xl" />
        </div>

        {/* Right Side Badges & Wishlist */}
        <div className="flex flex-col items-end gap-2">
          <div className="bg-[#0f71cd]/5 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1.5 shadow-sm">
            <Sparkles size={12} className="text-[#0f71cd]" />
            <span className="text-[10px] font-bold text-[#0F141E] tracking-wider uppercase font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{streamBadge}</span>
          </div>

          <div className="bg-gradient-premium border border-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
            <Trophy size={12} className="text-[#0f71cd]" />
            <span className="text-[11px] font-bold text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>#{rank} Ranked</span>
          </div>
        </div>
      </div>

      {/* College Info Body */}
      <div className="px-6 pt-2 pb-6 flex-1 flex flex-col relative z-10 text-left">
        
        {/* Title & Location */}
        <div className="mb-4">
          <Link to={`/colleges/${college.id}`} className="block group/link">
            <h3 className="text-2xl font-bold text-[#0F141E] leading-tight mb-2 group-hover/link:text-[#0f71cd] transition-colors line-clamp-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              {college.name}
            </h3>
          </Link>
          <p className="text-sm text-[#0F141E]/70 font-medium flex items-center gap-1.5">
            <MapPin size={16} className="text-[#0f71cd]/60" />
            {college.location}
          </p>
        </div>

        {/* Badges Section */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-[#0F141E]/70 text-[10px] uppercase tracking-wider font-bold rounded-lg font-sans">
            {college.type}
          </span>
          <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-[#0F141E]/70 text-[10px] uppercase tracking-wider font-bold rounded-lg font-sans">
            Estd {estYear}
          </span>
          {college.approved && college.approved.split(',').map((badge, i) => (
            <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-[#0F141E]/70 text-[10px] uppercase tracking-wider font-bold rounded-lg flex items-center gap-1 font-sans">
              {badge.trim()}
            </span>
          ))}
          <span className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-[#0F141E]/70 text-[10px] uppercase tracking-wider font-bold rounded-lg font-sans">
            NAAC A+
          </span>
        </div>

        {/* Highlights strip */}
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100 mb-6">
          <div className="flex flex-col items-center flex-1 border-r border-slate-200/50 last:border-0">
            <span className="text-[10px] text-[#0F141E]/50 font-bold uppercase tracking-wider mb-1 flex items-center gap-1 font-sans">
               Placements
            </span>
            <span className="text-sm font-bold text-slate-800">{placementPercent}</span>
          </div>
          <div className="flex flex-col items-center flex-1 border-r border-slate-200/50 last:border-0">
            <span className="text-[10px] text-[#0F141E]/50 font-bold uppercase tracking-wider mb-1 flex items-center gap-1 font-sans">
               Avg Pkg
            </span>
            <span className="text-sm font-bold text-slate-800">{college.placement || college.package || college.stats?.avgPackage || "₹16.5 LPA"}</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-[10px] text-[#0F141E]/50 font-bold uppercase tracking-wider mb-1 flex items-center gap-1 font-sans">
               Fees
            </span>
            <span className="text-sm font-bold text-slate-800">{formatFeeShort(college.fees || college.avgFees)}</span>
          </div>
        </div>



        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
          <Link 
            to={`/colleges/${college.id}`} 
            className="flex-1 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-tt-talent font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm group/btn border border-slate-200/50 hover:border-transparent cursor-pointer text-center"
            style={{ fontFamily: '"TT Talent", sans-serif' }}
          >
            View Details 
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          
          <button 
            onClick={handleCompare}
            className="p-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 font-bold transition-all shadow-sm hover:border-[#0f71cd]/30 hover:text-[#0f71cd] flex-shrink-0 cursor-pointer"
            title="Compare College"
          >
            <Scale size={20} />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
