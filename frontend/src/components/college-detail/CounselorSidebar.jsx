import { ShieldCheck, FileText, Download, PenTool, ExternalLink } from 'lucide-react';

export default function CounselorSidebar({ college, onApplyClick, onDownloadBrochure }) {
  if (!college) return null;

  return (
    <div className="sticky top-40 space-y-6">
      
      {/* Card 1 - Talk to Counselor */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-[#0f71cd]"></div>
        <h3 className="text-xl font-black text-slate-900 mb-2 mt-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Talk to our Counselor</h3>
        <p className="text-sm text-slate-500 mb-6 font-medium">Get free expert advice on admissions, cutoffs, and placements for {college.shortName}.</p>
        
        <form className="space-y-3">
          <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f71cd] focus:bg-white text-sm font-medium transition-all" />
          <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f71cd] focus:bg-white text-sm font-medium transition-all" />
          <input type="tel" placeholder="Mobile Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f71cd] focus:bg-white text-sm font-medium transition-all" />
          
          <button type="button" onClick={() => onApplyClick(null)} className="w-full bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold py-3.5 rounded-xl transition-all duration-300 mt-2 cursor-pointer shadow-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            Request Callback
          </button>
          <p className="text-xs text-center text-slate-400 mt-3 flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck size={14} /> 100% secure & spam-free.
          </p>
        </form>
      </div>

      {/* Card 2 - Download Brochure */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col items-center text-center relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-[#0f71cd]"></div>
        <div className="w-16 h-16 rounded-full bg-[#0f71cd]/5 text-[#0f71cd] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <FileText size={28} />
        </div>
        <h3 className="text-lg font-black text-slate-900 mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Get Detailed Insights</h3>
        <p className="text-sm text-slate-500 font-medium mb-6">Download the official brochure to explore curriculum, faculty, and campus life.</p>
        <button onClick={onDownloadBrochure} className="w-full bg-white text-[#0f71cd] border border-slate-200 hover:bg-slate-50 font-black py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 group-hover:border-[#0f71cd]/40 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
          <Download size={18} /> Download Brochure
        </button>
      </div>

      {/* Card 3 - Write a Review */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col items-center text-center hover:border-[#0f71cd]/30 transition-colors">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
          <PenTool size={24} />
        </div>
        <h3 className="text-lg font-black text-slate-900 mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Share Your Experience</h3>
        <p className="text-sm text-slate-500 font-medium mb-6">Help thousands of students make the right choice by reviewing your college.</p>
        <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
          Write a Review <ExternalLink size={16} />
        </button>
      </div>

    </div>
  );
}
