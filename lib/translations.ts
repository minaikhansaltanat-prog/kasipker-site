export type Lang = 'kk' | 'ru' | 'en' | 'zh' | 'tr';

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'kk', label: 'ҚАЗ', flag: '🇰🇿' },
  { code: 'ru', label: 'РУС', flag: '🇷🇺' },
  { code: 'en', label: 'ENG', flag: '🇬🇧' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'tr', label: 'TÜR', flag: '🇹🇷' },
];

export const t: Record<Lang, Record<string, string>> = {
  kk: {
    nav_home: 'Басты бет',
    nav_about: 'Альянс туралы',
    nav_personalities: 'Тұлғалар',
    nav_clusters: 'Кластерлер',
    nav_international: 'Халықаралық',
    nav_gallery: 'Галерея',
    nav_partners: 'Серіктестер',
    nav_contact: 'Байланыс',
    nav_cta: 'Мүше болу',

    hero_eyebrow: 'Кәсіпкерлер Альянсы',
    hero_h1: 'Kasipker —',
    hero_h1_accent: 'Кәсіпкерлер Альянсы',
    hero_sub: '«Бірге — күштіміз. Бірге — өрлейміз.» Қазақстан кәсіпкерлерінің бірлескен платформасы — мүшелік, желі, халықаралық серіктестік.',
    hero_cta1: 'Мүше болғым келеді',
    hero_cta2: 'Альянс туралы',

    stats_members: 'Мүше',
    stats_clusters: 'Сала кластері',
    stats_countries: 'Ел',
    stats_years: 'Жыл тәжірибе',

    about_eyebrow: 'Альянс туралы',
    about_title: 'Kasipker — Кәсіпкерлер Альянсы',
    about_text1: '1999 жылы НАП (Тәуелсіз Кәсіпкерлер Қауымдастығы) ретінде негізі қаланып, 15+ жылдық тәжірибемен, бүгін Kasipker атымен жаңа деңгейге шықты.',
    about_text2: 'Біз кәсіпкерлерге заңдық, IT, маркетинг, экспорт бағыттарында қолдау көрсетеміз. Мақсатымыз — 2030 жылға дейін 50 000+ мүшелік.',
    about_mission: 'Миссия',
    about_mission_text: 'Қазақстан кәсіпкерлерін бір платформада біріктіру, олардың мүдделерін қорғау және халықаралық нарыққа шығуына жол ашу.',
    about_vision: 'Визия',
    about_vision_text: 'Орталық Азиядағы ең ықпалды кәсіпкерлер альянсы болу — 2030 жылға дейін.',

    clusters_eyebrow: 'Салалық Кластерлер',
    clusters_title: '12 Сала Бойынша Бірлестік',
    clusters_sub: 'Kasipker мүшелері бизнес саласы бойынша тиісті кластерге кіреді',

    personalities_eyebrow: 'Тұлғалар',
    personalities_title: 'Альянстың Бетін Ашатын Тұлғалар',
    personalities_sub: 'Kasipker мүшелері, серіктестері және лидерлері',

    international_eyebrow: 'Халықаралық',
    international_title: 'Жаһандық Серіктестіктер',
    international_sub: '7 елде серіктестік байланыс',

    gallery_eyebrow: 'Галерея',
    gallery_title: 'Іс-шаралар мен Сәттер',

    partners_eyebrow: 'Серіктестер',
    partners_title: 'Ресми Серіктестер мен Меморандум',

    contact_eyebrow: 'Байланыс',
    contact_title: 'Бізбен Байланысыңыз',
    contact_form_name: 'Аты-жөніңіз',
    contact_form_phone: 'Телефон нөміріңіз',
    contact_form_email: 'Email',
    contact_form_city: 'Қала / Облыс',
    contact_form_sector: 'Бизнес саласы',
    contact_form_message: 'Хабарлама (опционал)',
    contact_form_submit: 'Жіберу',
    contact_form_success: 'Рахмет! Менеджеріміз 24 сағат ішінде байланысады.',

    footer_slogan: '«Бірге — күштіміз. Бірге — өрлейміз.»',
    footer_rights: 'Барлық құқықтар қорғалған',

    member_cta: 'Мүше болу',
    read_more: 'Толығырақ',
    partner_cta: 'Серіктес болу',
    join_cluster: 'Кластерге қосылу',
  },

  ru: {
    nav_home: 'Главная',
    nav_about: 'Об Альянсе',
    nav_personalities: 'Персоналии',
    nav_clusters: 'Кластеры',
    nav_international: 'Международные',
    nav_gallery: 'Галерея',
    nav_partners: 'Партнёры',
    nav_contact: 'Контакты',
    nav_cta: 'Стать членом',

    hero_eyebrow: 'Союз Предпринимателей',
    hero_h1: 'Kasipker —',
    hero_h1_accent: 'Союз Предпринимателей',
    hero_sub: '«Вместе — мы сила. Вместе — мы развиваемся.» Объединённая платформа предпринимателей Казахстана — членство, нетворкинг, международное партнёрство.',
    hero_cta1: 'Хочу стать членом',
    hero_cta2: 'Об Альянсе',

    stats_members: 'Членов',
    stats_clusters: 'Кластера',
    stats_countries: 'Стран',
    stats_years: 'Лет опыта',

    about_eyebrow: 'Об Альянсе',
    about_title: 'Kasipker — Союз Предпринимателей',
    about_text1: 'Основанный в 1999 году как НАП (Независимая Ассоциация Предпринимателей), с 15+ летним опытом сегодня работает под именем Kasipker на новом уровне.',
    about_text2: 'Мы поддерживаем предпринимателей в правовой, IT, маркетинговой и экспортной сферах. Цель — 50 000+ членов к 2030 году.',
    about_mission: 'Миссия',
    about_mission_text: 'Объединить предпринимателей Казахстана на одной платформе, защитить их интересы и открыть путь на международный рынок.',
    about_vision: 'Видение',
    about_vision_text: 'Стать самым влиятельным союзом предпринимателей в Центральной Азии к 2030 году.',

    clusters_eyebrow: 'Отраслевые кластеры',
    clusters_title: 'Объединение по 12 отраслям',
    clusters_sub: 'Члены Kasipker входят в кластеры по отрасли бизнеса',

    personalities_eyebrow: 'Персоналии',
    personalities_title: 'Лица Альянса',
    personalities_sub: 'Члены, партнёры и лидеры Kasipker',

    international_eyebrow: 'Международные',
    international_title: 'Глобальное партнёрство',
    international_sub: 'Партнёрские связи в 7 странах',

    gallery_eyebrow: 'Галерея',
    gallery_title: 'Мероприятия и Моменты',

    partners_eyebrow: 'Партнёры',
    partners_title: 'Официальные партнёры и меморандумы',

    contact_eyebrow: 'Контакты',
    contact_title: 'Свяжитесь с нами',
    contact_form_name: 'Ваше имя',
    contact_form_phone: 'Номер телефона',
    contact_form_email: 'Email',
    contact_form_city: 'Город / Область',
    contact_form_sector: 'Сфера бизнеса',
    contact_form_message: 'Сообщение (опционально)',
    contact_form_submit: 'Отправить',
    contact_form_success: 'Спасибо! Наш менеджер свяжется с вами в течение 24 часов.',

    footer_slogan: '«Вместе — мы сила. Вместе — мы развиваемся.»',
    footer_rights: 'Все права защищены',

    member_cta: 'Стать членом',
    read_more: 'Подробнее',
    partner_cta: 'Стать партнёром',
    join_cluster: 'Присоединиться к кластеру',
  },

  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_personalities: 'Personalities',
    nav_clusters: 'Clusters',
    nav_international: 'International',
    nav_gallery: 'Gallery',
    nav_partners: 'Partners',
    nav_contact: 'Contact',
    nav_cta: 'Become a Member',

    hero_eyebrow: 'Entrepreneurs Alliance',
    hero_h1: 'Kasipker —',
    hero_h1_accent: 'Entrepreneurs Alliance',
    hero_sub: '"Together we are stronger. Together we grow." The united platform for Kazakhstan\'s entrepreneurs — membership, networking, international partnerships.',
    hero_cta1: 'I want to join',
    hero_cta2: 'About Alliance',

    stats_members: 'Members',
    stats_clusters: 'Clusters',
    stats_countries: 'Countries',
    stats_years: 'Years of Experience',

    about_eyebrow: 'About',
    about_title: 'Kasipker — Entrepreneurs Alliance',
    about_text1: 'Founded in 1999 as NAP (Independent Association of Entrepreneurs), with 15+ years of experience, now operating as Kasipker at a new level.',
    about_text2: 'We support entrepreneurs in legal, IT, marketing, and export directions. Our goal is 50,000+ members by 2030.',
    about_mission: 'Mission',
    about_mission_text: 'To unite Kazakhstan entrepreneurs on one platform, protect their interests, and open the path to international markets.',
    about_vision: 'Vision',
    about_vision_text: 'To become the most influential entrepreneurs alliance in Central Asia by 2030.',

    clusters_eyebrow: 'Industry Clusters',
    clusters_title: 'United Across 12 Industries',
    clusters_sub: 'Kasipker members join clusters based on their business sector',

    personalities_eyebrow: 'Personalities',
    personalities_title: 'Faces of the Alliance',
    personalities_sub: 'Kasipker members, partners and leaders',

    international_eyebrow: 'International',
    international_title: 'Global Partnerships',
    international_sub: 'Partnership connections in 7 countries',

    gallery_eyebrow: 'Gallery',
    gallery_title: 'Events and Moments',

    partners_eyebrow: 'Partners',
    partners_title: 'Official Partners & Memoranda',

    contact_eyebrow: 'Contact',
    contact_title: 'Get in Touch',
    contact_form_name: 'Your Name',
    contact_form_phone: 'Phone Number',
    contact_form_email: 'Email',
    contact_form_city: 'City / Region',
    contact_form_sector: 'Business Sector',
    contact_form_message: 'Message (optional)',
    contact_form_submit: 'Send',
    contact_form_success: 'Thank you! Our manager will contact you within 24 hours.',

    footer_slogan: '"Together we are stronger. Together we grow."',
    footer_rights: 'All rights reserved',

    member_cta: 'Join',
    read_more: 'Learn More',
    partner_cta: 'Become a Partner',
    join_cluster: 'Join Cluster',
  },

  zh: {
    nav_home: '首页',
    nav_about: '关于联盟',
    nav_personalities: '人物',
    nav_clusters: '产业集群',
    nav_international: '国际合作',
    nav_gallery: '画廊',
    nav_partners: '合作伙伴',
    nav_contact: '联系我们',
    nav_cta: '成为会员',

    hero_eyebrow: '企业家联盟',
    hero_h1: 'Kasipker —',
    hero_h1_accent: '企业家联盟',
    hero_sub: '"团结就是力量，共同成长。" 哈萨克斯坦企业家统一平台 — 会员、网络、国际合作。',
    hero_cta1: '我想加入',
    hero_cta2: '关于联盟',

    stats_members: '会员',
    stats_clusters: '产业集群',
    stats_countries: '国家',
    stats_years: '年经验',

    about_eyebrow: '关于',
    about_title: 'Kasipker — 企业家联盟',
    about_text1: '1999年作为NAP（独立企业家协会）成立，拥有15年以上的经验，现以Kasipker的名义在新的水平上运营。',
    about_text2: '我们在法律、IT、营销和出口方向支持企业家。目标是到2030年达到50,000+会员。',
    about_mission: '使命',
    about_mission_text: '将哈萨克斯坦的企业家聚集在一个平台上，保护他们的利益，开辟进入国际市场的道路。',
    about_vision: '愿景',
    about_vision_text: '到2030年成为中亚最具影响力的企业家联盟。',

    clusters_eyebrow: '产业集群',
    clusters_title: '12个行业联合',
    clusters_sub: 'Kasipker会员按商业领域加入相应集群',

    personalities_eyebrow: '人物',
    personalities_title: '联盟代表人物',
    personalities_sub: 'Kasipker的会员、合作伙伴和领袖',

    international_eyebrow: '国际合作',
    international_title: '全球合作伙伴',
    international_sub: '7个国家的合作关系',

    gallery_eyebrow: '画廊',
    gallery_title: '活动与时刻',

    partners_eyebrow: '合作伙伴',
    partners_title: '正式合作伙伴与备忘录',

    contact_eyebrow: '联系',
    contact_title: '联系我们',
    contact_form_name: '您的姓名',
    contact_form_phone: '电话号码',
    contact_form_email: '电子邮件',
    contact_form_city: '城市 / 地区',
    contact_form_sector: '业务领域',
    contact_form_message: '留言（可选）',
    contact_form_submit: '发送',
    contact_form_success: '谢谢！我们的经理将在24小时内与您联系。',

    footer_slogan: '"团结就是力量，共同成长。"',
    footer_rights: '版权所有',

    member_cta: '加入',
    read_more: '了解更多',
    partner_cta: '成为合作伙伴',
    join_cluster: '加入集群',
  },

  tr: {
    nav_home: 'Ana Sayfa',
    nav_about: 'Hakkında',
    nav_personalities: 'Kişilikler',
    nav_clusters: 'Kümeler',
    nav_international: 'Uluslararası',
    nav_gallery: 'Galeri',
    nav_partners: 'Ortaklar',
    nav_contact: 'İletişim',
    nav_cta: 'Üye Ol',

    hero_eyebrow: 'Girişimciler Birliği',
    hero_h1: 'Kasipker —',
    hero_h1_accent: 'Girişimciler Birliği',
    hero_sub: '"Birlikte güçlüyüz. Birlikte yükseliyoruz." Kazakistan girişimcilerinin birleşik platformu — üyelik, ağ oluşturma, uluslararası ortaklık.',
    hero_cta1: 'Katılmak istiyorum',
    hero_cta2: 'Birlik Hakkında',

    stats_members: 'Üye',
    stats_clusters: 'Küme',
    stats_countries: 'Ülke',
    stats_years: 'Yıl Deneyim',

    about_eyebrow: 'Hakkında',
    about_title: 'Kasipker — Girişimciler Birliği',
    about_text1: '1999\'da NAP (Bağımsız Girişimciler Derneği) olarak kurulan, 15+ yıllık deneyimiyle bugün Kasipker adıyla yeni bir seviyede faaliyet gösteriyor.',
    about_text2: 'Girişimcileri hukuki, IT, pazarlama ve ihracat alanlarında destekliyoruz. Hedefimiz 2030\'a kadar 50.000+ üye.',
    about_mission: 'Misyon',
    about_mission_text: 'Kazakistan girişimcilerini tek bir platformda birleştirmek, çıkarlarını korumak ve uluslararası pazara açılma yolunu açmak.',
    about_vision: 'Vizyon',
    about_vision_text: '2030 yılına kadar Orta Asya\'nın en etkili girişimciler birliği olmak.',

    clusters_eyebrow: 'Sektör Kümeleri',
    clusters_title: '12 Sektörde Birlik',
    clusters_sub: 'Kasipker üyeleri iş sektörlerine göre ilgili kümeye katılır',

    personalities_eyebrow: 'Kişilikler',
    personalities_title: 'Birliğin Yüzleri',
    personalities_sub: 'Kasipker üyeleri, ortakları ve liderleri',

    international_eyebrow: 'Uluslararası',
    international_title: 'Küresel Ortaklıklar',
    international_sub: '7 ülkede ortaklık bağlantıları',

    gallery_eyebrow: 'Galeri',
    gallery_title: 'Etkinlikler ve Anlar',

    partners_eyebrow: 'Ortaklar',
    partners_title: 'Resmi Ortaklar ve Mutabakat Muhtıraları',

    contact_eyebrow: 'İletişim',
    contact_title: 'Bizimle İletişime Geçin',
    contact_form_name: 'Adınız',
    contact_form_phone: 'Telefon Numarası',
    contact_form_email: 'E-posta',
    contact_form_city: 'Şehir / İl',
    contact_form_sector: 'İş Sektörü',
    contact_form_message: 'Mesaj (isteğe bağlı)',
    contact_form_submit: 'Gönder',
    contact_form_success: 'Teşekkürler! Yöneticimiz 24 saat içinde sizinle iletişime geçecek.',

    footer_slogan: '"Birlikte güçlüyüz. Birlikte yükseliyoruz."',
    footer_rights: 'Tüm hakları saklıdır',

    member_cta: 'Üye Ol',
    read_more: 'Daha Fazla',
    partner_cta: 'Ortak Ol',
    join_cluster: 'Kümeye Katıl',
  },
};

export const clusters = [
  { icon: '🏭', kk: 'Өндіріс', ru: 'Производство', en: 'Manufacturing' },
  { icon: '🌾', kk: 'Агробизнес', ru: 'Агробизнес', en: 'Agribusiness' },
  { icon: '🏗️', kk: 'Құрылыс', ru: 'Строительство', en: 'Construction' },
  { icon: '💊', kk: 'Медицина', ru: 'Медицина', en: 'Healthcare' },
  { icon: '💻', kk: 'IT & Технология', ru: 'IT и Технологии', en: 'IT & Technology' },
  { icon: '🛍️', kk: 'Сауда', ru: 'Торговля', en: 'Trade & Retail' },
  { icon: '✈️', kk: 'Туризм', ru: 'Туризм', en: 'Tourism' },
  { icon: '🎓', kk: 'Білім', ru: 'Образование', en: 'Education' },
  { icon: '🏦', kk: 'Қаржы', ru: 'Финансы', en: 'Finance' },
  { icon: '🚚', kk: 'Логистика', ru: 'Логистика', en: 'Logistics' },
  { icon: '⚡', kk: 'Энергетика', ru: 'Энергетика', en: 'Energy' },
  { icon: '🌿', kk: 'Экология', ru: 'Экология', en: 'Ecology' },
];

export const personalities = [
  {
    id: 1,
    photo: '/images/bastaubayev.png',
    kk: { name: 'Бастаубаев Жұмабек Әндешұлы', position: 'Kasipker Альянсының негізін қалаушы', company: 'Kasipker Кәсіпкерлер Альянсы', bio: 'Кәсіпкер, инвестор, меценат. «Байтақ жасылдар» партиясының орынбасары. Kasipker Кәсіпкерлер Альянсының негізін қалаушы.' },
    ru: { name: 'Бастаубаев Жумабек Андешович', position: 'Основатель Альянса Kasipker', company: 'Союз предпринимателей Kasipker', bio: 'Предприниматель, инвестор, меценат. Заместитель партии «Байтак жасылдар». Основатель Союза предпринимателей Kasipker.' },
    en: { name: 'Zhumbek Bastaubayev', position: 'Founder of Kasipker Alliance', company: 'Kasipker Entrepreneurs Alliance', bio: 'Entrepreneur, investor, philanthropist. Deputy of the Baytak Zhasylar party. Founder of the Kasipker Entrepreneurs Alliance.' },
    category: 'Бизнесмендер',
    linkedin: '',
    instagram: '',
    telegram: '',
  },
];

export const countries = [
  {
    flag: '🇨🇳', kk: 'Қытай', ru: 'Китай', en: 'China', tag: 'Негізгі', color: '#D4A017',
    direction_kk: 'Экспорт, инвестиция, сауда, Alibaba/CCPIT',
    direction_ru: 'Экспорт, инвестиции, торговля, Alibaba/CCPIT',
    direction_en: 'Export, investment, trade, Alibaba/CCPIT',
  },
  {
    flag: '🇺🇿', kk: 'Өзбекстан', ru: 'Узбекистан', en: 'Uzbekistan', tag: 'Орта Азия', color: '#1C2E80',
    direction_kk: 'Текстиль, тамақ, туризм',
    direction_ru: 'Текстиль, продукты питания, туризм',
    direction_en: 'Textile, food, tourism',
  },
  {
    flag: '🇰🇬', kk: 'Қырғызстан', ru: 'Кыргызстан', en: 'Kyrgyzstan', tag: 'Орта Азия', color: '#1C2E80',
    direction_kk: 'Экспорт, логистика',
    direction_ru: 'Экспорт, логистика',
    direction_en: 'Export, logistics',
  },
  {
    flag: '🇹🇯', kk: 'Тәжікстан', ru: 'Таджикистан', en: 'Tajikistan', tag: 'Орта Азия', color: '#1C2E80',
    direction_kk: 'Жеңіл өнеркәсіп, тігін',
    direction_ru: 'Лёгкая промышленность, швейное производство',
    direction_en: 'Light industry, garment production',
  },
  {
    flag: '🇷🇺', kk: 'Ресей', ru: 'Россия', en: 'Russia', tag: 'Серіктес', color: '#6A83DC',
    direction_kk: 'Диаспора, B2B форумдар',
    direction_ru: 'Диаспора, B2B форумы',
    direction_en: 'Diaspora, B2B forums',
  },
  {
    flag: '🇦🇪', kk: 'ОАЭ / Дубай', ru: 'ОАЭ / Дубай', en: 'UAE / Dubai', tag: 'Инвестиция', color: '#D4A017',
    direction_kk: 'Инвестиция хабы, қаржы',
    direction_ru: 'Инвестиционный хаб, финансы',
    direction_en: 'Investment hub, finance',
  },
  {
    flag: '🇺🇸', kk: 'АҚШ', ru: 'США', en: 'USA', tag: 'Жаңа бағыт', color: '#2540B8',
    direction_kk: 'Технология, венчур, диаспора',
    direction_ru: 'Технологии, венчур, диаспора',
    direction_en: 'Technology, venture, diaspora',
  },
];

export const partners = [
  { name: 'НПП «Атамекен»', type_kk: 'Стратегиялық альянс', logo: null, badge: 'Official' },
  { name: 'Даму Банкі', type_kk: 'Қаржы серіктес', logo: null, badge: 'Official' },
  { name: 'CCPIT Қытай', type_kk: 'Халықаралық', logo: null, badge: 'International' },
  { name: 'Jimon Group', type_kk: 'Стратегиялық альянс', logo: null, badge: 'International' },
  { name: 'Amanat партиясы', type_kk: 'Серіктестік', logo: null, badge: null },
  { name: 'QazFinance', type_kk: 'Қаржы серіктес', logo: null, badge: 'Official' },
  { name: 'KMF', type_kk: 'Қаржы серіктес', logo: null, badge: null },
  { name: 'Дубай Expo', type_kk: 'Халықаралық', logo: null, badge: 'International' },
];
