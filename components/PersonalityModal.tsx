'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { X, Star, Globe } from 'lucide-react';
import { pickByLang } from '@/lib/translations';

interface PersonalityInfo {
  name: string;
  position: string;
  company: string;
  bio: string;
  highlights: string[];
}

interface Personality {
  id: number;
  photo: string;
  kk: PersonalityInfo;
  ru: PersonalityInfo;
  en: PersonalityInfo;
  zh: PersonalityInfo;
  tr: PersonalityInfo;
  categories: string[];
  linkedin?: string;
  instagram?: string;
  telegram?: string;
  website?: string;
}

// Same fixed-overlay modal pattern as components/EventActionModal.tsx
// (this project hand-rolls modals rather than using a UI-library dialog)
// -- reused here so clicking a personality card opens their full,
// untruncated profile instead of only the compact card summary.
export default function PersonalityModal({
  person,
  lang,
  categoryLabel,
  onClose,
}: {
  person: Personality;
  lang: string;
  categoryLabel: (cat: string) => string;
  onClose: () => void;
}) {
  const info = pickByLang(lang, person.kk, person.ru, person.en, person.zh, person.tr);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-kasipker-navy-900/50 backdrop-blur-sm px-4 py-6 sm:py-12 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-white shadow-elevated overflow-hidden mb-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="relative h-64 w-full overflow-hidden sm:h-72">
            <Image src={person.photo} alt={info.name} fill className="personality-photo" sizes="(max-width: 640px) 100vw, 512px" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-kasipker-navy-900/70 via-transparent to-transparent" />
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-kasipker-navy-700 hover:bg-white transition-colors cursor-pointer"
          >
            <X className="h-4.5 w-4.5" />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h2 className="text-xl font-extrabold text-white leading-tight">{info.name}</h2>
          </div>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-6">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {person.categories.map((cat) => (
              <span key={cat} className="inline-block rounded-full bg-kasipker-gold-400 px-2.5 py-1 text-[10px] font-black text-kasipker-gold-900">
                {categoryLabel(cat)}
              </span>
            ))}
          </div>

          <p className="text-sm text-kasipker-gold-500 font-semibold mb-1">{info.position}</p>
          {info.company && <p className="text-sm text-kasipker-navy-400 mb-4">{info.company}</p>}

          {info.highlights && info.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {info.highlights.map((h, hi) => (
                <span
                  key={hi}
                  className="inline-flex items-center gap-1 rounded-lg bg-kasipker-navy-50 border border-kasipker-navy-100 px-2.5 py-1 text-[11px] font-bold text-kasipker-navy-700"
                >
                  <Star className="h-3 w-3 text-kasipker-gold-400 flex-shrink-0" />
                  {h}
                </span>
              ))}
            </div>
          )}

          <p className="text-sm text-kasipker-navy-700 leading-relaxed whitespace-pre-line">{info.bio}</p>

          {(person.linkedin || person.instagram || person.telegram || person.website) && (
            <div className="mt-6 flex flex-wrap gap-2 border-t border-kasipker-navy-50 pt-4">
              {person.instagram && (
                <a
                  href={person.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 px-3 py-1.5 text-xs font-bold text-purple-700 hover:from-purple-100 hover:to-pink-100 transition-colors cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 flex-shrink-0">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  {'@' + person.instagram.replace('https://www.instagram.com/', '').replace(/\/$/, '')}
                </a>
              )}
              {person.telegram && (
                <a
                  href={person.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 flex-shrink-0">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.92c-.12.56-.46.7-.92.44l-2.56-1.88-1.24 1.2c-.14.14-.26.26-.52.26l.18-2.62 4.74-4.28c.2-.18-.04-.28-.32-.1L7.46 14.5l-2.5-.78c-.54-.17-.55-.54.12-.8l9.8-3.78c.44-.16.84.1.76.66z" />
                  </svg>
                  Telegram
                </a>
              )}
              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-100 px-3 py-1.5 text-xs font-bold text-blue-800 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  LinkedIn
                </a>
              )}
              {person.website && (
                <a
                  href={person.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-kasipker-gold-50 border border-kasipker-gold-200 px-3 py-1.5 text-xs font-bold text-kasipker-gold-700 hover:bg-kasipker-gold-100 transition-colors cursor-pointer"
                >
                  <Globe className="h-3.5 w-3.5 flex-shrink-0" />
                  {pickByLang(lang, 'Веб-сайт', 'Веб-сайт', 'Website', '个人网站', 'Web Sitesi')}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
