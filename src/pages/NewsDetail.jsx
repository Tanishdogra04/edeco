import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Calendar, User, ChevronRight, Share2, Heart, ArrowLeft,
  Clock, Eye, Bookmark, TrendingUp, ArrowRight, Quote, BadgeCheck,
  Mail, Link2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


// Advanced Mock Data Structure
const getMockNewsData = (id) => {
  const articles = [
    {
      id: "jee-main-cutoff",
      title: "JEE Main Session 1 Cutoff Analysis & Tier-1 College Trends",
      subtitle: "An in-depth review of score-versus-percentile shifts this season and what it means for admissions into top NITs/IIITs.",
      category: "Admission News",
      date: "May 24, 2026",
      readTime: "6 Min Read",
      views: "12.4k Views",
      author: {
        name: "Aditya Sharma",
        role: "Senior Academic Analyst",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1920&q=80",
      content: [
        { type: "h2", text: "Overview of Session 1 Results", id: "overview" },
        { type: "p", text: "The Joint Entrance Examination (JEE) Main Session 1 has concluded, and the results have sparked widespread discussions among aspirants and educators alike. This year, we've witnessed an unprecedented shift in the score-versus-percentile metrics, indicating a highly competitive landscape for engineering admissions." },
        { type: "p", text: "With over 1.2 million candidates appearing for the exam, the normalization process has resulted in significant variations across different shifts. Students are advised to carefully analyze their raw scores against the published answer keys before estimating their percentiles." },
        
        { type: "highlight", title: "Important Highlights", id: "highlights", items: [
          "A significant spike in the number of candidates scoring above the 99th percentile.",
          "The cutoff for top-tier NITs and IIITs is expected to rise by 2-3 percentile points.",
          "Core branches like Computer Science (CSE) and Artificial Intelligence remain the most sought-after."
        ]},

        { type: "h2", text: "Tier-1 College Cutoff Trends", id: "trends" },
        { type: "p", text: "Analyzing the trends from the past three years, it is evident that the demand for circuit branches has reached an all-time high. Institutions like NIT Trichy, Surathkal, and Warangal are expected to close their CSE admissions at a staggering 99.8+ percentile for the open category." },
        
        { type: "quote", text: "Students falling slightly below their target percentile shouldn't lose hope. Strong tier-2 institutions and state-level engineering colleges offer excellent placements and robust curriculums. The focus should now shift entirely to optimizing performance in Session 2.", author: "Dr. Arvind Kumar, Ex-Director, NTA" },

        { type: "h2", text: "Action Plan for Session 2", id: "action-plan" },
        { type: "p", text: "For candidates aiming to improve their scores in the upcoming session, a strategic shift in preparation is required. Rather than learning new concepts, the emphasis must be on rigorous mock testing, time management, and minimizing negative marking." },
        { type: "p", text: "Ensure that you are revising NCERT textbooks thoroughly, especially for Chemistry, as it continues to be the most scoring section based on the current paper pattern." }
      ]
    },
    {
      id: "ugc-guidelines",
      title: "UGC Guidelines Issued for Foreign University Campuses in India",
      subtitle: "Everything you need to know about double degrees, credit transfer policy, and the top international universities establishing hubs.",
      category: "Policy Update",
      date: "May 20, 2026",
      readTime: "5 Min Read",
      views: "8.2k Views",
      author: {
        name: "Editorial Team",
        role: "Education Policy Desk",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80",
      content: [
        { type: "h2", text: "The New Regulatory Framework", id: "overview" },
        { type: "p", text: "In a landmark move to internationalize higher education, the University Grants Commission (UGC) has released comprehensive guidelines allowing foreign universities to set up their campuses in India. This opens up global opportunities for Indian students without the massive financial burden of studying abroad." },
        
        { type: "highlight", title: "What This Means for Students", id: "highlights", items: [
          "Double Degrees: Pursue programs offering degrees recognized in both India and the host country.",
          "Credit Transfers: Seamless transfer of credits between the Indian campus and the parent campus abroad.",
          "Cost Efficiency: Experience Ivy League education at a fraction of the cost of studying internationally."
        ]},
        
        { type: "h2", text: "Universities in Talks", id: "universities" },
        { type: "p", text: "Several Ivy League and Russell Group universities are currently in advanced talks to establish their hubs in metropolitan cities like Mumbai, Pune, and Bangalore. The government is providing regulatory ease to ensure a smooth transition and setup phase for these global giants." },
        
        { type: "quote", text: "This is a watershed moment for Indian higher education. By bringing global pedagogical standards to our shores, we are democratizing access to world-class education and stemming the brain drain.", author: "Prof. M. Jagadesh Kumar, Chairman, UGC" }
      ]
    },
    {
      id: "gen-ai-mba",
      title: "How Gen-AI is Reshaping MBA Curriculums: Top Skills in Demand",
      subtitle: "Top business institutions are integrating prompt engineering and LLM analytics into management majors. Here is our report.",
      category: "Career Guide",
      date: "May 15, 2026",
      readTime: "7 Min Read",
      views: "15.6k Views",
      author: {
        name: "Dr. R. K. Sen",
        role: "Tech & Strategy Expert",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80",
      content: [
        { type: "h2", text: "The AI Revolution in Business", id: "overview" },
        { type: "p", text: "Generative AI is no longer just a buzzword; it's actively reshaping the corporate landscape, and business schools are racing to adapt. Leading IIMs and global business institutions are now incorporating AI-driven modules into their core MBA curriculums to prepare future leaders." },
        
        { type: "highlight", title: "Emerging Management Skills", id: "skills", items: [
          "Prompt Engineering: Understanding how to effectively communicate with LLMs to extract strategic insights.",
          "AI-Driven Analytics: Moving beyond Excel models to leverage AI for predictive market trends.",
          "AI Ethics: Managing the ethical implications and biases inherent in automated decision-making systems."
        ]},
        
        { type: "h2", text: "Corporate Demand", id: "demand" },
        { type: "p", text: "Recruiters from top consulting firms like McKinsey, BCG, and Bain are specifically looking for MBA graduates who can bridge the gap between business strategy and AI implementation. Traditional management frameworks are now being supplemented with algorithmic thinking." },
        
        { type: "quote", text: "The manager of tomorrow won't be replaced by AI. They will be replaced by a manager who knows how to use AI.", author: "Satya Nadella, CEO, Microsoft" }
      ]
    },
    {
      id: "top-10-nits",
      title: "Top 10 NITs for Computer Science in 2026",
      subtitle: "A comprehensive ranking based on placements, infrastructure, and research opportunities.",
      category: "Guides",
      date: "May 22, 2026",
      readTime: "4 Min Read",
      views: "18.5k Views",
      author: {
        name: "Priya Sharma",
        role: "Tech Education Lead",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1920&q=80",
      content: [
        { type: "h2", text: "Why NITs over Tier-2 IITs?", id: "overview" },
        { type: "p", text: "When it comes to Computer Science, the top NITs (Trichy, Surathkal, Warangal) often outshine newer or lower-tier IITs in terms of median packages and alumni network. Tech giants like Google, Microsoft, and Amazon recruit heavily from these campuses." },
        
        { type: "highlight", title: "Top 3 Performers", id: "highlights", items: [
          "NIT Trichy: Consistent 100% placement for CSE with a median package of ₹27 LPA.",
          "NIT Surathkal: Exceptional coding culture and high GSoC selections.",
          "NIT Warangal: Rapidly growing research output in AI and ML."
        ]},
        
        { type: "quote", text: "An NIT Trichy CS graduate is evaluated at par with top IITians in the software industry.", author: "HR Director, Top Tech Firm" }
      ]
    },
    {
      id: "cuet-prep-strategy",
      title: "Last 30 Days CUET Preparation Strategy",
      subtitle: "Maximize your percentile for Delhi University admissions with this proven 30-day revision blueprint.",
      category: "Strategies",
      date: "May 18, 2026",
      readTime: "8 Min Read",
      views: "22.1k Views",
      author: {
        name: "Rahul Verma",
        role: "Test Prep Expert",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80",
      content: [
        { type: "h2", text: "The Final Sprint", id: "overview" },
        { type: "p", text: "With CUET just 30 days away, the focus must shift entirely from learning new concepts to rigorous revision and mock testing. The CUET exam tests speed and accuracy as much as knowledge, given the tight time constraints." },
        
        { type: "highlight", title: "Week-by-Week Blueprint", id: "highlights", items: [
          "Days 1-10: Rapid revision of NCERT domain subjects and formula memorization.",
          "Days 11-20: Focus on the General Test (Quants & Reasoning) and English vocabulary.",
          "Days 21-30: One full-length mock test every day, followed by detailed analysis."
        ]},
        
        { type: "quote", text: "Don't try to read new reference books now. NCERT is your bible for the domain subjects.", author: "Topper, SRCC Batch 2025" }
      ]
    },
    {
      id: "study-abroad-scholarships",
      title: "10 Fully Funded Scholarships for MS in USA",
      subtitle: "Pursue your Master's degree in the US without the financial burden. A complete guide to applying for top scholarships.",
      category: "Success Stories",
      date: "May 12, 2026",
      readTime: "6 Min Read",
      views: "30.4k Views",
      author: {
        name: "Sarah Jenkins",
        role: "Global Admissions Consultant",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
      },
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80",
      content: [
        { type: "h2", text: "Breaking the Financial Barrier", id: "overview" },
        { type: "p", text: "Studying in the US is expensive, but full-ride scholarships and assistantships make it possible for meritorious international students. We've compiled a list of the top 10 fully-funded programs available for Indian students targeting STEM and Management degrees." },
        
        { type: "highlight", title: "Key Requirements", id: "highlights", items: [
          "A stellar GPA (usually above 8.5/10).",
          "High GRE/GMAT and TOEFL/IELTS scores.",
          "Strong Letters of Recommendation and a compelling Statement of Purpose."
        ]},
        
        { type: "quote", text: "Apply early. The biggest mistake international students make is waiting until the regular decision deadline when most funding is already exhausted.", author: "Admissions Director, Stanford Engineering" }
      ]
    }
  ];

  return articles.find(a => a.id === id) || articles[0];
};

const getRelatedArticles = (currentId) => {
  const articles = [
    {
      id: "top-10-nits",
      title: "Top 10 NITs for Computer Science in 2026",
      category: "Rankings",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
      date: "May 22, 2026"
    },
    {
      id: "cuet-prep-strategy",
      title: "Last 30 Days CUET Preparation Strategy",
      category: "Exam Prep",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80",
      date: "May 18, 2026"
    },
    {
      id: "study-abroad-scholarships",
      title: "10 Fully Funded Scholarships for MS in USA",
      category: "Study Abroad",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80",
      date: "May 12, 2026"
    }
  ];
  return articles.filter(a => a.id !== currentId).slice(0, 3);
};

export default function NewsDetail() {
  const { newsId } = useParams();
  const article = getMockNewsData(newsId);
  const relatedArticles = getRelatedArticles(newsId);
  const [activeSection, setActiveSection] = useState("");
  const [isSaved, setIsSaved] = useState(false);

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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-200 selection:text-brand-900">
      <Navbar />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 to-brand-purple origin-left z-50"
        style={{ scaleX }}
      />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-slate-500 gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar font-medium">
            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/" className="hover:text-brand-600 transition-colors">News & Insights</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-bold truncate max-w-[300px]">{article.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 pb-16 pt-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-widest border border-brand-100">
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  <Clock size={14} /> {article.readTime}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                {article.title}
              </h1>
              
              <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                {article.subtitle}
              </p>

              <div className="flex flex-wrap items-center justify-between pt-6 border-t border-slate-100 gap-6">
                <div className="flex items-center gap-4">
                  <img src={article.author.avatar} alt={article.author.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" />
                  <div>
                    <p className="font-bold text-slate-900">{article.author.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{article.author.role} • {article.date}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsSaved(!isSaved)}
                    className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${isSaved ? 'bg-brand-50 border-brand-200 text-brand-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
                  >
                    <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
                  </button>
                  <button className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:border-slate-300 transition-all flex items-center justify-center shadow-sm">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-brand-purple/20 blur-3xl -z-10 rounded-full scale-110"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 transform rotate-1 hover:rotate-0 transition-transform duration-500 bg-white p-2">
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
          <div className="lg:col-span-8">
            <div className="prose prose-lg prose-slate max-w-none">
              
              {article.content.map((block, idx) => {
                if (block.type === 'h2') {
                  return (
                    <h2 key={idx} id={block.id} className="text-3xl font-black text-slate-900 mt-12 mb-6 scroll-mt-32">
                      {block.text}
                    </h2>
                  );
                }
                
                if (block.type === 'p') {
                  return (
                    <p key={idx} className="text-lg text-slate-700 leading-relaxed font-medium mb-6">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === 'highlight') {
                  return (
                    <div key={idx} id={block.id} className="my-10 bg-gradient-to-br from-brand-50 to-white rounded-3xl p-8 border border-brand-100 shadow-sm relative overflow-hidden scroll-mt-32">
                      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                        <TrendingUp size={120} />
                      </div>
                      <h3 className="text-xl font-black text-brand-900 mb-6 flex items-center gap-2">
                        <BadgeCheck className="text-brand-500" /> {block.title}
                      </h3>
                      <ul className="space-y-4 relative z-10 list-none pl-0">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 pl-0 before:hidden">
                            <div className="w-6 h-6 rounded-full bg-white border border-brand-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm text-brand-600">
                              <span className="text-xs font-bold">{i+1}</span>
                            </div>
                            <span className="text-slate-700 font-medium leading-relaxed m-0">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                if (block.type === 'quote') {
                  return (
                    <blockquote key={idx} className="my-10 pl-6 sm:pl-8 border-l-4 border-brand-500">
                      <p className="text-xl sm:text-2xl font-medium text-slate-800 leading-relaxed italic mb-4 mt-0">
                        "{block.text}"
                      </p>
                      <footer className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-6 h-[2px] bg-slate-300 rounded-full"></div> {block.author}
                      </footer>
                    </blockquote>
                  );
                }

                return null;
              })}

            </div>

            {/* Tags and Action */}
            <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-500">Tags:</span>
                <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 transition-colors rounded-lg text-xs font-bold text-slate-600 cursor-pointer">Exams</span>
                <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 transition-colors rounded-lg text-xs font-bold text-slate-600 cursor-pointer">Admissions</span>
                <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 transition-colors rounded-lg text-xs font-bold text-slate-600 cursor-pointer">2026</span>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 font-bold text-sm transition-all shadow-sm">
                  <Link2 size={16} /> Copy Link
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (30%) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Table of Contents */}
            <div className="sticky top-40 bg-white rounded-3xl border border-slate-200 p-6 shadow-xl shadow-slate-200/40">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">In this article</h4>
              <nav className="space-y-1">
                {article.content.filter(b => b.type === 'h2' || b.type === 'highlight').map((b, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSection(b.id)}
                    className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeSection === b.id 
                      ? 'bg-brand-50 text-brand-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {b.text || b.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl"></div>
               <div className="relative z-10">
                 <Mail className="text-brand-400 mb-4" size={32} />
                 <h4 className="text-xl font-black text-white mb-2">Get Latest Updates</h4>
                 <p className="text-sm text-slate-400 font-medium mb-6">Join 50,000+ students receiving weekly admission insights directly in their inbox.</p>
                 <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                   <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-sm transition-all"
                   />
                   <button className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-brand-500/25">
                     Subscribe Now
                   </button>
                 </form>
               </div>
            </div>

          </div>

        </div>
      </section>

      {/* Related Articles Horizontal Slider */}
      <section className="bg-slate-100 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Read Next</h2>
              <p className="text-slate-500 font-medium mt-2">More insights picked for you</p>
            </div>
            <Link to="/" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((rel, idx) => (
              <Link to={`/news/${rel.id}`} key={idx} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-brand-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
                  <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-bold uppercase shadow-sm">{rel.category}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3">
                      <Calendar size={14} /> {rel.date}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">{rel.title}</h3>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 group-hover:text-brand-600 transition-colors">
                    Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}

      
      <Footer />
    </div>
  );
}
