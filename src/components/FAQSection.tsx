import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS, SHEMROCK_CONTACT } from '../data/shemrockData';
import { ChevronDown, HelpCircle, Phone, MessageSquare } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-rose-100 border border-rose-300 text-rose-900 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
            <HelpCircle size={14} className="text-rose-600" /> Parent Queries
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
            Frequently Asked <span className="text-rose-600">Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Everything you need to know regarding admissions, age criteria, ball pool safety, and school timings at SHEMROCK Hearts Guwahati.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id}
                className="rounded-2xl border-2 border-slate-200/80 overflow-hidden transition-all bg-white hover:border-rose-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-rose-600 transition-colors"
                >
                  <span className="text-sm sm:text-base font-heading">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-rose-100 text-rose-600' : ''
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-100 pt-3"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Help Box */}
        <div className="mt-10 p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-black text-slate-900 text-sm font-heading">
              Have a question not listed here?
            </h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Call or WhatsApp our Beltola campus counselor directly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${SHEMROCK_CONTACT.phone1}`}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Phone size={14} /> Call {SHEMROCK_CONTACT.phone1}
            </a>
            <a
              href={`https://wa.me/91${SHEMROCK_CONTACT.phone1}?text=Hello%20SHEMROCK%20Hearts%20Guwahati,%20I%20have%20an%20admission%20query.`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <MessageSquare size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
