import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopExams({ onCounsellingClick }) {
  const exams = [
    {
      id: "jee-main",
      name: "JEE Main / Advanced",
      fullForm: "Joint Entrance Examination",
      date: "Session 1: Jan 2026 | Session 2: Apr 2026",
      status: "Closed",
      statusColor: "bg-red-50 text-red-600 border-red-100",
      result: "Results Declared",
      resultColor: "bg-emerald-50 text-emerald-700",
      difficulty: "Very High",
      applicants: "1.2 Million"
    },
    {
      id: "neet",
      name: "NEET UG",
      fullForm: "National Eligibility cum Entrance Test",
      date: "Exam Date: May 3, 2026",
      status: "Ongoing",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      result: "Answer Key Released",
      resultColor: "bg-amber-50 text-amber-700",
      difficulty: "High",
      applicants: "2.1 Million"
    },
    {
      id: "cat",
      name: "CAT",
      fullForm: "Common Admission Test (IIMs)",
      date: "Registration: Aug - Sep 2026",
      status: "Upcoming",
      statusColor: "bg-blue-50 text-blue-600 border-blue-100",
      result: "Exam in Nov 2026",
      resultColor: "bg-slate-100 text-slate-700",
      difficulty: "High",
      applicants: "250K+"
    },
    {
      id: "cuet",
      name: "CUET UG",
      fullForm: "Common University Entrance Test",
      date: "Exam Dates: May 15 - 31, 2026",
      status: "Ongoing",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      result: "Admit Cards Out",
      resultColor: "bg-indigo-50 text-indigo-700",
      difficulty: "Medium",
      applicants: "1.4 Million"
    },
    {
      id: "gate",
      name: "GATE",
      fullForm: "Graduate Aptitude Test in Engineering",
      date: "Registration starts: Sep 2026",
      status: "Upcoming",
      statusColor: "bg-blue-50 text-blue-600 border-blue-100",
      result: "Exam in Feb 2027",
      resultColor: "bg-slate-100 text-slate-700",
      difficulty: "Very High",
      applicants: "800K+"
    },
    {
      id: "clat",
      name: "CLAT",
      fullForm: "Common Law Admission Test",
      date: "Exam Date: Dec 7, 2026",
      status: "Upcoming",
      statusColor: "bg-blue-50 text-blue-600 border-blue-100",
      result: "Reg. starting July",
      resultColor: "bg-slate-100 text-slate-700",
      difficulty: "Medium-High",
      applicants: "80K+"
    }
  ];

  return (
    <section id="exams" className="py-20 bg-slate-50 relative border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[12px] font-bold text-brand-600 uppercase tracking-widest block">
            National Entrance Hub
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Top Entrance Exams Calendar
          </h2>
          <p className="text-[14px] text-slate-400 font-medium">
            Stay updated with registration timelines, counseling cut-offs, and critical exam parameters.
          </p>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-card p-6 rounded-3xl bg-white border border-slate-200 shadow-lg shadow-slate-100/50 flex flex-col justify-between h-80 text-left"
            >
              <div>
                {/* Header: Exam title & Status pill */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display font-extrabold text-[17px] text-slate-800 tracking-tight leading-snug">
                      {exam.name}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">{exam.fullForm}</span>
                  </div>
                  
                  {/* Status Pill */}
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${exam.statusColor}`}>
                    {exam.status}
                  </span>
                </div>

                {/* Calendar row */}
                <div className="flex items-center gap-2 mt-6 text-slate-600">
                  <Calendar size={14} className="text-brand-600" />
                  <span className="text-xs font-semibold">{exam.date}</span>
                </div>

                {/* Additional metrics */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-50">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Difficulty</span>
                    <span className="text-xs font-bold text-slate-700">{exam.difficulty}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Applicants</span>
                    <span className="text-xs font-bold text-slate-700">{exam.applicants}</span>
                  </div>
                </div>
              </div>

              {/* Footer: Result badge & CTA */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${exam.resultColor}`}>
                  {exam.result}
                </span>

                <Link 
                  to={`/exam/${exam.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-brand-200 hover:bg-brand-50 text-xs font-bold text-brand-600 transition-colors group cursor-pointer shadow-sm"
                >
                  <span>View Details</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
