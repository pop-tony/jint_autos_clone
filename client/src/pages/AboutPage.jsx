import React from 'react';

export function AboutPage({ theme }) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8 py-12 animate-[fadeUp_0.6s_ease]">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
        <div>
          <div className="text-[12px] tracking-[0.22em] opacity-60">ABOUT ACCELEREN MOTORS</div>
          <h1 className="mt-3 text-[32px] md:text-[44px] font-[850] tracking-[-0.02em] leading-[0.95]">Luxury and performance, brought closer.</h1>
          <p className="mt-5 text-[15px] leading-7 opacity-80">Acceleren Motors Ghana is a luxury and performance automobile dealership. The team presents local inventory and helps customers explore global sourcing for vehicles that match their requirements.</p>
          <p className="mt-4 text-[15px] leading-7 opacity-80">This website is an initial concept featuring vehicle photos from the dealership's Instagram profile. The generic labels are not a live stock list; contact the team to confirm current inventory, specifications, pricing and showroom directions.</p>
        </div>
        <div className={`rounded-[26px] border p-8 ${theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'}`}>
          <div className="text-[12px] tracking-[0.2em] opacity-60">OUR FOCUS</div>
          <div className="mt-5 grid gap-4">
            {[
              ['Luxury', 'A considered selection of premium automobiles.'],
              ['Performance', 'Vehicles chosen for an engaging drive and distinctive character.'],
              ['Global sourcing', 'A point of contact for customers searching beyond local inventory.'],
            ].map(([title, detail], index) => (
              <div key={title} className="flex items-start gap-4 rounded-[18px] border border-white/10 p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#FFB400] text-black font-bold">0{index + 1}</span>
                <div>
                  <div className="font-bold">{title}</div>
                  <div className="mt-1 text-[13px] leading-6 opacity-70">{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {[
          ['Start with a conversation', 'Tell the team what you are looking for and the features that matter to you.'],
          ['Explore available options', 'Ask about current local inventory or discuss a global sourcing request.'],
          ['Confirm the details', 'Verify availability, specification, pricing and location directly before making a decision.'],
        ].map(([title, desc]) => (
          <div key={title} className={`rounded-[22px] border p-6 ${theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'}`}>
            <div className="mb-4 h-11 w-11 rounded-full bg-[#FFB400] text-black grid place-items-center font-black">✓</div>
            <div className="text-[18px] font-bold">{title}</div>
            <div className="mt-2 text-[14px] leading-6 opacity-75">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
