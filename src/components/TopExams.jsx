import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Heart, Bell, Calendar, Monitor, BookOpen, Bookmark, ArrowUpRight, Scale
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

export default function TopExams() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [comparedExams, setComparedExams] = useState([]);

  const handleToggleCompare = (examId) => {
    setComparedExams(prev => 
      prev.includes(examId) 
        ? prev.filter(id => id !== examId)
        : [...prev, examId]
    );
  };

  const filteredExams = activeCategory === "All" 
    ? EXAMS_DATA 
    : EXAMS_DATA.filter(exam => exam.category === activeCategory);

  return (
    <section className="relative py-32 bg-brand-50 overflow-hidden border-y border-brand-200">
      {/* Background Ambience & 3D Elements */}
      <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Books.png" alt="3D Books" className="absolute top-20 left-10 w-48 h-48 opacity-[0.05] blur-sm pointer-events-none animate-[bounce_8s_ease-in-out_infinite]" />
      <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Graduation%20Cap.png" alt="3D Cap" className="absolute bottom-20 right-10 w-64 h-64 opacity-[0.05] blur-[2px] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.01]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left">
            <h2 className="text-4xl sm:text-5xl font-black text-brand-800 tracking-tight mb-4 font-display">
              Top Entrance Exams
              <span className="block mt-2.5 h-1.5 w-24 bg-gradient-brand rounded-full"></span>
            </h2>
            <p className="text-brand-800/70 font-medium text-lg">
              Don’t miss important exam dates and deadlines. Stay ahead of your application timeline.
            </p>
          </div>
          <button className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-brand-800 font-bold border border-brand-200 transition-all group shadow-sm cursor-pointer">
            View All Exams <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* CATEGORY PILLS NAVIGATION */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-8 mb-4 snap-x">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`snap-start whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm cursor-pointer ${
                activeCategory === category
                  ? "bg-brand-800 text-white shadow-md shadow-brand-800/10"
                  : "bg-white text-brand-800/70 border border-brand-200 hover:bg-slate-50 hover:text-brand-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* EXAMS GRID */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredExams.map((exam) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                key={exam.id}
                className="bg-white rounded-[2rem] p-6 shadow-sm border border-brand-200 relative group hover:-translate-y-2 hover:shadow-xl hover:border-brand-500/40 transition-all duration-500 flex flex-col h-full overflow-hidden"
              >
                {/* Glow Effect inside card on hover */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500 opacity-0 group-hover:opacity-[0.06] blur-[60px] rounded-full transition-opacity duration-700 pointer-events-none"></div>

                {/* Top Section */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-800 font-black text-xl flex items-center justify-center border border-brand-200 group-hover:bg-brand-500 group-hover:text-white group-hover:border-transparent group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-500/20 transition-all">
                    {exam.name.substring(0, 3).toUpperCase()}
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <button className="text-brand-800/40 hover:text-rose-500 transition-colors cursor-pointer">
                      <Bookmark size={20} className="hover:fill-current" />
                    </button>
                    <span className="px-3 py-1 bg-brand-50 text-brand-800/70 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-brand-200 group-hover:bg-brand-500/10 group-hover:text-brand-600 group-hover:border-brand-500/20 transition-colors">
                      {exam.category}
                    </span>
                  </div>
                </div>

                {/* Exam Info */}
                <div className="mb-6 flex-1 text-left">
                  <h3 className="text-2xl font-black text-brand-800 tracking-tight mb-1">{exam.name}</h3>
                  <p className="text-[11px] font-bold text-brand-800/50 uppercase tracking-wide mb-3 group-hover:text-brand-500 transition-colors">{exam.fullTitle}</p>
                  <p className="text-sm text-brand-800/70 font-medium leading-relaxed line-clamp-2">{exam.desc}</p>
                </div>

                {/* Key Info Strip */}
                <div className="grid grid-cols-2 gap-2 mb-8 mt-auto">
                  <div className="p-3 rounded-xl bg-brand-50 border border-brand-100 group-hover:bg-brand-50/50 transition-colors flex flex-col gap-1 text-left">
                    <div className="flex items-center gap-1.5 text-brand-800/50">
                      <Calendar size={12} className="text-brand-500" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Date</span>
                    </div>
                    <span className="text-xs font-black text-brand-800">{exam.appOpen}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-brand-50 border border-brand-100 group-hover:bg-brand-50/50 transition-colors flex flex-col gap-1 text-left">
                    <div className="flex items-center gap-1.5 text-brand-800/50">
                      <Monitor size={12} className="text-brand-500" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Mode</span>
                    </div>
                    <span className="text-xs font-black text-brand-800">{exam.mode}</span>
                  </div>
                  <div className="col-span-2 p-3 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-1.5 text-brand-800/60">
                      <BookOpen size={12} className="text-brand-500" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Level</span>
                    </div>
                    <span className="text-xs font-black text-brand-800">{exam.level}</span>
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="flex items-center gap-2 pt-5 border-t border-brand-200">
                  <Link 
                    to={`/exam/${exam.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-mint hover:bg-brand-blue text-brand-800 hover:text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-sm border border-brand-200/50 hover:border-transparent"
                  >
                    View Details <ArrowRight size={16} />
                  </Link>
                  <button 
                    onClick={() => handleToggleCompare(exam.id)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border shrink-0 cursor-pointer ${
                      comparedExams.includes(exam.id)
                        ? 'bg-brand-500 text-white border-transparent shadow-md shadow-brand-500/25'
                        : 'bg-brand-50 text-brand-800 hover:bg-brand-100 hover:text-brand-900 border-brand-200'
                    }`} 
                    title="Compare Exam"
                  >
                    <Scale size={18} />
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
