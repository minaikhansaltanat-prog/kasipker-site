'use client';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import {
  Factory, Wheat, HardHat, Stethoscope, Cpu, ShoppingBag,
  Plane, GraduationCap, Banknote, Truck, Zap, Leaf,
  ArrowRight, Users, Globe, Award, Calendar, Star,
  Presentation, Coffee, UtensilsCrossed, Heart, Handshake,
  Mic, FileText, BookOpen, Newspaper,
  Camera, MapPin, Mail, Phone,
} from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t, clusters, personalities, countries, partners, pickByLang } from '@/lib/translations';
import Maps2GisButton from '@/components/Maps2GisButton';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, officeAddress } from '@/lib/contactInfo';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: d } }),
};

const CLUSTER_ICONS = [Factory, Wheat, HardHat, Stethoscope, Cpu, ShoppingBag, Plane, GraduationCap, Banknote, Truck, Zap, Leaf];

const EVENT_TYPES = [
  {
    Icon: Presentation,
    color: 'bg-blue-50 text-blue-700',
    freq_kk: 'Жылына 2–4 рет', freq_ru: '2–4 раза в год', freq_en: '2–4 times a year', freq_zh: '每年2-4次', freq_tr: 'Yılda 2-4 kez',
    kk: 'Конференциялар', ru: 'Конференции', en: 'Conferences', zh: '会议', tr: 'Konferanslar',
    desc_kk: 'Бизнес, инвестиция, экспорт тақырыбындағы ірі форумдар. Спикерлер, панельді пікірсайыстар, нетворкинг.',
    desc_ru: 'Крупные форумы по бизнесу, инвестициям, экспорту. Спикеры, панельные дискуссии, нетворкинг.',
    desc_en: 'Major forums on business, investment and export. Speakers, panel discussions, networking.',
    desc_zh: '关于商业、投资、出口的大型论坛。演讲嘉宾、小组讨论、人脉社交。',
    desc_tr: 'İş, yatırım ve ihracat konularında büyük forumlar. Konuşmacılar, panel tartışmaları, networking.',
  },
  {
    Icon: Coffee,
    color: 'bg-kasipker-navy-50 text-kasipker-navy-700',
    freq_kk: 'Аптасына бір рет', freq_ru: 'Еженедельно', freq_en: 'Weekly', freq_zh: '每周一次', freq_tr: 'Haftada bir',
    kk: 'Жұма кездесуі', ru: 'Пятничные встречи', en: 'Friday Meetups', zh: '周五聚会', tr: 'Cuma Buluşmaları',
    desc_kk: 'Жұма сайын өтетін бейресми кездесулер. Мүшелер тәжірибелерімен бөліседі, жаңа байланыстар орнатады.',
    desc_ru: 'Неформальные встречи каждую пятницу. Члены делятся опытом, устанавливают новые связи.',
    desc_en: 'Informal weekly meetings every Friday. Members share experience and build new connections.',
    desc_zh: '每周五举行的非正式聚会。会员分享经验，建立新的人脉联系。',
    desc_tr: 'Her Cuma düzenlenen gayriresmi buluşmalar. Üyeler deneyim paylaşır, yeni bağlantılar kurar.',
  },
  {
    Icon: UtensilsCrossed,
    color: 'bg-amber-50 text-amber-700',
    freq_kk: 'Айына 2 рет', freq_ru: '2 раза в месяц', freq_en: 'Twice a month', freq_zh: '每月2次', freq_tr: 'Ayda 2 kez',
    kk: 'Бизнес таңғы ас', ru: 'Бизнес-завтрак', en: 'Business Breakfast', zh: '商务早餐', tr: 'İş Kahvaltısı',
    desc_kk: 'Таңертеңгілік бизнес кездесу. Таңғы ас үстінде маңызды байланыстар мен серіктестіктер орнату.',
    desc_ru: 'Утренние деловые встречи. Установление важных контактов и партнёрств за завтраком.',
    desc_en: 'Morning business meetings. Building important contacts and partnerships over breakfast.',
    desc_zh: '早晨的商务聚会。在早餐时建立重要的人脉与合作关系。',
    desc_tr: 'Sabah iş toplantıları. Kahvaltıda önemli bağlantılar ve ortaklıklar kurma.',
  },
  {
    Icon: Heart,
    color: 'bg-red-50 text-red-600',
    freq_kk: 'Жылына 4 рет', freq_ru: '4 раза в год', freq_en: '4 times a year', freq_zh: '每年4次', freq_tr: 'Yılda 4 kez',
    kk: 'Қайырымдылық', ru: 'Благотворительность', en: 'Charity', zh: '慈善活动', tr: 'Hayır İşleri',
    desc_kk: 'Балалар үйлеріне, мүмкіндіктері шектеулі адамдарға және зілзала зардап шеккендерге көмек.',
    desc_ru: 'Помощь детским домам, людям с ограниченными возможностями и пострадавшим от стихийных бедствий.',
    desc_en: 'Support for orphanages, people with disabilities and disaster relief.',
    desc_zh: '帮助孤儿院、残障人士以及自然灾害受灾群众。',
    desc_tr: 'Yetimhanelere, engelli bireylere ve doğal afet mağdurlarına destek.',
  },
  {
    Icon: Users,
    color: 'bg-green-50 text-green-700',
    freq_kk: 'Тоқсанына бір рет', freq_ru: 'Ежеквартально', freq_en: 'Quarterly', freq_zh: '每季度一次', freq_tr: 'Üç ayda bir',
    kk: 'Қоғамдық жұмыстар', ru: 'Общественные работы', en: 'Community Work', zh: '社会公益活动', tr: 'Toplum Çalışmaları',
    desc_kk: 'Қала тазалығы, парк жайластыру, мектептерге көмек — қоғам үшін бірлескен іс-шаралар.',
    desc_ru: 'Уборка города, благоустройство парков, помощь школам — совместные мероприятия.',
    desc_en: 'City cleanup, park renovation, school support — joint community activities.',
    desc_zh: '城市清洁、公园改造、学校援助——共同的社区活动。',
    desc_tr: 'Şehir temizliği, park düzenlemesi, okullara destek — ortak toplum etkinlikleri.',
  },
  {
    Icon: Handshake,
    color: 'bg-purple-50 text-purple-700',
    freq_kk: 'Жылына 2 рет', freq_ru: '2 раза в год', freq_en: 'Twice a year', freq_zh: '每年2次', freq_tr: 'Yılda 2 kez',
    kk: 'Асар', ru: 'Асар', en: 'Asar', zh: '"阿萨尔"互助', tr: 'Asar',
    desc_kk: 'Қазақтың дәстүрлі «асар» рухымен — бірге жасасақ болады. Мүшелердің бизнесіне бірлесіп шешім табу.',
    desc_ru: 'В духе казахского «асар» — вместе всё возможно. Совместное решение проблем бизнеса членов.',
    desc_en: 'In the spirit of the Kazakh tradition «Asar» — together we can. Collectively solving business challenges.',
    desc_zh: '秉承哈萨克传统"阿萨尔"互助精神——同心协力，无所不能。共同解决会员的经营难题。',
    desc_tr: 'Kazak geleneği «Asar» ruhuyla — birlikte her şey mümkün. Üyelerin iş sorunlarını birlikte çözme.',
  },
];

const MEDIA_TYPES = [
  {
    key: 'podcasts', Icon: Mic,
    color: 'bg-purple-50 text-purple-700',
    kk: 'Подкастар', ru: 'Подкасты', en: 'Podcasts', zh: '播客', tr: 'Podcastler',
    desc_kk: 'Kasipker кәсіпкерлерімен сұхбат, бизнес кеңестері және сараптамалар',
    desc_ru: 'Интервью с предпринимателями Kasipker, бизнес-советы и аналитика',
    desc_en: 'Interviews with Kasipker entrepreneurs, business tips and analytics',
    desc_zh: '与Kasipker企业家的访谈、商业建议与分析',
    desc_tr: 'Kasipker girişimcileriyle röportajlar, iş tavsiyeleri ve analizler',
  },
  {
    key: 'articles', Icon: FileText,
    color: 'bg-blue-50 text-blue-700',
    kk: 'Мақалалар', ru: 'Статьи', en: 'Articles', zh: '文章', tr: 'Makaleler',
    desc_kk: 'Бизнес, заң, экспорт, инвестиция тақырыбындағы терең мақалалар',
    desc_ru: 'Глубокие статьи о бизнесе, праве, экспорте и инвестициях',
    desc_en: 'In-depth articles on business, law, export and investment',
    desc_zh: '关于商业、法律、出口和投资的深度文章',
    desc_tr: 'İş, hukuk, ihracat ve yatırım hakkında derinlemesine makaleler',
  },
  {
    key: 'blog', Icon: BookOpen,
    color: 'bg-green-50 text-green-700',
    kk: 'Блог', ru: 'Блог', en: 'Blog', zh: '博客', tr: 'Blog',
    desc_kk: 'Мүшелердің тәжірибесі, кейстер және бизнес жолы туралы жазбалар',
    desc_ru: 'Опыт членов, кейсы и заметки о предпринимательском пути',
    desc_en: 'Member experiences, case studies and entrepreneurship stories',
    desc_zh: '会员经验、案例研究与创业故事',
    desc_tr: 'Üye deneyimleri, vaka çalışmaları ve girişimcilik hikayeleri',
  },
  {
    key: 'news', Icon: Newspaper,
    color: 'bg-amber-50 text-amber-700',
    kk: 'Жаңалықтар', ru: 'Новости', en: 'News', zh: '新闻', tr: 'Haberler',
    desc_kk: 'Альянс жаңалықтары, мүшелік хабарландырулар, серіктестіктер',
    desc_ru: 'Новости Альянса, членские объявления, партнёрства',
    desc_en: 'Alliance news, membership announcements, partnerships',
    desc_zh: '联盟新闻、会员公告、合作伙伴关系',
    desc_tr: 'İttifak haberleri, üyelik duyuruları, ortaklıklar',
  },
];

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
      <section className="hero-photo-bg relative min-h-screen flex items-center justify-center pt-20">

        {/* Gold orb — above overlay z-index */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none z-[2]"
          style={{ background: 'radial-gradient(circle, #D4A017, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.10, 0.18, 0.10] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-32 -left-32 w-[450px] h-[450px] rounded-full pointer-events-none z-[2]"
          style={{ background: 'radial-gradient(circle, #6A83DC, transparent 70%)' }}
        />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-[2]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v17.36L30 52 0 34.68V17.32z' fill='none' stroke='%23D4A017' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 52px',
        }} />

        {/* Content — topmost layer */}
        <div className="relative z-[10] mx-auto max-w-7xl px-4 md:px-8 py-16 w-full">

          {/* Two-column: text LEFT, video RIGHT */}
          <div className="grid min-w-0 lg:grid-cols-2 gap-8 xl:gap-12 items-center mb-10">

            {/* ── LEFT: text ── */}
            <motion.div
              initial="hidden" animate="visible" custom={0} variants={fadeUp}
              className="min-w-0 rounded-2xl px-8 py-10 md:px-10 md:py-12 text-left"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              }}
            >
              <span className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-kasipker-gold-400/40 bg-kasipker-gold-400/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-kasipker-gold-300 mb-6">
                <Award className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{tr.hero_eyebrow} · 1999–2026</span>
              </span>

              <motion.h1
                initial="hidden" animate="visible" custom={0.1} variants={fadeUp}
                className="text-3xl font-black text-white leading-tight mb-4 break-words sm:text-4xl md:text-6xl"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.30)' }}
              >
                {tr.hero_h1}{' '}
                <span
                  className="block break-words bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #D4A017 0%, #F5C842 40%, #D4A017 100%)' }}
                >
                  {tr.hero_h1_accent}
                </span>
              </motion.h1>

              <motion.p
                initial="hidden" animate="visible" custom={0.25} variants={fadeUp}
                className="text-base leading-relaxed mb-8"
                style={{ color: 'rgba(255,255,255,0.88)', textShadow: '0 1px 8px rgba(0,0,0,0.20)' }}
              >
                {tr.hero_sub}
              </motion.p>

              <motion.div
                initial="hidden" animate="visible" custom={0.4} variants={fadeUp}
                className="flex flex-wrap gap-4"
              >
                <Link href="/contact" className="btn-gold px-7 py-3.5 text-sm font-bold cursor-pointer inline-flex items-center gap-2 group">
                  {tr.hero_cta1}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold cursor-pointer transition-all duration-200"
                  style={{
                    border: '2px solid rgba(255,255,255,0.80)',
                    color: '#ffffff',
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.15)',
                    textShadow: '0 1px 6px rgba(0,0,0,0.35)',
                  }}
                >
                  {tr.hero_cta2}
                </Link>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: YouTube video ── */}
            <motion.div
              initial="hidden" animate="visible" custom={0.2} variants={fadeUp}
              className="min-w-0 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
              }}
            >
              {/* Gold top bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10"
                style={{ background: 'rgba(212,160,23,0.12)' }}>
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-kasipker-gold-300 ml-2">
                  {pickByLang(lang, 'Kasipker Клубы туралы', 'О клубе Kasipker', 'About Kasipker Club', '关于Kasipker俱乐部', 'Kasipker Kulübü Hakkında')}
                </span>
              </div>

              {/* Video area: Kasipker presentation video (privacy-enhanced YouTube embed) */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/_7D1kjvExdk?rel=0&modestbranding=1"
                  title="Kasipker Club Presentation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Caption */}
              <div className="px-5 py-3 flex items-center justify-between">
                <p className="text-xs font-semibold text-white/60">
                  {pickByLang(lang, 'Клубтың презентациялық видеосы', 'Презентационное видео клуба', 'Club presentation video', '俱乐部宣传视频', 'Kulüp Tanıtım Videosu')}
                </p>
                <a
                  href="https://www.youtube.com/@kasipker.kazakhstan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-kasipker-gold-400 hover:text-kasipker-gold-300 transition-colors cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                  </svg>
                  YouTube
                </a>
              </div>
            </motion.div>
          </div>

          {/* Stats bar — full width */}
          <motion.div
            initial="hidden" animate="visible" custom={0.55} variants={fadeUp}
            className="flex flex-wrap justify-center gap-px rounded-2xl overflow-hidden border border-white/10"
            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
          >
            {[
              { Icon: Users, value: '1500+', label: tr.stats_members },
              { Icon: Globe, value: '7', label: tr.stats_countries },
              { Icon: Award, value: '12', label: tr.stats_clusters },
              { Icon: Calendar, value: '25+', label: tr.stats_years },
            ].map(({ Icon, value, label }, i) => (
              <div key={i} className="flex flex-1 items-center justify-center gap-2 px-6 py-3.5 border-r border-white/10 last:border-r-0 min-w-[120px]">
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
            className="mt-12 flex justify-center"
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

      {/* ══════ АЛЬЯНС ТУРАЛЫ ══════ */}
      <section id="about" className="py-20" style={{ background: '#EBF0FA' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
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

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15} variants={fadeUp}
              className="relative"
            >
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-kasipker-navy-200 to-kasipker-gold-400" />
              {[
                { year: '1999', text: pickByLang(lang, 'НАП РК негізі қаланды — 30 кәсіпорын', 'Основан НАП РК — 30 предприятий', 'NAP RK founded — 30 enterprises', 'NAP RK成立——30家企业', 'NAP RK kuruldu — 30 işletme') },
                { year: '2003–10', text: pickByLang(lang, 'Мүшелер саны 1500+ кәсіпорынға жетті', 'Членов стало 1500+ предприятий', 'Members grew to 1500+ enterprises', '会员企业增至1500多家', 'Üye sayısı 1500+ işletmeye ulaştı') },
                { year: '2014', text: pickByLang(lang, 'Бизнес-омбудсмен институтын құру бастамасы', 'Инициатива создания бизнес-омбудсмена', 'Initiative to establish business ombudsman', '发起设立商业监察专员机构', 'İş ombudsmanlığı kurma girişimi') },
                { year: '2015', text: pickByLang(lang, 'Қаржы полициясы жойылды — НАП реформасы', 'Упразднена финансовая полиция', 'Financial police abolished — NAP reform', '取消金融警察——NAP改革', 'Mali polis kaldırıldı — NAP reformu') },
                { year: '2026', text: pickByLang(lang, 'Kasipker — жаңа деңгейдегі платформа', 'Kasipker — платформа нового уровня', 'Kasipker — next-level platform', 'Kasipker——新一代平台', 'Kasipker — yeni seviye platform') },
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

      {/* ══════ ТҰЛҒАЛАР ══════ */}
      <section id="personalities" className="py-20 bg-white">
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
              const info = pickByLang(lang, person.kk, person.ru, person.en, person.zh, person.tr);
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
                    <div className="absolute inset-0 bg-gradient-to-t from-kasipker-navy-900/30 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {person.categories.map((cat: string) => (
                      <span key={cat} className="inline-block rounded-full bg-kasipker-gold-400 px-3 py-1 text-xs font-bold text-kasipker-gold-900">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-extrabold text-kasipker-navy-900 text-lg mb-1">{info.name}</h3>
                  <p className="text-sm text-kasipker-gold-500 font-semibold mb-2">{info.position}</p>
                  <p className="text-sm text-kasipker-navy-400 mb-2">{info.company}</p>
                  {info.highlights && info.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {info.highlights.map((h: string, hi: number) => (
                        <span key={hi} className="inline-flex items-center gap-1 rounded-lg bg-kasipker-navy-50 border border-kasipker-navy-100 px-2 py-0.5 text-[10px] font-bold text-kasipker-navy-700">
                          <Star className="h-2.5 w-2.5 text-kasipker-gold-400 flex-shrink-0" />
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
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

      {/* ══════ КЛАСТЕРЛЕР ══════ */}
      <section id="clusters" className="py-20" style={{ background: '#EBF0FA' }}>
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
              const name = pickByLang(lang, cl.kk, cl.ru, cl.en, cl.zh, cl.tr);
              return (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.06} variants={fadeUp}
                  className="cluster-card group text-center"
                >
                  <div className="cluster-icon mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-kasipker-navy-50 group-hover:bg-kasipker-navy-700 transition-colors duration-200">
                    <Icon className="h-6 w-6 text-kasipker-navy-700 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <p className="cluster-title text-sm font-bold text-kasipker-navy-800 transition-colors">{name}</p>
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

      {/* ══════ ХАЛЫҚАРАЛЫҚ ══════ */}
      <section id="international" className="py-20 bg-kasipker-navy-900">
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
              const name = pickByLang(lang, country.kk, country.ru, country.en, country.zh, country.tr);
              const direction = pickByLang(lang, country.direction_kk, country.direction_ru, country.direction_en, country.direction_zh, country.direction_tr);
              const tag = pickByLang(lang, country.tag_kk, country.tag_ru, country.tag_en, country.tag_zh, country.tag_tr);
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
                        {tag}
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

      {/* ══════ ШАРАЛАР ══════ */}
      <section id="events" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="section-eyebrow">{tr.events_eyebrow}</span>
            <h2 className="section-title">
              {lang === 'kk' ? 'Клуб Мүшелерінің Шаралары' :
               lang === 'ru' ? 'Мероприятия для членов клуба' :
               lang === 'en' ? 'Club Member Events' :
               lang === 'zh' ? '俱乐部会员活动' :
               'Kulüp Üyesi Etkinlikleri'}
            </h2>
            <div className="gold-bar" />
            <p className="mt-4 text-kasipker-navy-400">{tr.events_sub}</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {EVENT_TYPES.map((ev, i) => {
              const name = pickByLang(lang, ev.kk, ev.ru, ev.en, ev.zh, ev.tr);
              const desc = pickByLang(lang, ev.desc_kk, ev.desc_ru, ev.desc_en, ev.desc_zh, ev.desc_tr);
              const freq = pickByLang(lang, ev.freq_kk, ev.freq_ru, ev.freq_en, ev.freq_zh, ev.freq_tr);
              return (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08} variants={fadeUp}
                  className="card-kasipker group flex flex-col"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl mb-4 ${ev.color} group-hover:bg-kasipker-navy-700 group-hover:text-white transition-colors duration-200`}>
                    <ev.Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-extrabold text-kasipker-navy-900 text-lg mb-2">{name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-3.5 w-3.5 text-kasipker-gold-400 flex-shrink-0" />
                    <span className="text-xs font-semibold text-kasipker-gold-500">{freq}</span>
                  </div>
                  <p className="text-sm text-kasipker-navy-600 leading-relaxed flex-1">{desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/events" className="btn-primary inline-flex items-center gap-2 cursor-pointer">
              {tr.read_more} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ СЕРІКТЕСТЕР ══════ */}
      <section id="partners" className="py-16 overflow-hidden" style={{ background: '#EBF0FA' }}>
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
                  className="mx-3 flex-shrink-0 flex items-center gap-3 rounded-2xl bg-white border border-kasipker-navy-100 px-6 py-4 hover:border-kasipker-gold-400 transition-colors"
                  style={{ minWidth: 220 }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kasipker-navy-700 text-white font-black text-sm">
                    {p.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-kasipker-navy-800 text-sm">{p.name}</p>
                    {p.badge && (
                      <span className={`text-xs font-semibold ${p.badge === 'International' ? 'text-kasipker-gold-500' : 'text-kasipker-navy-400'}`}>
                        {p.badge === 'International'
                          ? pickByLang(lang, 'Халықаралық', 'Международный', 'International', '国际', 'Uluslararası')
                          : pickByLang(lang, 'Ресми', 'Официальный', 'Official', '官方', 'Resmi')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/partners" className="btn-primary inline-flex items-center gap-2 cursor-pointer">
              {tr.read_more} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ МЕДИА ══════ */}
      <section id="media" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="section-eyebrow">{tr.media_eyebrow}</span>
            <h2 className="section-title">{tr.media_title}</h2>
            <div className="gold-bar" />
            <p className="mt-4 text-kasipker-navy-400">{tr.media_sub}</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MEDIA_TYPES.map((type, i) => {
              const name = pickByLang(lang, type.kk, type.ru, type.en, type.zh, type.tr);
              const desc = pickByLang(lang, type.desc_kk, type.desc_ru, type.desc_en, type.desc_zh, type.desc_tr);
              return (
                <motion.div
                  key={type.key}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1} variants={fadeUp}
                  className="card-kasipker group flex flex-col items-center text-center"
                >
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl mb-4 ${type.color} group-hover:bg-kasipker-navy-700 group-hover:text-white transition-colors duration-200`}>
                    <type.Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-extrabold text-kasipker-navy-900 text-lg mb-2">{name}</h3>
                  <p className="text-sm text-kasipker-navy-600 leading-relaxed flex-1 mb-4">{desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-kasipker-gold-500 bg-kasipker-gold-50 rounded-lg px-3 py-1.5">
                    {tr.media_coming_soon}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/media" className="btn-primary inline-flex items-center gap-2 cursor-pointer">
              {tr.read_more} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ ГАЛЕРЕЯ ══════ */}
      <section id="gallery" className="py-20" style={{ background: '#EBF0FA' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="section-eyebrow">{tr.gallery_eyebrow}</span>
            <h2 className="section-title">{tr.gallery_title}</h2>
            <div className="gold-bar" />
            <p className="mt-4 text-kasipker-navy-400">
              {pickByLang(
                lang,
                'Конференциялар, кездесулер және шаралардан суреттер',
                'Фотографии с конференций, встреч и мероприятий',
                'Photos from conferences, meetings and events',
                '会议、聚会和活动的照片',
                'Konferans, buluşma ve etkinliklerden fotoğraflar'
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {[
              { gradient: 'from-kasipker-navy-800 to-kasipker-navy-600', label: pickByLang(lang, 'Конференция 2024', 'Конференция 2024', 'Conference 2024', '2024年会议', 'Konferans 2024') },
              { gradient: 'from-kasipker-gold-600 to-kasipker-gold-400', label: pickByLang(lang, 'Бизнес таңғы ас', 'Бизнес-завтрак', 'Business Breakfast', '商务早餐', 'İş Kahvaltısı') },
              { gradient: 'from-blue-800 to-blue-600', label: pickByLang(lang, 'Жұма кездесуі', 'Пятничная встреча', 'Friday Meetup', '周五聚会', 'Cuma Buluşması') },
              { gradient: 'from-purple-800 to-purple-600', label: pickByLang(lang, 'Асар 2025', 'Асар 2025', 'Asar 2025', '"阿萨尔" 2025', 'Asar 2025') },
              { gradient: 'from-green-800 to-green-600', label: pickByLang(lang, 'Қоғамдық жұмыс', 'Общественная работа', 'Community Work', '社会公益活动', 'Toplum Çalışması') },
              { gradient: 'from-red-800 to-red-600', label: pickByLang(lang, 'Қайырымдылық', 'Благотворительность', 'Charity', '慈善活动', 'Hayır İşi') },
              { gradient: 'from-kasipker-navy-900 to-kasipker-navy-700', label: pickByLang(lang, 'Халықаралық форум', 'Международный форум', 'International Forum', '国际论坛', 'Uluslararası Forum') },
              { gradient: 'from-amber-700 to-amber-500', label: pickByLang(lang, 'Кластер кездесуі', 'Встреча кластера', 'Cluster Meeting', '产业集群会议', 'Küme Toplantısı') },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.06} variants={fadeUp}
                className={`group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br ${item.gradient} cursor-pointer hover:-translate-y-1 transition-transform duration-300`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                  <Camera className="h-8 w-8 text-white mb-2" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-xs font-semibold text-white">{item.label}</p>
                </div>
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='35' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v17.36L30 52 0 34.68V17.32z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
                  backgroundSize: '40px 35px',
                }} />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/gallery" className="btn-primary inline-flex items-center gap-2 cursor-pointer">
              {pickByLang(lang, 'Галереяны ашу', 'Открыть галерею', 'Open Gallery', '打开图库', 'Galeriyi Aç')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ БАЙЛАНЫС ══════ */}
      <section id="contact" className="py-20 bg-kasipker-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v17.36L30 52 0 34.68V17.32z' fill='none' stroke='%23D4A017' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 52px',
        }} />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/30 bg-kasipker-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-4">
              {tr.contact_eyebrow}
            </span>
            <h2 className="text-3xl font-extrabold text-white md:text-4xl mb-2">{tr.contact_title}</h2>
            <div className="h-1 w-16 rounded-full bg-kasipker-gold-400 mx-auto mt-3" />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {[
              {
                Icon: MapPin,
                title: pickByLang(lang, 'Мекенжай', 'Адрес', 'Address', '地址', 'Adres'),
                text: officeAddress(lang),
                isAddress: true,
              },
              {
                Icon: Mail,
                title: 'Email',
                text: CONTACT_EMAIL,
              },
              {
                Icon: Phone,
                title: pickByLang(lang, 'Телефон', 'Телефон', 'Phone', '电话', 'Telefon'),
                text: CONTACT_PHONE_DISPLAY,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1} variants={fadeUp}
                className="flex flex-col items-center text-center rounded-2xl bg-white/5 border border-white/10 p-8 hover:border-kasipker-gold-400/40 transition-colors"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-kasipker-gold-400/10 border border-kasipker-gold-400/20 mb-4">
                  <item.Icon className="h-6 w-6 text-kasipker-gold-400" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-2">{item.title}</p>
                <p className="text-white/80 font-semibold">{item.text}</p>
                {item.isAddress && (
                  <div className="mt-3">
                    <Maps2GisButton />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3} variants={fadeUp}
            className="text-center"
          >
            <h3 className="text-2xl font-black text-white mb-3">
              {lang === 'kk' ? 'Kasipkerге қосылыңыз' :
               lang === 'ru' ? 'Присоединяйтесь к Kasipker' :
               lang === 'en' ? 'Join Kasipker Alliance' :
               lang === 'zh' ? '加入Kasipker联盟' :
               "Kasipker'e Katılın"}
            </h3>
            <p className="text-white/60 mb-8">
              {pickByLang(
                lang,
                'Қазақстанның 1500+ кәсіпкерімен бірлесіңіз',
                'Объединяйтесь с 1500+ предпринимателями Казахстана',
                'Unite with 1500+ Kazakhstan entrepreneurs',
                '与1500多位哈萨克斯坦企业家携手合作',
                "Kazakistan'ın 1500+ girişimcisiyle birleşin"
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="rounded-xl bg-kasipker-gold-400 px-8 py-4 text-base font-bold text-kasipker-gold-900 shadow-elevated hover:bg-kasipker-gold-300 transition-all hover:-translate-y-1 cursor-pointer inline-flex items-center gap-2">
                {tr.hero_cta1} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="rounded-xl border-2 border-white/30 px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-all cursor-pointer">
                {tr.hero_cta2}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
