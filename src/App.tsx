import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LuxuryPageTransition } from './components/common/LuxuryPageTransition';
import { HomePage } from './pages/HomePage';
import { FleetPage } from './pages/FleetPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { BookingProvider, useBooking } from './context/BookingContext';
import { RequestRideLightbox } from './components/booking/RequestRideLightbox';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const { openBooking } = useBooking();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-ink-black font-sans flex flex-col justify-between selection:bg-champagne-gold selection:text-obsidian relative">
      {/* Subtle Grain Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => openBooking()}
      />

      <main className="flex-grow w-full">
        <LuxuryPageTransition pageKey={currentPage}>
          {currentPage === 'home' && (
            <HomePage
              onNavigate={handleNavigate}
              onOpenBooking={() => openBooking()}
            />
          )}

          {currentPage === 'fleet' && (
            <FleetPage
              onBookVehicle={(vehicle) => openBooking({ vehicle })}
              onOpenBooking={() => openBooking()}
            />
          )}

          {currentPage === 'services' && (
            <ServicesPage
              onOpenBooking={(serviceId) => openBooking({ serviceType: serviceId })}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'experience' && (
            <ExperiencePage
              onOpenBooking={() => openBooking()}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'about' && (
            <AboutPage
              onOpenBooking={() => openBooking()}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'destinations' && (
            <DestinationsPage
              onOpenBooking={() => openBooking()}
            />
          )}
        </LuxuryPageTransition>
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => openBooking()}
      />

      {/* GLOBAL REUSABLE CONCIERGE LIGHTBOX */}
      <RequestRideLightbox />
    </div>
  );
}

export function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}

export default App;
