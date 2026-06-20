import { Trash2 } from 'lucide-react';

export default function ManageColleges({
  loadingStats,
  colleges,
  handleCollegeDelete
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden text-left">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div>
          <h3 className="font-black text-[#0F141E] text-lg font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Manage College Listings</h3>
          <p className="text-slate-500 text-xs mt-0.5 font-semibold">Delete listings from the database dynamically.</p>
        </div>
        <span className="px-3.5 py-1.5 bg-[#0f71cd] text-white rounded-xl text-xs font-bold w-fit font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
          {colleges.length} Total Colleges
        </span>
      </div>

      {loadingStats ? (
        <div className="p-12 text-center text-slate-400 font-medium text-sm flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full border-2 border-[#0f71cd] border-t-transparent animate-spin"></div>
          Loading database colleges...
        </div>
      ) : colleges.length === 0 ? (
        <div className="p-12 text-center text-slate-400 font-semibold text-sm">
          No colleges found in the database.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">College Name</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Stream</th>
                <th className="px-6 py-4">Ownership</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {colleges.map((col) => (
                <tr key={col.id || col._id} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0">
                        {col.logo ? (
                          col.logo.startsWith('http') ? (
                            <img src={col.logo} alt="" className="w-full h-full object-contain rounded-xl" />
                          ) : (
                            col.logo
                          )
                        ) : (
                          col.name.split(' ').map(w => w.charAt(0)).join('').toUpperCase().substring(0, 3)
                        )}
                      </div>
                      <div className="font-extrabold text-[#0F141E] text-sm">{col.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-600">
                    {col.location}
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-indigo-650">
                    {col.stream}
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500">
                    {col.ownership}
                  </td>
                  <td className="px-6 py-4 text-xs font-extrabold text-amber-600">
                    ★ {col.rating || '4.5'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleCollegeDelete(col.id, col._id)}
                      className="p-2 border border-slate-200 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer h-fit inline-flex items-center justify-center"
                      title="Delete College"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
