import { Link } from 'react-router-dom';
import {
  Laptop, Briefcase, HeartPulse, Scale,
  Palette, BarChart3, ArrowRight, GraduationCap
} from 'lucide-react';
import { domainsList } from '../data/domains';

const ICON_MAP = {
  Laptop,
  Briefcase,
  HeartPulse,
  Scale,
  Palette,
  BarChart3
};

export default function ExploreFuture() {
  const domains = domainsList.slice(0, 6);

  return (
    <section className="py-20 bg-slate-50 relative border-y border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 text-left">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[12px] font-bold text-[#0f71cd] uppercase tracking-widest block">
              Domain Index
            </span>
            <h2 className="font-tt-talent font-extrabold text-3xl sm:text-4xl text-[#0F141E] tracking-tight" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              Explore Your <span className="text-[#0f71cd]">Future Stream</span>
            </h2>
            <p className="text-[14px] text-[#0F141E]/70 font-medium">
              Choose from a wide range of academic streams and discover the perfect career path tailored for&nbsp;you.
            </p>
          </div>

          <div className="shrink-0 flex items-center">
            <Link
              to="/domains"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-slate-200 hover:border-[#0f71cd] text-slate-700 hover:text-white hover:bg-[#0f71cd] text-sm font-bold shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group active:scale-[0.98] font-tt-talent"
              style={{ fontFamily: '"TT Talent", sans-serif' }}
            >
              <span>View All Domains</span>
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {domains.map((dom, index) => {
            const Icon = ICON_MAP[dom.iconName] || GraduationCap;
            return (
              <div key={index} className="h-full animate-hover">
                <Link
                  to={`/stream/${dom.id}`}
                  className="group flex flex-col items-center justify-center h-full bg-white border border-slate-200/80 p-6 rounded-3xl text-center hover-lift hover:bg-[#0f71cd] transition-all duration-300 shadow-sm"
                >
                  <div className="w-16 h-16 mx-auto bg-[#0f71cd]/5 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-white/20 group-hover:text-white transition-all duration-300 mb-4 text-[#0f71cd]">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-tt-talent font-semibold text-[#0F141E] group-hover:text-white transition-colors text-sm" style={{ fontFamily: '"TT Talent", sans-serif' }}>
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
