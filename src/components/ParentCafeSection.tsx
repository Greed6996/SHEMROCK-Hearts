import React from 'react';
import { Coffee, Wifi, Eye, Heart, Shield, Users, CheckCircle2, MessageSquare } from 'lucide-react';
import { SHEMROCK_CONTACT } from '../data/shemrockData';

interface ParentCafeSectionProps {
  onBookClick: () => void;
}

export const ParentCafeSection: React.FC<ParentCafeSectionProps> = ({ onBookClick }) => {
  return (
    <section id="welcome-room" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-200">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
                alt="SHEMROCK Welcome Room in Beltola Guwahati"
                className="w-full aspect-4/3 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] font-black uppercase tracking-wider bg-rose-600 text-white px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Official Facility
                </span>
                <h3 className="text-xl font-bold font-heading">
                  The SHEMROCK Hearts Welcome Room & Counseling Hub
                </h3>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-5 -right-5 bg-white p-3.5 rounded-2xl border-2 border-amber-200 shadow-xl hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                🤝
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block font-heading">
                  Parent Counseling
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">
                  Personalized 1-on-1 child orientation
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 bg-rose-100 border border-rose-300 text-rose-900 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
                <Heart size={14} className="text-rose-600" /> Parent Experience & Comfort
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
                A Warm, Reassuring Space For <span className="text-rose-600">Every Parent</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                At SHEMROCK Hearts, we recognize that early childhood education is a partnership between home and school. Our dedicated Welcome Room offers parents an inviting haven to converse with our center director, observe classrooms, and discuss their child&apos;s developmental milestones.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                  <Coffee size={18} />
                  <span>Warm Hospitality</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Complimentary tea, coffee, and comfortable lounge seating while your child explores during playdates.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                  <Eye size={18} />
                  <span>Classroom Sightlines</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clear, open views and CCTV monitor access so you always know your child feels safe, settled, and joyful.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <Users size={18} />
                  <span>Parent Counseling</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every admission starts with child-parent counseling to understand learning needs, allergies, and daily routines.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
                  <Wifi size={18} />
                  <span>High-Speed Wi-Fi</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Work peacefully from our parent lounge during settling-in periods without missing a beat.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-md transition-all"
              >
                Schedule A Welcome Room Visit
              </button>
              <a
                href={`tel:${SHEMROCK_CONTACT.phone1}`}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-700 hover:border-rose-400 font-extrabold text-xs sm:text-sm text-center transition-all"
              >
                Talk to Center Head: {SHEMROCK_CONTACT.phone1}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
