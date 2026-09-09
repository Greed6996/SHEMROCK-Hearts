import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_PHOTOS } from '../data/shemrockData';
import { GalleryPhoto } from '../types';
import { Sparkles, Heart, Eye, X, ZoomIn, Camera, ShieldCheck, ChevronLeft, ChevronRight, MessageSquareQuote, MapPin } from 'lucide-react';

interface PhotoGallerySectionProps {
  onBookClick: () => void;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ onBookClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [likes, setLikes] = useState<{ [key: string]: number }>(
    GALLERY_PHOTOS.reduce((acc, p) => ({ ...acc, [p.id]: p.likesCount }), {})
  );
  const [hasLiked, setHasLiked] = useState<{ [key: string]: boolean }>({});

  const categories = [
    { id: 'all', label: 'All Photos (10)' },
    { id: 'classrooms', label: 'Colourful Classrooms' },
    { id: 'playpen', label: 'Ball Pool & Play-Pen' },
    { id: 'creative', label: 'Stage & Creative Arts' },
    { id: 'discovery', label: 'Discovery & Mini Zoo' },
    { id: 'welcome', label: 'Welcome Room & Dining' },
  ];

  const filteredPhotos = selectedCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((photo) => photo.category === selectedCategory);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked[id]) {
      setLikes((prev) => ({ ...prev, [id]: prev[id] - 1 }));
      setHasLiked((prev) => ({ ...prev, [id]: false }));
    } else {
      setLikes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
      setHasLiked((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handlePrev = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleNext = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
  };

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <section id="photo-gallery" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-rose-100 border border-rose-300 text-rose-800 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
            <Camera size={14} className="text-rose-600" /> Real Campus Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading">
            Inside <span className="text-rose-600">SHEMROCK Hearts</span> Guwahati
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Explore our vibrant classrooms, safe ball pool, open play-pen, and creative hubs where your little one creates lifelong memories every single day.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActivePhotoIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-md scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Masonry / Responsive Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative rounded-3xl overflow-hidden bg-slate-100 border-2 border-slate-200/80 hover:border-rose-300 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Zone Pill Tag */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/95 backdrop-blur-xs text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-xl shadow-xs">
                    {photo.zoneTag}
                  </span>
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => handleLike(photo.id, e)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                    hasLiked[photo.id]
                      ? 'bg-rose-600 text-white scale-110'
                      : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-600'
                  }`}
                  aria-label="Like photo"
                >
                  <Heart size={15} className={hasLiked[photo.id] ? 'fill-white' : ''} />
                </button>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base font-bold font-heading line-clamp-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">
                    {photo.caption}
                  </p>
                </div>
              </div>

              {/* Card Footer with Parent Note */}
              <div className="p-3.5 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">{photo.parentNotes || 'Beltola Campus Facility'}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-600 shrink-0 font-bold">
                  <Heart size={13} className="text-rose-500" />
                  <span>{likes[photo.id] || photo.likesCount}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery CTA */}
        <div className="mt-12 text-center p-8 bg-rose-50 rounded-3xl border-2 border-rose-200 max-w-2xl mx-auto space-y-3">
          <h4 className="text-xl font-black font-heading text-slate-900">
            Want to See Our Campus In Person?
          </h4>
          <p className="text-xs sm:text-sm text-slate-600">
            Walk into 43, Chandan Nagar, Survey, Beltola. Enjoy a personal tour while your child plays freely in our sanitized ball pool.
          </p>
          <button
            onClick={onBookClick}
            className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-md transition-all"
          >
            Book Free Campus Visit & Tour
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border-2 border-slate-700 relative text-white flex flex-col max-h-[90vh]"
            >
              {/* Close button */}
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                aria-label="Close photo"
              >
                <X size={20} />
              </button>

              {/* Previous / Next buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>

              {/* Photo View */}
              <div className="relative aspect-16/10 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Photo Details */}
              <div className="p-6 bg-slate-900 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider bg-rose-600 px-2.5 py-0.5 rounded-full">
                    {activePhoto.zoneTag}
                  </span>
                  <span className="text-xs text-slate-400">
                    Photo {activePhotoIndex! + 1} of {filteredPhotos.length}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading">{activePhoto.title}</h3>
                <p className="text-sm text-slate-300 font-medium">{activePhoto.caption}</p>

                {activePhoto.parentNotes && (
                  <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-start gap-2 text-xs text-amber-300">
                    <MessageSquareQuote size={16} className="shrink-0 mt-0.5" />
                    <span>{activePhoto.parentNotes}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
