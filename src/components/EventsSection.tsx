import React from 'react';
import { SCHEDULE_EVENTS } from '../data/shemrockData';
import { Calendar, Clock, Sparkles, User, ArrowRight, Heart } from 'lucide-react';

interface EventsSectionProps {
  onBookClick: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onBookClick }) => {
  return (
    <section id="daily-schedule" className="py-20 bg-amber-50/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-rose-100 border border-rose-300 text-rose-900 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
            <Sparkles size={14} className="text-rose-600" /> A Day At SHEMROCK Hearts
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading">
            Daily Routine & <span className="text-rose-600">Enrichment Schedule</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Our research-backed early childhood curriculum balances structured cognitive concept sessions with gross motor play, musical storytelling, and nutritious dining habits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCHEDULE_EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl p-6 border-2 border-slate-200/80 hover:border-rose-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${event.color}`}>
                    {event.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {event.ageRange}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 font-heading group-hover:text-rose-600 transition-colors">
                  {event.title}
                </h3>

                <div className="mt-2 space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700">
                    <Clock size={13} className="text-rose-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={13} className="text-slate-400" />
                    <span>Mentored by {event.instructor}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed font-medium">
                  {event.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={onBookClick}
                  className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Attend Trial Session</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
