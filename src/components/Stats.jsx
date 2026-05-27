import React, { useEffect, useState } from 'react';
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
      color: "bg-blue-50 text-blue-600 border-blue-100/50" 
    },
    { 
      label: "Students Guided", 
      value: "50", 
      suffix: "K+",
      desc: "Admissions finalized", 
      icon: Users, 
      color: "bg-purple-50 text-purple-600 border-purple-100/50" 
    },
    { 
      label: "Expert Counsellors", 
      value: "100", 
      suffix: "+",
      desc: "Industry-certified guides", 
      icon: UserCheck, 
      color: "bg-indigo-50 text-indigo-600 border-indigo-100/50" 
    },
    { 
      label: "Success Rate", 
      value: "95", 
      suffix: "%",
      desc: "Top preference college matches", 
      icon: Award, 
      color: "bg-emerald-50 text-emerald-600 border-emerald-100/50" 
    }
  ];

  return (
    <section className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 rounded-2xl text-center flex flex-col items-center justify-between border border-slate-100/70"
              >
                {/* Icon wrapper */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.color} mb-4 shadow-sm`}>
                  <Icon size={22} />
                </div>

                {/* Stat value */}
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-slate-800 tracking-tight">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>

                {/* Label and description */}
                <div className="mt-2 text-left w-full text-center">
                  <h4 className="text-[14px] font-bold text-slate-700">{item.label}</h4>
                  <p className="text-[12px] text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
