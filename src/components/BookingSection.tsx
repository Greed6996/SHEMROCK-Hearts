import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PRESCHOOL_PROGRAMS,
  VISIT_OPTIONS,
  SHEMROCK_CONTACT,
} from '../data/shemrockData';
import { PreschoolProgram, VisitBookingSubmission } from '../types';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Sparkles,
  ShieldCheck,
  FileText,
  Heart,
  Send,
  HelpCircle,
  School,
  Gift,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingSectionProps {
  onBookingSuccess: (booking: VisitBookingSubmission) => void;
  initialSelectedProgramId?: string;
}

const VISIT_TIME_SLOTS = [
  { time: '09:30 AM – 10:30 AM', label: 'Morning Classroom Session', spots: 5, status: 'available' },
  { time: '11:00 AM – 12:00 PM', label: 'Play-Pen & Ball Pool Trial', spots: 3, status: 'low' },
  { time: '12:30 PM – 01:30 PM', label: 'Parent Counseling Hour', spots: 6, status: 'available' },
  { time: '02:00 PM – 03:00 PM', label: 'Afternoon Campus Walkthrough', spots: 8, status: 'available' },
  { time: '03:30 PM – 04:30 PM', label: 'Evening Parent Q&A', spots: 4, status: 'available' },
];

export const BookingSection: React.FC<BookingSectionProps> = ({
  onBookingSuccess,
  initialSelectedProgramId = 'shem-foundation-sr',
}) => {
  const [activeTab, setActiveTab] = useState<'tour' | 'enquiry'>('tour');

  // Booking Form State
  const [selectedProgramId, setSelectedProgramId] = useState<string>(initialSelectedProgramId);
  const [visitType, setVisitType] = useState<VisitBookingSubmission['visitType']>('Campus Tour & Counseling');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(VISIT_TIME_SLOTS[0].time);

  // Child & Parent details
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('3');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [addressLocality, setAddressLocality] = useState('Beltola, Guwahati');
  const [queryOrNotes, setQueryOrNotes] = useState('');

  // Welcome add-ons (all free for prospective families)
  const [selectedAddOns, setSelectedAddOns] = useState<{ [key: string]: number }>({
    'campus-tour': 1,
    'playdate-trial': 1,
    'counseling-session': 1,
    'shemrock-welcome-kit': 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Current program
  const currentProgram = PRESCHOOL_PROGRAMS.find((p) => p.id === selectedProgramId) || PRESCHOOL_PROGRAMS[1];

  const handleToggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [id]: prev[id] ? 0 : 1,
    }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!parentName.trim()) {
      setFormError('Please provide parent / guardian full name.');
      return;
    }
    if (!parentPhone.trim() || parentPhone.replace(/\D/g, '').length < 8) {
      setFormError('Please enter a valid 10-digit mobile contact number.');
      return;
    }
    if (!childName.trim()) {
      setFormError('Please enter your child’s name.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Generate authentic booking code
      const codeRandom = Math.floor(1000 + Math.random() * 9000);
      const bookingCode = `SHM-BELTOLA-${codeRandom}`;

      const newBooking: VisitBookingSubmission = {
        id: `book-${Date.now()}`,
        bookingCode,
        programId: currentProgram.id,
        programName: `${currentProgram.name} (${currentProgram.codeName})`,
        visitType,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        childrenCount: 1,
        childName,
        childAge,
        parentName,
        parentEmail: parentEmail || 'parent@example.com',
        parentPhone,
        addressLocality,
        queryOrNotes,
        selectedAddOns,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      };

      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fbbf24', '#38bdf8', '#34d399', '#a855f7'],
      });

      setIsSubmitting(false);
      onBookingSuccess(newBooking);
    }, 800);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !parentPhone) return;
    setEnquirySuccess(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  return (
    <section id="admissions" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-rose-100 border border-rose-300 text-rose-900 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
            <School size={14} className="text-rose-600" /> Admissions Open 2025–26
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading">
            Join the <span className="text-rose-600">SHEMROCK Hearts</span> Family
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Schedule a personal campus tour, experience a free playdate with our caring teachers, or submit an admission enquiry for your child.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 mt-2">
            <button
              onClick={() => setActiveTab('tour')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                activeTab === 'tour'
                  ? 'bg-white text-rose-700 shadow-sm'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              📅 Book Campus Visit & Playdate Pass
            </button>
            <button
              onClick={() => setActiveTab('enquiry')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                activeTab === 'enquiry'
                  ? 'bg-white text-rose-700 shadow-sm'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              ✉️ Direct Admission Enquiry Form
            </button>
          </div>
        </div>

        {/* Age Criteria & Programs Cards (SHEMROCK Structure) */}
        <div id="programs" className="mb-14">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold font-heading text-slate-900">
              Age Criteria & Programs Available
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select the program that matches your child’s age to book your personalized consultation
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRESCHOOL_PROGRAMS.map((prog) => {
              const isSelected = selectedProgramId === prog.id;
              return (
                <div
                  key={prog.id}
                  onClick={() => setSelectedProgramId(prog.id)}
                  className={`rounded-3xl p-5 border-2 cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/50 shadow-md scale-[1.02]'
                      : 'border-slate-200 bg-white hover:border-rose-300 shadow-2xs hover:shadow-sm'
                  }`}
                >
                  {prog.badge && (
                    <span
                      className={`absolute -top-3 right-4 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs ${prog.colorTheme.badgeBg}`}
                    >
                      {prog.badge}
                    </span>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 bg-rose-100 px-2 py-0.5 rounded-md">
                        {prog.codeName}
                      </span>
                      <span className="text-xs font-black text-slate-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        Age: {prog.ageCriteria}
                      </span>
                    </div>

                    <h4 className="font-black text-base text-slate-900 font-heading">
                      {prog.name}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {prog.tagline}
                    </p>

                    <div className="text-[11px] text-slate-500 font-bold flex items-center gap-1 pt-1">
                      <Clock size={12} className="text-rose-500" />
                      <span>Timings: {prog.timings}</span>
                    </div>

                    <ul className="space-y-1 pt-2 border-t border-slate-100 text-[11px] text-slate-700">
                      {prog.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold shrink-0">✓</span>
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-slate-500">
                      Focus: {prog.keyFocus}
                    </span>
                    <span
                      className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                        isSelected
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-rose-100'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Admission Guidelines & Documents Required Box */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-50 via-rose-50 to-purple-50 border-2 border-amber-200/90 grid md:grid-cols-2 gap-8 items-center shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={18} className="text-rose-600" />
              <h4 className="text-base sm:text-lg font-black font-heading text-slate-900">
                Documents Required For Admission
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-3 font-medium">
              As per SHEMROCK chain guidelines, please keep the following simple records ready:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-800">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Birth Certificate:</strong> Proof of age issued by a municipal corporation or civic body.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Photographs:</strong> Two recent passport-sized color photographs of the child.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Parent ID & Address:</strong> Aadhar / Voter ID / Utility bill copy for Guwahati locality records.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-rose-700 font-heading">
              Our 3-Step Stress-Free Admission Process
            </h5>
            <ol className="space-y-2.5 text-xs text-slate-700 font-medium">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong>Visit & Counseling:</strong> Parents visit our Welcome Room for a warm counseling session while the child explores our play zones.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong>Notification:</strong> Children meeting age criteria are shortlisted and parents are immediately informed in person or via phone/WhatsApp.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong>Record Register:</strong> Process completes with receipt of fees, welcome kit distribution, and entry into the official Child Record Register.
                </span>
              </li>
            </ol>
          </div>
        </div>

        {/* Tab 1: Interactive Campus Visit Booking Form */}
        {activeTab === 'tour' && (
          <div id="book-visit" className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Instant Digital Visit Pass
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading">
                  Book Free Campus Tour & Experiential Playdate
                </h3>
                <p className="text-xs sm:text-sm text-rose-100 font-medium">
                  Selected Program: <strong className="text-white">{currentProgram.name} ({currentProgram.codeName})</strong>
                </p>
              </div>

              <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl text-right shrink-0 border border-white/20 hidden sm:block">
                <span className="text-[10px] text-white/80 block">Direct Helpline</span>
                <span className="text-sm font-black text-white">{SHEMROCK_CONTACT.phone1}</span>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-6 sm:p-8 space-y-8">
              {formError && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-2">
                  <AlertCircle size={16} className="text-rose-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Step 1: Visit Type & Date/Time */}
              <div className="space-y-4">
                <h4 className="text-sm font-black uppercase text-slate-400 tracking-wider font-heading">
                  Step 1: Choose Visit Purpose, Date & Time Slot
                </h4>

                {/* Visit Purpose Selection */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    'Campus Tour & Counseling',
                    'Experiential Playdate',
                    'Admission Registration',
                    'Weekend Open House',
                  ].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVisitType(v as any)}
                      className={`p-3 rounded-2xl text-xs font-black border-2 text-left transition-all ${
                        visitType === v
                          ? 'border-rose-500 bg-rose-50 text-rose-800 shadow-2xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                {/* Date & Time Slot */}
                <div className="grid sm:grid-cols-12 gap-4 pt-2">
                  <div className="sm:col-span-4 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <CalendarIcon size={14} className="text-rose-600" />
                      <span>Preferred Visit Date</span>
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-800 text-xs font-bold focus:border-rose-500 outline-none"
                    />
                  </div>

                  <div className="sm:col-span-8 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Clock size={14} className="text-rose-600" />
                      <span>Available Time Slots (Beltola Campus)</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {VISIT_TIME_SLOTS.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className={`p-2 rounded-xl text-left border-2 text-xs transition-all ${
                            selectedTimeSlot === slot.time
                              ? 'border-rose-500 bg-rose-50/80 text-rose-900 font-black'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300 font-semibold'
                          }`}
                        >
                          <span className="block font-bold truncate">{slot.time}</span>
                          <span className="text-[10px] text-slate-500 block truncate">{slot.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Child & Parent Details */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-black uppercase text-slate-400 tracking-wider font-heading">
                  Step 2: Child & Parent Information
                </h4>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Child&apos;s Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-800 text-xs font-bold focus:border-rose-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Child&apos;s Age (Years) *</label>
                    <select
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-800 text-xs font-bold focus:border-rose-500 outline-none"
                    >
                      <option value="2">2+ Years (Play Group)</option>
                      <option value="3">3+ Years (Pre-Nursery)</option>
                      <option value="4">4+ Years (Nursery)</option>
                      <option value="5">5+ Years (Preparatory / KG)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanka Sharma"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-800 text-xs font-bold focus:border-rose-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Mobile Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9854017150"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-800 text-xs font-bold focus:border-rose-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. priyanka@gmail.com"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-800 text-xs font-bold focus:border-rose-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Residential Locality (Guwahati)</label>
                    <input
                      type="text"
                      placeholder="e.g. Survey, Beltola / Six Mile"
                      value={addressLocality}
                      onChange={(e) => setAddressLocality(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-800 text-xs font-bold focus:border-rose-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <label className="text-xs font-bold text-slate-700">Any Questions or Special Interests?</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Interested in school van transport route, dietary preferences, or day care facilities."
                    value={queryOrNotes}
                    onChange={(e) => setQueryOrNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border-2 border-slate-200 text-slate-800 text-xs font-medium focus:border-rose-500 outline-none"
                  />
                </div>
              </div>

              {/* Step 3: Complimentary Visit Inclusions */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase text-slate-400 tracking-wider font-heading">
                    Complimentary Inclusions For Your Visit (100% Free)
                  </h4>
                  <span className="text-[11px] text-emerald-700 font-extrabold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    No Booking Fee
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {VISIT_OPTIONS.map((opt) => {
                    const isChecked = !!selectedAddOns[opt.id];
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleToggleAddOn(opt.id)}
                        className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-2.5 ${
                          isChecked
                            ? 'border-emerald-500 bg-emerald-50/50 shadow-2xs'
                            : 'border-slate-200 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                            isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                          }`}
                        >
                          {isChecked && '✓'}
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-slate-900 leading-tight">
                            {opt.name}
                          </h5>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                            {opt.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button & Assurance */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                  <span>
                    Your visit pass generates instantly with a QR code and reference number for desk check-in.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Generating Your Visit Pass...</span>
                  ) : (
                    <>
                      <Sparkles size={16} className="text-amber-200" />
                      <span>Confirm & Generate Digital Visit Pass</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Direct Admission Enquiry Form (from old website) */}
        {activeTab === 'enquiry' && (
          <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-xl p-6 sm:p-10 max-w-3xl mx-auto">
            <div className="text-center mb-8 space-y-2">
              <span className="text-xs font-black uppercase tracking-wider bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
                Quick Enquiry
              </span>
              <h3 className="text-2xl font-black font-heading text-slate-900">
                Admission Enquiry Form
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Please fill in the details below. Our admissions counselor will call you within 2 hours with syllabus and fee details.
              </p>
            </div>

            {enquirySuccess ? (
              <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h4 className="text-lg font-black text-slate-900 font-heading">
                  Thank You for Reaching Out!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  We have received your enquiry for SHEMROCK Hearts Beltola. Our admissions officer will contact you shortly at <strong>{parentPhone}</strong>.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/91${SHEMROCK_CONTACT.phone1}?text=Hello%20SHEMROCK%20Hearts%20Guwahati,%20I%20enquired%20for%20admission%20for%20my%20child.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <MessageSquare size={14} /> WhatsApp Us Directly
                  </a>
                  <button
                    onClick={() => setEnquirySuccess(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                  >
                    Submit Another Query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Enter Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Parent's Name"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-800 text-xs font-bold focus:border-rose-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-800 text-xs font-bold focus:border-rose-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Phone No *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-800 text-xs font-bold focus:border-rose-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Address / Locality in Guwahati</label>
                    <input
                      type="text"
                      placeholder="e.g. 43 Chandan Nagar, Beltola"
                      value={addressLocality}
                      onChange={(e) => setAddressLocality(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-800 text-xs font-bold focus:border-rose-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Your Query / Message</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your child's age, program preference, transport requirement, or specific questions."
                    value={queryOrNotes}
                    onChange={(e) => setQueryOrNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-800 text-xs font-medium focus:border-rose-500 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={16} /> Submit Admission Enquiry
                  </button>
                </div>
              </form>
            )}

            {/* Helpline quick links */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <span className="font-semibold">Beltola Campus Helpline:</span>
              <div className="flex items-center gap-4 font-bold text-rose-700">
                <a href={`tel:${SHEMROCK_CONTACT.phone1}`} className="hover:underline flex items-center gap-1">
                  <Phone size={12} /> {SHEMROCK_CONTACT.phone1}
                </a>
                <a href={`tel:${SHEMROCK_CONTACT.phone2}`} className="hover:underline flex items-center gap-1">
                  <Phone size={12} /> {SHEMROCK_CONTACT.phone2}
                </a>
                <a href={`mailto:${SHEMROCK_CONTACT.email}`} className="hover:underline flex items-center gap-1">
                  <Mail size={12} /> {SHEMROCK_CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
