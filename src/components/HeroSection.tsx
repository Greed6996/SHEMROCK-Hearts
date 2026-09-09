import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star, ShieldCheck, Heart, ArrowRight, Phone, CheckCircle, Smile, MapPin, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SHEMROCK_CONTACT, SHEMROCK_STATS } from '../data/shemrockData';

interface HeroSectionProps {
  onBookClick: () => void;
  onExploreZonesClick: () => void;
  onGalleryClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookClick,
  onExploreZonesClick,
  onGalleryClick,
}) => {
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheering' | 'waving'>('happy');
  const [mascotMessage, setMascotMessage] = useState('Welcome to SHEMROCK Hearts! Tap me for a high five! 🧸');

  const triggerMascotCheer = () => {
    setMascotMood('cheering');
    setMascotMessage('YAAAY! High Five! 💖 Welcome to the SHEMROCK family in Guwahati!');

    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.7, x: 0.8 },
      colors: ['#f43f5e', '#fbbf24', '#38bdf8', '#34d399', '#a855f7'],
    });

    setTimeout(() => {
      setMascotMood('happy');
      setMascotMessage('Ready to explore our Ball Pool & Chirpy Classrooms?');
    }, 3200);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-100/50 via-amber-50/40 to-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Animated Floating Background Elements (Playschool Aesthetic) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Smiling Sun in Top Right */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-10 -right-10 sm:top-4 sm:right-10 w-36 h-36 sm:w-48 sm:h-48 text-amber-400 opacity-85"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
            <circle cx="50" cy="50" r="28" fill="#FBBF24" />
            {/* Sun Rays */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="50"
                y1="14"
                x2="50"
                y2="4"
                stroke="#F59E0B"
                strokeWidth="4"
                strokeLinecap="round"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
          </svg>
        </motion.div>

        {/* Floating Cartoon Cloud 1 */}
        <motion.div
          animate={{ x: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-4 sm:left-20 w-32 sm:w-48 opacity-75"
        >
          <svg viewBox="0 0 120 60" className="w-full fill-white drop-shadow-sm">
            <path d="M20,45 Q15,45 10,40 Q5,30 15,22 Q20,10 38,15 Q48,5 65,12 Q78,5 92,16 Q108,12 110,28 Q118,35 110,45 Z" />
          </svg>
        </motion.div>

        {/* Floating Cartoon Cloud 2 with cute eyes */}
        <motion.div
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-44 right-1/4 w-36 sm:w-56 opacity-85 hidden md:block"
        >
          <svg viewBox="0 0 120 60" className="w-full fill-white drop-shadow-xs">
            <path d="M20,45 Q15,45 10,40 Q5,30 15,22 Q20,10 38,15 Q48,5 65,12 Q78,5 92,16 Q108,12 110,28 Q118,35 110,45 Z" />
            <circle cx="50" cy="30" r="2.5" fill="#334155" />
            <circle cx="70" cy="30" r="2.5" fill="#334155" />
            <path d="M57,35 Q60,39 63,35" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </motion.div>

        {/* Rainbow Arc SVG background accent */}
        <div className="absolute -left-20 top-1/3 w-80 h-80 opacity-30">
          <svg viewBox="0 0 200 200" className="w-full h-full fill-none">
            <circle cx="100" cy="100" r="70" stroke="#f43f5e" strokeWidth="6" />
            <circle cx="100" cy="100" r="64" stroke="#fb923c" strokeWidth="6" />
            <circle cx="100" cy="100" r="58" stroke="#facc15" strokeWidth="6" />
            <circle cx="100" cy="100" r="52" stroke="#4ade80" strokeWidth="6" />
            <circle cx="100" cy="100" r="46" stroke="#38bdf8" strokeWidth="6" />
            <circle cx="100" cy="100" r="40" stroke="#a855f7" strokeWidth="6" />
          </svg>
        </div>

        {/* Floating Stars & Hearts */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-36 left-1/3 text-amber-400 text-2xl"
        >
          ⭐
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute top-24 right-1/3 text-rose-400 text-xl"
        >
          💖
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines, Highlights, CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Friendly Pill Tag */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/90 border-2 border-rose-200 px-4 py-1.5 rounded-full shadow-xs text-xs sm:text-sm font-extrabold text-rose-700"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>🏆 Member of SHEMROCK: India&apos;s 1st Playschool Chain Since 1989</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] font-heading tracking-tight"
            >
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 underline decoration-wavy decoration-amber-300">
                SHEMROCK Hearts
              </span>{' '}
              Preschool, Guwahati
            </motion.h1>

            {/* Subtitle with Authentic Philosophy */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Nestled in the heart of Beltola, Guwahati, we transform your child&apos;s early education into a joyful adventure. With a kaleidoscope of colors, warm teachers, and 15+ world-class facilities, every day starts and ends with love.
            </motion.p>

            {/* Value Checkmarks */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm font-bold text-slate-700"
            >
              <div className="flex items-center gap-1.5 bg-rose-50 text-rose-800 px-3 py-1 rounded-full border border-rose-200">
                <CheckCircle size={15} className="text-rose-600" />
                <span>Admissions Open (Play Group to KG)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
                <CheckCircle size={15} className="text-amber-600" />
                <span>15+ Child Facilities & Ball Pool</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle size={15} className="text-emerald-600" />
                <span>24/7 CCTV & Safe Van Transport</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2"
            >
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white font-black text-base shadow-xl shadow-rose-500/20 hover:shadow-2xl hover:scale-103 transition-all transform active:scale-95"
                id="hero-book-button"
              >
                <Sparkles size={18} className="text-amber-200 animate-pulse" />
                <span>Book Free Campus Visit & Playdate</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onExploreZonesClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-rose-300 text-slate-800 hover:text-rose-600 font-extrabold text-sm shadow-sm hover:bg-rose-50/40 transition-all"
                id="hero-facilities-button"
              >
                <span>Explore 15 Facilities</span>
              </button>

              <a
                href={`tel:${SHEMROCK_CONTACT.phone1}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-all"
              >
                <Phone size={16} />
                <span>{SHEMROCK_CONTACT.phone1}</span>
              </a>
            </motion.div>

            {/* Nationwide SHEMROCK Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left"
            >
              {SHEMROCK_STATS.map((st) => (
                <div key={st.label} className="bg-white/80 border border-amber-200/80 p-2.5 rounded-2xl shadow-2xs">
                  <span className="text-xl sm:text-2xl font-black text-rose-600 font-heading block">
                    {st.value}
                  </span>
                  <span className="text-[11px] font-black text-slate-800 block">
                    {st.label}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    {st.sub}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Visual Showcase & Animated Mascot */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Colorful Card Base with Border Offset */}
              <div className="absolute -inset-2 bg-gradient-to-r from-rose-400 via-amber-300 to-sky-400 rounded-3xl transform rotate-2 opacity-70 blur-xs" />

              <div className="relative bg-white p-3.5 rounded-3xl shadow-xl border-4 border-amber-200">
                {/* Main Hero Photo (Preschool Classroom & Children) */}
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-inner group">
                  <img
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80"
                    alt="Children learning in SHEMROCK Hearts colourful classroom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Floating Live Badge inside Hero Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full inline-block mb-1">
                        Beltola, Guwahati Campus
                      </span>
                      <p className="text-sm font-bold">Chandan Nagar, Survey</p>
                    </div>

                    <span className="flex items-center gap-1.5 bg-rose-600/90 backdrop-blur-xs text-white text-xs font-black px-2.5 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      Open Mon–Sat
                    </span>
                  </div>
                </div>

                {/* Mini Image Ticker Underneath (Ball pool, Playpen, Art) */}
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="relative rounded-xl overflow-hidden aspect-4/3 border-2 border-rose-200">
                    <img
                      src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=300&q=80"
                      alt="Ball Pool"
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1 rounded">Ball Pool</span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden aspect-4/3 border-2 border-emerald-200">
                    <img
                      src="https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?auto=format&fit=crop&w=300&q=80"
                      alt="Outdoor Play-Pen"
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1 rounded">Play-Pen</span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden aspect-4/3 border-2 border-purple-200">
                    <img
                      src="https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=300&q=80"
                      alt="Stage Area"
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1 rounded">Stage Area</span>
                  </div>
                </div>
              </div>

              {/* Interactive Mascot "Shemmy The Bear" (Kids Animation Touchpoint) */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.6 }}
                onClick={triggerMascotCheer}
                className="absolute -bottom-6 -left-6 sm:-left-10 bg-white p-3 rounded-2xl border-2 border-amber-300 shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all group z-30 max-w-[220px]"
                title="Click Shemmy for a cheerful surprise!"
              >
                <div className="flex items-start gap-2.5">
                  <div className="relative w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-3xl shrink-0 group-hover:animate-bounce">
                    {mascotMood === 'cheering' ? '🎉' : '🧸'}
                    <span className="absolute -top-1 -right-1 text-xs">⭐</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <strong className="text-xs font-black text-slate-800 font-heading">Shemmy Mascot</strong>
                      <span className="text-[9px] bg-rose-100 text-rose-700 px-1 rounded font-bold">Tap!</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-tight mt-0.5 font-semibold">
                      {mascotMessage}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Award Emblem */}
              <div className="absolute -top-5 -right-5 bg-white p-2.5 rounded-2xl border-2 border-amber-300 shadow-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
                  <Award size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-black text-slate-900 block font-heading">Award-Winning</span>
                  <span className="text-[9px] text-slate-500 font-bold">India&apos;s No. 1 Chain</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
