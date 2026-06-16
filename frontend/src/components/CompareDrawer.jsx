import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare, HelpCircle, Check, ArrowRight, ShieldAlert, BadgeCheck } from 'lucide-react';

export default function CompareDrawer({ isOpen, onClose, comparedColleges, onRemove, onClearAll }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isOpen || comparedColleges.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Drawer */}
      <div className="fixed bottom-16 lg:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl">
          <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none">
            <X size={16} className="text-gray-600" />
          </button>
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="glass-effect p-4 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          {/* Left section: Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0f71cd] flex items-center justify-center text-white shadow-sm">
              <GitCompare size={20} />
            </div>
            <div className="text-left">
              <h4 className="text-[14px] font-bold text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>College Compare Dock</h4>
              <p className="text-[12px] text-[#0F141E]/50 font-medium">
                {comparedColleges.length === 1 
                  ? "Add 1 more college to compare" 
                  : `${comparedColleges.length} colleges selected to compare`}
              </p>
            </div>
          </div>

          {/* Center section: Selected college badges */}
          <div className="flex flex-wrap items-center gap-2">
            {comparedColleges.map((college) => (
              <div 
                key={college.id}
                className="flex items-center gap-2 bg-[#0f71cd]/5 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0F141E] shadow-sm"
              >
                <span>{college.logo}</span>
                <button 
                  onClick={() => onRemove(college)}
                  className="p-0.5 rounded-full hover:bg-[#0f71cd]/10 text-[#0F141E]/40 hover:text-[#0F141E] cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>
            ))}

            {comparedColleges.length > 0 && (
              <button 
                onClick={onClearAll}
                className="text-xs font-bold text-rose-500 hover:text-rose-600 px-2 py-1 cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Right section: CTA */}
          <div>
            <button
              disabled={comparedColleges.length < 2}
              onClick={() => setIsModalOpen(true)}
              className={`w-full md:w-auto px-6 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer ${
                comparedColleges.length < 2
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 shadow-none cursor-not-allowed font-tt-talent'
                  : 'bg-[#0f71cd] hover:bg-[#0c62b2] text-white hover:-translate-y-0.5 duration-300 font-tt-talent'
              }`}
              style={{ fontFamily: '"TT Talent", sans-serif' }}
            >
              Compare Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* Comparison Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-5xl rounded-3xl shadow-sm border border-slate-200 relative z-10 overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#0f71cd]/5 text-[#0f71cd]">
                    <GitCompare size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-tt-talent font-bold text-lg text-[#0F141E]" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                      Detailed Side-by-Side Comparison
                    </h3>
                    <p className="text-xs text-[#0F141E]/50 font-medium font-sans">
                      Analyze metrics, ROI, and rankings to choose the right fit.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-50 text-slate-450 hover:text-[#0F141E] transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Table Body Content (Scrollable) */}
              <div className="flex-1 overflow-x-auto p-6">
                <table className="w-full min-w-[700px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="py-4 text-xs font-semibold text-slate-400 uppercase w-1/4">Comparison Criteria</th>
                      {comparedColleges.map((college) => (
                        <th key={college.id} className="py-4 px-4 w-1/4">
                          <div className="flex flex-col text-left">
                            <span className="text-[11px] font-bold text-[#0f71cd] uppercase tracking-widest font-sans">{college.stream}</span>
                            <span className="text-[14px] font-bold text-[#0F141E] line-clamp-1 mt-0.5 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{college.name}</span>
                            <span className="text-[11px] text-[#0F141E]/50 font-medium font-sans">{college.location}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[13px] font-medium text-slate-700">
                    
                    {/* NIRF Rank */}
                    <tr>
                      <td className="py-4 text-slate-450 font-bold">NIRF Ranking</td>
                      {comparedColleges.map((c) => (
                        <td key={c.id} className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-[#0F141E] text-xs font-bold font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                            {c.nirf}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Stream Domain */}
                    <tr>
                      <td className="py-4 text-slate-455 font-bold">Primary Domain</td>
                      {comparedColleges.map((c) => (
                        <td key={c.id} className="py-4 px-4 text-[#0F141E] font-semibold">{c.stream}</td>
                      ))}
                    </tr>

                    {/* Average Package */}
                    <tr>
                      <td className="py-4 text-slate-455 font-bold">Avg. Placement CTC</td>
                      {comparedColleges.map((c) => (
                        <td key={c.id} className="py-4 px-4">
                          <span className="text-[#0f71cd] font-bold text-[14px] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{c.package}</span>
                        </td>
                      ))}
                    </tr>

                    {/* Highest Package */}
                    <tr>
                      <td className="py-4 text-slate-455 font-bold">Highest Offered Package</td>
                      {comparedColleges.map((c) => (
                        <td key={c.id} className="py-4 px-4 font-bold text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{c.highestPackage}</td>
                      ))}
                    </tr>

                    {/* Rating */}
                    <tr>
                      <td className="py-4 text-slate-455 font-bold">Student Reviews</td>
                      {comparedColleges.map((c) => (
                        <td key={c.id} className="py-4 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="text-yellow-500 text-xs">★</span>
                            <span className="font-bold text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{c.rating}</span>
                            <span className="text-slate-400 text-[11px]">({c.reviews})</span>
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Fees */}
                    <tr>
                      <td className="py-4 text-slate-455 font-bold">Annual Course Fee</td>
                      {comparedColleges.map((c) => (
                        <td key={c.id} className="py-4 px-4 text-[#0F141E] font-bold font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{c.fees}</td>
                      ))}
                    </tr>

                    {/* Highlights */}
                    <tr>
                      <td className="py-4 text-slate-455 font-bold">Key Campus USP</td>
                      {comparedColleges.map((c) => (
                        <td key={c.id} className="py-4 px-4 text-xs font-semibold text-[#0f71cd]">
                          <div className="flex items-start gap-1.5 text-left">
                            <BadgeCheck size={14} className="mt-0.5 flex-shrink-0" />
                            <span>
                              {c.id === 'iitb' && "World-class incubation & tech hub, top research output."}
                              {c.id === 'iima' && "Triple Crown accreditation, case study methodology."}
                              {c.id === 'bits' && "No reservation policy, zero attendance rules, strong alumni network."}
                              {c.id === 'aiims' && "Highly subsidized learning, largest clinical research pool."}
                              {c.id === 'siu' && "High corporate connect, industry mentors, state-of-the-art campus."}
                              {c.id === 'nlsiu' && "Pre-eminent legal studies, top corporate/judicial placements."}
                            </span>
                          </div>
                        </td>
                      ))}
                    </tr>

                  </tbody>
                </table>
              </div>

              {/* Footer CTA */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-450 font-medium font-sans">
                  Need help making a decision? Talk to our counselors.
                </span>
                <button 
                  onClick={() => { setIsModalOpen(false); }}
                  className="px-6 py-2.5 rounded-xl bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-tt-talent font-bold text-xs shadow-sm cursor-pointer duration-300 transition-all"
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  Book Free Advice
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
