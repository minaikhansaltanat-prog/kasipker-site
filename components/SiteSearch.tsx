'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, User, Layers, Globe, Handshake, Newspaper, FileText } from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/translations';
import { searchSite, SearchResult, SearchResultType } from '@/lib/searchIndex';

const TYPE_ICON: Record<SearchResultType, typeof User> = {
  personality: User,
  cluster: Layers,
  country: Globe,
  partner: Handshake,
  news: Newspaper,
  page: FileText,
};

export default function SiteSearch({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const { lang } = useLang();
  const tr = t[lang];
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const typeLabel = (type: SearchResultType) => {
    if (type === 'personality') return tr.nav_personalities;
    if (type === 'cluster') return tr.nav_clusters;
    if (type === 'country') return tr.nav_international;
    if (type === 'partner') return tr.nav_partners;
    if (type === 'news') return tr.media_tab_news;
    return tr.search_type_page;
  };

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 150);
    return () => clearTimeout(id);
  }, [query]);

  const results: SearchResult[] = searchSite(debounced, lang);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(v => !v);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={tr.search_open}
        className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors cursor-pointer ${
          variant === 'dark'
            ? 'text-kasipker-navy-700 hover:bg-kasipker-navy-50'
            : 'text-white hover:bg-white/10'
        }`}
      >
        <Search className="h-5 w-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-kasipker-navy-900/50 backdrop-blur-sm px-4 pt-20 sm:pt-28"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-3xl bg-white shadow-elevated overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Pill search input */}
            <div className="relative p-3">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={tr.search_placeholder}
                className="w-full rounded-full bg-kasipker-navy-50 py-3.5 pl-5 pr-14 text-sm text-kasipker-navy-900 placeholder:text-kasipker-navy-300 outline-none focus:ring-2 focus:ring-kasipker-gold-400/50 transition-shadow"
              />
              <button
                onClick={() => setOpen(false)}
                aria-label={tr.search_close}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-kasipker-navy-500 shadow-card hover:text-kasipker-navy-800 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto border-t border-kasipker-navy-50 px-2 pb-2">
              {debounced.trim().length < 2 && (
                <p className="px-4 py-8 text-center text-sm text-kasipker-navy-400">{tr.search_hint}</p>
              )}

              {debounced.trim().length >= 2 && results.length === 0 && (
                <div className="px-4 py-8 text-center">
                  <p className="font-semibold text-kasipker-navy-700">{tr.search_no_results}</p>
                  <p className="mt-1 text-sm text-kasipker-navy-400">{tr.search_no_results_hint}</p>
                </div>
              )}

              {results.map(r => {
                const Icon = TYPE_ICON[r.type];
                return (
                  <Link
                    key={r.id}
                    href={r.href}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-kasipker-navy-50 cursor-pointer"
                  >
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-kasipker-navy-50 text-kasipker-navy-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-kasipker-gold-500">{typeLabel(r.type)}</p>
                      <p className="truncate font-semibold text-kasipker-navy-900">{r.title}</p>
                      {r.subtitle && <p className="truncate text-xs text-kasipker-navy-400">{r.subtitle}</p>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
