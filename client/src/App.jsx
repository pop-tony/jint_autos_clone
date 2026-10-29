import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, ScrollToTop, buildPhoneHref } from './router';
import { INITIAL_CARS } from './data/cars';
import { DEFAULT_SITE_SETTINGS } from './data/siteDefaults';
import { HomePage } from './pages/HomePage';
import { InventoryPage } from './pages/InventoryPage';
import { CarDetailPage } from './pages/CarDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [cars, setCars] = useState(INITIAL_CARS);
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [bookingCar, setBookingCar] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  const handleBook = (car) => {
    setBookingCar(car);
    setShowBooking(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className={`${theme === 'dark' ? 'bg-[#0A0A0A] text-[#F5F3EF]' : 'bg-[#F5F3EF] text-[#0A0A0A]'} min-h-screen antialiased selection:bg-[#FFB400]/30`}>
        <style>{`
          @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)} }
        `}</style>

        <Header theme={theme} toggleTheme={toggleTheme} settings={siteSettings} />

        <main className="pb-10">
          <Routes>
            <Route path="/" element={<HomePage cars={cars} theme={theme} settings={siteSettings} onBook={handleBook} />} />
            <Route path="/inventory" element={<InventoryPage cars={cars} theme={theme} onBook={handleBook} />} />
            <Route path="/inventory/:id" element={<CarDetailPage cars={cars} theme={theme} settings={siteSettings} onBook={handleBook} />} />
            <Route path="/about" element={<AboutPage theme={theme} />} />
            <Route path="/contact" element={<ContactPage theme={theme} settings={siteSettings} />} />
            <Route path="/admin" element={<AdminPage cars={cars} setCars={setCars} theme={theme} settings={siteSettings} setSettings={setSiteSettings} />} />
            <Route
              path="*"
              element={
                <div className="mx-auto max-w-[800px] px-6 py-24 text-center">
                  <div className="text-[64px] font-black">404</div>
                  <p className="opacity-70">Page not found. Go to inventory.</p>
                  <Link to="/inventory" className="mt-6 inline-flex rounded-full bg-[#FFB400] px-6 py-3 text-black font-bold">
                    View Cars
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer theme={theme} settings={siteSettings} />
        <BookingModal car={bookingCar} open={showBooking} onClose={() => setShowBooking(false)} theme={theme} settings={siteSettings} />

        <a href={buildPhoneHref(siteSettings.phone)} aria-label={`Call ${siteSettings.brandName}`} className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#FFB400] text-black shadow-[0_12px_30px_rgba(0,0,0,0.3)] md:hidden">
          <Phone className="h-6 w-6" />
        </a>
      </div>
    </BrowserRouter>
  );
}
