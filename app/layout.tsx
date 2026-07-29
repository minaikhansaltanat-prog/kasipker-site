import type { Metadata } from 'next';
import './globals.css';
import { LangProvider } from '@/lib/LangContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AIAssistant from '@/components/AIAssistant';
import MessengerWidget from '@/components/MessengerWidget';

export const metadata: Metadata = {
  title: {
    default: 'KASIPKER — Кәсіпкерлер Альянсы | Союз Предпринимателей Казахстана',
    template: '%s | KASIPKER',
  },
  description:
    'Kasipker — Казахстан кәсіпкерлерінің альянсы. Мүшелік, халықаралық серіктестік, заңдық қолдау, кластерлер. «Бірге — күштіміз.»',
  keywords: [
    'Kasipker', 'кәсіпкерлер альянсы', 'союз предпринимателей казахстан',
    'бизнес казахстан', 'мүшелік', 'НАП', 'Алматы', 'инвестиция',
  ],
  openGraph: {
    title: 'KASIPKER — Кәсіпкерлер Альянсы',
    description: '«Бірге — күштіміз. Бірге — өрлейміз.»',
    type: 'website',
    locale: 'kk_KZ',
    siteName: 'Kasipker',
  },
  metadataBase: new URL('https://kasipker.kz'),
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white antialiased">
        <LangProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
          <AIAssistant />
          <MessengerWidget />
        </LangProvider>
      </body>
    </html>
  );
}
