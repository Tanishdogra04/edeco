import React from 'react';
import { motion } from 'framer-motion';
import { Code2, TrendingUp, Monitor, HeartPulse, Briefcase, Scale, ArrowRight, Clock, DollarSign } from 'lucide-react';

export default function TrendingCourses({ onExploreColleges }) {
const courses = [
    {
      name: "B.Tech (Computer Science)",
      category: "Technology",
      icon: Code2,
      duration: "4 Years (8 Semesters)",
      salary: "₹8.5 LPA - ₹28 LPA+",
      demand: "Extreme High",
      demandColor: "bg-[#0f71cd] text-white border-transparent",
      eligibility: "12th with Physics, Chemistry & Math",
      jobs: "Software Architect, AI Engineer, Fullstack Developer"
    },
    {
      name: "MBA (Finance / Marketing)",
      category: "Management",
      icon: TrendingUp,
      duration: "2 Years (4 Semesters)",
      salary: "₹10.2 LPA - ₹35 LPA+",
      demand: "High",
      demandColor: "bg-[#0f71cd]/90 text-white border-transparent",
      eligibility: "Graduation (Any stream) + CAT/XAT",
      jobs: "Investment Banker, Product Manager, Consultant"
    },
    {
      name: "BCA / MCA (Integrated)",
      category: "Computer Applications",
      icon: Monitor,
      duration: "3-5 Years",
      salary: "₹5.0 LPA - ₹15 LPA+",
      demand: "Rising",
      demandColor: "bg-[#0f71cd]/10 text-[#0f71cd] border-transparent",
      eligibility: "12th Pass with Mathematics/IP",
      jobs: "Cloud Specialist, System Admin, App Developer"
    },
    {
      name: "MBBS (Medicine)",
      category: "Healthcare",
      icon: HeartPulse,
      duration: "5.5 Years (Incl. Internship)",
      salary: "₹9.0 LPA - ₹24 LPA+",
      demand: "Constant High",
      demandColor: "bg-[#0f71cd] text-white border-transparent",
      eligibility: "12th with Biology + NEET Score",
      jobs: "Resident Medical Officer, Cardiologist, Surgeon"
    },
    {
      name: "BBA (Analytics / Fintech)",
      category: "Management",
      icon: Briefcase,
      duration: "3 Years (6 Semesters)",
      salary: "₹4.8 LPA - ₹12 LPA+",
      demand: "Rising",
      demandColor: "bg-[#0f71cd]/10 text-[#0f71cd] border-transparent",
      eligibility: "12th Pass in any stream (Commerce pref.)",
      jobs: "Data Analyst, HR Business Partner, Marketing Head"
    },
    {
      name: "LLB (Hons) / BA LLB",
      category: "Law",
      icon: Scale,
      duration: "3 or 5 Years",
      salary: "₹6.0 LPA - ₹18 LPA+",
      demand: "Moderate-High",
      demandColor: "bg-slate-100 text-slate-700 border-slate-200",
      eligibility: "12th Pass (for 5 Yr) or Grad (for 3 Yr) + CLAT",
      jobs: "Corporate Legal Advisor, Litigator, Cyber Law Expert"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[12px] font-bold text-[#0f71cd] uppercase tracking-widest block">
            Career Pathways
          </span>
          <h2 className="font-tt-talent font-bold text-3xl sm:text-4xl text-[#0F141E] tracking-tight" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            Trending Professional Courses
          </h2>
          <p className="text-[14px] text-[#0F141E]/70 font-medium">
            Align your passion with market demands. Check average starting salaries and career positions.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => {
            const Icon = course.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0f71cd]/30 transition-all duration-300 flex flex-col justify-between h-96 text-left"
              >
                <div>
                  {/* Top line with Icon and Demand Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0f71cd]/5 flex items-center justify-center text-[#0f71cd] border border-slate-200">
                      <Icon size={22} />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${course.demandColor}`}>
                      {course.demand} Demand
                    </span>
                  </div>

                  {/* Course name */}
                  <h3 className="font-tt-talent font-bold text-[18px] text-[#0F141E] tracking-tight leading-snug" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    {course.name}
                  </h3>
                  <span className="text-[11px] text-[#0F141E]/55 font-bold uppercase tracking-wider mt-0.5 block">
                    {course.category}
                  </span>

                  {/* Duration and Salary row */}
                  <div className="space-y-2 mt-6">
                    <div className="flex items-center gap-2 text-[#0F141E]/75 text-xs font-semibold">
                      <Clock size={14} className="text-[#0f71cd]/60" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#0F141E]/75 text-xs font-semibold">
                      <DollarSign size={14} className="text-[#0f71cd]" />
                      <span className="text-[#0F141E]/80">Average Salary: <strong className="text-[#0F141E] font-bold">{course.salary}</strong></span>
                    </div>
                  </div>

                  {/* Job positions list */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-[10px] text-[#0F141E]/50 font-bold uppercase block">Core Career Tracks:</span>
                    <p className="text-[12px] text-[#0F141E]/80 font-semibold mt-1 truncate">
                      {course.jobs}
                    </p>
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-4 mt-6 border-t border-slate-100">
                  <button 
                    onClick={onExploreColleges}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-tt-talent font-bold text-xs transition-all duration-300 cursor-pointer"
                    style={{ fontFamily: '"TT Talent", sans-serif' }}
                  >
                    <span>Browse Colleges</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
