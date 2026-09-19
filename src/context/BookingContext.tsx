import React, { createContext, useContext, useState, useEffect } from 'react';
import { FLEET_DATA, type Vehicle } from '../data/fleetData';

export type ServiceTypeId = 'airport' | 'executive' | 'hourly' | 'event' | 'city' | 'other';
export type TripType = 'one-way' | 'round-trip';

export interface BookingData {
  serviceType: ServiceTypeId | '';
  pickup: string;
  destination: string;
  stops: string[];
  date: string;
  time: string;
  tripType: TripType;
  passengers: number;
  luggage: number;
  flightNumber: string;
  hourlyDuration: number;
  eventType: string;
  selectedVehicleId: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequest: string;
  confirmationCode: string;
}

export interface OpenBookingOptions {
  vehicle?: Vehicle | null;
  vehicleId?: string;
  serviceType?: string;
  step?: 1 | 2 | 3;
}

interface BookingContextType {
  isOpen: boolean;
  currentStep: 1 | 2 | 3 | 4;
  bookingData: BookingData;
  openBooking: (options?: OpenBookingOptions) => void;
  closeBooking: () => void;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  updateBookingData: (updates: Partial<BookingData>) => void;
  resetBooking: () => void;
  selectedVehicle: Vehicle | undefined;
}

const DEFAULT_BOOKING_DATA: BookingData = {
  serviceType: '',
  pickup: '',
  destination: '',
  stops: [],
  date: '',
  time: '',
  tripType: 'one-way',
  passengers: 2,
  luggage: 2,
  flightNumber: '',
  hourlyDuration: 4,
  eventType: '',
  selectedVehicleId: 'bmw-x7-m60i',
  fullName: '',
  email: '',
  phone: '',
  specialRequest: '',
  confirmationCode: '',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [bookingData, setBookingData] = useState<BookingData>(DEFAULT_BOOKING_DATA);

  // Normalize service string
  const normalizeService = (s?: string): ServiceTypeId | '' => {
    if (!s) return '';
    const clean = s.toLowerCase().trim();
    if (clean.includes('airport')) return 'airport';
    if (clean.includes('exec') || clean.includes('corporate')) return 'executive';
    if (clean.includes('hour') || clean.includes('as-directed')) return 'hourly';
    if (clean.includes('event') || clean.includes('wedding')) return 'event';
    if (clean.includes('city') || clean.includes('long-distance')) return 'city';
    if (clean.includes('other')) return 'other';
    return 'airport';
  };

  const openBooking = (options?: OpenBookingOptions) => {
    setBookingData((prev) => {
      let next = { ...prev };
      if (options?.serviceType) {
        next.serviceType = normalizeService(options.serviceType);
      }
      if (options?.vehicle) {
        next.selectedVehicleId = options.vehicle.id;
      } else if (options?.vehicleId) {
        next.selectedVehicleId = options.vehicleId;
      }
      return next;
    });

    if (options?.step) {
      setCurrentStep(options.step);
    } else if (currentStep === 4) {
      // If previously submitted, reset back to step 1 for fresh journey
      setCurrentStep(1);
    }
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  const setStep = (step: 1 | 2 | 3 | 4) => {
    setCurrentStep(step);
  };

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  };

  const resetBooking = () => {
    setBookingData(DEFAULT_BOOKING_DATA);
    setCurrentStep(1);
  };

  // Lock body scroll smoothly when lightbox is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
        window.scrollTo({ top: scrollY, behavior: 'instant' });
      };
    }
  }, [isOpen]);

  const selectedVehicle =
    FLEET_DATA.find((v) => v.id === bookingData.selectedVehicleId) || FLEET_DATA[0];

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        currentStep,
        bookingData,
        openBooking,
        closeBooking,
        setStep,
        updateBookingData,
        resetBooking,
        selectedVehicle,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
