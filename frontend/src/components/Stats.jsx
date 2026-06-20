import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { School, Users, UserCheck, Award } from 'lucide-react';

function AnimatedCounter({ value, duration = 1.5, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    // Extract numerical value from string e.g. "5000" from "5000+"
    const end = parseInt(value.replace(/[^0-9]/g, ''), 10);
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  // Format count with commas if needed
  const formattedCount = count >= 1000 ? (count / 1000).toFixed(0) + 'K' : count;
  
  // If we converted to 'K' we might already satisfy the count or need to handle manually
  return (
    <span>
      {count >= 1000 && value.includes('K') ? `${(count / 1000).toFixed(0)}K` : count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const statItems = [
    { 
      label: "Accredited Colleges", 
      value: "5000", 
      suffix: "+",
      desc: "Top Universities nationwide", 
      icon: School, 
      color: "bg-slate-50 text-[#0F141E] border-slate-200" 
    },
    { 
      label: "Students Guided", 
      value: "50", 
      suffix: "K+",
      desc: "Admissions finalized", 
      icon: Users, 
      color: "bg-slate-50 text-[#0F141E] border-slate-200" 
    },
    { 
      label: "Expert Counsellors", 
      value: "100", 
      suffix: "+",
      desc: "Industry-certified guides", 
      icon: UserCheck, 
      color: "bg-slate-50 text-[#0F141E] border-slate-200" 
    },
    { 
      label: "Success Rate", 
      value: "95", 
      suffix: "%",
      desc: "Top preference college matches", 
      icon: Award, 
      color: "bg-slate-50 text-[#0F141E] border-slate-200" 
    }
  ];

  return (
    <section className="py-16 bg-[#e9f6ff] border-y border-slate-200/50 relative overflow-hidden">
      {/* Decorative vertical grid lines on desktop */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute left-[25%] top-0 w-[1px] h-full bg-slate-200/60 hidden lg:block"></div>
        <div className="absolute left-[50%] top-0 w-[1px] h-full bg-slate-200/60 hidden lg:block"></div>
        <div className="absolute left-[75%] top-0 w-[1px] h-full bg-slate-200/60 hidden lg:block"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 sm:gap-x-12">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left group"
              >
                {/* Icon wrapper with subtle squircle shape and hover glow */}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-slate-200/65 text-[#0f71cd] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 group-hover:scale-105 group-hover:border-[#0f71cd]/30 group-hover:shadow-[0_4px_12px_rgba(15,113,205,0.08)] shrink-0">
                  <Icon size={20} className="stroke-[2]" />
                </div>

                {/* Content block */}
                <div className="space-y-1">
                  {/* Metric number */}
                  <div className="text-3.5xl sm:text-4xl lg:text-4.5xl font-tt-talent font-black text-[#0F141E] tracking-tight transition-transform duration-300 group-hover:translate-x-0.5" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </div>
                  {/* Label */}
                  <h4 className="text-[13px] font-tt-talent font-bold text-[#0F141E] tracking-wide uppercase mt-1" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    {item.label}
                  </h4>
                  {/* Description */}
                  <p className="text-[12px] text-slate-500 font-medium max-w-[200px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
