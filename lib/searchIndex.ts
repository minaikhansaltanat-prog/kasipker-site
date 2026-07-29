import { Lang, pickByLang, personalities, clusters, countries, partners } from './translations';
import { NEWS } from './news';

export type SearchResultType = 'personality' | 'cluster' | 'country' | 'partner' | 'news' | 'page';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  href: string;
}

const STATIC_PAGES = (lang: Lang) => [
  { id: 'page-about', title: pickByLang(lang, 'Альянс туралы', 'Об Альянсе', 'About the Alliance', '关于联盟', 'Hakkımızda'), href: '/about' },
  { id: 'page-personalities', title: pickByLang(lang, 'Тұлғалар', 'Персоналии', 'Personalities', '人物', 'Kişiler'), href: '/personalities' },
  { id: 'page-clusters', title: pickByLang(lang, 'Кластерлер', 'Кластеры', 'Clusters', '产业集群', 'Kümeler'), href: '/clusters' },
  { id: 'page-international', title: pickByLang(lang, 'Халықаралық серіктестік', 'Международное сотрудничество', 'International Cooperation', '国际合作', 'Uluslararası İşbirliği'), href: '/international' },
  { id: 'page-events', title: pickByLang(lang, 'Шаралар', 'Мероприятия', 'Events', '活动', 'Etkinlikler'), href: '/events' },
  { id: 'page-gallery', title: pickByLang(lang, 'Галерея', 'Галерея', 'Gallery', '画廊', 'Galeri'), href: '/gallery' },
  { id: 'page-partners', title: pickByLang(lang, 'Серіктестер', 'Партнёры', 'Partners', '合作伙伴', 'Ortaklar'), href: '/partners' },
  { id: 'page-media', title: pickByLang(lang, 'Медиа', 'Медиа', 'Media', '媒体', 'Medya'), href: '/media' },
  { id: 'page-contact', title: pickByLang(lang, 'Байланыс', 'Контакты', 'Contact', '联系我们', 'İletişim'), href: '/contact' },
];

export function searchSite(query: string, lang: Lang, limit = 20): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const results: SearchResult[] = [];
  const matches = (s: string | undefined) => !!s && s.toLowerCase().includes(q);

  personalities.forEach(p => {
    const info = pickByLang(lang, p.kk, p.ru, p.en, p.zh, p.tr);
    if (matches(info.name) || matches(info.position) || matches(info.company)) {
      results.push({ id: `person-${p.id}`, type: 'personality', title: info.name, subtitle: info.position, href: '/personalities' });
    }
  });

  clusters.forEach((c, i) => {
    const name = pickByLang(lang, c.kk, c.ru, c.en, c.zh, c.tr);
    if (matches(name)) {
      results.push({ id: `cluster-${i}`, type: 'cluster', title: name, href: '/clusters' });
    }
  });

  countries.forEach((c, i) => {
    const name = pickByLang(lang, c.kk, c.ru, c.en, c.zh, c.tr);
    const direction = pickByLang(lang, c.direction_kk, c.direction_ru, c.direction_en, c.direction_zh, c.direction_tr);
    if (matches(name) || matches(direction)) {
      results.push({ id: `country-${i}`, type: 'country', title: name, subtitle: direction, href: '/international' });
    }
  });

  partners.forEach((p, i) => {
    if (matches(p.name)) {
      results.push({
        id: `partner-${i}`,
        type: 'partner',
        title: p.name,
        subtitle: pickByLang(lang, p.type_kk, p.type_ru, p.type_en, p.type_zh, p.type_tr),
        href: '/partners',
      });
    }
  });

  NEWS.forEach(n => {
    if (matches(n.title[lang]) || matches(n.excerpt[lang])) {
      results.push({ id: `news-${n.slug}`, type: 'news', title: n.title[lang], subtitle: n.excerpt[lang], href: `/media/news/${n.slug}` });
    }
  });

  STATIC_PAGES(lang).forEach(pg => {
    if (matches(pg.title)) {
      results.push({ id: pg.id, type: 'page', title: pg.title, href: pg.href });
    }
  });

  return results.slice(0, limit);
}
