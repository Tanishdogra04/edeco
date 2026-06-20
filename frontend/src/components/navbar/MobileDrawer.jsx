import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, BookOpen, Sparkles, GitCompare, Compass, ChevronDown, ChevronRight,
  PhoneCall, ShieldCheck, LogOut, LogIn, Laptop, HeartPulse, Palette,
  GraduationCap, Scale, BarChart3, Award
} from 'lucide-react';

const iconMap = {
  X, BookOpen, Sparkles, GitCompare, Compass, ChevronDown, ChevronRight,
  PhoneCall, ShieldCheck, LogOut, LogIn, Laptop, HeartPulse, Palette,
  GraduationCap, Scale, BarChart3, Award
};

export default function MobileDrawer({
  isOpen,
  toggleMenu,
  darkTheme,
  menuItems,
  compareCount,
  isLoggedIn,
  user,
  logout,
  navigate,
  expandedCategory,
  setExpandedCategory,
  handleCompareClick,
  handleCounsellingClick
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          />

          <motion.div
            key="drawer-container"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 w-80 max-w-[85vw] h-full z-50 shadow-2xl p-6 overflow-y-auto flex flex-col lg:hidden transition-colors duration-300 ${darkTheme
              ? 'bg-slate-950 text-white border-l border-white/10'
              : 'bg-white text-slate-800'
              }`}
          >
            {/* Drawer Header with themed logo and close button */}
            <div className={`flex items-center justify-between pb-6 border-b transition-colors ${darkTheme ? 'border-white/10' : 'border-slate-100'
              }`}>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  toggleMenu();
                  if (window.location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigate('/');
                  }
                }}
              >
                <span className={`font-display font-extrabold text-2xl tracking-tight leading-none ${darkTheme ? 'text-white' : 'text-[#0f71cd]'
                  }`}>
                  edeco
                </span>
              </div>
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${darkTheme
                  ? 'text-slate-400 hover:text-white hover:bg-white/5'
                  : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
                  }`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 py-6 space-y-6">
              {Object.entries(menuItems).map(([key, item]) => {
                const ItemIcon = item.iconName ? iconMap[item.iconName] : null;
                return (
                  <div key={key} className="space-y-2.5">
                    {/* Category Title */}
                    <div className={`flex items-center gap-2 px-1 text-[11px] font-bold uppercase tracking-wider ${darkTheme ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                      {ItemIcon && <ItemIcon size={14} className={darkTheme ? 'text-slate-500' : 'text-slate-400'} />}
                      <span>{item.title}</span>
                    </div>

                    {/* Category Links List */}
                    <ul className="space-y-1">
                      {item.columns.flatMap(c => c.links).map((link, idx) => {
                        const LinkIcon = link.iconName ? iconMap[link.iconName] : null;

                        const LinkContent = (
                          <div className="flex items-start gap-3 w-full">
                            {LinkIcon && (
                              <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${darkTheme
                                ? 'bg-white/5 text-slate-400 group-hover/drawerlink:bg-white/10 group-hover/drawerlink:text-white'
                                : 'bg-slate-50 text-slate-500 group-hover/drawerlink:bg-slate-100 group-hover/drawerlink:text-[#0f71cd]'
                                }`}>
                                <LinkIcon size={14} />
                              </div>
                            )}
                            <div className="flex-1 min-w-0 text-left">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[13.5px] font-semibold truncate">
                                  {link.name}
                                </span>
                                {link.badge && (
                                  <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded shrink-0 uppercase tracking-wider ${darkTheme ? 'bg-white/10 text-white' : 'bg-[#0f71cd]/10 text-[#0f71cd]'
                                    }`}>
                                    {link.badge}
                                  </span>
                                )}
                                {link.actionType === "compare" && compareCount > 0 && (
                                  <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full text-white ${darkTheme ? 'bg-[rgb(106,255,217)] text-slate-950' : 'bg-[#0f71cd]'}`}>
                                    {compareCount}
                                  </span>
                                )}
                              </div>
                              {link.desc && (
                                <p className="text-[11px] text-slate-400 mt-0.5 font-normal truncate">
                                  {link.desc}
                                </p>
                              )}
                            </div>
                          </div>
                        );

                        return (
                          <li key={idx}>
                            {link.isAction ? (
                              <button
                                onClick={() => {
                                  toggleMenu();
                                  if (link.actionType === "compare") {
                                    handleCompareClick();
                                  } else {
                                    handleCounsellingClick();
                                  }
                                }}
                                className={`w-full group/drawerlink flex items-start p-2.5 rounded-xl transition-colors cursor-pointer ${darkTheme
                                  ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#0f71cd]'
                                  }`}
                              >
                                {LinkContent}
                              </button>
                            ) : (
                              <Link
                                to={link.href}
                                onClick={toggleMenu}
                                className={`group/drawerlink flex items-start p-2.5 rounded-xl transition-colors ${darkTheme
                                  ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#0f71cd]'
                                  }`}
                              >
                                {LinkContent}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}

              {/* Resources Shortcut */}
              <div className={`pt-4 border-t transition-colors ${darkTheme ? 'border-white/10' : 'border-slate-100'}`}>
                <Link
                  to="/resources"
                  onClick={toggleMenu}
                  className={`w-full flex items-center gap-2 p-2.5 rounded-xl text-[14px] font-semibold transition-colors ${darkTheme
                    ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#0f71cd]'
                    }`}
                >
                  <BookOpen size={16} className={darkTheme ? 'text-slate-400' : 'text-slate-500'} />
                  <span>Resources</span>
                </Link>
              </div>

              {/* Events Shortcut */}
              <div className="pt-1">
                <Link
                  to="/events"
                  onClick={toggleMenu}
                  className={`w-full flex items-center gap-2 p-2.5 rounded-xl text-[14px] font-semibold transition-colors ${darkTheme
                    ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#0f71cd]'
                    }`}
                >
                  <Sparkles size={16} className={darkTheme ? 'text-slate-400' : 'text-slate-500'} />
                  <span>Events</span>
                </Link>
              </div>

              {/* Compare Colleges Shortcut */}
              <div className={`pt-4 border-t transition-colors ${darkTheme ? 'border-white/10' : 'border-slate-100'
                }`}>
                <button
                  onClick={() => { toggleMenu(); handleCompareClick(); }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-[14px] font-semibold transition-colors cursor-pointer ${darkTheme
                    ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#0f71cd]'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <GitCompare size={16} />
                    Compare Colleges
                  </span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold transition-colors ${darkTheme ? 'bg-white/10 text-white' : 'bg-slate-100 text-[#0f71cd]'
                    }`}>
                    {compareCount} Selected
                  </span>
                </button>
              </div>

              {/* Collapsible Find Us & Branches accordion */}
              <div className={`border-t pt-4 transition-colors ${darkTheme ? 'border-white/10' : 'border-slate-100'}`}>
                <button
                  onClick={() => setExpandedCategory(expandedCategory === 'contact' ? null : 'contact')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-[14px] font-semibold transition-colors cursor-pointer ${darkTheme
                    ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#0f71cd]'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Compass size={16} />
                    Find Us & Branches
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${expandedCategory === 'contact' ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {expandedCategory === 'contact' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4 pr-2 mt-1 space-y-1 text-left"
                    >
                      {/* Mobile support link */}
                      <Link
                        to="/contact"
                        onClick={toggleMenu}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13.5px] font-bold transition-colors ${darkTheme
                          ? 'text-slate-300 hover:text-white hover:bg-white/5'
                          : 'text-[#0f71cd] hover:bg-slate-50'
                          }`}
                      >
                        <PhoneCall size={14} />
                        <span>Get in Touch / Support</span>
                      </Link>

                      {/* Mobile branches heading */}
                      <div className={`text-[10px] font-bold uppercase tracking-wider px-3 pt-2 pb-1 ${darkTheme ? 'text-slate-500' : 'text-slate-400'}`}>
                        Our Branches
                      </div>

                      {[
                        "Andhra Pradesh",
                        "Delhi",
                        "Gujarat",
                        "Haryana",
                        "Karnataka",
                        "Kerala",
                        "Maharashtra",
                        "Punjab",
                        "Tamil Nadu",
                        "Telangana"
                      ].map((state) => (
                        <Link
                          key={state}
                          to={`/find-us?state=${encodeURIComponent(state === 'Delhi' ? 'Delhi NCR' : state === 'Punjab' ? 'Punjab & Chandigarh' : state)}`}
                          onClick={toggleMenu}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${darkTheme
                            ? 'text-slate-400 hover:text-white hover:bg-white/5'
                            : 'text-slate-600 hover:text-[#0f71cd] hover:bg-slate-50'
                            }`}
                        >
                          <span>{state}</span>
                          <ChevronRight size={12} className="text-slate-400" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Drawer Actions */}
            <div className={`pt-6 border-t space-y-3 transition-colors ${darkTheme ? 'border-white/10' : 'border-slate-100'
              }`}>
              <button
                onClick={() => { toggleMenu(); handleCounsellingClick(); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm shadow-md transition-all duration-300 cursor-pointer bg-[#0f71cd] hover:bg-[#0c62b2] text-white shadow-blue-950/20"
              >
                <PhoneCall size={16} />
                Book Call with Expert
              </button>

              {isLoggedIn && user ? (
                <div className={`p-4 border rounded-2xl flex flex-col gap-3 transition-colors ${darkTheme
                  ? 'bg-slate-900 border-white/5'
                  : 'bg-slate-50 border-slate-200'
                  }`}>
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className={`w-10 h-10 rounded-xl object-cover border ${darkTheme ? 'border-white/10' : 'border-slate-200'
                        }`}
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className={`font-extrabold text-sm truncate ${darkTheme ? 'text-white' : 'text-slate-900'}`}>{user.name}</h4>
                      <p className="text-xs text-slate-500 font-semibold truncate">{user.email}</p>
                    </div>
                  </div>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => { toggleMenu(); navigate('/admin'); }}
                      className="w-full py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-100"
                    >
                      <ShieldCheck size={14} />
                      Admin Panel
                    </button>
                  )}
                  <button
                    onClick={() => { toggleMenu(); logout(); navigate('/'); }}
                    className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${darkTheme
                      ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/10'
                      : 'bg-red-55/70 hover:bg-red-100 text-red-600 border-red-100'
                      }`}
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition-all duration-200 ${darkTheme
                    ? 'border-white/10 text-slate-300 hover:bg-white hover:text-[#0f71cd] hover:border-white'
                    : 'border-slate-200 text-slate-700 hover:bg-[#0f71cd] hover:text-white hover:border-[#0f71cd]'
                    }`}
                >
                  <LogIn size={16} />
                  Log In
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
