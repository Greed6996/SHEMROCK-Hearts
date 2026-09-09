import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SHEMROCK_FACILITIES } from '../data/shemrockData';
import { FacilityItem } from '../types';
import { Sparkles, Shield, Users, Info, X, ArrowRight, Heart, CheckCircle2, Eye } from 'lucide-react';

interface PlayZonesSectionProps {
  onSelectZoneForBooking: (zoneTitle: string) => void;
}

export const PlayZonesSection: React.FC<PlayZonesSectionProps> = ({ onSelectZoneForBooking }) => {
  const [activeFacility, setActiveFacility] = useState<FacilityItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Gross Motor & Sensory',
    'Learning Environment',
    'Interactive Cognitive',
    'Physical & Fresh Air',
    'Social & Emotional',
    'Performing Arts & Confidence',
  ];

  const filteredFacilities = selectedCategory === 'All'
    ? SHEMROCK_FACILITIES
    : SHEMROCK_FACILITIES.filter(
        (f) => f.category.toLowerCase().includes(selectedCategory.toLowerCase()) || f.category === selectedCategory
      );

  return (
    <section id="facilities" className="py-20 bg-amber-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-rose-100 border border-rose-300 text-rose-900 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
            <Sparkles size={14} className="text-rose-600" /> 15 World-Class Child Facilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading">
            Facilities at <span className="text-rose-600">SHEMROCK Hearts</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Every corner of our Beltola campus is thoughtfully engineered to spark joyful curiosity, active gross motor skills, creative confidence, and emotional security.
          </p>

          {/* Quick Facility Checklist Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              'Ball Pool',
              'Activity Arcade',
              'Outdoor Play-Pen',
              'Colourful Classrooms',
              'Doll House',
              'Stage Area',
              'Story Telling Corner',
              'Discovery Centre',
              'IT Resource Centre',
              'Mini Zoo',
              'Concept Centre',
              'Creative Corner',
              'Welcome Room',
              'Dining Area',
              'Celebration Corner',
            ].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-bold bg-white text-slate-700 px-2.5 py-1 rounded-full border border-amber-200/80 shadow-2xs"
              >
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-700 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredFacilities.map((facility, idx) => (
            <motion.div
              key={facility.id}
              initial={{ y: 25, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200/80 hover:border-rose-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Preview with Age Badge */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={facility.imageUrl}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

                {/* Category & Age Group Tags */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-white/95 backdrop-blur-xs text-slate-900 text-[11px] font-black px-2.5 py-0.5 rounded-xl shadow-xs">
                    {facility.ageRange}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                    {facility.category}
                  </span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg sm:text-xl font-bold font-heading drop-shadow-xs">
                    {facility.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {facility.shortDesc}
                </p>

                {/* Key Points */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  {facility.keyFeatures.slice(0, 2).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span className="font-semibold">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Safety Guarantee Pill */}
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <Shield size={13} className="text-emerald-600 shrink-0" />
                  <span className="truncate">{facility.safetyHighlight}</span>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setActiveFacility(facility)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-extrabold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <Info size={14} /> Full Details
                  </button>

                  <button
                    onClick={() => onSelectZoneForBooking(facility.title)}
                    className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition-all shadow-xs flex items-center gap-1"
                  >
                    <span>Tour Campus</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Facility Detail Modal */}
      <AnimatePresence>
        {activeFacility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border-4 border-amber-300 relative max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setActiveFacility(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="relative aspect-16/9 shrink-0">
                <img
                  src={activeFacility.imageUrl}
                  alt={activeFacility.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase font-extrabold bg-rose-600 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    {activeFacility.ageRange}
                  </span>
                  <h3 className="text-2xl font-black font-heading">{activeFacility.title}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto">
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {activeFacility.fullDesc}
                </p>

                <div>
                  <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-2">
                    Child Enrichment Highlights & Safe Equipment
                  </h4>
                  <ul className="space-y-2">
                    {activeFacility.keyFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-bold text-slate-800">
                        <span className="text-rose-500 mt-0.5">💖</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <Shield size={16} className="text-emerald-600 shrink-0" />
                    <span>Safety Standard: {activeFacility.safetyHighlight}</span>
                  </div>
                  {activeFacility.capacity && (
                    <span className="text-[11px] font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-100">
                      {activeFacility.capacity}
                    </span>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setActiveFacility(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      onSelectZoneForBooking(activeFacility.title);
                      setActiveFacility(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md"
                  >
                    Book Campus Visit To See This
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
