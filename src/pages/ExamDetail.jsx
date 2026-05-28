import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Calendar, Users, Target, BookOpen, AlertCircle, BadgeCheck, ChevronRight, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const getMockExamData = (id) => {
  const exams = {
    'jee-main': {
      name: "JEE Main 2026",
      fullName: "Joint Entrance Examination (Main)",
      level: "National Level",
      mode: "Computer Based Test (CBT)",
      applicants: "12 Lakh+",
      frequency: "Twice a Year",
      description: "JEE Main is the preliminary phase of the Joint Entrance Examination for admission into prestigious engineering institutions like NITs, IIITs, and CFTIs across India. It also serves as the qualifying exam for JEE Advanced.",
      dates: [
        { event: "Application Start Date", date: "Nov 15, 2025", status: "completed" },
        { event: "Last Date to Apply", date: "Dec 30, 2025", status: "completed" },
        { event: "Admit Card Release", date: "Jan 20, 2026", status: "active" },
        { event: "Session 1 Exam", date: "Jan 24 - Feb 01, 2026", status: "upcoming" },
        { event: "Result Declaration", date: "Feb 12, 2026", status: "upcoming" }
      ],
      syllabus: [
        { subject: "Physics", topics: ["Mechanics", "Electrodynamics", "Optics", "Modern Physics"] },
        { subject: "Chemistry", topics: ["Physical Chemistry", "Inorganic Chemistry", "Organic Chemistry"] },
        { subject: "Mathematics", topics: ["Calculus", "Algebra", "Coordinate Geometry", "Vectors"] }
      ],
      highlights: [
        "Negative marking applies: -1 for every incorrect answer.",
        "Section B requires numerical value answers.",
        "Top 2.5 lakh candidates qualify for JEE Advanced."
      ]
    },
    'cat': {
      name: "CAT 2026",
      fullName: "Common Admission Test",
      level: "National Level",
      mode: "Computer Based Test (CBT)",
      applicants: "3.3 Lakh+",
      frequency: "Once a Year",
      description: "CAT is India's most prestigious management entrance exam conducted by the IIMs. It evaluates a candidate's quantitative, verbal, and logical reasoning skills for admission into top-tier MBA programs.",
      dates: [
        { event: "Registration Begins", date: "Aug 01, 2026", status: "upcoming" },
        { event: "Registration Closes", date: "Sep 15, 2026", status: "upcoming" },
        { event: "Admit Card Download", date: "Oct 25, 2026", status: "upcoming" },
        { event: "CAT Exam Date", date: "Nov 29, 2026", status: "upcoming" },
        { event: "Results Declared", date: "Jan 2027", status: "upcoming" }
      ],
      syllabus: [
        { subject: "VARC", topics: ["Reading Comprehension", "Para Jumbles", "Verbal Logic"] },
        { subject: "DILR", topics: ["Seating Arrangement", "Blood Relations", "Data Sufficiency", "Puzzles"] },
        { subject: "QA", topics: ["Arithmetic", "Algebra", "Geometry", "Number System"] }
      ],
      highlights: [
        "Strict sectional time limits of 40 minutes per section.",
        "Use of on-screen calculator is permitted.",
        "IIMs conduct separate WAT-PI rounds post CAT results."
      ]
    },
    'neet': {
      name: "NEET UG 2026",
      fullName: "National Eligibility cum Entrance Test",
      level: "National Level",
      mode: "Offline (Pen & Paper)",
      applicants: "24 Lakh+",
      frequency: "Once a Year",
      description: "NEET is the single national level medical entrance exam conducted by NTA for admission to MBBS, BDS, AYUSH, and other medical/paramedical courses in approved/recognized Medical/Dental Colleges.",
      dates: [
        { event: "Application Start", date: "Feb 09, 2026", status: "upcoming" },
        { event: "Last Date to Apply", date: "Mar 16, 2026", status: "upcoming" },
        { event: "Exam Date", date: "May 03, 2026", status: "upcoming" },
        { event: "Results Declared", date: "Jun 14, 2026", status: "upcoming" }
      ],
      syllabus: [
        { subject: "Physics", topics: ["Kinematics", "Thermodynamics", "Optics", "Modern Physics"] },
        { subject: "Chemistry", topics: ["Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry"] },
        { subject: "Biology", topics: ["Botany", "Zoology", "Human Physiology", "Genetics"] }
      ],
      highlights: [
        "720 total marks with -1 negative marking.",
        "Biology constitutes 50% of the entire paper weightage.",
        "No limit on the number of attempts."
      ]
    },
    'gate': {
      name: "GATE 2026",
      fullName: "Graduate Aptitude Test in Engineering",
      level: "National Level",
      mode: "Computer Based Test (CBT)",
      applicants: "8 Lakh+",
      frequency: "Once a Year",
      description: "GATE is a national level exam that primarily tests the comprehensive understanding of various undergraduate subjects in Engineering and Science for admission into Masters Programs and Job in Public Sector Companies.",
      dates: [
        { event: "Online Application", date: "Aug 24, 2025", status: "completed" },
        { event: "Admit Card", date: "Jan 03, 2026", status: "active" },
        { event: "Exam Dates", date: "Feb 03 - Feb 11, 2026", status: "upcoming" },
        { event: "Results", date: "Mar 16, 2026", status: "upcoming" }
      ],
      syllabus: [
        { subject: "General Aptitude", topics: ["Verbal Ability", "Numerical Ability"] },
        { subject: "Engineering Mathematics", topics: ["Linear Algebra", "Calculus", "Differential Equations"] },
        { subject: "Core Subject", topics: ["Subject specific technical topics (e.g., CS, ME, CE)"] }
      ],
      highlights: [
        "Score is valid for 3 years from the date of result announcement.",
        "Many PSUs recruit directly through GATE scores.",
        "Virtual calculator is provided during the exam."
      ]
    },
    'cuet': {
      name: "CUET UG 2026",
      fullName: "Common University Entrance Test",
      level: "National Level",
      mode: "Computer Based Test (CBT)",
      applicants: "15 Lakh+",
      frequency: "Once a Year",
      description: "CUET provides a single window opportunity to students seeking admission in any of the Central Universities (CUs) or other participating organizations across the country for various UG programmes.",
      dates: [
        { event: "Application Start", date: "Feb 27, 2026", status: "upcoming" },
        { event: "Exam Dates", date: "May 15 - May 31, 2026", status: "upcoming" },
        { event: "Results", date: "Jul 15, 2026", status: "upcoming" }
      ],
      syllabus: [
        { subject: "Section IA & IB", topics: ["Language Comprehension", "Vocabulary", "Literary Aptitude"] },
        { subject: "Section II", topics: ["Domain Specific Subjects (up to 6)"] },
        { subject: "Section III", topics: ["General Knowledge", "Current Affairs", "Quantitative Reasoning"] }
      ],
      highlights: [
        "Candidates can choose up to 10 subjects in total.",
        "Medium of exam available in 13 languages.",
        "Adopted by all 44 Central Universities."
      ]
    },
    'clat': {
      name: "CLAT 2026",
      fullName: "Common Law Admission Test",
      level: "National Level",
      mode: "Offline (Pen & Paper)",
      applicants: "60,000+",
      frequency: "Once a Year",
      description: "CLAT is a centralized national level entrance test for admissions to twenty-two National Law Universities (NLUs) in India. Most private and self-financed law schools in India also use these scores for law admissions.",
      dates: [
        { event: "Application Start", date: "Jul 01, 2025", status: "completed" },
        { event: "Application End", date: "Nov 03, 2025", status: "completed" },
        { event: "Exam Date", date: "Dec 03, 2025", status: "completed" },
        { event: "Result", date: "Dec 10, 2025", status: "completed" }
      ],
      syllabus: [
        { subject: "English Language", topics: ["Comprehension", "Inferences", "Vocabulary"] },
        { subject: "Current Affairs & GK", topics: ["Contemporary events", "Arts & Culture", "Historical events"] },
        { subject: "Legal Reasoning", topics: ["Legal principles", "Application of rules", "Fact-based situations"] },
        { subject: "Logical Reasoning", topics: ["Syllogisms", "Analogies", "Logical sequences"] }
      ],
      highlights: [
        "Comprehension-based questions testing reading skills.",
        "0.25 marks deducted for every wrong answer.",
        "Duration of the exam is 2 hours for 120 questions."
      ]
    }
  };
  
  // Default fallback if ID doesn't exactly match
  const selectedExam = exams[id] || exams['jee-main'];
  selectedExam.eligibility = selectedExam.eligibility || [
    "Candidates must have passed 10+2 or equivalent examination from a recognized board.",
    "Minimum qualifying marks required in board exams (relaxation applies for reserved categories).",
    "Specific age limits or limits on the number of attempts may apply as per the latest bulletin."
  ];
  selectedExam.coaching = selectedExam.coaching || [
    "Offline Coaching: Top institutes available in major educational hubs like Kota, Delhi, and Hyderabad.",
    "Online Prep: Live classes, recorded lectures, and test series by leading ed-tech platforms.",
    "Self-Study: Highly recommended to stick to standard NCERTs and specialized reference books.",
    "Mock Tests: Regular practice of previous year papers and mock tests is essential for time management."
  ];
  return selectedExam;
};

export default function ExamDetail() {
  const { examId } = useParams();
  const exam = getMockExamData(examId);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [examId]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'syllabus', label: 'Syllabus & Pattern' },
    { id: 'dates', label: 'Important Dates' },
    { id: 'coaching', label: 'Coaching & Prep' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-premium pt-32 pb-16 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-xs font-bold text-brand-700 uppercase tracking-wider backdrop-blur-sm">
              Entrance Exam
            </span>
            <span className="px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-xs font-bold text-yellow-700 uppercase tracking-wider backdrop-blur-sm">
              {exam.level}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4">
            {exam.name}
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-3xl mb-10">
            {exam.fullName}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/60 backdrop-blur-md border border-white/50 shadow-sm rounded-2xl p-5">
              <div className="flex items-center gap-2 text-brand-600 mb-2">
                <Target size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Mode</span>
              </div>
              <p className="text-slate-800 font-bold">{exam.mode}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md border border-white/50 shadow-sm rounded-2xl p-5">
              <div className="flex items-center gap-2 text-brand-600 mb-2">
                <Users size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Applicants</span>
              </div>
              <p className="text-slate-800 font-bold">{exam.applicants}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md border border-white/50 shadow-sm rounded-2xl p-5">
              <div className="flex items-center gap-2 text-brand-600 mb-2">
                <Calendar size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Frequency</span>
              </div>
              <p className="text-slate-800 font-bold">{exam.frequency}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md border border-white/50 shadow-sm rounded-2xl p-5 flex flex-col justify-center">
              <button className="w-full py-3 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/25">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-brand-600 text-brand-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                <section>
                  <h2 className="text-2xl font-black text-slate-900 mb-4">About {exam.name}</h2>
                  <p className="text-slate-600 leading-relaxed font-medium text-lg">
                    {exam.description}
                  </p>
                </section>

                <section>
                  <div className="bg-gradient-to-br from-brand-50 to-white rounded-3xl p-8 border border-brand-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                      <AlertCircle size={100} />
                    </div>
                    <h3 className="text-xl font-black text-brand-900 mb-6 flex items-center gap-2">
                      <AlertCircle className="text-brand-500" /> Key Highlights
                    </h3>
                    <ul className="space-y-4 relative z-10">
                      {exam.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <BadgeCheck size={20} className="text-brand-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </motion.div>
            )}

            {/* DATES TAB */}
            {activeTab === 'dates' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Important Dates & Timeline</h2>
                
                <div className="relative border-l-2 border-brand-200 ml-4 space-y-8">
                  {exam.dates.map((item, idx) => (
                    <div key={idx} className="relative pl-8">
                      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm ${
                        item.status === 'completed' ? 'bg-slate-400' :
                        item.status === 'active' ? 'bg-brand-500 animate-pulse' : 'bg-brand-300'
                      }`}></div>
                      
                      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                          {item.date}
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">{item.event}</h4>
                        {item.status === 'active' && (
                          <span className="inline-block mt-3 px-3 py-1 bg-brand-50 text-brand-600 text-xs font-bold rounded-lg border border-brand-100">
                            Action Required Now
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* SYLLABUS TAB */}
            {activeTab === 'syllabus' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Exam Syllabus & Pattern</h2>
                
                <div className="space-y-4">
                  {exam.syllabus.map((section, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                          <BookOpen size={18} className="text-brand-600" />
                          {section.subject}
                        </h3>
                      </div>
                      <div className="p-5">
                        <div className="flex flex-wrap gap-2">
                          {section.topics.map((topic, i) => (
                            <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ELIGIBILITY TAB */}
            {activeTab === 'eligibility' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Eligibility Criteria</h2>
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                  <ul className="space-y-4">
                    {exam.eligibility.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <BadgeCheck size={20} className="text-brand-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* COACHING TAB */}
            {activeTab === 'coaching' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Coaching & Preparation Strategy</h2>
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                  <ul className="space-y-4">
                    {exam.coaching.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Target size={20} className="text-brand-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 p-6 bg-brand-50 rounded-2xl border border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-brand-900 mb-1">Looking for personalized guidance?</h4>
                      <p className="text-sm text-brand-700">Get connected with top educators and counselors.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md w-full sm:w-auto">
                      Get Free Counseling
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Help Widget */}
            <div className="bg-gradient-premium border border-brand-100 rounded-3xl p-8 shadow-xl shadow-brand-500/5 text-center relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/10 blur-2xl rounded-full"></div>
              <h3 className="text-xl font-black text-slate-900 mb-2 relative z-10">Need Exam Strategy?</h3>
              <p className="text-slate-500 text-sm font-medium mb-6 relative z-10">
                Connect with toppers and expert counselors to build a personalized roadmap.
              </p>
              <button className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-colors relative z-10 shadow-lg shadow-brand-500/25">
                Book Expert Session
              </button>
            </div>

            {/* Download Links */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h4 className="font-black text-slate-900 mb-4">Quick Resources</h4>
              <ul className="space-y-3">
                <li>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
                    <span className="flex items-center gap-2 text-sm font-bold text-slate-700 group-hover:text-brand-600">
                      <FileText size={16} /> Official Information Bulletin
                    </span>
                    <ArrowRight size={16} className="text-slate-400 group-hover:text-brand-600" />
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
                    <span className="flex items-center gap-2 text-sm font-bold text-slate-700 group-hover:text-brand-600">
                      <FileText size={16} /> Previous Year Papers
                    </span>
                    <ArrowRight size={16} className="text-slate-400 group-hover:text-brand-600" />
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
}
