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
    images: ['/images/news/qurultay-2.jpg', '/images/news/qurultay-1.jpg'],
    videoIds: ['TKwi_ZzB6GQ'],
    videoAspect: 'portrait',
  },
  {
    slug: 'nap-billiard-club-27-years',
    date: '2026-08-05',
    sourceLang: 'kk',
    title: {
      kk: 'Бір үстел басында тоғысқан 27 жыл: НАП бильярд клубының тарихы',
      ru: '27 лет за одним столом: история бильярдного клуба НАП',
      en: 'Twenty-Seven Years Around One Table: The Story of the NAP Billiards Club',
      zh: '同一张台前的27年：NAP台球俱乐部的故事',
      tr: "Tek Bir Masa Etrafında 27 Yıl: NAP Bilardo Kulübü'nün Hikayesi",
    },
    excerpt: {
      kk: '1999 жылдан бері жұмыс істейтін НАП бильярд клубы биыл 27 жасқа толды. Клубта саясаткерлер, бизнесмендер, ғалымдар мен өнер адамдары бір үстел басында кездеседі — биылғы жарыс маусымы жаңа басталды.',
      ru: 'Бильярдный клуб НАП, работающий с 1999 года, в этом году отмечает 27-летие. За одним столом здесь встречаются политики, бизнесмены, учёные и деятели искусства — стартовал новый сезон турниров.',
      en: 'The NAP Billiards Club, running since 1999, turns 27 this year. Politicians, business leaders, academics, and artists meet around the same table — this year\'s tournament season has just begun.',
      zh: '自1999年运营的NAP台球俱乐部今年迎来27周年。政治家、商界人士、学者与艺术家们齐聚一堂——新一届比赛季已经开启。',
      tr: "1999'dan beri faaliyet gösteren NAP Bilardo Kulübü bu yıl 27. yılını kutluyor. Politikacılar, iş insanları, akademisyenler ve sanatçılar aynı masada bir araya geliyor — bu yılın turnuva sezonu yeni başladı.",
    },
    body: {
      kk: [
        '1999 жыл. Тәуелсіз Кәсіпкерлер Ассоциациясының (НАП) шаңырағы көтерілген тұста, ұйым қабырғасында бильярд клубы да есігін ашты. Сол күннен бері 27 жыл өтті — клуб та, оның төңірегіне жиналған адамдар да ел өмірінің талай кезеңінен бірге өтті.',
        'Бүгінде НАП бильярд клубы — тек ойын алаңы емес, қалыптасқан қауымдастық. Мұнда жыл сайын халықаралық және республикалық деңгейдегі турнирлер өткізіліп тұрады. Клуб спорттық бильярдтың Қазақстандағы дамуына өз үлесін қосып келеді.',
        'Клубтың басты байлығы — адамдары. Кий ұстап, үстел басына жиналатындардың арасында саясаткерлер де, ірі бизнес өкілдері де, академик ғалымдар да, жазушылар мен өнер адамдары да бар. Солардың бірі — 81 жастағы академик Абай Оразұлы Сағитов. Оның үстел басындағы ұстамдылығы мен дәлдігі жас ойыншылар үшін нағыз мектеп.',
        'Дәл осы алуан түрлілік клубқа ерекше сипат береді: мұнда ғылым мен кәсіпкерлік, әдебиет пен іскерлік бір үстел басында табиғи түрде тіл табысады. Көп таныстық, көп серіктестік, көп идея дәл осы жерден бастау алған.',
        'Биылғы жарыс маусымы басталды. Алдағы айларда клуб ішілік және ашық турнирлер кезең-кезеңімен өтеді.',
        'НАП бильярд клубы. 1999 жылдан бері — дәстүр, сыйластық және ұстамдылық мектебі.',
      ],
      ru: [
        '1999 год. В момент, когда была создана Ассоциация независимых предпринимателей (НАП), в стенах организации открылся и бильярдный клуб. С того дня прошло 27 лет — и клуб, и люди, собравшиеся вокруг него, вместе прошли через немало этапов жизни страны.',
        'Сегодня бильярдный клуб НАП — это не просто игровая площадка, а сложившееся сообщество. Здесь ежегодно проходят турниры международного и республиканского уровня. Клуб вносит свой вклад в развитие спортивного бильярда в Казахстане.',
        'Главное богатство клуба — это люди. Среди тех, кто берёт в руки кий и садится за стол, — политики и общественные деятели, крупные представители бизнеса, учёные-академики, писатели и деятели искусства. Один из них — 81-летний академик Абай Оразулы Сагитов. Его выдержка и точность за столом — настоящая школа для молодых игроков.',
        'Именно это многообразие придаёт клубу особый характер: здесь наука и предпринимательство, литература и деловой мир естественным образом сходятся за одним столом. Множество знакомств, партнёрств и идей берут начало именно отсюда.',
        'Стартовал сезон соревнований этого года. В ближайшие месяцы поэтапно пройдут внутриклубные и открытые турниры.',
        'Бильярдный клуб НАП. С 1999 года — школа традиций, уважения и выдержки.',
      ],
      en: [
        "1999. At the time the Association of Independent Entrepreneurs (NAP) was founded, a billiards club also opened its doors within the organization. Twenty-seven years have passed since then — both the club and the people who gathered around it have lived through many chapters of the country's history together.",
        "Today, the NAP Billiards Club is more than just a place to play — it's an established community. International and national-level tournaments are held here every year, and the club continues to contribute to the development of competitive billiards in Kazakhstan.",
        'The club\'s greatest asset is its people. Among those who pick up a cue and gather at the table are politicians and public figures, prominent business leaders, academicians, writers, and artists. One of them is 81-year-old Academician Abai Orazuly Sagitov, whose composure and precision at the table serve as a true lesson for younger players.',
        'It is exactly this diversity that gives the club its distinct character: science and entrepreneurship, literature and business naturally meet at the same table here. Countless friendships, partnerships, and ideas have their roots in this very place.',
        "This year's tournament season has begun. In the coming months, internal club tournaments and open competitions will take place in stages.",
        'The NAP Billiards Club. Since 1999 — a school of tradition, respect, and composure.',
      ],
      zh: [
        '1999年。就在独立企业家协会（NAP）成立之时，该组织内部也开设了一家台球俱乐部。自那天起已经过去了27年——俱乐部以及聚集在其周围的人们，一同走过了国家历史的许多阶段。',
        '如今，NAP台球俱乐部不仅仅是一个游戏场所，更是一个成熟的社区。这里每年都举办国际级和国家级的锦标赛。俱乐部持续为哈萨克斯坦竞技台球运动的发展做出贡献。',
        '俱乐部最宝贵的财富是这里的人。拿起球杆围坐在台前的，有政治家和社会活动家、知名商界代表、院士学者，也有作家和艺术界人士。其中之一便是81岁的院士阿拜·奥拉祖利·萨吉托夫。他在台前展现出的沉着与精准，堪称年轻选手的真正典范。',
        '正是这种多样性赋予了俱乐部独特的气质：在这里，科学与创业、文学与商界自然地在同一张台前交汇。无数的相识、合作与创意，都从这里萌芽。',
        '本年度的比赛季已经开启。未来几个月，俱乐部内部赛事和公开锦标赛将陆续举行。',
        'NAP台球俱乐部。自1999年以来——传统、尊重与沉着的学校。',
      ],
      tr: [
        "1999 yılı. Bağımsız Girişimciler Derneği'nin (NAP) kurulduğu dönemde, kuruluş bünyesinde bir bilardo kulübü de kapılarını açtı. O günden bu yana 27 yıl geçti — hem kulüp hem de etrafında toplanan insanlar, ülkenin tarihindeki birçok döneme birlikte tanıklık etti.",
        "Bugün NAP Bilardo Kulübü sadece bir oyun alanı değil, oturmuş bir topluluktur. Burada her yıl uluslararası ve ulusal düzeyde turnuvalar düzenleniyor. Kulüp, Kazakistan'da sportif bilardonun gelişimine katkıda bulunmaya devam ediyor.",
        "Kulübün en büyük zenginliği insanlarıdır. İstaka alıp masaya oturanlar arasında politikacılar ve kamu figürleri, önde gelen iş insanları, akademisyenler, yazarlar ve sanatçılar bulunuyor. Bunlardan biri de 81 yaşındaki Akademisyen Abai Orazuly Sagitov'dur. Onun masadaki soğukkanlılığı ve isabeti, genç oyuncular için gerçek bir okul niteliğinde.",
        "Kulübe özel bir karakter kazandıran tam da bu çeşitliliktir: burada bilim ve girişimcilik, edebiyat ve iş dünyası aynı masada doğal bir şekilde buluşuyor. Pek çok tanışıklık, ortaklık ve fikir tam olarak burada doğdu.",
        "Bu yılın turnuva sezonu başladı. Önümüzdeki aylarda kulüp içi ve açık turnuvalar kademeli olarak gerçekleştirilecek.",
        "NAP Bilardo Kulübü. 1999'dan beri — gelenek, saygı ve soğukkanlılık okulu.",
      ],
    },
    images: ['/images/news/nap-billiard-club-1.jpg'],
    videoIds: ['Q4j-JU0fzUs'],
    videoAspect: 'portrait',
  },
  {
    slug: 'erkin-rakyshev-futbol-jobasy',
    date: '2026-08-26',
    sourceLang: 'kk',
    title: {
      kk: 'Қазақстан футболы — әлемдік биіктерге бастар жолда!',
      ru: 'Казахстанский футбол — на пути к мировым вершинам!',
      en: 'Kazakh Football — On the Path to World Heights!',
      zh: '哈萨克斯坦足球——迈向世界巅峰之路！',
      tr: 'Kazak Futbolu — Dünya Zirvelerine Giden Yolda!',
    },
    excerpt: {
      kk: 'Бүгін кинорежиссер, депутат Еркін Рақышевтің «Ракшер» кітабы мен Қазақстан футболын әлемдік деңгейге көтеруге бағытталған жобасының тұсаукесері өтті. Kasipker Кәсіпкерлер Альянсы бұл бастаманы толық қолдайды.',
      ru: 'Сегодня состоялась презентация книги «Ракшер» режиссера и депутата Еркина Ракишева, а также его проекта по выводу казахстанского футбола на мировой уровень. Альянс предпринимателей Kasipker полностью поддерживает эту инициативу.',
      en: 'Today saw the presentation of director and deputy Yerkin Rakyshev\'s book "Rakisher" and his project to elevate Kazakh football to a world-class level. The Kasipker Entrepreneurs Alliance fully supports this initiative.',
      zh: '今天举行了导演兼议员叶尔肯·拉克舍夫的著作《拉克舍尔》及其旨在将哈萨克斯坦足球提升至世界级水平的项目的发布会。Kasipker企业家联盟对此倡议给予全力支持。',
      tr: 'Bugün, yönetmen ve milletvekili Erkin Rakışev\'in "Rakışer" adlı kitabının ve Kazakistan futbolunu dünya çapına taşımayı amaçlayan projesinin tanıtımı yapıldı. Kasipker Girişimciler İttifakı bu girişimi tam destekliyor.',
    },
    body: {
      kk: [
        'Бүгін талантты әрі танымал кинорежиссер, депутат Еркін Рақышевтің «Ракшер» кітабының және Қазақстан футболын дамытуға, оны сапалық тұрғыдан жаңа деңгейге көтеруге әрі әлемдік аренада ілгерілетуге бағытталған бірегей жобасының тұсаукесері өтті.',
        'Еркін Рақышев ұсынған футболшыларды даярлау әдістемесі үлкен қызығушылық тудырады. Бұл заманауи, жүйелі әрі ауқымды тәсіл. Біз бұл жобадан Қазақстан футболының болашағы үшін зор мүмкіндіктерді көрдік. Ең маңыздысы аталған жоба қазақстандық футболдың белгілі жұлдыздарының да жоғары бағасына ие болып отыр.',
        'Осы әдістемені жүйелі әрі кәсіби түрде жүзеге асыру арқылы Қазақстан әлемдік футбол рейтингіндегі өз позициясын едәуір нығайтып, елімізді халықаралық деңгейдегі ең ірі жарыстарда лайықты таныстыратын жаңа буын спортшыларын тәрбиелей алады деп сенемін.',
        'Дайындық жұмыстары бүгіннен басталады. Алда әлем чемпионатына дейін төрт жыл уақыт бар. Бұл кезеңді барынша тиімді пайдалану қажет. Заманауи дайындық жүйесін қалыптастырып, дарынды жастарды ерте анықтап, олардың қабілетін дамыту, кәсіби командалар құру және болашақ чемпиондарды тәрбиелеу — басты міндеттердің бірі.',
        'Біз Еркін Рақышев пен оның жобасы да футбол арқылы дәл осындай биік нәтижеге жетіп, әлемге жаңа қазақстандық чемпиондарды таныстырып, көк Туымызды әлемнің ең беделді футбол ареналарында желбіретеді деп сенеміз.',
        'Қазақстан кәсіпкерлері альянсы атынан осы ауқымды әрі болашағы зор жобаны толық қолдайтынымызды білдіремін. Еркін Рақышевке, оның командасына және Қазақстанның барлық жас футболшыларына зор табыс, мықты жігер, қажымас қайрат және үлкен жеңістер тілеймін.',
        'Қазақстан футболына сенеміз!',
        'Спортшыларымызға сенеміз!',
        'Болашақ чемпиондарға сенеміз!',
        'Қазақстан әлемдегі жетекші футбол державаларының біріне айнала алады деп сенеміз!',
        'Құрметпен,',
        'Қазақстан Кәсіпкерлер Альянсының төрағасы',
        'Бастаубаев Ж.А.',
      ],
      ru: [
        'Сегодня состоялась презентация книги талантливого, известного кинорежиссера, депутата Еркин Ракишева «Ракшер» и уникального проекта, направленного на развитие и качественное преобразование футбола в Казахстане и его продвижение на мировой уровень.',
        'Представленная Еркином Рахишевым методика подготовки футболистов вызывает большой интерес. Это системный, современный и амбициозный подход, в котором мы увидели огромный потенциал для будущего казахстанского футбола. Особенно важно, что данный проект уже получил признание известных экспертов казахстанского футбола.',
        'Уверен, что при последовательной и профессиональной реализации этой методики Казахстан сможет значительно укрепить свои позиции в мировом футбольном рейтинге и воспитать новое поколение спортсменов, способных достойно представлять нашу страну на крупнейших международных соревнованиях.',
        'Подготовка начинается уже сегодня. Впереди четыре года до следующего чемпионата мира и это время необходимо использовать максимально эффективно: создавать современную систему подготовки, выявлять и развивать талантливую молодежь, формировать профессиональные команды и воспитывать будущих чемпионов.',
        'Мы верим, что Еркин Ракишев и его проект смогут сделать то же самое через футбол открыть миру новых казахстанских чемпионов и поднять наш флаг на самых престижных футбольных аренах мира.',
        'От имени Альянса предпринимателей Казахстана выражаю поддержку этому амбициозному проекту и желаю Еркену Рахишеву, его команде и всем молодым футболистам Казахстана больших успехов, сильной воли и побед.',
        'Верим в казахстанский футбол!',
        'Верим в наших спортсменов!',
        'Верим в будущих чемпионов!',
        'Верим, что Казахстан способен стать одной из ведущих футбольных держав мира!',
        'С уважением,',
        'Председатель Альянса предпринимателей Казахстана',
        'Бастаубаев Ж.А.',
      ],
      en: [
        'Today saw the presentation of the book "Rakisher" by the talented and well-known film director and deputy Yerkin Rakyshev, along with his unique project aimed at developing Kazakh football, elevating it to a new qualitative level, and advancing it on the world stage.',
        'The football training methodology presented by Yerkin Rakyshev has generated great interest. It is a modern, systematic, and ambitious approach, in which we saw enormous potential for the future of Kazakh football. Most importantly, this project has already earned high praise from well-known stars of Kazakh football.',
        'I am confident that through the consistent and professional implementation of this methodology, Kazakhstan can significantly strengthen its position in the world football rankings and raise a new generation of athletes capable of worthily representing our country at the largest international competitions.',
        'Preparation begins today. Four years remain until the next World Cup, and this time must be used as effectively as possible. Building a modern training system, identifying talented young people early, developing their abilities, forming professional teams, and nurturing future champions — these are among our primary tasks.',
        'We believe that Yerkin Rakyshev and his project will achieve the same great results through football, introducing new Kazakh champions to the world and raising our blue flag over the most prestigious football arenas on the planet.',
        'On behalf of the Kasipker Entrepreneurs Alliance of Kazakhstan, I express our full support for this ambitious and promising project. I wish Yerkin Rakyshev, his team, and all young footballers of Kazakhstan great success, strong resolve, unwavering perseverance, and great victories.',
        'We believe in Kazakh football!',
        'We believe in our athletes!',
        'We believe in future champions!',
        "We believe that Kazakhstan can become one of the world's leading football powers!",
        'With respect,',
        'Chairman of the Kazakhstan Entrepreneurs Alliance',
        'Zh.A. Bastaubayev',
      ],
      zh: [
        '今天，才华横溢的知名电影导演兼议员叶尔肯·拉克舍夫的著作《拉克舍尔》发布会隆重举行，同时展示了他旨在发展哈萨克斯坦足球、将其提升到新的质量水平并推向世界舞台的独特项目。',
        '叶尔肯·拉克舍夫提出的球员培养方法引起了极大关注。这是一种现代化、系统化且富有雄心的方式，我们从这个项目中看到了哈萨克斯坦足球未来的巨大潜力。最重要的是，该项目已经获得了哈萨克斯坦足球知名球星们的高度评价。',
        '我相信，只要系统而专业地实施这一方法，哈萨克斯坦就能大幅提升其在世界足球排名中的地位，培养出能够在国际最高水平赛事上为国争光的新一代运动员。',
        '备战工作从今天就开始了。距离下一届世界杯还有四年时间，必须尽最大可能有效利用这段时间。建立现代化的训练体系、及早发现有天赋的年轻人并培养其能力、组建专业队伍以及培养未来的冠军——这些都是首要任务之一。',
        '我们相信，叶尔肯·拉克舍夫和他的项目也将通过足球取得同样卓越的成就，向世界介绍新的哈萨克斯坦冠军，让我们的蓝色旗帜在世界最负盛名的足球赛场上飘扬。',
        '我谨代表哈萨克斯坦企业家联盟，表示对这一宏大而充满前景的项目的全力支持。祝愿叶尔肯·拉克舍夫及其团队，以及哈萨克斯坦所有年轻足球运动员取得巨大成功、拥有坚强的意志、不懈的毅力和伟大的胜利。',
        '我们相信哈萨克斯坦足球！',
        '我们相信我们的运动员！',
        '我们相信未来的冠军！',
        '我们相信哈萨克斯坦能够成为世界领先的足球强国之一！',
        '此致，',
        '哈萨克斯坦企业家联盟主席',
        '扎·阿·巴斯陶巴耶夫',
      ],
      tr: [
        'Bugün, yetenekli ve tanınmış film yönetmeni ve milletvekili Erkin Rakışev\'in "Rakışer" adlı kitabının ve Kazakistan futbolunu geliştirmeyi, nitelik açısından yeni bir seviyeye taşımayı ve dünya sahnesinde ilerletmeyi amaçlayan özgün projesinin tanıtımı gerçekleştirildi.',
        "Erkin Rakışev'in sunduğu futbolcu yetiştirme metodolojisi büyük ilgi uyandırıyor. Bu, modern, sistemli ve iddialı bir yaklaşımdır. Bu projede Kazakistan futbolunun geleceği için büyük fırsatlar gördük. En önemlisi, bu proje Kazakistan futbolunun tanınmış yıldızlarının da yüksek takdirini kazanmış durumda.",
        "Bu metodolojinin sistemli ve profesyonel bir şekilde hayata geçirilmesiyle Kazakistan'ın dünya futbol sıralamasındaki konumunu önemli ölçüde güçlendirebileceğine ve ülkemizi uluslararası düzeydeki en büyük yarışmalarda layıkıyla temsil edecek yeni bir sporcu neslini yetiştirebileceğine inanıyorum.",
        "Hazırlık çalışmaları bugünden başlıyor. Bir sonraki Dünya Kupası'na dört yıl var ve bu süreyi mümkün olduğunca verimli kullanmak gerekiyor. Modern bir hazırlık sistemi oluşturmak, yetenekli gençleri erken tespit etmek, yeteneklerini geliştirmek, profesyonel takımlar kurmak ve geleceğin şampiyonlarını yetiştirmek — başlıca görevlerimizden biridir.",
        "Erkin Rakışev ve projesinin de futbol aracılığıyla aynı yüksek sonuca ulaşacağına, dünyaya yeni Kazak şampiyonlarını tanıtacağına ve mavi bayrağımızı dünyanın en prestijli futbol arenalarında dalgalandıracağına inanıyoruz.",
        'Kazakistan Girişimciler İttifakı adına, bu kapsamlı ve geleceği parlak projeye tam desteğimizi ifade ediyorum. Erkin Rakışev\'e, ekibine ve Kazakistan\'ın tüm genç futbolcularına büyük başarılar, güçlü bir irade, yılmaz bir azim ve büyük zaferler diliyorum.',
        'Kazak futboluna inanıyoruz!',
        'Sporcularımıza inanıyoruz!',
        'Geleceğin şampiyonlarına inanıyoruz!',
        "Kazakistan'ın dünyanın önde gelen futbol güçlerinden biri haline gelebileceğine inanıyoruz!",
        'Saygılarımla,',
        'Kazakistan Girişimciler İttifakı Başkanı',
        'J.A. Bastaubayev',
      ],
    },
    images: [
      '/images/news/erkin-rakyshev-futbol-jobasy-1.jpg',
      '/images/news/erkin-rakyshev-futbol-jobasy-2.jpg',
      '/images/news/erkin-rakyshev-futbol-jobasy-3.jpg',
      '/images/news/erkin-rakyshev-futbol-jobasy-4.jpg',
      '/images/news/erkin-rakyshev-futbol-jobasy-5.jpg',
    ],
    videoIds: ['wKO_yemkuyo'],
  },
];
