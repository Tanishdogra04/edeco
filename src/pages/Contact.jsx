import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-premium pt-32 pb-20 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Get in touch with us
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Whether you have a question about admissions, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Left - Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Let's talk!</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                We're here to help and answer any question you might have. We look forward to hearing from you.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">Email Us</h4>
                  <p className="text-slate-600 font-medium mb-1">Our friendly team is here to help.</p>
                  <a href="mailto:hello@edevolving.com" className="text-brand-600 font-bold hover:underline">hello@edevolving.com</a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">Visit Us</h4>
                  <p className="text-slate-600 font-medium mb-1">Come say hello at our office HQ.</p>
                  <p className="text-slate-800 font-bold">100 Tech Park Avenue,<br />Sector 44, Gurugram 122003</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">Call Us</h4>
                  <p className="text-slate-600 font-medium mb-1">Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+919876543210" className="text-brand-600 font-bold hover:underline">+91 98765 43210</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-xl border border-slate-100">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">First Name</label>
                    <input type="text" className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all font-medium text-slate-900" placeholder="John" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Last Name</label>
                    <input type="text" className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all font-medium text-slate-900" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email</label>
                  <input type="email" className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all font-medium text-slate-900" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Phone Number</label>
                  <input type="tel" className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all font-medium text-slate-900" placeholder="+91 98765 43210" />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Message</label>
                  <textarea rows={4} className="w-full mt-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all font-medium text-slate-900 resize-none" placeholder="Leave us a message..."></textarea>
                </div>

                <button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
