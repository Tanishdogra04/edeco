import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, User, Phone, Mail, Award, BadgeCheck, ChevronRight, ChevronLeft, ArrowRight, Star } from 'lucide-react';
import { api } from '../utils/api';
import { useToast } from '../context/ToastContext';

export default function CounsellingModal({ isOpen, onClose, initialData }) {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    stream: '',
    education: '',
    year: '2026',
    exam: '',
    score: '',
    query: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      if (initialData) {
        setFormData(prev => ({
          ...prev,
          name: prev.name,
          phone: prev.phone,
          email: prev.email,
          stream: initialData.stream || prev.stream,
          query: initialData.query || prev.query
        }));
      }
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        stream: '',
        education: '',
        year: '2026',
        exam: '',
        score: '',
        query: ''
      });
      setStep(1);
    }
  }

  const streams = ["Engineering", "MBA / Management", "Medical Science", "Law & Legal Studies", "Design / Architecture", "Commerce / CA"];
  const educationLevels = ["Class 12th (Studying)", "Class 12th (Completed)", "Graduation (Studying)", "Graduation (Completed)"];
  const exams = ["JEE Main", "NEET UG", "CAT / XAT", "CUET", "CLAT", "Other / None"];

  const handleInputChange = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.email) {
        toast.warning("Please fill all contact fields");
        return;
      }
    }
    if (step === 2) {
      if (!formData.stream || !formData.education) {
        toast.warning("Please select your stream and education level");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await api.counselling.submit(formData);
      if (data.success) {
        setIsSuccess(true);
      } else {
        toast.error(data.error || 'Failed to submit counseling request. Please try again.');
      }
    } catch (err) {
      toast.error(err.message || 'An error occurred during submission.');
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

        {/* Modal container */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl relative z-10 overflow-hidden flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#0f71cd]/5 text-[#0f71cd]">
                <Sparkles size={18} className="animate-spin-slow" />
              </div>
              <span className="font-tt-talent font-bold text-slate-800 text-base" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                {initialData && initialData.courseName ? `Apply for ${initialData.courseName}` : 'Free Admissions Counselling'}
              </span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <X size={20} />
            </button>
          </div>

          {/* Form / Success states */}
          <div className="p-6">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Step indicator bar */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-6 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                  <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#0f71cd]' : ''}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                      step >= 1 ? 'bg-[#0f71cd] text-white border-[#0f71cd]' : 'border-slate-200'
                    }`}>1</span>
                    <span>Contact</span>
                  </div>
                  <div className="h-[2px] bg-slate-100 flex-1 mx-3"></div>
                  <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#0f71cd]' : ''}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                      step >= 2 ? 'bg-[#0f71cd] text-white border-[#0f71cd]' : 'border-slate-200'
                    }`}>2</span>
                    <span>Interest</span>
                  </div>
                  <div className="h-[2px] bg-slate-100 flex-1 mx-3"></div>
                  <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#0f71cd]' : ''}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                      step >= 3 ? 'bg-[#0f71cd] text-white border-[#0f71cd]' : 'border-slate-200'
                    }`}>3</span>
                    <span>Goals</span>
                  </div>
                </div>

                {/* Step 1 Content: Basic Info */}
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="text-left">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Your Full Name *</label>
                      <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl mt-1.5 focus-within:border-[#0f71cd]/50 transition-all">
                        <User size={16} className="text-slate-400" />
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="e.g. Tanish Dogra"
                          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400 font-medium"
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Phone Number (WhatsApp Preferred) *</label>
                      <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl mt-1.5 focus-within:border-[#0f71cd]/50 transition-all">
                        <Phone size={16} className="text-slate-400" />
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400 font-medium"
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address *</label>
                      <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl mt-1.5 focus-within:border-[#0f71cd]/50 transition-all">
                        <Mail size={16} className="text-slate-400" />
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="e.g. tanish@example.com"
                          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400 font-medium"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2 Content: Stream Preference */}
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 text-left"
                  >
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Preferred Study Stream *</label>
                      <div className="grid grid-cols-2 gap-2 mt-1.5">
                        {streams.map((s, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleInputChange('stream', s)}
                            className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                              formData.stream === s
                                ? 'bg-[#0f71cd]/5 border-[#0f71cd] text-[#0f71cd]'
                                : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100/50'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Current Education Level *</label>
                      <div className="grid grid-cols-2 gap-2 mt-1.5">
                        {educationLevels.map((el, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleInputChange('education', el)}
                            className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                              formData.education === el
                                ? 'bg-[#0f71cd]/5 border-[#0f71cd] text-[#0f71cd]'
                                : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100/50'
                            }`}
                          >
                            {el}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Target Admission Year</label>
                      <div className="flex gap-4 mt-1.5">
                        {["2026", "2027"].map((yr) => (
                          <label key={yr} className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-600">
                            <input 
                              type="radio" 
                              name="targetYear"
                              value={yr}
                              checked={formData.year === yr}
                              onChange={() => handleInputChange('year', yr)}
                              className="w-4 h-4 text-[#0f71cd] focus:ring-[#0f71cd]"
                            />
                            <span>Class of {yr}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3 Content: Score details */}
                {step === 3 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 text-left"
                  >
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Entrance Exam Taken / Targeting</label>
                      <div className="grid grid-cols-3 gap-2 mt-1.5">
                        {exams.map((ex, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleInputChange('exam', ex)}
                            className={`p-2.5 rounded-xl border text-[11px] font-bold text-center transition-all cursor-pointer ${
                              formData.exam === ex
                                ? 'bg-[#0f71cd]/5 border-[#0f71cd] text-[#0f71cd]'
                                : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100/50'
                            }`}
                          >
                            {ex}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Approx Score / Percentile / Rank (Optional)</label>
                      <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl mt-1.5 focus-within:border-[#0f71cd]/50 transition-all">
                        <Award size={16} className="text-slate-400" />
                        <input 
                          type="text" 
                          value={formData.score}
                          onChange={(e) => handleInputChange('score', e.target.value)}
                          placeholder="e.g. 98.4 Percentile or 120 Marks"
                          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Any specific queries or target colleges?</label>
                      <textarea 
                        rows={2}
                        value={formData.query}
                        onChange={(e) => handleInputChange('query', e.target.value)}
                        placeholder="e.g. Looking for IIT Bombay CSE placements or bits pilani fees query..."
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl mt-1.5 focus:border-[#0f71cd]/50 outline-none text-sm text-slate-800 placeholder-slate-400 font-medium resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-6">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 py-2 cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-[#0f71cd] hover:bg-[#0c62b2] text-white text-xs font-bold transition-all duration-300 shadow-md cursor-pointer font-tt-talent"
                      style={{ fontFamily: '"TT Talent", sans-serif' }}
                    >
                      Continue
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-1.5 px-8 py-3 rounded-xl bg-[#0f71cd] hover:bg-[#0c62b2] text-white text-xs font-bold shadow-md transition-all duration-300 cursor-pointer disabled:opacity-50 font-tt-talent"
                      style={{ fontFamily: '"TT Talent", sans-serif' }}
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>{initialData && initialData.courseName ? 'Submit Application' : 'Submit Request'}</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>

              </form>
            ) : (
              // SUCCESS SCREEN
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#0f71cd]/5 text-[#0f71cd] flex items-center justify-center mx-auto border border-[#0f71cd]/10 shadow-md">
                  <BadgeCheck size={36} className="animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-tt-talent font-bold text-2xl text-slate-800 tracking-tight" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    {initialData && initialData.courseName ? 'Application Submitted!' : 'Booking Successful!'}
                  </h3>
                  <p className="text-[13px] text-slate-400 font-medium px-4">
                    {initialData && initialData.courseName 
                      ? <>Thank you <strong className="text-slate-600 font-bold">{formData.name}</strong>. Your application for {initialData.courseName} at {initialData.collegeName || 'the college'} has been received. We will contact you shortly.</>
                      : <>Thank you <strong className="text-slate-600 font-bold">{formData.name}</strong>. An admissions counselor matches with your profile shortly.</>
                    }
                  </p>
                </div>

                {/* Simulated Matching Card */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 text-left max-w-sm mx-auto space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-[#0f71cd]/10 flex items-center justify-center text-xs font-bold text-[#0f71cd]">
                        AM
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#0f71cd] rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Assigning Counselor...</p>
                      <span className="text-[10px] text-slate-400 font-medium">Matching stream: {formData.stream}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[11px] text-[#0f71cd] font-bold">
                    <Star size={12} fill="currentColor" className="text-yellow-400" />
                    <span>Avg rating 4.9 • WhatsApp callback in 10 mins</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => { setIsSuccess(false); setStep(1); onClose(); }}
                    className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
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
