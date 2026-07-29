import { MapPin } from 'lucide-react';
import { GIS_2GIS_URL } from '@/lib/contactInfo';

export default function Maps2GisButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={GIS_2GIS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="2GIS"
      className={`inline-flex items-center gap-1.5 rounded-lg border border-[#12B025]/30 bg-[#12B025]/10 px-2.5 py-1 text-xs font-bold text-[#0E8A1D] transition-colors hover:bg-[#12B025] hover:text-white cursor-pointer ${className}`}
    >
      <MapPin className="h-3.5 w-3.5" />
      2ГИС
    </a>
  );
}
