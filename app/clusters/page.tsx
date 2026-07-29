'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Factory, Wheat, HardHat, Stethoscope, Cpu, ShoppingBag,
  Plane, GraduationCap, Banknote, Truck, Zap, Leaf,
} from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t, pickByLang } from '@/lib/translations';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

const clusterDetails = [
  {
    Icon: Factory, members: '120+',
    kk: 'Өндіріс', ru: 'Производство', en: 'Manufacturing', zh: '制造业', tr: 'Üretim',
    desc_kk: 'Жеңіл, ауыр, тамақ өнеркәсібі. Зауыттар, фабрикалар, өңдеу кәсіпорындары.',
    desc_ru: 'Лёгкая, тяжёлая, пищевая промышленность. Заводы, фабрики, перерабатывающие предприятия.',
    desc_en: 'Light, heavy and food industries. Factories, manufacturing plants and processing enterprises.',
    desc_zh: '轻工业、重工业与食品工业。工厂、生产企业与加工企业。',
    desc_tr: 'Hafif, ağır ve gıda sanayii. Fabrikalar, üretim tesisleri ve işleme kuruluşları.',
  },
  {
    Icon: Wheat, members: '180+',
    kk: 'Агробизнес', ru: 'Агробизнес', en: 'Agribusiness', zh: '农业综合企业', tr: 'Tarım İşletmeciliği',
    desc_kk: 'Ауыл шаруашылығы, фермерлік, азық-түлік өндірісі, экспорт.',
    desc_ru: 'Сельское хозяйство, фермерство, производство продуктов питания, экспорт.',
    desc_en: 'Agriculture, farming, food production and export.',
    desc_zh: '农业、农场经营、食品生产与出口。',
    desc_tr: 'Tarım, çiftçilik, gıda üretimi ve ihracat.',
  },
  {
    Icon: HardHat, members: '95+',
    kk: 'Құрылыс', ru: 'Строительство', en: 'Construction', zh: '建筑业', tr: 'İnşaat',
    desc_kk: 'Жылжымайтын мүлік, инфрақұрылым, жобалау, материалдар.',
    desc_ru: 'Недвижимость, инфраструктура, проектирование, строительные материалы.',
    desc_en: 'Real estate, infrastructure, design and construction materials.',
    desc_zh: '房地产、基础设施建设、设计与建筑材料。',
    desc_tr: 'Gayrimenkul, altyapı, tasarım ve inşaat malzemeleri.',
  },
  {
    Icon: Stethoscope, members: '75+',
    kk: 'Медицина', ru: 'Медицина', en: 'Healthcare', zh: '医疗保健', tr: 'Sağlık',
    desc_kk: 'Фармацевтика, клиникалар, медициналық жабдықтар.',
    desc_ru: 'Фармацевтика, клиники, медицинское оборудование.',
    desc_en: 'Pharmaceuticals, clinics and medical equipment.',
    desc_zh: '制药、诊所与医疗设备。',
    desc_tr: 'İlaç sanayii, klinikler ve tıbbi cihazlar.',
  },
  {
    Icon: Cpu, members: '200+',
    kk: 'IT & Технология', ru: 'IT и Технологии', en: 'IT & Technology', zh: '信息技术', tr: 'BT ve Teknoloji',
    desc_kk: 'Бағдарламалық қамтамасыз ету, цифрлық шешімдер, стартаптар.',
    desc_ru: 'Программное обеспечение, цифровые решения, стартапы.',
    desc_en: 'Software, digital solutions and startups.',
    desc_zh: '软件开发、数字化解决方案与创业公司。',
    desc_tr: 'Yazılım, dijital çözümler ve girişimler.',
  },
  {
    Icon: ShoppingBag, members: '160+',
    kk: 'Сауда', ru: 'Торговля', en: 'Trade & Retail', zh: '贸易与零售', tr: 'Ticaret ve Perakende',
    desc_kk: 'Бөлшек және көтерме сауда, e-commerce, дистрибуция.',
    desc_ru: 'Розничная и оптовая торговля, e-commerce, дистрибуция.',
    desc_en: 'Retail, wholesale, e-commerce and distribution.',
    desc_zh: '零售与批发贸易、电子商务与分销。',
    desc_tr: 'Perakende ve toptan ticaret, e-ticaret ve dağıtım.',
  },
  {
    Icon: Plane, members: '55+',
    kk: 'Туризм', ru: 'Туризм', en: 'Tourism', zh: '旅游业', tr: 'Turizm',
    desc_kk: 'Туристік операторлар, қонақ үйлер, экотуризм, MICE.',
    desc_ru: 'Туроператоры, гостиницы, экотуризм, MICE.',
    desc_en: 'Tour operators, hotels, eco-tourism and MICE.',
    desc_zh: '旅行社、酒店、生态旅游与商务会展（MICE）。',
    desc_tr: 'Tur operatörleri, oteller, ekoturizm ve MICE.',
  },
  {
    Icon: GraduationCap, members: '65+',
    kk: 'Білім', ru: 'Образование', en: 'Education', zh: '教育', tr: 'Eğitim',
    desc_kk: 'Мектептер, оқу орталықтары, EdTech, кәсіби оқыту.',
    desc_ru: 'Школы, учебные центры, EdTech, профессиональное обучение.',
    desc_en: 'Schools, training centres, EdTech and professional development.',
    desc_zh: '学校、培训中心、教育科技与职业培训。',
    desc_tr: 'Okullar, eğitim merkezleri, EdTech ve mesleki gelişim.',
  },
  {
    Icon: Banknote, members: '85+',
    kk: 'Қаржы', ru: 'Финансы', en: 'Finance', zh: '金融', tr: 'Finans',
    desc_kk: 'Инвестиция, лизинг, сақтандыру, қаржылық консалтинг.',
    desc_ru: 'Инвестиции, лизинг, страхование, финансовый консалтинг.',
    desc_en: 'Investment, leasing, insurance and financial consulting.',
    desc_zh: '投资、融资租赁、保险与财务咨询。',
    desc_tr: 'Yatırım, leasing, sigorta ve finansal danışmanlık.',
  },
  {
    Icon: Truck, members: '110+',
    kk: 'Логистика', ru: 'Логистика', en: 'Logistics', zh: '物流', tr: 'Lojistik',
    desc_kk: 'Жүк тасымалы, складтар, кеден, экспедиция.',
    desc_ru: 'Грузоперевозки, склады, таможня, экспедиция.',
    desc_en: 'Freight, warehousing, customs and forwarding.',
    desc_zh: '货运、仓储、海关与货运代理。',
    desc_tr: 'Nakliye, depolama, gümrük ve nakliye acenteliği.',
  },
  {
    Icon: Zap, members: '45+',
    kk: 'Энергетика', ru: 'Энергетика', en: 'Energy', zh: '能源', tr: 'Enerji',
    desc_kk: 'Жаңартылатын энергия, мұнай-газ, энергиялық аудит.',
    desc_ru: 'Возобновляемая энергия, нефтегаз, энергоаудит.',
    desc_en: 'Renewable energy, oil & gas and energy auditing.',
    desc_zh: '可再生能源、石油天然气与能源审计。',
    desc_tr: 'Yenilenebilir enerji, petrol ve gaz, enerji denetimi.',
  },
  {
    Icon: Leaf, members: '35+',
    kk: 'Экология', ru: 'Экология', en: 'Ecology', zh: '生态', tr: 'Ekoloji',
    desc_kk: 'Экологиялық шешімдер, қалдықтарды өңдеу, «жасыл» бизнес.',
    desc_ru: 'Экологические решения, переработка отходов, «зелёный» бизнес.',
    desc_en: 'Eco solutions, waste processing and green business.',
    desc_zh: '生态解决方案、废物处理与绿色产业。',
    desc_tr: 'Ekolojik çözümler, atık geri dönüşümü ve yeşil iş dünyası.',
  },
];

export default function ClustersPage() {
  const { lang } = useLang();
  const tr = t[lang];

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="hero-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/30 bg-kasipker-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-4">
              {tr.clusters_eyebrow}
            </span>
            <h1 className="text-4xl font-black text-white md:text-5xl mb-4">{tr.clusters_title}</h1>
            <p className="text-white/70 max-w-xl mx-auto">{tr.clusters_sub}</p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clusterDetails.map((cl, i) => {
            const name = pickByLang(lang, cl.kk, cl.ru, cl.en, cl.zh, cl.tr);
            const desc = pickByLang(lang, cl.desc_kk, cl.desc_ru, cl.desc_en, cl.desc_zh, cl.desc_tr);
            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.06}
                variants={fadeUp}
                className="card-kasipker group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-kasipker-navy-50 group-hover:bg-kasipker-navy-700 transition-colors duration-200">
                    <cl.Icon className="h-7 w-7 text-kasipker-navy-700 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-kasipker-navy-900 text-lg">{name}</h3>
                    <span className="text-xs font-semibold text-kasipker-gold-500">{cl.members} {pickByLang(lang, 'мүше', 'участников', 'members', '位会员', 'üye')}</span>
                  </div>
                </div>
                <p className="text-sm text-kasipker-navy-600 leading-relaxed mb-5">{desc}</p>
                <Link href="/contact" className="btn-primary text-sm py-2.5 w-full cursor-pointer">
                  {tr.join_cluster}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
