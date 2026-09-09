import React from 'react';
import { PARENT_REVIEWS } from '../data/shemrockData';
import { Star, CheckCircle2, MessageSquareQuote, Heart } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-amber-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-rose-100 border border-rose-300 text-rose-900 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
            <Heart size={14} className="text-rose-600 fill-rose-600" /> Guwahati Parent Voices
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading">
            Stories of Joy from <span className="text-rose-600">SHEMROCK Parents</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Read how our nurturing educators, colourful classrooms, and safe ball pool have shaped happy, confident little learners in Guwahati.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PARENT_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200/80 hover:border-rose-300 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Visit type */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">{rev.date}</span>
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium italic">
                  &ldquo;{rev.reviewText}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatarUrl}
                    alt={rev.parentName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-rose-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 font-heading">
                      {rev.parentName}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {rev.childInfo}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                  {rev.visitType}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
