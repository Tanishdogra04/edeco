import React from 'react';
import { motion } from 'framer-motion';
import { 
  Laptop, Briefcase, HeartPulse, Scale, 
  Palette, BarChart3, Globe2, ArrowRight 
} from 'lucide-react';

export default function ExploreFuture({ onSelectDomain }) {
  const domains = [
    {
      name: "Engineering",
      icon: Laptop,
      color: "from-blue-500 to-indigo-500",
      lightColor: "bg-blue-50 text-blue-600 border-blue-100/50",
      courses: "B.Tech, M.Tech, B.E.",
      salary: "₹6 LPA - ₹25 LPA+",
      colleges: "1,200+ Colleges"
    },
    {
      name: "MBA / Business",
      icon: Briefcase,
      color: "from-purple-500 to-pink-500",
      lightColor: "bg-purple-50 text-purple-600 border-purple-100/50",
      courses: "MBA, PGDM, BBA",
      salary: "₹8 LPA - ₹32 LPA+",
      colleges: "850+ Colleges"
    },
    {
      name: "Medical Science",
      icon: HeartPulse,
      color: "from-emerald-500 to-teal-500",
      lightColor: "bg-emerald-50 text-emerald-600 border-emerald-100/50",
      courses: "MBBS, BDS, B.Pharm",
      salary: "₹7 LPA - ₹20 LPA+",
      colleges: "450+ Colleges"
    },
    {
      name: "Law & Justice",
      icon: Scale,
      color: "from-amber-500 to-orange-500",
      lightColor: "bg-amber-50 text-amber-600 border-amber-100/50",
      courses: "LL.B, BA LL.B, LL.M",
      salary: "₹5 LPA - ₹15 LPA+",
      colleges: "300+ Colleges"
    },
    {
      name: "Design & Arts",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      lightColor: "bg-pink-50 text-pink-600 border-pink-100/50",
      courses: "B.Des, M.Des, B.FA",
      salary: "₹4 LPA - ₹12 LPA+",
      colleges: "250+ Colleges"
    },
    {
      name: "Commerce & Finance",
      icon: BarChart3,
      color: "from-cyan-500 to-blue-500",
      lightColor: "bg-cyan-50 text-cyan-600 border-cyan-100/50",
      courses: "B.Com, M.Com, CA",
      salary: "₹4.5 LPA - ₹18 LPA+",
      colleges: "600+ Colleges"
    },
    {
      name: "Study Abroad",
      icon: Globe2,
      color: "from-indigo-500 to-purple-500",
      lightColor: "bg-indigo-50 text-indigo-600 border-indigo-100/50",
      courses: "MS, MBA, Bachelors",
      salary: "Global Packages",
      colleges: "300+ Partner Unis"
    }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[12px] font-bold text-brand-600 uppercase tracking-widest block">
            Domain Index
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Explore Your Future Stream
          </h2>
          <p className="text-[14px] text-slate-400 font-medium">
            Click on any domain to inspect specialized colleges, fees, exams, and detailed career prospects.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((dom, idx) => {
            const Icon = dom.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => onSelectDomain(dom.name)}
                className="group relative bg-slate-50/50 hover:bg-white rounded-3xl p-6 border border-slate-100 hover:border-brand-200/50 shadow-sm hover:shadow-xl hover:shadow-slate-100/50 cursor-pointer flex flex-col justify-between h-72 transition-all duration-300"
              >
                <div>
                  {/* Icon with linear gradient overlay */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-tr ${dom.color} text-white shadow-md shadow-slate-100 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} />
                  </div>

                  {/* Title and courses info */}
                  <h3 className="font-display font-extrabold text-lg text-slate-800 tracking-tight group-hover:text-brand-600 transition-colors">
                    {dom.name}
                  </h3>
                  
                  <span className="text-[12px] text-slate-400 mt-1 block font-medium">
                    {dom.courses}
                  </span>
                </div>

                {/* Footer details */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-6">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Avg. Package</span>
                    <span className="text-xs font-bold text-slate-700">{dom.salary}</span>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-brand-600 group-hover:text-white flex items-center justify-center text-slate-500 transition-colors">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
