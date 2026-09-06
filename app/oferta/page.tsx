'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { pickByLang } from '@/lib/translations';
import {
  OFFER_KK,
  OFFER_RU,
  OFFER_TITLE_KK,
  OFFER_TITLE_RU,
  OFFER_SUBTITLE_KK,
  OFFER_SUBTITLE_RU,
  type OfferSection,
} from '@/lib/oferta';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

function OfferBody({ sections }: { sections: OfferSection[] }) {
  return (
    <div className="space-y-8">
      {sections.map((section, i) => (
        <div key={i}>
          {section.title && (
            <h2 className="mb-3 text-lg font-extrabold text-kasipker-navy-900">{section.title}</h2>
          )}
          <div className="space-y-2">
            {section.lines.map((line, j) =>
              line.startsWith('• ') ? (
                <p key={j} className="pl-5 text-sm leading-relaxed text-kasipker-navy-700">
                  {line}
                </p>
              ) : (
                <p key={j} className="text-sm leading-relaxed text-kasipker-navy-700">
                  {line}
                </p>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function OfertaPage() {
  const { lang } = useLang();
  // Two source languages only -- see lib/oferta.ts for why this doesn't
  // follow the site-wide 5-language switcher. Defaults to whichever of
  // the two matches the visitor's current site language.
  const [docLang, setDocLang] = useState<'kk' | 'ru'>(lang === 'ru' ? 'ru' : 'kk');

  const title = docLang === 'kk' ? OFFER_TITLE_KK : OFFER_TITLE_RU;
  const subtitle = docLang === 'kk' ? OFFER_SUBTITLE_KK : OFFER_SUBTITLE_RU;
  const sections = docLang === 'kk' ? OFFER_KK : OFFER_RU;

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="hero-bg py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-8 text-center">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/30 bg-kasipker-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-4">
              <FileText className="h-3.5 w-3.5" />
              {pickByLang(lang, 'Заңды құжат', 'Юридический документ', 'Legal document', '法律文件', 'Hukuki belge')}
            </span>
            <h1 className="text-2xl font-black text-white md:text-4xl mb-4 leading-tight">{title}</h1>
            <p className="text-sm text-white/70">{subtitle}</p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
        <motion.div initial="hidden" animate="visible" custom={0.1} variants={fadeUp}>
          <div className="mb-8 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setDocLang('kk')}
              className={`cursor-pointer rounded-xl px-5 py-2 text-sm font-bold transition-colors ${
                docLang === 'kk' ? 'bg-kasipker-navy-900 text-white' : 'bg-kasipker-navy-50 text-kasipker-navy-600'
              }`}
            >
              ҚАЗАҚША
            </button>
            <button
              type="button"
              onClick={() => setDocLang('ru')}
              className={`cursor-pointer rounded-xl px-5 py-2 text-sm font-bold transition-colors ${
                docLang === 'ru' ? 'bg-kasipker-navy-900 text-white' : 'bg-kasipker-navy-50 text-kasipker-navy-600'
              }`}
            >
              РУССКИЙ
            </button>
          </div>

          <div className="card-kasipker">
            <OfferBody sections={sections} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
