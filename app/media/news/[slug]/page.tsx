'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Newspaper } from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t, pickByLang } from '@/lib/translations';
import { NEWS, formatNewsDate } from '@/lib/news';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

export default function NewsArticlePage() {
  const { lang } = useLang();
  const tr = t[lang];
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : '';
  const article = NEWS.find(n => n.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-24 text-center">
        <p className="text-kasipker-navy-600 mb-6">
          {pickByLang(lang, 'Жаңалық табылмады', 'Новость не найдена', 'News article not found', '未找到该新闻', 'Haber bulunamadı')}
        </p>
        <Link href="/media" className="btn-gold inline-flex items-center gap-2 cursor-pointer">
          <ArrowLeft className="h-4 w-4" /> {tr.news_back}
        </Link>
      </div>
    );
  }

  const formattedDate = formatNewsDate(article.date, lang);

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="hero-bg py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-8 text-center">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/30 bg-kasipker-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-4">
              <Newspaper className="h-3.5 w-3.5" />
              {tr.media_tab_news}
            </span>
            <h1 className="text-2xl font-black text-white md:text-4xl mb-4 leading-tight">{article.title[lang]}</h1>
            <p className="flex items-center justify-center gap-2 text-sm text-white/60">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
        <motion.div initial="hidden" animate="visible" custom={0.1} variants={fadeUp}>
          <Link
            href="/media"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-kasipker-navy-600 hover:text-kasipker-navy-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> {tr.news_back}
          </Link>

          {article.images && article.images.length > 0 && (
            <div className="relative mb-8 w-full overflow-hidden rounded-2xl shadow-card" style={{ paddingBottom: '62%' }}>
              <Image
                src={article.images[0]}
                alt={article.title[lang]}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
                priority
              />
            </div>
          )}

          <article className="prose-none space-y-5">
            {article.body[lang].map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-kasipker-navy-800">
                {paragraph}
              </p>
            ))}
          </article>

          {article.images && article.images.length > 1 && (
            <div className="mt-12">
              <h2 className="text-lg font-extrabold text-kasipker-navy-900 mb-5">{tr.news_photos}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {article.images.slice(1).map((src, i) => (
                  <div key={src} className="relative w-full overflow-hidden rounded-2xl shadow-card" style={{ paddingBottom: '66%' }}>
                    <Image
                      src={src}
                      alt={`${article.title[lang]} ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {article.videoIds.length > 0 && (
            <div className="mt-12">
              <h2 className="text-lg font-extrabold text-kasipker-navy-900 mb-5">{tr.news_videos}</h2>
              <div className={`grid gap-6 ${article.videoAspect === 'portrait' ? 'grid-cols-2 sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                {article.videoIds.map(id => (
                  <div
                    key={id}
                    className="relative w-full overflow-hidden rounded-2xl shadow-card"
                    style={{ paddingBottom: article.videoAspect === 'portrait' ? '177.78%' : '56.25%' }}
                  >
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${id}`}
                      title="Kasipker News Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
