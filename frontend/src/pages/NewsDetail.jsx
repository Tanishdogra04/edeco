import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Calendar, ChevronRight, Share2,
  Clock, Bookmark, TrendingUp, ArrowRight, BadgeCheck,
  Mail, Link2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { api } from '../utils/api';

export default function NewsDetail() {
  const { newsId } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeSection, setActiveSection] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchArticleAndRelated = async () => {
      setLoading(true);
      try {
        const articleData = await api.news.getById(newsId);
        if (articleData.success) {
          setArticle(articleData.article);
        }
        
        const allNewsData = await api.news.getAll();
        if (allNewsData.success) {
          setRelatedArticles(allNewsData.news.filter(n => n.id !== newsId).slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching article details:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticleAndRelated();
  }, [newsId]);


  // Reading Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [newsId]);

  // Handle Scroll Spy for TOC
  useEffect(() => {
    if (!article) return;
    const handleScroll = () => {
      const headings = article.content.filter(block => block.type === 'h2' || block.type === 'highlight');
      for (let i = headings.length - 1; i >= 0; i--) {
        const id = headings[i].id;
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0f71cd] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-[#0F141E] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Article Not Found</h2>
        <p className="text-slate-500 mb-6 font-medium">The news article you requested does not exist in our database.</p>
        <Link to="/" className="px-6 py-2.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold text-sm rounded-xl font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Go Back Home</Link>
      </div>
    );
  }


  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans selection:bg-[#0f71cd]/20 selection:text-[#0F141E] text-[#0F141E]">
      <Navbar />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0f71cd] to-[#3ba3ff] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-slate-500 gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar font-medium">
            <Link to="/" className="hover:text-[#0f71cd] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/" className="hover:text-[#0f71cd] transition-colors">News & Insights</Link>
            <ChevronRight size={14} />
            <span className="text-[#0F141E] font-bold truncate max-w-[300px]">{article.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 pb-16 pt-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-full bg-[#0f71cd]/10 text-[#0f71cd] text-xs font-bold uppercase tracking-widest border border-[#0f71cd]/20">
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  <Clock size={14} /> {article.readTime}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F141E] tracking-tight leading-tight font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                {article.title}
              </h1>
              
              <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                {article.subtitle}
              </p>

              <div className="flex flex-wrap items-center justify-between pt-6 border-t border-slate-100 gap-6">
                <div className="flex items-center gap-4">
                  <img src={article.author.avatar} alt={article.author.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" />
                  <div>
                    <p className="font-bold text-[#0F141E]">{article.author.name}</p>
                    <p className="text-xs text-slate-400 font-medium">{article.author.role} • {article.date}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsSaved(!isSaved)}
                    className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${isSaved ? 'bg-[#0f71cd]/10 border-[#0f71cd]/20 text-[#0f71cd]' : 'bg-white border-slate-200 text-slate-600 hover:bg-[#0f71cd]/5 hover:border-slate-300'}`}
                  >
                    <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
                  </button>
                  <button className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:border-slate-300 transition-all flex items-center justify-center shadow-sm cursor-pointer">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0f71cd]/10 to-[#3ba3ff]/10 blur-3xl -z-10 rounded-full scale-110"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 transform rotate-1 hover:rotate-0 transition-transform duration-500 bg-white p-2">
                <img src={article.image} alt={article.title} className="w-full h-[400px] object-cover rounded-2xl" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Layout 70/30 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content (70%) */}
          <div className="lg:col-span-8 text-left">
            <div className="prose prose-lg prose-slate max-w-none">
              
              {article.content.map((block, idx) => {
                if (block.type === 'h2') {
                  return (
                    <h2 key={idx} id={block.id} className="text-3xl font-black text-[#0F141E] mt-12 mb-6 scroll-mt-32 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                      {block.text}
                    </h2>
                  );
                }
                
                if (block.type === 'p') {
                  return (
                    <p key={idx} className="text-lg text-slate-655 leading-relaxed font-medium mb-6">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === 'highlight') {
                  return (
                    <div key={idx} id={block.id} className="my-10 bg-gradient-to-br from-[#0f71cd]/5 to-white rounded-3xl p-8 border border-[#0f71cd]/10 shadow-sm relative overflow-hidden scroll-mt-32">
                      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none text-slate-200">
                        <TrendingUp size={120} />
                      </div>
                      <h3 className="text-xl font-black text-[#0F141E] mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                        <BadgeCheck className="text-[#0f71cd]" /> {block.title}
                      </h3>
                      <ul className="space-y-4 relative z-10 list-none pl-0">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 pl-0 before:hidden">
                            <div className="w-6 h-6 rounded-full bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm text-[#0f71cd]">
                              <span className="text-xs font-bold">{i+1}</span>
                            </div>
                            <span className="text-slate-650 font-medium leading-relaxed m-0">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                if (block.type === 'quote') {
                  return (
                    <blockquote key={idx} className="my-10 pl-6 sm:pl-8 border-l-4 border-[#0f71cd]">
                      <p className="text-xl sm:text-2xl font-medium text-[#0F141E] leading-relaxed italic mb-4 mt-0">
                        "{block.text}"
                      </p>
                      <footer className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-6 h-[2px] bg-slate-200 rounded-full"></div> {block.author}
                      </footer>
                    </blockquote>
                  );
                }

                return null;
              })}

            </div>

            {/* Tags and Action */}
            <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 font-sans">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-400">Tags:</span>
                <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 transition-colors rounded-lg text-xs font-bold text-slate-700 cursor-pointer">Exams</span>
                <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 transition-colors rounded-lg text-xs font-bold text-slate-700 cursor-pointer">Admissions</span>
                <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 transition-colors rounded-lg text-xs font-bold text-slate-700 cursor-pointer">2026</span>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all shadow-sm cursor-pointer font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                  <Link2 size={16} /> Copy Link
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (30%) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Table of Contents */}
            <div className="sticky top-40 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">In this article</h4>
              <nav className="space-y-1">
                {article.content.filter(b => b.type === 'h2' || b.type === 'highlight').map((b, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSection(b.id)}
                    className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      activeSection === b.id 
                      ? 'bg-[#0f71cd]/5 text-[#0F141E] border-l-4 border-[#0f71cd] pl-3' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#0F141E]'
                    }`}
                  >
                    {b.text || b.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden text-left">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#0f71cd]/5 rounded-full blur-3xl"></div>
               <div className="relative z-10">
                 <Mail className="text-[#0f71cd] mb-4" size={32} />
                 <h4 className="text-xl font-black text-[#0F141E] mb-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>Get Latest Updates</h4>
                 <p className="text-sm text-slate-505 font-medium mb-6">Join 50,000+ students receiving weekly admission insights directly in their inbox.</p>
                 <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                   <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[#0F141E] placeholder:text-slate-450 focus:outline-none focus:ring-2 focus:ring-[#0f71cd] focus:border-[#0f71cd] font-medium text-sm transition-all"
                   />
                   <button className="w-full bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-sm cursor-pointer font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                     Subscribe Now
                   </button>
                 </form>
               </div>
            </div>

          </div>

        </div>
      </section>

      {/* Related Articles Horizontal Slider */}
      <section className="bg-slate-50 py-20 border-y border-slate-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div className="text-left">
              <h2 className="text-3xl font-black text-[#0F141E] font-tt-talent animate-none" style={{ fontFamily: '"TT Talent", sans-serif' }}>Read Next</h2>
              <p className="text-slate-500 font-medium mt-2">More insights picked for you</p>
            </div>
            <Link to="/" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-[#0f71cd] hover:text-[#0c62b2] transition-colors font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((rel, idx) => (
              <Link to={`/news/${rel.id}`} key={idx} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#0f71cd] hover:shadow-md transition-all duration-300 flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
                  <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-[#0F141E] text-[10px] font-bold uppercase shadow-sm">{rel.category}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3">
                      <Calendar size={14} /> {rel.date}
                    </div>
                    <h3 className="font-bold text-lg text-[#0F141E] group-hover:text-[#0f71cd] transition-colors leading-snug font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>{rel.title}</h3>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 group-hover:text-[#0f71cd] transition-colors">
                    Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
