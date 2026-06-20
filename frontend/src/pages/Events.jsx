import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, ChevronRight,
  Compass, X, Clock, CheckCircle2, Search, Play, ChevronLeft, ChevronDown
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../utils/api';
import { useToast } from '../context/ToastContext';


import {
  eventsData,
  destinations,
  studyLevels,
  eventFormats,
  eventTypes,
  testimonials,
  successVideos
} from '../data/events';

export default function Events() {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDest, setSelectedDest] = useState("All Destinations");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedFormat, setSelectedFormat] = useState("All Formats");
  const [selectedType, setSelectedType] = useState("All Types");

  const [activeRegisterEvent, setActiveRegisterEvent] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const sliderRef = useRef(null);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await api.events.getAll();
        if (data.success) {
          setEvents(data.events);
        }
      } catch (err) {
        console.error('Error fetching events:', err.message);
      }
    };
    fetchEvents();
    window.scrollTo(0, 0);
  }, []);

  // Countdown logic for the main Edeco Fair
  useEffect(() => {
    const targetDate = new Date("June 25, 2026 10:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      const data = await api.events.register(activeRegisterEvent.id, registerForm);
      if (data.success) {
        setRegisterSuccess(true);
        // Refresh event slots dynamically
        const freshEvents = await api.events.getAll();
        if (freshEvents.success) {
          setEvents(freshEvents.events);
        }
      } else {
        toast.error(data.error || 'Failed to register. Please try again.');
      }
    } catch (err) {
      toast.error(err.message || 'An error occurred during event registration.');
    } finally {
      setIsRegistering(false);
    }
  };

  const scrollSlider = (direction) => {
    const { current } = sliderRef;
    if (current) {
      const amount = 360; // Card width + gap
      current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth'
      });
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesDest = selectedDest === "All Destinations" || event.destination === selectedDest;
    const matchesLevel = selectedLevel === "All Levels" || event.studyLevel.includes(selectedLevel);
    const matchesFormat = selectedFormat === "All Formats" || event.format === selectedFormat;
    const matchesType = selectedType === "All Types" || event.type === selectedType;

    const cleanSearch = searchTerm.toLowerCase().trim();
    const matchesSearch = !cleanSearch ||
      event.title.toLowerCase().includes(cleanSearch) ||
      event.desc.toLowerCase().includes(cleanSearch) ||
      (event.speaker && event.speaker.name && event.speaker.name.toLowerCase().includes(cleanSearch));

    return matchesDest && matchesLevel && matchesFormat && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Banner / Big Event Countdown */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-8 font-display text-left">
            <Link to="/" className="hover:text-[#0f71cd] transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-355" />
            <span className="text-slate-600">Upcoming Events</span>
          </div>

          <div className="bg-[#0F141E] rounded-[36px] p-8 sm:p-12 text-left relative overflow-hidden shadow-xl border border-white/5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0f71cd]/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-5">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0f71cd]/10 text-[#0f71cd] border border-[#0f71cd]/20">
                  Featured Event
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                  Edeco National Admissions Fair 2026
                </h1>
                <p className="text-slate-300 text-sm leading-relaxed max-w-xl font-medium">
                  Connect face-to-face with admissions representatives from top global institutes. Register now for free profile evaluation & scholarship opportunities.
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 pt-2">
                  <div className="flex items-center gap-1.5"><Calendar size={14} className="text-[#0f71cd]" /> June 25, 2026</div>
                  <div className="flex items-center gap-1.5"><Clock size={14} className="text-[#0f71cd]" /> 10:00 AM - 5:00 PM</div>
                  <div className="flex items-center gap-1.5"><MapPin size={14} className="text-[#0f71cd]" /> New Delhi HQ</div>
                </div>
              </div>

              {/* Live Countdown widget */}
              <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-6 text-center space-y-4 max-w-sm lg:ml-auto w-full">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> Live Countdown
                </h4>
                <div className="grid grid-cols-4 gap-2 text-white">
                  {[
                    { val: timeLeft.days, unit: "Days" },
                    { val: timeLeft.hours, unit: "Hours" },
                    { val: timeLeft.minutes, unit: "Mins" },
                    { val: timeLeft.seconds, unit: "Secs" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
                      <div className="text-xl sm:text-2xl font-black text-[#0f71cd] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{String(item.val).padStart(2, '0')}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">{item.unit}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => openBookingModal(eventsData[0])}
                  className="w-full py-3.5 rounded-xl bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg font-tt-talent"
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  <Calendar size={14} />
                  Register Now for Free
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-left mb-8">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Webinars & Virtual Events</h2>
            <h3 className="text-3xl font-black text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Upcoming Live Sessions</h3>
          </div>

          {/* Interactive filter controls bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-8 text-left">
            <div className="col-span-9 flex flex-wrap gap-3">
              {/* Destination Filter */}
              <div className="relative inline-block flex-1">
                <select
                  value={selectedDest}
                  onChange={(e) => setSelectedDest(e.target.value)}
                  className="appearance-none w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#0F141E] outline-none focus:border-[#0f71cd] transition-all shadow-sm pr-8 animate-none"
                >
                  {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>

              {/* Study Level Filter */}
              <div className="relative inline-block flex-1">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="appearance-none w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#0F141E] outline-none focus:border-[#0f71cd] transition-all shadow-sm pr-8"
                >
                  {studyLevels.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>

              {/* Event Format Filter */}
              <div className="relative inline-block flex-1">
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="appearance-none w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#0F141E] outline-none focus:border-[#0f71cd] transition-all shadow-sm pr-8"
                >
                  {eventFormats.map(ef => <option key={ef} value={ef}>{ef}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>

              {/* Event Type Filter */}
              <div className="relative inline-block flex-1">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#0F141E] outline-none focus:border-[#0f71cd] transition-all shadow-sm pr-8"
                >
                  {eventTypes.map(et => <option key={et} value={et}>{et}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>

            {/* Search Input */}
            <div className="col-span-3 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0f71cd] transition-all text-xs font-semibold text-[#0F141E]"
              />
            </div>
          </div>

          {/* Active Events List */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {filteredEvents.map((evt, idx) => (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:border-slate-200/80 transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#0f71cd]/10 text-[#0f71cd]">
                        {evt.type}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-slate-50 text-slate-500">
                        {evt.format}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0F141E] font-tt-talent leading-snug group-hover:text-[#0f71cd] transition-colors" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                      {evt.title}
                    </h3>

                    {/* Date/Time/Location Details */}
                    <div className="space-y-2 text-xs font-semibold text-slate-500 pl-0.5">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-[#0f71cd]" />
                        <span>{evt.date} • {evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-[#0f71cd]" />
                        <span>{evt.location}</span>
                      </div>
                    </div>

                    <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                      {evt.desc}
                    </p>
                  </div>

                  {/* Speaker and Register Action */}
                  <div className="flex items-center justify-between pt-5 mt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2.5">
                      <img src={evt.speaker?.avatar || ''} alt={evt.speaker?.name || 'Speaker'} className="w-9 h-9 rounded-xl object-cover border border-slate-100" />
                      <div className="text-left min-w-0">
                        <div className="text-[12px] font-bold text-[#0F141E] truncate">{evt.speaker?.name || 'TBD'}</div>
                        <div className="text-[10px] text-slate-400 font-semibold truncate">{evt.speaker?.role || 'Guest Speaker'}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide hidden sm:inline">
                        {evt.slots}
                      </span>
                      <button
                        onClick={() => openBookingModal(evt)}
                        className="px-4 py-2.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm font-tt-talent"
                        style={{ fontFamily: '"TT Talent", sans-serif' }}
                      >
                        Register Free
                      </button>
                    </div>
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
              <Compass size={44} className="mx-auto text-slate-350 mb-3 animate-pulse-slow" />
              <h3 className="text-lg font-bold text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>No upcoming events available</h3>
              <p className="text-slate-400 text-xs font-semibold mt-1 max-w-sm mx-auto">
                We add new study sessions regularly. Check back soon or register general query to suggest a topic.
              </p>
            </motion.div>
          )}
        </div>

        {/* Student Testimonials Block (Screenshot 2) */}
        <div className="bg-slate-100/50 py-20 border-t border-b border-slate-200/40 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-xs font-bold text-[#0f71cd] uppercase tracking-widest mb-2.5">Student Reviews</h2>
              <h3 className="text-3xl font-black text-[#0F141E] font-tt-talent mb-3" style={{ fontFamily: '"TT Talent", sans-serif' }}>Hear From Our Students</h3>
              <p className="text-slate-600 font-semibold text-sm max-w-xl">
                Thousands of students have trusted Edeco on their learning and study abroad journey. Their success stories inspire us every day.
              </p>
            </div>

            {/* Testimonials Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((test, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[28px] p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:scale-[1.02] hover:shadow-[#0f71cd]/10 transition-all duration-300 border border-slate-100 hover:border-[#0f71cd]/20"
                >
                  <p className="text-sm font-semibold leading-relaxed mb-8 relative z-10 text-slate-700">
                    "{test.quote}"
                  </p>

                  <div className="flex items-center gap-3 relative z-10">
                    <img src={test.avatar} alt={test.name} className="w-10 h-10 rounded-xl object-cover border border-slate-100" />
                    <div>
                      <h4 className="text-sm font-extrabold font-tt-talent leading-tight text-[#0F141E]" style={{ fontFamily: '"TT Talent", sans-serif' }}>{test.name}</h4>
                      <p className="text-[11px] text-[#0f71cd] font-bold">{test.country}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Stories Carousel (Screenshot 3) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Aspirant Videos</h2>
              <h3 className="text-3xl font-black text-[#0F141E] font-tt-talent mb-3" style={{ fontFamily: '"TT Talent", sans-serif' }}>Your Success Story Starts Here</h3>
              <p className="text-slate-500 font-semibold text-sm max-w-xl">
                Join students who achieved their dream college admissions with Edeco. Discover their journeys and begin your today.
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => scrollSlider('left')}
                className="w-12 h-12 rounded-full bg-white hover:bg-[#0f71cd] text-[#0f71cd] hover:text-white border-2 border-[#0f71cd]/10 hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-md hover:shadow-[#0f71cd]/10 cursor-pointer group"
                aria-label="Previous videos"
              >
                <ChevronLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={() => scrollSlider('right')}
                className="w-12 h-12 rounded-full bg-white hover:bg-[#0f71cd] text-[#0f71cd] hover:text-white border-2 border-[#0f71cd]/10 hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-md hover:shadow-[#0f71cd]/10 cursor-pointer group"
                aria-label="Next videos"
              >
                <ChevronRight size={20} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {successVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="min-w-[300px] sm:min-w-[340px] max-w-[340px] bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:border-slate-200/80 transition-all duration-300 group cursor-pointer"
              >
                {/* Thumbnail Image Container */}
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-[#0f71cd] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play size={18} className="fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-[#0f71cd] text-white">
                    {video.highlight}
                  </span>
                </div>

                {/* Card Text details */}
                <div className="p-5 text-left space-y-2">
                  <div className="text-[10px] font-bold text-[#0f71cd] uppercase tracking-widest">
                    {video.tagline}
                  </div>
                  <h4 className="text-sm font-bold text-[#0F141E] font-tt-talent leading-snug truncate" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    {video.title}
                  </h4>
                  <p className="text-[11.5px] text-slate-500 leading-relaxed font-semibold line-clamp-2">
                    {video.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />

      {/* Event Registration Modal */}
      <AnimatePresence>
        {activeRegisterEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveRegisterEvent(null)}
              className="fixed inset-0 bg-slate-900 z-50 cursor-default"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[10%] max-h-[80vh] md:max-w-md md:mx-auto bg-white rounded-[32px] shadow-2xl z-50 overflow-hidden flex flex-col border border-slate-100 text-slate-800"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between text-left shrink-0">
                <div>
                  <h3 className="text-lg font-bold text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Event Registration</h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1 truncate max-w-[280px]">
                    For: {activeRegisterEvent.title}
                  </p>
                </div>
                <button
                  onClick={() => setActiveRegisterEvent(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 hover:text-[#0F141E] cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 text-left">
                {registerSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#0f71cd]/10 text-[#0f71cd] flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} className="text-[#0f71cd]" />
                    </div>
                    <h4 className="text-xl font-bold text-[#0F141E] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Registration Confirmed!</h4>
                    <p className="text-xs text-slate-500 font-semibold max-w-xs leading-relaxed">
                      You're set. An access link and calendar invite have been sent to your email. We'll remind you 15 minutes before we go live.
                    </p>
                    <button
                      onClick={() => setActiveRegisterEvent(null)}
                      className="mt-8 px-6 py-2.5 bg-[#0f71cd] text-white text-xs font-bold rounded-xl hover:bg-[#0c62b2] transition-all cursor-pointer font-tt-talent"
                      style={{ fontFamily: '"TT Talent", sans-serif' }}
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Full Name</label>
                      <input
                        type="text"
                        required
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0f71cd] focus:ring-2 focus:ring-[#0f71cd]/10 outline-none transition-all text-xs font-semibold text-[#0F141E]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email Address</label>
                      <input
                        type="email"
                        required
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0f71cd] focus:ring-2 focus:ring-[#0f71cd]/10 outline-none transition-all text-xs font-semibold text-[#0F141E]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                        className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0f71cd] focus:ring-2 focus:ring-[#0f71cd]/10 outline-none transition-all text-xs font-semibold text-[#0F141E]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isRegistering}
                      className="w-full mt-4 bg-[#0f71cd] text-white hover:bg-[#0c62b2] font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm text-xs font-tt-talent"
                      style={{ fontFamily: '"TT Talent", sans-serif' }}
                    >
                      {isRegistering ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <span>Confirm Free Spot</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Video Testimonial Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="fixed inset-0 bg-slate-950 z-50 cursor-default"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 md:inset-auto md:w-[640px] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-slate-900 rounded-[32px] shadow-2xl z-50 overflow-hidden border border-white/5"
            >
              {/* Header */}
              <div className="px-6 py-4 flex items-center justify-between text-left shrink-0 text-white border-b border-white/5 bg-slate-900/90">
                <div>
                  <h4 className="text-sm font-bold font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{activeVideo.title}</h4>
                  <p className="text-[10px] text-[#0f71cd] font-bold uppercase tracking-wider">{activeVideo.tagline}</p>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-xl hover:bg-white/5 transition-colors text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Meta details footer */}
              <div className="p-6 text-left text-white bg-slate-950/60">
                <p className="text-xs text-slate-350 leading-relaxed font-semibold">
                  {activeVideo.desc}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );

  function openBookingModal(event) {
    setActiveRegisterEvent(event);
    setRegisterSuccess(false);
    setRegisterForm({ name: '', email: '', phone: '' });
  }
}
