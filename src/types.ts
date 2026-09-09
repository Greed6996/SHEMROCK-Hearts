export type AgeGroup = 'All Ages' | '2+ Years' | '3+ Years' | '4+ Years' | '5+ Years';

export interface PreschoolProgram {
  id: string;
  name: string;
  codeName: string;
  ageCriteria: string;
  badge?: string;
  tagline: string;
  timings: string;
  features: string[];
  keyFocus: string;
  popular?: boolean;
  colorTheme: {
    bg: string;
    border: string;
    badgeBg: string;
    buttonBg: string;
    accent: string;
    lightAccent: string;
  };
}

export interface FacilityItem {
  id: string;
  title: string;
  category: string;
  ageRange: string;
  shortDesc: string;
  fullDesc: string;
  capacity?: string;
  keyFeatures: string[];
  safetyHighlight: string;
  imageUrl: string;
  color: string;
  iconName: string;
}

export interface AddOnVisitOption {
  id: string;
  name: string;
  price: number; // 0 for free school tour, or kit price
  description: string;
  icon: string;
  defaultQuantity?: number;
}

export interface VisitBookingSubmission {
  id: string;
  bookingCode: string;
  programId: string;
  programName: string;
  visitType: 'Campus Tour & Counseling' | 'Experiential Playdate' | 'Admission Registration' | 'Weekend Open House';
  date: string;
  timeSlot: string;
  childrenCount: number;
  childName: string;
  childAge: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  addressLocality: string;
  queryOrNotes?: string;
  selectedAddOns: { [key: string]: number };
  createdAt: string;
  status: 'confirmed' | 'visited';
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  categoryLabel?: string;
  imageUrl: string;
  url?: string;
  caption: string;
  ageGroup?: string;
  zoneTag?: string;
  parentNotes?: string;
  likesCount: number;
  featured?: boolean;
}

export interface DailyScheduleEvent {
  id: string;
  title: string;
  time: string;
  ageRange: string;
  educator: string;
  instructor?: string;
  description: string;
  badge: string;
  color: string;
}

export interface ParentReview {
  id: string;
  parentName: string;
  childInfo: string;
  locality: string;
  rating: number;
  reviewText: string;
  date: string;
  avatarUrl: string;
  programEnrolled: string;
  visitType?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
