export const CONTACT_EMAIL = 'kasipker.aliyansy@gmail.com';
export const CONTACT_PHONE_DIGITS = '77086279544';
export const CONTACT_PHONE_DISPLAY = '+7 708 627 9544';

export const GIS_2GIS_URL = 'https://2gis.kz/almaty/geo/70000001061124792/76.847906,43.211359';

export const OFFICE_ADDRESS = {
  kk: 'Алматы қ., Мамыр-1 ықшамауданы, 26, Quorum БО, 6-қабат, 609-кеңсе',
  ru: 'г. Алматы, мкр. Мамыр-1, 26, БЦ Quorum, 6 этаж, офис 609',
  en: 'Almaty, Mamyr-1 microdistrict, 26, Quorum BC, 6th floor, office 609',
} as const;

export function officeAddress(lang: string): string {
  return OFFICE_ADDRESS[lang === 'kk' ? 'kk' : lang === 'ru' ? 'ru' : 'en'];
}
