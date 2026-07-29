'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mic, FileText, BookOpen, Newspaper, Bell, ArrowRight, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/translations';
import { NEWS, formatNewsDate } from '@/lib/news';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

const TABS = [
  { key: 'all',      Icon: null },
  { key: 'podcasts', Icon: Mic },
  { key: 'articles', Icon: FileText },
  { key: 'blog',     Icon: BookOpen },
  { key: 'news',     Icon: Newspaper },
];

const MEDIA_TYPES = [
  {
    key: 'podcasts',
    Icon: Mic,
    color: 'bg-purple-50 text-purple-700',
    count: 0,
    kk: 'Подкастар',
    ru: 'Подкасты',
    en: 'Podcasts',
    desc_kk: 'Kasipker кәсіпкерлерімен сұхбат, бизнес кеңестері және сараптамалар',
    desc_ru: 'Интервью с предпринимателями Kasipker, бизнес-советы и аналитика',
    desc_en: 'Interviews with Kasipker entrepreneurs, business tips and analytics',
  },
  {
    key: 'articles',
    Icon: FileText,
    color: 'bg-blue-50 text-blue-700',
    count: 0,
    kk: 'Мақалалар',
    ru: 'Статьи',
    en: 'Articles',
    desc_kk: 'Бизнес, заң, экспорт, инвестиция тақырыбындағы терең мақалалар',
    desc_ru: 'Глубокие статьи о бизнесе, праве, экспорте и инвестициях',
    desc_en: 'In-depth articles on business, law, export and investment',
  },
  {
    key: 'blog',
    Icon: BookOpen,
    color: 'bg-green-50 text-green-700',
    count: 0,
    kk: 'Блог',
    ru: 'Блог',
    en: 'Blog',
    desc_kk: 'Мүшелердің тәжірибесі, кейстер және бизнес жолы туралы жазбалар',
    desc_ru: 'Опыт членов, кейсы и заметки о предпринимательском пути',
    desc_en: 'Member experiences, case studies and entrepreneurship stories',
  },
  {
    key: 'news',
    Icon: Newspaper,
    color: 'bg-kasipker-gold-50 text-kasipker-gold-700',
    count: NEWS.length,
    kk: 'Жаңалықтар',
    ru: 'Новости',
    en: 'News',
    desc_kk: 'Альянс жаңалықтары, мүшелік хабарландырулар, серіктестіктер',
    desc_ru: 'Новости Альянса, членские объявления, партнёрства',
    desc_en: 'Alliance news, membership announcements, partnerships',
  },
];

export default function MediaPage() {
  const { lang } = useLang();
  const tr = t[lang];
  const [activeTab, setActiveTab] = useState('all');

  const tabLabel = (key: string) => {
    if (key === 'all') return tr.media_tab_all;
    if (key === 'podcasts') return tr.media_tab_podcasts;
    if (key === 'articles') return tr.media_tab_articles;
    if (key === 'blog') return tr.media_tab_blog;
    return tr.media_tab_news;
  };

  const visibleTypes = activeTab === 'all' ? MEDIA_TYPES : MEDIA_TYPES.filter(m => m.key === activeTab);

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <div className="hero-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/30 bg-kasipker-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-4">
              {tr.media_eyebrow}
            </span>
            <h1 className="text-4xl font-black text-white md:text-5xl mb-4">{tr.media_title}</h1>
            <p className="text-white/70 max-w-xl mx-auto">{tr.media_sub}</p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {/* Tabs */}
        <motion.div initial="hidden" animate="visible" custom={0.1} variants={fadeUp} className="mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {TABS.map(({ key, Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === key
                    ? 'bg-kasipker-navy-700 text-white shadow-card'
                    : 'bg-kasipker-navy-50 text-kasipker-navy-600 hover:bg-kasipker-navy-100'
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {tabLabel(key)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {visibleTypes.map((type, i) => {
            const name = lang === 'ru' ? type.ru : lang === 'en' ? type.en : type.kk;
            const desc = lang === 'ru' ? type.desc_ru : lang === 'en' ? type.desc_en : type.desc_kk;
            const isNews = type.key === 'news';
            const hasContent = type.count > 0;
            return (
              <motion.div
                key={type.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.08}
                variants={fadeUp}
                className={`card-kasipker group ${isNews ? 'md:col-span-2' : ''}`}
              >
                <div className="flex items-start gap-5">
                  <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${type.color} group-hover:bg-kasipker-navy-700 group-hover:text-white transition-colors duration-200`}>
                    <type.Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-extrabold text-kasipker-navy-900 text-xl mb-2">{name}</h3>
                    <p className="text-sm text-kasipker-navy-600 leading-relaxed mb-4">{desc}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-kasipker-navy-400 bg-kasipker-navy-50 rounded-lg px-3 py-1.5">
                        {lang === 'kk' ? `${type.count} материал` : lang === 'ru' ? `${type.count} материалов` : `${type.count} materials`}
                      </span>
                      {!hasContent && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-kasipker-gold-500 bg-kasipker-gold-50 rounded-lg px-3 py-1.5">
                          {tr.media_coming_soon}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {isNews && NEWS.length > 0 && (
                  <div className="mt-6 space-y-3 border-t border-kasipker-navy-50 pt-6">
                    {NEWS.map(article => (
                      <Link
                        key={article.slug}
                        href={`/media/news/${article.slug}`}
                        className="block rounded-xl p-4 transition-colors cursor-pointer hover:bg-kasipker-navy-50"
                      >
                        <p className="mb-1.5 flex items-center gap-1.5 text-xs text-kasipker-navy-400">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatNewsDate(article.date, lang)}
                        </p>
                        <h4 className="mb-1 font-bold text-kasipker-navy-900">{article.title[lang]}</h4>
                        <p className="mb-2 line-clamp-2 text-sm text-kasipker-navy-600">{article.excerpt[lang]}</p>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-kasipker-gold-600">
                          {tr.news_read_more} <ArrowRight className="h-3 w-3" />
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Subscribe CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="mt-16 rounded-3xl bg-kasipker-navy-900 p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v17.36L30 52 0 34.68V17.32z' fill='none' stroke='%23D4A017' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 52px',
          }} />
          <Bell className="h-12 w-12 text-kasipker-gold-400 mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-white mb-3">{tr.media_coming_soon}</h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">{tr.media_coming_soon_sub}</p>
          <Link href="/contact" className="btn-gold inline-flex items-center gap-2 cursor-pointer">
            {tr.media_subscribe} <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
