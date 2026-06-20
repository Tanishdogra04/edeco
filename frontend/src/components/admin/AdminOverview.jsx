import { Building2, BookOpenCheck, PhoneCall, Sparkles, Mail } from 'lucide-react';

export default function AdminOverview({
  user,
  loadingStats,
  stats,
  counsellingRequests,
  updatingRequestId,
  handleStatusChange
}) {
  return (
    <div className="space-y-6">
      {/* Stats Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-5 shadow-sm group hover:border-[#0f71cd]/30 transition-all text-left">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0f71cd] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-350">
            <Building2 size={28} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Colleges</span>
            <h3 className="text-3xl font-black text-slate-850 mt-0.5 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              {loadingStats ? '...' : stats.collegesCount}
            </h3>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-5 shadow-sm group hover:border-[#0f71cd]/30 transition-all text-left">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0f71cd] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-350">
            <BookOpenCheck size={28} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Entrance Exams</span>
            <h3 className="text-3xl font-black text-slate-850 mt-0.5 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              {loadingStats ? '...' : stats.examsCount}
            </h3>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-5 shadow-sm group hover:border-[#0f71cd]/30 transition-all text-left">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0f71cd] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-350">
            <PhoneCall size={28} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Counselling Requests</span>
            <h3 className="text-3xl font-black text-slate-850 mt-0.5 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              {loadingStats ? '...' : stats.counsellingCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Dashboard Greetings */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4 text-left">
        <div className="flex items-center gap-2 text-[#0f71cd]">
          <Sparkles size={20} className="animate-pulse" />
          <h3 className="font-extrabold text-lg text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            Welcome back, {user.name}!
          </h3>
        </div>
        <p className="text-slate-655 leading-relaxed font-medium text-sm">
          This administrative dashboard allows you to seed new listings to the portal instantly. Newly created colleges will immediately support reviews, dynamic eligibility checks, compared actions, and brochures downloads on the frontend.
        </p>
        <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-bold text-slate-400">
          <div>User Email: <span className="text-slate-700 font-semibold">{user.email}</span></div>
          <div>•</div>
          <div>Assigned Privilege: <span className="text-orange-655 uppercase font-black">{user.role}</span></div>
        </div>
      </div>

      {/* Recent Counselling Enquiries & Leads */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden text-left">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <h3 className="font-black text-[#0F141E] text-lg font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              Admissions Counselling Leads
            </h3>
            <p className="text-slate-500 text-xs mt-0.5 font-semibold">Real-time dynamic updates of student query logs and callback requests.</p>
          </div>
          <span className="px-3.5 py-1.5 bg-[#0f71cd] text-white rounded-xl text-xs font-bold w-fit font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            {counsellingRequests.length} Active Leads
          </span>
        </div>

        {loadingStats ? (
          <div className="p-12 text-center text-slate-400 font-medium text-sm flex items-center justify-center gap-2">
            <div className="w-5 h-5 rounded-full border-2 border-[#0f71cd] border-t-transparent animate-spin"></div>
            Loading database enquiries...
          </div>
        ) : counsellingRequests.length === 0 ? (
          <div className="p-12 text-center text-slate-400 font-medium text-sm">
            No counselling requests found in database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Student Details</th>
                  <th className="px-6 py-4">Academic Background</th>
                  <th className="px-6 py-4">Target / Score</th>
                  <th className="px-6 py-4">Query Details</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {counsellingRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-extrabold text-slate-900 text-sm">{req.name}</div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5 flex flex-col gap-0.5">
                        <span className="flex items-center gap-1"><Mail size={12} className="text-slate-400" /> {req.email}</span>
                        <span className="flex items-center gap-1"><PhoneCall size={12} className="text-slate-400" /> {req.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-bold text-slate-800">{req.stream || 'N/A'}</div>
                      <div className="text-[11px] text-slate-500 font-semibold mt-0.5">{req.education || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      {req.exam ? (
                        <>
                          <div className="text-xs font-bold text-slate-800">{req.exam}</div>
                          <div className="text-[11px] text-orange-655 font-extrabold mt-0.5">Score: {req.score || 'N/A'}</div>
                        </>
                      ) : (
                        <span className="text-xs text-slate-400 font-semibold">No Exam Info</span>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-xs text-left">
                      <div className="text-xs text-slate-700 font-medium leading-relaxed line-clamp-2 hover:line-clamp-none transition-all cursor-help" title={req.query}>
                        {req.query || 'Callback request'}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
                        Intake Year: {req.year || '2026'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-500">
                      {new Date(req.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={req.status}
                        disabled={updatingRequestId === req._id}
                        onChange={(e) => handleStatusChange(req._id, e.target.value)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg border outline-none cursor-pointer transition-colors ${
                          req.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-100'
                            : req.status === 'Contacted'
                            ? 'bg-blue-50 text-blue-700 border-blue-100'
                            : req.status === 'Resolved'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
