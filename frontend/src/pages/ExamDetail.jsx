import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CounsellingModal from '../components/CounsellingModal';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../utils/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

import { 
  Calendar, Users, Target, BookOpen, AlertCircle, BadgeCheck, 
  ChevronRight, FileText, ArrowRight, Bookmark, ArrowUpRight, 
  MapPin, Clock, Download, ChevronDown, CheckCircle, ShieldCheck, User, Scale, Monitor
} from 'lucide-react';

const getMockExamData = (id) => {
  const exams = {
    'cat': {
      id: 'cat',
      name: "CAT 2026",
      fullTitle: "Common Admission Test",
      category: "Management",
      level: "National Level",
      mode: "Computer Based Test (CBT)",
      applicants: "3.3 Lakh+",
      duration: "120 Minutes",
      conductingBody: "IIMs",
      frequency: "Once a Year",
      logo: "CA",
      overview: "CAT is India's most prestigious management entrance exam conducted by the IIMs. It evaluates a candidate's quantitative, verbal, and logical reasoning skills for admission into top-tier MBA programs across the country.",
      highlights: [
        { label: "Exam Mode", value: "Online (CBT)" },
        { label: "Exam Duration", value: "2 Hours (40 min/section)" },
        { label: "Total Questions", value: "66 Questions" },
        { label: "Negative Marking", value: "-1 for MCQs" },
        { label: "Participating Colleges", value: "1000+ B-Schools" },
        { label: "Difficulty Level", value: "High to Very High" },
      ],
      process: [
        { title: "Registration", desc: "Fill the online application form and upload documents." },
        { title: "Fee Payment", desc: "Pay the registration fee of ₹2400 (₹1200 for SC/ST)." },
        { title: "Admit Card", desc: "Download admit card from the official CAT website." },
        { title: "Examination", desc: "Appear for the CBT at the designated center." },
        { title: "Results & WAT-PI", desc: "Shortlisted candidates appear for WAT and PI rounds." }
      ],
      syllabus: [
        { subject: "Verbal Ability & Reading Comprehension (VARC)", topics: ["Reading Comprehension", "Para Jumbles", "Para Summary", "Odd Sentence Out"] },
        { subject: "Data Interpretation & Logical Reasoning (DILR)", topics: ["Seating Arrangement", "Blood Relations", "Tables and Pie Charts", "Syllogism"] },
        { subject: "Quantitative Aptitude (QA)", topics: ["Arithmetic", "Algebra", "Geometry", "Number System", "Modern Math"] }
      ],
      dates: [
        { event: "Notification Release", date: "July 30, 2026", status: "completed" },
        { event: "Registration Begins", date: "August 02, 2026", status: "active" },
        { event: "Registration Closes", date: "September 20, 2026", status: "upcoming" },
        { event: "Admit Card Release", date: "October 25, 2026", status: "upcoming" },
        { event: "CAT 2026 Exam", date: "November 29, 2026", status: "upcoming" },
        { event: "Result Declaration", date: "January 2027", status: "upcoming" }
      ],
      tips: [
        { title: "Mock Tests are Key", desc: "Take at least 30-40 full-length mock tests before the actual exam to build stamina and identify weak areas." },
        { title: "Focus on Accuracy", desc: "With a +3/-1 marking scheme, accuracy is more important than the number of attempts." },
        { title: "Read Extensively", desc: "Improve your VARC score by reading diverse articles from sources like Aeon, The Economist, and ALD." }
      ],
      cutoffs: [
        { college: "IIM Ahmedabad", cat: "General", percentile: "99.5+" },
        { college: "IIM Bangalore", cat: "General", percentile: "99.0+" },
        { college: "IIM Calcutta", cat: "General", percentile: "99.0+" },
        { college: "FMS Delhi", cat: "General", percentile: "98.5+" },
      ],
      papers: [
        { year: "2023", size: "2.4 MB" },
        { year: "2022", size: "2.1 MB" },
        { year: "2021", size: "1.8 MB" }
      ],
      faqs: [
        { q: "What is the eligibility criteria for CAT?", a: "A bachelor's degree with at least 50% marks or equivalent CGPA (45% for SC/ST/PwD candidates)." },
        { q: "Can final year students apply?", a: "Yes, candidates appearing for the final year of their bachelor's degree can also apply." },
        { q: "Is calculator allowed?", a: "A basic on-screen calculator is provided during the exam. Physical calculators are strictly prohibited." }
      ]
    }
  };
  
  return exams[id] || {
    ...exams['cat'],
    id: id,
    name: id.toUpperCase() + " 2026",
    logo: id.substring(0,2).toUpperCase(),
    fullTitle: id.toUpperCase() + " Admission Test",
  };
};

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
      setSidebarName(user.name || '');
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
      <div className="min-h-screen bg-brand-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#110051] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-[#110051] mb-2">Exam Information Not Found</h2>
        <p className="text-slate-500 mb-6 font-medium">The exam details you requested do not exist in our database.</p>
        <Link to="/" className="px-6 py-2.5 bg-[#110051] text-white font-bold text-sm rounded-xl">Go Back Home</Link>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-brand-50 font-sans selection:bg-brand-200 selection:text-brand-800">
      <Navbar onCounsellingClick={() => setIsApplyOpen(true)} />

      {/* ====================================================
          1. EXAM HERO SECTION
      ==================================================== */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 bg-white overflow-hidden border-b border-brand-200 text-left">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/95 via-white/80 to-brand-50/90 backdrop-blur-[2px]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex items-center text-xs font-semibold text-brand-800/60 gap-2 mb-8">
            <Link to="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/" className="hover:text-brand-500 transition-colors">Exams</Link>
            <ChevronRight size={12} />
            <span className="text-brand-800 font-bold">{exam.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
            <div className="flex flex-col sm:flex-row gap-6 items-start lg:w-3/5">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl border border-brand-200 bg-white shadow-sm flex-shrink-0 relative overflow-hidden flex items-center justify-center font-black text-4xl text-brand-500 bg-gradient-to-br from-white to-brand-50">
                {exam.logo}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-brand-50 text-brand-500 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-brand-200">
                    {exam.category}
                  </span>
                  <span className="px-3 py-1 bg-brand-50 text-brand-800/70 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-brand-200">
                    {exam.level}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-800 tracking-tight mb-2 font-display">
                  {exam.name}
                </h1>
                <p className="text-lg text-brand-800/70 font-medium">
                  {exam.fullTitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full lg:w-2/5">
              <div className="bg-white/85 backdrop-blur-md border border-brand-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-brand-500 mb-1">
                  <Calendar size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Exam Date</span>
                </div>
                <p className="text-brand-800 font-black">{exam.dates.find(d => d.event.toLowerCase().includes('exam'))?.date || 'TBA'}</p>
              </div>
              <div className="bg-white/85 backdrop-blur-md border border-brand-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-brand-500 mb-1">
                  <Monitor size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Mode</span>
                </div>
                <p className="text-brand-800 font-black">{exam.mode}</p>
              </div>
              <div className="bg-white/85 backdrop-blur-md border border-brand-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-brand-500 mb-1">
                  <Clock size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Duration</span>
                </div>
                <p className="text-brand-800 font-black">{exam.duration}</p>
              </div>
              <div className="bg-white/85 backdrop-blur-md border border-brand-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-brand-500 mb-1">
                  <Users size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Applicants</span>
                </div>
                <p className="text-brand-800 font-black">{exam.applicants}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. STICKY TAB NAVIGATION
      ==================================================== */}
      <div className="sticky top-[72px] z-40 bg-white/85 backdrop-blur-xl border-b border-brand-200 mb-10 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleScrollTo(tab.id)}
                className={`py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 relative cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-brand-500 border-brand-500'
                    : 'text-brand-800/60 border-transparent hover:text-brand-800'
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
              <h2 className="text-2xl font-black text-brand-800 mb-4 font-display">{exam.name} Overview</h2>
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-brand-200">
                <p className="text-brand-800/75 text-lg font-medium leading-relaxed mb-8">
                  {exam.overview}
                </p>
                <h3 className="font-bold text-brand-800 mb-4 font-display">Exam Highlights</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {exam.highlights.map((item, i) => (
                    <div key={i} className="bg-brand-50 border border-brand-200 p-4 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-800/60 uppercase">{item.label}</span>
                      <span className="text-sm font-black text-brand-800">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* APPLICATION PROCESS */}
            <div id="section-process" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-brand-800 mb-4 font-display">Application Process</h2>
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-brand-200">
                <div className="relative border-l-2 border-brand-200 ml-4 space-y-8">
                  {exam.process.map((step, i) => (
                    <div key={i} className="relative pl-8">
                      <span className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-brand-50 text-brand-500 border border-brand-200 flex items-center justify-center font-black text-sm shadow-sm">
                        {i + 1}
                      </span>
                      <h4 className="text-lg font-bold text-brand-800 mb-1 font-display">{step.title}</h4>
                      <p className="text-brand-800/70 font-medium">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SYLLABUS SECTION */}
            <div id="section-syllabus" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-brand-800 mb-4 font-display">Syllabus & Pattern</h2>
              <div className="bg-white rounded-3xl shadow-sm border border-brand-200 divide-y divide-brand-200">
                {exam.syllabus.map((section, i) => (
                  <div key={i} className="p-2">
                    <button 
                      onClick={() => setOpenSyllabus(openSyllabus === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none rounded-xl hover:bg-brand-50 transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-brand-800 flex items-center gap-3 font-display">
                        <BookOpen size={18} className="text-brand-500" />
                        {section.subject}
                      </span>
                      <ChevronDown size={20} className={`text-brand-800/40 transition-transform ${openSyllabus === i ? 'rotate-180 text-brand-500' : ''}`} />
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
                            <ul className="list-disc text-brand-800/70 font-medium leading-relaxed space-y-2 marker:text-brand-500">
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
              <h2 className="text-2xl font-black text-brand-800 mb-4 font-display">Important Dates</h2>
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-brand-200">
                <div className="space-y-4">
                  {exam.dates.map((item, i) => (
                    <div key={i} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border ${
                      item.status === 'active' ? 'bg-brand-50 border-brand-200' : 'bg-brand-50 border-brand-200/50'
                    }`}>
                      <div className="mb-2 sm:mb-0">
                        <h4 className="font-bold text-brand-800 font-display">{item.event}</h4>
                        <p className="text-sm font-medium text-brand-800/60 flex items-center gap-1.5 mt-1">
                          <Calendar size={14} /> {item.date}
                        </p>
                      </div>
                      <div>
                        {item.status === 'completed' && <span className="px-3 py-1 bg-brand-100 text-brand-800/70 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-brand-200">Completed</span>}
                        {item.status === 'active' && <span className="px-3 py-1 bg-brand-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider animate-pulse">Action Required</span>}
                        {item.status === 'upcoming' && <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-amber-200">Upcoming</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PREPARATION TIPS */}
            <div id="section-tips" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-brand-800 mb-4 font-display">Preparation Strategy</h2>
              <div className="grid gap-4">
                {exam.tips.map((tip, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-brand-200 shadow-sm flex items-start gap-4 hover:border-brand-500 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <Target size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-800 mb-1 font-display">{tip.title}</h4>
                      <p className="text-brand-800/70 font-medium text-sm leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CUT OFFS */}
            <div id="section-cutoff" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-brand-800 mb-4 font-display">Expected Cut Offs</h2>
              <div className="bg-white rounded-3xl shadow-sm border border-brand-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-brand-50 border-b border-brand-200 text-sm">
                        <th className="py-4 px-6 font-bold text-brand-800">College</th>
                        <th className="py-4 px-6 font-bold text-brand-800">Category</th>
                        <th className="py-4 px-6 font-bold text-brand-800 text-right">Cutoff Percentile</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-200">
                      {exam.cutoffs.map((cutoff, i) => (
                        <tr key={i} className="hover:bg-brand-50 transition-colors">
                          <td className="py-4 px-6 font-bold text-brand-800">{cutoff.college}</td>
                          <td className="py-4 px-6 text-sm font-medium text-brand-800/60">{cutoff.cat}</td>
                          <td className="py-4 px-6 text-right font-black text-brand-500">{cutoff.percentile}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* QUESTION PAPERS */}
            <div id="section-papers" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-brand-800 mb-4 font-display">Previous Year Papers</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {exam.papers.map((paper, i) => (
                  <div key={i} className="bg-white border border-brand-200 rounded-2xl p-5 hover:shadow-md hover:border-brand-500 transition-all group text-left">
                    <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <FileText size={24} />
                    </div>
                    <h4 className="font-bold text-brand-800 mb-1 font-display">{exam.name.split(' ')[0]} {paper.year} Paper</h4>
                    <p className="text-xs font-bold text-brand-800/40 mb-4">PDF • {paper.size}</p>
                    <button 
                      onClick={() => handleDownload(paper.year)} 
                      className="w-full py-2 bg-[#110051] hover:bg-[#1a0073] text-white border border-brand-200 hover:border-transparent font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
              <h2 className="text-2xl font-black text-brand-800 mb-4 font-display">Frequently Asked Questions</h2>
              <div className="bg-white rounded-3xl shadow-sm border border-brand-200 divide-y divide-brand-200">
                {exam.faqs.map((faq, i) => (
                  <div key={i} className="p-2">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none cursor-pointer"
                    >
                      <span className="font-bold text-brand-800 pr-4 font-display">{faq.q}</span>
                      <ChevronDown size={20} className={`text-brand-800/40 transition-transform ${openFaq === i ? 'rotate-180 text-brand-500' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-2 text-brand-800/70 font-medium leading-relaxed border-l-2 border-brand-500 ml-4 mb-2">
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
              <div className="bg-white rounded-3xl border border-brand-200 p-6 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-500"></div>
                
                <AnimatePresence mode="wait">
                  {!callbackSubmitted ? (
                    <motion.div
                      key="callback-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-black text-brand-800 mb-2 mt-2 font-display">Need Guidance?</h3>
                      <p className="text-sm text-brand-800/60 mb-6 font-medium">Get free expert advice on preparation strategy, syllabus, and top colleges.</p>
                      
                      <form className="space-y-3" onSubmit={handleRequestCallback}>
                        <input 
                          type="text" 
                          placeholder="Full Name" 
                          value={sidebarName}
                          onChange={(e) => setSidebarName(e.target.value)}
                          className="w-full bg-brand-50 border border-brand-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white text-sm font-medium transition-all text-brand-800 placeholder:text-brand-800/40" 
                          required
                        />
                        <input 
                          type="tel" 
                          placeholder="Mobile Number" 
                          value={sidebarPhone}
                          onChange={(e) => setSidebarPhone(e.target.value)}
                          className="w-full bg-brand-50 border border-brand-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white text-sm font-medium transition-all text-brand-800 placeholder:text-brand-800/40" 
                          required
                        />
                        
                        <button 
                          type="submit" 
                          disabled={isSubmittingCallback}
                          className="w-full bg-[#110051] hover:bg-[#1a0073] text-white font-bold py-3.5 rounded-xl transition-all duration-300 cursor-pointer shadow-sm disabled:opacity-75 flex items-center justify-center gap-2 text-sm font-display font-extrabold uppercase tracking-wide"
                        >
                          {isSubmittingCallback ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            "Request Callback"
                          )}
                        </button>
                        <p className="text-xs text-center text-brand-800/40 mt-3 flex items-center justify-center gap-1.5 font-medium">
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
                      <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mx-auto border border-brand-100 shadow-md">
                        <CheckCircle size={36} className="animate-bounce text-brand-500" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-display font-black text-xl text-brand-800">
                          Data Collected!
                        </h3>
                        <p className="text-sm text-brand-800/60 font-medium px-2 leading-relaxed">
                          Your data has been collected and you will receive a call shortly!
                        </p>
                      </div>

                      <div className="pt-4 border-t border-brand-100/80">
                        <button 
                          onClick={() => {
                            setCallbackSubmitted(false);
                            if (!user) {
                              setSidebarName('');
                              setSidebarPhone('');
                            }
                          }}
                          className="w-full py-2.5 rounded-xl border border-brand-200 text-brand-500 font-bold text-xs hover:bg-brand-50 transition-colors cursor-pointer"
                        >
                          Submit Another Request
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card 2 - Explore Related Exams */}
              <div className="bg-white rounded-3xl border border-brand-200 p-6">
                <h3 className="text-lg font-black text-brand-800 mb-4 font-display">Related Exams</h3>
                <div className="space-y-2">
                  {['XAT', 'CMAT', 'MAT', 'SNAP'].map((related, i) => (
                    <Link to={`/exam/${related.toLowerCase()}`} key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-50 group border border-transparent hover:border-brand-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-800/70 flex items-center justify-center font-black text-[10px] group-hover:bg-brand-100 group-hover:text-brand-800 transition-colors border border-brand-200/50">
                          {related}
                        </div>
                        <span className="font-bold text-brand-800 text-sm font-display">{related} 2026</span>
                      </div>
                      <ChevronRight size={16} className="text-brand-800/40 group-hover:text-brand-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Card 3 - Download Guide */}
              <div className="bg-white rounded-3xl border border-brand-200 p-6 flex flex-col items-center text-center relative overflow-hidden group shadow-sm">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-500"></div>
                <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-brand-200">
                  <FileText size={28} />
                </div>
                <h3 className="text-lg font-black text-brand-800 mb-2 font-display">Get Complete Guide</h3>
                <p className="text-sm text-brand-800/60 font-medium mb-6">Download the official syllabus, pattern, and preparation guide PDF.</p>
                <button 
                  onClick={() => setIsApplyOpen(true)}
                  className="w-full bg-[#110051] hover:bg-[#1a0073] text-white font-black py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-brand-200 hover:border-transparent"
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
      <section className="py-24 relative overflow-hidden bg-white border-t border-brand-200">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="bg-brand-50 rounded-[3rem] p-8 md:p-16 border border-brand-200 shadow-sm text-center">
            <div className="w-20 h-20 rounded-2xl bg-brand-500 text-white flex items-center justify-center mx-auto mb-8 shadow-sm transform -rotate-6">
              <User size={40} className="rotate-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-800 mb-6 tracking-tight font-display">Struggling with Preparation?</h2>
            <p className="text-lg text-brand-800/75 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">Our expert counselors and mentors are here to guide you through the syllabus, build a study plan, and clear your doubts.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => setIsApplyOpen(true)} 
                className="px-8 py-4 bg-[#110051] hover:bg-[#1a0073] text-white font-black rounded-2xl transition-all text-lg cursor-pointer shadow-sm"
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
