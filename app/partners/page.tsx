'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLang } from '@/lib/LangContext';
import { t, partners } from '@/lib/translations';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

const partnerCategories = [
  {
    title_kk: 'Мемлекеттік органдар',
    title_ru: 'Государственные органы',
    title_en: 'Government Bodies',
    items: ['НПП «Атамекен»', 'Алматы Акиматы', 'Кәсіпкерлік Министрлігі'],
  },
  {
    title_kk: 'Қаржы институттары',
    title_ru: 'Финансовые институты',
    title_en: 'Financial Institutions',
    items: ['Даму Банкі', 'QazFinance', 'KMF'],
  },
  {
    title_kk: 'Халықаралық ұйымдар',
    title_ru: 'Международные организации',
    title_en: 'International Organizations',
    items: ['CCPIT (Қытай)', 'Jimon Group', 'Дубай Expo'],
  },
  {
    title_kk: 'Бизнес ассоциациялар',
    title_ru: 'Бизнес-ассоциации',
    title_en: 'Business Associations',
    items: ['Amanat партиясы', '«Ел ағалары»', 'Алматы БАҚ'],
  },
];

export default function PartnersPage() {
  const { lang } = useLang();
  const tr = t[lang];

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="hero-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/30 bg-kasipker-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-4">
              {tr.partners_eyebrow}
            </span>
            <h1 className="text-4xl font-black text-white md:text-5xl mb-4">{tr.partners_title}</h1>
          </motion.div>
        </div>
      </div>

      {/* Partners marquee */}
      <div className="py-10 bg-kasipker-navy-50 overflow-hidden border-b border-kasipker-navy-100">
        <div className="marquee-track">
          {[...partners, ...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className="mx-4 flex-shrink-0 flex items-center gap-3 rounded-xl bg-white border border-kasipker-navy-100 px-5 py-3 hover:border-kasipker-gold-400 transition-colors"
              style={{ minWidth: 200 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kasipker-navy-700 text-white font-black text-sm">
                {p.name[0]}
              </div>
              <div>
                <p className="font-bold text-kasipker-navy-800 text-sm whitespace-nowrap">{p.name}</p>
                <p className="text-xs text-kasipker-navy-400">{p.type_kk}</p>
              </div>
              {p.badge && (
                <span className={`ml-auto text-xs font-bold rounded-full px-2 py-0.5 ${
                  p.badge === 'International' ? 'bg-kasipker-gold-50 text-kasipker-gold-500' : 'bg-kasipker-navy-50 text-kasipker-navy-600'
                }`}>
                  {p.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {partnerCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                variants={fadeUp}
                className="card-kasipker"
              >
                <h3 className="font-extrabold text-kasipker-navy-900 text-lg mb-5 flex items-center gap-2">
                  <span className="h-1 w-8 rounded-full bg-kasipker-gold-400 inline-block" />
                  {lang === 'en' ? cat.title_en : lang === 'ru' ? cat.title_ru : cat.title_kk}
                </h3>
                <div className="flex flex-col gap-3">
                  {cat.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-3 rounded-xl bg-kasipker-navy-50 p-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-kasipker-navy-700 text-white font-bold text-xs">
                        {item[0]}
                      </div>
                      <span className="text-sm font-medium text-kasipker-navy-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Become partner CTA */}
      <div className="py-16 bg-kasipker-navy-900 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-3xl font-extrabold text-white mb-4">
              {lang === 'kk' ? 'Ресми серіктес болыңыз' : lang === 'ru' ? 'Станьте официальным партнёром' : 'Become an Official Partner'}
            </h2>
            <p className="text-white/60 mb-8">
              {lang === 'kk' ? 'Меморандум жасасып, Kasipker желісінің бөлігіне айналыңыз' :
               lang === 'ru' ? 'Подпишите меморандум и станьте частью сети Kasipker' :
               'Sign a memorandum and become part of the Kasipker network'}
            </p>
            <Link href="/contact" className="btn-gold inline-flex px-8 py-4 text-base">
              {tr.partner_cta}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
