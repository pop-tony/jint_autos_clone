import React, { useState } from 'react';
import { MapPin, Phone, Clock3, MessageCircle, Camera } from 'lucide-react';
import { buildPhoneHref, buildWhatsAppHref } from '../router';

const INSTAGRAM_URL = 'https://www.instagram.com/accelerenmotorsghltd/';

export function ContactPage({ theme, settings }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const phoneLink = buildPhoneHref(settings.phone);
  const waLink = buildWhatsAppHref(
    settings.whatsapp,
    `Hello Acceleren Motors, Name: ${name || 'Guest'}, Phone: ${phone || 'N/A'}, Message: ${message || 'I would like to enquire about your vehicles.'}`
  );

  return (
    <div className="mx-auto max-w-[1320px] px-6 md:px-8 py-12 animate-[fadeUp_0.6s_ease]">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
        <div>
          <div className="text-[12px] tracking-[0.22em] opacity-60">CONTACT • GHANA</div>
          <h1 className="mt-3 text-[32px] md:text-[44px] font-[850] leading-[0.95] tracking-[-0.02em]">Tell us what you’re looking for.</h1>
          <p className="mt-4 max-w-[52ch] text-[14px] leading-7 opacity-70">Contact Acceleren Motors about local inventory, global sourcing, vehicle details or showroom directions.</p>

          <div className={`mt-8 rounded-[22px] border p-6 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
            <div className="grid gap-5 text-[14px]">
              <div className="flex gap-3"><MapPin className="h-5 w-5 text-[#FFB400] shrink-0" /> <span>Ghana — contact us for current showroom directions.</span></div>
              <div className="flex gap-3"><Phone className="h-5 w-5 text-[#FFB400] shrink-0" /> <span>{settings.phone}</span></div>
              <div className="flex gap-3"><Clock3 className="h-5 w-5 text-[#FFB400] shrink-0" /> <span>Contact us to confirm current opening hours.</span></div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={phoneLink} className="inline-flex h-11 items-center justify-center rounded-full bg-[#FFB400] px-6 text-[13px] font-bold text-black">Call Now</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex h-11 items-center justify-center gap-2 rounded-full border px-6 text-[13px] font-bold ${theme === 'dark' ? 'border-white/15' : 'border-black/15'}`}><Camera className="h-4 w-4" /> Instagram</a>
            </div>
          </div>
        </div>

        <div className={`rounded-[24px] border p-6 md:p-8 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
          <h2 className="text-[18px] font-bold">Send an enquiry</h2>
          <p className="mt-2 text-[13px] opacity-70">Your message opens in WhatsApp so you can review it and send it directly to the team.</p>

          <div className="mt-6 grid gap-4">
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className={`h-12 rounded-full border px-5 text-[14px] outline-none ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
            <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Your phone number" className={`h-12 rounded-full border px-5 text-[14px] outline-none ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Vehicle, budget or sourcing request" rows={5} className={`rounded-[20px] border p-4 text-[14px] outline-none resize-none ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FFB400] font-bold text-black text-[14px]">
              <MessageCircle className="h-5 w-5" /> Continue on WhatsApp
            </a>
            <div className="text-[11px] opacity-60 text-center">Please confirm live stock, pricing and location directly with Acceleren Motors.</div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-5 rounded-[24px] border border-dashed border-[#FFB400]/40 bg-[#FFB400]/5 px-6 py-6">
        <div>
          <div className="text-[11px] tracking-[0.2em] opacity-60">FOLLOW ACCELEREN MOTORS</div>
          <div className="mt-1 text-[16px] font-bold">See the latest arrivals and updates on Instagram.</div>
        </div>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFB400] px-5 py-3 text-[12px] font-bold text-black">
          <Camera className="h-4 w-4" /> @accelerenmotorsghltd
        </a>
      </div>
    </div>
  );
}
