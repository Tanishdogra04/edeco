import { Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

const availableFacilities = [
  { name: 'Smart Classrooms', iconName: 'Building2' },
  { name: 'Digital Library', iconName: 'FileText' },
  { name: 'High-Tech Labs', iconName: 'CheckCircle' },
  { name: 'Sports Complex', iconName: 'Award' },
  { name: 'Campus Wi-Fi', iconName: 'Globe' },
  { name: 'AC Hostels', iconName: 'Users' }
];

export default function AddCollegeForm({
  collegeForm,
  handleCollegeChange,
  handleDynamicCollegeFieldChange,
  addDynamicCollegeRow,
  removeDynamicCollegeRow,
  handleFacilityCheckboxChange,
  handleCollegeSubmit,
  submittingCollege,
  collegeSuccess,
  collegeError
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-black text-[#0F141E] text-lg font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
          Add New College Profile
        </h3>
        <span className="text-xs font-bold text-slate-400">100% Dynamic Synchronization</span>
      </div>

      <form onSubmit={handleCollegeSubmit} className="p-6 sm:p-8 space-y-8 text-left">
        {collegeSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm font-semibold">
            <CheckCircle className="shrink-0 text-emerald-600" size={18} />
            {collegeSuccess}
          </div>
        )}

        {collegeError && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3 text-sm font-semibold">
            <AlertCircle className="shrink-0 text-red-600" size={18} />
            {collegeError}
          </div>
        )}

        {/* Section 1: Basic Info */}
        <div className="space-y-6">
          <h4 className="text-xs font-black text-[#0f71cd] uppercase tracking-widest border-b pb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            1. Basic Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">College Name *</label>
              <input
                type="text"
                required
                name="name"
                value={collegeForm.name}
                onChange={handleCollegeChange}
                placeholder="e.g. Birla Institute of Technology & Science (BITS)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Location *</label>
              <input
                type="text"
                required
                name="location"
                value={collegeForm.location}
                onChange={handleCollegeChange}
                placeholder="e.g. Pilani, Rajasthan"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Stream / Category</label>
              <select
                name="stream"
                value={collegeForm.stream}
                onChange={handleCollegeChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-semibold transition-all h-10"
              >
                <option value="Engineering">Engineering</option>
                <option value="Management">Management</option>
                <option value="Medical">Medical</option>
                <option value="Law">Law</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Ownership Type</label>
              <select
                name="ownership"
                value={collegeForm.ownership}
                onChange={handleCollegeChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-semibold transition-all h-10"
              >
                <option value="Public/Government">Public/Government</option>
                <option value="Private">Private</option>
                <option value="Autonomous">Autonomous</option>
              </select>
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Logo Image URL</label>
              <input
                type="text"
                name="logo"
                value={collegeForm.logo}
                onChange={handleCollegeChange}
                placeholder="e.g. https://domain.com/logo.png"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Cover Image URL</label>
              <input
                type="text"
                name="image"
                value={collegeForm.image}
                onChange={handleCollegeChange}
                placeholder="e.g. https://images.unsplash.com/photo-..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between h-full space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Accreditation / Approvals (comma-separated)</label>
            <input
              type="text"
              name="approvals"
              value={collegeForm.approvals}
              onChange={handleCollegeChange}
              placeholder="e.g. AICTE, UGC, NAAC A+"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
            />
          </div>

          <div className="flex flex-col justify-between h-full space-y-1.5 mt-4">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Campus Gallery Image URLs (comma-separated)</label>
            <input
              type="text"
              name="images"
              value={collegeForm.images}
              onChange={handleCollegeChange}
              placeholder="e.g. https://domain.com/campus1.jpg, https://domain.com/campus2.jpg"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
            />
          </div>
        </div>

        {/* Section 2: Stats & Key Metrics */}
        <div className="space-y-6">
          <h4 className="text-xs font-black text-[#0f71cd] uppercase tracking-widest border-b pb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            2. Stats & Key Metrics
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Annual Fees *</label>
              <input
                type="text"
                required
                name="fees"
                value={collegeForm.fees}
                onChange={handleCollegeChange}
                placeholder="e.g. ₹4.5 Lakhs / Yr"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Average Placement Package *</label>
              <input
                type="text"
                required
                name="package"
                value={collegeForm.package}
                onChange={handleCollegeChange}
                placeholder="e.g. ₹19.2 LPA Avg"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Highest Package *</label>
              <input
                type="text"
                required
                name="highestPackage"
                value={collegeForm.highestPackage}
                onChange={handleCollegeChange}
                placeholder="e.g. ₹72.0 LPA"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">NIRF Rank / Tagline</label>
              <input
                type="text"
                name="nirf"
                value={collegeForm.nirf}
                onChange={handleCollegeChange}
                placeholder="e.g. #20 Engineering"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Visual Rating (out of 5)</label>
              <input
                type="text"
                name="rating"
                value={collegeForm.rating}
                onChange={handleCollegeChange}
                placeholder="e.g. 4.7"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>

            <div className="flex flex-col justify-between h-full space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Quick Description *</label>
              <input
                type="text"
                required
                name="description"
                value={collegeForm.description}
                onChange={handleCollegeChange}
                placeholder="Brief tagline/one-line overview..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Facilities Checkboxes */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-[#0f71cd] uppercase tracking-widest border-b pb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            3. Campus Facilities
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {availableFacilities.map((fac) => {
              const isChecked = !!collegeForm.facilities.find(f => f.name === fac.name);
              return (
                <label
                  key={fac.name}
                  className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer text-xs font-bold transition-all ${
                    isChecked
                      ? 'bg-blue-50 border-[#0f71cd] text-[#0f71cd]'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleFacilityCheckboxChange(fac.name, fac.iconName)}
                    className="hidden"
                  />
                  <span>{fac.name}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Section 4: Detailed About */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-black text-[#0f71cd] uppercase tracking-widest border-b pb-2 mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
            4. Detailed Profile Biography
          </h4>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">About the College *</label>
          <textarea
            name="about"
            required
            rows={4}
            value={collegeForm.about}
            onChange={handleCollegeChange}
            placeholder="Detailed background history, student strength, ranking accomplishments, and overview..."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#0f71cd]/30 focus:bg-white text-sm font-medium transition-all resize-none"
          />
        </div>

        {/* Section 5: Dynamic Courses List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-xs font-black text-[#0f71cd] uppercase tracking-widest font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              5. Course Offerings & Intake Details
            </h4>
            <button
              type="button"
              onClick={() => addDynamicCollegeRow('courses')}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0f71cd] bg-blue-50 px-3.5 py-1.5 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer font-tt-talent"
              style={{ fontFamily: '"TT Talent", sans-serif' }}
            >
              <Plus size={12} /> Add Course
            </button>
          </div>

          <div className="space-y-3">
            {collegeForm.courses.map((course, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col md:flex-row gap-3 items-end">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Course Name</span>
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => handleDynamicCollegeFieldChange(idx, 'name', e.target.value, 'courses')}
                      placeholder="e.g. B.Tech Computer Science"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#0f71cd]"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Annual Fees</span>
                    <input
                      type="text"
                      value={course.fees}
                      onChange={(e) => handleDynamicCollegeFieldChange(idx, 'fees', e.target.value, 'courses')}
                      placeholder="e.g. ₹2.2 Lakhs / yr"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#0f71cd]"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Duration</span>
                    <input
                      type="text"
                      value={course.duration}
                      onChange={(e) => handleDynamicCollegeFieldChange(idx, 'duration', e.target.value, 'courses')}
                      placeholder="e.g. 4 Years"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#0f71cd]"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Eligibility Criteria</span>
                    <input
                      type="text"
                      value={course.eligibility}
                      onChange={(e) => handleDynamicCollegeFieldChange(idx, 'eligibility', e.target.value, 'courses')}
                      placeholder="e.g. 10+2 with 75% + JEE"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#0f71cd]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeDynamicCollegeRow(idx, 'courses')}
                  className="p-2 border border-slate-200 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer h-fit"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Dynamic Why Choose Us */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-xs font-black text-[#0f71cd] uppercase tracking-widest font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              6. Why Choose Us Features
            </h4>
            <button
              type="button"
              onClick={() => addDynamicCollegeRow('whyChoose')}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0f71cd] bg-blue-50 px-3.5 py-1.5 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer font-tt-talent"
              style={{ fontFamily: '"TT Talent", sans-serif' }}
            >
              <Plus size={12} /> Add Feature
            </button>
          </div>

          <div className="space-y-3">
            {collegeForm.whyChoose.map((why, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col md:flex-row gap-3 items-end">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Feature Title</span>
                    <input
                      type="text"
                      value={why.title}
                      onChange={(e) => handleDynamicCollegeFieldChange(idx, 'title', e.target.value, 'whyChoose')}
                      placeholder="e.g. World-Class Faculty"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#0f71cd]"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Short Description</span>
                    <input
                      type="text"
                      value={why.desc}
                      onChange={(e) => handleDynamicCollegeFieldChange(idx, 'desc', e.target.value, 'whyChoose')}
                      placeholder="Describe why this feature stands out to students..."
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#0f71cd]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeDynamicCollegeRow(idx, 'whyChoose')}
                  className="p-2 border border-slate-200 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer h-fit"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Dynamic FAQs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-xs font-black text-[#0f71cd] uppercase tracking-widest font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              7. FAQ Accordion Items
            </h4>
            <button
              type="button"
              onClick={() => addDynamicCollegeRow('faqs')}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0f71cd] bg-blue-50 px-3.5 py-1.5 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer font-tt-talent"
              style={{ fontFamily: '"TT Talent", sans-serif' }}
            >
              <Plus size={12} /> Add FAQ
            </button>
          </div>

          <div className="space-y-3">
            {collegeForm.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col md:flex-row gap-3 items-end">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Question</span>
                    <input
                      type="text"
                      value={faq.q}
                      onChange={(e) => handleDynamicCollegeFieldChange(idx, 'q', e.target.value, 'faqs')}
                      placeholder="e.g. What is the intake capacity?"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#0f71cd]"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Answer</span>
                    <input
                      type="text"
                      value={faq.a}
                      onChange={(e) => handleDynamicCollegeFieldChange(idx, 'a', e.target.value, 'faqs')}
                      placeholder="Provide the detailed answer to help student queries..."
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-[#0f71cd]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeDynamicCollegeRow(idx, 'faqs')}
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
            disabled={submittingCollege}
            className="px-8 py-3.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white text-sm font-bold rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-md font-tt-talent"
            style={{ fontFamily: '"TT Talent", sans-serif' }}
          >
            {submittingCollege ? 'Creating Profile...' : 'Create College Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
