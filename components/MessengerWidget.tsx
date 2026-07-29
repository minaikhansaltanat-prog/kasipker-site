'use client';
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/translations';
import { WhatsappIcon, TelegramIcon } from './icons/BrandIcons';

const CONTACT_PHONE_DIGITS = '77086279544';

export default function MessengerWidget() {
  const { lang } = useLang();
  const tr = t[lang];
  const [open, setOpen] = useState(false);

  const actions = [
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/${CONTACT_PHONE_DIGITS}`,
      Icon: WhatsappIcon,
      bg: 'bg-[#25D366]',
    },
    {
      key: 'telegram',
      label: 'Telegram',
      href: `https://t.me/+${CONTACT_PHONE_DIGITS}`,
      Icon: TelegramIcon,
      bg: 'bg-[#229ED9]',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {actions.map((a, i) => (
        <a
          key={a.key}
          href={a.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={a.label}
          style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
          className={`flex items-center gap-2 transition-all duration-300 ${
            open ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-4 opacity-0'
          }`}
        >
          <span className="whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-kasipker-navy-800 shadow-card">
            {a.label}
          </span>
          <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-white shadow-elevated transition-transform hover:scale-105 ${a.bg}`}>
            <a.Icon className="h-6 w-6" />
          </span>
        </a>
      ))}

      <button
        onClick={() => setOpen(v => !v)}
        aria-label={tr.messenger_button_label}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-kasipker-gold-400 to-kasipker-gold-500 text-kasipker-gold-900 shadow-elevated transition-transform duration-300 hover:scale-105 cursor-pointer"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-kasipker-gold-400/50 animate-ping [animation-duration:2.5s]" />
        )}
        {open ? <X className="relative h-6 w-6" /> : <MessageCircle className="relative h-6 w-6" />}
      </button>
    </div>
  );
}
