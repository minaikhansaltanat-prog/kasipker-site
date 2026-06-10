'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang } from './translations';

const VALID_LANGS: Lang[] = ['kk', 'ru', 'en', 'zh', 'tr'];

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'kk',
  setLang: () => {},
});

function isValidLang(v: unknown): v is Lang {
  return typeof v === 'string' && (VALID_LANGS as string[]).includes(v);
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('kk');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kasipker_lang');
      if (isValidLang(saved)) setLangState(saved);
    } catch {
      // localStorage unavailable (SSR guard / private mode)
    }
  }, []);

  const setLang = (l: Lang) => {
    if (!isValidLang(l)) return;
    setLangState(l);
    try { localStorage.setItem('kasipker_lang', l); } catch { /* ignore */ }
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
