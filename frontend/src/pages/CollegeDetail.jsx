import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, GraduationCap, Building2, Briefcase, 
  TrendingUp, Award, CheckCircle, ChevronRight,
  Heart, Share2, Star, Download, Send, Globe,
  Clock, Check, FileText, MessageSquare, Info, 
  ShieldCheck, Landmark, Users, ChevronDown, 
  Calendar, Trophy, ChevronRight as ChevronRightIcon, 
  Sparkles, DollarSign, PenTool, ExternalLink, Lightbulb, User, Scale, PhoneCall
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ApplicationModal from '../components/ApplicationModal';
import CounsellingModal from '../components/CounsellingModal';
import CompareDrawer from '../components/CompareDrawer';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const iconMapping = {
  Building2: Building2,
  Briefcase: Briefcase,
  Award: Award,
  CheckCircle: CheckCircle,
  Globe: Globe,
  Users: Users,
  FileText: FileText
};


// Mock Data Generator
const getMockCollegeData = (id) => {
  let location = 'Pune, Maharashtra';
  let formattedName = 'College of Engineering, Pune';
  let shortName = 'COEP';
  let established = '1854';
  let coverImage = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80';

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
    { name: 'B.Tech Computer Science', fees: '₹1,25,000 / yr', duration: '4 Years', eligibility: '10+2 with 75% + JEE Main' },
    { name: 'B.Tech Mechanical', fees: '₹1,15,000 / yr', duration: '4 Years', eligibility: '10+2 with 75% + State CET' },
    { name: 'MBA Finance', fees: '₹2,50,000 / yr', duration: '2 Years', eligibility: 'Graduation + CAT/MAT' },
    { name: 'M.Tech Data Science', fees: '₹1,80,000 / yr', duration: '2 Years', eligibility: 'B.Tech + GATE' }
  ];
  let dynamicAbout = `Established in ${established}, ${formattedName} is a premier institute that has consistently ranked among the top colleges in its domain. With a rich legacy, the institute offers a unique blend of traditional values and modern education. The campus spans across 36 acres in the heart of the city, providing a vibrant and conducive environment for holistic learning.`;
  
  if (id) {
    const lowerId = id.toLowerCase();
    if (lowerId.includes('nlsiu') || lowerId.includes('nlu') || lowerId.includes('nalsar') || lowerId.includes('law')) {
      dynamicCourses = [
        { name: 'BA LL.B (Hons)', fees: '₹3,00,000 / yr', duration: '5 Years', eligibility: '10+2 with 45% + CLAT' },
        { name: 'BBA LL.B', fees: '₹2,80,000 / yr', duration: '5 Years', eligibility: '10+2 with 45% + CLAT' },
        { name: 'LL.M Corporate Law', fees: '₹1,50,000 / yr', duration: '1 Year', eligibility: 'LL.B + CLAT PG' }
      ];
      dynamicAbout = `${formattedName} is a premier National Law University dedicated to the study of law and justice. It is renowned for its rigorous academic curriculum, moot court competitions, and distinguished alumni serving in the highest courts and top corporate law firms.`;
      coverImage = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1920&q=80';
    } else if (lowerId.includes('nid') || lowerId.includes('nift') || lowerId.includes('idc') || lowerId.includes('design')) {
      dynamicCourses = [
        { name: 'B.Des Industrial Design', fees: '₹3,50,000 / yr', duration: '4 Years', eligibility: '10+2 + NID DAT/NIFT' },
        { name: 'B.Des Fashion Design', fees: '₹3,20,000 / yr', duration: '4 Years', eligibility: '10+2 + NIFT Exam' },
        { name: 'M.Des UI/UX', fees: '₹4,00,000 / yr', duration: '2 Years', eligibility: 'B.Des/B.Arch + CEED' }
      ];
      dynamicAbout = `${formattedName} is an apex institute for design education, research, and training. It fosters creative thinking and innovation, producing world-class designers who shape the future of visual and industrial design.`;
      coverImage = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1920&q=80';
    } else if (lowerId.includes('iim') || lowerId.includes('mba') || lowerId.includes('business')) {
      dynamicCourses = [
        { name: 'PGPM (MBA)', fees: '₹25,00,000 / total', duration: '2 Years', eligibility: 'Graduation + CAT 99%ile' },
        { name: 'Executive MBA', fees: '₹30,00,000 / total', duration: '1 Year', eligibility: 'Graduation + 5 Yrs Exp + GMAT' },
        { name: 'Ph.D in Management', fees: '₹1,00,000 / yr', duration: '4 Years', eligibility: 'Masters Degree + CAT/GMAT' }
      ];
      dynamicAbout = `${formattedName} is recognized globally for its excellence in management education and research. It is known for producing world-class business leaders, entrepreneurs, and thinkers.`;
      coverImage = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80';
    } else if (lowerId.includes('aiims') || lowerId.includes('cmc') || lowerId.includes('afmc') || lowerId.includes('medical')) {
      dynamicCourses = [
        { name: 'MBBS', fees: '₹1,50,000 / yr', duration: '5.5 Years', eligibility: '10+2 PCB + NEET UG' },
        { name: 'BDS', fees: '₹1,00,000 / yr', duration: '5 Years', eligibility: '10+2 PCB + NEET UG' },
        { name: 'MD General Medicine', fees: '₹2,00,000 / yr', duration: '3 Years', eligibility: 'MBBS + NEET PG' }
      ];
      dynamicAbout = `${formattedName} is an institution of national importance providing cutting-edge medical education and healthcare. With a massive multi-specialty hospital on campus, it offers unparalleled clinical exposure to its students.`;
      coverImage = 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1920&q=80';
    }
  }
  const images = (id && (id.toLowerCase().includes('aiims') || id.toLowerCase().includes('medical')))
    ? ["/images/medical.png", "/images/medical_college_new.jpg"]
    : [coverImage];

  return {
    id: id || 'coep-pune',
    name: formattedName,
    shortName: shortName,
    location: location,
    established: established,
    ownership: 'Public/Government',
    approvals: ['AICTE', 'UGC', 'NBA', 'NAAC A+'],
    logo: `https://ui-avatars.com/api/?name=${shortName}&background=0f172a&color=f97316&size=200`,
    coverImage: coverImage,
    images: images,
    stats: {
      avgFees: '₹1.5 Lakhs/yr',
      placementRate: '98%',
      avgPackage: '₹16.5 LPA',
      highestPackage: '₹84.0 LPA',
      facultyRating: '4.8/5',
      infrastructure: '4.9/5',
      recruiters: '350+'
    },
    about: dynamicAbout,
    whyChoose: [
      { title: 'Academic Excellence', desc: 'Rigorous curriculum updated with industry trends and global standards.' },
      { title: 'Top-tier Placements', desc: '100% placement assistance with FAANG and Big 4 companies visiting annually.' },
      { title: 'World-Class Faculty', desc: 'Learn from professors holding PhDs from top global institutions.' },
      { title: 'Global Exposure', desc: 'Student exchange programs with over 50+ international partner universities.' },
      { title: 'State-of-the-art Campus', desc: 'Fully Wi-Fi enabled campus with digital libraries and smart classrooms.' }
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
      { name: 'Smart Classrooms', icon: Building2 },
      { name: 'Digital Library', icon: FileText },
      { name: 'High-Tech Labs', icon: CheckCircle },
      { name: 'Sports Complex', icon: Award },
      { name: 'Campus Wi-Fi', icon: Globe },
      { name: 'AC Hostels', icon: Users }
    ],
    reviews: [
      { name: 'Aarav Sharma', course: 'B.Tech CSE, 2023', rating: 5, text: 'Absolutely brilliant faculty and the coding culture is phenomenal. Secured a placement at Google on Day 1!' },
      { name: 'Priya Patel', course: 'MBA Finance, 2022', rating: 4, text: 'The campus infrastructure is top-notch. The alumni network really helps during summer internships.' },
      { name: 'Rohan Gupta', course: 'B.Tech Mechanical, 2024', rating: 5, text: 'State of the art labs and great support for entrepreneurship. Highly recommend for practical learners.' },
      { name: 'Neha Singh', course: 'BA LLB, 2023', rating: 4, text: 'Rigorous academics but very rewarding. Moot court competitions are taken very seriously here.' }
    ],
    faqs: [
      { q: `Is ${formattedName} good for placements?`, a: 'Yes, it has consistently achieved over 95% placements with top MNCs visiting the campus every year.' },
      { q: 'What is the admission process?', a: 'Admissions are strictly based on national level entrance exams followed by rigorous counseling sessions and interviews.' },
      { q: 'Are there any scholarships available?', a: 'Yes, government scholarships and merit-based institutional scholarships up to 100% tuition waiver are available for deserving students.' },
      { q: 'Is hostel facility available?', a: 'Yes, separate fully-furnished AC and Non-AC hostels for boys and girls are available with Wi-Fi connectivity.' }
    ]
  };
};

const tabs = [
  'Overview', 'Facilities', 'Courses & Fees', 'Admission', 
  'Placements', 'Reviews', 'FAQs'
];

export default function CollegeDetail() {
  const toast = useToast();
  const { collegeId } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, toggleSavedCollege } = useAuth();
  
  const [activeTab, setActiveTab] = useState('Overview');
  const [openFaq, setOpenFaq] = useState(0);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);
  const [selectedCourseForApply, setSelectedCourseForApply] = useState(null);
  const [comparedColleges, setComparedColleges] = useState([]);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);

  const handleApplyForCourse = (courseName) => {
    setSelectedCourseForApply(courseName);
    setIsApplyOpen(true);
  };

  const getPrefilledData = () => {
    if (!college) return null;
    
    let streamOption = '';
    const collegeStream = college.stream ? college.stream.toLowerCase() : '';
    if (collegeStream.includes('eng')) {
      streamOption = 'Engineering';
    } else if (collegeStream.includes('man') || collegeStream.includes('mba')) {
      streamOption = 'MBA / Management';
    } else if (collegeStream.includes('med')) {
      streamOption = 'Medical Science';
    } else if (collegeStream.includes('law')) {
      streamOption = 'Law & Legal Studies';
    } else if (collegeStream.includes('des')) {
      streamOption = 'Design / Architecture';
    }

    return {
      stream: streamOption,
      courseName: selectedCourseForApply,
      collegeName: college.name,
      courses: college.courses || [],
      query: selectedCourseForApply 
        ? `Applying for course: ${selectedCourseForApply} at ${college.name}`
        : `Interested in admission at ${college.name}`
    };
  };

  useEffect(() => {
    const fetchCollege = async () => {
      setLoading(true);
      try {
        const data = await api.colleges.getById(collegeId);
        if (data.success && data.college) {
          const col = data.college;
          col.recruiters = col.recruitersList || col.recruiters || [];
          col.reviews = col.reviewsList || col.reviews || [];
          col.shortName = col.shortName || (col.id ? col.id.toUpperCase() : 'College');
          if (!col.images || col.images.length === 0) {
            col.images = (col.id && (col.id.toLowerCase().includes('aiims') || col.id.toLowerCase().includes('medical')))
              ? ["/images/medical.png", "/images/medical_college_new.jpg"]
              : [col.coverImage || col.image];
          }
          setCollege(col);
        } else {
          setCollege(getMockCollegeData(collegeId));
        }
      } catch (err) {
        console.error('Error fetching college, falling back to mock data:', err.message);
        setCollege(getMockCollegeData(collegeId));
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [collegeId]);

  const isFavorite = user && user.savedColleges && college ? user.savedColleges.includes(college.id) : false;

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.warning('Please log in to bookmark colleges.');
      return;
    }
    await toggleSavedCollege(college.id);
  };


  const handleToggleCompare = (collegeToToggle) => {
    setComparedColleges(prev => {
      const exists = prev.find(c => c.id === collegeToToggle.id);
      if (exists) {
        return prev.filter(c => c.id !== collegeToToggle.id);
      }
      if (prev.length < 3) {
        setIsCompareDrawerOpen(true);
        return [...prev, collegeToToggle];
      }
      toast.warning('You can only compare up to 3 colleges');
      return prev;
    });
  };

  // Clear all compared colleges
  const clearAllCompared = () => {
    setComparedColleges([]);
    setIsCompareDrawerOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [collegeId]);

  useEffect(() => {
    const handleScroll = () => {
      // If we are at the bottom of the page, set active tab to FAQs
      const threshold = 100;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - threshold) {
        setActiveTab('FAQs');
        return;
      }

      // Check which section is currently at the top of the viewport (with offset)
      const offset = 160; 
      let currentActive = 'Overview';

      for (const tab of tabs) {
        const id = `section-${tab.toLowerCase().replace(/ & | /g, '-')}`;
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            currentActive = tab;
          }
        }
      }

      setActiveTab(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [college]);

  const handleDownloadBrochure = () => {
    const content = "This is a sample brochure downloaded from edeco.";
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

  const scrollToSection = (tabName) => {
    setActiveTab(tabName);
    const element = document.getElementById(`section-${tabName.toLowerCase().replace(/ & | /g, '-')}`);
    if (element) {
      const yOffset = -140; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0f71cd] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-slate-800 mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>College Profile Not Found</h2>
        <p className="text-slate-500 mb-6 font-medium">The college profile you requested does not exist in our database.</p>
        <Link to="/" className="px-6 py-2.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold text-sm rounded-xl font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Go Back Home</Link>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#0f71cd]/20">
      <Navbar 
        onCounsellingClick={() => setIsCounsellingOpen(true)} 
        compareCount={comparedColleges.length}
        onCompareClick={() => setIsCompareDrawerOpen(true)}
      />

      {/* ====================================================
          HERO BANNER
      ==================================================== */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 bg-white overflow-hidden border-b border-slate-200">
        {/* Subtle Background Pattern/Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-50 to-slate-100/30 opacity-70"></div>
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex items-center text-xs font-semibold text-slate-500 gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar mb-8">
            <Link to="/" className="hover:text-[#0f71cd] transition-colors">Home</Link>
            <ChevronRightIcon size={12} />
            <Link to={`/cities/${college.location.split(',')[0].toLowerCase()}`} className="hover:text-[#0f71cd] transition-colors">{college.location.split(',')[0]} Colleges</Link>
            <ChevronRightIcon size={12} />
            <span className="text-[#0f71cd]">{college.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            
            {/* Left side: Logo & Info */}
            <div className="flex flex-col sm:flex-row gap-6 items-start lg:w-2/3">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-slate-200 bg-white shadow-xl flex-shrink-0 relative overflow-hidden group p-1.5">
                <img 
                  src={
                    college.logo && (college.logo.startsWith('http') || college.logo.startsWith('/') || college.logo.startsWith('data:'))
                      ? college.logo
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(college.logo || college.shortName || college.name)}&background=0f172a&color=fff&size=200&bold=true`
                  } 
                  alt="Logo" 
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                  {college.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 font-semibold mb-5">
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                    <MapPin size={16} className="text-[#0f71cd]"/> {college.location}
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                    <Calendar size={16} className="text-[#0f71cd]"/> Estd {college.established}
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                    <Landmark size={16} className="text-[#0f71cd]"/> {college.ownership}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {college.approvals.map((badge, idx) => (
                    <span key={idx} className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-lg bg-slate-50 text-[#0f71cd] border border-slate-200 flex items-center gap-1 shadow-sm">
                      <ShieldCheck size={12} /> {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Action Buttons */}
            <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-auto font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              <button onClick={() => handleApplyForCourse(null)} className="flex-1 lg:w-56 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                <Send size={18} /> Apply Now
              </button>
              <button onClick={handleDownloadBrochure} className="flex-1 lg:w-56 bg-white hover:bg-slate-50 text-[#0f71cd] border border-slate-200 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm cursor-pointer">
                <Download size={18} /> Download Brochure
              </button>
              <button onClick={() => handleToggleCompare(college)} className="hidden lg:flex w-56 bg-slate-100 hover:bg-slate-200 text-[#0F141E] border border-slate-200 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 items-center justify-center gap-2 shadow-sm cursor-pointer">
                <Scale size={18} /> {comparedColleges.find(c => c.id === college.id) ? 'Added to Compare' : 'Compare'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          STATS STRIP 
      ==================================================== */}
      <section className="relative z-30 -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-2">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            <div className="py-6 px-4 text-center group cursor-pointer hover:bg-slate-50/50 rounded-l-2xl transition-colors">
              <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Placement Rate</p>
              <h3 className="text-3xl font-black text-[#0f71cd] group-hover:text-[#0c62b2] transition-colors drop-shadow-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{college.stats.placementRate}</h3>
            </div>
            <div className="py-6 px-4 text-center group cursor-pointer hover:bg-slate-50/50 transition-colors">
              <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Avg Package</p>
              <h3 className="text-3xl font-black text-[#0f71cd] group-hover:text-[#0c62b2] transition-colors drop-shadow-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{college.stats.avgPackage}</h3>
            </div>
            <div className="py-6 px-4 text-center group cursor-pointer hover:bg-slate-50/50 transition-colors">
              <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Faculty Rating</p>
              <h3 className="text-3xl font-black text-[#0f71cd] group-hover:text-[#0c62b2] transition-colors drop-shadow-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{college.stats.facultyRating}</h3>
            </div>
            <div className="py-6 px-4 text-center group cursor-pointer hover:bg-slate-50/50 rounded-r-2xl transition-colors">
              <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Infrastructure</p>
              <h3 className="text-3xl font-black text-[#0f71cd] group-hover:text-[#0c62b2] transition-colors drop-shadow-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{college.stats.infrastructure}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          STICKY TAB NAVIGATION
      ==================================================== */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 mb-10 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => scrollToSection(tab)}
                className={`py-4 text-sm font-bold whitespace-nowrap transition-colors relative font-tt-talent ${
                  activeTab === tab ? 'text-[#0f71cd]' : 'text-slate-500 hover:text-slate-800'
                }`}
                style={{ fontFamily: '"TT Talent", sans-serif' }}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activetab_college" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0f71cd] rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================
          MAIN 70/30 LAYOUT
      ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN (MAIN CONTENT) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* 1. Overview Section */}
            <div id="section-overview" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                <Info className="text-[#0f71cd]" /> About {college.shortName}
              </h2>
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 leading-relaxed text-slate-600 font-medium mb-8">
                <p>{college.about}</p>
              </div>

              {/* Campus Gallery */}
              {college.images && college.images.length > 0 && (
                <div className="mb-10 text-left">
                  <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    <Building2 className="text-[#0f71cd]" /> Campus Gallery
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {college.images.map((img, index) => (
                      <div 
                        key={index} 
                        className="relative h-64 rounded-3xl overflow-hidden shadow-sm group border border-slate-200 bg-white"
                      >
                        <img 
                          src={img} 
                          alt={`${college.shortName} Campus ${index + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent p-4 flex justify-between items-end">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            {index === 0 ? "Main Campus Entrance" : "Main Building & Ambulance Bay"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Choose This College */}
              <h3 className="text-xl font-black text-slate-900 mb-6 mt-10 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                <Lightbulb className="text-[#0f71cd]" /> Why Choose {college.shortName}?
              </h3>
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <ul className="space-y-6">
                  {college.whyChoose.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-[#0f71cd] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-[#0f71cd]/20 mt-1">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 2. Facilities Section */}
            <div id="section-facilities" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                <Building2 className="text-[#0f71cd]" /> Campus Facilities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {college.facilities.map((fac, i) => {
                  const Icon = iconMapping[fac.iconName] || Building2;
                  return (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-[#0f71cd]/30 hover:shadow-md transition-all group cursor-default">
                      <div className="w-12 h-12 mx-auto rounded-xl bg-slate-50 text-slate-400 group-hover:text-[#0f71cd] group-hover:bg-[#0f71cd]/5 flex items-center justify-center mb-3 transition-all duration-300 shadow-sm">
                        <Icon size={24} className="group-hover:scale-125 group-hover:stroke-[2.5px] transition-all duration-300" />
                      </div>
                      <h3 className="font-semibold text-slate-600 text-sm group-hover:font-black group-hover:text-slate-900 transition-all">{fac.name}</h3>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Courses & Fees */}
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
                            <button onClick={() => handleApplyForCourse(c.name)} className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 text-[#0f71cd] hover:bg-slate-50 font-bold rounded-lg transition-colors text-sm shadow-sm group-hover:border-[#0f71cd]/40">
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

            {/* 4. Admission Process */}
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

            {/* 5. Placements */}
            <div id="section-placements" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                <Briefcase className="text-[#0f71cd]" /> Placements & ROI
              </h2>
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center group hover:border-[#0f71cd]/30 transition-colors">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 group-hover:text-[#0f71cd] transition-colors">Highest Package</p>
                    <p className="text-2xl font-black text-slate-900">{college.stats.highestPackage}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center group hover:border-[#0f71cd]/30 transition-colors">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 group-hover:text-[#0f71cd] transition-colors">Average Package</p>
                    <p className="text-2xl font-black text-slate-900">{college.stats.avgPackage}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center group hover:border-[#0f71cd]/30 transition-colors">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 group-hover:text-[#0f71cd] transition-colors">Placement %</p>
                    <p className="text-2xl font-black text-slate-900">{college.stats.placementRate}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center group hover:border-[#0f71cd]/30 transition-colors">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 group-hover:text-[#0f71cd] transition-colors">Top Recruiters</p>
                    <p className="text-2xl font-black text-slate-900">{college.stats.recruiters}</p>
                  </div>
                </div>

                <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}><Award size={18} className="text-[#0f71cd]"/> Top Recruiters</h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-8 sm:gap-12">
                  {college.recruiters.map((rec, i) => (
                    <img key={i} src={rec.logo} alt={rec.name} className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-pointer" />
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Reviews Section */}
            <div id="section-reviews" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                <Star className="text-amber-500" fill="currentColor" /> Student Reviews
              </h2>
              
              <div className="flex overflow-x-auto hide-scrollbar gap-6 snap-x snap-mandatory pb-4">
                {college.reviews.map((review, i) => (
                  <div key={i} className="min-w-[300px] md:min-w-[350px] bg-white rounded-3xl p-6 border border-slate-200 shadow-sm snap-start shrink-0 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 text-amber-400 mb-4">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={16} fill={idx < review.rating ? "currentColor" : "none"} className={idx >= review.rating ? "text-slate-300" : ""} />
                        ))}
                      </div>
                      <p className="text-slate-600 font-medium italic mb-6">"{review.text}"</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                        <p className="text-xs font-semibold text-slate-400">{review.course}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. FAQs */}
            <div id="section-faqs" className="scroll-mt-36">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                <MessageSquare className="text-[#0f71cd]" /> Frequently Asked Questions
              </h2>
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 divide-y divide-slate-100">
                {college.faqs.map((faq, i) => (
                  <div key={i} className="p-2">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                    >
                      <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
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
                          <div className="px-4 pb-4 pt-2 text-slate-500 font-medium leading-relaxed border-l-2 border-slate-200 ml-4 mb-2">
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
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-40 space-y-6">
              
              {/* Card 1 - Talk to Counselor */}
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-[#0f71cd]"></div>
                <h3 className="text-xl font-black text-slate-900 mb-2 mt-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Talk to our Counselor</h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">Get free expert advice on admissions, cutoffs, and placements for {college.shortName}.</p>
                
                <form className="space-y-3">
                  <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f71cd] focus:bg-white text-sm font-medium transition-all" />
                  <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f71cd] focus:bg-white text-sm font-medium transition-all" />
                  <input type="tel" placeholder="Mobile Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f71cd] focus:bg-white text-sm font-medium transition-all" />
                  
                  <button type="button" onClick={() => handleApplyForCourse(null)} className="w-full bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold py-3.5 rounded-xl transition-all duration-300 mt-2 cursor-pointer shadow-sm font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    Request Callback
                  </button>
                  <p className="text-xs text-center text-slate-400 mt-3 flex items-center justify-center gap-1.5 font-medium">
                    <ShieldCheck size={14} /> 100% secure & spam-free.
                  </p>
                </form>
              </div>

              {/* Card 2 - Download Brochure */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col items-center text-center relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-[#0f71cd]"></div>
                <div className="w-16 h-16 rounded-full bg-[#0f71cd]/5 text-[#0f71cd] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText size={28} />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Get Detailed Insights</h3>
                <p className="text-sm text-slate-500 font-medium mb-6">Download the official brochure to explore curriculum, faculty, and campus life.</p>
                <button onClick={handleDownloadBrochure} className="w-full bg-white text-[#0f71cd] border border-slate-200 hover:bg-slate-50 font-black py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 group-hover:border-[#0f71cd]/40 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                  <Download size={18} /> Download Brochure
                </button>
              </div>

              {/* Card 3 - Write a Review */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col items-center text-center hover:border-[#0f71cd]/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
                  <PenTool size={24} />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Share Your Experience</h3>
                <p className="text-sm text-slate-500 font-medium mb-6">Help thousands of students make the right choice by reviewing your college.</p>
                <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                  Write a Review <ExternalLink size={16} />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ====================================================
          COUNSELLING CTA SECTION
      ==================================================== */}
      <section className="py-24 relative overflow-hidden bg-white border-t border-slate-200">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0f71cd]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0f71cd]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="bg-white/60 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white">
            <div className="w-20 h-20 rounded-2xl bg-[#0f71cd] text-white flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#0f71cd]/20 transform -rotate-6">
              <User size={40} className="rotate-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Need Help Choosing The Right College?</h2>
            <p className="text-lg text-slate-600 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">Our expert counselors are here to guide you through admission processes, scholarships, and career choices based on your profile.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              <button onClick={() => setIsCounsellingOpen(true)} className="px-8 py-4 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-black rounded-2xl transition-all duration-300 text-lg cursor-pointer shadow-md">
                Book Free Counselling
              </button>
              <a 
                href="tel:8278713791" 
                className="px-8 py-4 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#0f71cd] text-[#0F141E] font-bold rounded-2xl shadow-sm transition-all duration-300 flex items-center justify-center gap-2 text-lg cursor-pointer"
              >
                <PhoneCall size={20} /> Talk to Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] z-50 flex gap-3 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
        <button onClick={handleDownloadBrochure} className="flex-1 bg-white border border-slate-200 text-[#0F141E] font-bold py-3 rounded-xl flex justify-center items-center gap-2 cursor-pointer">
          <Download size={16} /> Brochure
        </button>
        <button onClick={() => handleApplyForCourse(null)} className="flex-[2] bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-sm cursor-pointer">
          Apply Now
        </button>
      </div>

      <ApplicationModal 
        isOpen={isApplyOpen}
        onClose={() => {
          setIsApplyOpen(false);
          setSelectedCourseForApply(null);
        }}
        initialData={getPrefilledData()}
      />

      <CounsellingModal 
        isOpen={isCounsellingOpen}
        onClose={() => setIsCounsellingOpen(false)}
      />

      <CompareDrawer 
        isOpen={isCompareDrawerOpen}
        onClose={() => setIsCompareDrawerOpen(false)}
        comparedColleges={comparedColleges}
        onRemove={(id) => setComparedColleges(prev => prev.filter(c => c.id !== id))}
        onClearAll={clearAllCompared}
      />

    </div>
  );
}
