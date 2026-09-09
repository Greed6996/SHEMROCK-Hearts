import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Ticket, Phone, Clock, Menu, X, Heart, ShieldCheck, MapPin } from 'lucide-react';
import { SHEMROCK_CONTACT } from '../data/shemrockData';

interface NavbarProps {
  onOpenBooking: (programId?: string) => void;
  onOpenPasses: () => void;
  savedPassesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenPasses, savedPassesCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Facilities (15+)', href: '#facilities' },
    { label: 'Programs (2-5+ Yrs)', href: '#programs' },
    { label: 'Admissions Open', href: '#admissions' },
    { label: 'Photo Tour', href: '#photo-gallery' },
    { label: 'Daily Routine', href: '#daily-schedule' },
    { label: 'Welcome Room', href: '#welcome-room' },
    { label: 'Safety & CCTV', href: '#safety' },
    { label: 'Contact', href: '#contact-location' },
  ];

  return (
    <>
      {/* Playful Top Announcement Ribbon */}
      <div className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 text-slate-950 py-2 px-4 text-xs font-black text-center flex flex-wrap items-center justify-center gap-2 select-none shadow-xs">
        <span className="inline-block animate-bounce">🎒</span>
        <span className="bg-white/90 text-rose-700 px-2 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide">
          Admissions Open 2025–26
        </span>
        <span className="font-extrabold">SHEMROCK Hearts Preschool • Survey, Beltola, Guwahati</span>
        <span className="hidden sm:inline">•</span>
        <a
          href="tel:9854017150"
          className="underline font-black hover:text-white transition-colors flex items-center gap-1"
        >
          <Phone size={12} /> Call: 9854017150 / 8638370611
        </a>
        <button
          onClick={() => onOpenBooking()}
          className="ml-2 bg-slate-900 text-white hover:bg-slate-800 text-[11px] px-2.5 py-0.5 rounded-full font-bold transition-all shadow-2xs"
        >
          Book Free Campus Tour
        </button>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-100 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & SHEMROCK Mascot / Heart Emblem */}
          <a href="#" className="flex items-center gap-3 group select-none">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-amber-400 to-sky-400 p-0.5 shadow-md group-hover:rotate-6 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                {/* Cheerful Heart / Shemrock Mascot Icon */}
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                  💖
                </span>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[9px] text-white font-bold items-center justify-center">
                  ★
                </span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-900 font-heading">
                  SHEMROCK <span className="text-rose-600">Hearts</span>
                </span>
                <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider hidden md:inline-block">
                  Guwahati
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5 truncate">
                <MapPin size={11} className="text-rose-500 shrink-0" />
                <span className="truncate">Chandan Nagar, Beltola • India&apos;s 1st Playschool Chain</span>
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-black text-slate-700 hover:text-rose-600 transition-colors relative py-1 hover:translate-y-[-1px]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* View Passes button if user has bookings */}
            {savedPassesCount > 0 && (
              <button
                onClick={onOpenPasses}
                className="relative flex items-center gap-1.5 text-xs font-extrabold px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors shadow-xs"
              >
                <Ticket size={15} />
                <span>Visit Passes</span>
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-black">
                  {savedPassesCount}
                </span>
              </button>
            )}

            {/* Quick Call */}
            <a
              href={`tel:${SHEMROCK_CONTACT.phone1}`}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-rose-600 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Phone size={14} className="text-emerald-600" />
              <span className="hidden lg:inline">{SHEMROCK_CONTACT.phone1}</span>
            </a>

            {/* Primary CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-1.5 text-xs font-black px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-lg transition-all hover:scale-102 active:scale-98"
            >
              <Calendar size={15} />
              <span>Book Campus Tour</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            {savedPassesCount > 0 && (
              <button
                onClick={onOpenPasses}
                className="relative p-2 rounded-xl bg-purple-100 text-purple-700"
                aria-label="View passes"
              >
                <Ticket size={18} />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-white text-[9px] flex items-center justify-center font-black">
                  {savedPassesCount}
                </span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-b-2 border-amber-200 px-4 pt-3 pb-6 space-y-3 z-30 shadow-xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-50 text-slate-800 font-bold text-xs hover:bg-rose-50 hover:text-rose-700 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-rose-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar size={16} /> Book Free Campus Tour & Counseling
              </button>

              <div className="flex gap-2">
                <a
                  href={`tel:${SHEMROCK_CONTACT.phone1}`}
                  className="flex-1 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold text-xs flex items-center justify-center gap-1.5"
                >
                  <Phone size={14} /> {SHEMROCK_CONTACT.phone1}
                </a>
                <a
                  href={`tel:${SHEMROCK_CONTACT.phone2}`}
                  className="flex-1 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold text-xs flex items-center justify-center gap-1.5"
                >
                  <Phone size={14} /> {SHEMROCK_CONTACT.phone2}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
