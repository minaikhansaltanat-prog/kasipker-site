'use client';
import { useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { pickByLang } from '@/lib/translations';
import { CONTACT_PHONE_DIGITS, officeAddress } from '@/lib/contactInfo';

export type EventActionMode = 'register' | 'invite';

interface Props {
  eventName: string;
  mode: EventActionMode;
  onClose: () => void;
}

export default function EventActionModal({ eventName, mode, onClose }: Props) {
  const { lang } = useLang();
  const isInvite = mode === 'invite';

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [address, setAddress] = useState(officeAddress(lang));
  const [sent, setSent] = useState(false);
  const [waLink, setWaLink] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const title = isInvite
    ? pickByLang(lang, 'Қонақ шақыру', 'Приглашение гостя', 'Invite a Guest', '邀请嘉宾', 'Misafir Davet Et')
    : pickByLang(lang, 'Іс-шараға тіркелу', 'Регистрация на мероприятие', 'Event Registration', '活动报名', 'Etkinlik Kaydı');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isInvite) {
      const guestDigits = whatsapp.replace(/\D/g, '');
      const message = pickByLang(
        lang,
        `Құрметті ${name}!\n\nСізді «${eventName}» іс-шарасының${dateTime ? ` ${dateTime} күні өтетін` : ''} құрметті қонағы болуға шақырамыз.\nМекенжай: ${address}\n\n«${eventName}» іс-шарасының мақсаты — жаңа мүшелермен танысу, қоғамдық бірлестіктің жұмыстарымен танысу, серіктестік орнату және басқа да өзекті мәселелерді талқылау.\n\nKasipker Кәсіпкерлер Альянсы`,
        `Уважаемый(ая) ${name}!\n\nПриглашаем Вас стать почётным гостем мероприятия «${eventName}»${dateTime ? `, которое состоится ${dateTime}` : ''}.\nАдрес: ${address}\n\nЦель мероприятия «${eventName}» — знакомство с новыми членами, знакомство с работой объединения, налаживание партнёрства и обсуждение актуальных вопросов.\n\nСоюз предпринимателей Kasipker`,
        `Dear ${name},\n\nWe warmly invite you to be an honored guest at "${eventName}"${dateTime ? `, taking place on ${dateTime}` : ''}.\nAddress: ${address}\n\nThe purpose of "${eventName}" is to meet new members, learn about the alliance's work, build partnerships, and discuss relevant matters.\n\nKasipker Entrepreneurs Alliance`,
        `尊敬的${name}：\n\n诚邀您成为"${eventName}"活动的尊贵嘉宾${dateTime ? `，活动将于${dateTime}举行` : ''}。\n地点：${address}\n\n"${eventName}"活动旨在结识新会员、了解联盟工作、建立合作伙伴关系并探讨相关议题。\n\nKasipker企业家联盟`,
        `Sayın ${name},\n\nSizi "${eventName}" etkinliğinin${dateTime ? ` ${dateTime} tarihinde gerçekleşecek` : ''} onur konuğu olmaya davet ediyoruz.\nAdres: ${address}\n\n"${eventName}" etkinliğinin amacı yeni üyelerle tanışmak, derneğin çalışmalarını tanıtmak, ortaklıklar kurmak ve güncel konuları görüşmektir.\n\nKasipker Girişimciler İttifakı`
      );
      const link = `https://wa.me/${guestDigits}?text=${encodeURIComponent(message)}`;
      setWaLink(link);
      window.open(link, '_blank');
    } else {
      const message = pickByLang(
        lang,
        `Сәлеметсіз бе! «${eventName}» іс-шарасына тіркелгім келеді.\nАты-жөні: ${name}\nКомпания: ${company || '—'}\nТелефон: ${phone}\nWhatsApp: ${whatsapp}`,
        `Здравствуйте! Хочу зарегистрироваться на мероприятие «${eventName}».\nИмя: ${name}\nКомпания: ${company || '—'}\nТелефон: ${phone}\nWhatsApp: ${whatsapp}`,
        `Hello! I would like to register for "${eventName}".\nName: ${name}\nCompany: ${company || '—'}\nPhone: ${phone}\nWhatsApp: ${whatsapp}`,
        `您好！我想报名参加"${eventName}"活动。\n姓名：${name}\n公司：${company || '—'}\n电话：${phone}\nWhatsApp：${whatsapp}`,
        `Merhaba! "${eventName}" etkinliğine kayıt olmak istiyorum.\nAd Soyad: ${name}\nŞirket: ${company || '—'}\nTelefon: ${phone}\nWhatsApp: ${whatsapp}`
      );
      const link = `https://wa.me/${CONTACT_PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
      setWaLink(link);
      window.open(link, '_blank');
    }
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-kasipker-navy-900/50 backdrop-blur-sm px-4 pt-20 sm:pt-28 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white shadow-elevated overflow-hidden mb-10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-kasipker-navy-50 px-6 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-kasipker-gold-500">{eventName}</p>
            <h3 className="text-lg font-extrabold text-kasipker-navy-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-kasipker-navy-400 hover:bg-kasipker-navy-50 hover:text-kasipker-navy-800 transition-colors cursor-pointer"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-4 px-6 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <p className="font-bold text-kasipker-navy-900">
              {pickByLang(lang, 'WhatsApp ашылды', 'WhatsApp открыт', 'WhatsApp opened', 'WhatsApp已打开', 'WhatsApp açıldı')}
            </p>
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
            <button
              onClick={onClose}
              className="btn-outline mt-2 w-full cursor-pointer"
            >
              {pickByLang(lang, 'Жабу', 'Закрыть', 'Close', '关闭', 'Kapat')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-6">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-kasipker-navy-600">
                {isInvite
                  ? pickByLang(lang, 'Қонақтың аты-жөні', 'Имя гостя', "Guest's full name", '嘉宾姓名', 'Misafirin adı soyadı')
                  : pickByLang(lang, 'Аты-жөні', 'Имя', 'Full name', '姓名', 'Ad Soyad')} *
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded-xl border border-kasipker-navy-100 px-4 py-2.5 text-sm outline-none focus:border-kasipker-navy-700 transition-colors"
              />
            </div>

            {isInvite ? (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-kasipker-navy-600">
                    {pickByLang(lang, 'Күні мен уақыты', 'Дата и время', 'Date & time', '日期和时间', 'Tarih ve saat')}
                  </label>
                  <input
                    type="text"
                    value={dateTime}
                    onChange={e => setDateTime(e.target.value)}
                    placeholder={pickByLang(lang, 'мыс. 8 тамыз, сағат 19:00', 'напр. 8 августа, 19:00', 'e.g. Aug 8, 19:00', '例如：8月8日 19:00', 'örn. 8 Ağustos, 19:00')}
                    className="w-full rounded-xl border border-kasipker-navy-100 px-4 py-2.5 text-sm outline-none focus:border-kasipker-navy-700 transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-kasipker-navy-600">
                    {pickByLang(lang, 'Мекенжай', 'Адрес', 'Address', '地址', 'Adres')}
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-kasipker-navy-100 px-4 py-2.5 text-sm outline-none focus:border-kasipker-navy-700 transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-kasipker-navy-600">
                    {pickByLang(lang, 'Қонақтың WhatsApp нөмірі', 'WhatsApp гостя', "Guest's WhatsApp number", '嘉宾WhatsApp号码', 'Misafirin WhatsApp numarası')} *
                  </label>
                  <input
                    required
                    type="tel"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    placeholder="+7 7__ ___ ____"
                    className="w-full rounded-xl border border-kasipker-navy-100 px-4 py-2.5 text-sm outline-none focus:border-kasipker-navy-700 transition-colors"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-kasipker-navy-600">
                    {pickByLang(lang, 'Компания', 'Компания', 'Company', '公司', 'Şirket')}
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full rounded-xl border border-kasipker-navy-100 px-4 py-2.5 text-sm outline-none focus:border-kasipker-navy-700 transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-kasipker-navy-600">
                    {pickByLang(lang, 'Байланыс телефоны', 'Контактный телефон', 'Contact phone', '联系电话', 'İletişim telefonu')} *
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+7 7__ ___ ____"
                    className="w-full rounded-xl border border-kasipker-navy-100 px-4 py-2.5 text-sm outline-none focus:border-kasipker-navy-700 transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-kasipker-navy-600">
                    {pickByLang(lang, 'WhatsApp нөмірі', 'Номер WhatsApp', 'WhatsApp number', 'WhatsApp号码', 'WhatsApp numarası')} *
                  </label>
                  <input
                    required
                    type="tel"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    placeholder="+7 7__ ___ ____"
                    className="w-full rounded-xl border border-kasipker-navy-100 px-4 py-2.5 text-sm outline-none focus:border-kasipker-navy-700 transition-colors"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="btn-gold mt-1 w-full cursor-pointer inline-flex items-center justify-center gap-2"
            >
              {isInvite
                ? pickByLang(lang, 'Шақыруды жіберу', 'Отправить приглашение', 'Send Invitation', '发送邀请', 'Daveti Gönder')
                : pickByLang(lang, 'WhatsApp арқылы жіберу', 'Отправить через WhatsApp', 'Send via WhatsApp', '通过WhatsApp发送', 'WhatsApp ile Gönder')}
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
