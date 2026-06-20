import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ChevronRight, ArrowRight, Navigation } from 'lucide-react';

export default function BranchCard({ branch, index, onBookClick, onVisitClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-slate-200 transition-all duration-300 group text-left"
    >
      <div>
        {/* Header Tag Row */}
        <div className="flex justify-between items-center mb-4">
          {/* State Tag */}
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0f71cd]/10 text-[#0f71cd]">
            {branch.state}
          </span>
          {/* Get Directions */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.name + ' ' + branch.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/8 text-amber-600 hover:bg-amber-500 hover:text-white font-bold transition-all duration-200 cursor-pointer text-[10px] sm:text-xs tracking-wide"
          >
            <Navigation size={11} className="shrink-0" /> Get Directions
          </a>
        </div>

        {/* Branch Title */}
        <h3 className="text-xl font-bold text-[#0F141E] mb-4.5 font-tt-talent group-hover:text-[#0f71cd] transition-colors" style={{ fontFamily: '"TT Talent", sans-serif' }}>
          {branch.name}
        </h3>

        {/* Contact Details */}
        <div className="space-y-4 mb-6 text-[#0F141E]">
          {/* Address */}
          <div className="flex gap-3 items-start">
            <MapPin size={16} className="text-[#0f71cd] shrink-0 mt-0.5" />
            <div className="text-[13px] leading-relaxed text-slate-600 font-sans font-medium">
              {branch.address}
            </div>
          </div>

          {/* Phone */}
          {branch.phones && branch.phones.length > 0 && (
            <div className="flex gap-3 items-start">
              <Phone size={16} className="text-[#0f71cd] shrink-0 mt-0.5" />
              <div className="flex flex-col text-[13px] text-slate-600 font-sans font-medium">
                {branch.phones.map((phone, i) => (
                  <a
                    key={i}
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="hover:text-[#0f71cd] transition-colors"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Email */}
          <div className="flex gap-3 items-center">
            <Mail size={16} className="text-[#0f71cd] shrink-0" />
            <a
              href={`mailto:${branch.email}`}
              className="text-[13px] text-slate-600 font-sans font-medium hover:text-[#0f71cd] transition-colors"
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
            <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.46 3.473 1.332 4.988l-1.417 5.176 5.302-1.391c1.464.798 3.109 1.218 4.771 1.218h.004c5.502 0 9.984-4.483 9.984-9.99 0-2.67-1.037-5.18-2.92-7.062C17.18 3.037 14.673 2 12.012 2zm6.36 14.887c-.26.732-1.28 1.341-1.765 1.402-.455.057-.9-.122-2.882-.907-2.53-1.002-4.148-3.565-4.275-3.733-.127-.168-.94-1.246-.94-2.38 0-1.134.587-1.692.798-1.92.212-.228.462-.284.618-.284h.442c.137 0 .324-.051.488.349.168.41.577 1.408.627 1.51.05.101.084.22.016.353-.067.135-.1.22-.2.338-.1.118-.21.263-.3.353-.1.101-.205.212-.089.412.115.199.513.844 1.1 1.368.756.674 1.393.882 1.593.98.2.101.316.084.433-.05.118-.135.5-.588.634-.789.135-.201.27-.168.455-.101.185.067 1.178.556 1.38.657.2.101.333.151.383.236.05.084.05.492-.21.732z" />
          </svg>
          <span>WhatsApp</span>
        </a>

        {/* Book an Appointment */}
        <button
          onClick={() => onBookClick(branch)}
          className="w-full flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-[#0f71cd] text-white hover:bg-[#0c62b2] font-bold font-tt-talent cursor-pointer text-sm"
          style={{ fontFamily: '"TT Talent", sans-serif' }}
        >
          <span>Book an Appointment</span>
          <ChevronRight size={14} />
        </button>

        {/* Visit Branch */}
        <button
          onClick={() => onVisitClick(branch)}
          className="w-full flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F141E] text-xs font-bold transition-all duration-205 cursor-pointer font-tt-talent"
          style={{ fontFamily: '"TT Talent", sans-serif' }}
        >
          <span>Visit Branch</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}
