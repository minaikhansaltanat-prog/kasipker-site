'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Mail, Globe, Phone, Send, CheckCircle2 } from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t, clusters, pickByLang } from '@/lib/translations';
import { InstagramIcon, YoutubeIcon } from '@/components/icons/BrandIcons';
import Maps2GisButton from '@/components/Maps2GisButton';
import { CONTACT_EMAIL, CONTACT_PHONE_DIGITS, CONTACT_PHONE_DISPLAY, officeAddress } from '@/lib/contactInfo';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }),
};

export default function ContactPage() {
  const { lang } = useLang();
  const tr = t[lang];
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '', sector: '', message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [agreedToOffer, setAgreedToOffer] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot trap: real users never fill the hidden field
    if (!agreedToOffer) return; // belt-and-suspenders alongside the checkbox's own `required`

    // WhatsApp's markup renders single-asterisk *text* as bold, so each
    // field label comes through highlighted for whoever reads it on the
    // Kasipker side -- same wa.me deep-link pattern already used by
    // components/EventActionModal.tsx (this app has no backend to submit
    // a form to, so "send" means opening WhatsApp with the message
    // pre-filled; the visitor still has to press Send there).
    const message = pickByLang(
      lang,
      `Сәлеметсіз бе! Kasipker Кәсіпкерлер Альянсына мүше болғым келеді.\n\n*Аты-жөні:* ${formData.name}\n*Телефон:* ${formData.phone}\n*Email:* ${formData.email}\n*Қала:* ${formData.city}\n*Сектор:* ${formData.sector || '—'}\n*Хабарлама:* ${formData.message || '—'}`,
      `Здравствуйте! Хочу стать членом Союза предпринимателей Kasipker.\n\n*Имя:* ${formData.name}\n*Телефон:* ${formData.phone}\n*Email:* ${formData.email}\n*Город:* ${formData.city}\n*Сфера бизнеса:* ${formData.sector || '—'}\n*Сообщение:* ${formData.message || '—'}`,
      `Hello! I would like to become a member of the Kasipker Entrepreneurs Alliance.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*City:* ${formData.city}\n*Business sector:* ${formData.sector || '—'}\n*Message:* ${formData.message || '—'}`,
      `您好！我想成为Kasipker企业家联盟的会员。\n\n*姓名：*${formData.name}\n*电话：*${formData.phone}\n*电子邮件：*${formData.email}\n*城市：*${formData.city}\n*业务领域：*${formData.sector || '—'}\n*留言：*${formData.message || '—'}`,
      `Merhaba! Kasipker Girişimciler İttifakı'na üye olmak istiyorum.\n\n*Ad Soyad:* ${formData.name}\n*Telefon:* ${formData.phone}\n*E-posta:* ${formData.email}\n*Şehir:* ${formData.city}\n*İş sektörü:* ${formData.sector || '—'}\n*Mesaj:* ${formData.message || '—'}`
    );
    const link = `https://wa.me/${CONTACT_PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
    setWaLink(link);
    window.open(link, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="hero-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-kasipker-gold-400/30 bg-kasipker-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-kasipker-gold-400 mb-4">
              {tr.contact_eyebrow}
            </span>
            <h1 className="text-4xl font-black text-white md:text-5xl mb-4">{tr.contact_title}</h1>
            <p className="text-white/70">
              {pickByLang(lang,
                'Мүше болу, серіктестік, сұрақтар — бізбен байланысыңыз',
                'Членство, партнёрство, вопросы — свяжитесь с нами',
                'Membership, partnership, questions — get in touch',
                '会员申请、合作事宜、任何问题 — 欢迎与我们联系',
                'Üyelik, ortaklık, sorularınız — bizimle iletişime geçin'
              )}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Form */}
          <motion.div initial="hidden" animate="visible" custom={0.1} variants={fadeUp} className="card-kasipker">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-extrabold text-kasipker-navy-900">
                  {pickByLang(lang, 'WhatsApp ашылды', 'WhatsApp открыт', 'WhatsApp opened', 'WhatsApp已打开', 'WhatsApp açıldı')}
                </h3>
                <p className="text-sm text-kasipker-navy-500">
                  {pickByLang(
                    lang,
                    'Хабарлама дайын күйде ашылды — жіберу үшін WhatsApp терезесінде «Жіберу» батырмасын басыңыз.',
                    'Сообщение открыто в готовом виде — нажмите «Отправить» в окне WhatsApp.',
                    'Your message is ready in WhatsApp — press "Send" there to complete it.',
                    '消息已在WhatsApp中准备就绪——请在WhatsApp窗口中点击"发送"。',
                    'Mesajınız WhatsApp\'ta hazır — göndermek için WhatsApp penceresinde "Gönder"e basın.'
                  )}
                </p>
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-kasipker-navy-600 underline hover:text-kasipker-navy-900 cursor-pointer"
                  >
                    {pickByLang(lang, 'Ашылмаса — осы жерді басыңыз', 'Не открылось — нажмите здесь', "Didn't open — click here", '未打开——点击此处', 'Açılmadıysa — buraya tıklayın')}
                  </a>
                )}
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold text-kasipker-navy-900 mb-2">{tr.nav_cta}</h2>
                <p className="text-sm text-kasipker-navy-400 mb-6">
                  {pickByLang(lang,
                    'Менеджер 24 сағат ішінде байланысады',
                    'Менеджер свяжется с вами в течение 24 часов',
                    'Manager will contact you within 24 hours',
                    '经理将在24小时内与您联系',
                    'Yöneticimiz sizinle 24 saat içinde iletişime geçecektir'
                  )}
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Honeypot: hidden from users, catches bots that fill every field */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute opacity-0 pointer-events-none h-0 w-0"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-kasipker-navy-600 mb-1.5">{tr.contact_form_name} *</label>
                      <input
                        required type="text"
                        placeholder={tr.contact_form_name}
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-kasipker-navy-100 px-4 py-3 text-sm outline-none focus:border-kasipker-navy-700 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-kasipker-navy-600 mb-1.5">{tr.contact_form_phone} *</label>
                      <input
                        required type="tel"
                        placeholder="+7 7__ ___ ____"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-kasipker-navy-100 px-4 py-3 text-sm outline-none focus:border-kasipker-navy-700 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-kasipker-navy-600 mb-1.5">{tr.contact_form_email}</label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-kasipker-navy-100 px-4 py-3 text-sm outline-none focus:border-kasipker-navy-700 transition-colors"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-kasipker-navy-600 mb-1.5">{tr.contact_form_city} *</label>
                      <input
                        required type="text"
                        placeholder={pickByLang(lang, 'Алматы', 'Алматы', 'Almaty', '阿拉木图', 'Almatı')}
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full rounded-xl border border-kasipker-navy-100 px-4 py-3 text-sm outline-none focus:border-kasipker-navy-700 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-kasipker-navy-600 mb-1.5">{tr.contact_form_sector}</label>
                      <select
                        value={formData.sector}
                        onChange={e => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full rounded-xl border border-kasipker-navy-100 px-4 py-3 text-sm outline-none focus:border-kasipker-navy-700 transition-colors bg-white"
                      >
                        <option value="">—</option>
                        {clusters.map(cl => (
                          <option key={cl.kk} value={cl.kk}>{pickByLang(lang, cl.kk, cl.ru, cl.en, cl.zh, cl.tr)}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-kasipker-navy-600 mb-1.5">{tr.contact_form_message}</label>
                    <textarea
                      rows={4}
                      placeholder={pickByLang(lang, 'Хабарламаңыз...', 'Ваше сообщение...', 'Your message...', '您的留言...', 'Mesajınız...')}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-kasipker-navy-100 px-4 py-3 text-sm outline-none focus:border-kasipker-navy-700 transition-colors resize-none"
                    />
                  </div>
                  <label className="flex items-start gap-2.5 text-xs text-kasipker-navy-600">
                    <input
                      required
                      type="checkbox"
                      checked={agreedToOffer}
                      onChange={(e) => setAgreedToOffer(e.target.checked)}
                      className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer accent-kasipker-navy-700"
                    />
                    <span>
                      {pickByLang(
                        lang,
                        'Мен ',
                        'Я ознакомлен(а) с ',
                        'I have read and agree to the ',
                        '我已阅读并同意',
                        'Okudum ve kabul ediyorum: '
                      )}
                      <Link
                        href="/oferta"
                        target="_blank"
                        className="cursor-pointer font-semibold text-kasipker-navy-800 underline hover:text-kasipker-gold-600"
                      >
                        {pickByLang(
                          lang,
                          'жария офертамен (мүшелік туралы келісім)',
                          'публичной офертой (соглашением о членстве)',
                          'public offer (membership agreement)',
                          '公开要约（会员协议）',
                          'kamu teklifini (üyelik sözleşmesi)'
                        )}
                      </Link>
                      {pickByLang(
                        lang,
                        ' таныстым және оның шарттарын толық көлемде қабылдаймын.',
                        ' и принимаю её условия в полном объёме.',
                        ' and accept its terms in full.',
                        '的条款并完全接受其条款。',
                        '.'
                      )}
                    </span>
                  </label>
                  <button
                    type="submit"
                    disabled={!agreedToOffer}
                    className="btn-gold w-full py-4 text-base font-bold inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {pickByLang(lang, 'WhatsApp арқылы жіберу', 'Отправить через WhatsApp', 'Send via WhatsApp', '通过WhatsApp发送', 'WhatsApp ile Gönder')}
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial="hidden" animate="visible" custom={0.2} variants={fadeUp} className="flex flex-col gap-6">
            {/* Contact cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { Icon: MapPin, title: pickByLang(lang, 'Мекенжай', 'Адрес', 'Address', '地址', 'Adres'), text: officeAddress(lang), isAddress: true },
                { Icon: Mail, title: 'Email', text: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
                { Icon: Phone, title: pickByLang(lang, 'Телефон / WhatsApp', 'Телефон / WhatsApp', 'Phone / WhatsApp', '电话 / WhatsApp', 'Telefon / WhatsApp'), text: CONTACT_PHONE_DISPLAY, href: `tel:+${CONTACT_PHONE_DIGITS}` },
                { Icon: Globe, title: pickByLang(lang, 'Сайт', 'Сайт', 'Website', '网站', 'Web Sitesi'), text: 'kasipker.kz' },
                { Icon: InstagramIcon, title: 'Instagram', text: '@kasipker_kazakhstan', href: 'https://www.instagram.com/kasipker_kazakhstan', external: true },
                { Icon: YoutubeIcon, title: 'YouTube', text: '@kasipker.kazakhstan', href: 'https://www.youtube.com/@kasipker.kazakhstan', external: true },
              ].map((c, i) => {
                const Content = (
                  <>
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-kasipker-navy-50 text-kasipker-navy-700">
                      <c.Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-kasipker-navy-400 uppercase tracking-wider">{c.title}</p>
                      <p className={`font-semibold text-kasipker-navy-800 ${c.isAddress ? '' : 'truncate'}`}>{c.text}</p>
                      {c.isAddress && (
                        <div className="mt-2">
                          <Maps2GisButton />
                        </div>
                      )}
                    </div>
                  </>
                );
                return c.href ? (
                  <a
                    key={i}
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="card-kasipker flex items-center gap-4 cursor-pointer hover:border-kasipker-gold-400"
                  >
                    {Content}
                  </a>
                ) : (
                  <div key={i} className={`card-kasipker flex items-center gap-4 ${c.isAddress ? 'sm:col-span-2' : ''}`}>
                    {Content}
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            <blockquote className="rounded-2xl bg-kasipker-navy-900 p-6">
              <p className="text-kasipker-gold-400 text-xl font-black mb-3">"</p>
              <p className="text-white/85 italic text-sm leading-relaxed">
                {pickByLang(lang,
                  '«Бірге — күштіміз. Бірге — өрлейміз.»',
                  '«Вместе — мы сила. Вместе — мы развиваемся.»',
                  '"Together we are stronger. Together we grow."',
                  '"团结就是力量。团结才能共同发展。"',
                  '"Birlikte güçlüyüz. Birlikte gelişiyoruz."'
                )}
              </p>
              <p className="mt-3 text-xs text-white/50">— Kasipker Кәсіпкерлер Альянсы</p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
