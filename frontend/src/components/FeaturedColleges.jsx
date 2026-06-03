import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Star, MapPin, BadgePercent, GraduationCap, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Swiper CSS imports
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const collegesData = [
  {
    id: "iitb",
    name: "Indian Institute of Technology (IIT) Bombay",
    logo: "IITB",
    stream: "Engineering",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80",
    location: "Mumbai, Maharashtra",
    rating: "4.9",
    fees: "₹2.2 Lakhs / Yr",
    nirf: "#3 Engineering",
    package: "₹21.8 LPA Avg",
    highestPackage: "₹1.6 Crore",
    reviews: "1,450 Reviews"
  },
  {
    id: "iima",
    name: "Indian Institute of Management (IIM) Ahmedabad",
    logo: "IIMA",
    stream: "Management",
    image: "https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?auto=format&fit=crop&w=600&q=80",
    location: "Ahmedabad, Gujarat",
    rating: "4.9",
    fees: "₹11.5 Lakhs / Yr",
    nirf: "#1 Management",
    package: "₹32.5 LPA Avg",
    highestPackage: "₹1.1 Crore",
    reviews: "980 Reviews"
  },
  {
    id: "bits",
    name: "Birla Institute of Technology & Science (BITS)",
    logo: "BITS",
    stream: "Engineering",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    location: "Pilani, Rajasthan",
    rating: "4.7",
    fees: "₹4.5 Lakhs / Yr",
    nirf: "#20 Engineering",
    package: "₹19.2 LPA Avg",
    highestPackage: "₹72.0 LPA",
    reviews: "1,120 Reviews"
  },
  {
    id: "aiims",
    name: "All India Institute of Medical Sciences (AIIMS)",
    logo: "AIIMS",
    stream: "Medical",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
    location: "New Delhi, Delhi",
    rating: "4.8",
    fees: "₹1,628 / Yr",
    nirf: "#1 Medical",
    package: "₹18.0 LPA Avg",
    highestPackage: "₹45.0 LPA",
    reviews: "670 Reviews"
  },
  {
    id: "siu",
    name: "Symbiosis Institute of Business Management",
    logo: "SIBM",
    stream: "Management",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
    location: "Pune, Maharashtra",
    rating: "4.5",
    fees: "₹11.2 Lakhs / Yr",
    nirf: "#17 Management",
    package: "₹23.0 LPA Avg",
    highestPackage: "₹49.0 LPA",
    reviews: "830 Reviews"
  },
  {
    id: "nlsiu",
    name: "National Law School of India University",
    logo: "NLSIU",
    stream: "Law",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&w=600&q=80",
    location: "Bengaluru, Karnataka",
    rating: "4.7",
    fees: "₹2.8 Lakhs / Yr",
    nirf: "#1 Law",
    package: "₹16.0 LPA Avg",
    highestPackage: "₹38.0 LPA",
    reviews: "450 Reviews"
  }
];

export default function FeaturedColleges({ onToggleCompare, comparedColleges, onViewDetails, onCounsellingClick, colleges = [] }) {
  return (
    <section id="colleges" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-purple/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left space-y-2">
            <span className="text-[12px] font-bold text-brand-600 uppercase tracking-widest block">
              Curated Selection
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-800 tracking-tight">
              Featured Partners & Institutions
            </h2>
            <p className="text-[14px] text-brand-800/60 max-w-lg font-medium">
              Highly ranked universities verified for placements, faculty excellence, and student environment.
            </p>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <div className="swiper-prev-btn p-3 rounded-xl bg-white border border-brand-200 text-brand-800 hover:text-brand-600 shadow-sm active:scale-95 transition-all cursor-pointer">
              <ChevronLeft size={18} />
            </div>
            <div className="swiper-next-btn p-3 rounded-xl bg-white border border-brand-200 text-brand-800 hover:text-brand-600 shadow-sm active:scale-95 transition-all cursor-pointer">
              <ChevronRight size={18} />
            </div>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-next-btn',
              prevEl: '.swiper-prev-btn',
            }}
            pagination={{ clickable: true, el: '.swiper-custom-pagination' }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {colleges.map((college) => {
              const isCompared = comparedColleges.some(c => c.id === college.id);
              
              return (
                 <SwiperSlide key={college.id} className="h-auto">
                  <div className="h-full flex flex-col justify-between rounded-xl overflow-hidden bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(17,0,81,0.05)] hover:border-slate-200/60 transition-all duration-300 group">
                    
                    {/* Header Image Area */}
                    <div className="relative h-48 w-full overflow-hidden shrink-0">
                      <img 
                        src={college.image} 
                        alt={college.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                      
                      {/* NIRF Rank Badges */}
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#110051]/90 backdrop-blur-xs text-white text-[9px] font-bold tracking-wider uppercase border border-white/10 shadow-sm">
                        NIRF {college.nirf}
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold shadow-sm border border-slate-100/50">
                        <Star size={10} className="text-yellow-500" fill="currentColor" />
                        <span>{college.rating}</span>
                      </div>

                      {/* Logo tag floating */}
                      <div className="absolute bottom-3 left-3 w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-display font-bold text-xs text-[#110051] shadow-md">
                        {college.logo}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 text-left flex-1 flex flex-col justify-between">
                      <div>
                        {/* Domain name */}
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                          {college.stream}
                        </span>

                        {/* College Name */}
                        <h3 className="font-display font-bold text-base text-[#110051] tracking-tight line-clamp-1 hover:text-[#1a0073] transition-colors mb-1">
                          {college.name}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1 text-slate-400 mt-1 mb-4">
                          <MapPin size={12} />
                          <span className="text-xs font-semibold">{college.location}</span>
                        </div>

                        {/* College Key Stats Grid */}
                        <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 border border-slate-100/60 rounded-lg mb-5 text-left">
                          <div className="pr-2">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Avg Placement</span>
                            <span className="text-[13px] font-black text-slate-700 block mt-0.5">{college.package}</span>
                          </div>
                          <div className="pl-4 border-l border-slate-200/60">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Highest Pkg</span>
                            <span className="text-[13px] font-black text-slate-700 block mt-0.5">{college.highestPackage}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 mt-auto">
                        {/* Compare toggle */}
                        <button
                          onClick={() => onToggleCompare(college)}
                          className={`flex-1 h-9 flex items-center justify-center gap-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                            isCompared 
                              ? 'bg-[#110051] text-white border-transparent shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {isCompared ? (
                            <>
                              <Check size={14} />
                              <span>Compared</span>
                            </>
                          ) : (
                            <span>Add to Compare</span>
                          )}
                        </button>

                        {/* View Details */}
                        <Link 
                          to={`/colleges/${college.id}`}
                          className="flex-1 h-9 flex items-center justify-center gap-1.5 bg-[#110051] hover:bg-[#1a0073] text-white text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer text-center"
                        >
                          View Details
                        </Link>
                      </div>

                    </div>

                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom pagination indicators */}
          <div className="swiper-custom-pagination flex justify-center gap-1.5 mt-8"></div>
        </div>

      </div>
    </section>
  );
}
