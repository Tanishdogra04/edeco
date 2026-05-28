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
      desc: "IT & Start-up Capital"
    },
    { 
      name: "Delhi NCR", 
      colleges: "150+ Colleges", 
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80",
      desc: "National Capital Region"
    },
    { 
      name: "Mumbai", 
      colleges: "90+ Colleges", 
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80",
      desc: "Financial & Media Hub"
    },
    { 
      name: "Pune", 
      colleges: "110+ Colleges", 
      image: "https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&w=400&q=80",
      desc: "Oxford of the East"
    },
    { 
      name: "Hyderabad", 
      colleges: "80+ Colleges", 
      image: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&w=400&q=80",
      desc: "Tech & Heritage Center"
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
    <section className="py-16 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div className="text-left space-y-2">
            <span className="text-[12px] font-bold text-brand-600 uppercase tracking-widest block">
              Study Destinations
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Explore Colleges by City
            </h2>
            <p className="text-[14px] text-slate-400 max-w-md font-medium">
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
              className="min-w-[280px] sm:min-w-[320px] h-[380px] rounded-3xl overflow-hidden relative group snap-start cursor-pointer shadow-lg shadow-slate-100 border border-slate-100/50"
            >
              {/* Image with zoom effect on hover */}
              <div className="absolute inset-0 bg-slate-900">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>

              {/* Content overlaid on image */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
                
                {/* Location Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white w-max mb-3">
                  <MapPin size={12} />
                  <span className="text-[10px] font-bold tracking-wide uppercase">{city.desc}</span>
                </div>

                {/* City name */}
                <h3 className="font-display font-extrabold text-2xl text-white tracking-tight leading-none mb-1">
                  {city.name}
                </h3>

                {/* Colleges Count */}
                <div className="flex items-center gap-1.5 text-slate-200 mt-1">
                  <Building2 size={14} className="text-brand-500" />
                  <span className="text-[13px] font-semibold">{city.colleges}</span>
                </div>

                {/* Hover line separator and CTA */}
                <div className="mt-4 pt-4 border-t border-white/10 overflow-hidden h-0 group-hover:h-12 transition-all duration-300 flex items-center justify-between text-white">
                  <span className="text-xs font-bold uppercase tracking-wider">Explore Colleges</span>
                  <ChevronRight size={16} className="text-brand-500 group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
