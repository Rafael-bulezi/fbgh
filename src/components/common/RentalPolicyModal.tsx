import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface RentalPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RENTAL_POLICY_ITEMS = [
  'Renters must be at least 21 years old and present a valid driver’s license, proof of insurance, and an approved payment method.',
  'A refundable security deposit may be required before the vehicle is released.',
  'Only drivers listed on the rental agreement may operate the vehicle.',
  'Vehicles must be returned on time, in the same condition, and with the same fuel level.',
  'Smoking, vaping, racing, towing, illegal activity, and unauthorized use are strictly prohibited.',
  'Renters are responsible for damage, tolls, traffic violations, cleaning fees, late fees, and any other charges incurred during the rental period.',
  'Mileage limits, cancellation terms, deposits, and additional fees will be disclosed before the rental is confirmed.',
  'Vehicle availability is not guaranteed until the reservation is confirmed.',
];

export const RentalPolicyModal: React.FC<RentalPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fade-in" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0D0A08] border border-[#E0A852]/30 rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 text-[#F4EDE4]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E0A852]/15 border border-[#E0A852]/40 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#E0A852]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg tracking-wide uppercase text-[#F4EDE4]">
                FBGH Rental Car Policy
              </h3>
              <p className="font-mono text-[9px] tracking-[0.25em] text-[#E0A852] uppercase">
                FAITH BASED GLOBAL HOLDINGS INC.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-[#E0A852] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Policy Content */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="p-3.5 rounded-lg bg-[#E0A852]/10 border border-[#E0A852]/20 flex items-center gap-3 text-xs text-[#E0A852]">
            <FileText className="w-4 h-4 shrink-0" />
            <span>Please review our rental terms and conditions prior to reservation dispatch.</span>
          </div>

          <ul className="space-y-3.5 pt-2 font-sans text-xs sm:text-[13px] leading-relaxed text-[#F4EDE4]/90">
            {RENTAL_POLICY_ITEMS.map((policy, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#E0A852] shrink-0 mt-0.5" />
                <span>{policy}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 mt-4 border-t border-white/10 text-center font-sans text-xs text-white/60 italic">
            All rentals are subject to FBGH approval and the terms of the signed rental agreement.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-widest text-[#E0A852] uppercase">
            PEOPLE · PURPOSE · PROSPERITY
          </span>
          <button
            onClick={onClose}
            className="pb-btn pb-btn-primary !px-5 !py-2 !text-xs cursor-pointer"
          >
            UNDERSTOOD
          </button>
        </div>
      </div>
    </div>
  );
};
