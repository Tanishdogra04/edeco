import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, User, Phone, Mail, Award, BadgeCheck, ChevronRight, ChevronLeft, ArrowRight, Star } from 'lucide-react';

export default function CounsellingModal({ isOpen, onClose }) {
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

  const streams = ["Engineering", "MBA / Management", "Medical Science", "Law & Legal Studies", "Design / Architecture", "Commerce / CA"];
  const educationLevels = ["Class 12th (Studying)", "Class 12th (Completed)", "Graduation (Studying)", "Graduation (Completed)"];
  const exams = ["JEE Main", "NEET UG", "CAT / XAT", "CUET", "CLAT", "Other / None"];

  const handleInputChange = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.email) {
        alert("Please fill all contact fields");
        return;
      }
    }
    if (step === 2) {
      if (!formData.stream || !formData.education) {
        alert("Please select your stream and education level");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
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
              <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
                <Sparkles size={18} className="animate-spin-slow" />
              </div>
              <span className="font-display font-extrabold text-slate-800 text-base">
                Free Admissions Counselling
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
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-6">
                  <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-brand-600' : ''}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                      step >= 1 ? 'bg-brand-600 text-white border-brand-600' : 'border-slate-200'
                    }`}>1</span>
                    <span>Contact</span>
                  </div>
                  <div className="h-[2px] bg-slate-100 flex-1 mx-3"></div>
                  <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-brand-600' : ''}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                      step >= 2 ? 'bg-brand-600 text-white border-brand-600' : 'border-slate-200'
                    }`}>2</span>
                    <span>Interest</span>
                  </div>
                  <div className="h-[2px] bg-slate-100 flex-1 mx-3"></div>
                  <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-brand-600' : ''}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                      step >= 3 ? 'bg-brand-600 text-white border-brand-600' : 'border-slate-200'
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
                      <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl mt-1.5 focus-within:border-brand-500/50 transition-all">
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
                      <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl mt-1.5 focus-within:border-brand-500/50 transition-all">
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
                      <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl mt-1.5 focus-within:border-brand-500/50 transition-all">
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
                                ? 'bg-brand-50 border-brand-500 text-brand-600'
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
                                ? 'bg-brand-50 border-brand-500 text-brand-600'
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
                              className="w-4 h-4 text-brand-600 focus:ring-brand-500"
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
                                ? 'bg-brand-50 border-brand-500 text-brand-600'
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
                      <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl mt-1.5 focus-within:border-brand-500/50 transition-all">
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
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl mt-1.5 focus:border-brand-500/50 outline-none text-sm text-slate-800 placeholder-slate-400 font-medium resize-none"
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
                      className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-[#110051] hover:bg-[#1a0073] text-white text-xs font-bold transition-all duration-300 shadow-md cursor-pointer"
                    >
                      Continue
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-1.5 px-8 py-3 rounded-xl bg-[#110051] hover:bg-[#1a0073] text-white text-xs font-bold shadow-md transition-all duration-300 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Request</span>
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
                <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto border border-brand-100 shadow-md">
                  <BadgeCheck size={36} className="animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-2xl text-slate-800 tracking-tight">
                    Booking Successful!
                  </h3>
                  <p className="text-[13px] text-slate-400 font-medium px-4">
                    Thank you <strong className="text-slate-600 font-bold">{formData.name}</strong>. An admissions counselor matches with your profile shortly.
                  </p>
                </div>

                {/* Simulated Matching Card */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 text-left max-w-sm mx-auto space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-600">
                        AM
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Assigning Counselor...</p>
                      <span className="text-[10px] text-slate-400 font-medium">Matching stream: {formData.stream}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[11px] text-brand-600 font-bold">
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
