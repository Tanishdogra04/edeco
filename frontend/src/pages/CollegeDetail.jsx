import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, User, PhoneCall } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ApplicationModal from '../components/ApplicationModal';
import CounsellingModal from '../components/CounsellingModal';
import CompareDrawer from '../components/CompareDrawer';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getMockCollegeData } from '../data/colleges';

// Import Decomposed Components
import CollegeHero from '../components/college-detail/CollegeHero';
import CollegeStats from '../components/college-detail/CollegeStats';
import CollegeOverview from '../components/college-detail/CollegeOverview';
import CollegeFacilities from '../components/college-detail/CollegeFacilities';
import CollegeCourses from '../components/college-detail/CollegeCourses';
import CollegeAdmission from '../components/college-detail/CollegeAdmission';
import CollegePlacements from '../components/college-detail/CollegePlacements';
import CollegeReviews from '../components/college-detail/CollegeReviews';
import CollegeFaqs from '../components/college-detail/CollegeFaqs';
import CounselorSidebar from '../components/college-detail/CounselorSidebar';

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

  const clearAllCompared = () => {
    setComparedColleges([]);
    setIsCompareDrawerOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [collegeId]);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - threshold) {
        setActiveTab('FAQs');
        return;
      }

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

  const isCollegeCompared = comparedColleges.some(c => c.id === college.id);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#0f71cd]/20">
      <Navbar 
        onCounsellingClick={() => setIsCounsellingOpen(true)} 
        compareCount={comparedColleges.length}
        onCompareClick={() => setIsCompareDrawerOpen(true)}
      />

      <CollegeHero 
        college={college}
        onApplyClick={handleApplyForCourse}
        onDownloadBrochure={handleDownloadBrochure}
        onToggleCompare={() => handleToggleCompare(college)}
        isCompared={isCollegeCompared}
      />

      <CollegeStats college={college} />

      {/* STICKY TAB NAVIGATION */}
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

      {/* MAIN 70/30 LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN (MAIN CONTENT) */}
          <div className="lg:col-span-8 space-y-16">
            <CollegeOverview college={college} />
            <CollegeFacilities college={college} />
            <CollegeCourses college={college} onApplyClick={handleApplyForCourse} />
            <CollegeAdmission college={college} />
            <CollegePlacements college={college} />
            <CollegeReviews college={college} />
            <CollegeFaqs college={college} />
          </div>

          {/* RIGHT COLUMN (STICKY SIDEBAR) */}
          <div className="lg:col-span-4 hidden lg:block">
            <CounselorSidebar 
              college={college}
              onApplyClick={handleApplyForCourse}
              onDownloadBrochure={handleDownloadBrochure}
            />
          </div>

        </div>
      </section>

      {/* COUNSELLING CTA SECTION */}
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
