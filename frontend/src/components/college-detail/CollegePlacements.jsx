import { Briefcase, Award } from 'lucide-react';

export default function CollegePlacements({ college }) {
  if (!college || !college.stats) return null;

  return (
    <div id="section-placements" className="scroll-mt-36">
      <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
        <Briefcase className="text-[#0f71cd]" /> Placements & ROI
      </h2>
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center group hover:border-[#0f71cd]/30 transition-colors">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 group-hover:text-[#0f71cd] transition-colors">Highest Package</p>
            <p className="text-2xl font-black text-slate-900">{college.stats.highestPackage}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center group hover:border-[#0f71cd]/30 transition-colors">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 group-hover:text-[#0f71cd] transition-colors">Average Package</p>
            <p className="text-2xl font-black text-slate-900">{college.stats.avgPackage}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center group hover:border-[#0f71cd]/30 transition-colors">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 group-hover:text-[#0f71cd] transition-colors">Placement %</p>
            <p className="text-2xl font-black text-slate-900">{college.stats.placementRate}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center group hover:border-[#0f71cd]/30 transition-colors">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 group-hover:text-[#0f71cd] transition-colors">Top Recruiters</p>
            <p className="text-2xl font-black text-slate-900">{college.stats.recruiters}</p>
          </div>
        </div>

        {college.recruiters && college.recruiters.length > 0 && (
          <>
            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              <Award size={18} className="text-[#0f71cd]"/> Top Recruiters
            </h3>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-8 sm:gap-12">
              {college.recruiters.map((rec, i) => (
                <img 
                  key={i} 
                  src={rec.logo} 
                  alt={rec.name} 
                  className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-pointer" 
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
