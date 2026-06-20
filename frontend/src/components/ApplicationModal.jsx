import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Phone, Mail, GraduationCap, Award, 
  FileText, ShieldCheck, CheckCircle2, ChevronRight, 
  BookOpen, Sparkles, Building2
} from 'lucide-react';
import { api } from '../utils/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export default function ApplicationModal({ isOpen, onClose, initialData }) {
  const toast = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    courseName: '',
    education: 'Class 12th (Completed)',
    marks12th: '',
    entranceExam: '',
    entranceScore: '',
    statementOfPurpose: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setFormData({
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || '',
        courseName: initialData?.courseName || '',
        education: 'Class 12th (Completed)',
        marks12th: '',
        entranceExam: initialData?.stream?.includes('Med') ? 'NEET UG' : initialData?.stream?.includes('Eng') ? 'JEE Main' : '',
        entranceScore: '',
        statementOfPurpose: ''
      });
      setIsSuccess(false);
    }
  }

  const handleInputChange = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      toast.warning("Please fill in all contact details.");
      return;
    }

    if (!formData.courseName) {
      toast.warning("Please select or enter the course you are applying for.");
      return;
    }

    setIsSubmitting(true);
    try {
      const compositeQuery = `[COLLEGE APPLICATION]
Course Applied: ${formData.courseName}
Education: ${formData.education}
12th / Grad Marks: ${formData.marks12th || 'N/A'}
Entrance Exam: ${formData.entranceExam || 'None'}
Entrance Score: ${formData.entranceScore || 'N/A'}
Statement of Purpose: ${formData.statementOfPurpose || 'None'}`;

      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        stream: initialData?.stream || '',
        education: formData.education,
        exam: formData.entranceExam || 'Other',
        score: formData.entranceScore || 'N/A',
        query: compositeQuery
      };

      const response = await api.counselling.submit(payload);
      if (response.success) {
        const mockId = 'APP-' + Math.floor(100000 + Math.random() * 900000);
        setApplicationId(mockId);
        setIsSuccess(true);
        toast.success("Application submitted successfully!");
      } else {
        toast.error(response.error || "Failed to submit application");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row min-h-[500px]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors z-20 cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Left Sidebar Info Card */}
          <div className="md:w-1/3 bg-[#0F141E] text-white p-8 flex flex-col justify-between relative text-left border-r border-slate-800">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0f71cd]/10 flex items-center justify-center text-[#0f71cd] border border-[#0f71cd]/20">
                <Building2 size={24} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f71cd] bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                  Direct Admission
                </span>
                <h3 className="text-2xl font-bold mt-4 leading-tight font-tt-talent text-white" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                  {initialData?.collegeName || 'Institution Application'}
                </h3>
                <p className="text-sm text-slate-400 mt-2 font-semibold leading-relaxed">
                  Official Admission form for the Academic Session 2026-2027.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-12 md:mt-0 pt-6 border-t border-slate-800 space-y-4">
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                <ShieldCheck size={16} className="text-[#0f71cd]" />
                <span>Verified Admissions Partner</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                <BookOpen size={16} className="text-[#0f71cd]" />
                <span>Selectable Course Specializations</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Form fields */}
          <div className="flex-1 p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div>
                  <h2 className="text-2xl font-bold text-[#0F141E] tracking-tight font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    Course Application Form
                  </h2>
                  <p className="text-slate-500 text-sm font-semibold mt-1">
                    Please provide your authentic details for evaluation by the admissions committee.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name *</label>
                    <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#0f71cd] focus-within:bg-white transition-all">
                      <User size={16} className="text-slate-400" />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="e.g. Tanish Dogra"
                        className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400 font-semibold"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Mobile Number *</label>
                    <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#0f71cd] focus-within:bg-white transition-all">
                      <Phone size={16} className="text-slate-400" />
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400 font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address *</label>
                    <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#0f71cd] focus-within:bg-white transition-all">
                      <Mail size={16} className="text-slate-400" />
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="e.g. tanish@example.com"
                        className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400 font-semibold"
                      />
                    </div>
                  </div>

                  {/* Target Course (Universal Dropdown vs Dedicated Input) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Applying For Course *</label>
                    {initialData?.courseName ? (
                      // Dedicated (Read-Only)
                      <div className="flex items-center gap-2.5 p-3.5 bg-slate-100 border border-slate-200 rounded-xl transition-all">
                        <GraduationCap size={16} className="text-slate-400" />
                        <input 
                          type="text" 
                          readOnly
                          value={formData.courseName}
                          className="w-full bg-transparent text-sm text-slate-600 outline-none font-bold cursor-not-allowed"
                        />
                      </div>
                    ) : (
                      // Universal (Dropdown List of college courses)
                      <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#0f71cd] focus-within:bg-white transition-all relative">
                        <GraduationCap size={16} className="text-slate-400" />
                        <select
                          required
                          value={formData.courseName}
                          onChange={(e) => handleInputChange('courseName', e.target.value)}
                          className="w-full bg-transparent text-sm text-slate-800 outline-none font-semibold cursor-pointer appearance-none pr-8 text-left"
                        >
                          <option value="" disabled>Select a Course</option>
                          {initialData?.courses && initialData.courses.length > 0 ? (
                            initialData.courses.map((c, idx) => (
                              <option key={idx} value={c.name}>{c.name} ({c.duration})</option>
                            ))
                          ) : (
                            <>
                              <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                              <option value="MBBS">MBBS</option>
                              <option value="MBA General">MBA General</option>
                              <option value="BA LLB">BA LLB</option>
                              <option value="B.Des Industrial Design">B.Des Industrial Design</option>
                            </>
                          )}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Academic Qualifications properly arranged with verified styling */}
                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <h3 className="text-sm font-bold text-[#0F141E] uppercase tracking-wider flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    <Award size={18} className="text-[#0f71cd]" /> Academic Qualifications
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Education Level */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Current Education Level</label>
                      <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#0f71cd] focus-within:bg-white transition-all relative">
                        <GraduationCap size={16} className="text-slate-400" />
                        <select
                          value={formData.education}
                          onChange={(e) => handleInputChange('education', e.target.value)}
                          className="w-full bg-transparent text-sm text-slate-800 outline-none font-semibold cursor-pointer appearance-none pr-8 text-left"
                        >
                          <option>Class 12th (Studying)</option>
                          <option>Class 12th (Completed)</option>
                          <option>Graduation (Studying)</option>
                          <option>Graduation (Completed)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                      </div>
                    </div>

                    {/* Marks/Percentage */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Academic Score (12th / Graduation %)</label>
                      <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#0f71cd] focus-within:bg-white transition-all">
                        <FileText size={16} className="text-slate-400" />
                        <input 
                          type="text"
                          value={formData.marks12th}
                          onChange={(e) => handleInputChange('marks12th', e.target.value)}
                          placeholder="e.g. 92% or 9.1 CGPA"
                          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400 font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Entrance Exam Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Entrance Exam</label>
                      <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#0f71cd] focus-within:bg-white transition-all relative">
                        <BookOpen size={16} className="text-slate-400" />
                        <select
                          value={formData.entranceExam}
                          onChange={(e) => handleInputChange('entranceExam', e.target.value)}
                          className="w-full bg-transparent text-sm text-slate-800 outline-none font-semibold cursor-pointer appearance-none pr-8 text-left"
                        >
                          <option value="">None / Other</option>
                          <option value="JEE Main">JEE Main</option>
                          <option value="JEE Advanced">JEE Advanced</option>
                          <option value="NEET UG">NEET UG</option>
                          <option value="CAT">CAT</option>
                          <option value="XAT">XAT</option>
                          <option value="CLAT">CLAT</option>
                          <option value="NID DAT">NID DAT</option>
                          <option value="NIFT Entrance">NIFT Entrance</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                      </div>
                    </div>

                    {/* Entrance Score */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Entrance Score / Percentile</label>
                      <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#0f71cd] focus-within:bg-white transition-all">
                        <Award size={16} className="text-slate-400" />
                        <input 
                          type="text"
                          value={formData.entranceScore}
                          onChange={(e) => handleInputChange('entranceScore', e.target.value)}
                          placeholder="e.g. 98.6 Percentile or 650 Marks"
                          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400 font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statement of Interest */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Statement of Purpose / Additional Query (Optional)</label>
                  <textarea 
                    rows={3}
                    value={formData.statementOfPurpose}
                    onChange={(e) => handleInputChange('statementOfPurpose', e.target.value)}
                    placeholder="Briefly describe your academic interest or ask any specific questions about placement and fees..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm text-slate-800 placeholder-slate-400 font-medium resize-none focus:border-[#0f71cd] focus:bg-white transition-all"
                  />
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-500" /> Secure application dashboard
                  </span>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-xl bg-[#0f71cd] hover:bg-[#0c62b2] text-white text-xs font-bold shadow-md transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center gap-2 uppercase tracking-wider font-tt-talent"
                    style={{ fontFamily: '"TT Talent", sans-serif' }}
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ChevronRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              // SUCCESS / CONFIRMATION STATE
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8 space-y-6 text-slate-800"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-md">
                  <CheckCircle2 size={36} className="animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-tt-talent font-bold text-2xl text-[#0F141E]" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    Application Submitted!
                  </h3>
                  <p className="text-slate-500 text-sm font-semibold px-8 leading-relaxed">
                    Thank you <strong className="text-slate-700 font-bold">{formData.name}</strong>. Your academic application has been successfully logged with our team.
                  </p>
                </div>

                {/* Application Ticket Details */}
                <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 max-w-md mx-auto text-left space-y-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#0f71cd]/5 rounded-full blur-xl pointer-events-none"></div>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200/60 text-left">
                    <span className="text-xs font-bold text-slate-400 uppercase">Application ID</span>
                    <span className="text-sm font-bold text-[#0f71cd] tracking-wide font-tt-talent text-right" style={{ fontFamily: '"TT Talent", sans-serif' }}>{applicationId}</span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex justify-between text-xs font-medium text-left">
                      <span className="text-slate-400">College:</span>
                      <span className="text-slate-800 font-bold text-right">{initialData?.collegeName || 'Selected College'}</span>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-left">
                      <span className="text-slate-400">Course:</span>
                      <span className="text-slate-800 font-bold text-right">{formData.courseName}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-medium text-left">
                      <span className="text-slate-400">Status:</span>
                      <span className="px-2.5 py-0.5 bg-blue-50 text-[#0f71cd] border border-blue-100 rounded-md font-bold text-[10px] uppercase">
                        Under Review
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-semibold max-w-sm mx-auto leading-relaxed">
                  Admissions officers are reviewing your academic file. We will notify you on your mobile (<strong className="text-slate-600 font-bold">{formData.phone}</strong>) shortly.
                </p>

                <div className="pt-6">
                  <button 
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-650 font-bold text-xs hover:bg-slate-50 cursor-pointer shadow-sm font-tt-talent"
                    style={{ fontFamily: '"TT Talent", sans-serif' }}
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
