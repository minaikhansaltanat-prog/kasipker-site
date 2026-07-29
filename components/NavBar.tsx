'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import { t, LANGS, Lang } from '@/lib/translations';
import SiteSearch from './SiteSearch';

export default function NavBar() {
  const { lang, setLang } = useLang();
  const tr = t[lang];
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [langOpen]);

  const navLinks = [
    { href: '/', label: tr.nav_home },
    { href: '/about', label: tr.nav_about },
    { href: '/personalities', label: tr.nav_personalities },
    { href: '/clusters', label: tr.nav_clusters },
    { href: '/international', label: tr.nav_international },
    { href: '/events', label: tr.nav_events },
    { href: '/gallery', label: tr.nav_gallery },
    { href: '/partners', label: tr.nav_partners },
    { href: '/media', label: tr.nav_media },
    { href: '/contact', label: tr.nav_contact },
  ];

  const currentLang = LANGS.find(l => l.code === lang) ?? LANGS[0];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-card py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="inline-flex bg-white rounded-full px-4 py-1.5 shadow-sm">
              <Image
                src="/logos/logo-main.png"
                alt="Kasipker"
                width={180}
                height={56}
                className="h-14 w-auto object-contain [mix-blend-mode:multiply]"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                  isActive(link.href)
                    ? scrolled
                      ? 'text-kasipker-navy-700'
                      : 'text-kasipker-gold-400'
                    : scrolled
                      ? 'text-kasipker-navy-800 hover:text-kasipker-navy-700 hover:bg-kasipker-navy-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-kasipker-gold-400" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <SiteSearch variant={scrolled ? 'dark' : 'light'} />

            {/* Language switcher */}
            <div className="relative" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition-colors cursor-pointer ${
                  scrolled
                    ? 'text-kasipker-navy-700 hover:bg-kasipker-navy-50'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <span>{currentLang.flag}</span>
                <span className="hidden sm:inline">{currentLang.label}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}>
                  <path d="M5 7L0 2h10z" />
                </svg>
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-1 rounded-xl bg-white shadow-elevated border border-kasipker-navy-100 overflow-hidden z-50 min-w-[120px]">
                  {LANGS.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code as Lang); setLangOpen(false); }}
                      className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-kasipker-navy-50 cursor-pointer ${
                        l.code === lang ? 'text-kasipker-navy-700 bg-kasipker-navy-50' : 'text-kasipker-navy-800'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <Link href="/contact" className="btn-gold hidden sm:inline-flex text-sm px-5 py-2.5 cursor-pointer">
              {tr.nav_cta}
            </Link>

            {/* Mobile burger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`xl:hidden flex flex-col justify-center gap-1.5 p-2 rounded-lg cursor-pointer ${
                scrolled ? 'text-kasipker-navy-800' : 'text-white'
              }`}
              aria-label="Menu"
            >
              <span className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="rounded-2xl bg-white shadow-elevated border border-kasipker-navy-100 overflow-hidden">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between px-5 py-3.5 text-sm font-semibold border-b border-kasipker-navy-50 last:border-b-0 transition-colors ${
                  isActive(link.href)
                    ? 'text-kasipker-navy-700 bg-kasipker-navy-50'
                    : 'text-kasipker-navy-800 hover:bg-kasipker-navy-50'
                }`}
              >
                {link.label}
                {isActive(link.href) && <span className="h-1.5 w-1.5 rounded-full bg-kasipker-gold-400" />}
              </Link>
            ))}
            <div className="p-4 border-t border-kasipker-navy-50">
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="btn-gold w-full text-sm cursor-pointer">
                {tr.nav_cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
