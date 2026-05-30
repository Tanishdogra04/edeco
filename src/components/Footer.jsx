import { useState } from 'react';
import {
  GraduationCap, Mail, Phone, MapPin, Send, ShieldCheck, Heart,
  Star, Building2, Users, Sparkles, ChevronRight, ArrowUp
} from 'lucide-react';

const TwitterIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.163c-.272-1.016-1.07-1.815-2.085-2.087-1.838-.495-9.213-.495-9.213-.495s-7.375 0-9.213.495c-1.015.272-1.813 1.071-2.085 2.087-.495 1.837-.495 5.67-.495 5.67s0 3.833.495 5.67c.272 1.015 1.07 1.813 2.085 2.085 1.838.496 9.213.496 9.213.496s7.375 0 9.213-.496c1.015-.272 1.813-1.07 2.085-2.085.495-1.837.495-5.67.495-5.67s0-3.833-.495-5.67zm-14.28 9.53v-7.385l6.41 3.693-6.41 3.692z" />
  </svg>
);


export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const footerLinks = {
    colleges: [
      { name: "Engineering Colleges", href: "#colleges", badge: "Popular" },
      { name: "MBA Institutes", href: "#colleges" },
      { name: "Medical Colleges", href: "#colleges", badge: "New" },
      { name: "Law Colleges", href: "#colleges" },
      { name: "Design Colleges", href: "#colleges" }
    ],
    exams: [
      { name: "JEE Main Guide", href: "#exams" },
      { name: "NEET Syllabus", href: "#exams", badge: "Hot" },
      { name: "CAT Mock Tests", href: "#exams" },
      { name: "CUET Updates", href: "#exams" },
      { name: "CLAT Timelines", href: "#exams" }
    ],
    courses: [
      { name: "B.Tech Computer Science", href: "#courses" },
      { name: "MBA Marketing", href: "#courses" },
      { name: "MBBS Specialization", href: "#courses", badge: "Top" },
      { name: "BBA Fintech", href: "#courses" },
      { name: "Integrated Law", href: "#courses" }
    ]
  };

  return (
    <footer id="footer" className="bg-slate-50 text-slate-500 pt-20 pb-28 lg:pb-16 border-t border-slate-200 relative overflow-hidden">

      {/* Top Border Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/20 to-transparent"></div>

      {/* Decorative Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Section: Brand & Newsletter Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-slate-200 items-start">

          {/* Logo & Value Proposition */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div 
              className="inline-flex items-center gap-2.5 cursor-pointer px-4 py-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200/60 shadow-sm transition-all duration-300 group" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center text-white shadow-lg shadow-brand-500/10 group-hover:scale-105 transition-transform duration-300">
                <GraduationCap size={20} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                <span className="text-slate-800 group-hover:text-brand-600 transition-colors">Ed</span>
                <span className="text-gradient">Evolving</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm font-medium leading-relaxed">
              India's leading career matching ecosystem. We pair student goals with college statistics using deep recruitment analytics, personalized guidance, and modern technology.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: TwitterIcon, href: "#", name: "Twitter" },
                { icon: LinkedinIcon, href: "#", name: "LinkedIn" },
                { icon: InstagramIcon, href: "#", name: "Instagram" },
                { icon: YoutubeIcon, href: "#", name: "YouTube" }
              ].map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.href}
                    title={soc.name}
                    aria-label={`Follow us on ${soc.name}`}
                    className="w-9 h-9 rounded-xl bg-white hover:bg-gradient-brand text-slate-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-brand-500/10 border border-slate-200 shadow-sm"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Newsletter subscription Card */}
          <div className="lg:col-span-7 text-left w-full">
            <div className="relative overflow-hidden bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-lg max-w-xl lg:ml-auto">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/20 rounded-full blur-2xl"></div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
                    <Mail size={16} />
                  </span>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
                    Admission Alerts & Newsletter
                  </h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Stay updated with deadlines, cutoffs, exam schedules, and exclusive tips. No spam, unsubscribe anytime.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 bg-white border border-slate-200 p-1.5 rounded-2xl focus-within:border-brand-500/50 transition-colors shadow-sm">
                  <div className="flex-1 flex items-center gap-2.5 px-3 py-2 text-slate-400">
                    <Mail size={16} className="text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400 font-medium"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-brand hover:brightness-110 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer shadow-md shadow-brand-500/10 active:scale-95"
                  >
                    {subscribed ? (
                      <>
                         <ShieldCheck size={14} className="animate-bounce" />
                        <span>Subscribed</span>
                      </>
                    ) : (
                      <>
                        <span>Alert Me</span>
                        <Send size={12} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Row Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-12 border-b border-slate-200 text-left">
          {[
            { icon: Star, value: "4.9/5", label: "Student Rating", color: "text-amber-500" },
            { icon: Building2, value: "500+", label: "Partner Colleges", color: "text-emerald-500" },
            { icon: Users, value: "2.5M+", label: "Annual Aspirants", color: "text-lime-500" },
            { icon: Sparkles, value: "100% Free", label: "Expert Counseling", color: "text-emerald-500" }
          ].map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
                <div className={`p-3 rounded-xl bg-white border border-slate-200/60 shadow-sm ${stat.color}`}>
                  <StatIcon size={20} />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900 font-display tracking-tight">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-semibold">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Middle Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-left">

          {/* Colleges links */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Top Domains</h4>
            <ul className="space-y-3">
              {footerLinks.colleges.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-1.5 text-xs text-slate-600 hover:text-brand-600 transition-all duration-300 hover:translate-x-1"
                  >
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 text-brand-500 transition-all duration-300 -ml-3 group-hover:ml-0" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[8px] font-extrabold uppercase bg-brand-500/10 text-brand-400 rounded-md border border-brand-500/20 tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Exams links */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">National Exams</h4>
            <ul className="space-y-3">
              {footerLinks.exams.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-1.5 text-xs text-slate-600 hover:text-brand-600 transition-all duration-300 hover:translate-x-1"
                  >
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 text-brand-500 transition-all duration-300 -ml-3 group-hover:ml-0" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[8px] font-extrabold uppercase bg-rose-500/10 text-rose-400 rounded-md border border-rose-500/20 tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses links */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Hot Courses</h4>
            <ul className="space-y-3">
              {footerLinks.courses.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-1.5 text-xs text-slate-650 hover:text-brand-600 transition-all duration-300 hover:translate-x-1"
                  >
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 text-brand-500 transition-all duration-300 -ml-3 group-hover:ml-0" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[8px] font-extrabold uppercase bg-amber-500/10 text-amber-400 rounded-md border border-amber-500/20 tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Contact & Office</h4>
            <ul className="space-y-4 text-xs text-slate-500 font-medium">
              <li className="flex items-start gap-2.5">
                <div className="p-1 rounded-lg bg-brand-50 text-brand-600 border border-brand-100 mt-0.5">
                  <MapPin size={14} />
                </div>
                <span className="leading-relaxed">
                  Nexus Mall Campus, <br />
                  Koramangala 5th Block, <br />
                  Bangalore, Karnataka - 560095
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="p-1 rounded-lg bg-brand-50 text-brand-600 border border-brand-100">
                  <Phone size={14} />
                </div>
                <span>+91 80 4912 3456</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="p-1 rounded-lg bg-brand-50 text-brand-600 border border-brand-100">
                  <Mail size={14} />
                </div>
                <span className="hover:text-brand-600 transition-colors cursor-pointer">guidance@edevolving.edu</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Socials & Copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <span>© 2026 EdEvolving Platforms Pvt Ltd. Built with</span>
            <Heart size={10} className="text-rose-500 fill-rose-500 animate-pulse" />
            <span>for Gen-Z Aspirants.</span>
          </div>

          {/* Scroll to top button */}
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">Back to Top</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group p-3 rounded-xl bg-white hover:bg-gradient-brand text-slate-500 hover:text-white border border-slate-200 hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-brand-500/20 cursor-pointer hover:-translate-y-1"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
