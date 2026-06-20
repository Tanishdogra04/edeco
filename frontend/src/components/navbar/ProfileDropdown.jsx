import { motion, AnimatePresence } from 'framer-motion';
import { User, ShieldCheck, LogOut } from 'lucide-react';

export default function ProfileDropdown({
  isProfileOpen,
  setIsProfileOpen,
  user,
  logout,
  navigate
}) {
  return (
    <AnimatePresence>
      {isProfileOpen && (
        <>
          <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsProfileOpen(false)}></div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2.5 w-64 rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 z-50 text-slate-800"
          >
            <div className="flex items-center gap-3 pb-3 mb-3 border-b border-slate-100">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover border border-slate-100" />
              <div className="min-w-0 flex-1">
                <h4 className="font-black text-sm text-slate-900 truncate">{user.name}</h4>
                <p className="text-xs text-slate-500 font-semibold truncate text-left">{user.email}</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="px-3 py-1 text-[9px] font-black text-slate-400 uppercase tracking-widest text-left">
                {user.role === 'admin' ? 'Admin Portal' : 'Student Portal'}
              </div>
              {user.role !== 'admin' ? (
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors text-left cursor-pointer"
                >
                  <User size={14} />
                  <span>My Dashboard</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/admin');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-indigo-700 hover:bg-indigo-50 text-xs font-bold transition-colors text-left cursor-pointer"
                >
                  <ShieldCheck size={14} />
                  <span>Admin Panel</span>
                </button>
              )}
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  logout();
                  navigate('/');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold transition-colors text-left cursor-pointer"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
