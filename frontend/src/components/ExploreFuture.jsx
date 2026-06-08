import React from 'react';
import { Link } from 'react-router-dom';
import {
  Laptop, Briefcase, HeartPulse, Scale,
  Palette, BarChart3, ArrowRight
} from 'lucide-react';

export default function ExploreFuture() {
  const domains = [
    { name: "Engineering", icon: Laptop },
    { name: "MBA / Business", icon: Briefcase },
    { name: "Medical Science", icon: HeartPulse },
    { name: "Law & Justice", icon: Scale },
    { name: "Design & Arts", icon: Palette },
    { name: "Commerce & Finance", icon: BarChart3 }
  ];

  return (
    <section className="py-20 bg-brand-50 relative border-y border-brand-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 text-left">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[12px] font-bold text-brand-600 uppercase tracking-widest block">
              Domain Index
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-800 tracking-tight">
              Explore Your <span className="text-brand-500">Future Stream</span>
            </h2>
            <p className="text-[14px] text-brand-800/60 font-medium">
              Choose from a wide range of academic streams and discover the perfect career path tailored for&nbsp;you.
            </p>
          </div>

          <div className="shrink-0 flex items-center">
            <Link
              to="/domains"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-slate-200 hover:border-[#110051] text-slate-700 hover:text-white hover:bg-[#110051] text-sm font-bold shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group active:scale-[0.98] font-sans"
            >
              <span>View All Domains</span>
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {domains.map((dom, index) => {
            const Icon = dom.icon;
            return (
              <div key={index} className="h-full animate-hover">
                <Link
                  to={dom.to || `/stream/${dom.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="group flex flex-col items-center justify-center h-full bg-white border border-brand-200 p-6 rounded-3xl text-center hover-lift hover:bg-brand-800 transition-all duration-300 shadow-sm"
                >
                  <div className="w-16 h-16 mx-auto bg-brand-50 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 mb-4 text-brand-600">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-semibold text-brand-800 group-hover:text-white transition-colors text-sm">
                    {dom.name}
                  </h3>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
