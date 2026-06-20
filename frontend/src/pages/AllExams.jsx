import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ChevronRight, Calendar, Globe, Scale, ArrowRight,
  X, GitCompare, BookOpen
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CounsellingModal from '../components/CounsellingModal';
import { useToast } from '../context/ToastContext';
import { EXAMS_DATA } from '../data/exams';

const CATEGORIES = [
  "All", "Engineering", "Management", "Law", "Medical", "Design", "Science"
];

const EXAM_MODES = ["All Modes", "Online (CBT)", "Pen & Paper", "Offline", "CBT & PBT"];

export default function AllExams() {
  const toast = useToast();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMode, setActiveMode] = useState("All Modes");
  const [searchQuery, setSearchQuery] = useState("");
  const [comparedExams, setComparedExams] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Explore Entrance Exams | Edeco";
  }, []);

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

  const handleClearFilters = () => {
    setActiveCategory("All");
    setActiveMode("All Modes");
    setSearchQuery("");
  };

  // Filter logic
  const filteredExams = useMemo(() => {
    return EXAMS_DATA.filter(exam => {
      const matchesCategory = activeCategory === "All" || exam.category === activeCategory;
      const matchesMode = activeMode === "All Modes" || exam.mode === activeMode;
      const cleanSearch = searchQuery.toLowerCase().trim();
      const matchesSearch = !cleanSearch ||
        exam.name.toLowerCase().includes(cleanSearch) ||
        exam.fullTitle.toLowerCase().includes(cleanSearch) ||
        exam.desc.toLowerCase().includes(cleanSearch);

      return matchesCategory && matchesMode && matchesSearch;
    });
  }, [activeCategory, activeMode, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#0f71cd]/20 text-[#0F141E]">
      <Navbar onCounsellingClick={() => setIsApplyOpen(true)} lightTextBeforeScroll={true} />

      {/* Hero Header Section */}
      <section className="relative pt-24 pb-16 bg-[#0F141E] text-white overflow-hidden text-left">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(15,113,205,0.12),transparent_50%)]"></div>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,rgba(106,255,217,0.08),transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div>
            {/* Breadcrumbs */}
            <div className="flex items-center text-xs text-slate-400 gap-2 mb-4 font-bold uppercase tracking-wider">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={12} className="text-slate-650" />
              <span className="text-[#0f71cd] font-bold">Entrance Exams</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              Explore Entrance Exams
            </h1>
            <p className="text-slate-350 text-sm sm:text-base mt-2 font-medium max-w-xl leading-relaxed">
              Find complete timelines, syllabus overviews, dates, and comparison tools for JEE, NEET, CAT, and other key national admission exams.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-20">
        <div className="bg-white border border-slate-200 p-5 shadow-xs flex flex-col lg:flex-row gap-5 items-center justify-between rounded-3xl">
          {/* Tabs Filter */}
          <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4.5 py-2.5 text-xs font-extrabold rounded-xl border transition-all cursor-pointer font-tt-talent ${
                  activeCategory === cat
                    ? 'bg-[#0f71cd] text-white border-[#0f71cd] shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/50 hover:text-slate-900'
                }`}
                style={{ fontFamily: '"TT Talent", sans-serif' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto justify-end">
            {/* Mode Select */}
            <div className="relative">
              <select
                value={activeMode}
                onChange={(e) => setActiveMode(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-xs font-bold focus:outline-none focus:border-[#0f71cd] cursor-pointer w-full sm:w-44"
              >
                {EXAM_MODES.map((mode) => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
              <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-450 pointer-events-none rotate-90" />
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64 flex items-center bg-slate-50 border border-slate-200 focus-within:border-[#0f71cd] rounded-xl px-3.5 py-2">
              <Search size={15} className="text-slate-400 mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Search exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 font-semibold outline-none"
              />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-[10px] font-bold text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded-md hover:bg-slate-200/50 transition-all cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-left">
        {filteredExams.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
            <BookOpen size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>No exams found</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto font-medium">
              We couldn't find any exams matching your criteria.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-5 px-5 py-2.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer font-tt-talent"
              style={{ fontFamily: '"TT Talent", sans-serif' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 relative flex flex-col h-full overflow-hidden hover:shadow-md hover:border-slate-300/80 transition-all duration-300 group"
              >
                {/* Tag & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="px-3 py-1 rounded-lg bg-[#0f71cd]/5 text-[#0f71cd] font-tt-talent font-bold text-[10px] uppercase border border-[#0f71cd]/10">
                    {exam.category}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">
                    {exam.mode}
                  </span>
                </div>

                {/* Header Title */}
                <div className="mb-4 text-left">
                  <h3 className="text-lg font-bold text-[#0F141E] font-tt-talent leading-snug group-hover:text-[#0f71cd] transition-colors" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    {exam.name}
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider line-clamp-1">
                    {exam.fullTitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-slate-500 text-xs leading-relaxed font-medium mb-6 flex-1">
                  {exam.desc}
                </p>

                {/* Timeline / Registration details */}
                <div className="space-y-2.5 border-t border-slate-100 pt-4 mt-auto">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-450 flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#0f71cd]" />
                      Registration
                    </span>
                    <span className="text-slate-700 font-bold">{exam.appOpen}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-450 flex items-center gap-1.5">
                      <Globe size={13} className="text-[#0f71cd]" />
                      Level
                    </span>
                    <span className="text-slate-700 font-bold">{exam.level}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-4 shrink-0">
                  <Link 
                    to={`/exam/${exam.id}`}
                    className="flex-1 h-9.5 flex items-center justify-center gap-1.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-tt-talent font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer text-center"
                    style={{ fontFamily: '"TT Talent", sans-serif' }}
                  >
                    View Details <ArrowRight size={14} />
                  </Link>
                  <button 
                    onClick={() => handleToggleCompare(exam.id)}
                    className={`h-9.5 w-9.5 rounded-xl flex items-center justify-center transition-all border shrink-0 cursor-pointer ${
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
        )}
      </main>

      {/* Counselling CTA Section */}
      <section className="py-20 relative overflow-hidden bg-white border-t border-slate-200">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0f71cd]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm text-center">
            <h2 className="text-2xl md:text-3xl font-black text-[#0F141E] mb-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Confused about Exam Deadlines & Forms?</h2>
            <p className="text-slate-600 mb-8 font-medium max-w-xl mx-auto text-sm">Our mentors provide real-time notification alerts, mock blueprints, and targeted prep strategy guidelines.</p>
            <button 
              onClick={() => setIsApplyOpen(true)} 
              className="px-8 py-3.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-black rounded-xl transition-all text-sm cursor-pointer shadow-sm font-tt-talent"
              style={{ fontFamily: '"TT Talent", sans-serif' }}
            >
              Get Free Exam Assistance
            </button>
          </div>
        </div>
      </section>

      <CounsellingModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
      <Footer />

      {/* Exam Compare Drawer & Modal */}
      <AnimatePresence>
        {comparedExams.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl">
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/85 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0f71cd] flex items-center justify-center text-white shadow-sm shrink-0">
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

              <div className="flex flex-wrap items-center gap-2">
                {comparedExams.map((examId) => {
                  const exam = EXAMS_DATA.find(e => e.id === examId);
                  if (!exam) return null;
                  return (
                    <div 
                      key={exam.id}
                      className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg text-xs font-semibold text-slate-700 shadow-xs"
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

              <div>
                <button
                  disabled={comparedExams.length < 2}
                  onClick={() => setIsCompareModalOpen(true)}
                  className={`w-full md:w-auto px-6 py-2 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer ${
                    comparedExams.length < 2
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      : 'bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-tt-talent'
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
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompareModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60"
            />

            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-2xl shadow-xl border border-slate-200 relative z-10 overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between text-left">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-50 text-[#0f71cd]">
                    <GitCompare size={20} />
                  </div>
                  <div>
                    <h3 className="font-tt-talent font-bold text-lg text-[#0F141E]" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                      Entrance Exams Comparison
                    </h3>
                    <p className="text-xs text-slate-400 font-medium font-sans">
                      Analyze structures, format schedules side-by-side.
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

              <div className="flex-1 overflow-x-auto p-6 text-left">
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
                              <span className="text-[10px] font-bold text-[#0f71cd] uppercase tracking-widest">{exam.category}</span>
                              <span className="text-[14px] font-bold text-[#0F141E] font-tt-talent line-clamp-1 mt-0.5" style={{ fontFamily: '"TT Talent", sans-serif' }}>{exam.name}</span>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[13px] font-medium text-slate-700">
                    <tr>
                      <td className="py-4 text-slate-400 font-bold">Official Name</td>
                      {comparedExams.map((examId) => {
                        const exam = EXAMS_DATA.find(e => e.id === examId);
                        return <td key={examId} className="py-4 px-4 text-slate-700 font-semibold">{exam?.fullTitle}</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="py-4 text-slate-400 font-bold">Registration</td>
                      {comparedExams.map((examId) => {
                        const exam = EXAMS_DATA.find(e => e.id === examId);
                        return (
                          <td key={examId} className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs font-extrabold">
                              {exam?.appOpen}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="py-4 text-slate-400 font-bold">Mode</td>
                      {comparedExams.map((examId) => {
                        const exam = EXAMS_DATA.find(e => e.id === examId);
                        return <td key={examId} className="py-4 px-4 text-slate-700 font-semibold">{exam?.mode}</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="py-4 text-slate-400 font-bold">Level</td>
                      {comparedExams.map((examId) => {
                        const exam = EXAMS_DATA.find(e => e.id === examId);
                        return <td key={examId} className="py-4 px-4 text-slate-700 font-semibold">{exam?.level}</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="py-4 text-slate-400 font-bold">Scope & Description</td>
                      {comparedExams.map((examId) => {
                        const exam = EXAMS_DATA.find(e => e.id === examId);
                        return <td key={examId} className="py-4 px-4 text-slate-500 text-xs leading-relaxed">{exam?.desc}</td>;
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  Confused about preparation strategy? Ask our mentors.
                </span>
                <button 
                  onClick={() => { setIsCompareModalOpen(false); setIsApplyOpen(true); }}
                  className="px-6 py-2.5 rounded-xl bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-tt-talent font-bold text-xs shadow-sm cursor-pointer"
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  Get Exam Counselling
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
