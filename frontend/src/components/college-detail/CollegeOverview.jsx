import { Info, Building2, Lightbulb, Sparkles } from 'lucide-react';

export default function CollegeOverview({ college }) {
  if (!college) return null;

  return (
    <div id="section-overview" className="scroll-mt-36">
      <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
        <Info className="text-[#0f71cd]" /> About {college.shortName}
      </h2>
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 leading-relaxed text-slate-600 font-medium mb-8">
        <p>{college.about}</p>
      </div>

      {/* Campus Gallery */}
      {college.images && college.images.length > 0 && (
        <div className="mb-10 text-left">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            <Building2 className="text-[#0f71cd]" /> Campus Gallery
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {college.images.map((img, index) => (
              <div 
                key={index} 
                className="relative h-64 rounded-3xl overflow-hidden shadow-sm group border border-slate-200 bg-white"
              >
                <img 
                  src={img} 
                  alt={`${college.shortName} Campus ${index + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent p-4 flex justify-between items-end">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {index === 0 ? "Main Campus Entrance" : "Main Building & Campus Area"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Why Choose This College */}
      {college.whyChoose && college.whyChoose.length > 0 && (
        <>
          <h3 className="text-xl font-black text-slate-900 mb-6 mt-10 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            <Lightbulb className="text-[#0f71cd]" /> Why Choose {college.shortName}?
          </h3>
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <ul className="space-y-6">
              {college.whyChoose.map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#0f71cd] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-[#0f71cd]/20 mt-1">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
