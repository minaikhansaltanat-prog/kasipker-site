'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLang } from '@/lib/LangContext';
import { t, pickByLang } from '@/lib/translations';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

export default function AboutPage() {
  const { lang } = useLang();
  const tr = t[lang];

  const napHistory = [
    { year: '1999', kk: 'НАП РК негізі қаланды. Алматыда 30 кәсіпорын-мүшеден бастады', ru: 'Основан НАП РК. Начал с 30 предприятий-членов в Алматы', en: 'NAP RK founded. Started with 30 member enterprises in Almaty', zh: '哈萨克斯坦独立企业家协会（NAP RK）成立，在阿拉木图以30家会员企业起步', tr: "NAP RK kuruldu. Almatı'da 30 üye işletmeyle başladı" },
    { year: '2000-е', kk: 'Астана, Павлодар, Костанай, Атырау, Батыс Қазақстан филиалдары', ru: 'Филиалы в Астане, Павлодаре, Костанае, Атырау, Западном Казахстане', en: 'Branches in Astana, Pavlodar, Kostanay, Atyrau, West Kazakhstan', zh: '在阿斯塔纳、巴甫洛达尔、科斯塔奈、阿特劳、西哈萨克斯坦设立分支机构', tr: "Astana, Pavlodar, Kostanay, Atırau, Batı Kazakistan'da şubeler açıldı" },
    { year: '2003–10', kk: 'Мүшелер саны 30-дан 1500+ кәсіпорынға дейін өсті', ru: 'Число членов выросло с 30 до 1500+ предприятий', en: 'Members grew from 30 to 1500+ enterprises', zh: '会员企业数量从30家增长到1500多家', tr: "Üye sayısı 30'dan 1500+ işletmeye yükseldi" },
    { year: '2010', kk: 'Германия Трир қаласының қолөнер палатасымен халықаралық кездесу', ru: 'Международная встреча с Торговой палатой г. Трир (Германия)', en: 'International meeting with Trier Chamber of Crafts (Germany)', zh: '与德国特里尔手工业协会举行国际会晤', tr: 'Almanya Trier Esnaf Odası ile uluslararası toplantı' },
    { year: '2013', kk: 'Польша сауда-өнеркәсіп палатасымен ынтымақтастық', ru: 'Сотрудничество с Торгово-промышленной палатой Польши', en: 'Cooperation with Polish Chamber of Commerce', zh: '与波兰工商会开展合作', tr: 'Polonya Ticaret ve Sanayi Odası ile işbirliği' },
    { year: '2014', kk: 'Бизнес-омбудсмен институтын құру туралы ұсыныс — НАП бастамасы', ru: 'Инициатива создания института бизнес-омбудсмена от НАП', en: 'NAP initiative to establish business ombudsman institution', zh: 'NAP倡议设立商业监察专员制度', tr: 'İş ombudsmanlığı kurumunun oluşturulmasına yönelik NAP girişimi' },
    { year: '2015', kk: 'НАП — 15 жылдық мерейтой. Қаржы полициясы жойылды', ru: 'НАП — 15-летний юбилей. Упразднена финансовая полиция', en: 'NAP — 15th anniversary. Financial police abolished', zh: 'NAP成立15周年，财政警察被撤销', tr: 'NAP — 15. yıl dönümü. Mali polis kaldırıldı' },
    { year: '2026', kk: 'Kasipker дәуірі — жаңа деңгей, жаңа мақсат', ru: 'Эра Kasipker — новый уровень, новые цели', en: 'Kasipker era — new level, new goals', zh: 'Kasipker时代——新高度，新目标', tr: 'Kasipker dönemi — yeni seviye, yeni hedefler' },
  ];

  const achievements = pickByLang(
    lang,
    [
      'Қаржы полициясы жойылды — НАП жылдар бойы талап еткен реформа',
      'Бизнес тіркеу рәсімі жеңілдетілді',
      'МСБ-ге арналған жаңа несие бағдарламалары іске қосылды',
      'Ондаған заң актілеріне түзетулер енгізілді',
      'Жүздеген сот ісі жеңілді — заңсыз тексерулер мен айыппұлдарға қарсы',
      'Мыңдаған кәсіпкерге бухгалтерлік, заңдық қолдау',
      'Итальяндық, Германиялық, Польшалық серіктестермен халықаралық байланыс',
      '«Тәуелсіз газета» — кәсіпкерлерге арналған басылым шығарылды',
      '«Бизнес по-қазақшы» кітабы жазылды',
    ],
    [
      'Упразднена финансовая полиция — реформа, которую НАП требовал годами',
      'Упрощена процедура регистрации бизнеса',
      'Запущены новые кредитные программы для МСБ',
      'Внесены поправки в десятки законодательных актов',
      'Выиграны сотни судебных дел против незаконных проверок и штрафов',
      'Тысячам предпринимателей оказана бухгалтерская и юридическая поддержка',
      'Установлены международные связи с Италией, Германией, Польшей',
      'Издана «Независимая газета» для предпринимателей',
      'Написана книга «Бизнес по-казахски»',
    ],
    [
      'Financial police abolished — a reform NAP demanded for years',
      'Business registration process simplified',
      'New credit programs for SMEs launched',
      'Amendments to dozens of legislative acts introduced',
      'Hundreds of court cases won against illegal inspections and fines',
      'Thousands of entrepreneurs received accounting and legal support',
      'International ties established with Italy, Germany, Poland',
      'Independent newspaper for entrepreneurs published',
      '"Business in Kazakh" book written',
    ],
    [
      '财政警察被撤销——这是NAP多年来一直呼吁的改革',
      '简化了企业注册流程',
      '推出了面向中小企业的新信贷计划',
      '对数十项法律法规进行了修订',
      '赢得数百起针对非法检查和罚款的诉讼案件',
      '为数千名企业家提供了会计和法律支持',
      '与意大利、德国、波兰建立了国际联系',
      '为企业家出版了《独立报》',
      '撰写了《哈萨克式经商之道》一书',
    ],
    [
      "Mali polis kaldırıldı — NAP'ın yıllardır talep ettiği reform",
      'İş kaydı prosedürü basitleştirildi',
      "KOBİ'ler için yeni kredi programları başlatıldı",
      'Onlarca yasal düzenlemede değişiklik yapıldı',
      'Yasadışı denetim ve cezalara karşı yüzlerce dava kazanıldı',
      'Binlerce girişimciye muhasebe ve hukuki destek sağlandı',
      'İtalya, Almanya ve Polonya ile uluslararası bağlantılar kuruldu',
      '"Bağımsız Gazete" girişimciler için yayımlandı',
      '"Kazak Usulü İş" adlı kitap yazıldı',
    ]
  );

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <div className="hero-bg py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/30 bg-kasipker-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-6">
              {pickByLang(lang, 'Тарихымыз', 'Наша история', 'Our History', '我们的历史', 'Tarihimiz')}
            </span>
            <h1 className="text-4xl font-black text-white md:text-6xl mb-6">
              {pickByLang(
                lang,
                'НАП-тан Kasipker-ге — Заңды Жалғастық',
                'От НАП к Kasipker — Законная Преемственность',
                'From NAP to Kasipker — Legal Continuity',
                '从NAP到Kasipker——合法传承',
                "NAP'tan Kasipker'e — Yasal Süreklilik"
              )}
            </h1>
            <p className="text-white/75 text-lg leading-relaxed">
              {pickByLang(
                lang,
                '«Бір кәсіпкер — бір жеңіс. Мың кәсіпкер — Қазақстанның өркендеуі.»',
                '«Один предприниматель — одна победа. Тысяча предпринимателей — процветание Казахстана.»',
                '"One entrepreneur — one victory. A thousand entrepreneurs — Kazakhstan\'s prosperity."',
                '"一个企业家——一次胜利。千万企业家——哈萨克斯坦的繁荣。"',
                '"Bir girişimci — bir zafer. Bin girişimci — Kazakistan\'ın refahı."'
              )}
            </p>
          </motion.div>
        </div>
      </div>

      {/* NAP → Kasipker comparison */}
      <section className="py-20 bg-kasipker-navy-50">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-12">
            <h2 className="section-title">{pickByLang(
              lang,
              'НАП идеологиясы — Kasipker ДНҚ-сындағы мұра',
              'Идеология НАП — наследие в ДНК Kasipker',
              'NAP Ideology — Heritage in Kasipker DNA',
              'NAP理念——融入Kasipker基因的传承',
              "NAP İdeolojisi — Kasipker'in DNA'sındaki Miras"
            )}</h2>
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
                { kk: 'Шағын және орта бизнесті қорғау', ru: 'Защита малого и среднего бизнеса', en: 'SME protection', zh: '保护中小企业', tr: 'KOBİ\'lerin korunması' },
                { kk: 'Заңдық және бухгалтерлік сервис', ru: 'Юридический и бухгалтерский сервис', en: 'Legal & accounting service', zh: '法律与会计服务', tr: 'Hukuki ve muhasebe hizmeti' },
                { kk: 'Алматы орталығы, облыс филиалдары', ru: 'Центр в Алматы, филиалы в областях', en: 'Almaty center, regional branches', zh: '阿拉木图总部，各州设有分支机构', tr: 'Almatı merkezi, bölge şubeleri' },
                { kk: 'Газета, кітап, бизнес-клуб', ru: 'Газета, книга, бизнес-клуб', en: 'Newspaper, book, business club', zh: '报纸、书籍、商务俱乐部', tr: 'Gazete, kitap, iş kulübü' },
                { kk: '1500+ мүше (2010-шы жылдар)', ru: 'Более 1500 членов (2010-е годы)', en: '1500+ members (2010s)', zh: '1500+会员（2010年代）', tr: "1500+ üye (2010'lu yıllar)" },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-kasipker-navy-50 last:border-0">
                  <span className="text-kasipker-navy-400 mt-0.5">→</span>
                  <span className="text-sm text-kasipker-navy-700">{pickByLang(lang, row.kk, row.ru, row.en, row.zh, row.tr)}</span>
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
                { kk: 'МСБ + ірі кәсіпкерлерді қамту — барлық деңгей', ru: 'МСБ + крупные предприниматели — все уровни', en: 'SME + large entrepreneurs — all levels', zh: '中小企业+大型企业家——全层级覆盖', tr: 'KOBİ + büyük girişimciler — tüm seviyeler' },
                { kk: 'Заң + IT + ЖИ + маркетинг + экспорт — толық экожүйе', ru: 'Право + IT + ИИ + маркетинг + экспорт — полная экосистема', en: 'Law + IT + AI + marketing + export — full ecosystem', zh: '法律+IT+人工智能+营销+出口——完整生态系统', tr: 'Hukuk + BT + YZ + pazarlama + ihracat — tam ekosistem' },
                { kk: 'Қазақстан + Орталық Азия + халықаралық желі', ru: 'Казахстан + Центральная Азия + международная сеть', en: 'Kazakhstan + Central Asia + international network', zh: '哈萨克斯坦+中亚+国际网络', tr: 'Kazakistan + Orta Asya + uluslararası ağ' },
                { kk: 'Цифрлық академия, App, B2B маркетплейс, ЖИ', ru: 'Цифровая академия, приложение, B2B маркетплейс, ИИ', en: 'Digital academy, App, B2B marketplace, AI', zh: '数字学院、应用程序、B2B交易平台、人工智能', tr: 'Dijital akademi, Uygulama, B2B pazar yeri, YZ' },
                { kk: '50 000+ мүше мақсат — 2030', ru: 'Цель — 50 000+ членов к 2030 году', en: '50,000+ members goal — 2030', zh: '目标：到2030年会员超过50,000人', tr: '2030 hedefi: 50.000+ üye' },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-white/10 last:border-0">
                  <span className="text-kasipker-gold-400 mt-0.5">✦</span>
                  <span className="text-sm text-white/80">{pickByLang(lang, row.kk, row.ru, row.en, row.zh, row.tr)}</span>
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
            <span className="section-eyebrow">{pickByLang(lang, 'Тарих', 'История', 'History', '历史', 'Tarih')}</span>
            <h2 className="section-title">{pickByLang(lang, '25 жылдың жолы', 'Путь длиной 25 лет', '25-Year Journey', '25年历程', '25 Yıllık Yolculuk')}</h2>
            <div className="gold-bar" />
          </motion.div>

          <div className="relative">
            <div className="timeline-line" />
            <div className="flex flex-col gap-12">
              {napHistory.map((item, i) => {
                const isLeft = i % 2 === 0;
                const text = pickByLang(lang, item.kk, item.ru, item.en, item.zh, item.tr);
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
              {pickByLang(
                lang,
                'НАП қол жеткізген нақты нәтижелер',
                'Реальные достижения НАП',
                'Real Achievements of NAP',
                'NAP取得的实际成果',
                "NAP'ın Somut Başarıları"
              )}
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
          <h2 className="section-title mb-4">{pickByLang(
            lang,
            'Kasipkerге қосылыңыз',
            'Присоединяйтесь к Kasipker',
            'Join Kasipker',
            '加入Kasipker',
            "Kasipker'e Katılın"
          )}</h2>
          <p className="text-kasipker-navy-400 mb-8">
            {pickByLang(
              lang,
              '25 жылдық тәжірибені, 1500+ мүшелік желіні пайдаланыңыз',
              'Используйте 25-летний опыт и сеть из 1500+ членов',
              'Leverage 25 years of experience and 1500+ member network',
              '借助25年经验和1500多名会员网络',
              '25 yıllık deneyimden ve 1500+ üyelik ağından yararlanın'
            )}
          </p>
          <Link href="/contact" className="btn-gold inline-flex px-8 py-4 text-base">
            {tr.nav_cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
