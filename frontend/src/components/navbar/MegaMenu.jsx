import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Laptop, HeartPulse, Palette, GraduationCap, Scale, BarChart3,
  Sparkles, Award, PhoneCall, GitCompare, Compass, BookOpenCheck, ArrowRight
} from 'lucide-react';

const iconMap = {
  Laptop, HeartPulse, Palette, GraduationCap, Scale, BarChart3,
  Sparkles, Award, PhoneCall, GitCompare, Compass, BookOpenCheck, ArrowRight
};

export default function MegaMenu({
  item,
  compareCount,
  onCompareClick,
  onCounsellingClick,
  onClose
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.15 }}
      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[480px] xl:w-[560px] p-6 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 grid grid-cols-2 gap-6 z-50"
    >
      {item.columns.map((column, colIdx) => (
        <div key={colIdx} className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {column.title}
          </h3>
          <ul className="space-y-2">
            {column.links.map((link, lIdx) => {
              const LinkIcon = link.iconName ? iconMap[link.iconName] : null;

              const LinkContent = (
                <>
                  {LinkIcon && (
                    <div className="p-1.5 rounded-lg bg-slate-100 group-hover/item:bg-[#0f71cd]/10 group-hover/item:text-[#0f71cd] text-slate-500 transition-colors duration-200">
                      <LinkIcon size={16} />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14px] font-semibold text-slate-800 group-hover/item:text-[#0f71cd] transition-colors">
                        {link.name}
                      </span>
                      {link.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase bg-[#0f71cd] text-white rounded-md">
                          {link.badge}
                        </span>
                      )}
                      {link.actionType === "compare" && compareCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wide bg-[#0f71cd] text-white rounded-md flex items-center justify-center min-w-5 h-5 shadow-xs">
                          {compareCount}
                        </span>
                      )}
                    </div>
                    {link.desc && (
                      <p className="text-[12px] text-slate-400 mt-0.5 line-clamp-1">
                        {link.desc}
                      </p>
                    )}
                  </div>
                </>
              );

              if (link.isAction) {
                return (
                  <li key={lIdx}>
                    <button
                      onClick={() => {
                        onClose();
                        if (link.actionType === "compare") {
                          onCompareClick();
                        } else {
                          onCounsellingClick();
                        }
                      }}
                      className="w-full text-left group/item flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                    >
                      {LinkContent}
                    </button>
                  </li>
                );
              }

              return (
                <li key={lIdx}>
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="group/item flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-all duration-200"
                  >
                    {LinkContent}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Dropdown footer info banner */}
      <div className="col-span-2 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
        <span>{item.subtitle}</span>
        <button
          onClick={() => {
            onClose();
            onCounsellingClick();
          }}
          className="flex items-center gap-1 font-semibold text-[#0f71cd] hover:text-[#0c62b2] transition-colors group/link cursor-pointer"
        >
          Talk to Counselors
          <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
