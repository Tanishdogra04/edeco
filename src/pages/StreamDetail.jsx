import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Laptop, Briefcase, HeartPulse, Scale, 
  Palette, BarChart3, Globe2, ArrowRight,
  TrendingUp, Building2, Award, ChevronRight,
  CheckCircle, Sparkles, Send, Target, Users, BookOpen, MapPin
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CounsellingCTA from '../components/CounsellingCTA';
import CounsellingModal from '../components/CounsellingModal';

// Dynamic mock data generator
const getMockStreamData = (id) => {
  const defaultData = {
    id: id || 'engineering',
    name: 'Engineering',
    title: 'Shape the Future with Engineering',
    description: 'Explore top B.Tech and M.Tech colleges, compare fees, check placement records, and find your dream engineering specialization.',
    icon: Laptop,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80',
    stats: {
      avgPackage: '₹6 - ₹12 LPA',
      highestPackage: '₹50+ LPA',
      topExam: 'JEE Main',
      totalColleges: '1,200+'
    },
    specializations: [
      { name: 'Computer Science', demand: 'Very High', color: 'from-blue-500 to-indigo-500' },
      { name: 'Mechanical Engineering', demand: 'High', color: 'from-amber-500 to-orange-500' },
      { name: 'Electronics & Comm.', demand: 'High', color: 'from-purple-500 to-pink-500' },
      { name: 'Civil Engineering', demand: 'Moderate', color: 'from-emerald-500 to-teal-500' },
      { name: 'Artificial Intelligence', demand: 'Extremely High', color: 'from-rose-500 to-red-500' },
      { name: 'Data Science', demand: 'Extremely High', color: 'from-cyan-500 to-blue-500' }
    ],
    topColleges: [
      { id: 'iit-bombay', name: 'IIT Bombay', location: 'Mumbai, Maharashtra', fees: '₹2.5 L/yr', placement: '100%' },
      { id: 'iit-delhi', name: 'IIT Delhi', location: 'New Delhi, Delhi', fees: '₹2.4 L/yr', placement: '98%' },
      { id: 'bits-pilani', name: 'BITS Pilani', location: 'Pilani, Rajasthan', fees: '₹5.5 L/yr', placement: '99%' },
      { id: 'nit-trichy', name: 'NIT Trichy', location: 'Trichy, Tamil Nadu', fees: '₹2.1 L/yr', placement: '96%' }
    ],
    recruiters: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'L&T', 'Mahindra']
  };

  const lowerId = id?.toLowerCase() || '';
  
  if (lowerId.includes('mba') || lowerId.includes('business')) {
    return {
      ...defaultData,
      id,
      name: 'MBA / Business',
      title: 'Accelerate Your Career with an MBA',
      description: 'Discover premium B-Schools, compare specializations like Finance and Marketing, and unlock global leadership opportunities.',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80',
      stats: { avgPackage: '₹8 - ₹20 LPA', highestPackage: '₹60+ LPA', topExam: 'CAT', totalColleges: '850+' },
      specializations: [
        { name: 'Finance', demand: 'Very High', color: 'from-blue-500 to-indigo-500' },
        { name: 'Marketing', demand: 'High', color: 'from-purple-500 to-pink-500' },
        { name: 'Human Resources', demand: 'Moderate', color: 'from-amber-500 to-orange-500' },
        { name: 'Business Analytics', demand: 'Extremely High', color: 'from-emerald-500 to-teal-500' }
      ],
      topColleges: [
        { id: 'iima', name: 'IIM Ahmedabad', location: 'Ahmedabad, Gujarat', fees: '₹25 L/total', placement: '100%' },
        { id: 'iimb', name: 'IIM Bangalore', location: 'Bangalore, Karnataka', fees: '₹24 L/total', placement: '100%' },
        { id: 'isb', name: 'ISB Hyderabad', location: 'Hyderabad, Telangana', fees: '₹35 L/total', placement: '99%' }
      ],
      recruiters: ['McKinsey', 'BCG', 'Bain', 'Goldman Sachs', 'Morgan Stanley', 'HUL', 'P&G']
    };
  }

  if (lowerId.includes('medical')) {
    return {
      ...defaultData,
      id,
      name: 'Medical Science',
      title: 'Serve Humanity with Medical Sciences',
      description: 'Find top MBBS and BDS colleges, explore medical specializations, and start your journey towards saving lives.',
      icon: HeartPulse,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80',
      stats: { avgPackage: '₹7 - ₹15 LPA', highestPackage: '₹30+ LPA', topExam: 'NEET', totalColleges: '450+' },
      specializations: [
        { name: 'MBBS', demand: 'Extremely High', color: 'from-blue-500 to-indigo-500' },
        { name: 'BDS (Dental)', demand: 'High', color: 'from-purple-500 to-pink-500' },
        { name: 'B.Pharm', demand: 'High', color: 'from-amber-500 to-orange-500' },
        { name: 'Nursing', demand: 'Very High', color: 'from-emerald-500 to-teal-500' }
      ],
      topColleges: [
        { id: 'aiims-delhi', name: 'AIIMS Delhi', location: 'New Delhi, Delhi', fees: '₹6k/yr', placement: '100%' },
        { id: 'cmc-vellore', name: 'CMC Vellore', location: 'Vellore, Tamil Nadu', fees: '₹1.5 L/yr', placement: '100%' },
        { id: 'afmc-pune', name: 'AFMC Pune', location: 'Pune, Maharashtra', fees: 'N/A', placement: '100%' }
      ],
      recruiters: ['Apollo Hospitals', 'Fortis', 'Max Healthcare', 'Sun Pharma', 'Cipla']
    };
  }

  if (lowerId.includes('law') || lowerId.includes('justice')) {
    return {
      ...defaultData,
      id,
      name: 'Law & Justice',
      title: 'Uphold the Truth with a Career in Law',
      description: 'Explore top national law universities, compare specializations like Corporate Law and Criminal Law, and start your legal journey.',
      icon: Scale,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1920&q=80',
      stats: { avgPackage: '₹5 - ₹15 LPA', highestPackage: '₹35+ LPA', topExam: 'CLAT', totalColleges: '300+' },
      specializations: [
        { name: 'Corporate Law', demand: 'Very High', color: 'from-blue-500 to-indigo-500' },
        { name: 'Criminal Law', demand: 'High', color: 'from-amber-500 to-orange-500' },
        { name: 'Cyber Law', demand: 'Extremely High', color: 'from-purple-500 to-pink-500' },
        { name: 'Civil Law', demand: 'Moderate', color: 'from-emerald-500 to-teal-500' }
      ],
      topColleges: [
        { id: 'nlsiu-bangalore', name: 'NLSIU Bangalore', location: 'Bangalore, Karnataka', fees: '₹3 L/yr', placement: '100%' },
        { id: 'nlu-delhi', name: 'NLU Delhi', location: 'New Delhi, Delhi', fees: '₹1.8 L/yr', placement: '98%' },
        { id: 'nalsar-hyderabad', name: 'NALSAR Hyderabad', location: 'Hyderabad, Telangana', fees: '₹2.5 L/yr', placement: '99%' }
      ],
      recruiters: ['Cyril Amarchand Mangaldas', 'Khaitan & Co', 'Shardul Amarchand', 'Trilegal', 'L&L Partners']
    };
  }

  if (lowerId.includes('design') || lowerId.includes('arts')) {
    return {
      ...defaultData,
      id,
      name: 'Design & Arts',
      title: 'Shape the World with Design',
      description: 'Find top design institutes, explore specializations like UI/UX and Fashion Design, and build a creative portfolio.',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1920&q=80',
      stats: { avgPackage: '₹4 - ₹12 LPA', highestPackage: '₹25+ LPA', topExam: 'NID DAT', totalColleges: '250+' },
      specializations: [
        { name: 'UI/UX Design', demand: 'Extremely High', color: 'from-blue-500 to-indigo-500' },
        { name: 'Fashion Design', demand: 'High', color: 'from-pink-500 to-rose-500' },
        { name: 'Graphic Design', demand: 'High', color: 'from-purple-500 to-pink-500' },
        { name: 'Interior Design', demand: 'Moderate', color: 'from-amber-500 to-orange-500' }
      ],
      topColleges: [
        { id: 'nid-ahmedabad', name: 'NID Ahmedabad', location: 'Ahmedabad, Gujarat', fees: '₹3.5 L/yr', placement: '95%' },
        { id: 'nift-delhi', name: 'NIFT Delhi', location: 'New Delhi, Delhi', fees: '₹2.8 L/yr', placement: '90%' },
        { id: 'iit-bombay-idc', name: 'IDC IIT Bombay', location: 'Mumbai, Maharashtra', fees: '₹2.2 L/yr', placement: '98%' }
      ],
      recruiters: ['Google', 'Microsoft', 'Myntra', 'Adobe', 'Flipkart', 'TCS Interactive']
    };
  }

  if (lowerId.includes('commerce') || lowerId.includes('finance')) {
    return {
      ...defaultData,
      id,
      name: 'Commerce & Finance',
      title: 'Master the World of Finance',
      description: 'Explore top commerce colleges, specialized degrees, and professional courses like CA and CS.',
      icon: BarChart3,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1920&q=80',
      stats: { avgPackage: '₹4.5 - ₹18 LPA', highestPackage: '₹30+ LPA', topExam: 'CUET', totalColleges: '600+' },
      specializations: [
        { name: 'Chartered Accountancy', demand: 'Extremely High', color: 'from-blue-500 to-indigo-500' },
        { name: 'Investment Banking', demand: 'Very High', color: 'from-emerald-500 to-teal-500' },
        { name: 'Company Secretary', demand: 'High', color: 'from-purple-500 to-pink-500' },
        { name: 'B.Com (Hons)', demand: 'High', color: 'from-amber-500 to-orange-500' }
      ],
      topColleges: [
        { id: 'srcc-delhi', name: 'SRCC Delhi', location: 'New Delhi, Delhi', fees: '₹30k/yr', placement: '95%' },
        { id: 'lsr-delhi', name: 'Lady Shri Ram College', location: 'New Delhi, Delhi', fees: '₹20k/yr', placement: '90%' },
        { id: 'loyola-chennai', name: 'Loyola College', location: 'Chennai, Tamil Nadu', fees: '₹15k/yr', placement: '85%' }
      ],
      recruiters: ['Deloitte', 'EY', 'KPMG', 'PwC', 'Goldman Sachs', 'HDFC Bank']
    };
  }

  if (lowerId.includes('abroad')) {
    return {
      ...defaultData,
      id,
      name: 'Study Abroad',
      title: 'Take Your Career Global',
      description: 'Discover top international universities, compare scholarships, and prepare for global career opportunities.',
      icon: Globe2,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',
      stats: { avgPackage: '$70k - $120k', highestPackage: '$200k+', topExam: 'GRE / IELTS', totalColleges: '300+' },
      specializations: [
        { name: 'MS in Computer Science', demand: 'Extremely High', color: 'from-blue-500 to-indigo-500' },
        { name: 'Global MBA', demand: 'Very High', color: 'from-purple-500 to-pink-500' },
        { name: 'MS in Data Science', demand: 'Extremely High', color: 'from-emerald-500 to-teal-500' },
        { name: 'Masters in Engineering', demand: 'High', color: 'from-amber-500 to-orange-500' }
      ],
      topColleges: [
        { id: 'mit-usa', name: 'MIT', location: 'Cambridge, USA', fees: '$55k/yr', placement: '100%' },
        { id: 'stanford-usa', name: 'Stanford University', location: 'Stanford, USA', fees: '$57k/yr', placement: '99%' },
        { id: 'oxford-uk', name: 'University of Oxford', location: 'Oxford, UK', fees: '£30k/yr', placement: '98%' }
      ],
      recruiters: ['Apple', 'Tesla', 'Meta', 'Amazon', 'McKinsey', 'JP Morgan']
    };
  }

  return defaultData;
};

export default function StreamDetail() {
  const { streamId } = useParams();
  const stream = getMockStreamData(streamId);
  const Icon = stream.icon;
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [streamId]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-200 selection:text-brand-900">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="bg-slate-900 border-b border-white/10 pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-slate-400 gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">Streams</span>
            <ChevronRight size={14} />
            <span className="text-brand-400 font-medium">{stream.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={stream.image} 
            alt={stream.name} 
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
          <div className="absolute inset-0 bg-brand-900/40 mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-brand-400 mb-8 shadow-2xl">
            <Icon size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
            {stream.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
            {stream.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setIsApplyOpen(true)} className="w-full sm:w-auto bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
              <Target size={20} /> Get Free Expert Counselling
            </button>
            <button onClick={() => document.getElementById('colleges').scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-md hover:-translate-y-1">
              <Building2 size={20} /> View Top Colleges
            </button>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-slate-100">
            <div className="px-4 text-center">
              <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center justify-center gap-1.5"><TrendingUp size={16} className="text-green-500"/> Average Salary</p>
              <h3 className="text-2xl font-black text-slate-900">{stream.stats.avgPackage}</h3>
            </div>
            <div className="px-4 text-center">
              <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center justify-center gap-1.5"><Award size={16} className="text-brand-500"/> Highest Package</p>
              <h3 className="text-2xl font-black text-slate-900">{stream.stats.highestPackage}</h3>
            </div>
            <div className="px-4 text-center hidden md:block">
              <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center justify-center gap-1.5"><BookOpen size={16} className="text-purple-500"/> Top Entrance Exam</p>
              <h3 className="text-2xl font-black text-slate-900">{stream.stats.topExam}</h3>
            </div>
            <div className="px-4 text-center hidden md:block">
              <p className="text-sm font-semibold text-slate-500 mb-1 flex items-center justify-center gap-1.5"><Building2 size={16} className="text-blue-500"/> Total Colleges</p>
              <h3 className="text-2xl font-black text-slate-900">{stream.stats.totalColleges}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-16">
            
            {/* Specializations */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                  <Target size={20} />
                </div>
                <h2 className="text-3xl font-black text-slate-900">Top Specializations</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stream.specializations.map((spec, i) => (
                  <Link
                    key={i} 
                    to={`/course/${spec.name.toLowerCase().replace(/[\s&.]+/g, '-')}`}
                    className="block"
                  >
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-brand-300 transition-all group h-full"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${spec.color} text-white flex items-center justify-center shadow-md`}>
                          <Sparkles size={20} />
                        </div>
                        <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-full border border-slate-100 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                          {spec.demand} Demand
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{spec.name}</h3>
                      <p className="text-sm text-slate-500 font-medium">Explore colleges & courses <ArrowRight size={14} className="inline ml-1 group-hover:translate-x-1 transition-transform" /></p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Top Colleges */}
            <div id="colleges" className="scroll-mt-32">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <Building2 size={20} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">Top {stream.name} Colleges</h2>
                </div>
                <Link to="/cities/india" className="text-brand-600 font-bold text-sm hover:text-brand-700 flex items-center gap-1 hidden sm:flex">
                  View All <ArrowRight size={16} />
                </Link>
              </div>

              <div className="space-y-4">
                {stream.topColleges.map((college, i) => (
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
              <Link to="/cities/india" className="sm:hidden mt-6 block text-center bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3 rounded-xl">
                View All Colleges
              </Link>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            
            {/* Top Recruiters Sidebar Widget */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 mb-8">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <Briefcase className="text-brand-500" size={20} /> Top Recruiters
              </h3>
              <div className="flex flex-wrap gap-2">
                {stream.recruiters.map((rec, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors cursor-default">
                    {rec}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Enquiry Widget */}
            <div className="sticky top-24 bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 p-6 sm:p-8 overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-500 to-purple-500"></div>
              <h3 className="text-xl font-black text-slate-900 mb-2 mt-2">Need Guidance?</h3>
              <p className="text-sm text-slate-500 mb-6 font-medium">Our experts will help you choose the right college and specialization.</p>
              
              <button onClick={() => setIsApplyOpen(true)} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 mt-4 hover:-translate-y-1">
                <Send size={18} /> Request Callback
              </button>
              
              <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1.5">
                <CheckCircle size={14} className="text-green-500" /> 100% Free Counselling
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
