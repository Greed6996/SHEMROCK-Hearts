import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, Sparkles, Send, Check, ExternalLink, School } from 'lucide-react';
import { SHEMROCK_CONTACT } from '../data/shemrockData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="contact-location" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t-4 border-rose-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-400 p-0.5 shadow-md flex items-center justify-center text-2xl">
                💖
              </div>
              <div>
                <span className="font-black text-2xl tracking-tight text-white font-heading">
                  SHEMROCK <span className="text-rose-400">Hearts</span>
                </span>
                <p className="text-[11px] text-rose-300 font-bold uppercase tracking-wider">
                  Preschool • Survey, Beltola, Guwahati
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-medium">
              A proud member of the SHEMROCK Chain of Preschools — India&apos;s 1st Playschool Chain pioneering early childhood education since 1989. Transforming every day into a delightful adventure in the heart of Guwahati.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-bold pt-1">
              <span className="flex items-center gap-1 text-rose-400">
                <School size={14} /> 650+ Branches Across India
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-300">
                <Sparkles size={14} /> 35+ Years of Trust
              </span>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={SHEMROCK_CONTACT.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-600 text-slate-200 hover:text-white text-xs font-bold transition-all border border-slate-800 flex items-center gap-1.5"
              >
                <span>Facebook Page</span>
                <ExternalLink size={12} />
              </a>
              <a
                href={SHEMROCK_CONTACT.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-600 text-slate-200 hover:text-white text-xs font-bold transition-all border border-slate-800 flex items-center gap-1.5"
              >
                <span>Instagram Profile</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Col 3: Guwahati Branch Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-white font-heading">
              Guwahati Campus
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">{SHEMROCK_CONTACT.branchName}</strong>
                  <span className="text-slate-300">{SHEMROCK_CONTACT.address}</span>
                  <span className="text-[11px] text-rose-300 block mt-0.5">{SHEMROCK_CONTACT.landmark}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={15} className="text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <a href={`tel:${SHEMROCK_CONTACT.phone1}`} className="text-white hover:underline block font-bold">
                    {SHEMROCK_CONTACT.phone1}
                  </a>
                  <a href={`tel:${SHEMROCK_CONTACT.phone2}`} className="text-white hover:underline block font-bold">
                    {SHEMROCK_CONTACT.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={15} className="text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <a href={`mailto:${SHEMROCK_CONTACT.email}`} className="text-slate-300 hover:underline">
                    {SHEMROCK_CONTACT.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={15} className="text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-white font-bold block">Visiting Hours:</span>
                  <span>{SHEMROCK_CONTACT.visitingHours}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Head Office & System */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-white font-heading">
              SHEMROCK Head Office
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li className="flex items-start gap-2">
                <School size={15} className="text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">Corporate Secretariat:</strong>
                  <span>{SHEMROCK_CONTACT.headOffice}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={15} className="text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <span>Ph: {SHEMROCK_CONTACT.headOfficePhone1}, {SHEMROCK_CONTACT.headOfficePhone2}</span>
                </div>
              </li>
              <li className="pt-2">
                <span className="block font-bold text-white mb-1">Programs Offered:</span>
                <ul className="space-y-1 text-[11px] text-slate-400">
                  <li>• Shem Foundation Junior (2+)</li>
                  <li>• Shem Foundation Senior (3+)</li>
                  <li>• Shem Prep Junior (4+)</li>
                  <li>• Shem Prep Senior (5+)</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter & Updates */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-white font-heading">
              Admission Bulletin
            </h4>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Subscribe for open-house dates, parenting workshops, and seasonal holiday camp alerts.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <Check size={16} />
                <span>Thank you! We will stay in touch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter parent email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-rose-500 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Send size={13} />
                  <span>Receive Updates</span>
                </button>
              </form>
            )}

            <div className="pt-2 text-[10px] text-slate-500 leading-tight">
              We respect your privacy. No spam, only genuine school announcements.
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Landmarks */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SHEMROCK Hearts Preschool, Guwahati. All Rights Reserved. Member of SHEMROCK Chain of Preschools.</p>

          <div className="flex items-center gap-4 text-slate-400 font-semibold">
            <a href="#facilities" className="hover:text-white transition-colors">15 Facilities</a>
            <span>•</span>
            <a href="#admissions" className="hover:text-white transition-colors">Admissions 2025-26</a>
            <span>•</span>
            <a href={SHEMROCK_CONTACT.oldSiteUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Shemrock Network</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
