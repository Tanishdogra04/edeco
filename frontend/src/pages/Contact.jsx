import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, MapPin, Send, MessageSquare, ChevronDown, Check,
  Sparkles, ShieldCheck, HelpCircle, ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqs = [
  {
    question: "How long does a counselling session take?",
    answer: "Typically, an initial counselling session takes 30-45 minutes. During this session, our expert mentors will evaluate your academic profile, understand your goals, and outline a customized roadmap for your college search."
  },
  {
    question: "Are there any fees for using the college finder?",
    answer: "Our basic AI College Finder tool, admissions guides, and initial consultations are 100% free. Premium services (like comprehensive application support, visa guidance, and exam prep packages) have transparent, custom pricing plans."
  },
  {
    question: "How do I track my admissions application?",
    answer: "Once your application is submitted, your dedicated Edeco counselor will upload all updates directly to your personalized Edeco Student Dashboard. You will also receive instant email notifications for major milestones."
  },
  {
    question: "How can we establish corporate partnerships?",
    answer: "We welcome partnerships with universities, corporate sponsors, and test-prep centers. Please choose 'Partnership Query' as your inquiry type in the form, or reach out to us at partnerships@edeco.edu."
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: 'Admissions Counselling',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: 'Admissions Counselling',
        message: ''
      });
    }, 1500);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
        <div className="bg-gradient-premium pt-32 pb-16 relative overflow-hidden border-b border-slate-100 text-left">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Contact us
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#110051] tracking-tight mb-5 font-display leading-tight max-w-3xl">
              Get in Touch with <span className="bg-gradient-to-r from-brand-600 to-brand-purple bg-clip-text text-transparent">Edeco Support</span>
            </h2>
            <p className="text-slate-500 text-base md:text-lg max-w-2xl font-semibold leading-relaxed">
              We're here to guide you. Reach out to our teams for admissions support, general queries, or corporate partnerships.
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-12 gap-12 sm:gap-16 text-left">

            {/* Left - Contact Details Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#110051] mb-3 font-display">Let's start a conversation</h3>
                <p className="text-slate-500 font-semibold leading-relaxed text-sm">
                  Have a question or want to collaborate? Fill out the inquiry form or reach out to our dedicated support channels.
                </p>
              </div>

              <div className="space-y-6">
                {/* Card 1: Admissions support */}
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 border border-brand-200">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wide mb-1">Admissions Support</h4>
                    <p className="text-[13px] text-slate-500 font-semibold mb-2">Mon-Sat from 9:30 AM to 6:00 PM.</p>
                    <a href="tel:+918278713791" className="text-brand-600 font-bold text-sm hover:underline hover:text-brand-700 transition-colors">+91 82787 13791</a>
                  </div>
                </div>

                {/* Card 2: Email support */}
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 border border-brand-200">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-455 uppercase tracking-wide mb-1">General Inquiries</h4>
                    <p className="text-[13px] text-slate-500 font-semibold mb-2">Our support team replies within 24 hours.</p>
                    <a href="mailto:hello@edeco.edu" className="text-brand-600 font-bold text-sm hover:underline hover:text-brand-700 transition-colors">hello@edeco.edu</a>
                  </div>
                </div>

                {/* Card 3: HQ address */}
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 border border-brand-200">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-455 uppercase tracking-wide mb-1">Corporate HQ</h4>
                    <p className="text-[13.5px] text-slate-700 font-bold leading-relaxed mb-2 font-display">Edeco Headquarters</p>
                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-3">
                      100 Tech Park Avenue,<br />Sector 44, Gurugram, Haryana 122003
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-850 hover:underline transition-all"
                    >
                      Open in Maps <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - General Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.015)] border border-slate-100 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {isSubmitSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-16 flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-[rgb(106,255,217)]/25 text-[#110051] flex items-center justify-center mb-6">
                        <CheckCircle2 size={36} className="text-[#110051]" />
                      </div>
                      <h4 className="text-2xl font-bold text-[#110051] mb-2 font-display">Message Sent Successfully!</h4>
                      <p className="text-slate-500 font-semibold max-w-md text-sm leading-relaxed">
                        Thank you for reaching out to Edeco. We have received your inquiry and our representative will respond to you within 24 business hours.
                      </p>
                      <button
                        onClick={() => setIsSubmitSuccess(false)}
                        className="mt-8 px-8 py-3 bg-[#110051] hover:bg-[#110051]/95 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form key="form" onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">First Name</label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            placeholder="John"
                            className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 outline-none transition-all text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Last Name</label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            placeholder="Doe"
                            className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 outline-none transition-all text-xs font-semibold text-slate-800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email Address</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="john@example.com"
                            className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 outline-none transition-all text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="+91 98765 43210"
                            className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 outline-none transition-all text-xs font-semibold text-slate-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Inquiry Type</label>
                        <select
                          value={formData.inquiryType}
                          onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                          className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 outline-none transition-all text-xs font-semibold text-slate-800"
                        >
                          <option>Admissions Counselling</option>
                          <option>Partnership Query</option>
                          <option>General Support</option>
                          <option>Feedback & Suggestions</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Your Message</label>
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Tell us how we can help you..."
                          className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 outline-none transition-all text-xs font-semibold text-slate-800 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#110051] text-white hover:bg-[#0e003e] font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm text-sm"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-[#110051] border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* FAQs Accordion Section */}
        <div className="bg-slate-100/50 py-16 border-t border-b border-slate-200/40 text-left">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <HelpCircle className="mx-auto text-brand-600 mb-3" size={28} />
              <h3 className="text-2xl font-bold text-[#110051] font-display">Frequently Asked Questions</h3>
              <p className="text-xs font-semibold text-slate-450 uppercase tracking-wider mt-1">
                Quick answers to common inquiries
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.01)] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm text-[#110051] hover:bg-slate-50/50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 shrink-0 transition-transform duration-200 ${expandedFaq === index ? 'rotate-180 text-brand-600' : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-slate-500 text-[13.5px] leading-relaxed font-sans font-medium border-t border-slate-50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
