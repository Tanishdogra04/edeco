import { Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export default function AddExamForm({
  examForm,
  handleExamChange,
  handleDynamicExamFieldChange,
  addDynamicExamRow,
  removeDynamicExamRow,
  handleExamSubmit,
  submittingExam,
  examSuccess,
  examError
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-black text-[#0F141E] text-lg font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
          Create Entrance Exam Portal
        </h3>
        <span className="text-xs font-bold text-slate-400">Manage Admissions Tests</span>
      </div>

      <form onSubmit={handleExamSubmit} className="p-6 sm:p-8 space-y-8 text-left">
        {examSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm font-semibold">
            <CheckCircle className="shrink-0 text-emerald-600" size={18} />
            {examSuccess}
          </div>
        )}

        {examError && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3 text-sm font-semibold">
            <AlertCircle className="shrink-0 text-red-650" size={18} />
            {examError}
          </div>
        )}

        {/* Section 1: Basic Exam Info */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-[#0f71cd] uppercase tracking-widest border-b pb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            1. Exam Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Exam Short Name *</label>
              <input
                type="text"
                required
                name="name"
                value={examForm.name}
                onChange={handleExamChange}
                placeholder="e.g. BITSAT"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Exam Title *</label>
              <input
                type="text"
                required
                name="fullTitle"
                value={examForm.fullTitle}
                onChange={handleExamChange}
                placeholder="e.g. BITS Admission Test"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Category / Stream</label>
              <select
                name="category"
                value={examForm.category}
                onChange={handleExamChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-semibold transition-all h-10"
              >
                <option value="Engineering">Engineering</option>
                <option value="Management">Management</option>
                <option value="Medical">Medical</option>
                <option value="Law">Law</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Exam Level</label>
              <select
                name="level"
                value={examForm.level}
                onChange={handleExamChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-semibold transition-all h-10"
              >
                <option value="National">National</option>
                <option value="State">State</option>
                <option value="University">University</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Exam Mode</label>
              <input
                type="text"
                name="mode"
                value={examForm.mode}
                onChange={handleExamChange}
                placeholder="e.g. Online / CBT or Offline"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Conducting Body *</label>
              <input
                type="text"
                required
                name="conductingBody"
                value={examForm.conductingBody}
                onChange={handleExamChange}
                placeholder="e.g. BITS Pilani"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Applicants</label>
              <input
                type="text"
                name="applicants"
                value={examForm.applicants}
                onChange={handleExamChange}
                placeholder="e.g. 3.2 Lakhs"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Duration *</label>
              <input
                type="text"
                required
                name="duration"
                value={examForm.duration}
                onChange={handleExamChange}
                placeholder="e.g. 3 Hours"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Frequency</label>
              <input
                type="text"
                name="frequency"
                value={examForm.frequency}
                onChange={handleExamChange}
                placeholder="e.g. Once a year"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Detailed Overview */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-black text-[#0f71cd] uppercase tracking-widest border-b pb-2 mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            2. Detailed Exam Overview
          </h4>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Overview Description *</label>
          <textarea
            name="overview"
            required
            rows={4}
            value={examForm.overview}
            onChange={handleExamChange}
            placeholder="Detailed overview about what this exam checks, test syllabus structure, and scoring guidelines..."
            className="w-full p-4 bg-slate-55 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all resize-none"
          />
        </div>

        {/* Section 3: Highlights */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-xs font-black text-[#0f71cd] uppercase tracking-widest font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              3. Exam Highlights (Quick Facts)
            </h4>
            <button
              type="button"
              onClick={() => addDynamicExamRow('highlights')}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0f71cd] bg-blue-50 px-3.5 py-1.5 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer font-tt-talent"
              style={{ fontFamily: '"TT Talent", sans-serif' }}
            >
              <Plus size={12} /> Add Highlight
            </button>
          </div>

          <div className="space-y-3">
            {examForm.highlights.map((high, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col md:flex-row gap-3 items-end">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Fact Label</span>
                    <input
                      type="text"
                      value={high.label}
                      onChange={(e) => handleDynamicExamFieldChange(idx, 'label', e.target.value, 'highlights')}
                      placeholder="e.g. Negative Marking"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#0f71cd]"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Fact Value</span>
                    <input
                      type="text"
                      value={high.value}
                      onChange={(e) => handleDynamicExamFieldChange(idx, 'value', e.target.value, 'highlights')}
                      placeholder="e.g. Yes (-1 mark for wrong answers)"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#0f71cd]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeDynamicExamRow(idx, 'highlights')}
                  className="p-2 border border-slate-200 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer h-fit"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Dynamic Important Dates */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-xs font-black text-[#0f71cd] uppercase tracking-widest font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              4. Important Dates & Calendar Events
            </h4>
            <button
              type="button"
              onClick={() => addDynamicExamRow('dates')}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0f71cd] bg-blue-50 px-3.5 py-1.5 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer font-tt-talent"
              style={{ fontFamily: '"TT Talent", sans-serif' }}
            >
              <Plus size={12} /> Add Date
            </button>
          </div>

          <div className="space-y-3">
            {examForm.dates.map((dateObj, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col md:flex-row gap-3 items-end">
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Event / Phase Name</span>
                    <input
                      type="text"
                      value={dateObj.event}
                      onChange={(e) => handleDynamicExamFieldChange(idx, 'event', e.target.value, 'dates')}
                      placeholder="e.g. Registration Window"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#0f71cd]"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Date / Timeline</span>
                    <input
                      type="text"
                      value={dateObj.date}
                      onChange={(e) => handleDynamicExamFieldChange(idx, 'date', e.target.value, 'dates')}
                      placeholder="e.g. January 15 - February 20, 2026"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#0f71cd]"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Timeline Status</span>
                    <select
                      value={dateObj.status}
                      onChange={(e) => handleDynamicExamFieldChange(idx, 'status', e.target.value, 'dates')}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold outline-none focus:border-[#0f71cd] h-9"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeDynamicExamRow(idx, 'dates')}
                  className="p-2 border border-slate-200 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer h-fit"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Footer */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={submittingExam}
            className="px-8 py-3.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white text-sm font-bold rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-md font-tt-talent"
            style={{ fontFamily: '"TT Talent", sans-serif' }}
          >
            {submittingExam ? 'Creating Portal...' : 'Create Exam Portal'}
          </button>
        </div>
      </form>
    </div>
  );
}
