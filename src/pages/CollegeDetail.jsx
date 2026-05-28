import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, GraduationCap, Building2, Briefcase, 
  TrendingUp, Award, CheckCircle, ChevronRight,
  Heart, Share2, Star, Download, Send, Globe,
  Clock, Check, FileText, MessageSquare, Info, ShieldCheck, Landmark, Users, ChevronDown, Calendar, Trophy, ChevronRight as ChevronRightIcon, Sparkles, DollarSign
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import CounsellingModal from '../components/CounsellingModal';

// Mock Data Generator
const getMockCollegeData = (id) => {
  let location = 'Pune, Maharashtra';
  let formattedName = 'College of Engineering, Pune';
  let shortName = 'COEP';
  let established = '1854';

  if (id) {
    const lowerId = id.toLowerCase();
    if (lowerId.includes('bangalore') || lowerId.includes('bengaluru') || lowerId === 'nlsiu') location = 'Bangalore, Karnataka';
    else if (lowerId.includes('mumbai') || lowerId === 'iitb') location = 'Mumbai, Maharashtra';
    else if (lowerId.includes('delhi') || lowerId === 'aiims') location = 'New Delhi, Delhi';
    else if (lowerId.includes('hyderabad')) location = 'Hyderabad, Telangana';
    else if (lowerId.includes('chennai')) location = 'Chennai, Tamil Nadu';
    else if (lowerId === 'iima') location = 'Ahmedabad, Gujarat';
    else if (lowerId === 'bits') location = 'Pilani, Rajasthan';
    else if (lowerId.includes('pune') || lowerId === 'siu') location = 'Pune, Maharashtra';

    formattedName = id.split('-').map(w => w.toUpperCase() === 'IIT' || w.toUpperCase() === 'IIM' || w.toUpperCase() === 'NIT' ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    shortName = id.split('-')[0].toUpperCase();
    established = (1940 + (id.length % 50)).toString();
  }

  let dynamicCourses = [
    { name: 'B.Tech Computer Engineering', fees: '₹1,25,000 / yr', duration: '4 Years', eligibility: '10+2 with 75% + JEE Main' },
    { name: 'B.Tech Mechanical Engineering', fees: '₹1,15,000 / yr', duration: '4 Years', eligibility: '10+2 with 75% + State CET' },
    { name: 'MBA Finance', fees: '₹2,50,000 / yr', duration: '2 Years', eligibility: 'Graduation + CAT/MAT' },
    { name: 'M.Tech Data Science', fees: '₹1,80,000 / yr', duration: '2 Years', eligibility: 'B.Tech + GATE' }
  ];
  let dynamicAbout = `Established in 1854, ${formattedName} is a premier institute that has consistently ranked among the top colleges in its domain. With a rich legacy, the institute offers a unique blend of traditional values and modern education. The campus spans across 36 acres in the heart of the city, providing a vibrant and conducive environment for holistic learning.`;
  
  if (id) {
    const lowerId = id.toLowerCase();
    if (lowerId.includes('nlsiu') || lowerId.includes('nlu') || lowerId.includes('nalsar') || lowerId.includes('law')) {
      dynamicCourses = [
        { name: 'BA LL.B (Hons)', fees: '₹3,00,000 / yr', duration: '5 Years', eligibility: '10+2 with 45% + CLAT' },
        { name: 'BBA LL.B', fees: '₹2,80,000 / yr', duration: '5 Years', eligibility: '10+2 with 45% + CLAT' },
        { name: 'LL.M Corporate Law', fees: '₹1,50,000 / yr', duration: '1 Year', eligibility: 'LL.B + CLAT PG' },
        { name: 'Ph.D in Law', fees: '₹80,000 / yr', duration: '3 Years', eligibility: 'LL.M + Interview' }
      ];
      dynamicAbout = `${formattedName} is a premier National Law University dedicated to the study of law and justice. It is renowned for its rigorous academic curriculum, moot court competitions, and distinguished alumni serving in the highest courts and top corporate law firms.`;
    } else if (lowerId.includes('nid') || lowerId.includes('nift') || lowerId.includes('idc') || lowerId.includes('design')) {
      dynamicCourses = [
        { name: 'B.Des Industrial Design', fees: '₹3,50,000 / yr', duration: '4 Years', eligibility: '10+2 + NID DAT/NIFT' },
        { name: 'B.Des Fashion Design', fees: '₹3,20,000 / yr', duration: '4 Years', eligibility: '10+2 + NIFT Exam' },
        { name: 'M.Des UI/UX', fees: '₹4,00,000 / yr', duration: '2 Years', eligibility: 'B.Des/B.Arch + CEED' }
      ];
      dynamicAbout = `${formattedName} is an apex institute for design education, research, and training. It fosters creative thinking and innovation, producing world-class designers who shape the future of visual and industrial design.`;
    } else if (lowerId.includes('srcc') || lowerId.includes('lsr') || lowerId.includes('loyola') || lowerId.includes('commerce')) {
      dynamicCourses = [
        { name: 'B.Com (Hons)', fees: '₹30,000 / yr', duration: '3 Years', eligibility: '10+2 with Math + CUET' },
        { name: 'BA Economics (Hons)', fees: '₹25,000 / yr', duration: '3 Years', eligibility: '10+2 with Math + CUET' },
        { name: 'M.Com', fees: '₹20,000 / yr', duration: '2 Years', eligibility: 'B.Com + CUET PG' }
      ];
      dynamicAbout = `${formattedName} is a top-tier commerce and arts college known for its exceptional faculty and brilliant alumni. It remains the most sought-after destination for students aspiring to build careers in finance, economics, and corporate leadership.`;
    } else if (lowerId.includes('aiims') || lowerId.includes('cmc') || lowerId.includes('afmc') || lowerId.includes('medical')) {
      dynamicCourses = [
        { name: 'MBBS', fees: '₹1,50,000 / yr', duration: '5.5 Years', eligibility: '10+2 PCB + NEET UG' },
        { name: 'BDS', fees: '₹1,00,000 / yr', duration: '5 Years', eligibility: '10+2 PCB + NEET UG' },
        { name: 'MD General Medicine', fees: '₹2,00,000 / yr', duration: '3 Years', eligibility: 'MBBS + NEET PG' }
      ];
      dynamicAbout = `${formattedName} is an institution of national importance providing cutting-edge medical education and healthcare. With a massive multi-specialty hospital on campus, it offers unparalleled clinical exposure to its students.`;
    } else if (lowerId.includes('mit') || lowerId.includes('stanford') || lowerId.includes('oxford') || lowerId.includes('usa') || lowerId.includes('uk') || lowerId.includes('abroad')) {
      dynamicCourses = [
        { name: 'MS Computer Science', fees: '$55,000 / yr', duration: '2 Years', eligibility: 'Bachelors + GRE/TOEFL' },
        { name: 'MBA', fees: '$75,000 / yr', duration: '2 Years', eligibility: 'Bachelors + GMAT/TOEFL' },
        { name: 'B.S Engineering', fees: '$60,000 / yr', duration: '4 Years', eligibility: 'High School + SAT' }
      ];
      dynamicAbout = `${formattedName} is a world-renowned global university at the forefront of research and innovation. Offering a diverse and vibrant campus life, it attracts top talent from across the globe to solve the world's most pressing challenges.`;
    }
  }
  
  return {
    id: id || 'coep-pune',
    name: formattedName,
    shortName: shortName,
    location: location,
    established: established,
    ownership: 'Government Autonomous',
    approvals: ['AICTE', 'UGC', 'NBA', 'NAAC A+'],
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80',
    stats: {
      avgFees: '₹1.2 L - ₹2.5 L / yr',
      placementRate: '95%',
      avgPackage: '11.5 LPA',
      highestPackage: '50.5 LPA',
      facultyRating: '4.8/5',
      recruiters: '250+'
    },
    about: dynamicAbout,
    highlights: [
      'Ranked #8 by NIRF among colleges in India.',
      '100% placement assistance with top global giants.',
      'State-of-the-art labs and innovation centers funded by alumni.',
      'Strong industry connections and semester-long internship programs.'
    ],
    courses: dynamicCourses,
    recruiters: [
      { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
      { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
      { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
      { name: 'TCS', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg' },
      { name: 'Infosys', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg' }
    ],
    facilities: [
      { name: 'Boys & Girls Hostel', icon: Building2 },
      { name: 'Central Library', icon: FileText },
      { name: 'High-Tech Labs', icon: CheckCircle },
      { name: 'Sports Complex', icon: Award },
      { name: 'Campus Wi-Fi', icon: Globe },
      { name: 'Cafeteria', icon: Users }
    ],
    faqs: [
      { q: `Is ${formattedName} good for placements?`, a: 'Yes, it has consistently achieved over 95% placements with top MNCs visiting the campus every year.' },
      { q: 'What is the admission process?', a: 'Admissions are strictly based on national level entrance exams like JEE, GATE, and CAT followed by counseling sessions.' },
      { q: 'Are there any scholarships available?', a: 'Yes, government scholarships and merit-based institutional scholarships are available for deserving students.' },
      { q: 'Is hostel facility available?', a: 'Yes, separate hostels for boys and girls are available with all modern amenities and Wi-Fi connectivity.' }
    ]
  };
};

export default function CollegeDetail() {
  const { collegeId } = useParams();
  const college = getMockCollegeData(collegeId);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const tabs = [
    'Overview', 'Courses & Fees', 'Admission', 'Placements', 
    'Ranking', 'Facilities', 'Reviews', 'FAQs'
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [collegeId]);

  const handleDownloadBrochure = () => {
    const content = "This is a sample brochure downloaded from EdEvolving.";
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${college.shortName}_Brochure.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: college.name,
          text: `Check out ${college.name} on EdEvolving!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const scrollToSection = (tabName) => {
    setActiveTab(tabName);
    const element = document.getElementById(`section-${tabName.toLowerCase().replace(/ & | /g, '-')}`);
    if (element) {
      const yOffset = -140; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-200 selection:text-brand-900">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="bg-slate-900 border-b border-white/10 pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-slate-400 gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRightIcon size={14} />
            <Link to={`/cities/${college.location.split(',')[0].toLowerCase()}`} className="hover:text-white transition-colors">{college.location.split(',')[0]} Colleges</Link>
            <ChevronRightIcon size={14} />
            <span className="text-brand-400 font-medium">{college.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-slate-900">
        {/* Background Image with Blur & Gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src={college.coverImage} 
            alt={college.name} 
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
          <div className="absolute inset-0 bg-brand-900/20 mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            
            {/* Left side: Logo & Info */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white p-2 shadow-2xl flex-shrink-0 relative overflow-hidden group">
                <img src={college.logo} alt="Logo" className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="flex-1 text-white">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
                  {college.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-slate-200 mb-6 font-medium">
                  <div className="flex items-center gap-1.5"><MapPin size={18} className="text-brand-400"/> {college.location}</div>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                  <div className="flex items-center gap-1.5"><Calendar size={18} className="text-brand-400"/> Estd {college.established}</div>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                  <div className="flex items-center gap-1.5"><Landmark size={18} className="text-brand-400"/> {college.ownership}</div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {college.approvals.map((badge, idx) => (
                    <span key={idx} className="px-3 py-1 text-xs font-bold rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Action Buttons */}
            <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto">
              <button onClick={() => setIsApplyOpen(true)} className="flex-1 lg:w-48 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
                <Send size={18} /> Apply Now
              </button>
              <button onClick={handleDownloadBrochure} className="flex-1 lg:w-48 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-md hover:-translate-y-1">
                <Download size={18} /> Brochure
              </button>
              <div className="hidden sm:flex gap-3 mt-2">
                <button onClick={() => setIsFavorite(!isFavorite)} className={`flex-1 py-3 rounded-xl border flex items-center justify-center transition-all ${isFavorite ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-transparent border-white/20 text-white hover:bg-white/10'}`}>
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                <button onClick={handleShare} className="flex-1 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 flex items-center justify-center transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* College Stats Strip */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 divide-x divide-slate-100">
            <div className="px-4 text-center">
              <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center justify-center gap-1.5"><DollarSign size={16} className="text-green-500"/> Avg Fees</p>
              <h3 className="text-xl font-black text-slate-900">{college.stats.avgFees}</h3>
            </div>
            <div className="px-4 text-center">
              <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center justify-center gap-1.5"><Briefcase size={16} className="text-brand-500"/> Placement Rate</p>
              <h3 className="text-xl font-black text-slate-900">{college.stats.placementRate}</h3>
            </div>
            <div className="px-4 text-center">
              <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center justify-center gap-1.5"><TrendingUp size={16} className="text-green-500"/> Avg Package</p>
              <h3 className="text-xl font-black text-slate-900">{college.stats.avgPackage}</h3>
            </div>
            <div className="px-4 text-center hidden md:block">
              <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center justify-center gap-1.5"><Trophy size={16} className="text-purple-500"/> Highest Pkg</p>
              <h3 className="text-xl font-black text-slate-900">{college.stats.highestPackage}</h3>
            </div>
            <div className="px-4 text-center">
              <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center justify-center gap-1.5"><Star size={16} className="text-amber-500"/> Faculty Rating</p>
              <h3 className="text-xl font-black text-slate-900">{college.stats.facultyRating}</h3>
            </div>
            <div className="px-4 text-center hidden md:block">
              <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center justify-center gap-1.5"><Building2 size={16} className="text-blue-500"/> Recruiters</p>
              <h3 className="text-xl font-black text-slate-900">{college.stats.recruiters}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Tab Navigation */}
      <div className="sticky top-20 z-40 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200 mb-10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => scrollToSection(tab)}
                className={`py-4 text-sm font-bold whitespace-nowrap transition-colors relative ${
                  activeTab === tab ? 'text-brand-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activetab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Layout (2 Columns) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* 1. Overview Section */}
            <div id="section-overview" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Info className="text-brand-500" /> College Overview
              </h2>
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 leading-relaxed text-slate-700">
                <p className="mb-6">{college.about}</p>
                <h3 className="font-bold text-slate-900 mb-4">Key Highlights</h3>
                <ul className="space-y-3">
                  {college.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Sparkles size={20} className="text-brand-500 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 2. Courses & Fees */}
            <div id="section-courses-fees" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <GraduationCap className="text-brand-500" /> Courses & Fees
              </h2>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="py-4 px-6 font-bold text-slate-800">Course Name</th>
                        <th className="py-4 px-6 font-bold text-slate-800">Fees</th>
                        <th className="py-4 px-6 font-bold text-slate-800 hidden sm:table-cell">Eligibility</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {college.courses.map((c, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-bold text-slate-900">{c.name}</div>
                            <div className="text-xs text-slate-500 font-medium mt-1">{c.duration}</div>
                          </td>
                          <td className="py-4 px-6 font-semibold text-brand-600">{c.fees}</td>
                          <td className="py-4 px-6 text-sm text-slate-600 hidden sm:table-cell">{c.eligibility}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 3. Admission Process */}
            <div id="section-admission" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="text-brand-500" /> Admission Process
              </h2>
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="relative border-l-2 border-brand-100 ml-3 md:ml-4 space-y-8 py-2">
                  <div className="relative pl-8">
                    <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-brand-500 ring-4 ring-white"></span>
                    <h3 className="font-bold text-slate-900 text-lg">Step 1: Entrance Exam</h3>
                    <p className="text-slate-600 mt-2">Appear for national/state level entrance exams like JEE Main, MHT-CET, or CAT depending on the course.</p>
                  </div>
                  <div className="relative pl-8">
                    <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-brand-500 ring-4 ring-white"></span>
                    <h3 className="font-bold text-slate-900 text-lg">Step 2: Application Form</h3>
                    <p className="text-slate-600 mt-2">Fill out the online application form on the official college website and pay the application fee.</p>
                  </div>
                  <div className="relative pl-8">
                    <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-brand-500 ring-4 ring-white"></span>
                    <h3 className="font-bold text-slate-900 text-lg">Step 3: Merit List & Counseling</h3>
                    <p className="text-slate-600 mt-2">Shortlisted candidates will be called for counseling based on their entrance exam scores and academic merit.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Placements */}
            <div id="section-placements" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Briefcase className="text-brand-500" /> Placements & Recruiters
              </h2>
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-brand-50 rounded-xl p-4 text-center">
                    <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">Highest</p>
                    <p className="text-2xl font-black text-slate-900">{college.stats.highestPackage}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Average</p>
                    <p className="text-2xl font-black text-slate-900">{college.stats.avgPackage}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">Placement %</p>
                    <p className="text-2xl font-black text-slate-900">{college.stats.placementRate}</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Recruiters</p>
                    <p className="text-2xl font-black text-slate-900">{college.stats.recruiters}</p>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 mb-4">Top Recruiters</h3>
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-6 border-y border-slate-100">
                  {college.recruiters.map((rec, i) => (
                    <img key={i} src={rec.logo} alt={rec.name} className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all" />
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Rankings */}
            <div id="section-ranking" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Trophy className="text-brand-500" /> Rankings & Awards
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 border border-amber-100 shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                    <Trophy size={24} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-1">#8</h3>
                  <p className="text-sm font-semibold text-slate-600">NIRF Engineering 2023</p>
                </div>
                <div className="bg-gradient-to-br from-white to-brand-50 rounded-2xl p-6 border border-brand-100 shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-4">
                    <Award size={24} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-1">#2</h3>
                  <p className="text-sm font-semibold text-slate-600">State Ranking 2023</p>
                </div>
                <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                    <Star size={24} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-1">A+</h3>
                  <p className="text-sm font-semibold text-slate-600">NAAC Accreditation</p>
                </div>
              </div>
            </div>

            {/* 6. Facilities */}
            <div id="section-facilities" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Building2 className="text-brand-500" /> Campus Facilities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {college.facilities.map((fac, i) => {
                  const Icon = fac.icon;
                  return (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-brand-300 hover:shadow-lg transition-all group">
                      <div className="w-12 h-12 mx-auto rounded-full bg-slate-50 group-hover:bg-brand-50 text-slate-400 group-hover:text-brand-600 flex items-center justify-center mb-3 transition-colors">
                        <Icon size={24} />
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm">{fac.name}</h3>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 7. FAQs */}
            <div id="section-faqs" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <MessageSquare className="text-brand-500" /> Frequently Asked Questions
              </h2>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 divide-y divide-slate-100">
                {college.faqs.map((faq, i) => (
                  <div key={i} className="p-2">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                    >
                      <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                      <ChevronDown size={20} className={`text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-2 text-slate-600 leading-relaxed">
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

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-40 bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 p-6 overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-500 to-purple-500"></div>
              
              <h3 className="text-xl font-black text-slate-900 mb-2 mt-2">Interested in {college.shortName}?</h3>
              <p className="text-sm text-slate-500 mb-6 font-medium">Fill out the form to get free admission counseling from experts.</p>
              
              <form className="space-y-4">
                <div>
                  <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm font-medium transition-all" />
                </div>
                <div>
                  <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm font-medium transition-all" />
                </div>
                <div>
                  <input type="tel" placeholder="Mobile Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm font-medium transition-all" />
                </div>
                <div>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm font-medium text-slate-500 appearance-none">
                    <option>Select Course Interested In</option>
                    <option>B.Tech</option>
                    <option>MBA</option>
                    <option>M.Tech</option>
                  </select>
                </div>
                
                <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/30 transition-all mt-4">
                  Request Callback
                </button>
                <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={14} /> Your information is 100% secure.
                </p>
              </form>
            </div>
          </div>

        </div>
      </section>


      <Footer />
      
      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-50 flex gap-3">
        <button onClick={handleDownloadBrochure} className="flex-1 bg-white border border-slate-300 text-slate-700 font-bold py-3 rounded-xl flex justify-center items-center gap-2">
          <Download size={16} /> Brochure
        </button>
        <button onClick={() => setIsApplyOpen(true)} className="flex-[2] bg-brand-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-brand-500/30">
          Apply Now
        </button>
      </div>

      <CounsellingModal 
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />

    </div>
  );
}
