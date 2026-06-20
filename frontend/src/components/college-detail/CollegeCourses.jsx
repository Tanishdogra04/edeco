import { GraduationCap, ChevronRight } from 'lucide-react';

export default function CollegeCourses({ college, onApplyClick }) {
  if (!college || !college.courses) return null;

  return (
    <div id="section-courses-fees" className="scroll-mt-36">
      <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
        <GraduationCap className="text-[#0f71cd]" /> Courses & Fees
      </h2>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-sm">
                <th className="py-5 px-6 font-bold text-slate-800">Course Details</th>
                <th className="py-5 px-6 font-bold text-slate-800 hidden sm:table-cell">Eligibility</th>
                <th className="py-5 px-6 font-bold text-slate-800 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {college.courses.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-5 px-6">
                    <div className="font-black text-slate-900 mb-1">{c.name}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#0f71cd] bg-slate-50 px-2 py-1 rounded-md">{c.fees}</span>
                      <span className="text-xs text-slate-500 font-semibold">{c.duration}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-sm text-slate-600 font-medium hidden sm:table-cell">{c.eligibility}</td>
                  <td className="py-5 px-6 text-right">
                    <button onClick={() => onApplyClick(c.name)} className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 text-[#0f71cd] hover:bg-slate-50 font-bold rounded-lg transition-colors text-sm shadow-sm group-hover:border-[#0f71cd]/40">
                      Apply <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
