import React from 'react';
import { ShieldCheck, Sparkles, Video, UserCheck, Baby, HeartPulse, Droplets, Car } from 'lucide-react';

export const SafetySection: React.FC = () => {
  const safetyCards = [
    {
      icon: Video,
      title: '24/7 CCTV & Security Guard',
      desc: 'High-definition cameras continuously monitor classrooms, play-pen, entry gates, and activity zones with live feed access in the Welcome Room.',
      color: 'bg-rose-100 text-rose-700 border-rose-300',
    },
    {
      icon: Sparkles,
      title: 'Deep Sanitized Ball Pool & Toys',
      desc: 'All colorful balls, learning aids, activity arcade tools, and soft toys undergo strict daily sanitization using child-safe hospital grade cleaners.',
      color: 'bg-amber-100 text-amber-700 border-amber-300',
    },
    {
      icon: UserCheck,
      title: 'Loving Female Attendants (Didis)',
      desc: 'Trained, warm female caretakers assist children at all times during washroom routines, hand-washing, dining, and outdoor play.',
      color: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    },
    {
      icon: Baby,
      title: 'Rounded Edges & Non-Toxic Campus',
      desc: 'Furniture, doorways, activity tables, and play equipment are custom crafted with smooth rounded curves, safety corner guards, and lead-free paints.',
      color: 'bg-sky-100 text-sky-700 border-sky-300',
    },
    {
      icon: Droplets,
      title: 'Multi-Stage RO Purified Water',
      desc: 'Child-accessible RO drinking stations ensure every sip of water is pure and hygienic throughout the humid Guwahati seasons.',
      color: 'bg-purple-100 text-purple-700 border-purple-300',
    },
    {
      icon: Car,
      title: 'Gated Perimeter & Van Route Safety',
      desc: 'Secure single-entry gate with parent ID check-in. Optional school van transport with verified drivers and female attendants on board.',
      color: 'bg-indigo-100 text-indigo-700 border-indigo-300',
    },
  ];

  return (
    <section id="safety" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
            <ShieldCheck size={14} className="text-emerald-600" /> Complete Parent Peace of Mind
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading">
            Safety, Hygiene & <span className="text-emerald-600">Child Well-being</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            As a premier center of the SHEMROCK Preschool Chain, SHEMROCK Hearts adheres to rigorous nationwide safety and hygiene protocols.
          </p>
        </div>

        {/* Safety Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-3xl p-6 border-2 border-slate-200/80 hover:border-emerald-300 hover:bg-white shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.color} group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 font-heading">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  <ShieldCheck size={13} />
                  <span>SHEMROCK Standard Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
