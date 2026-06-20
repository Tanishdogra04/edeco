import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, ChevronDown, X, Compass, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import mapIllustration from '../assets/map_illustration.png';

// Centralized Mock Data
import { branchesData, visibleStates, dropdownStates } from '../data/branches';

// Decomposed Components
import BranchCard from '../components/find-us/BranchCard';
import BookingModal from '../components/find-us/BookingModal';
import VisitModal from '../components/find-us/VisitModal';

export default function FindUs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const stateParam = searchParams.get('state');

  const [searchTerm, setSearchTerm] = useState("");
  const [activeBookingBranch, setActiveBookingBranch] = useState(null);
  const [activeVisitBranch, setActiveVisitBranch] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedState = stateParam || "All regions";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStateSelect = (state) => {
    if (state === "All regions") {
      searchParams.delete('state');
    } else {
      searchParams.set('state', state);
    }
    setSearchParams(searchParams);
  };

  const filteredBranches = branchesData.filter(branch => {
    const matchesState = selectedState === "All regions" || branch.state === selectedState;
    const cleanSearch = searchTerm.toLowerCase().trim();
    const matchesSearch = !cleanSearch ||
      branch.name.toLowerCase().includes(cleanSearch) ||
      branch.address.toLowerCase().includes(cleanSearch) ||
      branch.state.toLowerCase().includes(cleanSearch);

    return matchesState && matchesSearch;
  });

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-b from-blue-50/20 via-white to-slate-50/20 flex flex-col justify-between relative overflow-hidden">
      <div>
        <Navbar />

        {/* Hero & Locator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-10">

            {/* Left Column: Content + Filters */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 mb-6 font-display">
                <Link to="/" className="hover:text-[#0f71cd] transition-colors">Home</Link>
                <ChevronRight size={10} className="text-slate-355" />
                <span className="text-slate-500">Find nearest Edeco office</span>
              </div>

              {/* Tag / Badge */}
              <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-[#0f71cd]/8 text-[#0f71cd] mb-6">
                Get in touch
              </span>

              {/* Main Heading */}
              <h1
                className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-[#0F141E] font-tt-talent leading-[1.1] mb-6"
                style={{ fontFamily: '"TT Talent", sans-serif' }}
              >
                Find a branch, book a call,<br />
                <span className="text-[#0f71cd]">or chat with us.</span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base font-semibold text-slate-500 mb-8 leading-relaxed max-w-xl">
                Your goals, your schedule.<br className="hidden sm:inline" /> Choose the easiest way to connect with our team.
              </p>

              {/* Search Bar */}
              <div className="relative mb-6 w-full max-w-xl">
                <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search branches, cities or landmarks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white border border-slate-100/80 rounded-2xl shadow-[0_8px_30px_rgba(15,113,205,0.03)] focus:border-[#0f71cd] focus:ring-2 focus:ring-[#0f71cd]/10 outline-none transition-all text-sm font-semibold text-[#0F141E] placeholder-slate-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-slate-50 text-slate-450 hover:text-slate-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Filter Pills */}
              <div className="relative flex flex-wrap gap-2 pb-2 select-none items-center text-left">
                {visibleStates.map((state) => (
                  <button
                    key={state}
                    onClick={() => {
                      handleStateSelect(state);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-4.5 py-2.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap border transition-all cursor-pointer font-tt-talent ${selectedState === state
                        ? 'bg-[#0f71cd] border-[#0f71cd] text-white shadow-md shadow-[#0f71cd]/15'
                        : 'bg-white border-slate-200/80 text-slate-600 hover:border-[#0f71cd] hover:text-[#0f71cd] hover:bg-slate-50'
                      }`}
                    style={{ fontFamily: '"TT Talent", sans-serif' }}
                  >
                    {state}
                  </button>
                ))}

                {/* Dropdown for More Regions */}
                <div className="relative text-left">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`px-4.5 py-2.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap border transition-all cursor-pointer flex items-center gap-1.5 font-tt-talent ${dropdownStates.includes(selectedState)
                        ? 'bg-[#0f71cd] border-[#0f71cd] text-white shadow-md shadow-[#0f71cd]/15'
                        : 'bg-white border-slate-200/80 text-slate-600 hover:border-[#0f71cd] hover:text-[#0f71cd] hover:bg-slate-50'
                      }`}
                    style={{ fontFamily: '"TT Talent", sans-serif' }}
                  >
                    <span>{dropdownStates.includes(selectedState) ? `More: ${selectedState}` : 'More'}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10 cursor-default"
                          onClick={() => setIsDropdownOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-2 overflow-hidden text-left"
                        >
                          {dropdownStates.map((state) => (
                            <button
                              key={state}
                              onClick={() => {
                                handleStateSelect(state);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-2.5 text-xs font-bold text-left transition-colors flex items-center justify-between cursor-pointer ${selectedState === state
                                  ? 'bg-slate-50 text-[#0f71cd]'
                                  : 'text-slate-600 hover:bg-slate-50/80 hover:text-[#0f71cd]'
                                }`}
                            >
                              <span>{state}</span>
                              {selectedState === state && <Check size={12} className="text-[#0f71cd]" />}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Map Pin Illustration */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div className="absolute w-72 h-72 bg-[#0f71cd]/5 rounded-full blur-3xl -z-10" />
              <div className="w-full max-w-[420px] lg:max-w-none">
                <img
                  src={mapIllustration}
                  alt="Edeco Branch Locator Map"
                  className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_15px_30px_rgba(15,113,205,0.03)]"
                />
              </div>
            </div>

          </div>

          {/* Cards Grid */}
          <div id="stores-section" className="scroll-mt-28">
            {filteredBranches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBranches.map((branch, index) => (
                  <BranchCard
                    key={branch.id}
                    branch={branch}
                    index={index}
                    onBookClick={(b) => setActiveBookingBranch(b)}
                    onVisitClick={(b) => setActiveVisitBranch(b)}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center"
              >
                <Compass size={48} className="mx-auto text-slate-300 mb-4 animate-pulse-slow" />
                <h3 className="text-lg font-bold text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>No branches found</h3>
                <p className="text-slate-400 text-sm font-semibold mt-1">
                  Try searching for a different city or region.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* Booking Appointment Modal */}
      <AnimatePresence>
        {activeBookingBranch && (
          <BookingModal
            branch={activeBookingBranch}
            onClose={() => setActiveBookingBranch(null)}
          />
        )}
      </AnimatePresence>

      {/* Visit Branch Modal */}
      <AnimatePresence>
        {activeVisitBranch && (
          <VisitModal
            branch={activeVisitBranch}
            onClose={() => setActiveVisitBranch(null)}
            onBookClick={(b) => {
              setActiveVisitBranch(null);
              setActiveBookingBranch(b);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
