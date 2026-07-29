'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t, countries, pickByLang } from '@/lib/translations';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

interface CountryEntry {
  idx: number;
  highlight?: boolean;
  directions_kk: string[];
  directions_ru: string[];
  directions_en: string[];
  directions_zh: string[];
  directions_tr: string[];
}

const countryExtras: CountryEntry[] = [
  {
    idx: 0, highlight: true,
    directions_kk: ['Экспорт жеткізу', 'Alibaba/CCPIT серіктестік', 'Jimon Group', 'Инвестиция тарту', 'Сауда делегациялары'],
    directions_ru: ['Экспортная поставка', 'Партнёрство Alibaba/CCPIT', 'Jimon Group', 'Привлечение инвестиций', 'Торговые делегации'],
    directions_en: ['Export delivery', 'Alibaba/CCPIT partnership', 'Jimon Group', 'Investment attraction', 'Trade delegations'],
    directions_zh: ['出口交付', 'Alibaba/CCPIT合作', 'Jimon Group', '吸引投资', '贸易代表团'],
    directions_tr: ['İhracat teslimatı', 'Alibaba/CCPIT ortaklığı', 'Jimon Group', 'Yatırım çekme', 'Ticaret heyetleri'],
  },
  {
    idx: 1,
    directions_kk: ['Текстиль экспорт', 'Тамақ өнеркәсібі', 'Туризм', 'Кәсіпкерлер альянсы'],
    directions_ru: ['Экспорт текстиля', 'Пищевая промышленность', 'Туризм', 'Альянс предпринимателей'],
    directions_en: ['Textile export', 'Food industry', 'Tourism', 'Entrepreneurs alliance'],
    directions_zh: ['纺织品出口', '食品工业', '旅游业', '企业家联盟'],
    directions_tr: ['Tekstil ihracatı', 'Gıda sanayi', 'Turizm', 'Girişimciler ittifakı'],
  },
  {
    idx: 2,
    directions_kk: ['Экспорт логистика', 'Мал шаруашылығы', 'B2B байланыс'],
    directions_ru: ['Экспортная логистика', 'Животноводство', 'B2B связи'],
    directions_en: ['Export logistics', 'Animal husbandry', 'B2B connections'],
    directions_zh: ['出口物流', '畜牧业', 'B2B联系'],
    directions_tr: ['İhracat lojistiği', 'Hayvancılık', 'B2B bağlantıları'],
  },
  {
    idx: 3,
    directions_kk: ['Жеңіл өнеркәсіп', 'Тігін экспорт', 'Өнімдер'],
    directions_ru: ['Лёгкая промышленность', 'Швейный экспорт', 'Продукция'],
    directions_en: ['Light industry', 'Garment export', 'Products'],
    directions_zh: ['轻工业', '服装出口', '产品'],
    directions_tr: ['Hafif sanayi', 'Konfeksiyon ihracatı', 'Ürünler'],
  },
  {
    idx: 4,
    directions_kk: ['Диаспора байланысы', 'B2B форумдар', 'Экспорт'],
    directions_ru: ['Связи с диаспорой', 'B2B форумы', 'Экспорт'],
    directions_en: ['Diaspora connections', 'B2B forums', 'Export'],
    directions_zh: ['侨民联系', 'B2B论坛', '出口'],
    directions_tr: ['Diaspora bağlantıları', 'B2B forumları', 'İhracat'],
  },
  {
    idx: 5, highlight: true,
    directions_kk: ['Инвестиция хабы', 'Халықаралық шығу', 'Қаржы & ритейл'],
    directions_ru: ['Инвестиционный хаб', 'Международный выход', 'Финансы и ритейл'],
    directions_en: ['Investment hub', 'International expansion', 'Finance & retail'],
    directions_zh: ['投资中心', '国际扩张', '金融与零售'],
    directions_tr: ['Yatırım merkezi', 'Uluslararası genişleme', 'Finans ve perakende'],
  },
  {
    idx: 6,
    directions_kk: ['Технологиялар', 'Венчур инвестиция', 'Диаспора', 'Халықаралық стандарттар'],
    directions_ru: ['Технологии', 'Венчурные инвестиции', 'Диаспора', 'Международные стандарты'],
    directions_en: ['Technologies', 'Venture investment', 'Diaspora', 'International standards'],
    directions_zh: ['技术', '风险投资', '侨民', '国际标准'],
    directions_tr: ['Teknolojiler', 'Girişim sermayesi yatırımı', 'Diaspora', 'Uluslararası standartlar'],
  },
];

export default function InternationalPage() {
  const { lang } = useLang();
  const tr = t[lang];

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="hero-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/30 bg-kasipker-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-4">
              {tr.international_eyebrow}
            </span>
            <h1 className="text-4xl font-black text-white md:text-5xl mb-4">{tr.international_title}</h1>
            <p className="text-white/70">{tr.international_sub}</p>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-kasipker-navy-50 border-b border-kasipker-navy-100">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            {[
              { value: '7', label: pickByLang(lang, 'Серіктес ел', 'Стран-партнёров', 'Partner countries', '合作国家', 'Ortak ülke') },
              { value: '3', label: pickByLang(lang, 'Халықаралық ұйым', 'Международных организации', 'International orgs', '国际组织', 'Uluslararası kurum') },
              { value: '5', label: pickByLang(lang, 'Аймақ', 'Регионов', 'Regions', '地区', 'Bölge') },
              { value: '2026', label: pickByLang(lang, 'Белсенді серіктестік', 'Активное партнёрство', 'Active partnerships', '积极合作伙伴关系', 'Aktif ortaklık') },
            ].map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1} variants={fadeUp}>
                <p className="stat-number">{s.value}</p>
                <p className="text-sm text-kasipker-navy-400 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* World map placeholder */}
      <div className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="rounded-3xl bg-kasipker-navy-900 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23D4A017'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
            }} />
            <p className="text-kasipker-gold-400 text-xs font-bold uppercase tracking-widest mb-3">
              {pickByLang(lang, 'Интерактивті Дүние Картасы', 'Интерактивная карта мира', 'Interactive World Map', '互动世界地图', 'Etkileşimli Dünya Haritası')}
            </p>
            <div className="flex justify-center mb-4">
              <Globe className="h-10 w-10 text-kasipker-gold-400" />
            </div>
            <p className="text-white/60 text-sm">
              {pickByLang(
                lang,
                'Серіктес елдер белгіленген — жуық арада іске қосылады',
                'Карта со странами-партнёрами — скоро будет запущена',
                'Map with partner countries — coming soon',
                '合作国家地图——即将上线',
                'Ortak ülkeler haritası — yakında yayında'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Countries grid */}
      <div className="py-16 bg-kasipker-navy-50">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {countryExtras.map((extra, i) => {
              const country = countries[extra.idx];
              const name = pickByLang(lang, country.kk, country.ru, country.en, country.zh, country.tr);
              const tag = pickByLang(lang, country.tag_kk, country.tag_ru, country.tag_en, country.tag_zh, country.tag_tr);
              const dirs = pickByLang(lang, extra.directions_kk, extra.directions_ru, extra.directions_en, extra.directions_zh, extra.directions_tr);
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.08}
                  variants={fadeUp}
                  className={`country-card ${extra.highlight ? 'ring-2 ring-kasipker-gold-400' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl leading-none" aria-hidden="true">{country.flag}</span>
                    <div>
                      <h3 className="font-extrabold text-kasipker-navy-900 text-lg">{name}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span
                          className="text-xs rounded-full px-2.5 py-0.5 font-bold"
                          style={{ background: country.color + '22', color: country.color }}
                        >
                          {tag}
                        </span>
                        {extra.highlight && (
                          <span className="text-xs rounded-full px-2 py-0.5 bg-kasipker-gold-400 text-kasipker-gold-900 font-bold">
                            {pickByLang(lang, 'Басымдық', 'Приоритет', 'Priority', '优先', 'Öncelik')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {dirs.map((dir, j) => (
                      <span key={j} className="rounded-lg bg-kasipker-navy-50 px-2.5 py-1 text-xs font-medium text-kasipker-navy-600">
                        {dir}
                      </span>
                    ))}
                  </div>

                  <Link href="/contact" className="btn-primary text-sm py-2.5 w-full cursor-pointer">
                    {tr.partner_cta}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
