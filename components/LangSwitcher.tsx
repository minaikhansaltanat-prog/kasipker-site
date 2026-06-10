'use client';
import { useLang } from '@/lib/LangContext';
import { LANGS, Lang } from '@/lib/translations';

interface Props {
  variant?: 'navbar' | 'footer';
  scrolled?: boolean;
  onSelect?: () => void;
}

export default function LangSwitcher({ variant = 'footer', scrolled = false, onSelect }: Props) {
  const { lang, setLang } = useLang();

  if (variant === 'navbar') {
    return (
      <div className="flex flex-wrap gap-1.5">
        {LANGS.map(l => (
          <button
            key={l.code}
            onClick={() => { setLang(l.code as Lang); onSelect?.(); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
              l.code === lang
                ? scrolled
                  ? 'bg-kasipker-navy-700 text-white'
                  : 'bg-white/20 text-white'
                : scrolled
                  ? 'text-kasipker-navy-700 hover:bg-kasipker-navy-50'
                  : 'text-white hover:bg-white/10'
            }`}
          >
            <span>{l.flag}</span>
            <span>{l.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {LANGS.map(l => (
        <button
          key={l.code}
          onClick={() => { setLang(l.code as Lang); onSelect?.(); }}
          className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-colors cursor-pointer ${
            l.code === lang
              ? 'bg-kasipker-gold-400 text-kasipker-gold-900'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          {l.flag} {l.label}
        </button>
      ))}
    </div>
  );
}
