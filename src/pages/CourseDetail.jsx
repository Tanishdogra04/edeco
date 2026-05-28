import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, TrendingUp, Building2, ChevronRight,
  CheckCircle, Sparkles, Send, BookOpen, MapPin, 
  Clock, DollarSign, Target, Award, Monitor,
  Scale, Palette, BarChart3, Globe2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CounsellingCTA from '../components/CounsellingCTA';
import CounsellingModal from '../components/CounsellingModal';

// Dynamic mock data generator for Course details
const getMockCourseData = (id) => {
  const courseName = id ? id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Computer Science';
  
  const defaultData = {
    id: id || 'computer-science',
    name: courseName,
    degree: 'B.Tech / B.E.',
    duration: '4 Years',
    title: `Master ${courseName} & Build the Future`,
    description: `A comprehensive program focusing on the fundamental principles, advanced applications, and practical implementation of ${courseName}. Prepare for a high-growth career in a rapidly evolving tech landscape.`,
    icon: Monitor,
    color: 'from-blue-600 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80',
    stats: {
      avgFees: '₹1 L - ₹3 L / yr',
      startingSalary: '₹8 - ₹15 LPA',
      topRoles: 'Software Engg, Analyst',
      growth: '+22% YoY'
    },
    subjects: [
      { name: 'Data Structures & Algorithms', desc: 'Core fundamentals of organizing and optimizing data processing.' },
      { name: 'Database Management', desc: 'SQL, NoSQL, and structuring complex enterprise databases.' },
      { name: 'Artificial Intelligence', desc: 'Machine learning models, neural networks, and prompt engineering.' },
      { name: 'Cloud Computing', desc: 'AWS, Azure, containerization and deploying scalable microservices.' },
      { name: 'Cybersecurity', desc: 'Network security, cryptography, and ethical hacking basics.' },
      { name: 'Software Engineering', desc: 'Agile methodologies, system design, and product lifecycle.' }
    ],
    careers: [
      { role: 'Software Developer', salary: '₹12 LPA', demand: 'Very High' },
      { role: 'Data Scientist', salary: '₹15 LPA', demand: 'Extremely High' },
      { role: 'Cloud Architect', salary: '₹18 LPA', demand: 'High' },
      { role: 'Product Manager', salary: '₹20 LPA', demand: 'High' }
    ],
    topColleges: [
      { id: 'iit-bombay', name: 'IIT Bombay', location: 'Mumbai, Maharashtra', fees: '₹2.5 L/yr', placement: '100%' },
      { id: 'nit-trichy', name: 'NIT Trichy', location: 'Trichy, Tamil Nadu', fees: '₹2.1 L/yr', placement: '98%' },
      { id: 'bits-pilani', name: 'BITS Pilani', location: 'Pilani, Rajasthan', fees: '₹5.5 L/yr', placement: '99%' },
      { id: 'vit-vellore', name: 'VIT Vellore', location: 'Vellore, Tamil Nadu', fees: '₹1.9 L/yr', placement: '95%' }
    ]
  };

  const lowerId = id?.toLowerCase() || '';

  if (lowerId.includes('finance') || lowerId.includes('marketing') || lowerId.includes('business')) {
    return {
      ...defaultData,
      degree: 'MBA / PGDM',
      duration: '2 Years',
      icon: Briefcase,
      color: 'from-purple-600 to-pink-600',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80',
      stats: { avgFees: '₹8 L - ₹25 L total', startingSalary: '₹12 - ₹25 LPA', topRoles: 'Consultant, Manager', growth: '+15% YoY' },
      subjects: [
        { name: 'Financial Management', desc: 'Corporate finance, budgeting, and investment strategies.' },
        { name: 'Marketing Strategy', desc: 'Brand positioning, digital marketing, and consumer behavior.' },
        { name: 'Business Analytics', desc: 'Data-driven decision making and statistical modeling.' },
        { name: 'Strategic Leadership', desc: 'Organizational behavior, team management, and corporate strategy.' }
      ],
      careers: [
        { role: 'Management Consultant', salary: '₹22 LPA', demand: 'Very High' },
        { role: 'Investment Banker', salary: '₹25 LPA', demand: 'Extremely High' },
        { role: 'Marketing Director', salary: '₹18 LPA', demand: 'High' }
      ],
      topColleges: [
        { id: 'iima', name: 'IIM Ahmedabad', location: 'Ahmedabad, Gujarat', fees: '₹25 L/total', placement: '100%' },
        { id: 'isb', name: 'ISB Hyderabad', location: 'Hyderabad, Telangana', fees: '₹35 L/total', placement: '99%' },
        { id: 'xlri', name: 'XLRI Jamshedpur', location: 'Jamshedpur, Jharkhand', fees: '₹23 L/total', placement: '100%' }
      ]
    };
  }

  if (lowerId.includes('mbbs') || lowerId.includes('dental') || lowerId.includes('pharm')) {
    return {
      ...defaultData,
      degree: 'Bachelors / Medical',
      duration: '4.5 - 5.5 Years',
      icon: Target,
      color: 'from-emerald-600 to-teal-600',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1920&q=80',
      stats: { avgFees: '₹5 L - ₹20 L / yr', startingSalary: '₹8 - ₹18 LPA', topRoles: 'Doctor, Surgeon', growth: '+18% YoY' },
      subjects: [
        { name: 'Human Anatomy', desc: 'Detailed study of the structure of the human body.' },
        { name: 'Physiology', desc: 'Functions and mechanisms of living systems.' },
        { name: 'Pharmacology', desc: 'Study of drugs, their uses, and side effects.' },
        { name: 'Pathology', desc: 'Causes and effects of diseases.' }
      ],
      careers: [
        { role: 'General Physician', salary: '₹12 LPA', demand: 'Very High' },
        { role: 'Surgeon', salary: '₹24 LPA', demand: 'Extremely High' },
        { role: 'Clinical Researcher', salary: '₹10 LPA', demand: 'Moderate' }
      ],
      topColleges: [
        { id: 'aiims-delhi', name: 'AIIMS Delhi', location: 'New Delhi, Delhi', fees: '₹6k/yr', placement: '100%' },
        { id: 'cmc-vellore', name: 'CMC Vellore', location: 'Vellore, Tamil Nadu', fees: '₹1.5 L/yr', placement: '100%' },
        { id: 'afmc-pune', name: 'AFMC Pune', location: 'Pune, Maharashtra', fees: 'N/A', placement: '100%' }
      ]
    };
  }

  if (lowerId.includes('law') || lowerId.includes('justice') || lowerId.includes('ll.b') || lowerId.includes('ll.m')) {
    return {
      ...defaultData,
      degree: 'LL.B / LL.M',
      duration: '3 - 5 Years',
      icon: Scale,
      color: 'from-amber-600 to-orange-600',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1920&q=80',
      stats: { avgFees: '₹1.5 L - ₹3.5 L / yr', startingSalary: '₹6 - ₹15 LPA', topRoles: 'Lawyer, Legal Advisor', growth: '+12% YoY' },
      subjects: [
        { name: 'Constitutional Law', desc: 'Study of the fundamental laws and principles of the state.' },
        { name: 'Corporate Law', desc: 'Rules, practices, and regulations governing corporations.' },
        { name: 'Criminal Law', desc: 'Laws concerning crimes and their punishments.' },
        { name: 'Cyber Law', desc: 'Legal issues related to use of communications technology.' }
      ],
      careers: [
        { role: 'Corporate Lawyer', salary: '₹15 LPA', demand: 'Very High' },
        { role: 'Litigation Lawyer', salary: '₹8 LPA', demand: 'Moderate' },
        { role: 'Legal Advisor', salary: '₹12 LPA', demand: 'High' }
      ],
      topColleges: [
        { id: 'nlsiu-bangalore', name: 'NLSIU Bangalore', location: 'Bangalore, Karnataka', fees: '₹3 L/yr', placement: '100%' },
        { id: 'nlu-delhi', name: 'NLU Delhi', location: 'New Delhi, Delhi', fees: '₹1.8 L/yr', placement: '98%' },
        { id: 'nalsar-hyderabad', name: 'NALSAR Hyderabad', location: 'Hyderabad, Telangana', fees: '₹2.5 L/yr', placement: '99%' }
      ]
    };
  }

  if (lowerId.includes('design') || lowerId.includes('fashion') || lowerId.includes('ui') || lowerId.includes('graphic')) {
    return {
      ...defaultData,
      degree: 'B.Des / M.Des',
      duration: '4 Years',
      icon: Palette,
      color: 'from-pink-600 to-rose-600',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1920&q=80',
      stats: { avgFees: '₹2 L - ₹4 L / yr', startingSalary: '₹6 - ₹12 LPA', topRoles: 'UI/UX Designer, Art Director', growth: '+25% YoY' },
      subjects: [
        { name: 'Visual Design', desc: 'Principles of layout, typography, and color theory.' },
        { name: 'Human-Computer Interaction', desc: 'Studying how users interact with digital interfaces.' },
        { name: 'Prototyping & Wireframing', desc: 'Figma, Adobe XD, and translating ideas to screens.' },
        { name: 'Design Thinking', desc: 'Solving complex problems through user-centric approaches.' }
      ],
      careers: [
        { role: 'Product Designer (UI/UX)', salary: '₹14 LPA', demand: 'Extremely High' },
        { role: 'Graphic Designer', salary: '₹6 LPA', demand: 'Moderate' },
        { role: 'Art Director', salary: '₹18 LPA', demand: 'High' }
      ],
      topColleges: [
        { id: 'nid-ahmedabad', name: 'NID Ahmedabad', location: 'Ahmedabad, Gujarat', fees: '₹3.5 L/yr', placement: '95%' },
        { id: 'nift-delhi', name: 'NIFT Delhi', location: 'New Delhi, Delhi', fees: '₹2.8 L/yr', placement: '90%' },
        { id: 'iit-bombay-idc', name: 'IDC IIT Bombay', location: 'Mumbai, Maharashtra', fees: '₹2.2 L/yr', placement: '98%' }
      ]
    };
  }

  if (lowerId.includes('commerce') || lowerId.includes('accountancy') || lowerId.includes('b.com')) {
    return {
      ...defaultData,
      degree: 'B.Com / CA',
      duration: '3 - 5 Years',
      icon: BarChart3,
      color: 'from-cyan-600 to-blue-600',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1920&q=80',
      stats: { avgFees: '₹20k - ₹1.5 L / yr', startingSalary: '₹4 - ₹10 LPA', topRoles: 'Auditor, Financial Analyst', growth: '+10% YoY' },
      subjects: [
        { name: 'Financial Accounting', desc: 'Recording, summarizing, and reporting corporate transactions.' },
        { name: 'Taxation Law', desc: 'Income tax, GST, and corporate tax regulations.' },
        { name: 'Auditing', desc: 'Verifying financial statements and ensuring compliance.' },
        { name: 'Business Economics', desc: 'Macro and microeconomic principles affecting markets.' }
      ],
      careers: [
        { role: 'Chartered Accountant', salary: '₹12 LPA', demand: 'Extremely High' },
        { role: 'Financial Analyst', salary: '₹7 LPA', demand: 'High' },
        { role: 'Auditor', salary: '₹8 LPA', demand: 'High' }
      ],
      topColleges: [
        { id: 'srcc-delhi', name: 'SRCC Delhi', location: 'New Delhi, Delhi', fees: '₹30k/yr', placement: '95%' },
        { id: 'lsr-delhi', name: 'Lady Shri Ram College', location: 'New Delhi, Delhi', fees: '₹20k/yr', placement: '90%' },
        { id: 'loyola-chennai', name: 'Loyola College', location: 'Chennai, Tamil Nadu', fees: '₹15k/yr', placement: '85%' }
      ]
    };
  }

  if (lowerId.includes('abroad') || lowerId.includes('ms')) {
    return {
      ...defaultData,
      degree: 'MS / Global Bachelors',
      duration: '1.5 - 4 Years',
      icon: Globe2,
      color: 'from-indigo-600 to-purple-600',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',
      stats: { avgFees: '$30k - $60k / yr', startingSalary: '$80k - $130k', topRoles: 'Global Engineer, Analyst', growth: '+20% YoY' },
      subjects: [
        { name: 'Advanced Algorithms', desc: 'Solving highly complex computational problems.' },
        { name: 'Global Supply Chain', desc: 'International logistics, operations, and trade.' },
        { name: 'Cross-cultural Management', desc: 'Leading diverse teams in multinational corporations.' },
        { name: 'Quantitative Finance', desc: 'Mathematical modeling of global financial markets.' }
      ],
      careers: [
        { role: 'Software Engineer (US/UK)', salary: '$120k', demand: 'Extremely High' },
        { role: 'Data Analyst (Global)', salary: '$90k', demand: 'High' },
        { role: 'Product Manager', salary: '$130k', demand: 'Very High' }
      ],
      topColleges: [
        { id: 'mit-usa', name: 'MIT', location: 'Cambridge, USA', fees: '$55k/yr', placement: '100%' },
        { id: 'stanford-usa', name: 'Stanford University', location: 'Stanford, USA', fees: '$57k/yr', placement: '99%' },
        { id: 'oxford-uk', name: 'University of Oxford', location: 'Oxford, UK', fees: '£30k/yr', placement: '98%' }
      ]
    };
  }

  return defaultData;
};

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = getMockCourseData(courseId);
  const Icon = course.icon;
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-200 selection:text-brand-900">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="bg-slate-900 border-b border-white/10 pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-slate-400 gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">Courses</span>
            <ChevronRight size={14} />
            <span className="text-brand-400 font-medium">{course.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={course.image} 
            alt={course.name} 
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white shadow-2xl flex-shrink-0`}>
              <Icon size={48} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20">
                  {course.degree}
                </span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20 flex items-center gap-1">
                  <Clock size={12} /> {course.duration}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
                {course.name}
              </h1>
              <p className="text-lg text-slate-300 max-w-3xl font-medium leading-relaxed mb-8">
                {course.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-slate-100">
            <div className="px-4 text-center">
              <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center justify-center gap-1.5"><DollarSign size={16} className="text-brand-500"/> Avg Fees</p>
              <h3 className="text-xl font-black text-slate-900">{course.stats.avgFees}</h3>
            </div>
            <div className="px-4 text-center">
              <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center justify-center gap-1.5"><TrendingUp size={16} className="text-green-500"/> Starting Salary</p>
              <h3 className="text-xl font-black text-slate-900">{course.stats.startingSalary}</h3>
            </div>
            <div className="px-4 text-center hidden md:block">
              <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center justify-center gap-1.5"><Briefcase size={16} className="text-purple-500"/> Top Roles</p>
              <h3 className="text-xl font-black text-slate-900">{course.stats.topRoles}</h3>
            </div>
            <div className="px-4 text-center hidden md:block">
              <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center justify-center gap-1.5"><Award size={16} className="text-blue-500"/> Industry Growth</p>
              <h3 className="text-xl font-black text-slate-900">{course.stats.growth}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-16">
            
            {/* Curriculum Highlights */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                  <BookOpen size={20} />
                </div>
                <h2 className="text-3xl font-black text-slate-900">Curriculum Highlights</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.subjects.map((sub, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-brand-300 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0 border border-brand-100">
                        <ChevronRight size={14} strokeWidth={3} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{sub.name}</h3>
                    </div>
                    <p className="text-sm text-slate-500 font-medium pl-10">{sub.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Career Opportunities */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <TrendingUp size={20} />
                </div>
                <h2 className="text-3xl font-black text-slate-900">Career Opportunities</h2>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-4 px-6 font-bold text-slate-800">Job Role</th>
                      <th className="py-4 px-6 font-bold text-slate-800">Expected Salary</th>
                      <th className="py-4 px-6 font-bold text-slate-800 text-right">Market Demand</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {course.careers.map((career, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-900">{career.role}</td>
                        <td className="py-4 px-6 font-semibold text-brand-600">{career.salary}</td>
                        <td className="py-4 px-6 text-right">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
                            {career.demand}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Colleges */}
            <div id="colleges" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Building2 size={20} />
                </div>
                <h2 className="text-3xl font-black text-slate-900">Top Colleges for {course.name}</h2>
              </div>

              <div className="space-y-4">
                {course.topColleges.map((college, i) => (
                  <Link to={`/colleges/${college.id}`} key={i} className="block bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 hover:shadow-xl hover:border-brand-300 transition-all group">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                           <Building2 className="text-slate-400 group-hover:text-brand-500 transition-colors" size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{college.name}</h3>
                          <p className="text-sm text-slate-500 font-medium flex items-center gap-1 mt-1">
                             <MapPin size={14} /> {college.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end gap-4 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-0 border-slate-100">
                        <div className="text-left sm:text-right flex-1 sm:flex-none">
                          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Average Fees</p>
                          <p className="font-bold text-slate-900">{college.fees}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                            <TrendingUp size={12} /> {college.placement} Placed
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            {/* Quick Enquiry Widget */}
            <div className="sticky top-24 bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 p-6 sm:p-8 overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-500 to-purple-500"></div>
              <h3 className="text-xl font-black text-slate-900 mb-2 mt-2">Interested in {course.name}?</h3>
              <p className="text-sm text-slate-500 mb-6 font-medium">Get free admission guidance from our academic experts.</p>
              
              <button onClick={() => setIsApplyOpen(true)} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 mt-4 hover:-translate-y-1">
                <Send size={18} /> Get Free Counselling
              </button>
              
              <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1.5">
                <CheckCircle size={14} className="text-green-500" /> 100% Free & Secure
              </p>
            </div>
          </div>

        </div>
      </section>

      <CounsellingCTA />
      <Footer />

      <CounsellingModal 
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />
    </div>
  );
}
