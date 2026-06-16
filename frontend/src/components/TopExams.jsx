import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Heart, Bell, Calendar, Monitor, BookOpen, ArrowUpRight, Scale, Globe, X, GitCompare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const CATEGORIES = [
  "All", "Engineering", "Management", "Law", "Medical", "Design", "Science", "Arts"
];

const EXAMS_DATA = [
  {
    id: "jee-main",
    category: "Engineering",
    name: "JEE Main",
    fullTitle: "Joint Entrance Examination Main",
    desc: "National level exam for admission to NITs, IIITs, and CFTIs across India.",
    appOpen: "Registration Closed",
    mode: "Online (CBT)",
    level: "National Level",
  },
  {
    id: "cat",
    category: "Management",
    name: "CAT",
    fullTitle: "Common Admission Test",
    desc: "Premier management entrance exam for admission into the prestigious IIMs and other top B-schools.",
    appOpen: "Aug - Sep 2026",
    mode: "Online (CBT)",
    level: "National Level",
  },
  {
    id: "neet",
    category: "Medical",
    name: "NEET UG",
    fullTitle: "National Eligibility cum Entrance Test",
    desc: "Sole entrance test for admission to MBBS and BDS courses in India.",
    appOpen: "May 3, 2026",
    mode: "Pen & Paper",
    level: "National Level",
  },
  {
    id: "gate",
    category: "Engineering",
    name: "GATE",
    fullTitle: "Graduate Aptitude Test in Engineering",
    desc: "Comprehensive understanding of various undergraduate subjects in engineering and science.",
    appOpen: "Starts Sep 2026",
    mode: "Online (CBT)",
    level: "National Level",
  },
  {
    id: "clat",
    category: "Law",
    name: "CLAT",
    fullTitle: "Common Law Admission Test",
    desc: "Centralized national level entrance test for admissions to 22 National Law Universities.",
    appOpen: "Dec 7, 2026",
    mode: "Offline",
    level: "National Level",
  },
  {
    id: "xat",
    category: "Management",
    name: "XAT",
    fullTitle: "Xavier Aptitude Test",
    desc: "National-level management entrance examination conducted by XLRI, Jamshedpur.",
    appOpen: "Jan 2027",
    mode: "Online (CBT)",
    level: "National Level",
  },
  {
    id: "nift",
    category: "Design",
    name: "NIFT",
    fullTitle: "National Institute of Fashion Technology",
    desc: "Entrance exam for admission to bachelor's programs in design and fashion technology.",
    appOpen: "Feb 2027",
    mode: "CBT & PBT",
    level: "National Level",
  },
  {
    id: "cuet",
    category: "Science",
    name: "CUET UG",
    fullTitle: "Common University Entrance Test",
    desc: "All-India test for admission into various Undergraduate and Integrated programs.",
    appOpen: "May 2026",
    mode: "Online (CBT)",
    level: "National Level",
  },
];

export default function TopExams({ onCounsellingClick }) {
  const toast = useToast();
  const [activeCategory, setActiveCategory] = useState("All");
  const [comparedExams, setComparedExams] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const handleToggleCompare = (examId) => {
    setComparedExams(prev => {
      const exists = prev.includes(examId);
      if (exists) {
        return prev.filter(id => id !== examId);
      } else {
        if (prev.length >= 3) {
          toast.warning("You can compare up to 3 exams at a time.");
          return prev;
        }
        return [...prev, examId];
      }
    });
  };

  const filteredExams = activeCategory === "All" 
    ? EXAMS_DATA 
    : EXAMS_DATA.filter(exam => exam.category === activeCategory);

  return (
    <section className="relative py-16 bg-slate-50 overflow-hidden border-y border-slate-200">
      {/* Background Ambience & 3D Elements */}
      <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Books.png" alt="3D Books" className="absolute top-20 left-10 w-48 h-48 opacity-[0.05] blur-sm pointer-events-none animate-[bounce_8s_ease-in-out_infinite]" />
      <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Graduation%20Cap.png" alt="3D Cap" className="absolute bottom-20 right-10 w-64 h-64 opacity-[0.05] blur-[2px] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0f71cd]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0f71cd]/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.01]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl text-left">
            <h2 className="text-4xl sm:text-5xl font-black text-[#0F141E] font-tt-talent tracking-tight mb-4" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              Top Entrance Exams
              <span className="block mt-2.5 h-1.5 w-24 bg-gradient-to-r from-[#0f71cd] to-[#3ba3ff] rounded-full"></span>
            </h2>
            <p className="text-[#0F141E]/70 font-medium text-lg">
              Don’t miss important exam dates and deadlines. Stay ahead of your application timeline.
            </p>
          </div>
          <button className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0F141E] font-tt-talent font-bold border border-slate-200 hover:border-[#0f71cd]/30 hover:text-[#0f71cd] transition-all group shadow-sm cursor-pointer" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            View All Exams <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* CATEGORY PILLS NAVIGATION */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-5 mb-2 snap-x">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`snap-start whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm cursor-pointer ${
                activeCategory === category
                  ? "bg-[#0f71cd] text-white shadow-md shadow-[#0f71cd]/10"
                  : "bg-white text-[#0F141E]/70 border border-slate-200 hover:bg-slate-50 hover:text-[#0f71cd] hover:border-[#0f71cd]/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* EXAMS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 relative flex flex-col h-full overflow-hidden"
            >
              {/* Top Section */}
              <div className="flex items-center justify-between mb-4">
                <div className="px-3 h-10 rounded-lg bg-[#0f71cd]/5 text-[#0f71cd] font-tt-talent font-bold text-xs flex items-center justify-center border border-[#0f71cd]/20 shadow-xs transition-all duration-300" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                  {exam.name}
                </div>
                <span className="px-2.5 py-0.5 bg-[#0f71cd]/5 text-[#0f71cd] rounded-full text-[10px] font-semibold tracking-wide">
                  {exam.category}
                </span>
              </div>

              {/* Exam Info */}
              <div className="mb-1 text-left h-[52px] flex flex-col justify-start">
                <h3 className="text-lg font-bold text-[#0F141E] font-tt-talent tracking-tight mb-0.5 leading-tight" style={{ fontFamily: '"TT Talent", sans-serif' }}>{exam.name}</h3>
                <p className="text-[10px] font-medium text-[#0F141E]/50 uppercase tracking-wider line-clamp-2 leading-tight">{exam.fullTitle}</p>
              </div>

              {/* Key Info List */}
              <div className="space-y-2.5 mb-5 mt-1 pt-2.5 border-t border-slate-50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#0F141E]/75 font-semibold flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#0f71cd]/60" /> 
                    Registration
                  </span>
                  <span className="font-bold text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{exam.appOpen}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#0F141E]/75 font-semibold flex items-center gap-1.5">
                    <Monitor size={13} className="text-[#0f71cd]/60" /> 
                    Mode
                  </span>
                  <span className="font-bold text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{exam.mode}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#0F141E]/75 font-semibold flex items-center gap-1.5">
                    <Globe size={13} className="text-[#0f71cd]/60" /> 
                    Level
                  </span>
                  <span className="font-bold text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{exam.level}</span>
                </div>
              </div>

              {/* Bottom Action Area */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-auto">
                <Link 
                  to={`/exam/${exam.id}`}
                  className="flex-1 h-9 flex items-center justify-center gap-1.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-tt-talent font-bold text-xs rounded-lg transition-all duration-300 shadow-xs cursor-pointer text-center"
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  View Details <ArrowRight size={14} />
                </Link>
                <button 
                  onClick={() => handleToggleCompare(exam.id)}
                  className={`h-9 w-9 rounded-lg flex items-center justify-center transition-all duration-300 border shrink-0 cursor-pointer ${
                    comparedExams.includes(exam.id)
                      ? 'bg-[#0f71cd] text-white border-transparent'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 border-slate-200'
                  }`} 
                  title="Compare Exam"
                >
                  <Scale size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Exam Compare Drawer & Modal */}
      <AnimatePresence>
        {comparedExams.length > 0 && (
          <div className="fixed bottom-16 lg:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl">
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="glass-effect p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-200/85 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left section: Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0f71cd] flex items-center justify-center text-white shadow-sm">
                  <GitCompare size={20} />
                </div>
                <div className="text-left">
                  <h4 className="text-[14px] font-bold text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Exam Compare Dock</h4>
                  <p className="text-[12px] text-slate-400 font-medium">
                    {comparedExams.length === 1 
                      ? "Add 1 more exam to compare" 
                      : `${comparedExams.length} exams selected to compare`}
                  </p>
                </div>
              </div>

              {/* Center section: Selected exam badges */}
              <div className="flex flex-wrap items-center gap-2">
                {comparedExams.map((examId) => {
                  const exam = EXAMS_DATA.find(e => e.id === examId);
                  if (!exam) return null;
                  return (
                    <div 
                      key={exam.id}
                      className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-xs"
                    >
                      <span>{exam.name}</span>
                      <button 
                        onClick={() => handleToggleCompare(exam.id)}
                        className="p-0.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  );
                })}

                <button 
                  onClick={() => setComparedExams([])}
                  className="text-xs font-bold text-rose-500 hover:text-rose-600 px-2 py-1 cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* Right section: CTA */}
              <div>
                <button
                  disabled={comparedExams.length < 2}
                  onClick={() => setIsCompareModalOpen(true)}
                  className={`w-full md:w-auto px-6 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer ${
                    comparedExams.length < 2
                      ? 'bg-slate-150 text-slate-450 cursor-not-allowed border border-slate-200'
                      : 'bg-[#0f71cd] hover:bg-[#0c62b2] text-white hover:-translate-y-0.5 duration-300 font-tt-talent'
                  }`}
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  Compare Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Comparison Modal Overlay */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompareModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-2xl shadow-xl border border-slate-200 relative z-10 overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-50 text-[#0f71cd]">
                    <GitCompare size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-tt-talent font-bold text-lg text-[#0F141E]" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                      Entrance Exams Side-by-Side Comparison
                    </h3>
                    <p className="text-xs text-slate-400 font-medium font-sans">
                      Analyze schedules, test delivery formats, and structures to stay ahead.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCompareModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Table Body Content (Scrollable) */}
              <div className="flex-1 overflow-x-auto p-6">
                <table className="w-full min-w-[600px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="py-4 text-xs font-semibold text-slate-400 uppercase w-1/4">Comparison Criteria</th>
                      {comparedExams.map((examId) => {
                        const exam = EXAMS_DATA.find(e => e.id === examId);
                        if (!exam) return null;
                        return (
                          <th key={exam.id} className="py-4 px-4 w-1/4">
                            <div className="flex flex-col text-left">
                              <span className="text-[11px] font-bold text-[#0f71cd] uppercase tracking-widest font-sans">{exam.category}</span>
                              <span className="text-[14px] font-bold text-[#0F141E] font-tt-talent line-clamp-1 mt-0.5" style={{ fontFamily: '"TT Talent", sans-serif' }}>{exam.name}</span>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[13px] font-medium text-slate-700">
                    
                    {/* Full Title */}
                    <tr>
                      <td className="py-4 text-slate-450 font-bold">Official Name</td>
                      {comparedExams.map((examId) => {
                        const exam = EXAMS_DATA.find(e => e.id === examId);
                        return <td key={examId} className="py-4 px-4 text-slate-700 font-semibold">{exam?.fullTitle}</td>;
                      })}
                    </tr>

                    {/* Registration/Timeline */}
                    <tr>
                      <td className="py-4 text-slate-450 font-bold">Registration Status</td>
                      {comparedExams.map((examId) => {
                        const exam = EXAMS_DATA.find(e => e.id === examId);
                        return (
                          <td key={examId} className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-extrabold font-sans">
                              {exam?.appOpen}
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Mode */}
                    <tr>
                      <td className="py-4 text-slate-450 font-bold">Exam Mode</td>
                      {comparedExams.map((examId) => {
                        const exam = EXAMS_DATA.find(e => e.id === examId);
                        return <td key={examId} className="py-4 px-4 text-slate-700 font-semibold">{exam?.mode}</td>;
                      })}
                    </tr>

                    {/* Level */}
                    <tr>
                      <td className="py-4 text-slate-450 font-bold">Exam Level</td>
                      {comparedExams.map((examId) => {
                        const exam = EXAMS_DATA.find(e => e.id === examId);
                        return <td key={examId} className="py-4 px-4 text-slate-700 font-semibold">{exam?.level}</td>;
                      })}
                    </tr>

                    {/* Description */}
                    <tr>
                      <td className="py-4 text-slate-450 font-bold">Scope & Description</td>
                      {comparedExams.map((examId) => {
                        const exam = EXAMS_DATA.find(e => e.id === examId);
                        return <td key={examId} className="py-4 px-4 text-slate-500 text-xs leading-relaxed">{exam?.desc}</td>;
                      })}
                    </tr>

                  </tbody>
                </table>
              </div>

              {/* Footer CTA */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium font-sans">
                  Confused about application eligibility? Ask our advisors.
                </span>
                <button 
                  onClick={() => { setIsCompareModalOpen(false); if (onCounsellingClick) onCounsellingClick(); }}
                  className="px-6 py-2.5 rounded-xl bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-tt-talent font-bold text-xs shadow-sm cursor-pointer duration-300 transition-all"
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  Get Expert Guidance
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
