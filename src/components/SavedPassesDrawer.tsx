import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Ticket, Calendar, Clock, QrCode, Trash2, ArrowRight, User, School } from 'lucide-react';
import { VisitBookingSubmission } from '../types';

interface SavedPassesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: VisitBookingSubmission[];
  onSelectBooking: (booking: VisitBookingSubmission) => void;
  onDeleteBooking: (id: string) => void;
}

export const SavedPassesDrawer: React.FC<SavedPassesDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  onSelectBooking,
  onDeleteBooking,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket size={22} className="text-amber-200" />
                <div>
                  <h3 className="text-lg font-black font-heading">My Campus Visit Passes</h3>
                  <p className="text-[11px] text-rose-100 font-medium">SHEMROCK Hearts Beltola</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                aria-label="Close passes drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {bookings.length === 0 ? (
                <div className="text-center py-12 px-4 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-500 mx-auto flex items-center justify-center text-2xl">
                    🎒
                  </div>
                  <h4 className="font-bold text-slate-800 font-heading">No Campus Visits Booked Yet</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Once you schedule a free campus walkthrough, playdate, or counseling session, your digital QR passes will appear here.
                  </p>
                </div>
              ) : (
                bookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-rose-300 shadow-2xs transition-all space-y-3 relative group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full inline-block mb-1">
                          {b.visitType}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 font-heading">
                          {b.programName}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold mt-0.5">
                          <User size={12} className="text-rose-600" />
                          <span>Child: {b.childName} ({b.childAge} yrs)</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono text-slate-400 block">
                          {b.bookingCode}
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-md inline-block mt-0.5">
                          Confirmed
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-rose-500 shrink-0" />
                        <span className="truncate">{b.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-rose-500 shrink-0" />
                        <span className="truncate">{b.timeSlot}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                      <button
                        onClick={() => onDeleteBooking(b.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Cancel or delete this pass"
                      >
                        <Trash2 size={15} />
                      </button>

                      <button
                        onClick={() => {
                          onSelectBooking(b);
                          onClose();
                        }}
                        className="font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                      >
                        <span>View Pass Ticket</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-slate-200 text-center">
              <p className="text-xs text-slate-500 font-medium">
                Show QR passes at the Welcome Room desk for smooth entry.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
