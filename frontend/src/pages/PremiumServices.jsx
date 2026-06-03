import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Award, PhoneCall, CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Users, BrainCircuit
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function PremiumServices() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: BrainCircuit,
      title: 'AI College Finder',
      description: 'Our proprietary algorithm analyzes your profile, scores, and preferences to predict admission chances with 94% accuracy.',
      color: 'text-brand-600',
      bg: 'bg-brand-100'
    },
    {
      icon: PhoneCall,
      title: 'Expert Consultation',
      description: '1-on-1 sessions with admission veterans who have helped thousands of students get into top-tier institutes.',
      color: 'text-brand-500',
      bg: 'bg-brand-100'
    },
    {
      icon: Sparkles,
      title: 'Admission Guidance',
      description: 'End-to-end support from university shortlisting to application essays, interview prep, and final enrollment.',
      color: 'text-brand-700',
      bg: 'bg-brand-200/60'
    }
  ];

  const pricing = [
    {
      name: 'Essential',
      price: 'Free',
      description: 'Perfect for initial college research',
      features: [
        'Access to College Directory',
        'Basic Compare Tool (up to 3)',
        'Standard Exam Updates',
        'Community Forum Access'
      ],
      buttonText: 'Get Started',
      popular: false
    },
    {
      name: 'Pro Guidance',
      price: '₹4,999',
      period: '/year',
      description: 'Comprehensive support for serious aspirants',
      features: [
        'Everything in Essential',
        'AI College Predictor Access',
        '2 Expert Counselling Sessions',
        'Application Review (2 Colleges)',
        'Priority Chat Support'
      ],
      buttonText: 'Upgrade to Pro',
      popular: true
    },
    {
      name: 'Elite Admission',
      price: '₹14,999',
      period: '/year',
      description: 'End-to-end premium admission assistance',
      features: [
        'Everything in Pro Guidance',
        'Unlimited Expert Sessions',
        'Complete Essay/SOP Drafting',
        'Mock Interviews & Prep',
        'Dedicated Relationship Manager'
      ],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  const handlePricingScroll = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 font-sans selection:bg-brand-200 selection:text-brand-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden border-b border-brand-200">
        {/* Banner Image with Light Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 mb-8"
          >
            <Sparkles size={16} className="text-brand-500" />
            <span className="text-sm font-bold tracking-wide text-brand-800 uppercase">edeco Premium</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-display text-brand-800 mb-6 leading-tight"
          >
            Your Dream College, <br className="hidden md:block" />
            <span className="text-brand-500">Guaranteed.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brand-800/70 max-w-2xl mx-auto mb-10"
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
              className="bg-[#110051] hover:bg-[#1a0073] text-white font-bold py-4 px-8 rounded-xl shadow-sm transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer"
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
            <h2 className="text-3xl md:text-4xl font-bold text-brand-800 mb-4 font-display">
              Unfair Advantage in Admissions
            </h2>
            <p className="text-lg text-brand-800/70">
              Stop guessing. Use our premium tools and experts to navigate the complex admission landscape with certainty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-brand-50 rounded-3xl p-8 border border-brand-200 hover:shadow-md transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} className={feature.color} />
                </div>
                <h3 className="text-xl font-bold text-brand-800 mb-3 font-display">{feature.title}</h3>
                <p className="text-brand-800/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-brand-50 relative text-left" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-800 mb-4 font-display">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-brand-800/70">
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
                className={`relative bg-white rounded-3xl p-8 border flex flex-col justify-between h-full ${plan.popular ? 'border-brand-500 shadow-lg lg:scale-105 z-10' : 'border-brand-200 shadow-sm'}`}
              >
                <div>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-brand-800 mb-2 font-display">{plan.name}</h3>
                  <p className="text-brand-800/60 text-sm mb-6 h-10">{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-black text-brand-800">{plan.price}</span>
                    {plan.period && <span className="text-brand-800/60 font-medium">{plan.period}</span>}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className={plan.popular ? 'text-brand-500 shrink-0' : 'text-brand-800/40 shrink-0'} />
                        <span className="text-brand-800/70 font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 cursor-pointer ${
                    plan.popular 
                      ? 'bg-[#110051] hover:bg-[#1a0073] text-white shadow-sm' 
                      : 'bg-white hover:bg-brand-50 text-brand-800 border border-brand-200'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-white py-16 border-t border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-brand-200/50">
            <div>
              <p className="text-4xl font-black text-brand-500 mb-2 font-display">50k+</p>
              <p className="text-brand-800/70 font-medium text-sm md:text-base">Students Mentored</p>
            </div>
            <div>
              <p className="text-4xl font-black text-brand-500 mb-2 font-display">94%</p>
              <p className="text-brand-800/70 font-medium text-sm md:text-base">Success Rate</p>
            </div>
            <div>
              <p className="text-4xl font-black text-brand-500 mb-2 font-display">200+</p>
              <p className="text-brand-800/70 font-medium text-sm md:text-base">Partner Colleges</p>
            </div>
            <div>
              <p className="text-4xl font-black text-brand-500 mb-2 font-display">4.9/5</p>
              <p className="text-brand-800/70 font-medium text-sm md:text-base">Student Rating</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
