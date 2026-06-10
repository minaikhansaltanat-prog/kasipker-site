'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/translations';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

export default function AboutPage() {
  const { lang } = useLang();
  const tr = t[lang];

  const napHistory = [
    { year: '1999', kk: 'НАП РК негізі қаланды. Алматыда 30 кәсіпорын-мүшеден бастады', ru: 'Основан НАП РК. Начал с 30 предприятий-членов в Алматы', en: 'NAP RK founded. Started with 30 member enterprises in Almaty' },
    { year: '2000-е', kk: 'Астана, Павлодар, Костанай, Атырау, Батыс Қазақстан филиалдары', ru: 'Филиалы в Астане, Павлодаре, Костанае, Атырау, Западном Казахстане', en: 'Branches in Astana, Pavlodar, Kostanay, Atyrau, West Kazakhstan' },
    { year: '2003–10', kk: 'Мүшелер саны 30-дан 1500+ кәсіпорынға дейін өсті', ru: 'Число членов выросло с 30 до 1500+ предприятий', en: 'Members grew from 30 to 1500+ enterprises' },
    { year: '2010', kk: 'Германия Трир қаласының қолөнер палатасымен халықаралық кездесу', ru: 'Международная встреча с Торговой палатой г. Трир (Германия)', en: 'International meeting with Trier Chamber of Crafts (Germany)' },
    { year: '2013', kk: 'Польша сауда-өнеркәсіп палатасымен ынтымақтастық', ru: 'Сотрудничество с Торгово-промышленной палатой Польши', en: 'Cooperation with Polish Chamber of Commerce' },
    { year: '2014', kk: 'Бизнес-омбудсмен институтын құру туралы ұсыныс — НАП бастамасы', ru: 'Инициатива создания института бизнес-омбудсмена от НАП', en: 'NAP initiative to establish business ombudsman institution' },
    { year: '2015', kk: 'НАП — 15 жылдық мерейтой. Қаржы полициясы жойылды', ru: 'НАП — 15-летний юбилей. Упразднена финансовая полиция', en: 'NAP — 15th anniversary. Financial police abolished' },
    { year: '2026', kk: 'Kasipker дәуірі — жаңа деңгей, жаңа мақсат', ru: 'Эра Kasipker — новый уровень, новые цели', en: 'Kasipker era — new level, new goals' },
  ];

  const achievements = lang === 'kk' ? [
    'Қаржы полициясы жойылды — НАП жылдар бойы талап еткен реформа',
    'Бизнес тіркеу рәсімі жеңілдетілді',
    'МСБ-ге арналған жаңа несие бағдарламалары іске қосылды',
    'Ондаған заң актілеріне түзетулер енгізілді',
    'Жүздеген сот ісі жеңілді — заңсыз тексерулер мен айыппұлдарға қарсы',
    'Мыңдаған кәсіпкерге бухгалтерлік, заңдық қолдау',
    'Итальяндық, Германиялық, Польшалық серіктестермен халықаралық байланыс',
    '«Тәуелсіз газета» — кәсіпкерлерге арналған басылым шығарылды',
    '«Бизнес по-қазақшы» кітабы жазылды',
  ] : lang === 'ru' ? [
    'Упразднена финансовая полиция — реформа, которую НАП требовал годами',
    'Упрощена процедура регистрации бизнеса',
    'Запущены новые кредитные программы для МСБ',
    'Внесены поправки в десятки законодательных актов',
    'Выиграны сотни судебных дел против незаконных проверок и штрафов',
    'Тысячам предпринимателей оказана бухгалтерская и юридическая поддержка',
    'Установлены международные связи с Италией, Германией, Польшей',
    'Издана «Независимая газета» для предпринимателей',
    'Написана книга «Бизнес по-казахски»',
  ] : [
    'Financial police abolished — a reform NAP demanded for years',
    'Business registration process simplified',
    'New credit programs for SMEs launched',
    'Amendments to dozens of legislative acts introduced',
    'Hundreds of court cases won against illegal inspections and fines',
    'Thousands of entrepreneurs received accounting and legal support',
    'International ties established with Italy, Germany, Poland',
    'Independent newspaper for entrepreneurs published',
    '"Business in Kazakh" book written',
  ];

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <div className="hero-bg py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/30 bg-kasipker-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-6">
              {lang === 'kk' ? 'Тарихымыз' : lang === 'ru' ? 'Наша история' : 'Our History'}
            </span>
            <h1 className="text-4xl font-black text-white md:text-6xl mb-6">
              {lang === 'kk' ? 'НАП-тан Kasipker-ге — Заңды Жалғастық' :
               lang === 'ru' ? 'От НАП к Kasipker — Законная Преемственность' :
               'From NAP to Kasipker — Legal Continuity'}
            </h1>
            <p className="text-white/75 text-lg leading-relaxed">
              {lang === 'kk' ? '«Бір кәсіпкер — бір жеңіс. Мың кәсіпкер — Қазақстанның өркендеуі.»' :
               lang === 'ru' ? '«Один предприниматель — одна победа. Тысяча предпринимателей — процветание Казахстана.»' :
               '"One entrepreneur — one victory. A thousand entrepreneurs — Kazakhstan\'s prosperity."'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* NAP → Kasipker comparison */}
      <section className="py-20 bg-kasipker-navy-50">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
            <h2 className="section-title">{lang === 'kk' ? 'НАП идеологиясы — Kasipker ДНҚ-сындағы мұра' : lang === 'ru' ? 'Идеология НАП — наследие в ДНК Kasipker' : 'NAP Ideology — Heritage in Kasipker DNA'}</h2>
            <div className="gold-bar" />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* NAP */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1} variants={fadeUp}
              className="rounded-2xl border border-kasipker-navy-200 bg-white p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-kasipker-navy-100 text-kasipker-navy-700 font-black text-lg">НАП</div>
                <div>
                  <h3 className="font-extrabold text-kasipker-navy-900">НАП (1999–2015+)</h3>
                  <p className="text-xs text-kasipker-navy-400">Тәуелсіз Кәсіпкерлер Қауымдастығы</p>
                </div>
              </div>
              {[
                ['Шағын және орта бизнесті қорғау', 'МСБ protection'],
                ['Заңдық және бухгалтерлік сервис', 'Legal & accounting service'],
                ['Алматы орталығы, облыс филиалдары', 'Almaty center, regional branches'],
                ['Газета, кітап, бизнес-клуб', 'Newspaper, book, business club'],
                ['1500+ мүше (2010-шы жылдар)', '1500+ members (2010s)'],
              ].map(([kk, en], i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-kasipker-navy-50 last:border-0">
                  <span className="text-kasipker-navy-400 mt-0.5">→</span>
                  <span className="text-sm text-kasipker-navy-700">{lang === 'en' ? en : kk}</span>
                </div>
              ))}
            </motion.div>

            {/* Kasipker */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2} variants={fadeUp}
              className="rounded-2xl bg-kasipker-navy-900 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-kasipker-gold-400 text-kasipker-gold-900 font-black text-sm">KAS</div>
                <div>
                  <h3 className="font-extrabold text-white">KASIPKER (2026–...)</h3>
                  <p className="text-xs text-white/50">Кәсіпкерлер Альянсы</p>
                </div>
              </div>
              {[
                ['МСБ + ірі кәсіпкерлерді қамту — барлық деңгей', 'SME + large entrepreneurs — all levels'],
                ['Заң + IT + ЖИ + маркетинг + экспорт — толық экожүйе', 'Law + IT + AI + marketing + export — full ecosystem'],
                ['Қазақстан + Орталық Азия + халықаралық желі', 'Kazakhstan + Central Asia + international network'],
                ['Цифрлық академия, App, B2B маркетплейс, ЖИ', 'Digital academy, App, B2B marketplace, AI'],
                ['50 000+ мүше мақсат — 2030', '50,000+ members goal — 2030'],
              ].map(([kk, en], i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-white/10 last:border-0">
                  <span className="text-kasipker-gold-400 mt-0.5">✦</span>
                  <span className="text-sm text-white/80">{lang === 'en' ? en : kk}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-16">
            <span className="section-eyebrow">{lang === 'kk' ? 'Тарих' : lang === 'ru' ? 'История' : 'History'}</span>
            <h2 className="section-title">{lang === 'kk' ? '25 жылдың жолы' : lang === 'ru' ? 'Путь длиной 25 лет' : '25-Year Journey'}</h2>
            <div className="gold-bar" />
          </motion.div>

          <div className="relative">
            <div className="timeline-line" />
            <div className="flex flex-col gap-12">
              {napHistory.map((item, i) => {
                const isLeft = i % 2 === 0;
                const text = lang === 'ru' ? item.ru : lang === 'en' ? item.en : item.kk;
                return (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i * 0.1}
                    variants={fadeUp}
                    className={`relative flex ${isLeft ? 'justify-start pr-[52%]' : 'justify-end pl-[52%]'}`}
                  >
                    {/* Center dot */}
                    <div className="absolute left-1/2 top-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-kasipker-navy-700 ring-4 ring-white shadow-card z-10">
                      <div className="h-3 w-3 rounded-full bg-kasipker-gold-400" />
                    </div>
                    <div className="card-kasipker max-w-xs">
                      <span className="text-xs font-black text-kasipker-gold-400 block mb-2">{item.year}</span>
                      <p className="text-sm text-kasipker-navy-700 leading-relaxed">{text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-kasipker-navy-900">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white md:text-4xl mb-3">
              {lang === 'kk' ? 'НАП қол жеткізген нақты нәтижелер' : lang === 'ru' ? 'Реальные достижения НАП' : 'Real Achievements of NAP'}
            </h2>
            <div className="h-1 w-16 rounded-full bg-kasipker-gold-400 mx-auto" />
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.08}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-5"
              >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-kasipker-gold-400 text-kasipker-gold-900 text-xs font-black mt-0.5">✓</span>
                <p className="text-sm text-white/80 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="section-title mb-4">{lang === 'kk' ? 'Kasipkerге қосылыңыз' : lang === 'ru' ? 'Присоединяйтесь к Kasipker' : 'Join Kasipker'}</h2>
          <p className="text-kasipker-navy-400 mb-8">
            {lang === 'kk' ? '25 жылдық тәжірибені, 1500+ мүшелік желіні пайдаланыңыз' :
             lang === 'ru' ? 'Используйте 25-летний опыт и сеть из 1500+ членов' :
             'Leverage 25 years of experience and 1500+ member network'}
          </p>
          <Link href="/contact" className="btn-gold inline-flex px-8 py-4 text-base">
            {tr.nav_cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
