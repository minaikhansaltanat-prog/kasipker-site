'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Presentation, Coffee, UtensilsCrossed, Heart, Users, Handshake, ArrowRight, Calendar,
} from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t, pickByLang } from '@/lib/translations';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

const EVENT_TYPES = [
  {
    Icon: Presentation,
    color: 'bg-blue-50 text-blue-700',
    freq_kk: 'Жылына 2–4 рет', freq_ru: '2–4 раза в год', freq_en: '2–4 times a year', freq_zh: '每年2–4次', freq_tr: 'Yılda 2–4 kez',
    kk: 'Конференциялар',
    ru: 'Конференции',
    en: 'Conferences',
    zh: '会议',
    tr: 'Konferanslar',
    desc_kk: 'Бизнес, инвестиция, экспорт тақырыбындағы ірі форумдар мен конференциялар. Спикерлер, панельді пікірсайыстар, нетворкинг.',
    desc_ru: 'Крупные форумы и конференции по бизнесу, инвестициям, экспорту. Спикеры, панельные дискуссии, нетворкинг.',
    desc_en: 'Major forums and conferences on business, investment and export. Speakers, panel discussions, networking.',
    desc_zh: '关于商业、投资和出口的大型论坛和会议。演讲嘉宾、小组讨论、人脉交流。',
    desc_tr: 'İş, yatırım ve ihracat konularında büyük forumlar ve konferanslar. Konuşmacılar, panel tartışmaları, networking.',
  },
  {
    Icon: Coffee,
    color: 'bg-kasipker-navy-50 text-kasipker-navy-700',
    freq_kk: 'Аптасына бір рет', freq_ru: 'Еженедельно', freq_en: 'Weekly', freq_zh: '每周一次', freq_tr: 'Haftada bir kez',
    kk: 'Жұма кездесуі',
    ru: 'Пятничные встречи',
    en: 'Friday Meetups',
    zh: '周五聚会',
    tr: 'Cuma Buluşmaları',
    desc_kk: 'Жұма сайын өтетін бейресми кездесулер. Мүшелер тәжірибелерімен бөліседі, жаңа байланыстар орнатады.',
    desc_ru: 'Неформальные встречи каждую пятницу. Члены делятся опытом, устанавливают новые связи.',
    desc_en: 'Informal weekly meetings every Friday. Members share experience and build new connections.',
    desc_zh: '每周五举行的非正式聚会。会员分享经验，建立新的联系。',
    desc_tr: 'Her Cuma düzenlenen gayriresmi haftalık toplantılar. Üyeler deneyimlerini paylaşır ve yeni bağlantılar kurar.',
  },
  {
    Icon: UtensilsCrossed,
    color: 'bg-amber-50 text-amber-700',
    freq_kk: 'Айына 2 рет', freq_ru: '2 раза в месяц', freq_en: 'Twice a month', freq_zh: '每月2次', freq_tr: 'Ayda 2 kez',
    kk: 'Бизнес таңғы ас',
    ru: 'Бизнес-завтрак',
    en: 'Business Breakfast',
    zh: '商务早餐',
    tr: 'İş Kahvaltısı',
    desc_kk: 'Таңертеңгілік бизнес кездесу. Таңғы ас үстінде маңызды байланыстар мен серіктестіктер орнату.',
    desc_ru: 'Утренние деловые встречи. Установление важных контактов и партнёрств за завтраком.',
    desc_en: 'Morning business meetings. Building important contacts and partnerships over breakfast.',
    desc_zh: '早晨商务会议。在早餐中建立重要的人脉和合作关系。',
    desc_tr: 'Sabah iş toplantıları. Kahvaltı eşliğinde önemli bağlantılar ve ortaklıklar kurulur.',
  },
  {
    Icon: Heart,
    color: 'bg-red-50 text-red-600',
    freq_kk: 'Жылына 4 рет', freq_ru: '4 раза в год', freq_en: '4 times a year', freq_zh: '每年4次', freq_tr: 'Yılda 4 kez',
    kk: 'Қайырымдылық',
    ru: 'Благотворительность',
    en: 'Charity',
    zh: '慈善活动',
    tr: 'Hayır İşleri',
    desc_kk: 'Балалар үйлеріне, мүмкіндіктері шектеулі адамдарға және зілзала зардап шеккендерге көмек.',
    desc_ru: 'Помощь детским домам, людям с ограниченными возможностями и пострадавшим от стихийных бедствий.',
    desc_en: 'Support for orphanages, people with disabilities and disaster relief.',
    desc_zh: '为孤儿院、残障人士提供支持，并开展救灾援助。',
    desc_tr: 'Yetimhanelere, engelli bireylere destek ve afet yardımı.',
  },
  {
    Icon: Users,
    color: 'bg-green-50 text-green-700',
    freq_kk: 'Тоқсанына бір рет', freq_ru: 'Ежеквартально', freq_en: 'Quarterly', freq_zh: '每季度一次', freq_tr: 'Üç ayda bir',
    kk: 'Қоғамдық жұмыстар',
    ru: 'Общественные работы',
    en: 'Community Work',
    zh: '社区工作',
    tr: 'Toplum Çalışmaları',
    desc_kk: 'Қала тазалығы, парк жайластыру, мектептерге көмек — қоғам үшін бірлескен іс-шаралар.',
    desc_ru: 'Уборка города, благоустройство парков, помощь школам — совместные мероприятия для общества.',
    desc_en: 'City cleanup, park renovation, school support — joint community activities.',
    desc_zh: '城市清洁、公园改造、学校援助——共同的社区活动。',
    desc_tr: 'Şehir temizliği, park düzenlemesi, okullara destek — ortak toplum etkinlikleri.',
  },
  {
    Icon: Handshake,
    color: 'bg-purple-50 text-purple-700',
    freq_kk: 'Жылына 2 рет', freq_ru: '2 раза в год', freq_en: 'Twice a year', freq_zh: '每年2次', freq_tr: 'Yılda 2 kez',
    kk: 'Асар',
    ru: 'Асар',
    en: 'Asar',
    zh: 'Asar',
    tr: 'Asar',
    desc_kk: 'Қазақтың дәстүрлі «асар» рухымен — бірге жасасақ болады. Мүшелердің бизнесіне, жобасына немесе мәселесіне бірлесіп шешім табу.',
    desc_ru: 'В традиционном духе казахского «асар» — вместе всё возможно. Совместное решение проблем бизнеса или проектов членов.',
    desc_en: 'In the spirit of the Kazakh tradition «Asar» — together we can. Collectively solving members\' business challenges and projects.',
    desc_zh: '秉承哈萨克传统「Asar」精神——众志成城。共同解决会员的业务难题与项目。',
    desc_tr: 'Kazak geleneği «Asar» ruhuyla — birlikte başarırız. Üyelerin iş sorunlarını ve projelerini ortaklaşa çözme.',
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
              { value: '6', label: pickByLang(lang, 'Шара форматы', 'Форматов событий', 'Event formats', '活动形式', 'Etkinlik formatı') },
              { value: '50+', label: pickByLang(lang, 'Жыл сайын шара', 'Событий в год', 'Events per year', '每年活动数', 'Yıllık etkinlik') },
              { value: '1500+', label: pickByLang(lang, 'Белсенді мүше', 'Активных участников', 'Active members', '活跃会员', 'Aktif üye') },
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
            const name = pickByLang(lang, ev.kk, ev.ru, ev.en, ev.zh, ev.tr);
            const desc = pickByLang(lang, ev.desc_kk, ev.desc_ru, ev.desc_en, ev.desc_zh, ev.desc_tr);
            const freq = pickByLang(lang, ev.freq_kk, ev.freq_ru, ev.freq_en, ev.freq_zh, ev.freq_tr);
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
              {pickByLang(
                lang,
                'Шараларға қатыспақшысыз ба?',
                'Хотите участвовать в мероприятиях?',
                'Want to participate in events?',
                '想参加我们的活动吗？',
                'Etkinliklere katılmak ister misiniz?'
              )}
            </h2>
            <p className="text-white/60 mb-8">
              {pickByLang(
                lang,
                'Kasipker мүшесі болып, барлық шараларға қол жеткізіңіз.',
                'Станьте членом Kasipker и получите доступ ко всем мероприятиям.',
                'Become a Kasipker member and get access to all events.',
                '成为Kasipker会员，畅享所有活动。',
                'Kasipker üyesi olun ve tüm etkinliklere erişim kazanın.'
              )}
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
