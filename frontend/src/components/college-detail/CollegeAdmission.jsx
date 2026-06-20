import { FileText } from 'lucide-react';

export default function CollegeAdmission({ college }) {
  return (
    <div id="section-admission" className="scroll-mt-36">
      <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
        <FileText className="text-[#0f71cd]" /> Admission Process
      </h2>
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="relative border-l-2 border-slate-200 ml-3 md:ml-4 space-y-8 py-2">
          <div className="relative pl-8 group">
            <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-[#0f71cd] ring-4 ring-white group-hover:scale-125 transition-transform"></span>
            <h3 className="font-black text-slate-900 text-lg">Step 1: Application</h3>
            <p className="text-slate-500 mt-2 font-medium">Fill out the detailed online application form on the official college website and pay the application fee before the deadline.</p>
          </div>
          <div className="relative pl-8 group">
            <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-[#0f71cd] ring-4 ring-white group-hover:scale-125 transition-transform"></span>
            <h3 className="font-black text-slate-900 text-lg">Step 2: Entrance Exam</h3>
            <p className="text-slate-500 mt-2 font-medium">Appear for the required national/state level entrance exams (e.g. JEE Main, CAT, NEET, CLAT) depending on the course you are applying for.</p>
          </div>
          <div className="relative pl-8 group">
            <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-[#0f71cd] ring-4 ring-white group-hover:scale-125 transition-transform"></span>
            <h3 className="font-black text-slate-900 text-lg">Step 3: Counseling & Merit</h3>
            <p className="text-slate-500 mt-2 font-medium">Shortlisted candidates will be invited for personal interviews or counseling based on cutoff merit lists.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
