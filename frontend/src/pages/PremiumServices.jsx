import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, PhoneCall, CheckCircle2, 
  ArrowRight, BrainCircuit
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { features, pricing } from '../data/premiumServices';

const ICON_MAP = {
  BrainCircuit,
  PhoneCall,
  Sparkles
};

export default function PremiumServices() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePricingScroll = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-slate-200 selection:text-slate-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden border-b border-slate-200 text-left">
        {/* Banner Image with Light Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-8"
          >
            <Sparkles size={16} className="text-[#0f71cd]" />
            <span className="text-sm font-bold tracking-wide text-[#0F141E] uppercase font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>edeco Premium</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-[#0F141E] mb-6 leading-tight font-tt-talent"
            style={{ fontFamily: '"TT Talent", sans-serif' }}
          >
            Your Dream College, <br className="hidden md:block" />
            <span className="text-[#0f71cd]">Guaranteed.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 font-semibold"
          >
            Unlock data-driven AI insights, 1-on-1 expert mentorship, and end-to-end admission support.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={handlePricingScroll}
              className="bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold py-4 px-8 rounded-xl shadow-sm transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer font-tt-talent"
              style={{ fontFamily: '"TT Talent", sans-serif' }}
            >
              View Pricing <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white relative text-left" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F141E] mb-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              Unfair Advantage in Admissions
            </h2>
            <p className="text-lg text-slate-500 font-semibold">
              Stop guessing. Use our premium tools and experts to navigate the complex admission landscape with certainty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = ICON_MAP[feature.iconName] || BrainCircuit;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:shadow-md transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon size={28} className={feature.color} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F141E] mb-3 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{feature.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-slate-50 relative text-left" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F141E] mb-4 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-slate-500 font-semibold">
              Invest in your future. Choose the tier that matches your ambition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative bg-white rounded-3xl p-8 border flex flex-col justify-between h-full ${plan.popular ? 'border-[#0f71cd] shadow-lg lg:scale-105 z-10' : 'border-slate-200 shadow-sm'}`}
              >
                <div>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f71cd] text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-[#0F141E] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{plan.name}</h3>
                  <p className="text-slate-500 font-medium text-sm mb-6 h-10">{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-black text-[#0F141E] font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{plan.price}</span>
                    {plan.period && <span className="text-slate-500 font-semibold">{plan.period}</span>}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className={plan.popular ? 'text-[#0f71cd] shrink-0' : 'text-slate-400 shrink-0'} />
                        <span className="text-slate-600 font-semibold text-sm">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 cursor-pointer font-tt-talent ${
                    plan.popular 
                      ? 'bg-[#0f71cd] hover:bg-[#0c62b2] text-white shadow-sm' 
                      : 'bg-white hover:bg-slate-50 text-[#0F141E] border border-slate-200'
                  }`}
                  style={{ fontFamily: '"TT Talent", sans-serif' }}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200/50">
            <div>
              <p className="text-4xl font-black text-[#0f71cd] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>50k+</p>
              <p className="text-slate-500 font-semibold text-sm md:text-base">Students Mentored</p>
            </div>
            <div>
              <p className="text-4xl font-black text-[#0f71cd] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>94%</p>
              <p className="text-slate-500 font-semibold text-sm md:text-base">Success Rate</p>
            </div>
            <div>
              <p className="text-4xl font-black text-[#0f71cd] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>200+</p>
              <p className="text-slate-500 font-semibold text-sm md:text-base">Partner Colleges</p>
            </div>
            <div>
              <p className="text-4xl font-black text-[#0f71cd] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>4.9/5</p>
              <p className="text-slate-500 font-semibold text-sm md:text-base">Student Rating</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
