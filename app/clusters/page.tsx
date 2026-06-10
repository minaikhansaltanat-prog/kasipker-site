'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Factory, Wheat, HardHat, Stethoscope, Cpu, ShoppingBag,
  Plane, GraduationCap, Banknote, Truck, Zap, Leaf,
} from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/translations';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

const clusterDetails = [
  {
    Icon: Factory, members: '120+',
    kk: 'Өндіріс', ru: 'Производство', en: 'Manufacturing',
    desc_kk: 'Жеңіл, ауыр, тамақ өнеркәсібі. Зауыттар, фабрикалар, өңдеу кәсіпорындары.',
    desc_ru: 'Лёгкая, тяжёлая, пищевая промышленность. Заводы, фабрики, перерабатывающие предприятия.',
    desc_en: 'Light, heavy and food industries. Factories, manufacturing plants and processing enterprises.',
  },
  {
    Icon: Wheat, members: '180+',
    kk: 'Агробизнес', ru: 'Агробизнес', en: 'Agribusiness',
    desc_kk: 'Ауыл шаруашылығы, фермерлік, азық-түлік өндірісі, экспорт.',
    desc_ru: 'Сельское хозяйство, фермерство, производство продуктов питания, экспорт.',
    desc_en: 'Agriculture, farming, food production and export.',
  },
  {
    Icon: HardHat, members: '95+',
    kk: 'Құрылыс', ru: 'Строительство', en: 'Construction',
    desc_kk: 'Жылжымайтын мүлік, инфрақұрылым, жобалау, материалдар.',
    desc_ru: 'Недвижимость, инфраструктура, проектирование, строительные материалы.',
    desc_en: 'Real estate, infrastructure, design and construction materials.',
  },
  {
    Icon: Stethoscope, members: '75+',
    kk: 'Медицина', ru: 'Медицина', en: 'Healthcare',
    desc_kk: 'Фармацевтика, клиникалар, медициналық жабдықтар.',
    desc_ru: 'Фармацевтика, клиники, медицинское оборудование.',
    desc_en: 'Pharmaceuticals, clinics and medical equipment.',
  },
  {
    Icon: Cpu, members: '200+',
    kk: 'IT & Технология', ru: 'IT и Технологии', en: 'IT & Technology',
    desc_kk: 'Бағдарламалық қамтамасыз ету, цифрлық шешімдер, стартаптар.',
    desc_ru: 'Программное обеспечение, цифровые решения, стартапы.',
    desc_en: 'Software, digital solutions and startups.',
  },
  {
    Icon: ShoppingBag, members: '160+',
    kk: 'Сауда', ru: 'Торговля', en: 'Trade & Retail',
    desc_kk: 'Бөлшек және көтерме сауда, e-commerce, дистрибуция.',
    desc_ru: 'Розничная и оптовая торговля, e-commerce, дистрибуция.',
    desc_en: 'Retail, wholesale, e-commerce and distribution.',
  },
  {
    Icon: Plane, members: '55+',
    kk: 'Туризм', ru: 'Туризм', en: 'Tourism',
    desc_kk: 'Туристік операторлар, қонақ үйлер, экотуризм, MICE.',
    desc_ru: 'Туроператоры, гостиницы, экотуризм, MICE.',
    desc_en: 'Tour operators, hotels, eco-tourism and MICE.',
  },
  {
    Icon: GraduationCap, members: '65+',
    kk: 'Білім', ru: 'Образование', en: 'Education',
    desc_kk: 'Мектептер, оқу орталықтары, EdTech, кәсіби оқыту.',
    desc_ru: 'Школы, учебные центры, EdTech, профессиональное обучение.',
    desc_en: 'Schools, training centres, EdTech and professional development.',
  },
  {
    Icon: Banknote, members: '85+',
    kk: 'Қаржы', ru: 'Финансы', en: 'Finance',
    desc_kk: 'Инвестиция, лизинг, сақтандыру, қаржылық консалтинг.',
    desc_ru: 'Инвестиции, лизинг, страхование, финансовый консалтинг.',
    desc_en: 'Investment, leasing, insurance and financial consulting.',
  },
  {
    Icon: Truck, members: '110+',
    kk: 'Логистика', ru: 'Логистика', en: 'Logistics',
    desc_kk: 'Жүк тасымалы, складтар, кеден, экспедиция.',
    desc_ru: 'Грузоперевозки, склады, таможня, экспедиция.',
    desc_en: 'Freight, warehousing, customs and forwarding.',
  },
  {
    Icon: Zap, members: '45+',
    kk: 'Энергетика', ru: 'Энергетика', en: 'Energy',
    desc_kk: 'Жаңартылатын энергия, мұнай-газ, энергиялық аудит.',
    desc_ru: 'Возобновляемая энергия, нефтегаз, энергоаудит.',
    desc_en: 'Renewable energy, oil & gas and energy auditing.',
  },
  {
    Icon: Leaf, members: '35+',
    kk: 'Экология', ru: 'Экология', en: 'Ecology',
    desc_kk: 'Экологиялық шешімдер, қалдықтарды өңдеу, «жасыл» бизнес.',
    desc_ru: 'Экологические решения, переработка отходов, «зелёный» бизнес.',
    desc_en: 'Eco solutions, waste processing and green business.',
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
            const name = lang === 'en' ? cl.en : lang === 'ru' ? cl.ru : cl.kk;
            const desc = lang === 'en' ? cl.desc_en : lang === 'ru' ? cl.desc_ru : cl.desc_kk;
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
                    <span className="text-xs font-semibold text-kasipker-gold-500">{cl.members} {lang === 'ru' ? 'участников' : lang === 'en' ? 'members' : 'мүше'}</span>
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
