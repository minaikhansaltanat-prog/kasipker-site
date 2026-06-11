'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Presentation, Coffee, UtensilsCrossed, Heart, Users, Handshake, ArrowRight, Calendar,
} from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/translations';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

const EVENT_TYPES = [
  {
    Icon: Presentation,
    color: 'bg-blue-50 text-blue-700',
    freq_kk: 'Жылына 2–4 рет', freq_ru: '2–4 раза в год', freq_en: '2–4 times a year',
    kk: 'Конференциялар',
    ru: 'Конференции',
    en: 'Conferences',
    desc_kk: 'Бизнес, инвестиция, экспорт тақырыбындағы ірі форумдар мен конференциялар. Спикерлер, панельді пікірсайыстар, нетворкинг.',
    desc_ru: 'Крупные форумы и конференции по бизнесу, инвестициям, экспорту. Спикеры, панельные дискуссии, нетворкинг.',
    desc_en: 'Major forums and conferences on business, investment and export. Speakers, panel discussions, networking.',
  },
  {
    Icon: Coffee,
    color: 'bg-kasipker-navy-50 text-kasipker-navy-700',
    freq_kk: 'Аптасына бір рет', freq_ru: 'Еженедельно', freq_en: 'Weekly',
    kk: 'Жұма кездесуі',
    ru: 'Пятничные встречи',
    en: 'Friday Meetups',
    desc_kk: 'Жұма сайын өтетін бейресми кездесулер. Мүшелер тәжірибелерімен бөліседі, жаңа байланыстар орнатады.',
    desc_ru: 'Неформальные встречи каждую пятницу. Члены делятся опытом, устанавливают новые связи.',
    desc_en: 'Informal weekly meetings every Friday. Members share experience and build new connections.',
  },
  {
    Icon: UtensilsCrossed,
    color: 'bg-amber-50 text-amber-700',
    freq_kk: 'Айына 2 рет', freq_ru: '2 раза в месяц', freq_en: 'Twice a month',
    kk: 'Бизнес таңғы ас',
    ru: 'Бизнес-завтрак',
    en: 'Business Breakfast',
    desc_kk: 'Таңертеңгілік бизнес кездесу. Таңғы ас үстінде маңызды байланыстар мен серіктестіктер орнату.',
    desc_ru: 'Утренние деловые встречи. Установление важных контактов и партнёрств за завтраком.',
    desc_en: 'Morning business meetings. Building important contacts and partnerships over breakfast.',
  },
  {
    Icon: Heart,
    color: 'bg-red-50 text-red-600',
    freq_kk: 'Жылына 4 рет', freq_ru: '4 раза в год', freq_en: '4 times a year',
    kk: 'Қайырымдылық',
    ru: 'Благотворительность',
    en: 'Charity',
    desc_kk: 'Балалар үйлеріне, мүмкіндіктері шектеулі адамдарға және зілзала зардап шеккендерге көмек.',
    desc_ru: 'Помощь детским домам, людям с ограниченными возможностями и пострадавшим от стихийных бедствий.',
    desc_en: 'Support for orphanages, people with disabilities and disaster relief.',
  },
  {
    Icon: Users,
    color: 'bg-green-50 text-green-700',
    freq_kk: 'Тоқсанына бір рет', freq_ru: 'Ежеквартально', freq_en: 'Quarterly',
    kk: 'Қоғамдық жұмыстар',
    ru: 'Общественные работы',
    en: 'Community Work',
    desc_kk: 'Қала тазалығы, парк жайластыру, мектептерге көмек — қоғам үшін бірлескен іс-шаралар.',
    desc_ru: 'Уборка города, благоустройство парков, помощь школам — совместные мероприятия для общества.',
    desc_en: 'City cleanup, park renovation, school support — joint community activities.',
  },
  {
    Icon: Handshake,
    color: 'bg-purple-50 text-purple-700',
    freq_kk: 'Жылына 2 рет', freq_ru: '2 раза в год', freq_en: 'Twice a year',
    kk: 'Асар',
    ru: 'Асар',
    en: 'Asar',
    desc_kk: 'Қазақтың дәстүрлі «асар» рухымен — бірге жасасақ болады. Мүшелердің бизнесіне, жобасына немесе мәселесіне бірлесіп шешім табу.',
    desc_ru: 'В традиционном духе казахского «асар» — вместе всё возможно. Совместное решение проблем бизнеса или проектов членов.',
    desc_en: 'In the spirit of the Kazakh tradition «Asar» — together we can. Collectively solving members\' business challenges and projects.',
  },
];

export default function EventsPage() {
  const { lang } = useLang();
  const tr = t[lang];

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <div className="hero-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/30 bg-kasipker-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-4">
              {tr.events_eyebrow}
            </span>
            <h1 className="text-4xl font-black text-white md:text-5xl mb-4">{tr.events_title}</h1>
            <p className="text-white/70 max-w-xl mx-auto">{tr.events_sub}</p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-kasipker-navy-50 border-b border-kasipker-navy-100">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: '6', label: lang === 'kk' ? 'Шара форматы' : lang === 'ru' ? 'Форматов событий' : 'Event formats' },
              { value: '50+', label: lang === 'kk' ? 'Жыл сайын шара' : lang === 'ru' ? 'Событий в год' : 'Events per year' },
              { value: '1500+', label: lang === 'kk' ? 'Белсенді мүше' : lang === 'ru' ? 'Активных участников' : 'Active members' },
            ].map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1} variants={fadeUp}>
                <p className="stat-number">{s.value}</p>
                <p className="text-sm text-kasipker-navy-400 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Events grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {EVENT_TYPES.map((ev, i) => {
            const name = lang === 'ru' ? ev.ru : lang === 'en' ? ev.en : ev.kk;
            const desc = lang === 'ru' ? ev.desc_ru : lang === 'en' ? ev.desc_en : ev.desc_kk;
            const freq = lang === 'ru' ? ev.freq_ru : lang === 'en' ? ev.freq_en : ev.freq_kk;
            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.08}
                variants={fadeUp}
                className="card-kasipker group flex flex-col"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl mb-5 ${ev.color} group-hover:bg-kasipker-navy-700 group-hover:text-white transition-colors duration-200`}>
                  <ev.Icon className="h-8 w-8" />
                </div>

                <h3 className="font-extrabold text-kasipker-navy-900 text-xl mb-2">{name}</h3>

                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-3.5 w-3.5 text-kasipker-gold-400 flex-shrink-0" />
                  <span className="text-xs font-semibold text-kasipker-gold-500">{freq}</span>
                </div>

                <p className="text-sm text-kasipker-navy-600 leading-relaxed flex-1 mb-6">{desc}</p>

                <Link
                  href="/contact"
                  className="btn-primary text-sm py-2.5 w-full cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  {tr.events_register} <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <section className="py-16 bg-kasipker-navy-900">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <h2 className="text-3xl font-black text-white mb-4">
              {lang === 'kk' ? 'Шараларға қатыспақшысыз ба?' :
               lang === 'ru' ? 'Хотите участвовать в мероприятиях?' :
               'Want to participate in events?'}
            </h2>
            <p className="text-white/60 mb-8">
              {lang === 'kk' ? 'Kasipker мүшесі болып, барлық шараларға қол жеткізіңіз.' :
               lang === 'ru' ? 'Станьте членом Kasipker и получите доступ ко всем мероприятиям.' :
               'Become a Kasipker member and get access to all events.'}
            </p>
            <Link href="/contact" className="btn-gold inline-flex items-center gap-2 cursor-pointer">
              {tr.nav_cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
