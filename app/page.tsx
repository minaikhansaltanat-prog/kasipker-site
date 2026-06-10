'use client';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import {
  Factory, Wheat, HardHat, Stethoscope, Cpu, ShoppingBag,
  Plane, GraduationCap, Banknote, Truck, Zap, Leaf,
  ArrowRight, Users, Globe, Award, Calendar,
} from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t, clusters, personalities, countries, partners } from '@/lib/translations';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: d } }),
};

const CLUSTER_ICONS = [Factory, Wheat, HardHat, Stethoscope, Cpu, ShoppingBag, Plane, GraduationCap, Banknote, Truck, Zap, Leaf];

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!inView) return;
    if (timerRef.current) clearInterval(timerRef.current);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    timerRef.current = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        setCount(current);
      }
    }, 25);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [inView, target]);

  return <span ref={ref} className="stat-number">{count}{suffix}</span>;
}

export default function Home() {
  const { lang } = useLang();
  const tr = t[lang];

  return (
    <div className="overflow-x-hidden">

      {/* ══════ HERO ══════ */}
      <section className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, #D4A017, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-32 -left-32 w-[450px] h-[450px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, #6A83DC, transparent 70%)' }}
        />

        {/* Hex grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v17.36L30 52 0 34.68V17.32z' fill='none' stroke='%23D4A017' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 52px',
        }} />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 text-center py-20">
          {/* Eyebrow — no emoji, use SVG star */}
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/40 bg-kasipker-gold-400/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-kasipker-gold-300 mb-8">
              <Award className="h-3.5 w-3.5" />
              {tr.hero_eyebrow} · 1999–2026
            </span>
          </motion.div>

          {/* Headline with animated gradient on accent word */}
          <motion.h1
            initial="hidden" animate="visible" custom={0.1} variants={fadeUp}
            className="text-5xl font-black text-white leading-tight mb-4 md:text-7xl"
          >
            {tr.hero_h1}{' '}
            <span
              className="block bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #D4A017 0%, #F5C842 40%, #D4A017 100%)', backgroundSize: '200% 100%' }}
            >
              {tr.hero_h1_accent}
            </span>
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" custom={0.25} variants={fadeUp}
            className="mx-auto max-w-2xl text-lg text-white/75 leading-relaxed mb-10"
          >
            {tr.hero_sub}
          </motion.p>

          {/* Glassmorphism CTA block */}
          <motion.div
            initial="hidden" animate="visible" custom={0.4} variants={fadeUp}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <Link
              href="/contact"
              className="btn-gold px-8 py-4 text-base font-bold cursor-pointer inline-flex items-center gap-2 group"
            >
              {tr.hero_cta1}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="btn-outline border-white/40 text-white hover:bg-white/10 hover:text-white px-8 py-4 text-base cursor-pointer inline-flex items-center gap-2"
            >
              {tr.hero_cta2}
            </Link>
          </motion.div>

          {/* Mini stats bar — glassmorphism */}
          <motion.div
            initial="hidden" animate="visible" custom={0.55} variants={fadeUp}
            className="inline-flex flex-wrap justify-center gap-px rounded-2xl overflow-hidden border border-white/10 shadow-elevated"
            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}
          >
            {[
              { Icon: Users, value: '1500+', label: tr.stats_members },
              { Icon: Globe, value: '7', label: tr.stats_countries },
              { Icon: Award, value: '12', label: tr.stats_clusters },
              { Icon: Calendar, value: '25+', label: tr.stats_years },
            ].map(({ Icon, value, label }, i) => (
              <div key={i} className="flex items-center gap-2 px-6 py-3.5 border-r border-white/10 last:border-r-0">
                <Icon className="h-4 w-4 text-kasipker-gold-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-base font-black text-kasipker-gold-400 leading-none">{value}</p>
                  <p className="text-[10px] text-white/50 mt-0.5 whitespace-nowrap">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-px h-10 bg-gradient-to-b from-transparent to-kasipker-gold-400/70" />
              <div className="w-1.5 h-1.5 rounded-full bg-kasipker-gold-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════ STATS ══════ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { target: 1500, suffix: '+', label: tr.stats_members },
              { target: 12, suffix: '', label: tr.stats_clusters },
              { target: 7, suffix: '', label: tr.stats_countries },
              { target: 25, suffix: '+', label: tr.stats_years },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1} variants={fadeUp}
                className="text-center card-kasipker"
              >
                <Counter target={stat.target} suffix={stat.suffix} />
                <p className="mt-2 text-sm font-semibold text-kasipker-navy-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ ABOUT PREVIEW ══════ */}
      <section className="py-20" style={{ background: '#EBF0FA' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            >
              <span className="section-eyebrow">{tr.about_eyebrow}</span>
              <h2 className="section-title mb-6">{tr.about_title}</h2>
              <p className="mb-4 leading-relaxed text-kasipker-navy-600">{tr.about_text1}</p>
              <p className="leading-relaxed text-kasipker-navy-600">{tr.about_text2}</p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl p-5 bg-white border border-kasipker-navy-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-kasipker-gold-400 mb-2">{tr.about_mission}</p>
                  <p className="text-sm leading-relaxed text-kasipker-navy-600">{tr.about_mission_text}</p>
                </div>
                <div className="rounded-2xl p-5 bg-white border border-kasipker-navy-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-kasipker-gold-400 mb-2">{tr.about_vision}</p>
                  <p className="text-sm leading-relaxed text-kasipker-navy-600">{tr.about_vision_text}</p>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/about" className="btn-primary inline-flex items-center gap-2 cursor-pointer">
                  {tr.read_more} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Timeline mini */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15} variants={fadeUp}
              className="relative"
            >
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-kasipker-navy-200 to-kasipker-gold-400" />
              {[
                { year: '1999', text: lang === 'kk' ? 'НАП РК негізі қаланды — 30 кәсіпорын' : lang === 'ru' ? 'Основан НАП РК — 30 предприятий' : 'NAP RK founded — 30 enterprises' },
                { year: '2003–10', text: lang === 'kk' ? 'Мүшелер саны 1500+ кәсіпорынға жетті' : lang === 'ru' ? 'Членов стало 1500+ предприятий' : 'Members grew to 1500+ enterprises' },
                { year: '2014', text: lang === 'kk' ? 'Бизнес-омбудсмен институтын құру бастамасы' : lang === 'ru' ? 'Инициатива создания бизнес-омбудсмена' : 'Initiative to establish business ombudsman' },
                { year: '2015', text: lang === 'kk' ? 'Қаржы полициясы жойылды — НАП реформасы' : lang === 'ru' ? 'Упразднена финансовая полиция' : 'Financial police abolished — NAP reform' },
                { year: '2026', text: lang === 'kk' ? 'Kasipker — жаңа деңгейдегі платформа' : lang === 'ru' ? 'Kasipker — платформа нового уровня' : 'Kasipker — next-level platform' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.12} variants={fadeUp}
                  className="relative flex gap-6 pb-8 last:pb-0 pl-16"
                >
                  <div className="absolute left-3.5 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-kasipker-navy-700 ring-2 ring-kasipker-navy-200 ring-offset-2">
                    <div className="h-2 w-2 rounded-full bg-kasipker-gold-400" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-kasipker-gold-400">{item.year}</span>
                    <p className="mt-0.5 text-sm font-medium text-kasipker-navy-700">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ CLUSTERS ══════ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="section-eyebrow">{tr.clusters_eyebrow}</span>
            <h2 className="section-title">{tr.clusters_title}</h2>
            <div className="gold-bar" />
            <p className="mt-4 text-kasipker-navy-400">{tr.clusters_sub}</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {clusters.map((cl, i) => {
              const Icon = CLUSTER_ICONS[i] ?? Factory;
              const name = lang === 'zh' || lang === 'tr' ? cl.en : lang === 'en' ? cl.en : lang === 'ru' ? cl.ru : cl.kk;
              return (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.06} variants={fadeUp}
                  className="cluster-card group text-center"
                >
                  <div className="cluster-icon mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-kasipker-navy-50 group-hover:bg-kasipker-navy-700 transition-colors duration-200">
                    <Icon className="h-6 w-6 text-kasipker-navy-700 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <p className="cluster-title text-sm font-bold text-kasipker-navy-800 transition-colors">
                    {name}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/clusters" className="btn-primary inline-flex items-center gap-2 cursor-pointer">
              {tr.join_cluster} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ PERSONALITIES PREVIEW ══════ */}
      <section style={{ background: '#EBF0FA' }} className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="section-eyebrow">{tr.personalities_eyebrow}</span>
            <h2 className="section-title">{tr.personalities_title}</h2>
            <div className="gold-bar" />
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {personalities.map((person, i) => {
              const info = lang === 'ru' ? person.ru : lang === 'en' ? person.en : person.kk;
              return (
                <motion.div
                  key={person.id}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1} variants={fadeUp}
                  className="card-kasipker overflow-hidden"
                >
                  <div className="relative h-64 w-full overflow-hidden rounded-xl mb-5">
                    <Image
                      src={person.photo}
                      alt={info.name}
                      fill
                      className="personality-photo"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-kasipker-navy-900/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-block rounded-full bg-kasipker-gold-400 px-3 py-1 text-xs font-bold text-kasipker-gold-900">
                        {person.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-extrabold text-kasipker-navy-900 text-lg mb-1">{info.name}</h3>
                  <p className="text-sm text-kasipker-gold-500 font-semibold mb-2">{info.position}</p>
                  <p className="text-sm text-kasipker-navy-400">{info.company}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/personalities" className="btn-primary inline-flex items-center gap-2 cursor-pointer">
              {tr.read_more} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ INTERNATIONAL ══════ */}
      <section className="py-20 bg-kasipker-navy-900">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/30 bg-kasipker-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-4">
              {tr.international_eyebrow}
            </span>
            <h2 className="text-3xl font-extrabold text-white md:text-4xl mb-2">{tr.international_title}</h2>
            <div className="h-1 w-16 rounded-full bg-kasipker-gold-400 mx-auto mt-3" />
            <p className="mt-4 text-white/60">{tr.international_sub}</p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {countries.slice(0, 4).map((country, i) => {
              const name = lang === 'ru' ? country.ru : lang === 'en' ? country.en : country.kk;
              const direction = lang === 'ru' ? country.direction_ru : lang === 'en' ? country.direction_en : country.direction_kk;
              return (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1} variants={fadeUp}
                  className="rounded-2xl p-5 bg-white/5 border border-white/10 hover:border-kasipker-gold-400/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl leading-none" aria-hidden="true">{country.flag}</span>
                    <div>
                      <p className="font-bold text-white">{name}</p>
                      <span className="text-xs rounded-full px-2 py-0.5 font-semibold" style={{ background: country.color + '33', color: country.color }}>
                        {country.tag}
                      </span>
                    </div>
                  </div>
                  {direction && <p className="text-xs text-white/50">{direction}</p>}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/international" className="btn-gold inline-flex items-center gap-2 cursor-pointer">
              {tr.read_more} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ PARTNERS MARQUEE ══════ */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-10"
          >
            <span className="section-eyebrow">{tr.partners_eyebrow}</span>
            <h2 className="section-title">{tr.partners_title}</h2>
            <div className="gold-bar" />
          </motion.div>

          <div className="overflow-hidden relative">
            <div className="marquee-track">
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={i}
                  className="mx-3 flex-shrink-0 flex items-center gap-3 rounded-2xl bg-kasipker-navy-50 border border-kasipker-navy-100 px-6 py-4 hover:border-kasipker-gold-400 transition-colors"
                  style={{ minWidth: 220 }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kasipker-navy-700 text-white font-black text-sm">
                    {p.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-kasipker-navy-800 text-sm">{p.name}</p>
                    {p.badge && (
                      <span className={`text-xs font-semibold ${p.badge === 'International' ? 'text-kasipker-gold-500' : 'text-kasipker-navy-400'}`}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section className="py-20" style={{ background: 'var(--gradient-brand-to-gold)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-8 text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          >
            <h2 className="text-3xl font-black text-white mb-4 md:text-5xl">
              {lang === 'kk' ? 'Kasipkerге қосылыңыз' :
               lang === 'ru' ? 'Присоединяйтесь к Kasipker' :
               lang === 'en' ? 'Join Kasipker Alliance' :
               lang === 'zh' ? '加入Kasipker联盟' :
               "Kasipker'e Katılın"}
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              {lang === 'kk' ? 'Қазақстанның 1500+ кәсіпкерімен бірлесіңіз' :
               lang === 'ru' ? 'Объединяйтесь с 1500+ предпринимателями Казахстана' :
               'Unite with 1500+ Kazakhstan entrepreneurs'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="rounded-xl bg-white px-8 py-4 text-base font-bold text-kasipker-navy-700 shadow-elevated hover:shadow-gold transition-all hover:-translate-y-1 cursor-pointer inline-flex items-center gap-2">
                {tr.hero_cta1} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="rounded-xl border-2 border-white/40 px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-all cursor-pointer">
                {tr.hero_cta2}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
