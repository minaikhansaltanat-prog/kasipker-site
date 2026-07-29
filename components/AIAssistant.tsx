'use client';
import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { t } from '@/lib/translations';

interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
}

export default function AIAssistant() {
  const { lang } = useLang();
  const tr = t[lang];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'bot', text: tr.ai_greeting }]);
    }
  }, [open, messages.length, tr.ai_greeting]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');

    // TODO: API дайын болғанда осы жерге нақты AI жауабын шақыру керек
    // (мыс. POST /api/assistant), setTimeout-ты алмастыру керек.
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: tr.ai_demo_reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating action button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={tr.ai_button_label}
        aria-expanded={open}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-kasipker-navy-700 to-kasipker-navy-900 text-white shadow-elevated transition-transform duration-300 hover:scale-105 cursor-pointer"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-kasipker-gold-400/30 animate-ping [animation-duration:2.5s]" />
        )}
        {open ? <X className="relative h-6 w-6" /> : <Bot className="relative h-6 w-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kasipker-gold-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-kasipker-gold-400" />
          </span>
        )}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-24 left-6 z-50 w-[92vw] max-w-sm origin-bottom-left overflow-hidden rounded-2xl border border-kasipker-navy-100 bg-white shadow-elevated transition-all duration-300 ${
          open ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-4 scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-kasipker-navy-800 to-kasipker-navy-700 px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <Sparkles className="h-5 w-5 text-kasipker-gold-300" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight text-white">{tr.ai_title}</p>
              <p className="flex items-center gap-1 text-[11px] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {tr.ai_status}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="cursor-pointer text-white/70 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="h-80 space-y-3 overflow-y-auto bg-kasipker-navy-50/50 px-4 py-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'rounded-br-sm bg-kasipker-navy-700 text-white'
                    : 'rounded-bl-sm border border-kasipker-navy-100 bg-white text-kasipker-navy-900 shadow-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Coming-soon badge */}
        <div className="border-t border-kasipker-navy-50 bg-white px-4 pb-2 pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-kasipker-gold-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-kasipker-gold-700">
            <span className="h-1.5 w-1.5 rounded-full bg-kasipker-gold-400" />
            {tr.ai_beta_badge}
          </span>
        </div>

        {/* Input */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 border-t border-kasipker-navy-100 bg-white p-3"
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={tr.ai_placeholder}
            className="flex-1 rounded-xl border border-kasipker-navy-100 bg-kasipker-navy-50/50 px-3.5 py-2.5 text-sm text-kasipker-navy-900 placeholder:text-kasipker-navy-300 focus:outline-none focus:ring-2 focus:ring-kasipker-gold-400/50"
          />
          <button
            type="submit"
            aria-label="Send"
            className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl bg-kasipker-gold-400 text-kasipker-gold-900 transition-colors hover:bg-kasipker-gold-500"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </>
  );
}
