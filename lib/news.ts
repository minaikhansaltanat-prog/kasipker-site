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
  images?: string[]; // paths under /public
  videoIds: string[]; // YouTube video IDs (privacy-enhanced embed)
  videoAspect?: 'landscape' | 'portrait'; // 'portrait' for YouTube Shorts, default 'landscape'
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
  {
    slug: 'kinogerler-odagimen-tanysu',
    date: '2026-07-30',
    sourceLang: 'kk',
    title: {
      kk: 'Kasipker қауымдастығы тарихы терең «Киногерлер» одағымен танысты',
      ru: 'Альянс Kasipker посетил историческое объединение «Киногерлер»',
      en: "Kasipker Alliance Visits the Historic 'Kinogerler' Filmmakers' Union",
      zh: 'Kasipker联盟走访历史悠久的"电影人"协会',
      tr: "Kasipker İttifakı, Köklü \"Kinogerler\" Sinemacılar Birliği'ni Ziyaret Etti",
    },
    excerpt: {
      kk: '30 шілде күні Kasipker қауымдастығы «Байтақ» жасыл партиясының өкілдерімен бірге Шәкен Айманов негізін қалаған тарихы терең «Киногерлер» одағының жұмысымен танысып, серіктестік бастамаларын талқылады.',
      ru: '30 июля альянс Kasipker вместе с представителями партии «Байтак жасылдар» посетил историческое объединение кинематографистов «Киногерлер», основанное Шакеном Аймановым, и обсудил направления будущего партнёрства.',
      en: "On July 30, the Kasipker Alliance, together with representatives of the 'Baytak Zhasylar' party, visited the historic 'Kinogerler' filmmakers' union founded by Shaken Aimanov, and discussed future partnership initiatives.",
      zh: '7月30日，Kasipker联盟与"拜塔克绿色党"代表一同走访了由沙肯·艾马诺夫创立的历史悠久的"电影人"（Киногерлер）协会，并商讨了未来的合作方向。',
      tr: "30 Temmuz'da Kasipker İttifakı, \"Baytak Jasyldar\" partisi temsilcileriyle birlikte, Şaken Aymanov tarafından kurulan köklü \"Kinogerler\" sinemacılar birliğini ziyaret etti ve gelecekteki ortaklık girişimlerini görüştü.",
    },
    body: {
      kk: [
        '30 шілде күні Kasipker қауымдастығы «Байтақ» жасыл партиясының өкілдерімен бірге тарихы терең «Киногерлер» одағының жұмысымен танысып қайтты.',
        'Кездесудің басты мақсаты — алдағы серіктестік пен ұлттық идеологияны нығайту бағытындағы бірлескен жұмыстарды талқылау болды. «Байтақ» партиясы арқылы парламентте кино саласына қатысты ұсыныстар енгізу, сондай-ақ осы салаға қатысты жаңа заң қабылдау мәселесі көтерілді.',
        'Қазіргі таңда «Киногерлер» үйі жеке меншік инвесторлардың қолдауымен жөндеуден өтіп жатыр. Кездесу дәл осы ремонт барысында өтіп, біз ұйымның қазіргі жай-күйіне куә болдық.',
        'Kasipker қауымдастығы кино саласын коммерцияландыру бағытында қолдау көрсетуге дайын екенін жеткізді. Алғашқы қадам ретінде — Шәкен Айманов атамыз негізін қалаған, тарихы терең «Киногерлер» қауымдастығына толыққанды сайт әзірлеп беруден бастаймыз.',
        'Алдағы аптада тараптар Kasipker альянсының офисінде кездесіп, серіктестік меморандумға қол қойылатын болады.',
        'Біздің басты мақсатымыз — ұлттық идеологияның тұтқасы болуға тиісті қауымдастықтар мен тұлғалардың жұмысына қолдау көрсету.',
      ],
      ru: [
        '30 июля альянс Kasipker вместе с представителями партии «Байтак жасылдар» ознакомился с работой исторического объединения «Киногерлер».',
        'Главной целью встречи стало обсуждение будущего партнёрства и совместной работы по укреплению национальной идеологии. Через партию «Байтак» был поднят вопрос о внесении в парламент предложений по киноотрасли, а также о принятии нового закона в этой сфере.',
        'В настоящее время Дом «Киногерлер» проходит ремонт при поддержке частных инвесторов. Встреча состоялась именно во время этого ремонта, и мы своими глазами увидели нынешнее состояние организации.',
        'Альянс Kasipker заявил о готовности оказать поддержку в направлении коммерциализации киноотрасли. В качестве первого шага мы начнём с разработки полноценного сайта для объединения «Киногерлер», основанного нашим великим Шакеном Аймановым.',
        'На следующей неделе стороны встретятся в офисе альянса Kasipker и подпишут меморандум о партнёрстве.',
        'Наша главная цель — оказывать поддержку работе объединений и личностей, призванных быть опорой национальной идеологии.',
      ],
      en: [
        "On July 30, the Kasipker Alliance, together with representatives of the 'Baytak Zhasylar' party, familiarized itself with the work of the historic 'Kinogerler' union.",
        "The main goal of the meeting was to discuss future partnership and joint work aimed at strengthening national ideology. Through the 'Baytak' party, the issue of introducing proposals on the film industry to parliament, as well as adopting a new law in this field, was raised.",
        "The 'Kinogerler' House is currently undergoing renovation with the support of private investors. The meeting took place during this very renovation, and we witnessed the organization's current condition firsthand.",
        "The Kasipker Alliance stated its readiness to support the commercialization of the film industry. As a first step, we will begin by developing a full-fledged website for the 'Kinogerler' union, founded by our great Shaken Aimanov.",
        'Next week, the parties will meet at the Kasipker Alliance office and sign a partnership memorandum.',
        'Our main goal is to support the work of associations and individuals meant to serve as pillars of national ideology.',
      ],
      zh: [
        '7月30日，Kasipker联盟与"拜塔克绿色党"代表一同，实地了解了历史悠久的"电影人"（Киногерлер）协会的工作情况。',
        '此次会晤的主要目的是探讨未来的合作以及在加强民族意识形态方面的共同工作。会上还提出通过"拜塔克"党向议会提交电影产业相关提案，并推动出台该领域新法律的议题。',
        '目前，"电影人之家"正在私人投资者的支持下进行修缮。此次会面正值维修期间，我们也因此亲眼见证了该机构目前的状况。',
        'Kasipker联盟表示愿意在电影产业商业化方向上提供支持。作为第一步，我们将从为由我们伟大的沙肯·艾马诺夫创立的"电影人"协会打造一个完整的官方网站开始。',
        '下周，双方将在Kasipker联盟办公室会面，并签署合作备忘录。',
        '我们的主要目标是支持那些理应成为民族意识形态支柱的团体和人士的工作。',
      ],
      tr: [
        "30 Temmuz'da Kasipker İttifakı, \"Baytak Jasyldar\" partisi temsilcileriyle birlikte, köklü tarihe sahip \"Kinogerler\" birliğinin çalışmalarıyla tanıştı.",
        "Görüşmenin temel amacı, gelecekteki ortaklık ve ulusal ideolojiyi güçlendirme yönündeki ortak çalışmaları görüşmekti. \"Baytak\" partisi aracılığıyla parlamentoya sinema sektörüyle ilgili önerilerin sunulması ve bu alanda yeni bir yasanın kabul edilmesi konusu da gündeme getirildi.",
        "Şu anda \"Kinogerler\" Evi, özel yatırımcıların desteğiyle onarımdan geçiyor. Görüşme tam da bu tadilat sürecinde gerçekleşti ve kuruluşun mevcut durumuna bizzat tanık olduk.",
        "Kasipker İttifakı, sinema sektörünün ticarileştirilmesi yönünde destek vermeye hazır olduğunu bildirdi. İlk adım olarak, büyük atamız Şaken Aymanov'un kurduğu köklü \"Kinogerler\" birliği için eksiksiz bir web sitesi hazırlamakla başlayacağız.",
        'Önümüzdeki hafta taraflar Kasipker İttifakı ofisinde bir araya gelecek ve bir ortaklık mutabakat zaptı imzalayacaklar.',
        'Temel amacımız, ulusal ideolojinin dayanağı olması gereken topluluk ve kişilerin çalışmalarına destek vermektir.',
      ],
    },
    images: ['/images/news/kinogerler-1.jpg', '/images/news/kinogerler-2.jpg', '/images/news/kinogerler-3.jpg'],
    videoIds: ['PBBnUPQwfF0', 'I5ZbSQKY-qY', 'c3i0CYHIqZI'],
    videoAspect: 'portrait',
  },
  {
    slug: 'qurultay-forum-2026',
    date: '2026-08-03',
    sourceLang: 'kk',
    title: {
      kk: 'Kasipker қауымдастығы «QURULTAY» құрылысшылар форумына қатысты',
      ru: 'Альянс Kasipker принял участие в форуме строителей «QURULTAY»',
      en: "Kasipker Alliance Takes Part in the 'QURULTAY' Builders Forum",
      zh: 'Kasipker联盟参加"QURULTAY"建筑商论坛',
      tr: "Kasipker İttifakı \"QURULTAY\" İnşaatçılar Forumu'na Katıldı",
    },
    excerpt: {
      kk: 'Kasipker қауымдастығының басшылығы — Жақыпбек Бастаубаев пен Салтанат Минайхан, сондай-ақ Қауымдастық кеңесшісі, Алматы қалалық мәслихатының депутаты Еркін Рақышев «QURULTAY» құрылысшылар форумына қатысып қайтты.',
      ru: 'Руководство альянса Kasipker — Жакыпбек Бастаубаев и Салтанат Минайхан, а также советник Альянса, депутат Алматинского городского маслихата Еркин Рахышев приняли участие в форуме строителей «QURULTAY».',
      en: 'The leadership of the Kasipker Alliance — Zhakypbek Bastaubayev and Saltanat Minaykhan — together with Alliance advisor and Almaty City Maslikhat deputy Yerkin Rakyshev, took part in the "QURULTAY" builders forum.',
      zh: 'Kasipker联盟领导层——扎克普别克·巴斯陶巴耶夫和萨尔塔纳特·米娜依汗，以及联盟顾问、阿拉木图市马斯利哈特议员叶尔肯·拉克舍夫，一同参加了"QURULTAY"建筑商论坛。',
      tr: 'Kasipker İttifakı liderliği — Jakıpbek Bastaubayev ve Saltanat Minaykhan — ile İttifak danışmanı, Almatı Şehir Maslihatı milletvekili Erkin Rakışev, "QURULTAY" inşaatçılar forumuna katıldı.',
    },
    body: {
      kk: [
        'Кеше Kasipker қауымдастығының басшылығы — Жақыпбек Бастаубаев пен Салтанат Минайхан, сондай-ақ Қауымдастық кеңесшісі, Алматы қалалық мәслихатының депутаты Еркін Рақышев мырза «QURULTAY» құрылысшылар форумына қатысып қайтты.',
        'QURULTAY — құрылыс индустриясының жетекші өкілдерін, кәсіпкерлерді, мердігерлерді, инженерлерді және сәулетшілерді бір алаңға жинайтын ауқымды форум. Мақсаты — саланың мамандарына жаңа серіктестер табуға, тәжірибе алмасуға, нарықтағы өзекті өзгерістерді талқылауға және бизнесті жаңа деңгейге шығаруға мүмкіндік беру.',
        'Форум күшті спикерлер, нақты кейстер және құрылыс саласының болашағы жайлы ашық талқылаулармен ерекшеленеді. Kasipker қауымдастығы саланың дамуына бағытталған осындай бастамаларды қолдап, белсенді қатысып отыр.',
      ],
      ru: [
        'Вчера руководство альянса Kasipker — Жакыпбек Бастаубаев и Салтанат Минайхан, а также советник Альянса, депутат Алматинского городского маслихата Еркин Рахышев приняли участие в форуме строителей «QURULTAY».',
        'QURULTAY — масштабный форум, объединяющий на одной площадке ведущих представителей строительной индустрии, предпринимателей, подрядчиков, инженеров и архитекторов. Его цель — дать специалистам отрасли возможность найти новых партнёров, обменяться опытом, обсудить актуальные изменения на рынке и вывести бизнес на новый уровень.',
        'Форум отличается сильными спикерами, конкретными кейсами и открытыми дискуссиями о будущем строительной отрасли. Альянс Kasipker поддерживает подобные инициативы, направленные на развитие отрасли, и принимает в них активное участие.',
      ],
      en: [
        "Yesterday, the leadership of the Kasipker Alliance — Zhakypbek Bastaubayev and Saltanat Minaykhan — together with the Alliance's advisor, deputy of the Almaty City Maslikhat Yerkin Rakyshev, took part in the 'QURULTAY' builders forum.",
        'QURULTAY is a large-scale forum that brings together leading representatives of the construction industry, entrepreneurs, contractors, engineers, and architects on one platform. Its goal is to give industry professionals the opportunity to find new partners, exchange experience, discuss current market changes, and take their business to a new level.',
        'The forum stands out for its strong speakers, concrete case studies, and open discussions about the future of the construction industry. The Kasipker Alliance supports such initiatives aimed at industry development and actively takes part in them.',
      ],
      zh: [
        '昨天，Kasipker联盟领导层——扎克普别克·巴斯陶巴耶夫和萨尔塔纳特·米娜依汗，以及联盟顾问、阿拉木图市马斯利哈特议员叶尔肯·拉克舍夫一同参加了"QURULTAY"建筑商论坛。',
        'QURULTAY是一个大型论坛，汇集了建筑行业的主要代表、企业家、承包商、工程师和建筑师。其目的是为业内专业人士提供寻找新合作伙伴、交流经验、探讨市场最新变化以及推动业务迈向新高度的机会。',
        '本次论坛以强大的演讲嘉宾阵容、真实案例分享以及关于建筑行业未来的公开讨论而著称。Kasipker联盟积极支持并参与此类致力于推动行业发展的举措。',
      ],
      tr: [
        'Dün, Kasipker İttifakı liderliği — Jakıpbek Bastaubayev ve Saltanat Minaykhan — ile İttifak danışmanı, Almatı Şehir Maslihatı milletvekili Erkin Rakışev, "QURULTAY" inşaatçılar forumuna katıldı.',
        'QURULTAY, inşaat sektörünün önde gelen temsilcilerini, girişimcileri, müteahhitleri, mühendisleri ve mimarları tek bir platformda bir araya getiren büyük ölçekli bir forumdur. Amacı, sektör uzmanlarına yeni ortaklar bulma, deneyim paylaşma, piyasadaki güncel değişiklikleri tartışma ve işlerini yeni bir seviyeye taşıma fırsatı sunmaktır.',
        'Forum, güçlü konuşmacıları, somut vaka çalışmaları ve inşaat sektörünün geleceği hakkındaki açık tartışmalarıyla dikkat çekiyor. Kasipker İttifakı, sektörün gelişimine yönelik bu tür girişimleri destekliyor ve bunlara aktif olarak katılıyor.',
      ],
    },
    images: ['/images/news/qurultay-1.jpg', '/images/news/qurultay-2.jpg'],
    videoIds: ['TKwi_ZzB6GQ'],
    videoAspect: 'portrait',
  },
];
