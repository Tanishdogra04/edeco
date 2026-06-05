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
          className="glass-effect p-4 rounded-3xl shadow-sm border border-brand-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          {/* Left section: Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-sm">
              <GitCompare size={20} />
            </div>
            <div className="text-left">
              <h4 className="text-[14px] font-bold text-brand-800 font-display">College Compare Dock</h4>
              <p className="text-[12px] text-brand-800/40 font-medium">
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
                className="flex items-center gap-2 bg-brand-50 border border-brand-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-brand-800 shadow-sm"
              >
                <span>{college.logo}</span>
                <button 
                  onClick={() => onRemove(college)}
                  className="p-0.5 rounded-full hover:bg-brand-100 text-brand-800/40 hover:text-brand-800 cursor-pointer"
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
                  ? 'bg-brand-50 text-brand-800/30 border border-brand-200/50 shadow-none cursor-not-allowed'
                  : 'bg-[#110051] hover:bg-[#1a0073] text-white hover:-translate-y-0.5 duration-300'
              }`}
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
              className="fixed inset-0 bg-brand-900/60"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-5xl rounded-3xl shadow-sm border border-brand-200 relative z-10 overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-brand-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-brand-50 text-brand-500">
                    <GitCompare size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-display font-extrabold text-lg text-brand-800">
                      Detailed Side-by-Side Comparison
                    </h3>
                    <p className="text-xs text-brand-800/40 font-medium font-sans">
                      Analyze metrics, ROI, and rankings to choose the right fit.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-brand-50 text-brand-800/40 hover:text-brand-800 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Table Body Content (Scrollable) */}
              <div className="flex-1 overflow-x-auto p-6">
                <table className="w-full min-w-[700px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-brand-200">
                      <th className="py-4 text-xs font-semibold text-brand-800/40 uppercase w-1/4">Comparison Criteria</th>
                      {comparedColleges.map((college) => (
                        <th key={college.id} className="py-4 px-4 w-1/4">
                          <div className="flex flex-col text-left">
                            <span className="text-[11px] font-bold text-brand-500 uppercase tracking-widest font-sans">{college.stream}</span>
                            <span className="text-[14px] font-black text-brand-800 line-clamp-1 mt-0.5 font-display">{college.name}</span>
                            <span className="text-[11px] text-brand-800/40 font-medium font-sans">{college.location}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-200 text-[13px] font-medium text-brand-800/70">
                    
                    {/* NIRF Rank */}
                    <tr>
                      <td className="py-4 text-brand-800/50 font-bold">NIRF Ranking</td>
                      {comparedColleges.map((c) => (
                        <td key={c.id} className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded bg-brand-50 border border-brand-200 text-brand-800 text-xs font-extrabold font-sans">
                            {c.nirf}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Stream Domain */}
                    <tr>
                      <td className="py-4 text-brand-800/50 font-bold">Primary Domain</td>
                      {comparedColleges.map((c) => (
                        <td key={c.id} className="py-4 px-4 text-brand-800 font-semibold">{c.stream}</td>
                      ))}
                    </tr>

                    {/* Average Package */}
                    <tr>
                      <td className="py-4 text-brand-800/50 font-bold">Avg. Placement CTC</td>
                      {comparedColleges.map((c) => (
                        <td key={c.id} className="py-4 px-4">
                          <span className="text-brand-500 font-extrabold text-[14px]">{c.package}</span>
                        </td>
                      ))}
                    </tr>

                    {/* Highest Package */}
                    <tr>
                      <td className="py-4 text-brand-800/50 font-bold">Highest Offered Package</td>
                      {comparedColleges.map((c) => (
                        <td key={c.id} className="py-4 px-4 font-bold text-brand-800">{c.highestPackage}</td>
                      ))}
                    </tr>

                    {/* Rating */}
                    <tr>
                      <td className="py-4 text-brand-800/50 font-bold">Student Reviews</td>
                      {comparedColleges.map((c) => (
                        <td key={c.id} className="py-4 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="text-yellow-500 text-xs">★</span>
                            <span className="font-extrabold text-brand-800">{c.rating}</span>
                            <span className="text-brand-800/40 text-[11px]">({c.reviews})</span>
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Fees */}
                    <tr>
                      <td className="py-4 text-brand-800/50 font-bold">Annual Course Fee</td>
                      {comparedColleges.map((c) => (
                        <td key={c.id} className="py-4 px-4 text-brand-800 font-bold">{c.fees}</td>
                      ))}
                    </tr>

                    {/* Highlights */}
                    <tr>
                      <td className="py-4 text-brand-800/50 font-bold">Key Campus USP</td>
                      {comparedColleges.map((c) => (
                        <td key={c.id} className="py-4 px-4 text-xs font-semibold text-brand-500">
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
              <div className="p-6 bg-brand-50 border-t border-brand-200 flex items-center justify-between">
                <span className="text-xs text-brand-800/40 font-medium font-sans">
                  Need help making a decision? Talk to our counselors.
                </span>
                <button 
                  onClick={() => { setIsModalOpen(false); }}
                  className="px-6 py-2.5 rounded-xl bg-[#110051] hover:bg-[#1a0073] text-white font-bold text-xs shadow-sm cursor-pointer duration-300 transition-all"
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
