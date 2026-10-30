import React, { Suspense, useState } from 'react';
import { ChevronRight, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { Link, useNavigate, useParams, formatGHS, buildPhoneHref, buildWhatsAppHref } from '../router';
import { CarCard } from '../components/CarCard';

const VehicleShowroom = React.lazy(() =>
  import('../components/VehicleShowroom').then((module) => ({ default: module.VehicleShowroom })),
);

export function CarDetailPage({ cars, theme, settings, onBook }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((item) => item.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const phoneLink = buildPhoneHref(settings.phone);
  const whatsappLink = buildWhatsAppHref(
    settings.whatsapp,
    `Hello Acceleren Motors, I would like to enquire about the ${car?.year ? `${car.year} ` : ''}${car?.name}. Is this vehicle currently available?`
  );

  if (!car) {
    return (
      <div className="mx-auto max-w-[900px] px-6 py-24 text-center">
        <h2 className="text-[28px] font-bold">Car not found</h2>
        <p className="mt-2 opacity-70">This vehicle may no longer be listed. Contact the team for current inventory.</p>
        <Link to="/inventory" className="mt-6 inline-flex rounded-full bg-[#FFB400] px-6 py-3 text-black font-bold">Back to Inventory</Link>
      </div>
    );
  }

  const related = cars.filter((item) => item.category === car.category && item.id !== car.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-[1320px] px-6 md:px-8 pt-8 animate-[fadeUp_0.6s_ease]">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-[12px] tracking-wide opacity-70 hover:opacity-100">
        <ChevronRight className="h-4 w-4 rotate-180" /> Back
      </button>

      <div className="mt-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
        <div>
          <Suspense fallback={<div className="aspect-[16/11] animate-pulse rounded-[24px] bg-white/10" aria-label="Loading vehicle showroom" />}>
            <VehicleShowroom car={car} />
          </Suspense>
          {car.gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {car.gallery.map((image, index) => (
                <button key={image} onClick={() => setActiveImg(index)} className={`overflow-hidden rounded-[14px] aspect-[16/11] border-2 ${index === activeImg ? 'border-[#FFB400]' : 'border-transparent'}`} aria-label={`View ${car.name} photo ${index + 1}`}>
                  <img src={image} alt={`${car.name} photo ${index + 1}`} className="h-full w-full object-cover hover:scale-105 transition" loading="lazy" />
                </button>
              ))}
            </div>
          )}
          {car.instagramPost && (
            <a href={car.instagramPost} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-[12px] opacity-70 hover:opacity-100">
              View original Instagram post <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        <div>
          <div className="inline-flex gap-2">
            <span className="rounded-full bg-[#FFB400] px-3 py-1 text-[11px] font-bold text-black">{car.category}</span>
            <span className={`rounded-full border px-3 py-1 text-[11px] font-bold ${theme === 'dark' ? 'border-white/15' : 'border-black/15'}`}>{car.year || 'Year to confirm'} • {car.mileage}</span>
          </div>
          <h1 className="mt-4 text-[30px] md:text-[38px] font-[850] leading-[0.95] tracking-[-0.02em]">{car.name}</h1>
          <div className="mt-1 text-[14px] opacity-60">{car.model} • {car.color}</div>

          <div className="mt-6 flex items-baseline gap-3">
            <div className="text-[32px] font-[900]">{formatGHS(car.price)}</div>
            <div className="text-[12px] opacity-60 tracking-wide">CONFIRM PRICE & AVAILABILITY</div>
          </div>

          <p className="mt-5 text-[14px] leading-7 opacity-80">{car.description}</p>

          <div className={`mt-8 overflow-hidden rounded-[18px] border ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
            <div className={`grid grid-cols-2 text-[13px] divide-x divide-y ${theme === 'dark' ? 'divide-white/10' : 'divide-black/10'}`}>
              {[
                ['Engine', car.engine],
                ['Fuel', car.fuel],
                ['Transmission', car.transmission],
                ['Color', car.color],
                ['Mileage', car.mileage],
                ['Year', car.year || 'Contact to confirm'],
              ].map(([key, value]) => (
                <div key={key} className="flex justify-between gap-3 px-4 py-3">
                  <span className="opacity-60">{key}</span><span className="font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-[12px] tracking-[0.2em] opacity-60 font-bold">FEATURES</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {car.features.map((feature) => (
                <span key={feature} className={`rounded-full border px-3 py-1 text-[11px] ${theme === 'dark' ? 'border-white/15 bg-white/[0.04]' : 'border-black/10 bg-black/[0.03]'}`}>{feature}</span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button onClick={() => onBook(car)} className="h-12 rounded-full bg-[#FFB400] text-black font-bold text-[13px] inline-flex items-center justify-center gap-2">
              <MessageCircle className="h-4 w-4" /> Enquire
            </button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={`h-12 rounded-full border font-bold text-[13px] inline-flex items-center justify-center gap-2 ${theme === 'dark' ? 'border-white/15' : 'border-black/15'}`}>
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
          <a href={phoneLink} className={`mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border text-[13px] font-bold ${theme === 'dark' ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-black/[0.04]'}`}>
            <Phone className="h-4 w-4" /> Call {settings.phone}
          </a>
          <div className="mt-3 text-[11px] opacity-60 text-center">Contact Acceleren Motors to confirm specifications, price and current availability.</div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h3 className="text-[18px] font-bold tracking-wide">Related {car.category} vehicles</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <CarCard key={item.id} car={item} theme={theme} onBook={onBook} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
