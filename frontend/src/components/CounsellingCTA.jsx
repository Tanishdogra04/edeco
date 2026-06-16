import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PhoneCall, ShieldCheck, HeartHandshake, Users2, Star } from 'lucide-react';
import CounsellingModal from './CounsellingModal';

export default function CounsellingCTA({ onCounsellingClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (onCounsellingClick) {
      onCounsellingClick();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <section id="counselling" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Outer Banner container */}
        <div className="relative rounded-[32px] bg-gradient-to-br from-[#0c59a3] via-[#0f71cd] to-[#3ba3ff] overflow-hidden p-8 sm:p-12 lg:p-16 text-white shadow-2xl shadow-[#0f71cd]/25">
          
          {/* Decorative glowing blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

          <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                <Sparkles size={12} className="text-yellow-300 animate-spin-slow" />
                <span className="text-[10px] font-bold tracking-wider uppercase">Immediate Career Guidance</span>
              </div>

              <h2 className="font-tt-talent font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                Confused about which college or course is right for you?
              </h2>

              <p className="text-white/80 text-[15px] font-medium max-w-xl leading-relaxed">
                Take the guesswork out of admissions. Speak directly to our senior counselling panel, evaluate your entrance scores, and find budget-aligned campus options.
              </p>

              {/* Trust parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-yellow-300" />
                  <span className="text-xs font-semibold text-white/95">100% Unbiased Advice</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake size={18} className="text-yellow-300" />
                  <span className="text-xs font-semibold text-white/95">No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users2 size={18} className="text-yellow-300" />
                  <span className="text-xs font-semibold text-white/95">50K+ Guided So Far</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 pt-6">
                <button
                  onClick={handleClick}
                  className="px-8 py-4 rounded-2xl bg-[#0F141E] text-white hover:bg-[#1C2433] font-tt-talent font-bold text-sm shadow-xl transition-all duration-300 cursor-pointer"
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  Book Free Counselling
                </button>
                <a
                  href="tel:8278713791"
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all duration-300 cursor-pointer font-tt-talent"
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  <PhoneCall size={14} />
                  <span>Talk to Expert Now</span>
                </a>
              </div>

            </div>

            {/* Right Illustration Card */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full max-w-[340px] bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 text-left"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold text-white/80 uppercase">Guaranteed Response</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                </div>

                <div className="space-y-4">
                  {/* Expert card 1 */}
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-400 flex items-center justify-center text-xs font-bold text-white">
                      AM
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold">Ananya Mishra</p>
                      <span className="text-[10px] text-white/60">Expert in MBA Admissions</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-yellow-300">
                      <Star size={10} fill="currentColor" />
                      <span className="text-[10px] font-bold">4.9</span>
                    </div>
                  </div>

                  {/* Expert card 2 */}
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#38bdf8] to-[#0f71cd] flex items-center justify-center text-xs font-bold text-white">
                      RK
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold">Rajesh Kumar</p>
                      <span className="text-[10px] text-white/60">Senior Engineering Guide</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-yellow-300">
                      <Star size={10} fill="currentColor" />
                      <span className="text-[10px] font-bold">4.8</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-[11px] text-white/50 font-semibold uppercase">
                    Connect Speed: Under 10 minutes
                  </p>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
      <CounsellingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
