import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ChevronDown } from 'lucide-react';

export default function CollegeFaqs({ college }) {
  const [openFaq, setOpenFaq] = useState(0);

  if (!college || !college.faqs) return null;

  return (
    <div id="section-faqs" className="scroll-mt-36">
      <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
        <MessageSquare className="text-[#0f71cd]" /> Frequently Asked Questions
      </h2>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 divide-y divide-slate-100">
        {college.faqs.map((faq, i) => (
          <div key={i} className="p-2">
            <button 
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
            >
              <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
              <ChevronDown size={20} className={`text-slate-400 transition-transform ${openFaq === i ? 'rotate-180 text-[#0f71cd]' : ''}`} />
            </button>
            <AnimatePresence>
              {openFaq === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-2 text-slate-500 font-medium leading-relaxed border-l-2 border-slate-200 ml-4 mb-2">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
