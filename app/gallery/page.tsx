'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/translations';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

const FILTERS = [
  { id: 'all', kk: 'Барлығы', ru: 'Все', en: 'All' },
  { id: 'forum', kk: 'Форумдар', ru: 'Форумы', en: 'Forums' },
  { id: 'meetings', kk: 'Кездесулер', ru: 'Встречи', en: 'Meetings' },
  { id: 'awards', kk: 'Марапаттар', ru: 'Награды', en: 'Awards' },
  { id: 'international', kk: 'Халықаралық', ru: 'Международные', en: 'International' },
  { id: 'clusters', kk: 'Кластерлер', ru: 'Кластеры', en: 'Clusters' },
];

const placeholderItems = [
  { id: 1, category: 'forum', emoji: '🏛️', title_kk: 'Kasipker Жылдық Форум 2026', title_ru: 'Годовой форум Kasipker 2026' },
  { id: 2, category: 'international', emoji: '🇨🇳', title_kk: 'Қытай бизнес делегациясы', title_ru: 'Китайская бизнес-делегация' },
  { id: 3, category: 'awards', emoji: '🏆', title_kk: 'Марапаттау рәсімі', title_ru: 'Церемония награждения' },
  { id: 4, category: 'meetings', emoji: '🤝', title_kk: 'Мүшелермен кездесу', title_ru: 'Встреча с членами' },
  { id: 5, category: 'clusters', emoji: '💻', title_kk: 'IT Кластер митингі', title_ru: 'Митинг IT кластера' },
  { id: 6, category: 'international', emoji: '🇦🇪', title_kk: 'Дубай Expo сапары', title_ru: 'Визит Dubai Expo' },
  { id: 7, category: 'forum', emoji: '🎤', title_kk: 'Кәсіпкерлер конференциясы', title_ru: 'Конференция предпринимателей' },
  { id: 8, category: 'meetings', emoji: '📋', title_kk: 'Серіктестік меморандум', title_ru: 'Меморандум о партнёрстве' },
];

export default function GalleryPage() {
  const { lang } = useLang();
  const tr = t[lang];
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all' ? placeholderItems : placeholderItems.filter(i => i.category === activeFilter);

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="hero-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/30 bg-kasipker-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-4">
              {tr.gallery_eyebrow}
            </span>
            <h1 className="text-4xl font-black text-white md:text-5xl mb-4">{tr.gallery_title}</h1>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {/* Filters */}
        <motion.div initial="hidden" animate="visible" custom={0.1} variants={fadeUp} className="mb-8 flex flex-wrap gap-2 justify-center">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all ${
                activeFilter === f.id
                  ? 'bg-kasipker-navy-700 text-white shadow-card'
                  : 'bg-kasipker-navy-50 text-kasipker-navy-600 hover:bg-kasipker-navy-100'
              }`}
            >
              {lang === 'en' ? f.en : lang === 'ru' ? f.ru : f.kk}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.06}
              variants={fadeUp}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-kasipker-navy-100 bg-kasipker-navy-50 hover:border-kasipker-gold-400 transition-all hover:-translate-y-1"
              style={{ aspectRatio: '4/3' }}
            >
              <div className="relative h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-kasipker-navy-700 to-kasipker-navy-900 group-hover:from-kasipker-navy-600">
                <span className="text-5xl mb-3">{item.emoji}</span>
                <p className="text-center text-sm font-semibold text-white/90">
                  {lang === 'ru' ? item.title_ru : item.title_kk}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-kasipker-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upload notice */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="mt-12 rounded-2xl border-2 border-dashed border-kasipker-navy-200 p-10 text-center"
        >
          <p className="text-4xl mb-3">📸</p>
          <p className="text-kasipker-navy-400 font-medium">
            {lang === 'kk' ? 'Нақты суреттер мен видеолар жуық арада жүктеледі' :
             lang === 'ru' ? 'Реальные фото и видео будут загружены в ближайшее время' :
             'Real photos and videos will be uploaded soon'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
