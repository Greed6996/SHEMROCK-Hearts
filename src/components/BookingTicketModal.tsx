import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, QrCode, Calendar, Clock, User, Sparkles, Printer, MapPin, Phone, MessageSquare, Heart } from 'lucide-react';
import { VisitBookingSubmission } from '../types';
import { SHEMROCK_CONTACT } from '../data/shemrockData';

interface BookingTicketModalProps {
  booking: VisitBookingSubmission | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingTicketModal: React.FC<BookingTicketModalProps> = ({ booking, isOpen, onClose }) => {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(booking.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-8 border-4 border-rose-300"
          id="digital-ticket-modal"
        >
          {/* Top Fun Banner */}
          <div className="relative bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 p-6 text-white text-center">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Close ticket"
            >
              <X size={20} />
            </button>

            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-rose-600 mb-2 shadow-md animate-bounce">
              <CheckCircle2 size={30} />
            </div>
            <h3 className="text-2xl font-black font-heading tracking-wide">Campus Visit Pass Confirmed!</h3>
            <p className="text-rose-100 text-xs font-semibold mt-1">
              Welcome to the SHEMROCK Hearts Preschool family in Guwahati!
            </p>
          </div>

          {/* Ticket Card Body */}
          <div className="p-6 bg-amber-50/50">
            {/* Perforated ticket container */}
            <div className="bg-white rounded-2xl p-5 border-2 border-dashed border-rose-300 shadow-sm relative">
              {/* Notches for ticket effect */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-50/50 border-r-2 border-rose-300" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-50/50 border-l-2 border-rose-300" />

              {/* Pass Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 mb-1">
                    {booking.visitType}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 font-heading">
                    SHEMROCK Hearts Preschool
                  </h4>
                  <p className="text-[11px] text-slate-500 font-bold">
                    Survey, Beltola, Guwahati • India&apos;s 1st Playschool Chain
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Pass Code</span>
                  <span className="text-xs font-black text-rose-600 font-mono tracking-wider">
                    {booking.bookingCode}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div className="bg-slate-50 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold block flex items-center gap-1">
                    <Calendar size={11} className="text-rose-600" />
                    <span>Visit Date</span>
                  </span>
                  <strong className="text-slate-800 text-[11px]">{formattedDate}</strong>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold block flex items-center gap-1">
                    <Clock size={11} className="text-rose-600" />
                    <span>Time Slot</span>
                  </span>
                  <strong className="text-slate-800 text-[11px]">{booking.timeSlot}</strong>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold block flex items-center gap-1">
                    <User size={11} className="text-rose-600" />
                    <span>Child Name & Age</span>
                  </span>
                  <strong className="text-slate-800 text-[11px]">
                    {booking.childName} ({booking.childAge} yrs)
                  </strong>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold block flex items-center gap-1">
                    <Heart size={11} className="text-rose-600" />
                    <span>Program of Interest</span>
                  </span>
                  <strong className="text-slate-800 text-[11px] truncate block">
                    {booking.programName}
                  </strong>
                </div>
              </div>

              {/* Parent Details & Location */}
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 text-xs space-y-1 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-bold">Parent / Guardian:</span>
                  <strong className="text-slate-900">{booking.parentName} ({booking.parentPhone})</strong>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Locality in Guwahati:</span>
                  <span className="font-semibold text-slate-700">{booking.addressLocality}</span>
                </div>
              </div>

              {/* QR Verification Box */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center p-1 shadow-inner">
                    <QrCode size={42} />
                  </div>
                  <div className="text-[11px]">
                    <span className="text-slate-500 font-bold block">Entry Verification:</span>
                    <span className="text-slate-800 font-black">Scan at Welcome Room Desk</span>
                    <span className="text-[10px] text-emerald-700 font-bold block">100% Free Campus Tour</span>
                  </div>
                </div>

                <div className="text-right text-[11px]">
                  <span className="text-slate-400 block">Campus Desk:</span>
                  <a href={`tel:${SHEMROCK_CONTACT.phone1}`} className="text-rose-600 font-black block">
                    {SHEMROCK_CONTACT.phone1}
                  </a>
                </div>
              </div>
            </div>

            {/* Campus Address Reminder */}
            <div className="mt-4 flex items-start gap-2 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
              <MapPin size={16} className="text-rose-600 mt-0.5 shrink-0" />
              <div>
                <strong className="text-slate-800 block">Venue: 43, Chandan Nagar, Survey, Beltola, Guwahati - 781028</strong>
                <span className="text-[11px] text-slate-500">Near Survey bus stop, 100m from Beltola bazaar circle.</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <Printer size={15} />
                <span>Print / Save Pass</span>
              </button>

              <a
                href={`https://wa.me/91${SHEMROCK_CONTACT.phone1}?text=Hello%20SHEMROCK%20Hearts%20Guwahati,%20I%20have%20booked%20a%20campus%20visit%20pass%20(${booking.bookingCode})%20for%20my%20child%20${encodeURIComponent(booking.childName)}.`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <MessageSquare size={15} />
                <span>WhatsApp Desk</span>
              </a>

              <button
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
