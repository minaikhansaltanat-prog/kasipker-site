import { t, clusters, personalities, whyKasipkerBlocks, countries, partners, pickByLang, type Lang } from './translations';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, officeAddress } from './contactInfo';
import { NEWS } from './news';

/**
 * Builds the AI assistant's knowledge base straight from the site's own
 * content modules, so it never drifts out of sync with what's actually
 * published -- no separate copy of facts to maintain by hand.
 */
export function buildSiteKnowledge(lang: Lang): string {
  const tr = t[lang];
  const lines: string[] = [];

  const L = (kk: string, ru: string, en: string, zh: string, tr_: string) => pickByLang(lang, kk, ru, en, zh, tr_);

  lines.push('# Kasipker');
  lines.push(tr.hero_sub);
  lines.push(tr.about_text1);
  lines.push(tr.about_text2);
  lines.push(`${L('Миссия', 'Миссия', 'Mission', '使命', 'Misyon')}: ${tr.about_mission_text}`);
  lines.push(`${L('Визия', 'Видение', 'Vision', '愿景', 'Vizyon')}: ${tr.about_vision_text}`);

  lines.push('');
  lines.push(`## ${tr.why_eyebrow}`);
  lines.push(tr.why_intro);
  for (const b of whyKasipkerBlocks) {
    const block = b[lang];
    lines.push(`- ${block.title}: ${block.desc}`);
  }

  lines.push('');
  lines.push(`## ${tr.clusters_title} (${clusters.length})`);
  lines.push(clusters.map((c) => c[lang]).join(', '));

  lines.push('');
  lines.push(`## ${tr.personalities_title} (${personalities.length})`);
  for (const p of personalities) {
    const info = p[lang];
    lines.push(`- ${info.name} — ${info.position} (${info.company})`);
  }

  lines.push('');
  lines.push(`## ${tr.international_title} (${countries.length})`);
  for (const c of countries) {
    const name = c[lang];
    const direction = (c as Record<string, string>)[`direction_${lang}`];
    lines.push(`- ${name}: ${direction}`);
  }

  lines.push('');
  lines.push(`## ${tr.partners_title}`);
  for (const p of partners) {
    const type = (p as unknown as Record<string, string>)[`type_${lang}`];
    lines.push(`- ${p.name} (${type})`);
  }

  lines.push('');
  lines.push(`## ${L('Соңғы жаңалықтар', 'Последние новости', 'Latest news', '最新消息', 'Son haberler')}`);
  for (const n of NEWS.slice(0, 8)) {
    lines.push(`- ${n.title[lang]} — ${n.excerpt[lang]}`);
  }

  lines.push('');
  lines.push(`## ${tr.contact_title}`);
  lines.push(`Email: ${CONTACT_EMAIL}`);
  lines.push(`${L('Телефон', 'Телефон', 'Phone', '电话', 'Telefon')} / WhatsApp: ${CONTACT_PHONE_DISPLAY}`);
  lines.push(`${L('Мекенжай', 'Адрес', 'Address', '地址', 'Adres')}: ${officeAddress(lang)}`);
  lines.push(
    L(
      'Мүше болу үшін сайттағы "Байланыс" бетінде (/contact) форманы толтыру керек — өтінім WhatsApp арқылы жіберіледі. Ресми оферта мен мүшелік шарттары "/oferta" бетінде қазақша және орысша қолжетімді.',
      'Чтобы стать членом, нужно заполнить форму на странице "Контакты" (/contact) — заявка отправляется через WhatsApp. Официальная оферта и условия членства доступны на странице "/oferta" на казахском и русском языках.',
      'To become a member, fill in the form on the Contact page (/contact) — the request is sent via WhatsApp. The official public offer and membership terms are available on the "/oferta" page in Kazakh and Russian.',
      '如需入会，请在"联系我们"页面（/contact）填写表单——申请将通过WhatsApp发送。正式的入会公开要约及会员条款可在"/oferta"页面查看（哈萨克语和俄语）。',
      'Üye olmak için sitedeki "İletişim" sayfasında (/contact) formu doldurmanız gerekir — talep WhatsApp üzerinden gönderilir. Resmi teklif ve üyelik şartları "/oferta" sayfasında Kazakça ve Rusça olarak mevcuttur.'
    )
  );

  return lines.join('\n');
}
