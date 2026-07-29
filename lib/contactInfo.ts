export const CONTACT_EMAIL = 'kasipker.aliyansy@gmail.com';
export const CONTACT_PHONE_DIGITS = '77086279544';
export const CONTACT_PHONE_DISPLAY = '+7 708 627 9544';

export const GIS_2GIS_URL = 'https://2gis.kz/almaty/geo/70000001061124792/76.847906,43.211359';

export const OFFICE_ADDRESS = {
  kk: 'Алматы қ., Мамыр-1 ықшамауданы, 26, Quorum БО, 6-қабат, 609-кеңсе',
  ru: 'г. Алматы, мкр. Мамыр-1, 26, БЦ Quorum, 6 этаж, офис 609',
  en: 'Almaty, Mamyr-1 microdistrict, 26, Quorum BC, 6th floor, office 609',
  zh: '阿拉木图市，马梅尔一区（Мамыр-1）26号，Quorum商务中心，6层609室',
  tr: 'Almatı, Mamır-1 mikrorayonu, 26, Quorum İş Merkezi, 6. kat, ofis 609',
} as const;

export function officeAddress(lang: string): string {
  const key = (lang === 'kk' || lang === 'ru' || lang === 'en' || lang === 'zh' || lang === 'tr') ? lang : 'kk';
  return OFFICE_ADDRESS[key];
}
