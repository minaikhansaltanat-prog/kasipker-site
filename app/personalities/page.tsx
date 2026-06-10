'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useLang } from '@/lib/LangContext';
import { t, personalities } from '@/lib/translations';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

const CATEGORIES: { id: string; kk: string; ru: string; en: string }[] = [
  { id: 'all', kk: 'Барлығы', ru: 'Все', en: 'All' },
  { id: 'Бизнесмендер', kk: 'Бизнесмендер', ru: 'Бизнесмены', en: 'Businessmen' },
  { id: 'Инвесторлар', kk: 'Инвесторлар', ru: 'Инвесторы', en: 'Investors' },
  { id: 'Саясаткерлер', kk: 'Саясаткерлер', ru: 'Политики', en: 'Politicians' },
  { id: 'Академиктер', kk: 'Академиктер', ru: 'Академики', en: 'Academics' },
  { id: 'Ғалымдар', kk: 'Ғалымдар', ru: 'Учёные', en: 'Scientists' },
  { id: 'Агенттер', kk: 'Агенттер', ru: 'Агенты', en: 'Agents' },
  { id: 'Мамандар', kk: 'Мамандар', ru: 'Специалисты', en: 'Specialists' },
  { id: 'Топ-Менеджерлер', kk: 'Топ-Менеджерлер', ru: 'Топ-менеджеры', en: 'Top Managers' },
];

export default function PersonalitiesPage() {
  const { lang } = useLang();
  const tr = t[lang];
  const [activeCatId, setActiveCatId] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = personalities.filter(p => {
    const info = lang === 'ru' ? p.ru : lang === 'en' ? p.en : p.kk;
    const matchCat = activeCatId === 'all' || p.category === activeCatId;
    const matchSearch = search === '' || info.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <div className="hero-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/30 bg-kasipker-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-4">
              {tr.personalities_eyebrow}
            </span>
            <h1 className="text-4xl font-black text-white md:text-5xl mb-4">{tr.personalities_title}</h1>
            <p className="text-white/70">{tr.personalities_sub}</p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {/* Filters */}
        <motion.div initial="hidden" animate="visible" custom={0.1} variants={fadeUp} className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => {
                const label = lang === 'ru' ? cat.ru : lang === 'en' ? cat.en : cat.kk;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCatId(cat.id)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
                      activeCatId === cat.id
                        ? 'bg-kasipker-navy-700 text-white shadow-card'
                        : 'bg-kasipker-navy-50 text-kasipker-navy-600 hover:bg-kasipker-navy-100'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            {/* Search */}
            <input
              type="text"
              placeholder={lang === 'kk' ? 'Іздеу...' : lang === 'ru' ? 'Поиск...' : 'Search...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="rounded-xl border border-kasipker-navy-100 px-4 py-2.5 text-sm outline-none focus:border-kasipker-navy-700 transition-colors w-full md:w-64"
            />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((person, i) => {
            const info = lang === 'ru' ? person.ru : lang === 'en' ? person.en : person.kk;
            return (
              <motion.div
                key={person.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.05}
                variants={fadeUp}
                className="card-kasipker overflow-hidden group"
              >
                {/* Photo */}
                <div className="relative h-56 w-full overflow-hidden rounded-xl mb-4">
                  <Image
                    src={person.photo}
                    alt={info.name}
                    fill
                    className="personality-photo group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-kasipker-navy-900/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    <span className="inline-block rounded-full bg-kasipker-gold-400 px-2.5 py-1 text-[10px] font-black text-kasipker-gold-900">
                      {person.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <h3 className="font-extrabold text-kasipker-navy-900 text-base leading-tight mb-1">{info.name}</h3>
                <p className="text-xs text-kasipker-gold-500 font-semibold mb-1">{info.position}</p>
                <p className="text-xs text-kasipker-navy-400 mb-3">{info.company}</p>
                <p className="text-xs text-kasipker-navy-600 leading-relaxed line-clamp-3">{info.bio}</p>

                {/* Social */}
                {(person.linkedin || person.instagram || person.telegram) && (
                  <div className="mt-4 flex gap-2 border-t border-kasipker-navy-50 pt-3">
                    {person.linkedin && <a href={person.linkedin} className="text-kasipker-navy-400 hover:text-kasipker-navy-700 text-sm font-bold cursor-pointer">in</a>}
                    {person.instagram && <a href={person.instagram} className="text-kasipker-navy-400 hover:text-kasipker-navy-700 text-sm font-bold cursor-pointer">ig</a>}
                    {person.telegram && <a href={person.telegram} className="text-kasipker-navy-400 hover:text-kasipker-navy-700 text-sm font-bold cursor-pointer">tg</a>}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-kasipker-navy-400">
            {lang === 'kk' ? 'Тұлға табылмады' : lang === 'ru' ? 'Персона не найдена' : 'No personalities found'}
          </div>
        )}
      </div>
    </div>
  );
}
