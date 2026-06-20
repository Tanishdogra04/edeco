import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const mockApplications = [
  { college: "IIT Bombay", course: "B.Tech Computer Science", status: "Shortlisted", date: "May 28, 2026", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  { college: "BITS Pilani", course: "B.Tech Electrical & Electronics", status: "Applied", date: "May 29, 2026", color: "bg-blue-50 text-blue-700 border-blue-100" },
  { college: "IIM Ahmedabad", course: "MBA General Program", status: "Under Review", date: "May 30, 2026", color: "bg-amber-50 text-amber-700 border-amber-100" }
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();

  const [editName, setEditName] = useState(user ? user.name : '');
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [prevUser, setPrevUser] = useState(user);
  if (user !== prevUser) {
    setPrevUser(user);
    if (user) {
      setEditName(user.name);
    }
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-[#0f71cd]/10 selection:text-[#0F141E] text-[#0F141E]">
      {/* Dashboard Top Navigation */}
      <div className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <Link to="/" className="flex items-center gap-1.5 hover:opacity-90 transition-opacity">
          <span className="font-tt-talent font-black text-2xl tracking-tight text-[#0F141E]" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            edeco<span className="text-[#0f71cd] font-black">.</span>
          </span>
        </Link>
        <button 
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-650 text-slate-700 text-sm font-bold transition-all cursor-pointer border border-slate-200 hover:border-red-100 font-tt-talent"
          style={{ fontFamily: '"TT Talent", sans-serif' }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Dashboard Grid Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Management Section */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between h-fit">
          <div>
            <div className="text-center pb-6 border-b border-slate-100">
              <div className="relative inline-block mx-auto mb-4">
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-100 shadow-md" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md">
                  <Sparkles size={14} />
                </div>
              </div>
              <h3 className="text-xl font-black text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{user.name}</h3>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">{user.email}</p>
              <span className="inline-block mt-3 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-[10px] uppercase tracking-wider font-bold rounded-lg">
                Registered {user.estd}
              </span>
            </div>

            <div className="mt-8 space-y-5">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Account Profile</h4>
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Display Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0f71cd] focus:ring-2 focus:ring-[#0f71cd]/10 outline-none transition-all font-semibold text-[#0F141E] text-sm"
                />
              </div>
              <button
                onClick={() => {
                  if (editName.trim()) {
                    updateProfile(editName.trim(), user.avatar);
                    setProfileSuccess(true);
                    setTimeout(() => setProfileSuccess(false), 2000);
                  }
                }}
                className="w-full bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold py-3 rounded-xl text-xs transition-all duration-300 cursor-pointer font-tt-talent"
                style={{ fontFamily: '"TT Talent", sans-serif' }}
              >
                Save Display Name
              </button>

              <AnimatePresence>
                {profileSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold rounded-xl text-center"
                  >
                    Profile name updated successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 font-semibold flex items-center justify-center gap-2">
            <ShieldCheck size={16} className="text-[#0f71cd]" />
            Verified Student Session
          </div>
        </div>

        {/* Active Application Status Tracker */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-lg font-black text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Active Applications</h3>
                <p className="text-xs text-slate-400 font-semibold">Track your application review status with edeco. partners</p>
              </div>
              <span className="px-3 py-1.5 bg-slate-100 rounded-xl text-slate-700 text-xs font-bold border border-slate-200">
                {mockApplications.length} Total
              </span>
            </div>

            <div className="space-y-4">
              {mockApplications.map((app, i) => (
                <div key={i} className="p-5 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-slate-350 transition-colors">
                  <div className="flex items-start gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-tt-talent font-black text-xs shrink-0" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                      {app.college.split(' ').map(w => w[0]).join('').substring(0, 3)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#0F141E] text-base font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{app.college}</h4>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">{app.course}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2">Applied on {app.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${app.color}`}>
                      {app.status}
                    </span>
                    <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-[#0F141E] text-xs font-bold rounded-xl border border-slate-200 transition-colors font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Consulting Banner */}
          <div className="bg-[#0F141E] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/40 rounded-full blur-3xl"></div>
            <h3 className="text-xl font-black mb-2 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              <Sparkles size={20} className="text-[#0f71cd] animate-pulse" />
              Want an application review?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-lg mb-6 font-medium">
              Connect with our premium advisors to review your application form details, review essays, and double-check course eligibility before submission.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[#0f71cd] text-white hover:bg-[#0c62b2] font-bold px-6 py-3 rounded-xl text-xs transition-all font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              Schedule Consultation <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
