import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminOverview from '../components/admin/AdminOverview';
import AddCollegeForm from '../components/admin/AddCollegeForm';
import AddExamForm from '../components/admin/AddExamForm';
import AddCourseForm from '../components/admin/AddCourseForm';
import ManageColleges from '../components/admin/ManageColleges';

export default function AdminDashboard() {
  const toast = useToast();
  const { user, isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loadingStats, setLoadingStats] = useState(true);
  const [stats, setStats] = useState({ collegesCount: 0, examsCount: 0, counsellingCount: 0 });
  const [colleges, setColleges] = useState([]);
  const [counsellingRequests, setCounsellingRequests] = useState([]);
  const [updatingRequestId, setUpdatingRequestId] = useState(null);

  // Access Control: Redirect if not admin
  useEffect(() => {
    if (!isLoggedIn && !loading) {
      navigate('/login');
    }
  }, [isLoggedIn, loading, navigate]);

  // Fetch count of colleges, exams & counselling requests for stats cards
  useEffect(() => {
    if (user && user.role === 'admin') {
      const fetchStats = async () => {
        try {
          const colData = await api.colleges.getAll();
          const examData = await api.exams.getAll();
          
          let counsellingCount = 0;
          let requestsList = [];
          try {
            const counsellingData = await api.counselling.getAll();
            counsellingCount = counsellingData.count || (counsellingData.requests ? counsellingData.requests.length : 0);
            requestsList = counsellingData.requests || [];
          } catch (counsellingErr) {
            console.error('Error fetching counselling requests:', counsellingErr.message);
          }

          setStats({
            collegesCount: colData.colleges ? colData.colleges.length : 0,
            examsCount: examData.exams ? examData.exams.length : 0,
            counsellingCount
          });
          setColleges(colData.colleges || []);
          setCounsellingRequests(requestsList);
        } catch (err) {
          console.error('Error fetching dashboard stats:', err.message);
        } finally {
          setLoadingStats(false);
        }
      };
      fetchStats();
    }
  }, [user]);

  const handleCollegeDelete = async (id, mongoId) => {
    console.log('handleCollegeDelete called with ID:', id, 'MongoID:', mongoId);
    const targetId = id || mongoId;
    if (!targetId) {
      toast.error('Invalid college ID. Cannot delete.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this college? This action cannot be undone.')) {
      try {
        const res = await api.colleges.delete(targetId);
        if (res.success) {
          toast.success('College deleted successfully');
          setColleges(prev => prev.filter(col => col.id !== targetId && col._id !== targetId));
          setStats(prev => ({ ...prev, collegesCount: Math.max(0, prev.collegesCount - 1) }));
        }
      } catch (err) {
        console.error('Delete error:', err);
        toast.error(err.message || 'Failed to delete college');
      }
    }
  };

  const handleStatusChange = async (requestId, newStatus) => {
    setUpdatingRequestId(requestId);
    try {
      const res = await api.counselling.updateStatus(requestId, newStatus);
      if (res.success) {
        setCounsellingRequests(prev => prev.map(req => 
          req._id === requestId ? { ...req, status: newStatus } : req
        ));
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update counselling request status');
    } finally {
      setUpdatingRequestId(null);
    }
  };


  // --- College Form State ---
  const [collegeForm, setCollegeForm] = useState({
    name: '',
    logo: '',
    image: '',
    stream: 'Engineering',
    location: '',
    ownership: 'Public/Government',
    rating: '4.5',
    fees: '',
    nirf: '',
    package: '',
    highestPackage: '',
    description: '',
    about: '',
    approvals: '', // Comma-separated on input
    images: '', // Comma-separated gallery URLs
    courses: [{ name: '', fees: '', duration: '', eligibility: '' }],
    whyChoose: [{ title: '', desc: '' }],
    facilities: [], // list of facilities objects
    faqs: [{ q: '', a: '' }]
  });

  const [submittingCollege, setSubmittingCollege] = useState(false);
  const [collegeSuccess, setCollegeSuccess] = useState(null);
  const [collegeError, setCollegeError] = useState(null);

  // --- Exam Form State ---
  const [examForm, setExamForm] = useState({
    name: '',
    fullTitle: '',
    category: 'Engineering',
    level: 'National',
    mode: 'Online / CBT',
    applicants: '',
    duration: '',
    conductingBody: '',
    frequency: '',
    overview: '',
    dates: [{ event: '', date: '', status: 'upcoming' }],
    highlights: [{ label: '', value: '' }]
  });

  const [submittingExam, setSubmittingExam] = useState(false);
  const [examSuccess, setExamSuccess] = useState(null);
  const [examError, setExamError] = useState(null);

  // --- Course Form State ---
  const [courseForm, setCourseForm] = useState({
    name: '',
    category: 'Technology',
    iconName: 'Code2',
    duration: '',
    salary: '',
    demand: 'High',
    eligibility: '',
    jobs: ''
  });

  const [submittingCourse, setSubmittingCourse] = useState(false);
  const [courseSuccess, setCourseSuccess] = useState(null);
  const [courseError, setCourseError] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-[#0f71cd] border-t-transparent animate-spin mb-3"></div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Checking Privileges...</span>
      </div>
    );
  }

  if (!isLoggedIn || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle size={64} className="text-red-500 mb-4" />
        <h2 className="text-3xl font-bold text-slate-800 mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Access Denied</h2>
        <p className="text-slate-500 mb-6 font-semibold max-w-md text-sm">You do not have administrative privileges to view this page. Please log in with an admin account.</p>
        <Link to="/" className="px-6 py-2.5 bg-[#0f71cd] text-white font-bold text-sm rounded-xl transition-all hover:bg-[#0c62b2] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Go Back Home</Link>
      </div>
    );
  }

  // --- College Form Handlers ---
  const handleCollegeChange = (e) => {
    const { name, value } = e.target;
    setCollegeForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDynamicCollegeFieldChange = (index, field, value, type) => {
    setCollegeForm(prev => {
      const list = [...prev[type]];
      list[index][field] = value;
      return { ...prev, [type]: list };
    });
  };

  const addDynamicCollegeRow = (type) => {
    setCollegeForm(prev => {
      const template = type === 'courses' 
        ? { name: '', fees: '', duration: '', eligibility: '' } 
        : type === 'whyChoose' 
        ? { title: '', desc: '' }
        : { q: '', a: '' };
      return { ...prev, [type]: [...prev[type], template] };
    });
  };

  const removeDynamicCollegeRow = (index, type) => {
    setCollegeForm(prev => {
      const list = [...prev[type]];
      if (list.length > 1) {
        list.splice(index, 1);
      }
      return { ...prev, [type]: list };
    });
  };

  const handleFacilityCheckboxChange = (facilityName, iconName) => {
    setCollegeForm(prev => {
      const exists = prev.facilities.find(f => f.name === facilityName);
      let list = [...prev.facilities];
      if (exists) {
        list = list.filter(f => f.name !== facilityName);
      } else {
        list.push({ name: facilityName, iconName });
      }
      return { ...prev, facilities: list };
    });
  };

  const handleCollegeSubmit = async (e) => {
    e.preventDefault();
    setSubmittingCollege(true);
    setCollegeSuccess(null);
    setCollegeError(null);

    // Clean inputs
    const payload = {
      ...collegeForm,
      approvals: collegeForm.approvals.split(',').map(s => s.trim()).filter(Boolean),
      images: collegeForm.images.split(',').map(s => s.trim()).filter(Boolean),
      courses: collegeForm.courses.filter(c => c.name),
      whyChoose: collegeForm.whyChoose.filter(w => w.title),
      faqs: collegeForm.faqs.filter(f => f.q),
      about: collegeForm.about || collegeForm.description
    };

    try {
      const data = await api.colleges.create(payload);
      if (data.success) {
        setCollegeSuccess(`College "${data.college.name}" has been created successfully!`);
        // Reset form
        setCollegeForm({
          name: '',
          logo: '',
          image: '',
          stream: 'Engineering',
          location: '',
          ownership: 'Public/Government',
          rating: '4.5',
          fees: '',
          nirf: '',
          package: '',
          highestPackage: '',
          description: '',
          about: '',
          approvals: '',
          images: '',
          courses: [{ name: '', fees: '', duration: '', eligibility: '' }],
          whyChoose: [{ title: '', desc: '' }],
          facilities: [],
          faqs: [{ q: '', a: '' }]
        });
        // Update state and stats
        setColleges(prev => [data.college, ...prev]);
        setStats(prev => ({ ...prev, collegesCount: prev.collegesCount + 1 }));
      }
    } catch (err) {
      setCollegeError(err.message || 'Failed to create college. Please try again.');
    } finally {
      setSubmittingCollege(false);
    }
  };

  // --- Exam Form Handlers ---
  const handleExamChange = (e) => {
    const { name, value } = e.target;
    setExamForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDynamicExamFieldChange = (index, field, value, type) => {
    setExamForm(prev => {
      const list = [...prev[type]];
      list[index][field] = value;
      return { ...prev, [type]: list };
    });
  };

  const addDynamicExamRow = (type) => {
    setExamForm(prev => {
      const template = type === 'dates' 
        ? { event: '', date: '', status: 'upcoming' } 
        : { label: '', value: '' };
      return { ...prev, [type]: [...prev[type], template] };
    });
  };

  const removeDynamicExamRow = (index, type) => {
    setExamForm(prev => {
      const list = [...prev[type]];
      if (list.length > 1) {
        list.splice(index, 1);
      }
      return { ...prev, [type]: list };
    });
  };

  const handleExamSubmit = async (e) => {
    e.preventDefault();
    setSubmittingExam(true);
    setExamSuccess(null);
    setExamError(null);

    // Clean inputs
    const payload = {
      ...examForm,
      dates: examForm.dates.filter(d => d.event),
      highlights: examForm.highlights.filter(h => h.label)
    };

    try {
      const data = await api.exams.create(payload);
      if (data.success) {
        setExamSuccess(`Entrance exam "${data.exam.name}" has been created successfully!`);
        // Reset form
        setExamForm({
          name: '',
          fullTitle: '',
          category: 'Engineering',
          level: 'National',
          mode: 'Online / CBT',
          applicants: '',
          duration: '',
          conductingBody: '',
          frequency: '',
          overview: '',
          dates: [{ event: '', date: '', status: 'upcoming' }],
          highlights: [{ label: '', value: '' }]
        });
        // Update stats
        setStats(prev => ({ ...prev, examsCount: prev.examsCount + 1 }));
      }
    } catch (err) {
      setExamError(err.message || 'Failed to create entrance exam. Please try again.');
    } finally {
      setSubmittingExam(false);
    }
  };



  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setSubmittingCourse(true);
    setCourseSuccess(null);
    setCourseError(null);

    let demandColor = 'bg-[#0f71cd]/10 text-[#0f71cd] border-transparent';
    if (courseForm.demand.includes('Extreme') || courseForm.demand === 'Constant High') {
      demandColor = 'bg-[#0f71cd] text-white border-transparent';
    } else if (courseForm.demand === 'High') {
      demandColor = 'bg-[#0f71cd]/90 text-[#0f71cd] border-transparent';
    } else if (courseForm.demand === 'Moderate') {
      demandColor = 'bg-slate-100 text-slate-700 border-slate-200';
    }

    const payload = {
      ...courseForm,
      demandColor
    };

    try {
      const data = await api.courses.create(payload);
      if (data.success) {
        setCourseSuccess(`Professional course "${data.course.name}" has been created successfully!`);
        setCourseForm({
          name: '',
          category: 'Technology',
          iconName: 'Code2',
          duration: '',
          salary: '',
          demand: 'High',
          eligibility: '',
          jobs: ''
        });
      }
    } catch (err) {
      setCourseError(err.message || 'Failed to create professional course. Please try again.');
    } finally {
      setSubmittingCourse(false);
    }
  };

  const availableFacilities = [
    { name: 'Smart Classrooms', iconName: 'Building2' },
    { name: 'Digital Library', iconName: 'FileText' },
    { name: 'High-Tech Labs', iconName: 'CheckCircle' },
    { name: 'Sports Complex', iconName: 'Award' },
    { name: 'Campus Wi-Fi', iconName: 'Globe' },
    { name: 'AC Hostels', iconName: 'Users' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#0f71cd]/20">
      <Navbar lightTextBeforeScroll={true} />

      {/* Hero Banner Header */}
      <section className="relative pt-32 pb-12 bg-[#0F141E] text-white overflow-hidden border-b border-slate-800 text-left">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0f71cd]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#0f71cd] text-xs font-bold uppercase tracking-wider mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                <ShieldCheck size={16} /> Admin Operations Portal
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Admin Control Center</h1>
              <p className="text-slate-300 text-sm mt-1 font-semibold">Add, update, and manage colleges, streams, and entrance exams database dynamically.</p>
            </div>
            <Link to="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white px-4 py-2 bg-white/10 rounded-xl hover:bg-white/15 transition-all w-fit border border-white/10 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              <ArrowLeft size={14} /> Back to Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar (3 Cols) */}
          <div className="lg:col-span-3">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Form Content Pane (9 Cols) */}
          <div className="lg:col-span-9 space-y-6">
            {activeTab === 'overview' && (
              <AdminOverview
                user={user}
                loadingStats={loadingStats}
                stats={stats}
                counsellingRequests={counsellingRequests}
                updatingRequestId={updatingRequestId}
                handleStatusChange={handleStatusChange}
              />
            )}

            {activeTab === 'add-college' && (
              <AddCollegeForm
                collegeForm={collegeForm}
                handleCollegeChange={handleCollegeChange}
                handleDynamicCollegeFieldChange={handleDynamicCollegeFieldChange}
                addDynamicCollegeRow={addDynamicCollegeRow}
                removeDynamicCollegeRow={removeDynamicCollegeRow}
                handleFacilityCheckboxChange={handleFacilityCheckboxChange}
                handleCollegeSubmit={handleCollegeSubmit}
                submittingCollege={submittingCollege}
                collegeSuccess={collegeSuccess}
                collegeError={collegeError}
              />
            )}

            {activeTab === 'add-exam' && (
              <AddExamForm
                examForm={examForm}
                handleExamChange={handleExamChange}
                handleDynamicExamFieldChange={handleDynamicExamFieldChange}
                addDynamicExamRow={addDynamicExamRow}
                removeDynamicExamRow={removeDynamicExamRow}
                handleExamSubmit={handleExamSubmit}
                submittingExam={submittingExam}
                examSuccess={examSuccess}
                examError={examError}
              />
            )}

            {activeTab === 'add-course' && (
              <AddCourseForm
                courseForm={courseForm}
                handleCourseChange={handleCourseChange}
                handleCourseSubmit={handleCourseSubmit}
                submittingCourse={submittingCourse}
                courseSuccess={courseSuccess}
                courseError={courseError}
              />
            )}

            {activeTab === 'manage-colleges' && (
              <ManageColleges
                loadingStats={loadingStats}
                colleges={colleges}
                handleCollegeDelete={handleCollegeDelete}
              />
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
