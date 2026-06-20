import { CheckCircle, AlertCircle } from 'lucide-react';

export default function AddCourseForm({
  courseForm,
  handleCourseChange,
  handleCourseSubmit,
  submittingCourse,
  courseSuccess,
  courseError
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-black text-[#0F141E] text-lg font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
          Add New Professional Course
        </h3>
        <span className="text-xs font-bold text-slate-400">Expand Career Pathways</span>
      </div>

      <form onSubmit={handleCourseSubmit} className="p-6 sm:p-8 space-y-8 text-left">
        {courseSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm font-semibold">
            <CheckCircle className="shrink-0 text-emerald-600" size={18} />
            {courseSuccess}
          </div>
        )}

        {courseError && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3 text-sm font-semibold">
            <AlertCircle className="shrink-0 text-red-600" size={18} />
            {courseError}
          </div>
        )}

        {/* Section 1: Course Info */}
        <div className="space-y-6">
          <h4 className="text-xs font-black text-[#0f71cd] uppercase tracking-widest border-b pb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            1. Course Specifications
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Course Name *</label>
              <input
                type="text"
                required
                name="name"
                value={courseForm.name}
                onChange={handleCourseChange}
                placeholder="e.g. B.Tech (Computer Science)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Category / Field *</label>
              <select
                name="category"
                value={courseForm.category}
                onChange={handleCourseChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-semibold transition-all h-10"
              >
                <option value="Technology">Technology</option>
                <option value="Management">Management</option>
                <option value="Computer Applications">Computer Applications</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Law">Law</option>
                <option value="Design">Design</option>
                <option value="Arts">Arts</option>
                <option value="Sciences">Sciences</option>
              </select>
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Visual Representation Icon *</label>
              <select
                name="iconName"
                value={courseForm.iconName}
                onChange={handleCourseChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-semibold transition-all h-10"
              >
                <option value="Code2">Code/Technology (Code2)</option>
                <option value="TrendingUp">Analytics/Growth (TrendingUp)</option>
                <option value="Monitor">Computer Applications (Monitor)</option>
                <option value="HeartPulse">Healthcare/Medical (HeartPulse)</option>
                <option value="Briefcase">Business/Management (Briefcase)</option>
                <option value="Scale">Law/Justice (Scale)</option>
              </select>
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Demand Scale *</label>
              <select
                name="demand"
                value={courseForm.demand}
                onChange={handleCourseChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-semibold transition-all h-10"
              >
                <option value="Extreme High">Extreme High</option>
                <option value="High">High</option>
                <option value="Constant High">Constant High</option>
                <option value="Rising">Rising</option>
                <option value="Moderate-High">Moderate-High</option>
                <option value="Moderate">Moderate</option>
              </select>
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Duration *</label>
              <input
                type="text"
                required
                name="duration"
                value={courseForm.duration}
                onChange={handleCourseChange}
                placeholder="e.g. 4 Years (8 Semesters)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Average Starting Salary *</label>
              <input
                type="text"
                required
                name="salary"
                value={courseForm.salary}
                onChange={handleCourseChange}
                placeholder="e.g. ₹8.5 LPA - ₹28 LPA+"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between h-full space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Eligibility Criteria *</label>
            <input
              type="text"
              required
              name="eligibility"
              value={courseForm.eligibility}
              onChange={handleCourseChange}
              placeholder="e.g. 12th with Physics, Chemistry & Math"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
            />
          </div>

          <div className="flex flex-col justify-between h-full space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Core Career Tracks / Job Roles *</label>
            <input
              type="text"
              required
              name="jobs"
              value={courseForm.jobs}
              onChange={courseForm.handleCourseChange || handleCourseChange}
              placeholder="e.g. Software Architect, AI Engineer, Fullstack Developer"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
            />
          </div>
        </div>

        {/* Submission Footer */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={submittingCourse}
            className="px-8 py-3.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white text-sm font-bold rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-md font-tt-talent"
            style={{ fontFamily: '"TT Talent", sans-serif' }}
          >
            {submittingCourse ? 'Adding Course...' : 'Add Professional Course'}
          </button>
        </div>
      </form>
    </div>
  );
}
