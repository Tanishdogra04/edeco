import { Link } from 'react-router-dom';
import { 
  MapPin, Calendar, Landmark, ShieldCheck, 
  Send, Download, Scale, ChevronRight as ChevronRightIcon 
} from 'lucide-react';

export default function CollegeHero({ 
  college, 
  onApplyClick, 
  onDownloadBrochure, 
  onToggleCompare, 
  isCompared 
}) {
  return (
    <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 bg-white overflow-hidden border-b border-slate-200">
      {/* Subtle Background Pattern/Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-50 to-slate-100/30 opacity-70"></div>
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center text-xs font-semibold text-slate-500 gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar mb-8">
          <Link to="/" className="hover:text-[#0f71cd] transition-colors">Home</Link>
          <ChevronRightIcon size={12} />
          <Link to={`/cities/${college.location.split(',')[0].toLowerCase()}`} className="hover:text-[#0f71cd] transition-colors">{college.location.split(',')[0]} Colleges</Link>
          <ChevronRightIcon size={12} />
          <span className="text-[#0f71cd]">{college.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          
          {/* Left side: Logo & Info */}
          <div className="flex flex-col sm:flex-row gap-6 items-start lg:w-2/3">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-slate-200 bg-white shadow-xl flex-shrink-0 relative overflow-hidden group p-1.5">
              <img 
                src={
                  college.logo && (college.logo.startsWith('http') || college.logo.startsWith('/') || college.logo.startsWith('data:'))
                    ? college.logo
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(college.logo || college.shortName || college.name)}&background=0f172a&color=fff&size=200&bold=true`
                } 
                alt="Logo" 
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                {college.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 font-semibold mb-5">
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                  <MapPin size={16} className="text-[#0f71cd]"/> {college.location}
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                  <Calendar size={16} className="text-[#0f71cd]"/> Estd {college.established}
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                  <Landmark size={16} className="text-[#0f71cd]"/> {college.ownership}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {college.approvals && college.approvals.map((badge, idx) => (
                  <span key={idx} className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-lg bg-slate-50 text-[#0f71cd] border border-slate-200 flex items-center gap-1 shadow-sm">
                    <ShieldCheck size={12} /> {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: Action Buttons */}
          <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            <button onClick={() => onApplyClick(null)} className="flex-1 lg:w-56 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm">
              <Send size={18} /> Apply Now
            </button>
            <button onClick={onDownloadBrochure} className="flex-1 lg:w-56 bg-white hover:bg-slate-50 text-[#0f71cd] border border-slate-200 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm cursor-pointer">
              <Download size={18} /> Download Brochure
            </button>
            <button onClick={onToggleCompare} className="hidden lg:flex w-56 bg-slate-100 hover:bg-slate-200 text-[#0F141E] border border-slate-200 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 items-center justify-center gap-2 shadow-sm cursor-pointer">
              <Scale size={18} /> {isCompared ? 'Added to Compare' : 'Compare'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
