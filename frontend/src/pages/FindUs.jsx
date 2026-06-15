import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, Phone, Mail, ChevronRight, ChevronDown, ArrowRight,
  Compass, X, Calendar, User, Clock, CheckCircle2, Send, Check,
  Navigation
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const branchesData = [
  {
    id: "amd-cg-road",
    state: "Gujarat",
    name: "Ahmedabad CG Road",
    address: "102-104, 323 Corporate Park, Besides- Samudra Complex, Girish Cold Drink Cross Roads, Off C. G. Road, Navrangpura, Ahmedabad, Gujarat - 380009",
    phones: ["079 4014 1919", "+91 78740 03199"],
    email: "info.amd@edeco.in",
    whatsapp: "918278713791"
  },
  {
    id: "amd-iskcon",
    state: "Gujarat",
    name: "Ahmedabad Iskcon",
    address: "106, Palak Prime, Opp. Double Tree by Hilton, Iskcon-Ambli Road, Ahmedabad, Gujarat - 380058",
    phones: ["+91 84908 49007"],
    email: "amd.iskcon@edeco.in",
    whatsapp: "918490849007"
  },
  {
    id: "anand",
    state: "Gujarat",
    name: "Anand",
    address: "Cube - 0675, Ground floor, Opp Bakeland Bakery, Near Sardar Statue, V.V. Nagar, Anand, Gujarat - 388120",
    phones: ["+91 90238 58622"],
    email: "info.anand@edeco.in",
    whatsapp: "919023858622"
  },
  {
    id: "delhi-cp",
    state: "Delhi NCR",
    name: "New Delhi Connaught Place",
    address: "601 & 602, 6th Floor, Ashoka Estate Building, 24 Barakhamba Road, Connaught Place, New Delhi - 110001",
    phones: ["011 4015 1515", "+91 95998 08801"],
    email: "info.delhi@edeco.in",
    whatsapp: "919599808801"
  },
  {
    id: "noida",
    state: "Delhi NCR",
    name: "Noida Sector 18",
    address: "Office No. 302, 3rd Floor, Wave Silver Tower, Sector 18, Noida, Uttar Pradesh - 201301",
    phones: ["+91 95998 08802"],
    email: "info.noida@edeco.in",
    whatsapp: "919599808802"
  },
  {
    id: "blr-ashok",
    state: "Karnataka",
    name: "Bengaluru Ashok Nagar",
    address: "Ground Floor, Unit No. 03, Richmond Plaza, Richmond Circle, Bangalore, Karnataka - 560025",
    phones: ["080 4641 4141", "+91 99000 88201"],
    email: "info.blr@edeco.in",
    whatsapp: "919900088201"
  },
  {
    id: "chd-sec17",
    state: "Punjab & Chandigarh",
    name: "Chandigarh Sector 17",
    address: "SCO 147-148, 2nd Floor, Sector 17-C, Chandigarh, Punjab - 160017",
    phones: ["0172 402 0202", "+91 98888 77601"],
    email: "info.chd@edeco.in",
    whatsapp: "919888877601"
  },
  {
    id: "chennai-nung",
    state: "Tamil Nadu",
    name: "Chennai Nungambakkam",
    address: "No. 12, 4th Floor, Apex Plaza, Nungambakkam High Road, Chennai, Tamil Nadu - 600034",
    phones: ["044 4292 9292", "+91 98400 88301"],
    email: "info.chennai@edeco.in",
    whatsapp: "919840088301"
  },
  {
    id: "hyd-banjara",
    state: "Telangana",
    name: "Hyderabad Banjara Hills",
    address: "5th Floor, Shangrila Plaza, Opposite KBR Park, Road No. 2, Banjara Hills, Hyderabad, Telangana - 500034",
    phones: ["040 4455 5555", "+91 91000 88401"],
    email: "info.hyd@edeco.in",
    whatsapp: "919100088401"
  },
  {
    id: "kochi-ravi",
    state: "Kerala",
    name: "Kochi Ravipuram",
    address: "Door No. 39/3547, 1st Floor, Ravipuram Road, Valanjambalam, Kochi, Kerala - 682016",
    phones: ["0484 411 1111", "+91 97450 88501"],
    email: "info.kochi@edeco.in",
    whatsapp: "919745088501"
  },
  {
    id: "mumbai-church",
    state: "Maharashtra",
    name: "Mumbai Churchgate",
    address: "Office No. 4, Ground Floor, Merchant Chambers, Opp. Churchgate Station, Mumbai, Maharashtra - 400020",
    phones: ["022 4343 4343", "+91 98200 88601"],
    email: "info.mumbai@edeco.in",
    whatsapp: "919820088601"
  },
  {
    id: "pune-fc",
    state: "Maharashtra",
    name: "Pune F.C. Road",
    address: "Office No. 101, 1st Floor, Pride House, F.C. Road, Shivajinagar, Pune, Maharashtra - 411005",
    phones: ["020 4911 1111", "+91 99230 88701"],
    email: "info.pune@edeco.in",
    whatsapp: "919923088701"
  },
  {
    id: "vijayawada",
    state: "Andhra Pradesh",
    name: "Vijayawada Benz Circle",
    address: "Door No. 40-1-140, 3rd Floor, K.P. Towers, Benz Circle, Vijayawada, Andhra Pradesh - 520010",
    phones: ["0866 248 4848", "+91 88866 88501"],
    email: "info.vij@edeco.in",
    whatsapp: "918886688501"
  },
  {
    id: "gurugram-sec44",
    state: "Haryana",
    name: "Gurugram Sector 44",
    address: "100 Tech Park Avenue, Sector 44, Gurugram, Haryana - 122003",
    phones: ["+91 98765 43210"],
    email: "info.gurgaon@edeco.in",
    whatsapp: "919876543210"
  }
];

const visibleStates = [
  "All regions",
  "Gujarat",
  "Delhi NCR",
  "Maharashtra",
  "Karnataka"
];

const dropdownStates = [
  "Punjab & Chandigarh",
  "Tamil Nadu",
  "Telangana",
  "Kerala",
  "Andhra Pradesh",
  "Haryana"
];

export default function FindUs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const stateParam = searchParams.get('state');

  const [selectedState, setSelectedState] = useState(stateParam || "All regions");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBookingBranch, setActiveBookingBranch] = useState(null);
  const [activeVisitBranch, setActiveVisitBranch] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: 'Morning (9:30 AM - 12:30 PM)',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (stateParam) {
      setSelectedState(stateParam);
    } else {
      setSelectedState("All regions");
    }
  }, [stateParam]);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    if (state === "All regions") {
      searchParams.delete('state');
    } else {
      searchParams.set('state', state);
    }
    setSearchParams(searchParams);
  };

  const openBookingModal = (branch) => {
    setActiveBookingBranch(branch);
    setIsSubmitSuccess(false);
    setBookingForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      date: '',
      timeSlot: 'Morning (9:30 AM - 12:30 PM)',
      message: ''
    });
  };

  const openVisitModal = (branch) => {
    setActiveVisitBranch(branch);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitSuccess(true);
    }, 1200);
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Locator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-8 font-display text-left">
            <Link to="/" className="hover:text-[#110051] transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-slate-600">Find nearest Edeco office</span>
          </div>

          {/* Heading */}
          <div className="text-center mb-12 flex flex-col items-center">
            <h1 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Get in Touch
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#110051] font-display leading-tight max-w-3xl mb-4 mx-auto">
              Find a branch, book a call,<br className="hidden md:inline" /> <span className="bg-gradient-to-r from-brand-600 to-brand-purple bg-clip-text text-transparent">or chat with us.</span>
            </h2>
            <p className="text-sm sm:text-base font-semibold text-slate-500 max-w-2xl leading-relaxed mx-auto">
              Your goals, your schedule.<br className="hidden sm:inline" /> Choose the easiest way to connect with our team.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search branches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.015)] focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 outline-none transition-all text-sm font-semibold text-slate-800 placeholder-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="relative flex flex-wrap gap-2.5 pb-4 mb-10 select-none items-center justify-center">
            {visibleStates.map((state) => (
              <button
                key={state}
                onClick={() => {
                  handleStateSelect(state);
                  setIsDropdownOpen(false);
                }}
                className={`px-4.5 py-2.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap border transition-all cursor-pointer ${
                  selectedState === state
                    ? 'bg-[#110051] border-[#110051] text-white shadow-md shadow-[#110051]/15'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-50'
                }`}
              >
                {state}
              </button>
            ))}

            {/* Dropdown for More Regions */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`px-4.5 py-2.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap border transition-all cursor-pointer flex items-center gap-1.5 ${
                  dropdownStates.includes(selectedState)
                    ? 'bg-[#110051] border-[#110051] text-white shadow-md shadow-[#110051]/15'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-50'
                }`}
              >
                <span>{dropdownStates.includes(selectedState) ? `More: ${selectedState}` : 'More'}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    {/* Backdrop wrapper to handle click outside */}
                    <div 
                      className="fixed inset-0 z-10 cursor-default" 
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-2 overflow-hidden text-left"
                    >
                      {dropdownStates.map((state) => (
                        <button
                          key={state}
                          onClick={() => {
                            handleStateSelect(state);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-xs font-bold text-left transition-colors flex items-center justify-between cursor-pointer ${
                            selectedState === state
                              ? 'bg-slate-50 text-[#110051]'
                              : 'text-slate-600 hover:bg-slate-50/80 hover:text-[#110051]'
                          }`}
                        >
                          <span>{state}</span>
                          {selectedState === state && <Check size={12} className="text-brand-600" />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredBranches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBranches.map((branch, index) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-slate-200 transition-all duration-300 group text-left"
                >
                  <div>
                    {/* Header Tag Row */}
                    <div className="flex justify-between items-center mb-4">
                      {/* State Tag */}
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-600">
                        {branch.state}
                      </span>
                      {/* Get Directions */}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.name + ' ' + branch.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-800 font-bold transition-colors cursor-pointer text-xs"
                      >
                        <Navigation size={12} className="shrink-0" /> Get Directions
                      </a>
                    </div>

                    {/* Branch Title */}
                    <h3 className="text-xl font-bold text-[#110051] mb-4.5 font-display group-hover:text-brand-600 transition-colors">
                      {branch.name}
                    </h3>

                    {/* Contact Details */}
                    <div className="space-y-4 mb-6">
                      {/* Address */}
                      <div className="flex gap-3 items-start">
                        <MapPin size={16} className="text-[#110051] shrink-0 mt-0.5" />
                        <div className="text-[13px] leading-relaxed text-slate-600 font-sans font-medium">
                          {branch.address}
                        </div>
                      </div>

                      {/* Phone */}
                      {branch.phones && branch.phones.length > 0 && (
                        <div className="flex gap-3 items-start">
                          <Phone size={16} className="text-[#110051] shrink-0 mt-0.5" />
                          <div className="flex flex-col text-[13px] text-slate-600 font-sans font-medium">
                            {branch.phones.map((phone, i) => (
                              <a
                                key={i}
                                href={`tel:${phone.replace(/\s+/g, '')}`}
                                className="hover:text-brand-600 transition-colors"
                              >
                                {phone}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Email */}
                      <div className="flex gap-3 items-center">
                        <Mail size={16} className="text-[#110051] shrink-0" />
                        <a
                          href={`mailto:${branch.email}`}
                          className="text-[13px] text-slate-600 font-sans font-medium hover:text-brand-600 transition-colors"
                        >
                          {branch.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-50 shrink-0">
                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent("Hi Edeco, I would like to learn more about the admissions guidelines and courses at the " + branch.name + " branch.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 hover:border-[#25D366] hover:bg-[#25D366]/5 text-slate-700 hover:text-[#25D366] text-xs font-bold transition-all duration-200 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                        <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.46 3.473 1.332 4.988l-1.417 5.176 5.302-1.391c1.464.798 3.109 1.218 4.771 1.218h.004c5.502 0 9.984-4.483 9.984-9.99 0-2.67-1.037-5.18-2.92-7.062C17.18 3.037 14.673 2 12.012 2zm6.36 14.887c-.26.732-1.28 1.341-1.765 1.402-.455.057-.9-.122-2.882-.907-2.53-1.002-4.148-3.565-4.275-3.733-.127-.168-.94-1.246-.94-2.38 0-1.134.587-1.692.798-1.92.212-.228.462-.284.618-.284h.442c.137 0 .324-.051.488.349.168.41.577 1.408.627 1.51.05.101.084.22.016.353-.067.135-.1.22-.2.338-.1.118-.21.263-.3.353-.1.101-.205.212-.089.412.115.199.513.844 1.1 1.368.756.674 1.393.882 1.593.98.2.101.316.084.433-.05.118-.135.5-.588.634-.789.135-.201.27-.168.455-.101.185.067 1.178.556 1.38.657.2.101.333.151.383.236.05.084.05.492-.21.732z"/>
                      </svg>
                      <span>WhatsApp</span>
                    </a>

                    {/* Book an Appointment */}
                    <button
                      onClick={() => openBookingModal(branch)}
                      className="w-full flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-[#110051] text-white hover:bg-[#0e003e] font-bold transition-colors"
                    >
                      <span>Book an Appointment</span>
                      <ChevronRight size={14} />
                    </button>

                    {/* Visit Branch */}
                    <button
                      onClick={() => openVisitModal(branch)}
                      className="w-full flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all duration-205 cursor-pointer"
                    >
                      <span>Visit Branch</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <Compass size={48} className="mx-auto text-slate-355 mb-4 animate-pulse-slow" />
              <h3 className="text-lg font-bold text-[#110051] font-display">No branches found</h3>
              <p className="text-slate-400 text-sm font-semibold mt-1">
                Try searching for a different city or region.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />

      {/* Booking Appointment Modal */}
      <AnimatePresence>
        {activeBookingBranch && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveBookingBranch(null)}
              className="fixed inset-0 bg-slate-900 z-50 cursor-default"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[5%] bottom-[5%] md:top-[10%] md:bottom-auto md:max-h-[85vh] md:max-w-lg md:mx-auto bg-white rounded-[32px] shadow-2xl z-50 overflow-hidden flex flex-col border border-slate-100 text-slate-800"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between text-left shrink-0">
                <div>
                  <h3 className="text-xl font-bold text-[#110051] font-display">Book an Appointment</h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    At Edeco {activeBookingBranch.name}
                  </p>
                </div>
                <button
                  onClick={() => setActiveBookingBranch(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1 text-left">
                {isSubmitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[rgb(106,255,217)]/25 text-[#110051] flex items-center justify-center mb-6">
                      <CheckCircle2 size={36} className="text-[#110051]" />
                    </div>
                    <h4 className="text-xl font-bold text-[#110051] mb-2 font-display">Appointment Requested!</h4>
                    <p className="text-sm text-slate-500 font-medium max-w-sm">
                      Thank you. We have received your request for Edeco {activeBookingBranch.name}. A representative will contact you shortly to confirm your booking.
                    </p>
                    <button
                      onClick={() => setActiveBookingBranch(null)}
                      className="mt-8 px-6 py-2.5 bg-[#110051] hover:bg-[#110051]/95 text-white text-sm font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">First Name</label>
                        <input
                          type="text"
                          required
                          value={bookingForm.firstName}
                          onChange={(e) => setBookingForm({...bookingForm, firstName: e.target.value})}
                          placeholder="John"
                          className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-xs font-semibold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Last Name</label>
                        <input
                          type="text"
                          required
                          value={bookingForm.lastName}
                          onChange={(e) => setBookingForm({...bookingForm, lastName: e.target.value})}
                          placeholder="Doe"
                          className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-xs font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email Address</label>
                      <input
                        type="email"
                        required
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-xs font-semibold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                        className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-xs font-semibold text-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Preferred Date</label>
                        <input
                          type="date"
                          required
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                          className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-xs font-semibold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Preferred Slot</label>
                        <select
                          value={bookingForm.timeSlot}
                          onChange={(e) => setBookingForm({...bookingForm, timeSlot: e.target.value})}
                          className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-xs font-semibold text-slate-800"
                        >
                          <option>Morning (9:30 AM - 12:30 PM)</option>
                          <option>Afternoon (12:30 PM - 3:30 PM)</option>
                          <option>Evening (3:30 PM - 6:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Message (Optional)</label>
                      <textarea
                        rows={3}
                        value={bookingForm.message}
                        onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                        placeholder="Admissions guidance, course details..."
                        className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-xs font-semibold text-slate-800 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 bg-[rgb(106,255,217)] text-[#110051] hover:bg-[#110051] hover:text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50 text-sm"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-[#110051] border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Calendar size={16} />
                          Confirm Appointment Request
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Visit Branch Modal */}
      <AnimatePresence>
        {activeVisitBranch && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVisitBranch(null)}
              className="fixed inset-0 bg-slate-900 z-50 cursor-default"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[5%] bottom-[5%] md:top-[10%] md:bottom-auto md:max-h-[85vh] md:max-w-lg md:mx-auto bg-white rounded-[32px] shadow-2xl z-50 overflow-hidden flex flex-col border border-slate-100 text-slate-800"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between text-left shrink-0">
                <div>
                  <h3 className="text-xl font-bold text-[#110051] font-display">{activeVisitBranch.name}</h3>
                  <span className="inline-block px-2.5 py-0.5 mt-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-brand-50 text-brand-600">
                    {activeVisitBranch.state} Edeco Office
                  </span>
                </div>
                <button
                  onClick={() => setActiveVisitBranch(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1 text-left space-y-6">
                {/* Branch Info Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                      <MapPin size={12} className="text-[#110051]" /> Office Address
                    </h4>
                    <p className="text-[13px] font-semibold text-slate-700 leading-relaxed font-sans pl-5">
                      {activeVisitBranch.address}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <Phone size={12} className="text-[#110051]" /> Phone Numbers
                      </h4>
                      <div className="flex flex-col text-[13px] text-slate-700 pl-5 font-sans font-semibold">
                        {activeVisitBranch.phones.map((p, i) => (
                          <a key={i} href={`tel:${p.replace(/\s+/g, '')}`} className="hover:text-brand-600 transition-colors">
                            {p}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <Mail size={12} className="text-[#110051]" /> Email Address
                      </h4>
                      <div className="text-[13px] text-slate-700 pl-5 font-sans font-semibold">
                        <a href={`mailto:${activeVisitBranch.email}`} className="hover:text-brand-600 transition-colors">
                          {activeVisitBranch.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                      <Clock size={12} className="text-[#110051]" /> Operating Hours
                    </h4>
                    <div className="text-[13px] font-semibold text-slate-600 pl-5 font-sans space-y-1">
                      <p className="flex justify-between max-w-[220px]"><span>Monday - Saturday:</span> <span className="text-[#110051]">9:30 AM - 6:00 PM</span></p>
                      <p className="flex justify-between max-w-[220px]"><span>Sunday:</span> <span className="text-red-500 font-bold">Closed</span></p>
                    </div>
                  </div>
                </div>

                {/* Features checklist */}
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <h4 className="text-xs font-bold text-[#110051] mb-2.5 font-display">Services Available at this Office:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
                    {[
                      "Free Admission Counselling",
                      "College Shortlisting",
                      "Visa Guidance",
                      "Document Verification",
                      "Expert Consultations",
                      "Test Preparation Help"
                    ].map((svc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check size={14} className="text-brand-mint shrink-0" />
                        <span>{svc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Map Mockup Placeholder */}
                <div className="h-32 bg-slate-100 rounded-2xl flex items-center justify-center relative overflow-hidden group/map border border-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 via-slate-100 to-slate-200/50 animate-glow"></div>
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <Compass size={24} className="text-brand-purple animate-bounce" />
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Map directions loading...</span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeVisitBranch.name + ' ' + activeVisitBranch.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-brand-blue/80 opacity-0 group-hover/map:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-bold gap-1.5 cursor-pointer"
                  >
                    Open in Google Maps <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex gap-3 shrink-0">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeVisitBranch.name + ' ' + activeVisitBranch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer border border-slate-200"
                >
                  <MapPin size={14} />
                  Get Directions
                </a>
                <button
                  onClick={() => {
                    const b = activeVisitBranch;
                    setActiveVisitBranch(null);
                    openBookingModal(b);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-[rgb(106,255,217)] text-[#110051] hover:bg-[#110051] hover:text-white text-xs font-bold shadow-sm transition-all duration-300 cursor-pointer"
                >
                  <Calendar size={14} />
                  Book Session
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
