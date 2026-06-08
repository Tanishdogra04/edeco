import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building2, ShieldCheck, Plus, Trash2, ArrowLeft, AlertCircle, 
  CheckCircle, Compass, Sparkles, BookOpenCheck, PhoneCall, Mail, List
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-[#110051] border-t-transparent animate-spin mb-3"></div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-sans">Checking Privileges...</span>
      </div>
    );
  }

  if (!isLoggedIn || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle size={64} className="text-red-500 mb-4" />
        <h2 className="text-3xl font-black text-slate-800 mb-2">Access Denied</h2>
        <p className="text-slate-500 mb-6 font-medium max-w-md">You do not have administrative privileges to view this page. Please log in with an admin account.</p>
        <Link to="/" className="px-6 py-2.5 bg-[#110051] text-white font-bold text-sm rounded-xl transition-all hover:bg-[#1a0073]">Go Back Home</Link>
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

  const availableFacilities = [
    { name: 'Smart Classrooms', iconName: 'Building2' },
    { name: 'Digital Library', iconName: 'FileText' },
    { name: 'High-Tech Labs', iconName: 'CheckCircle' },
    { name: 'Sports Complex', iconName: 'Award' },
    { name: 'Campus Wi-Fi', iconName: 'Globe' },
    { name: 'AC Hostels', iconName: 'Users' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#110051]/20">
      <Navbar />

      {/* Hero Banner Header */}
      <section className="relative pt-24 pb-8 bg-[#110051] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.15),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck size={16} /> Admin Operations Portal
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Admin Control Center</h1>
              <p className="text-slate-350 text-sm mt-1 font-medium">Add, update, and manage colleges, streams, and entrance exams database dynamically.</p>
            </div>
            <Link to="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white px-4 py-2 bg-white/10 rounded-xl hover:bg-white/15 transition-all w-fit border border-white/10">
              <ArrowLeft size={14} /> Back to Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-left transition-all ${
                  activeTab === 'overview'
                    ? 'bg-[#110051] text-white shadow-md shadow-indigo-950/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Compass size={18} className="shrink-0" />
                Overview
              </button>
              
              <button
                onClick={() => setActiveTab('add-college')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-left transition-all ${
                  activeTab === 'add-college'
                    ? 'bg-[#110051] text-white shadow-md shadow-indigo-950/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Building2 size={18} className="shrink-0" />
                Add New College
              </button>

              <button
                onClick={() => setActiveTab('manage-colleges')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-left transition-all ${
                  activeTab === 'manage-colleges'
                    ? 'bg-[#110051] text-white shadow-md shadow-indigo-950/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <List size={18} className="shrink-0" />
                Manage Colleges
              </button>

              <button
                onClick={() => setActiveTab('add-exam')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-left transition-all ${
                  activeTab === 'add-exam'
                    ? 'bg-[#110051] text-white shadow-md shadow-indigo-950/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <BookOpenCheck size={18} className="shrink-0" />
                Add Entrance Exam
              </button>
            </div>

            {/* Quick Helper Widget */}
            <div className="bg-gradient-to-br from-slate-900 to-[#110051] rounded-3xl p-6 text-white border border-slate-800 shadow-xl space-y-3 relative overflow-hidden group text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl translate-x-1/3 -translate-y-1/3 group-hover:scale-125 transition-transform duration-500"></div>
              <h4 className="font-extrabold text-sm">Need Database Assistance?</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">To modify existing data or bulk upload records, contact database developers directly or execute bulk loading seed files.</p>
              <a href="mailto:support@edeco.com" className="inline-block text-[11px] font-bold bg-white text-slate-900 px-4 py-2 rounded-xl transition-all hover:bg-slate-50 mt-1 cursor-pointer">
                Support Email
              </a>
            </div>
          </div>

          {/* Form Content Pane (9 Cols) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Stats Panel Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-5 shadow-sm group hover:border-indigo-200 transition-all text-left">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#110051] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-350">
                      <Building2 size={28} />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Colleges</span>
                      <h3 className="text-3xl font-black text-slate-800 mt-0.5">{loadingStats ? '...' : stats.collegesCount}</h3>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-5 shadow-sm group hover:border-indigo-200 transition-all text-left">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-350">
                      <BookOpenCheck size={28} />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Entrance Exams</span>
                      <h3 className="text-3xl font-black text-slate-800 mt-0.5">{loadingStats ? '...' : stats.examsCount}</h3>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-5 shadow-sm group hover:border-indigo-200 transition-all text-left">
                    <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-350">
                      <PhoneCall size={28} />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Counselling Requests</span>
                      <h3 className="text-3xl font-black text-slate-800 mt-0.5">{loadingStats ? '...' : stats.counsellingCount}</h3>
                    </div>
                  </div>
                </div>

                {/* Dashboard Greetings */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4 text-left">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <Sparkles size={20} className="animate-pulse" />
                    <h3 className="font-extrabold text-lg text-slate-900">Welcome back, {user.name}!</h3>
                  </div>
                  <p className="text-slate-650 leading-relaxed font-medium text-sm">
                    This administrative dashboard allows you to seed new listings to the portal instantly. Newly created colleges will immediately support reviews, dynamic eligibility checks, compared actions, and brochures downloads on the frontend.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-bold text-slate-400">
                    <div>User Email: <span className="text-slate-700 font-semibold">{user.email}</span></div>
                    <div>•</div>
                    <div>Assigned Privilege: <span className="text-orange-655 uppercase font-black">{user.role}</span></div>
                  </div>
                </div>

                {/* Recent Counselling Enquiries & Leads */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden text-left">
                  <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
                    <div>
                      <h3 className="font-black text-slate-900 text-lg">Admissions Counselling Leads</h3>
                      <p className="text-slate-500 text-xs mt-0.5 font-medium">Real-time dynamic updates of student query logs and callback requests.</p>
                    </div>
                    <span className="px-3.5 py-1.5 bg-[#110051] text-white rounded-xl text-xs font-bold w-fit">
                      {counsellingRequests.length} Active Leads
                    </span>
                  </div>

                  {loadingStats ? (
                    <div className="p-12 text-center text-slate-400 font-medium text-sm flex items-center justify-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin"></div>
                      Loading database enquiries...
                    </div>
                  ) : counsellingRequests.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 font-medium text-sm">
                      No counselling requests found in database.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                          <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <th className="px-6 py-4">Student Details</th>
                            <th className="px-6 py-4">Academic Background</th>
                            <th className="px-6 py-4">Target / Score</th>
                            <th className="px-6 py-4">Query Details</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {counsellingRequests.map((req) => (
                            <tr key={req._id} className="hover:bg-slate-50/70 transition-colors group">
                              <td className="px-6 py-4">
                                <div className="font-extrabold text-slate-900 text-sm">{req.name}</div>
                                <div className="text-xs text-slate-500 font-medium mt-0.5 flex flex-col gap-0.5">
                                  <span className="flex items-center gap-1"><Mail size={12} className="text-slate-400" /> {req.email}</span>
                                  <span className="flex items-center gap-1"><PhoneCall size={12} className="text-slate-400" /> {req.phone}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-xs font-bold text-slate-800">{req.stream || 'N/A'}</div>
                                <div className="text-[11px] text-slate-500 font-semibold mt-0.5">{req.education || 'N/A'}</div>
                              </td>
                              <td className="px-6 py-4">
                                {req.exam ? (
                                  <>
                                    <div className="text-xs font-bold text-slate-800">{req.exam}</div>
                                    <div className="text-[11px] text-orange-600 font-extrabold mt-0.5">Score: {req.score || 'N/A'}</div>
                                  </>
                                ) : (
                                  <span className="text-xs text-slate-400 font-semibold">No Exam Info</span>
                                )}
                              </td>
                              <td className="px-6 py-4 max-w-xs">
                                <div className="text-xs text-slate-700 font-medium leading-relaxed line-clamp-2 hover:line-clamp-none transition-all cursor-help" title={req.query}>
                                  {req.query || 'Callback request'}
                                </div>
                                <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
                                  Intake Year: {req.year || '2026'}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-xs font-bold text-slate-500">
                                {new Date(req.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </td>
                              <td className="px-6 py-4">
                                <select
                                  value={req.status}
                                  disabled={updatingRequestId === req._id}
                                  onChange={(e) => handleStatusChange(req._id, e.target.value)}
                                  className={`px-2.5 py-1 text-xs font-bold rounded-lg border outline-none cursor-pointer transition-colors ${
                                    req.status === 'Pending'
                                      ? 'bg-amber-50 text-amber-700 border-amber-100'
                                      : req.status === 'Contacted'
                                      ? 'bg-blue-50 text-blue-700 border-blue-100'
                                      : req.status === 'Resolved'
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                      : 'bg-slate-100 text-slate-700 border-slate-200'
                                  }`}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Resolved">Resolved</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ADD COLLEGE TAB */}
            {activeTab === 'add-college' && (
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-black text-slate-900 text-lg">Add New College Profile</h3>
                  <span className="text-xs font-bold text-slate-400">100% Dynamic Synchronization</span>
                </div>

                <form onSubmit={handleCollegeSubmit} className="p-6 sm:p-8 space-y-8 text-left">
                  {collegeSuccess && (
                    <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm font-semibold">
                      <CheckCircle className="shrink-0 text-emerald-600" size={18} />
                      {collegeSuccess}
                    </div>
                  )}

                  {collegeError && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3 text-sm font-semibold">
                      <AlertCircle className="shrink-0 text-red-600" size={18} />
                      {collegeError}
                    </div>
                  )}

                  {/* Section 1: Basic Info */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest border-b pb-2">1. Basic Information</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col justify-between h-full space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">College Name *</label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={collegeForm.name}
                          onChange={handleCollegeChange}
                          placeholder="e.g. Birla Institute of Technology & Science (BITS)"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>

                      <div className="flex flex-col justify-between h-full space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Location *</label>
                        <input
                          type="text"
                          required
                          name="location"
                          value={collegeForm.location}
                          onChange={handleCollegeChange}
                          placeholder="e.g. Pilani, Rajasthan"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>

                      <div className="flex flex-col justify-between h-full space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Stream / Category</label>
                        <select
                          name="stream"
                          value={collegeForm.stream}
                          onChange={handleCollegeChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-semibold transition-all h-10"
                        >
                          <option value="Engineering">Engineering</option>
                          <option value="Management">Management</option>
                          <option value="Medical">Medical</option>
                          <option value="Law">Law</option>
                          <option value="Design">Design</option>
                        </select>
                      </div>

                      <div className="flex flex-col justify-between h-full space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Ownership Type</label>
                        <select
                          name="ownership"
                          value={collegeForm.ownership}
                          onChange={handleCollegeChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-semibold transition-all h-10"
                        >
                          <option value="Public/Government">Public/Government</option>
                          <option value="Private">Private</option>
                          <option value="Autonomous">Autonomous</option>
                        </select>
                      </div>

                      <div className="flex flex-col justify-between h-full space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Logo Image URL</label>
                        <input
                          type="text"
                          name="logo"
                          value={collegeForm.logo}
                          onChange={handleCollegeChange}
                          placeholder="e.g. https://domain.com/logo.png"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>

                      <div className="flex flex-col justify-between h-full space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Cover Image URL</label>
                        <input
                          type="text"
                          name="image"
                          value={collegeForm.image}
                          onChange={handleCollegeChange}
                          placeholder="e.g. https://images.unsplash.com/photo-..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-between h-full space-y-1.5 mt-4">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Accreditation / Approvals (comma-separated)</label>
                      <input
                        type="text"
                        name="approvals"
                        value={collegeForm.approvals}
                        onChange={handleCollegeChange}
                        placeholder="e.g. AICTE, UGC, NAAC A+"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                      />
                    </div>
                  </div>

                  {/* Section 2: Stats & Key Metrics */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest border-b pb-2">2. Stats & Key Metrics</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="flex flex-col justify-between h-full space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Annual Fees</label>
                        <input
                          type="text"
                          name="fees"
                          value={collegeForm.fees}
                          onChange={handleCollegeChange}
                          placeholder="e.g. ₹4.5 Lakhs / Yr"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>

                      <div className="flex flex-col justify-between h-full space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Average Placement Package</label>
                        <input
                          type="text"
                          name="package"
                          value={collegeForm.package}
                          onChange={handleCollegeChange}
                          placeholder="e.g. ₹19.2 LPA Avg"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>

                      <div className="flex flex-col justify-between h-full space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Highest Package</label>
                        <input
                          type="text"
                          name="highestPackage"
                          value={collegeForm.highestPackage}
                          onChange={handleCollegeChange}
                          placeholder="e.g. ₹72.0 LPA"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>

                      <div className="flex flex-col justify-between h-full space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">NIRF Rank / Tagline</label>
                        <input
                          type="text"
                          name="nirf"
                          value={collegeForm.nirf}
                          onChange={handleCollegeChange}
                          placeholder="e.g. #20 Engineering"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>

                      <div className="flex flex-col justify-between h-full space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Visual Rating (out of 5)</label>
                        <input
                          type="text"
                          name="rating"
                          value={collegeForm.rating}
                          onChange={handleCollegeChange}
                          placeholder="e.g. 4.7"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>

                      <div className="flex flex-col justify-between h-full space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Quick Description</label>
                        <input
                          type="text"
                          name="description"
                          value={collegeForm.description}
                          onChange={handleCollegeChange}
                          placeholder="Brief tagline/one-line overview..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Facilities Checkboxes */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest border-b pb-2">3. Campus Facilities</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {availableFacilities.map((fac) => {
                        const isChecked = !!collegeForm.facilities.find(f => f.name === fac.name);
                        return (
                          <label
                            key={fac.name}
                            className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer text-xs font-bold transition-all ${
                              isChecked
                                ? 'bg-indigo-50 border-[#110051] text-[#110051]'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleFacilityCheckboxChange(fac.name, fac.iconName)}
                              className="hidden"
                            />
                            <span>{fac.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 4: Detailed About */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest border-b pb-2 mb-2">4. Detailed Profile Biography</h4>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">About the College</label>
                    <textarea
                      name="about"
                      rows={4}
                      value={collegeForm.about}
                      onChange={handleCollegeChange}
                      placeholder="Detailed background history, student strength, ranking accomplishments, and overview..."
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all resize-none"
                    />
                  </div>

                  {/* Section 5: Dynamic Courses List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest">5. Course Offerings & Intake Details</h4>
                      <button
                        type="button"
                        onClick={() => addDynamicCollegeRow('courses')}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        <Plus size={12} /> Add Course
                      </button>
                    </div>

                    <div className="space-y-3">
                      {collegeForm.courses.map((course, idx) => (
                        <div key={idx} className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col md:flex-row gap-3 items-end">
                          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-left">
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Course Name</span>
                              <input
                                type="text"
                                value={course.name}
                                onChange={(e) => handleDynamicCollegeFieldChange(idx, 'name', e.target.value, 'courses')}
                                placeholder="e.g. B.Tech Computer Science"
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#110051]"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Annual Fees</span>
                              <input
                                type="text"
                                value={course.fees}
                                onChange={(e) => handleDynamicCollegeFieldChange(idx, 'fees', e.target.value, 'courses')}
                                placeholder="e.g. ₹2.2 Lakhs / yr"
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#110051]"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Duration</span>
                              <input
                                type="text"
                                value={course.duration}
                                onChange={(e) => handleDynamicCollegeFieldChange(idx, 'duration', e.target.value, 'courses')}
                                placeholder="e.g. 4 Years"
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#110051]"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Eligibility Criteria</span>
                              <input
                                type="text"
                                value={course.eligibility}
                                onChange={(e) => handleDynamicCollegeFieldChange(idx, 'eligibility', e.target.value, 'courses')}
                                placeholder="e.g. 10+2 with 75% + JEE"
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#110051]"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeDynamicCollegeRow(idx, 'courses')}
                            className="p-2 border border-slate-200 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer h-fit"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 6: Dynamic Why Choose Us */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest">6. Why Choose Us Features</h4>
                      <button
                        type="button"
                        onClick={() => addDynamicCollegeRow('whyChoose')}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        <Plus size={12} /> Add Feature
                      </button>
                    </div>

                    <div className="space-y-3">
                      {collegeForm.whyChoose.map((why, idx) => (
                        <div key={idx} className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col md:flex-row gap-3 items-end">
                          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Feature Title</span>
                              <input
                                type="text"
                                value={why.title}
                                onChange={(e) => handleDynamicCollegeFieldChange(idx, 'title', e.target.value, 'whyChoose')}
                                placeholder="e.g. World-Class Faculty"
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#110051]"
                              />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Short Description</span>
                              <input
                                type="text"
                                value={why.desc}
                                onChange={(e) => handleDynamicCollegeFieldChange(idx, 'desc', e.target.value, 'whyChoose')}
                                placeholder="Describe why this feature stands out to students..."
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#110051]"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeDynamicCollegeRow(idx, 'whyChoose')}
                            className="p-2 border border-slate-200 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer h-fit"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 7: Dynamic FAQs */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest">7. FAQ Accordion Items</h4>
                      <button
                        type="button"
                        onClick={() => addDynamicCollegeRow('faqs')}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        <Plus size={12} /> Add FAQ
                      </button>
                    </div>

                    <div className="space-y-3">
                      {collegeForm.faqs.map((faq, idx) => (
                        <div key={idx} className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col md:flex-row gap-3 items-end">
                          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Question</span>
                              <input
                                type="text"
                                value={faq.q}
                                onChange={(e) => handleDynamicCollegeFieldChange(idx, 'q', e.target.value, 'faqs')}
                                placeholder="e.g. What is the intake capacity?"
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#110051]"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Answer</span>
                              <input
                                type="text"
                                value={faq.a}
                                onChange={(e) => handleDynamicCollegeFieldChange(idx, 'a', e.target.value, 'faqs')}
                                placeholder="Provide the detailed answer to help student queries..."
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#110051]"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeDynamicCollegeRow(idx, 'faqs')}
                            className="p-2 border border-slate-200 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer h-fit"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submission Footer */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={submittingCollege}
                      className="px-8 py-3.5 bg-[#110051] hover:bg-[#1a0073] text-white text-sm font-bold rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      {submittingCollege ? 'Creating Profile...' : 'Create College Profile'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ADD EXAM TAB */}
            {activeTab === 'add-exam' && (
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-black text-slate-900 text-lg">Create Entrance Exam Portal</h3>
                  <span className="text-xs font-bold text-slate-400">Manage Admissions Tests</span>
                </div>

                <form onSubmit={handleExamSubmit} className="p-6 sm:p-8 space-y-8 text-left">
                  {examSuccess && (
                    <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm font-semibold">
                      <CheckCircle className="shrink-0 text-emerald-600" size={18} />
                      {examSuccess}
                    </div>
                  )}

                  {examError && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3 text-sm font-semibold">
                      <AlertCircle className="shrink-0 text-red-600" size={18} />
                      {examError}
                    </div>
                  )}

                  {/* Section 1: Basic Exam Info */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest border-b pb-2">1. Exam Information</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Exam Short Name *</label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={examForm.name}
                          onChange={handleExamChange}
                          placeholder="e.g. BITSAT"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Exam Title *</label>
                        <input
                          type="text"
                          required
                          name="fullTitle"
                          value={examForm.fullTitle}
                          onChange={handleExamChange}
                          placeholder="e.g. BITS Admission Test"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Category / Stream</label>
                        <select
                          name="category"
                          value={examForm.category}
                          onChange={handleExamChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-semibold transition-all"
                        >
                          <option value="Engineering">Engineering</option>
                          <option value="Management">Management</option>
                          <option value="Medical">Medical</option>
                          <option value="Law">Law</option>
                          <option value="Design">Design</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Exam Level</label>
                        <select
                          name="level"
                          value={examForm.level}
                          onChange={handleExamChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-semibold transition-all"
                        >
                          <option value="National">National</option>
                          <option value="State">State</option>
                          <option value="University">University</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Exam Mode</label>
                        <input
                          type="text"
                          name="mode"
                          value={examForm.mode}
                          onChange={handleExamChange}
                          placeholder="e.g. Online / CBT or Offline"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Conducting Body</label>
                        <input
                          type="text"
                          name="conductingBody"
                          value={examForm.conductingBody}
                          onChange={handleExamChange}
                          placeholder="e.g. BITS Pilani"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Applicants</label>
                        <input
                          type="text"
                          name="applicants"
                          value={examForm.applicants}
                          onChange={handleExamChange}
                          placeholder="e.g. 3.2 Lakhs"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Duration</label>
                        <input
                          type="text"
                          name="duration"
                          value={examForm.duration}
                          onChange={handleExamChange}
                          placeholder="e.g. 3 Hours"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Frequency</label>
                        <input
                          type="text"
                          name="frequency"
                          value={examForm.frequency}
                          onChange={handleExamChange}
                          placeholder="e.g. Once a year"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Detailed Overview */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest border-b pb-2 mb-2">2. Detailed Exam Overview</h4>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Overview Description</label>
                    <textarea
                      name="overview"
                      rows={4}
                      value={examForm.overview}
                      onChange={handleExamChange}
                      placeholder="Detailed overview about what this exam checks, test syllabus structure, and scoring guidelines..."
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#110051]/30 focus:bg-white text-sm font-medium transition-all resize-none"
                    />
                  </div>

                  {/* Section 3: Dynamic Highlights */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest">3. Exam Highlights (Quick Facts)</h4>
                      <button
                        type="button"
                        onClick={() => addDynamicExamRow('highlights')}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        <Plus size={12} /> Add Highlight
                      </button>
                    </div>

                    <div className="space-y-3">
                      {examForm.highlights.map((high, idx) => (
                        <div key={idx} className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col md:flex-row gap-3 items-end">
                          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Fact Label</span>
                              <input
                                type="text"
                                value={high.label}
                                onChange={(e) => handleDynamicExamFieldChange(idx, 'label', e.target.value, 'highlights')}
                                placeholder="e.g. Negative Marking"
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#110051]"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Fact Value</span>
                              <input
                                type="text"
                                value={high.value}
                                onChange={(e) => handleDynamicExamFieldChange(idx, 'value', e.target.value, 'highlights')}
                                placeholder="e.g. Yes (-1 mark for wrong answers)"
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#110051]"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeDynamicExamRow(idx, 'highlights')}
                            className="p-2 border border-slate-200 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer h-fit"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 4: Dynamic Important Dates */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest">4. Important Dates & Calendar Events</h4>
                      <button
                        type="button"
                        onClick={() => addDynamicExamRow('dates')}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        <Plus size={12} /> Add Date
                      </button>
                    </div>

                    <div className="space-y-3">
                      {examForm.dates.map((dateObj, idx) => (
                        <div key={idx} className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col md:flex-row gap-3 items-end">
                          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Event / Phase Name</span>
                              <input
                                type="text"
                                value={dateObj.event}
                                onChange={(e) => handleDynamicExamFieldChange(idx, 'event', e.target.value, 'dates')}
                                placeholder="e.g. Registration Window"
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#110051]"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Date / Timeline</span>
                              <input
                                type="text"
                                value={dateObj.date}
                                onChange={(e) => handleDynamicExamFieldChange(idx, 'date', e.target.value, 'dates')}
                                placeholder="e.g. January 15 - February 20, 2026"
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#110051]"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Timeline Status</span>
                              <select
                                value={dateObj.status}
                                onChange={(e) => handleDynamicExamFieldChange(idx, 'status', e.target.value, 'dates')}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold outline-none focus:border-[#110051] h-9"
                              >
                                <option value="upcoming">Upcoming</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                              </select>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeDynamicExamRow(idx, 'dates')}
                            className="p-2 border border-slate-200 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer h-fit"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submission Footer */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={submittingExam}
                      className="px-8 py-3.5 bg-[#110051] hover:bg-[#1a0073] text-white text-sm font-bold rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      {submittingExam ? 'Creating Portal...' : 'Create Exam Portal'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* MANAGE COLLEGES TAB */}
            {activeTab === 'manage-colleges' && (
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden text-left">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">Manage College Listings</h3>
                    <p className="text-slate-500 text-xs mt-0.5 font-medium">Delete listings from the database dynamically.</p>
                  </div>
                  <span className="px-3.5 py-1.5 bg-[#110051] text-white rounded-xl text-xs font-bold w-fit">
                    {colleges.length} Total Colleges
                  </span>
                </div>

                {loadingStats ? (
                  <div className="p-12 text-center text-slate-400 font-medium text-sm flex items-center justify-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin"></div>
                    Loading database colleges...
                  </div>
                ) : colleges.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 font-medium text-sm">
                    No colleges found in the database.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <th className="px-6 py-4">College Name</th>
                          <th className="px-6 py-4">Location</th>
                          <th className="px-6 py-4">Stream</th>
                          <th className="px-6 py-4">Ownership</th>
                          <th className="px-6 py-4">Rating</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {colleges.map((col) => (
                          <tr key={col.id || col._id} className="hover:bg-slate-50/70 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#110051]/5 border border-[#110051]/10 text-[#110051] flex items-center justify-center font-bold text-sm shrink-0">
                                  {col.logo ? (
                                    col.logo.startsWith('http') ? (
                                      <img src={col.logo} alt="" className="w-full h-full object-contain rounded-xl" />
                                    ) : (
                                      col.logo
                                    )
                                  ) : (
                                    col.name.split(' ').map(w => w.charAt(0)).join('').toUpperCase().substring(0, 3)
                                  )}
                                </div>
                                <div className="font-extrabold text-slate-900 text-sm">{col.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs font-bold text-slate-600">
                              {col.location}
                            </td>
                            <td className="px-6 py-4 text-xs font-bold text-indigo-650">
                              {col.stream}
                            </td>
                            <td className="px-6 py-4 text-xs font-bold text-slate-500">
                              {col.ownership}
                            </td>
                            <td className="px-6 py-4 text-xs font-extrabold text-amber-600">
                              ★ {col.rating || '4.5'}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => handleCollegeDelete(col.id, col._id)}
                                className="p-2 border border-slate-200 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer h-fit inline-flex items-center justify-center"
                                title="Delete College"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
