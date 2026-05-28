import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, ArrowUpRight } from 'lucide-react';

export default function LatestNews() {
  const articles = [
    {
      id: "jee-main-cutoff",
      title: "JEE Main Session 1 Cutoff Analysis & Tier-1 College Trends",
      desc: "An in-depth review of score-versus-percentile shifts this season and what it means for admissions into top NITs/IIITs.",
      tag: "Admission News",
      date: "May 24, 2026",
      author: "Aditya Sharma",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "ugc-guidelines",
      title: "UGC Guidelines Issued for Foreign University Campuses in India",
      desc: "Everything you need to know about double degrees, credit transfer policy, and the top international universities establishing hubs.",
      tag: "Policy Update",
      date: "May 20, 2026",
      author: "Editorial Team",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "gen-ai-mba",
      title: "How Gen-AI is Reshaping MBA Curriculums: Top Skills in Demand",
      desc: "Top business institutions are integrating prompt engineering and LLM analytics into management majors. Here is our report.",
      tag: "Career Guide",
      date: "May 15, 2026",
      author: "Dr. R. K. Sen",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section id="news" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="text-left space-y-2">
            <span className="text-[12px] font-bold text-brand-600 uppercase tracking-widest block">
              Knowledge Hub
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Latest News & Admissions Insights
            </h2>
            <p className="text-[14px] text-slate-400 max-w-md font-medium">
              Read up-to-date reports from campus corridors, exam councils, and expert academic strategists.
            </p>
          </div>

          <Link to="/news/jee-main-cutoff" className="flex items-center gap-1 text-[13px] font-extrabold text-brand-600 hover:text-brand-700 mt-4 md:mt-0 group cursor-pointer">
            <span>Visit the Blog Bulletin</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <Link to={`/news/${art.id}`} key={idx}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col justify-between h-full rounded-3xl overflow-hidden bg-slate-50/30 border border-slate-100 hover:border-brand-200/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300 cursor-pointer"
              >
              <div>
                {/* Thumbnail Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-slate-700 text-[10px] font-bold shadow-sm uppercase tracking-wide">
                      {art.tag}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 text-left space-y-3">
                  {/* Meta data */}
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 font-semibold">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{art.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      <span>{art.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-lg text-slate-800 leading-snug tracking-tight group-hover:text-brand-600 transition-colors">
                    {art.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] text-slate-400 font-normal leading-relaxed line-clamp-3">
                    {art.desc}
                  </p>
                </div>
              </div>

              {/* Read More footer link */}
              <div className="px-6 pb-6 pt-2 text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 group-hover:text-brand-600 transition-colors">
                  <span>Read Article</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

              </motion.article>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
