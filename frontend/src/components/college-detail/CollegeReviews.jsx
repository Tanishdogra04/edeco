import { Star } from 'lucide-react';

export default function CollegeReviews({ college }) {
  if (!college || !college.reviews) return null;

  return (
    <div id="section-reviews" className="scroll-mt-36">
      <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
        <Star className="text-amber-500" fill="currentColor" /> Student Reviews
      </h2>
      
      <div className="flex overflow-x-auto hide-scrollbar gap-6 snap-x snap-mandatory pb-4">
        {college.reviews.map((review, i) => (
          <div key={i} className="min-w-[300px] md:min-w-[350px] bg-white rounded-3xl p-6 border border-slate-200 shadow-sm snap-start shrink-0 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={16} fill={idx < review.rating ? "currentColor" : "none"} className={idx >= review.rating ? "text-slate-300" : ""} />
                ))}
              </div>
              <p className="text-slate-600 font-medium italic mb-6">"{review.text}"</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200">
                {review.name ? review.name.charAt(0) : 'S'}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                <p className="text-xs font-semibold text-slate-400">{review.course}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
