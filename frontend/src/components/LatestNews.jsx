import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, ArrowUpRight } from 'lucide-react';
import { api } from '../utils/api';

export default function LatestNews() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await api.news.getAll();
        if (data.success) {
          setArticles(data.news.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching articles:', err.message);
      }
    };
    fetchArticles();
  }, []);

  return (
    <section id="news" className="py-20 bg-slate-50/50 relative border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="text-left space-y-2">
            <span className="text-[12px] font-bold text-[#0f71cd] uppercase tracking-widest block">
              Knowledge Hub
            </span>
            <h2 className="font-tt-talent font-bold text-3xl sm:text-4xl text-[#0F141E] tracking-tight" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              Latest News & Admissions Insights
            </h2>
            <p className="text-[14px] text-[#0F141E]/70 max-w-md font-medium">
              Read up-to-date reports from campus corridors, exam councils, and expert academic strategists.
            </p>
          </div>

          <Link to="/news/jee-main-cutoff" className="flex items-center gap-1 text-[13px] font-bold text-[#0f71cd] hover:text-[#0c62b2] mt-4 md:mt-0 group cursor-pointer font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
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
                className="group flex flex-col justify-between h-full rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-[#0f71cd]/30 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
              <div>
                {/* Thumbnail Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={art.image || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80'} 
                    alt={art.title || 'News Image'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-[#0f71cd] text-[10px] font-bold shadow-sm uppercase tracking-wide">
                      {art.tag}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 text-left space-y-3">
                  {/* Meta data */}
                  <div className="flex items-center gap-4 text-[11px] text-[#0F141E]/55 font-semibold">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#0f71cd]/70" />
                      <span>{art.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={12} className="text-[#0f71cd]/70" />
                      <span>{typeof art.author === 'object' && art.author ? art.author.name : art.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-tt-talent font-bold text-lg text-[#0F141E] leading-snug tracking-tight group-hover:text-[#0f71cd] transition-colors" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                    {art.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] text-[#0F141E]/70 font-normal leading-relaxed line-clamp-3">
                    {art.desc}
                  </p>
                </div>
              </div>

              {/* Read More footer link */}
              <div className="px-6 pb-6 pt-2 text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F141E]/80 group-hover:text-[#0f71cd] transition-colors">
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
