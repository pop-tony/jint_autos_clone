import React from 'react';
import { MapPin, Clock, Phone, MessageCircle, Camera } from 'lucide-react';
import { Link, buildPhoneHref, buildWhatsAppHref } from '../router';

const INSTAGRAM_URL = 'https://www.instagram.com/accelerenmotorsghltd/';

export function Footer({ theme, settings }) {
  const phoneLink = buildPhoneHref(settings.phone);
  const whatsappLink = buildWhatsAppHref(settings.whatsapp);

  return (
    <footer className={`mt-24 border-t ${theme === 'dark' ? 'border-white/10 bg-[#0A0A0A]' : 'border-black/10 bg-[#F5F3EF]'}`}>
      <div className="mx-auto max-w-[1320px] px-6 py-14 md:px-8 grid md:grid-cols-[1.4fr_0.8fr_0.8fr] gap-10">
        <div>
          <div className="flex items-center gap-3">
            <img src="/instagram/acceleren-profile-logo.jpg" alt="" className="h-10 w-10 rounded-full object-cover ring-1 ring-[#FFB400]/50" />
            <span className="font-[800] tracking-[0.12em] text-[13px]">{settings.brandName.toUpperCase()}</span>
          </div>
          <p className="mt-4 max-w-[38ch] text-[14px] leading-6 opacity-70">
            Luxury and performance automobiles. Explore local inventory or speak with our team about global sourcing.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-[13px]">
            <a href={phoneLink} className="inline-flex items-center gap-2 rounded-full bg-[#FFB400] px-4 py-2 font-bold text-black">
              <Phone className="h-4 w-4" /> {settings.phone}
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 ${theme === 'dark' ? 'border-white/15' : 'border-black/15'}`}>
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="text-[13px] leading-7 opacity-80">
          <div className="mb-3 font-bold tracking-[0.15em] text-[12px] opacity-100">VISIT & CONNECT</div>
          <div className="flex gap-2"><MapPin className="h-4 w-4 mt-1 shrink-0" /> {settings.address}</div>
          <div className="flex gap-2 mt-2"><Clock className="h-4 w-4 mt-1 shrink-0" /> {settings.hours}</div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 hover:opacity-100 opacity-80">
            <Camera className="h-4 w-4" /> Instagram
          </a>
        </div>

        <div className="text-[13px] leading-7 opacity-80">
          <div className="mb-3 font-bold tracking-[0.15em] text-[12px] opacity-100">QUICK LINKS</div>
          <div className="flex flex-col">
            <Link to="/inventory" className="hover:opacity-100 opacity-80">Vehicle collection</Link>
            <Link to="/about" className="hover:opacity-100 opacity-80">About Acceleren Motors</Link>
            <Link to="/contact" className="hover:opacity-100 opacity-80">Contact the team</Link>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-80">Follow on Instagram</a>
          </div>
        </div>
      </div>

      <div className={`border-t py-4 text-center text-[11px] tracking-wide opacity-60 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
        © {new Date().getFullYear()} {settings.brandName} • {settings.footerText}
      </div>
    </footer>
  );
}
