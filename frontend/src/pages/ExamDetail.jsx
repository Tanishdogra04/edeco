import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CounsellingModal from '../components/CounsellingModal';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../utils/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

import { 
  Calendar, Users, Target, BookOpen, 
  ChevronRight, FileText, 
  Clock, Download, ChevronDown, CheckCircle, ShieldCheck, User, Monitor
} from 'lucide-react';

import { getMockExamData } from '../data/exams';

export default function ExamDetail() {
  const toast = useToast();
  const { user } = useAuth();
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [openSyllabus, setOpenSyllabus] = useState(0);
  const [downloadingPaper, setDownloadingPaper] = useState(null);

  const [sidebarName, setSidebarName] = useState('');
  const [sidebarPhone, setSidebarPhone] = useState('');
  const [isSubmittingCallback, setIsSubmittingCallback] = useState(false);
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setSidebarName(user.name || '');
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleRequestCallback = async (e) => {
    e?.preventDefault();
    if (!sidebarName.trim()) {
      toast.warning("Please enter your name");
      return;
    }
    if (!sidebarPhone.trim()) {
      toast.warning("Please enter your mobile number");
      return;
    }
    const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
    if (!phoneRegex.test(sidebarPhone.trim())) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    setIsSubmittingCallback(true);
    try {
      const payload = {
        name: sidebarName,
        phone: sidebarPhone,
        email: user?.email || `${sidebarPhone.replace(/\D/g, '')}@edeco.in`,
        exam: exam?.name || examId,
        query: `Callback requested from Exam Detail Page (Sidebar Form)`
      };
      
      const response = await api.counselling.submit(payload);
      if (response.success) {
        setCallbackSubmitted(true);
        toast.success("Callback request submitted successfully!");
      } else {
        toast.error(response.error || "Failed to submit request");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmittingCallback(false);
    }
  };

  useEffect(() => {
    const fetchExam = async () => {
      setLoading(true);
      try {
        const data = await api.exams.getById(examId);
        if (data.success && data.exam) {
          setExam(data.exam);
        } else {
          setExam(getMockExamData(examId));
        }
      } catch (err) {
        console.error('Error fetching exam details, falling back to mock data:', err.message);
        setExam(getMockExamData(examId));
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [examId]);

  const handleDownload = (paperYear) => {
    setDownloadingPaper(paperYear);
    setTimeout(() => {
      toast.success(`Successfully Downloaded ${exam.name.split(' ')[0]} ${paperYear} Question Paper PDF!`);
      setDownloadingPaper(null);
    }, 1500);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'process', label: 'Application Process' },
    { id: 'syllabus', label: 'Syllabus' },
    { id: 'dates', label: 'Exam Dates' },
    { id: 'tips', label: 'Prep Tips' },
    { id: 'cutoff', label: 'Cut Off' },
    { id: 'papers', label: 'Question Papers' },
    { id: 'faqs', label: 'FAQs' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [examId]);

  const handleScrollTo = (id) => {
    setActiveTab(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0f71cd] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-[#0F141E] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Exam Information Not Found</h2>
        <p className="text-slate-500 mb-6 font-medium">The exam details you requested do not exist in our database.</p>
        <Link to="/" className="px-6 py-2.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold text-sm rounded-xl font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Go Back Home</Link>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50/50 font-sans selection:bg-[#0f71cd]/20 selection:text-[#0F141E] text-[#0F141E]">
      <Navbar onCounsellingClick={() => setIsApplyOpen(true)} />

      {/* ====================================================
          1. EXAM HERO SECTION
      ==================================================== */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 bg-white overflow-hidden border-b border-slate-200 text-left">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/95 via-white/80 to-slate-50/90 backdrop-blur-[2px]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0f71cd]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex items-center text-xs font-semibold text-slate-500 gap-2 mb-8">
            <Link to="/" className="hover:text-[#0f71cd] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/" className="hover:text-[#0f71cd] transition-colors">Exams</Link>
            <ChevronRight size={12} />
            <span className="text-[#0F141E] font-bold">{exam.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
            <div className="flex flex-col sm:flex-row gap-6 items-start lg:w-3/5">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl border border-slate-200 bg-white shadow-sm flex-shrink-0 relative overflow-hidden flex items-center justify-center font-black text-4xl text-[#0f71cd] bg-gradient-to-br from-white to-[#0f71cd]/5">
                {exam.logo}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#0f71cd]/10 text-[#0f71cd] text-[10px] font-bold uppercase tracking-wider rounded-lg border border-[#0f71cd]/20">
                    {exam.category}
                  </span>
                  <span className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-slate-200">
                    {exam.level}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F141E] tracking-tight mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                  {exam.name}
                </h1>
                <p className="text-lg text-slate-600 font-medium">
                  {exam.fullTitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full lg:w-2/5 text-[#0F141E]">
              <div className="bg-white/85 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-[#0f71cd] mb-1">
                  <Calendar size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Exam Date</span>
                </div>
                <p className="text-[#0F141E] font-black">{exam.dates.find(d => d.event.toLowerCase().includes('exam'))?.date || 'TBA'}</p>
              </div>
              <div className="bg-white/85 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-[#0f71cd] mb-1">
                  <Monitor size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Mode</span>
                </div>
                <p className="text-[#0F141E] font-black">{exam.mode}</p>
              </div>
              <div className="bg-white/85 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-[#0f71cd] mb-1">
                  <Clock size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Duration</span>
                </div>
                <p className="text-[#0F141E] font-black">{exam.duration}</p>
              </div>
              <div className="bg-white/85 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-[#0f71cd] mb-1">
                  <Users size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Applicants</span>
                </div>
                <p className="text-[#0F141E] font-black">{exam.applicants}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. STICKY TAB NAVIGATION
      ==================================================== */}
      <div className="sticky top-[72px] z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200 mb-10 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleScrollTo(tab.id)}
                className={`py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 relative cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-[#0f71cd] border-[#0f71cd]'
                    : 'text-slate-500 border-transparent hover:text-[#0F141E]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================
          3. MAIN LAYOUT (70/30 Grid)
      ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: EXAM CONTENT SECTIONS */}
          <div className="lg:col-span-8 space-y-16 text-left">
            
            {/* OVERVIEW SECTION */}
            <div id="section-overview" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-[#0F141E] mb-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{exam.name} Overview</h2>
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <p className="text-[#0F141E]/80 text-lg font-medium leading-relaxed mb-8">
                  {exam.overview}
                </p>
                <h3 className="font-bold text-[#0F141E] mb-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Exam Highlights</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {exam.highlights.map((item, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase">{item.label}</span>
                      <span className="text-sm font-black text-[#0F141E]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* APPLICATION PROCESS */}
            <div id="section-process" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-[#0F141E] mb-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Application Process</h2>
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
                  {exam.process.map((step, i) => (
                    <div key={i} className="relative pl-8">
                      <span className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#0f71cd]/10 text-[#0f71cd] border border-[#0f71cd]/20 flex items-center justify-center font-black text-sm shadow-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                        {i + 1}
                      </span>
                      <h4 className="text-lg font-bold text-[#0F141E] mb-1 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{step.title}</h4>
                      <p className="text-slate-500 font-medium">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SYLLABUS SECTION */}
            <div id="section-syllabus" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-[#0F141E] mb-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Syllabus & Pattern</h2>
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 divide-y divide-slate-100">
                {exam.syllabus.map((section, i) => (
                  <div key={i} className="p-2">
                    <button 
                      onClick={() => setOpenSyllabus(openSyllabus === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-[#0F141E] flex items-center gap-3 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                        <BookOpen size={18} className="text-[#0f71cd]" />
                        {section.subject}
                      </span>
                      <ChevronDown size={20} className={`text-slate-400 transition-transform ${openSyllabus === i ? 'rotate-180 text-[#0f71cd]' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openSyllabus === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-12 pb-4 pt-2">
                            <ul className="list-disc text-slate-600 font-medium leading-relaxed space-y-2 marker:text-[#0f71cd]">
                              {section.topics.map((topic, j) => (
                                <li key={j}>{topic}</li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* EXAM DATES */}
            <div id="section-dates" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-[#0F141E] mb-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Important Dates</h2>
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="space-y-4">
                  {exam.dates.map((item, i) => (
                    <div key={i} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border ${
                      item.status === 'active' ? 'bg-[#0f71cd]/5 border-[#0f71cd]/10' : 'bg-slate-50 border-slate-200/50'
                    }`}>
                      <div className="mb-2 sm:mb-0">
                        <h4 className="font-bold text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{item.event}</h4>
                        <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-1">
                          <Calendar size={14} /> {item.date}
                        </p>
                      </div>
                      <div>
                        {item.status === 'completed' && <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-slate-200">Completed</span>}
                        {item.status === 'active' && <span className="px-3 py-1 bg-[#0f71cd] text-white rounded-lg text-[10px] font-bold uppercase tracking-wider animate-pulse">Action Required</span>}
                        {item.status === 'upcoming' && <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-amber-200">Upcoming</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PREPARATION TIPS */}
            <div id="section-tips" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-[#0F141E] mb-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Preparation Strategy</h2>
              <div className="grid gap-4">
                {exam.tips.map((tip, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#0f71cd] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <Target size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F141E] mb-1 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{tip.title}</h4>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CUT OFFS */}
            <div id="section-cutoff" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-[#0F141E] mb-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Expected Cut Offs</h2>
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-sm">
                        <th className="py-4 px-6 font-bold text-slate-700">College</th>
                        <th className="py-4 px-6 font-bold text-slate-700">Category</th>
                        <th className="py-4 px-6 font-bold text-slate-700 text-right">Cutoff Percentile</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {exam.cutoffs.map((cutoff, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-6 font-bold text-[#0F141E]">{cutoff.college}</td>
                          <td className="py-4 px-6 text-sm font-medium text-slate-550">{cutoff.cat}</td>
                          <td className="py-4 px-6 text-right font-black text-[#0f71cd]">{cutoff.percentile}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* QUESTION PAPERS */}
            <div id="section-papers" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-[#0F141E] mb-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Previous Year Papers</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {exam.papers.map((paper, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-[#0f71cd] transition-all group text-left">
                    <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <FileText size={24} />
                    </div>
                    <h4 className="font-bold text-[#0F141E] mb-1 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{exam.name.split(' ')[0]} {paper.year} Paper</h4>
                    <p className="text-xs font-bold text-slate-400 mb-4">PDF • {paper.size}</p>
                    <button 
                      onClick={() => handleDownload(paper.year)} 
                      className="w-full py-2 bg-[#0f71cd] hover:bg-[#0c62b2] text-white border border-slate-200 hover:border-transparent font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer font-tt-talent"
                      style={{ fontFamily: '"TT Talent", sans-serif' }}
                    >
                      {downloadingPaper === paper.year ? (
                        <span className="flex items-center gap-2 animate-pulse"><Clock size={14} className="animate-spin" /> Downloading...</span>
                      ) : (
                        <span className="flex items-center gap-2"><Download size={14} /> Download</span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQS */}
            <div id="section-faqs" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-[#0F141E] mb-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Frequently Asked Questions</h2>
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 divide-y divide-slate-100">
                {exam.faqs.map((faq, i) => (
                  <div key={i} className="p-2">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none cursor-pointer"
                    >
                      <span className="font-bold text-[#0F141E] pr-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{faq.q}</span>
                      <ChevronDown size={20} className={`text-slate-400 transition-transform ${openFaq === i ? 'rotate-180 text-[#0f71cd]' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-2 text-slate-650 font-medium leading-relaxed border-l-2 border-[#0f71cd] ml-4 mb-2">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (STICKY SIDEBAR) */}
          <div className="lg:col-span-4 hidden lg:block text-left">
            <div className="sticky top-40 space-y-6">
              
              {/* Card 1 - Talk to Counselor */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-[#0f71cd]"></div>
                
                <AnimatePresence mode="wait">
                  {!callbackSubmitted ? (
                    <motion.div
                      key="callback-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-black text-[#0F141E] mb-2 mt-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Need Guidance?</h3>
                      <p className="text-sm text-slate-500 mb-6 font-medium">Get free expert advice on preparation strategy, syllabus, and top colleges.</p>
                      
                      <form className="space-y-3" onSubmit={handleRequestCallback}>
                        <input 
                          type="text" 
                          placeholder="Full Name" 
                          value={sidebarName}
                          onChange={(e) => setSidebarName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f71cd] focus:bg-white text-sm font-medium transition-all text-[#0F141E] placeholder:text-slate-400" 
                          required
                        />
                        <input 
                          type="tel" 
                          placeholder="Mobile Number" 
                          value={sidebarPhone}
                          onChange={(e) => setSidebarPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f71cd] focus:bg-white text-sm font-medium transition-all text-[#0F141E] placeholder:text-slate-400" 
                          required
                        />
                        
                        <button 
                          type="submit" 
                          disabled={isSubmittingCallback}
                          className="w-full bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold py-3.5 rounded-xl transition-all duration-300 cursor-pointer shadow-sm disabled:opacity-75 flex items-center justify-center gap-2 text-sm font-tt-talent font-extrabold uppercase tracking-wide"
                          style={{ fontFamily: '"TT Talent", sans-serif' }}
                        >
                          {isSubmittingCallback ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            "Request Callback"
                          )}
                        </button>
                        <p className="text-xs text-center text-slate-400 mt-3 flex items-center justify-center gap-1.5 font-medium">
                          <ShieldCheck size={14} /> 100% secure & spam-free.
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="callback-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="text-center py-6 space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#0f71cd]/10 text-[#0f71cd] flex items-center justify-center mx-auto border border-slate-100 shadow-md">
                        <CheckCircle size={36} className="animate-bounce text-[#0f71cd]" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-tt-talent font-black text-xl text-[#0F141E]" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                          Data Collected!
                        </h3>
                        <p className="text-sm text-slate-500 font-medium px-2 leading-relaxed">
                          Your data has been collected and you will receive a call shortly!
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                        <button 
                          onClick={() => {
                            setCallbackSubmitted(false);
                            if (!user) {
                              setSidebarName('');
                              setSidebarPhone('');
                            }
                          }}
                          className="w-full py-2.5 rounded-xl border border-slate-200 text-[#0f71cd] font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer font-tt-talent"
                          style={{ fontFamily: '"TT Talent", sans-serif' }}
                        >
                          Submit Another Request
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card 2 - Explore Related Exams */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <h3 className="text-lg font-black text-[#0F141E] mb-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Related Exams</h3>
                <div className="space-y-2">
                  {['XAT', 'CMAT', 'MAT', 'SNAP'].map((related, i) => (
                    <Link to={`/exam/${related.toLowerCase()}`} key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 group border border-transparent hover:border-slate-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center font-black text-[10px] group-hover:bg-slate-100 group-hover:text-[#0F141E] transition-colors border border-slate-200">
                          {related}
                        </div>
                        <span className="font-bold text-[#0F141E] text-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{related} 2026</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-[#0f71cd] transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Card 3 - Download Guide */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col items-center text-center relative overflow-hidden group shadow-sm">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-[#0f71cd]"></div>
                <div className="w-16 h-16 rounded-full bg-[#0f71cd]/10 text-[#0f71cd] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-[#0f71cd]/20">
                  <FileText size={28} />
                </div>
                <h3 className="text-lg font-black text-[#0F141E] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Get Complete Guide</h3>
                <p className="text-sm text-slate-500 font-medium mb-6">Download the official syllabus, pattern, and preparation guide PDF.</p>
                <button 
                  onClick={() => setIsApplyOpen(true)}
                  className="w-full bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-black py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200 hover:border-transparent font-tt-talent"
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  <Download size={18} /> Download Guide
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ====================================================
          COUNSELLING CTA SECTION
      ==================================================== */}
      <section className="py-24 relative overflow-hidden bg-white border-t border-slate-200">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0f71cd]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0f71cd]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-sm text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#0f71cd] text-white flex items-center justify-center mx-auto mb-8 shadow-sm transform -rotate-6">
              <User size={40} className="rotate-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0F141E] mb-6 tracking-tight font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Struggling with Preparation?</h2>
            <p className="text-lg text-slate-600 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">Our expert counselors and mentors are here to guide you through the syllabus, build a study plan, and clear your doubts.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => setIsApplyOpen(true)} 
                className="px-8 py-4 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-black rounded-2xl transition-all text-lg cursor-pointer shadow-sm font-tt-talent"
                style={{ fontFamily: '"TT Talent", sans-serif' }}
              >
                Book Free Counselling
              </button>
            </div>
          </div>
        </div>
      </section>

      <CounsellingModal 
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />

      <Footer />
    </div>
  );
}
