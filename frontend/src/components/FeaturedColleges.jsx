import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Star, MapPin, GraduationCap, ChevronLeft, ChevronRight, Check } from 'lucide-react';

// Swiper CSS imports
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function FeaturedColleges({ onToggleCompare, comparedColleges, onViewDetails, onCounsellingClick, colleges = [], isLoading = false }) {
  return (
    <section id="colleges" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0f71cd]/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left space-y-2">
            <span className="text-[12px] font-bold text-[#0f71cd] uppercase tracking-widest block">
              Curated Selection
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F141E] tracking-tight">
              Featured Partners & Institutions
            </h2>
            <p className="text-[14px] text-[#0F141E]/60 max-w-lg font-medium">
              Highly ranked universities verified for placements, faculty excellence, and student environment.
            </p>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <div className="swiper-prev-btn p-3 rounded-xl bg-white border border-slate-200 text-[#0F141E] hover:text-[#0f71cd] shadow-sm active:scale-95 transition-all cursor-pointer">
              <ChevronLeft size={18} />
            </div>
            <div className="swiper-next-btn p-3 rounded-xl bg-white border border-slate-200 text-[#0F141E] hover:text-[#0f71cd] shadow-sm active:scale-95 transition-all cursor-pointer">
              <ChevronRight size={18} />
            </div>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-full flex flex-col justify-between rounded-xl overflow-hidden bg-white border border-slate-100 p-5 space-y-4 animate-pulse shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                  <div className="relative h-48 w-full bg-slate-100 rounded-xl overflow-hidden shrink-0" />
                  <div className="space-y-3 flex-grow text-left">
                    <div className="h-2.5 w-1/4 bg-slate-100 rounded-full" />
                    <div className="h-4.5 w-3/4 bg-slate-100 rounded-full" />
                    <div className="h-2.5 w-1/2 bg-slate-100 rounded-full" />
                    <div className="h-16 w-full bg-slate-50 rounded-xl mt-4" />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="h-9 flex-1 bg-slate-100 rounded-lg" />
                    <div className="h-9 flex-1 bg-slate-100 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : colleges.length === 0 ? (
            <div className="py-20 text-center bg-slate-50 border border-slate-100 rounded-2xl max-w-lg mx-auto shadow-2xs">
              <GraduationCap size={40} className="mx-auto text-slate-400/80 mb-3" />
              <span className="text-sm font-semibold text-slate-500">No institutions found matching your criteria.</span>
            </div>
          ) : (
            <>
              <Swiper
                key={colleges.map((c) => c.id || c._id).join(',')}
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
                {colleges.map((college, index) => {
                  const isCompared = comparedColleges.some(c => c.id === college.id);
                  const collegeId = college.id || college._id || index;
                  
                  return (
                     <SwiperSlide key={collegeId} className="h-auto">
                      <div className="h-full flex flex-col justify-between rounded-xl overflow-hidden bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(17,0,81,0.05)] hover:border-slate-200/60 transition-all duration-300 group">
                        
                        {/* Header Image Area */}
                        <div className="relative h-48 w-full overflow-hidden shrink-0">
                          <img 
                            src={college.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80'} 
                            alt={college.name || 'College Image'} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                          
                          {/* NIRF Rank Badges */}
                          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#0f71cd]/90 backdrop-blur-xs text-white text-[9px] font-bold tracking-wider uppercase border border-white/10 shadow-sm">
                            NIRF {college.nirf || '#N/A'}
                          </div>

                          {/* Rating Badge */}
                          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold shadow-sm border border-slate-100/50">
                            <Star size={10} className="text-yellow-500" fill="currentColor" />
                            <span>{college.rating || '4.5'}</span>
                          </div>

                          {/* Logo tag floating */}
                          <div className="absolute bottom-3 left-3 w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-tt-talent font-bold text-xs text-[#0F141E] shadow-md overflow-hidden p-0.5" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                            {college.logo ? (
                              college.logo.startsWith('http') || college.logo.startsWith('/') || college.logo.startsWith('data:') ? (
                                <img src={college.logo} alt="" className="w-full h-full object-cover rounded-md" />
                              ) : (
                                <span>{college.logo}</span>
                              )
                            ) : (
                              <span>{college.name ? college.name.charAt(0) : 'C'}</span>
                            )}
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 text-left flex-1 flex flex-col justify-between">
                          <div>
                            {/* Domain name */}
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                              {college.stream || 'Engineering'}
                            </span>

                            {/* College Name */}
                            <h3 className="font-tt-talent font-bold text-base text-[#0F141E] tracking-tight line-clamp-1 hover:text-[#0f71cd] transition-colors mb-1" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                              {college.name || 'Unnamed Institution'}
                            </h3>

                            {/* Location */}
                            <div className="flex items-center gap-1 text-slate-400 mt-1 mb-4">
                              <MapPin size={12} />
                              <span className="text-xs font-semibold">{college.location || 'India'}</span>
                            </div>

                            {/* College Key Stats Grid */}
                            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 border border-slate-100/60 rounded-lg mb-5 text-left">
                              <div className="pr-2">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Avg Placement</span>
                                <span className="text-[13px] font-black text-slate-700 block mt-0.5">{college.package || college.stats?.avgPackage || 'TBD'}</span>
                              </div>
                              <div className="pl-4 border-l border-slate-200/60">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Highest Pkg</span>
                                <span className="text-[13px] font-black text-slate-700 block mt-0.5">{college.highestPackage || college.stats?.highestPackage || 'TBD'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center gap-2 mt-auto">
                            {/* Compare toggle */}
                            <button
                              onClick={() => onToggleCompare(college)}
                              className={`flex-1 h-9 flex items-center justify-center gap-1.5 rounded-lg text-xs font-tt-talent font-bold transition-all duration-300 cursor-pointer ${
                                isCompared 
                                  ? 'bg-[#0f71cd] text-white border-transparent shadow-xs'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                              }`}
                              style={{ fontFamily: '"TT Talent", sans-serif' }}
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
                              to={`/colleges/${collegeId}`}
                              className="flex-1 h-9 flex items-center justify-center gap-1.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white text-xs font-tt-talent font-bold rounded-lg transition-all duration-300 cursor-pointer text-center"
                              style={{ fontFamily: '"TT Talent", sans-serif' }}
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
            </>
          )}
        </div>

      </div>
    </section>
  );
}
