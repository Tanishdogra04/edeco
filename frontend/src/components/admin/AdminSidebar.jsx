import { Compass, Building2, List, BookOpenCheck, GraduationCap } from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="space-y-4 text-left">
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-left transition-all font-tt-talent ${
            activeTab === 'overview'
              ? 'bg-[#0f71cd] text-white shadow-md shadow-[#0f71cd]/20'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
          style={{ fontFamily: '"TT Talent", sans-serif' }}
        >
          <Compass size={18} className="shrink-0" />
          Overview
        </button>
        
        <button
          onClick={() => setActiveTab('add-college')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-left transition-all font-tt-talent ${
            activeTab === 'add-college'
              ? 'bg-[#0f71cd] text-white shadow-md shadow-[#0f71cd]/20'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
          style={{ fontFamily: '"TT Talent", sans-serif' }}
        >
          <Building2 size={18} className="shrink-0" />
          Add New College
        </button>

        <button
          onClick={() => setActiveTab('manage-colleges')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-left transition-all font-tt-talent ${
            activeTab === 'manage-colleges'
              ? 'bg-[#0f71cd] text-white shadow-md shadow-[#0f71cd]/20'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
          style={{ fontFamily: '"TT Talent", sans-serif' }}
        >
          <List size={18} className="shrink-0" />
          Manage Colleges
        </button>

        <button
          onClick={() => setActiveTab('add-exam')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-left transition-all font-tt-talent ${
            activeTab === 'add-exam'
              ? 'bg-[#0f71cd] text-white shadow-md shadow-[#0f71cd]/20'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
          style={{ fontFamily: '"TT Talent", sans-serif' }}
        >
          <BookOpenCheck size={18} className="shrink-0" />
          Add Entrance Exam
        </button>

        <button
          onClick={() => setActiveTab('add-course')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-left transition-all font-tt-talent ${
            activeTab === 'add-course'
              ? 'bg-[#0f71cd] text-white shadow-md shadow-[#0f71cd]/20'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
          style={{ fontFamily: '"TT Talent", sans-serif' }}
        >
          <GraduationCap size={18} className="shrink-0" />
          Add Professional Course
        </button>
      </div>

      {/* Quick Helper Widget */}
      <div className="bg-[#0F141E] rounded-3xl p-6 text-white border border-slate-800 shadow-xl space-y-3 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#0f71cd]/10 rounded-full blur-xl translate-x-1/3 -translate-y-1/3 group-hover:scale-125 transition-transform duration-500"></div>
        <h4 className="font-extrabold text-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Need Database Assistance?</h4>
        <p className="text-xs text-slate-400 leading-relaxed font-semibold">To modify existing data or bulk upload records, contact database developers directly or execute bulk loading seed files.</p>
        <a href="mailto:support@edeco.com" className="inline-block text-[11px] font-bold bg-[#0f71cd] hover:bg-[#0c62b2] text-white px-4 py-2 rounded-xl transition-all mt-1 cursor-pointer font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
          Support Email
        </a>
      </div>
    </div>
  );
}
