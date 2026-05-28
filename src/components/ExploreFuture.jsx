import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Laptop, Briefcase, HeartPulse, Scale,
  Palette, BarChart3, Globe2, GitCompare
} from 'lucide-react';

export default function ExploreFuture({ onCompareClick }) {
  const domains = [
    { name: "Engineering", icon: Laptop },
    { name: "MBA / Business", icon: Briefcase },
    { name: "Medical Science", icon: HeartPulse },
    { name: "Law & Justice", icon: Scale },
    { name: "Design & Arts", icon: Palette },
    { name: "Commerce & Finance", icon: BarChart3 },
    { name: "Study Abroad", icon: Globe2 },
    { name: "Compare Colleges", icon: GitCompare, isAction: true }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <span className="text-[12px] font-bold text-brand-600 uppercase tracking-widest block">
            Domain Index
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Explore Your <span className="text-brand-600">Future Stream</span>
          </h2>
          <p className="text-[14px] text-slate-500 font-medium">
            Choose from a wide range of academic streams and discover the perfect career path tailored for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4 md:gap-6">
          {domains.map((dom, index) => {
            const Icon = dom.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="h-full"
              >
                {dom.isAction ? (
                  <button
                    onClick={onCompareClick}
                    className="group flex flex-col items-center justify-center w-full h-full bg-slate-50 border border-slate-100 p-6 rounded-3xl text-center hover-lift hover:bg-brand-900 transition-colors duration-300"
                  >
                    <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 mb-4 text-brand-600">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-display font-semibold text-slate-800 group-hover:text-white transition-colors">
                      {dom.name}
                    </h3>
                  </button>
                ) : (
                  <Link
                    to={`/stream/${dom.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="group flex flex-col items-center justify-center h-full bg-slate-50 border border-slate-100 p-6 rounded-3xl text-center hover-lift hover:bg-brand-900 transition-colors duration-300"
                  >
                    <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 mb-4 text-brand-600">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-display font-semibold text-slate-800 group-hover:text-white transition-colors">
                      {dom.name}
                    </h3>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
