'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Globe } from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/translations';
import LangSwitcher from './LangSwitcher';

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
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo + about */}
          <div className="lg:col-span-2">
            <Image
              src="/logos/logo-main.png"
              alt="Kasipker"
              width={160}
              height={48}
              className="h-12 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-white/70 max-w-sm">
              {lang === 'kk' ? 'Қазақстан кәсіпкерлерінің бірлескен платформасы. 1999 жылдан бері мүдделерді қорғап, бизнесті дамытып келеді.' :
               lang === 'ru' ? 'Объединённая платформа предпринимателей Казахстана. С 1999 года защищает интересы и развивает бизнес.' :
               'The united platform for Kazakhstan\'s entrepreneurs. Protecting interests and developing business since 1999.'}
            </p>

            <div className="mt-6 flex gap-3">
              <SocialLink href="https://facebook.com" label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://instagram.com" label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </SocialLink>
              <SocialLink href="https://t.me" label="Telegram">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.92c-.12.56-.46.7-.92.44l-2.56-1.88-1.24 1.2c-.14.14-.26.26-.52.26l.18-2.62 4.74-4.28c.2-.18-.04-.28-.32-.1L7.46 14.5l-2.5-.78c-.54-.17-.55-.54.12-.8l9.8-3.78c.44-.16.84.1.76.66z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://youtube.com" label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
                </svg>
              </SocialLink>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-kasipker-gold-400">
              {lang === 'kk' ? 'Навигация' : lang === 'ru' ? 'Навигация' : 'Navigation'}
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/', label: tr.nav_home },
                { href: '/about', label: tr.nav_about },
                { href: '/personalities', label: tr.nav_personalities },
                { href: '/clusters', label: tr.nav_clusters },
                { href: '/international', label: tr.nav_international },
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
                <span>Алматы, Қазақстан</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-kasipker-gold-400 mt-0.5 flex-shrink-0" />
                <span>info@kasipker.kz</span>
              </li>
              <li className="flex items-start gap-2">
                <Globe className="h-4 w-4 text-kasipker-gold-400 mt-0.5 flex-shrink-0" />
                <span>kasipker.kz</span>
              </li>
            </ul>

            {/* Lang switcher */}
            <div className="mt-6">
              <p className="mb-2 text-xs text-white/50 uppercase tracking-widest">
                {lang === 'kk' ? 'Тіл' : lang === 'ru' ? 'Язык' : 'Language'}
              </p>
              <LangSwitcher variant="footer" />
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
