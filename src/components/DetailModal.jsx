import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MapPin, Award, Building2, BookOpen, Landmark, Briefcase, GraduationCap } from 'lucide-react';

export default function DetailModal({ college, isOpen, onClose, onCounsellingClick }) {
  if (!isOpen || !college) return null;

  const recruiters = {
    iitb: ["Google", "Microsoft", "Goldman Sachs", "Uber", "Sony JP"],
    iima: ["McKinsey & Co", "Boston Consulting Group (BCG)", "Bain & Co", "Goldman Sachs", "Morgan Stanley"],
    bits: ["Apple", "Nvidia", "Adobe", "Salesforce", "Google"],
    aiims: ["AIIMS Residency", "Max Healthcare", "Fortis Hospitals", "Apollo Hospitals", "WHO India"],
    siu: ["Deloitte", "EY", "KPMG", "PwC", "Amazon"],
    nlsiu: ["Amarchand Mangaldas", "AZB & Partners", "Trilegal", "Khaitan & Co", "ICICI Bank Legal"]
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900"
        />

        {/* Modal Card */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header Image Cover */}
          <div className="relative h-56 w-full">
            <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
            
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/60 backdrop-blur-md text-white border border-white/10 hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Title Overlaid */}
            <div className="absolute bottom-4 left-6 text-left text-white space-y-1 pr-12">
              <span className="px-2.5 py-0.5 rounded bg-brand-600/90 text-[10px] font-bold tracking-wider uppercase">
                {college.stream}
              </span>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl leading-tight">
                {college.name}
              </h3>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-200">
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span>{college.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span>{college.rating} ({college.reviews})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Grid metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-left">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">NIRF Rank</span>
                <span className="text-sm font-extrabold text-slate-800">{college.nirf.split(' ')[0]}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-left">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Annual Fees</span>
                <span className="text-sm font-extrabold text-slate-800">{college.fees.split(' ')[0]} L</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-left">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Average Package</span>
                <span className="text-sm font-extrabold text-slate-800">{college.package.split(' ')[0]} L</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-left">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Highest Package</span>
                <span className="text-sm font-extrabold text-emerald-600">{college.highestPackage}</span>
              </div>
            </div>

            {/* Description Summary */}
            <div className="text-left space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap size={14} className="text-brand-600" />
                <span>Overview & Academic Standard</span>
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {college.id === 'iitb' && "IIT Bombay offers highly prestigious engineering research paths. The institute boasts a sprawling green campus at Powai, exceptional faculty profiles, and has generated prominent global tech leaders."}
                {college.id === 'iima' && "IIM Ahmedabad is recognized globally for its elite management studies. It specializes in agribusiness, financial management, and boasts absolute triple-crown international academic accreditations."}
                {college.id === 'bits' && "BITS Pilani stands as India's premier private tech institute. It operates a famous 'No-Attendance Policy', encouraging self-discipline, alongside a comprehensive practice school internship program."}
                {college.id === 'aiims' && "AIIMS Delhi is the ultimate aspiration for medical studies. It provides unmatched clinical exposure, handles thousands of out-patient files daily, and operates on highly subsidized government funding."}
                {college.id === 'siu' && "SIBM Pune operates from a scenic hilltop campus. It is widely recognized for corporate alignment, placing graduates across top consulting companies and market research agencies."}
                {college.id === 'nlsiu' && "NLSIU Bangalore is the premier legal research institution in India. It holds rank #1 persistently under NIRF Law, creating elite law practitioners, judges, and corporate counsels."}
              </p>
            </div>

            {/* Placements and Recruiters */}
            <div className="text-left space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase size={14} className="text-brand-600" />
                <span>Top Placement Partners</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {recruiters[college.id]?.map((rec, i) => (
                  <span 
                    key={i} 
                    className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700 shadow-sm"
                  >
                    {rec}
                  </span>
                ))}
              </div>
            </div>

            {/* Admission Parameters */}
            <div className="text-left space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={14} className="text-brand-600" />
                <span>Admission Pathways</span>
              </h4>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-2 font-medium">
                <p><strong>Accepted Exam:</strong> {college.stream === 'Engineering' ? "JEE Main & Advanced" : college.stream === 'Management' ? "CAT / XAT / GMAT" : college.stream === 'Medical' ? "NEET UG" : "CLAT Score"}</p>
                <p><strong>Eligibility criteria:</strong> Class 12th Board marks (min 75% or equivalent score cuts).</p>
                <p><strong>Counseling Process:</strong> Managed by official government portals (JoSAA / MCC / CLAT Committee) or Direct Institute Rounds.</p>
              </div>
            </div>

          </div>

          {/* Footer Controls */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <button 
              onClick={onClose} 
              className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
            >
              Close Details
            </button>
            <button 
              onClick={() => { onClose(); onCounsellingClick(); }}
              className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/25 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Apply for Guidance
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
