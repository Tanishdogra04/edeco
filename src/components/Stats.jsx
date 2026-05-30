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
      color: "bg-brand-50 text-brand-800 border-brand-200" 
    },
    { 
      label: "Students Guided", 
      value: "50", 
      suffix: "K+",
      desc: "Admissions finalized", 
      icon: Users, 
      color: "bg-brand-50 text-brand-800 border-brand-200" 
    },
    { 
      label: "Expert Counsellors", 
      value: "100", 
      suffix: "+",
      desc: "Industry-certified guides", 
      icon: UserCheck, 
      color: "bg-brand-50 text-brand-800 border-brand-200" 
    },
    { 
      label: "Success Rate", 
      value: "95", 
      suffix: "%",
      desc: "Top preference college matches", 
      icon: Award, 
      color: "bg-brand-50 text-brand-800 border-brand-200" 
    }
  ];

  return (
    <section className="py-12 bg-brand-50 relative border-y border-brand-200/30">
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
                className="bg-white p-6 rounded-2xl text-center flex flex-col items-center justify-between border border-brand-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon wrapper */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.color} mb-4 shadow-sm`}>
                  <Icon size={22} />
                </div>

                {/* Stat value */}
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-brand-800 tracking-tight">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>

                {/* Label and description */}
                <div className="mt-2 text-left w-full text-center">
                  <h4 className="text-[14px] font-bold text-brand-800">{item.label}</h4>
                  <p className="text-[12px] text-brand-800/60 mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
