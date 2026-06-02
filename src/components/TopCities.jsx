import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopCities() {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const cities = [
    { 
      name: "Bangalore", 
      colleges: "120+ Colleges", 
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80",
      desc: "IT & Start-up Capital",
      avgPackage: "8.2 LPA",
      keyStreams: "Engineering, MBA, MCA"
    },
    { 
      name: "Delhi NCR", 
      colleges: "150+ Colleges", 
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80",
      desc: "National Capital Region",
      avgPackage: "7.8 LPA",
      keyStreams: "MBA, Law, B.Tech"
    },
    { 
      name: "Mumbai", 
      colleges: "90+ Colleges", 
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80",
      desc: "Financial & Media Hub",
      avgPackage: "8.5 LPA",
      keyStreams: "Finance, Design, MBA"
    },
    { 
      name: "Pune", 
      colleges: "110+ Colleges", 
      image: "https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&w=400&q=80",
      desc: "Oxford of the East",
      avgPackage: "7.2 LPA",
      keyStreams: "Engineering, MBA, Arts"
    },
    { 
      name: "Hyderabad", 
      colleges: "80+ Colleges", 
      image: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&w=400&q=80",
      desc: "Tech & Heritage Center",
      avgPackage: "7.5 LPA",
      keyStreams: "B.Tech, Pharmacy, MBA"
    }
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.6;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div className="text-left space-y-2">
            <span className="text-[12px] font-bold text-brand-600 uppercase tracking-widest block">
              Study Destinations
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-800 tracking-tight">
              Explore Colleges by City
            </h2>
            <p className="text-[14px] text-brand-800/60 max-w-md font-medium">
              Discover top educational hubs across the country with active recruiting networks.
            </p>
          </div>

          {/* Desktop Arrow Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-xl bg-white border border-slate-100 hover:border-brand-200 text-slate-600 hover:text-brand-600 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-xl bg-white border border-slate-100 hover:border-brand-200 text-slate-600 hover:text-brand-600 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* City Cards Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {cities.map((city, idx) => (
            <motion.div
              key={idx}
              onClick={() => navigate(`/cities/${city.name.toLowerCase().replace(/ /g, '-')}`)}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="min-w-[260px] sm:min-w-[290px] h-[320px] bg-white rounded-xl p-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100/80 flex flex-col snap-start cursor-pointer text-left group hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(17,0,81,0.05)] hover:border-slate-200/60 transition-all duration-300"
            >
              {/* Image with subtle zoom on hover */}
              <div className="w-full h-32 rounded-lg overflow-hidden relative mb-3 bg-slate-50 shrink-0">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-[#110051]/90 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider border border-white/10 shadow-sm">
                  {city.desc}
                </div>
              </div>

              {/* Card Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-[#110051] tracking-tight leading-none">
                    {city.name}
                  </h3>
                  
                  {/* Badges Row */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200/60 text-[10px] font-bold text-slate-600 flex items-center gap-1 shadow-2xs">
                      <Building2 size={11} className="text-[#110051]/80" />
                      {city.colleges}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50/40 border border-indigo-100/50 text-[10px] font-bold text-indigo-700 flex items-center gap-1 shadow-2xs">
                      <span className="font-extrabold text-[8px] uppercase">Avg CTC:</span>
                      {city.avgPackage}
                    </span>
                  </div>

                  {/* Popular streams list */}
                  <div className="mt-3 text-left">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Popular Fields</span>
                    <span className="text-[11.5px] font-medium text-slate-500 truncate block mt-0.5">{city.keyStreams}</span>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-2.5 border-t border-slate-100/50 flex items-center justify-between text-slate-400 group-hover:text-[#110051] transition-all duration-300">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Explore Colleges</span>
                  <ChevronRight size={13} className="text-slate-400 group-hover:text-[#110051] group-hover:translate-x-0.5 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
