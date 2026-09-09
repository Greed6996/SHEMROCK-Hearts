import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PlayZonesSection } from './components/PlayZonesSection';
import { BookingSection } from './components/BookingSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { SafetySection } from './components/SafetySection';
import { EventsSection } from './components/EventsSection';
import { ParentCafeSection } from './components/ParentCafeSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingTicketModal } from './components/BookingTicketModal';
import { SavedPassesDrawer } from './components/SavedPassesDrawer';
import { InteractiveBubbleFun } from './components/InteractiveBubbleFun';
import { VisitBookingSubmission } from './types';

export default function App() {
  // Stored bookings in localStorage with a friendly default pass
  const [bookings, setBookings] = useState<VisitBookingSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('shemrock_hearts_visits');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }

    // Default sample pass so parents immediately see what a confirmed campus visit pass looks like
    const sampleDate = new Date();
    sampleDate.setDate(sampleDate.getDate() + 2);
    return [
      {
        id: 'sample-visit-1',
        bookingCode: 'SHM-BELTOLA-4028',
        programId: 'shem-foundation-sr',
        programName: 'Shem Foundation Senior (Pre-Nursery)',
        visitType: 'Campus Tour & Counseling',
        date: sampleDate.toISOString().split('T')[0],
        timeSlot: '09:30 AM – 10:30 AM',
        childrenCount: 1,
        childName: 'Aarav Sharma',
        childAge: '3',
        parentName: 'Priyanka Sharma',
        parentEmail: 'priyanka.sharma@example.com',
        parentPhone: '9854017150',
        addressLocality: 'Survey, Beltola, Guwahati',
        queryOrNotes: 'Interested in school van route and child settling-in schedule.',
        selectedAddOns: {
          'campus-tour': 1,
          'playdate-trial': 1,
          'counseling-session': 1,
          'shemrock-welcome-kit': 1,
        },
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      },
    ];
  });

  // Modals state
  const [activeTicket, setActiveTicket] = useState<VisitBookingSubmission | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [preselectedProgramId, setPreselectedProgramId] = useState<string>('shem-foundation-sr');

  // Save to localStorage when bookings update
  useEffect(() => {
    try {
      localStorage.setItem('shemrock_hearts_visits', JSON.stringify(bookings));
    } catch {
      // Storage might be full or restricted
    }
  }, [bookings]);

  const handleBookingSuccess = (newBooking: VisitBookingSubmission) => {
    setBookings((prev) => [newBooking, ...prev]);
    setActiveTicket(newBooking);
    setIsTicketModalOpen(true);
  };

  const handleOpenBooking = (programId?: string) => {
    if (programId) setPreselectedProgramId(programId);
    const elem = document.getElementById('book-visit') || document.getElementById('admissions');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreFacilities = () => {
    const elem = document.getElementById('facilities');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGalleryClick = () => {
    const elem = document.getElementById('photo-gallery');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectZoneForBooking = (zoneTitle: string) => {
    handleOpenBooking();
  };

  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    if (activeTicket?.id === id) {
      setIsTicketModalOpen(false);
      setActiveTicket(null);
    }
  };

  const handleOpenTicketFromList = (booking: VisitBookingSubmission) => {
    setActiveTicket(booking);
    setIsTicketModalOpen(true);
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdfa] selection:bg-rose-200 selection:text-rose-950 font-sans text-slate-800">
      {/* Floating Interactive Pop Bubbles (Animated for Kids) */}
      <InteractiveBubbleFun />

      {/* Main Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenPasses={() => setIsDrawerOpen(true)}
        savedPassesCount={bookings.length}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Animated Hero with Shemmy Mascot & Preschool Atmosphere */}
        <HeroSection
          onBookClick={() => handleOpenBooking()}
          onExploreZonesClick={handleExploreFacilities}
          onGalleryClick={handleGalleryClick}
        />

        {/* 15 Themed Facilities at SHEMROCK Hearts */}
        <PlayZonesSection onSelectZoneForBooking={handleSelectZoneForBooking} />

        {/* Admissions, Age Criteria & Campus Visit Booking Engine */}
        <BookingSection
          onBookingSuccess={handleBookingSuccess}
          initialSelectedProgramId={preselectedProgramId}
        />

        {/* Real Campus Photo Gallery for Parents */}
        <PhotoGallerySection onBookClick={() => handleOpenBooking()} />

        {/* Safety, CCTV & Child Hygiene */}
        <SafetySection />

        {/* Daily Routine & ShemEduMAX Schedule */}
        <EventsSection onBookClick={() => handleOpenBooking()} />

        {/* Welcome Room & Parent Partnership */}
        <ParentCafeSection onBookClick={() => handleOpenBooking()} />

        {/* Guwahati Parent Reviews */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer with Beltola Campus & Head Office details */}
      <Footer />

      {/* Digital Campus Visit Pass Modal with QR code */}
      <BookingTicketModal
        isOpen={isTicketModalOpen}
        booking={activeTicket}
        onClose={() => setIsTicketModalOpen(false)}
      />

      {/* My Passes Drawer */}
      <SavedPassesDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        bookings={bookings}
        onSelectBooking={handleOpenTicketFromList}
        onDeleteBooking={handleDeleteBooking}
      />
    </div>
  );
}
