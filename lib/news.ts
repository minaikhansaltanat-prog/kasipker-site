import { Lang } from './translations';

const MONTHS: Record<'kk' | 'ru' | 'en' | 'tr', string[]> = {
  kk: ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'],
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
};

// Deterministic formatting (no Intl/toLocaleDateString) to avoid SSR/CSR hydration
// mismatches — Node's ICU data for locales like 'kk-KZ' can differ from the browser's.
export function formatNewsDate(iso: string, lang: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (lang === 'zh') return `${y}年${m}月${d}日`;
  const key = lang === 'ru' ? 'ru' : lang === 'kk' ? 'kk' : lang === 'tr' ? 'tr' : 'en';
  const month = MONTHS[key][m - 1];
  if (key === 'kk') return `${d} ${month} ${y} ж.`;
  if (key === 'ru') return `${d} ${month} ${y} г.`;
  if (key === 'tr') return `${d} ${month} ${y}`;
  return `${month} ${d}, ${y}`;
}

/**
 * News content model: title/excerpt/body are kept per-language (kk/ru/en/zh/tr),
 * same pattern as lib/translations.ts, so the site never falls back to the
 * author's original language when the visitor switches languages.
 *
 * Workflow for adding a new article: write it in whichever language is
 * convenient (sourceLang), then have Claude translate it into the other four
 * languages before publishing — fill in every key of title/excerpt/body.
 */
export interface NewsArticle {
  slug: string;
  date: string; // ISO date
  sourceLang: Lang;
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
  body: Record<Lang, string[]>;
  videoIds: string[]; // YouTube video IDs (privacy-enhanced embed)
}

export const NEWS: NewsArticle[] = [
  {
    slug: 'aubakirov-80-bilyard-turnir',
    date: '2026-07-29',
    sourceLang: 'ru',
    title: {
      kk: 'Тохтар Аубакировтың 80 жылдығына арналған бильярд турнирі',
      ru: 'Бильярдный турнир в честь 80-летия Тохтара Аубакирова',
      en: "Billiards Tournament in Honor of Tokhtar Aubakirov's 80th Anniversary",
      zh: '纪念托赫塔尔·奥巴基罗夫80周年诞辰台球锦标赛',
      tr: "Tohtar Aubakirov'un 80. Yıldönümü Onuruna Bilardo Turnuvası",
    },
    excerpt: {
      kk: 'Қазақтан шыққан тұңғыш ғарышкер, Қазақстанның Халық Қаһарманы Тохтар Оңғарбайұлы Аубакировтың 80 жылдық мерейтойына орай Алматы қаласының ардагерлері мен қадірлі ақсақалдары арасында бильярд турнирі өтті.',
      ru: 'В честь 80-летнего юбилея первого казаха-космонавта, Народного Героя Казахстана Тохтара Онгарбаевича Аубакирова состоялся бильярдный турнир среди ветеранов и уважаемых аксакалов города Алматы.',
      en: "In honor of the 80th anniversary of the first Kazakh cosmonaut, People's Hero of Kazakhstan Tokhtar Ongarbayevich Aubakirov, a billiards tournament was held among veterans and respected elders of Almaty.",
      zh: '为纪念哈萨克斯坦首位哈萨克族宇航员、哈萨克斯坦人民英雄托赫塔尔·翁加尔巴耶维奇·奥巴基罗夫80周年诞辰，阿拉木图市退伍军人和德高望重的长者们举行了台球锦标赛。',
      tr: "İlk Kazak kozmonot, Kazakistan Halk Kahramanı Tohtar Ongarbayevich Aubakirov'un 80. yıldönümü onuruna, Almatı şehrinin gazileri ve saygıdeğer ihtiyarları arasında bir bilardo turnuvası düzenlendi.",
    },
    body: {
      kk: [
        'Бүгін әлемге әйгілі қазақстандық ғарышкер, ғарышты бағындырған тұңғыш қазақ, Қазақстанның Халық Қаһарманы Тохтар Оңғарбайұлы Аубакировтың 80 жасқа толуына орай, Алматы қаласының ардагерлері мен қадірлі ақсақалдары арасында бильярд турнирі өтті.',
        '«BAYTAQ» партиясының бастамасымен іс-шараға қатысушылар үшін мерекелік ас дастарханы ұйымдастырылды, ол жылы, достық атмосферада өтіп, Қазақстанды бүкіл әлемге танытқан адамға деген терең құрметті білдірудің тамаша мүмкіндігіне айналды.',
        'Ерекше толғандырған сәт — Тохтар Оңғарбайұлыға арналған өз өлеңімнің оқылуы болды. Бұл шығарма қазақ халқының көрнекті ұлына деген шынайы құрмет пен ризашылықтың белгісіне айналды. Ол өзінің батылдығымен, кәсіби шеберлігімен және Отанға адалдығымен өз есімін отандық және әлемдік ғарышкерлік тарихына мәңгілікке жазып қалдырды.',
        'Мұндай кездесулердің ерекше маңызы бар. Олар ұрпақтарды біріктіреді, жастарда патриотизм сезімін, аға буынға деген құрметті және Қазақстанның ұлы ұлдарына деген мақтаныш сезімін қалыптастырады. Еңбегі мен ерлігімен елімізді дүниежүзіне танытқан адамдарды есте сақтап, құрметтеу — біздің парызымыз.',
        '«BAYTAQ» партиясы атынан және өз атымнан Тохтар Оңғарбайұлы Аубакировты 80 жылдық мерейтойымен шын жүректен құттықтаймын!',
        'Сізге мықты денсаулық, ұзақ ғұмыр, отбасылық бақыт, амандық, рухани күш-жігер және сарқылмас қуат тілейміз. Өмір жолыңыз ұзақ жылдар бойы батылдықтың, патриотизмнің және Отанға адал қызмет етудің үлгісі болып, қазақстандықтардың жаңа ұрпағын үлкен жетістіктер мен жаңа жеңістерге шабыттандыра берсін.',
        'Мерейтойыңызбен, Тохтар Оңғарбайұлы! Ерлігіңіз бен батылдығыңыз үшін, бүкіл Қазақстанға сыйлаған мақтанышыңыз үшін алғыс айтамыз. Біз Сізбен мақтанамыз!',
      ],
      ru: [
        'Сегодня, в честь 80-летнего юбилея легендарного казахстанского космонавта, первого казаха, покорившего космос, Народного Героя Казахстана Тохтара Онгарбаевича Аубакирова, состоялся бильярдный турнир среди ветеранов и уважаемых аксакалов города Алматы.',
        'По инициативе партии «BAYTAQ» для участников мероприятия был организован праздничный обед, который прошел в теплой, дружеской атмосфере и стал прекрасной возможностью выразить глубокое уважение человеку, прославившему Казахстан на весь мир.',
        'Особенно трогательным моментом стало исполнение моего стихотворения, посвященного Тохтару Онгарбаевичу. Это произведение стало данью искреннего уважения и признательности выдающемуся сыну казахского народа, человеку, который своим мужеством, профессионализмом и преданностью Родине навсегда вписал свое имя в историю отечественной и мировой космонавтики.',
        'Такие встречи имеют особое значение. Они объединяют поколения, воспитывают у молодежи чувство патриотизма, уважение к старшему поколению и гордость за великих сынов Казахстана. Наш долг помнить и чтить людей, которые своим трудом и подвигами прославили нашу страну.',
        'От имени партии «BAYTAQ» и от себя лично сердечно поздравляю Тохтара Онгарбаевича Аубакирова с 80-летним юбилеем!',
        'Желаем Вам крепкого здоровья, долголетия, семейного счастья, благополучия, бодрости духа и неиссякаемой энергии. Пусть Ваш жизненный путь еще долгие годы служит примером мужества, патриотизма и беззаветного служения Родине, вдохновляя новые поколения казахстанцев на большие достижения и новые победы.',
        'С юбилеем, Тохтар Онгарбаевич! Спасибо Вам за Ваш подвиг, за Ваше мужество и за ту гордость, которую Вы подарили всему Казахстану. Мы гордимся Вами!',
      ],
      en: [
        'Today, in honor of the 80th birthday of the legendary Kazakhstani cosmonaut — the first Kazakh to conquer space, People\'s Hero of Kazakhstan Tokhtar Ongarbayevich Aubakirov — a billiards tournament was held among the veterans and respected elders of Almaty.',
        "On the initiative of the 'BAYTAQ' party, a festive luncheon was organized for the participants, which took place in a warm, friendly atmosphere and became a wonderful opportunity to express deep respect for the man who brought fame to Kazakhstan across the world.",
        'A particularly moving moment was the recitation of my poem dedicated to Tokhtar Ongarbayevich. This work became a tribute of sincere respect and gratitude to this outstanding son of the Kazakh people — a man who, through his courage, professionalism, and devotion to the Motherland, forever inscribed his name in the history of both national and world cosmonautics.',
        'Such gatherings hold special significance. They bring generations together, instill in young people a sense of patriotism, respect for the older generation, and pride in the great sons of Kazakhstan. It is our duty to remember and honor those who, through their labor and heroism, brought glory to our country.',
        "On behalf of the 'BAYTAQ' party and on my own behalf, I warmly congratulate Tokhtar Ongarbayevich Aubakirov on his 80th anniversary!",
        "We wish you strong health, longevity, family happiness, well-being, high spirits, and boundless energy. May your life's journey continue for many years to come as an example of courage, patriotism, and selfless service to the Motherland, inspiring new generations of Kazakhstanis to great achievements and new victories.",
        'Happy anniversary, Tokhtar Ongarbayevich! Thank you for your heroic feat, your courage, and the pride you have given to all of Kazakhstan. We are proud of you!',
      ],
      zh: [
        '今天，为纪念哈萨克斯坦传奇宇航员、首位征服太空的哈萨克人、哈萨克斯坦人民英雄托赫塔尔·翁加尔巴耶维奇·奥巴基罗夫的80岁诞辰，阿拉木图市的退伍军人和德高望重的长者们举行了一场台球锦标赛。',
        '在«BAYTAQ»政党的倡议下，主办方为与会者组织了一场庆祝午宴，宴会在温馨友好的氛围中进行，成为向这位让哈萨克斯坦闻名世界的杰出人物表达深切敬意的绝佳机会。',
        '特别令人感动的一刻，是我为托赫塔尔·翁加尔巴耶维奇创作的诗歌朗诵。这首作品表达了对这位杰出的哈萨克人民之子的真挚敬意与感激之情——他以自己的勇气、专业精神和对祖国的忠诚，将自己的名字永远镌刻在了国家乃至世界航天史上。',
        '此类聚会具有特殊意义。它们将不同世代联系在一起，培养年轻一代的爱国情怀、对老一辈的尊重，以及对哈萨克斯坦杰出儿女的自豪感。铭记并尊崇那些以劳动和功勋为祖国增光添彩的人，是我们的责任。',
        '谨代表«BAYTAQ»政党并以个人名义，衷心祝贺托赫塔尔·翁加尔巴耶维奇·奥巴基罗夫80周年诞辰！',
        '祝您身体健康、长命百岁、家庭幸福、万事顺遂、精神饱满、精力充沛。愿您的人生道路在未来的岁月里继续成为勇气、爱国精神和无私奉献祖国的典范，激励新一代哈萨克斯坦人取得更大成就，赢得新的胜利。',
        '生日快乐，托赫塔尔·翁加尔巴耶维奇！感谢您的英勇壮举、您的勇气，以及您为整个哈萨克斯坦带来的自豪。我们为您感到骄傲！',
      ],
      tr: [
        "Bugün, efsanevi Kazak kozmonot, uzayı fetheden ilk Kazak, Kazakistan Halk Kahramanı Tohtar Ongarbayevich Aubakirov'un 80. doğum günü onuruna, Almatı şehrinin gazileri ve saygıdeğer ihtiyarları arasında bir bilardo turnuvası düzenlendi.",
        "«BAYTAQ» partisinin girişimiyle, etkinliğe katılanlar için sıcak ve samimi bir ortamda geçen bir kutlama yemeği düzenlendi ve bu, Kazakistan'ı tüm dünyaya tanıtan bu değerli insana derin saygı gösterme fırsatı oldu.",
        "Özellikle duygulandırıcı an, Tohtar Ongarbayevich'e ithaf ettiğim şiirimin okunmasıydı. Bu eser, cesareti, profesyonelliği ve Anavatan'a bağlılığıyla adını ulusal ve dünya kozmonotluk tarihine sonsuza dek yazdıran bu seçkin Kazak evladına duyulan içten saygı ve minnettarlığın bir ifadesi oldu.",
        "Bu tür buluşmaların özel bir önemi vardır. Nesilleri bir araya getirir, gençlerde vatanseverlik duygusunu, büyük nesle saygıyı ve Kazakistan'ın büyük evlatlarıyla gurur duymayı aşılar. Emeği ve kahramanlığıyla ülkemizi onurlandıran insanları hatırlamak ve onurlandırmak bizim görevimizdir.",
        "«BAYTAQ» partisi adına ve şahsım adına, Tohtar Ongarbayevich Aubakirov'u 80. yıldönümü nedeniyle içtenlikle kutluyorum!",
        "Size sağlıklı ve uzun bir ömür, aile mutluluğu, refah, güçlü bir ruh hali ve tükenmez bir enerji diliyoruz. Hayat yolunuz uzun yıllar boyunca cesaret, vatanseverlik ve Anavatan'a fedakarca hizmetin bir örneği olarak kalsın ve yeni Kazakistan nesillerini büyük başarılara ve yeni zaferlere ilham etsin.",
        "Yıldönümünüz kutlu olsun, Tohtar Ongarbayevich! Kahramanlığınız, cesaretiniz ve tüm Kazakistan'a kazandırdığınız gurur için teşekkür ederiz. Sizinle gurur duyuyoruz!",
      ],
    },
    videoIds: ['myofF7Ha2To', 'muHFw-3dTTE', 'JYj9MlWfSBs', 'xCpsQA-ioVk', 'MuLIimZueEg', 'V9q0cWwDRGw'],
  },
];
