'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Star, Globe } from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t, personalities, pickByLang } from '@/lib/translations';
import PersonalityModal from '@/components/PersonalityModal';

const BIO_LIMIT = 120;

// stopPropagation here (and on the social links below) keeps this click
// from also bubbling up to the card's own onClick, which opens the full
// profile modal -- otherwise collapsing the inline preview or opening a
// social link would simultaneously pop the modal open too.
function BioText({ text, lang }: { text: string; lang: string }) {
  const [expanded, setExpanded] = useState(false);
  if (text.length <= BIO_LIMIT) {
    return <p className="text-xs text-kasipker-navy-600 leading-relaxed whitespace-pre-line">{text}</p>;
  }
  return (
    <div>
      <p className="text-xs text-kasipker-navy-600 leading-relaxed whitespace-pre-line">
        {expanded ? text : text.slice(0, BIO_LIMIT) + '...'}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setExpanded((v) => !v);
        }}
        className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-kasipker-navy-700 hover:text-kasipker-gold-500 transition-colors cursor-pointer"
      >
        {expanded
          ? pickByLang(lang, 'Жасыру', 'Свернуть', 'Collapse', '收起', 'Daralt')
          : pickByLang(lang, 'Толығырақ...', 'Подробнее...', 'Read more...', '阅读更多...', 'Devamını oku...')}
        {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

const CATEGORIES: { id: string; kk: string; ru: string; en: string; zh: string; tr: string }[] = [
  { id: 'all', kk: 'Барлығы', ru: 'Все', en: 'All', zh: '全部', tr: 'Tümü' },
  { id: 'Бизнесмендер', kk: 'Бизнесмендер', ru: 'Бизнесмены', en: 'Businessmen', zh: '商界人士', tr: 'İş İnsanları' },
  { id: 'Инвесторлар', kk: 'Инвесторлар', ru: 'Инвесторы', en: 'Investors', zh: '投资者', tr: 'Yatırımcılar' },
  { id: 'Саясаткерлер', kk: 'Саясаткерлер', ru: 'Политики', en: 'Politicians', zh: '政界人士', tr: 'Siyasetçiler' },
  { id: 'Академиктер', kk: 'Академиктер', ru: 'Академики', en: 'Academics', zh: '学者', tr: 'Akademisyenler' },
  { id: 'Ғалымдар', kk: 'Ғалымдар', ru: 'Учёные', en: 'Scientists', zh: '科学家', tr: 'Bilim İnsanları' },
  { id: 'Агенттер', kk: 'Агенттер', ru: 'Агенты', en: 'Agents', zh: '代理人', tr: 'Temsilciler' },
  { id: 'Мамандар', kk: 'Мамандар', ru: 'Специалисты', en: 'Specialists', zh: '专业人士', tr: 'Uzmanlar' },
  { id: 'Топ-Менеджерлер', kk: 'Топ-Менеджерлер', ru: 'Топ-менеджеры', en: 'Top Managers', zh: '高级管理人员', tr: 'Üst Düzey Yöneticiler' },
];

export default function PersonalitiesPage() {
  const { lang } = useLang();
  const tr = t[lang];
  const [activeCatId, setActiveCatId] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<(typeof personalities)[number] | null>(null);

  const filtered = personalities.filter(p => {
    const info = pickByLang(lang, p.kk, p.ru, p.en, p.zh, p.tr);
    const matchCat = activeCatId === 'all' || p.categories.includes(activeCatId);
    const matchSearch = search === '' || info.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const categoryLabel = (cat: string) => {
    const catDef = CATEGORIES.find(c => c.id === cat);
    return catDef ? pickByLang(lang, catDef.kk, catDef.ru, catDef.en, catDef.zh, catDef.tr) : cat;
  };

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
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => {
                const label = pickByLang(lang, cat.kk, cat.ru, cat.en, cat.zh, cat.tr);
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
            <input
              type="text"
              placeholder={pickByLang(lang, 'Іздеу...', 'Поиск...', 'Search...', '搜索...', 'Ara...')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="rounded-xl border border-kasipker-navy-100 px-4 py-2.5 text-sm outline-none focus:border-kasipker-navy-700 transition-colors w-full md:w-64"
            />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((person, i) => {
            const info = pickByLang(lang, person.kk, person.ru, person.en, person.zh, person.tr);
            return (
              <motion.div
                key={person.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.05}
                variants={fadeUp}
                onClick={() => setSelectedPerson(person)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setSelectedPerson(person);
                }}
                className="card-kasipker overflow-hidden group flex flex-col cursor-pointer"
              >
                {/* Photo */}
                <div className="relative h-56 w-full overflow-hidden rounded-xl mb-3">
                  <Image
                    src={person.photo}
                    alt={info.name}
                    fill
                    className="personality-photo group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-kasipker-navy-900/30 via-transparent to-transparent" />
                </div>

                {/* Category badges — outside photo so face is never covered */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {person.categories.map(cat => (
                    <span key={cat} className="inline-block rounded-full bg-kasipker-gold-400 px-2.5 py-1 text-[10px] font-black text-kasipker-gold-900">
                      {categoryLabel(cat)}
                    </span>
                  ))}
                </div>

                {/* Info */}
                <h3 className="font-extrabold text-kasipker-navy-900 text-base leading-tight mb-1">{info.name}</h3>
                <p className="text-xs text-kasipker-gold-500 font-semibold mb-1">{info.position}</p>
                <p className="text-xs text-kasipker-navy-400 mb-3">{info.company}</p>

                {/* Highlights */}
                {info.highlights && info.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {info.highlights.map((h, hi) => (
                      <span
                        key={hi}
                        className="inline-flex items-center gap-1 rounded-lg bg-kasipker-navy-50 border border-kasipker-navy-100 px-2.5 py-1 text-[10px] font-bold text-kasipker-navy-700"
                      >
                        <Star className="h-2.5 w-2.5 text-kasipker-gold-400 flex-shrink-0" />
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                <BioText text={info.bio} lang={lang} />

                {/* Social */}
                {(person.linkedin || person.instagram || person.telegram || person.website) && (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-kasipker-navy-50 pt-3">
                    {person.instagram && (
                      <a
                        href={person.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-kasipker-gold-50 border border-kasipker-gold-200 px-3 py-1.5 text-xs font-bold text-kasipker-gold-700 hover:bg-kasipker-gold-100 transition-colors cursor-pointer"
                      >
                        <Globe className="h-3.5 w-3.5 flex-shrink-0" />
                        {pickByLang(lang, 'Веб-сайт', 'Веб-сайт', 'Website', '个人网站', 'Web Sitesi')}
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-kasipker-navy-400">
            {pickByLang(lang, 'Тұлға табылмады', 'Персона не найдена', 'No personalities found', '未找到人物', 'Kişi bulunamadı')}
          </div>
        )}
      </div>

      {selectedPerson && (
        <PersonalityModal
          person={selectedPerson}
          lang={lang}
          categoryLabel={categoryLabel}
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </div>
  );
}
