'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Globe } from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t, pickByLang } from '@/lib/translations';
import LangSwitcher from './LangSwitcher';
import { InstagramIcon, YoutubeIcon, WhatsappIcon, TelegramIcon } from './icons/BrandIcons';
import Maps2GisButton from './Maps2GisButton';
import { CONTACT_EMAIL, CONTACT_PHONE_DIGITS, officeAddress } from '@/lib/contactInfo';

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/kasipker_kazakhstan', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.youtube.com/@kasipker.kazakhstan', label: 'YouTube', Icon: YoutubeIcon },
  { href: `https://wa.me/${CONTACT_PHONE_DIGITS}`, label: 'WhatsApp', Icon: WhatsappIcon },
  { href: `https://t.me/+${CONTACT_PHONE_DIGITS}`, label: 'Telegram', Icon: TelegramIcon },
];

const SocialLink = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-kasipker-gold-400 hover:text-kasipker-gold-900 transition-colors cursor-pointer"
  >
    {children}
  </a>
);

export default function Footer() {
  const { lang } = useLang();
  const tr = t[lang];

  return (
    <footer className="bg-kasipker-navy-900 text-white">
      {/* CTA strip */}
      <div className="border-b border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-kasipker-gold-400 mb-3">
            {tr.footer_slogan}
          </p>
          <h2 className="text-2xl font-extrabold text-white mb-6 md:text-3xl">
            {lang === 'kk' ? 'Kasipker Альянсына қосылыңыз' :
             lang === 'ru' ? 'Присоединяйтесь к Альянсу Kasipker' :
             lang === 'en' ? 'Join the Kasipker Alliance' :
             lang === 'zh' ? '加入Kasipker联盟' :
             'Kasipker Alliance\'a Katılın'}
          </h2>
          <Link href="/contact" className="btn-gold inline-flex px-8 py-4 text-base cursor-pointer">
            {tr.nav_cta}
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo + about */}
          <div className="lg:col-span-2">
            <div className="inline-flex bg-white rounded-2xl px-3 py-2 mb-4">
              <Image
                src="/logos/logo-main.png"
                alt="Kasipker"
                width={200}
                height={60}
                className="h-14 w-auto object-contain [mix-blend-mode:multiply]"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/70 max-w-sm">
              {pickByLang(
                lang,
                'Қазақстан кәсіпкерлерінің бірлескен платформасы. 1999 жылдан бері мүдделерді қорғап, бизнесті дамытып келеді.',
                'Объединённая платформа предпринимателей Казахстана. С 1999 года защищает интересы и развивает бизнес.',
                'The united platform for Kazakhstan\'s entrepreneurs. Protecting interests and developing business since 1999.',
                '哈萨克斯坦企业家的联合平台。自1999年以来一直致力于维护权益、发展商业。',
                "Kazakistan girişimcilerinin birleşik platformu. 1999'dan beri çıkarları koruyor ve işi geliştiriyor."
              )}
            </p>

            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <SocialLink key={label} href={href} label={label}>
                  <Icon className="h-5 w-5" />
                </SocialLink>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-kasipker-gold-400">
              {pickByLang(lang, 'Навигация', 'Навигация', 'Navigation', '导航', 'Navigasyon')}
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/', label: tr.nav_home },
                { href: '/about', label: tr.nav_about },
                { href: '/clusters', label: tr.nav_clusters },
                { href: '/events', label: tr.nav_events },
                { href: '/international', label: tr.nav_international },
                { href: '/media', label: tr.nav_media },
                { href: '/partners', label: tr.nav_partners },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-kasipker-gold-400 transition-colors cursor-pointer">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-kasipker-gold-400">
              {tr.nav_contact}
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-kasipker-gold-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span>{officeAddress(lang)}</span>
                  <div className="mt-1.5">
                    <Maps2GisButton />
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-kasipker-gold-400 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-kasipker-gold-400 transition-colors cursor-pointer">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Globe className="h-4 w-4 text-kasipker-gold-400 mt-0.5 flex-shrink-0" />
                <span>kasipker.kz</span>
              </li>
            </ul>

            {/* Lang switcher */}
            <div className="mt-6">
              <p className="mb-2 text-xs text-white/50 uppercase tracking-widest">
                {pickByLang(lang, 'Тіл', 'Язык', 'Language', '语言', 'Dil')}
              </p>
              <LangSwitcher variant="footer" />
            </div>
          </div>

          {/* QR code */}
          <div className="flex flex-col items-start md:items-end lg:items-start">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-kasipker-gold-400">
              {pickByLang(lang, 'Сайтты сканерлеңіз', 'Отсканируйте сайт', 'Scan the Site', '扫码访问网站', 'Siteyi Tarayın')}
            </h3>
            <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-elevated">
              <Image
                src="/images/qr-kasipker.png"
                alt={pickByLang(lang, 'Kasipker сайтының QR-коды', 'QR-код сайта Kasipker', 'Kasipker website QR code', 'Kasipker网站二维码', 'Kasipker web sitesi QR kodu')}
                width={280}
                height={351}
                className="h-auto w-32"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            &copy; 2026 Kasipker &mdash; {tr.footer_rights}
          </p>
          <p className="text-xs text-white/30 italic">
            {tr.footer_slogan}
          </p>
        </div>
      </div>
    </footer>
  );
}
