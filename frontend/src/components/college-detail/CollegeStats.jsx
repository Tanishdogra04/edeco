export default function CollegeStats({ college }) {
  if (!college || !college.stats) return null;
  
  return (
    <section className="relative z-30 -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-2">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
          <div className="py-6 px-4 text-center group cursor-pointer hover:bg-slate-50/50 rounded-l-2xl transition-colors">
            <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Placement Rate</p>
            <h3 className="text-3xl font-black text-[#0f71cd] group-hover:text-[#0c62b2] transition-colors drop-shadow-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              {college.stats.placementRate}
            </h3>
          </div>
          <div className="py-6 px-4 text-center group cursor-pointer hover:bg-slate-50/50 transition-colors">
            <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Avg Package</p>
            <h3 className="text-3xl font-black text-[#0f71cd] group-hover:text-[#0c62b2] transition-colors drop-shadow-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              {college.stats.avgPackage}
            </h3>
          </div>
          <div className="py-6 px-4 text-center group cursor-pointer hover:bg-slate-50/50 transition-colors">
            <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Faculty Rating</p>
            <h3 className="text-3xl font-black text-[#0f71cd] group-hover:text-[#0c62b2] transition-colors drop-shadow-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              {college.stats.facultyRating}
            </h3>
          </div>
          <div className="py-6 px-4 text-center group cursor-pointer hover:bg-slate-50/50 rounded-r-2xl transition-colors">
            <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Infrastructure</p>
            <h3 className="text-3xl font-black text-[#0f71cd] group-hover:text-[#0c62b2] transition-colors drop-shadow-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              {college.stats.infrastructure}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
