import React from 'react';
import { X, ShieldCheck, FileText, LockKeyhole, CheckCircle2 } from 'lucide-react';

type LegalPolicyKind = 'privacy' | 'terms';

interface LegalPolicyModalProps {
  kind: LegalPolicyKind | null;
  onClose: () => void;
}

const PRIVACY_SECTIONS = [
  {
    title: '1. Who We Are',
    body: 'Faith Based Global Holdings Inc. ("FBGH," "we," "us," or "our") provides private transportation, chauffeur services, and vehicle rentals in the New York City and Philadelphia metropolitan areas. This Privacy Policy explains how we collect, use, disclose, and protect personal information when you visit our website, contact us, request a ride, or rent a vehicle.'
  },
  {
    title: '2. Information We Collect',
    body: 'Depending on how you interact with FBGH, we may collect your name, phone number, email address, billing and payment details, pickup and drop-off information, reservation and rental details, driver-license or government-identification information, insurance information, authorized-driver details, communications with our team, and information relating to damage, traffic, tolls, or incidents. We may also collect website information such as IP address, browser type, device information, pages viewed, and cookie or analytics information.'
  },
  {
    title: '3. How We Use Information',
    body: 'We use information to provide and manage reservations, verify identity and rental eligibility, coordinate chauffeurs and vehicles, process payments, communicate about a booking, provide customer support, administer deposits and charges, respond to incidents and claims, prevent fraud or misuse, improve our website and services, comply with law, and send service-related or marketing communications where permitted. We use only the information reasonably needed for these purposes.'
  },
  {
    title: '4. How We Share Information',
    body: 'We may share information with payment processors, reservation and technology providers, hosting and communications vendors, chauffeurs, dispatchers, vehicle or roadside partners, insurers, professional advisers, and companies that help us operate our services. We may also disclose information when required to comply with law, respond to lawful requests, protect safety or property, enforce an agreement, or investigate fraud. We do not sell personal information.'
  },
  {
    title: '5. Cookies and Analytics',
    body: 'Our website may use cookies and similar technologies to keep the site functioning, remember preferences, understand traffic, and improve performance. You can adjust cookie controls in your browser. If we add advertising or analytics tools that provide additional privacy choices, we will update this policy and provide any required notices.'
  },
  {
    title: '6. Retention and Security',
    body: 'We retain information for as long as reasonably necessary to provide services, maintain business and tax records, resolve disputes, address safety or insurance matters, enforce agreements, and meet legal obligations. We use reasonable administrative, technical, and organizational safeguards, but no method of storage or transmission is completely secure.'
  },
  {
    title: '7. Your Choices and Rights',
    body: 'You may contact us to request access to, correction of, or deletion of personal information, subject to legal and operational exceptions. You may opt out of marketing messages at any time by using the unsubscribe instruction or contacting us. Depending on your state of residence and applicable law, you may have additional rights, including the rights to know, correct, delete, opt out of sale or sharing, limit certain sensitive-information uses, and receive equal service when exercising a privacy right. We may verify your identity before completing a request.'
  },
  {
    title: '8. Children',
    body: 'Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. A parent or guardian who believes a child has provided information may contact us.'
  },
  {
    title: '9. Changes and Contact',
    body: 'We may update this policy as our services or legal obligations change. The revised version will be posted with a new "Last Updated" date. Questions or privacy requests may be sent to amfbgh@gmail.com or by phone at +1 (267) 642-4616. Effective date: September 18, 2026.'
  }
];

const TERMS_SECTIONS = [
  {
    title: '1. Scope and Agreement',
    body: 'These Terms of Service govern requests for private transportation, chauffeur services, and vehicle rentals arranged through Faith Based Global Holdings Inc. ("FBGH," "we," "us," or "our") in the New York City and Philadelphia metropolitan areas. A reservation is not final until FBGH confirms it. A signed rental agreement, quote, or service-specific terms may add to or replace these general terms for a particular booking.'
  },
  {
    title: '2. Eligibility and Verification',
    body: 'For self-drive rentals, the renter must generally be at least 21, hold a valid driver’s license, provide required proof of insurance and identification, and use an approved payment method. Additional age, vehicle, insurance, or verification requirements may apply. FBGH may decline or cancel a request when eligibility, documentation, payment authorization, vehicle availability, or safety cannot be confirmed.'
  },
  {
    title: '3. Reservations, Pricing, and Payment',
    body: 'Rates, mileage limits, taxes, deposits, delivery or pickup charges, cancellation terms, and other fees will be disclosed before confirmation when reasonably available. A deposit or authorization may be required. The renter authorizes FBGH and its payment providers to charge approved amounts under the reservation and signed rental agreement, including authorized extensions, damage, tolls, traffic violations, cleaning, fuel, late return, and other documented charges.'
  },
  {
    title: '4. Chauffeur Services',
    body: 'For chauffeur bookings, pickup times and locations are based on the confirmed itinerary. We may use flight or traffic information to coordinate service when provided. Delays caused by weather, traffic, airport restrictions, security procedures, events, or information outside FBGH’s control may affect timing. We will use reasonable efforts to communicate material changes and provide an appropriate vehicle or replacement option when available.'
  },
  {
    title: '5. Vehicle Use and Care',
    body: 'Only authorized drivers may operate a rental vehicle. Vehicles must be used lawfully and with reasonable care. Racing, reckless driving, towing, smoking or vaping, illegal activity, off-road use, sub-rental, unauthorized commercial use, and use outside approved geographic or contractual limits are prohibited. The renter must promptly report accidents, damage, theft, mechanical issues, and violations and must not admit liability or make repairs without authorization except when necessary for safety.'
  },
  {
    title: '6. Return, Extensions, and Charges',
    body: 'A vehicle must be returned at the agreed time, location, condition, and fuel level. Extensions require prior approval and may change the rate or availability. FBGH may recover reasonable charges for late return, additional mileage, missing equipment, fuel, cleaning, damage, loss of use, tolls, parking, traffic violations, administrative processing, and other amounts allowed by the rental agreement and applicable law.'
  },
  {
    title: '7. Cancellation and Changes',
    body: 'Cancellation and change terms depend on the service, vehicle, timing, and confirmed quote or rental agreement. If FBGH must cancel because a vehicle or chauffeur is unavailable, we will make reasonable efforts to offer an alternative or refund amounts paid for the unavailable service. Nothing in these terms limits rights that cannot legally be waived.'
  },
  {
    title: '8. Responsibility and Limits',
    body: 'To the extent permitted by law, FBGH is not responsible for indirect or consequential loss caused by events outside its reasonable control, including severe weather, road closures, public emergencies, airport restrictions, mechanical failure, or third-party acts. Nothing in these terms excludes liability for fraud, willful misconduct, gross negligence, personal injury caused by negligence, or any other liability that applicable New York or Pennsylvania law does not allow us to exclude.'
  },
  {
    title: '9. Governing Law and Contact',
    body: 'These terms are governed by the laws applicable to the FBGH service location and the applicable New York or Pennsylvania law, without regard to conflict-of-law rules. Any dispute will be handled in a court with proper jurisdiction, subject to any rights or procedures required by law. Questions may be sent to amfbgh@gmail.com or +1 (267) 642-4616. Effective date: September 18, 2026.'
  }
];

export const LegalPolicyModal: React.FC<LegalPolicyModalProps> = ({ kind, onClose }) => {
  if (!kind) return null;

  const isPrivacy = kind === 'privacy';
  const sections = isPrivacy ? PRIVACY_SECTIONS : TERMS_SECTIONS;
  const title = isPrivacy ? 'FBGH Privacy Policy' : 'FBGH Terms of Service';
  const subtitle = isPrivacy ? 'HOW WE HANDLE YOUR INFORMATION' : 'PRIVATE TRANSPORTATION & VEHICLE RENTAL';
  const Icon = isPrivacy ? LockKeyhole : FileText;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="legal-policy-title">
      <button type="button" onClick={onClose} aria-label="Close policy" className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-default" />
      <div className="relative z-10 w-full max-w-3xl max-h-[86vh] overflow-hidden rounded-xl border border-[#E0A852]/30 bg-[#0D0A08] text-[#F4EDE4] shadow-[0_24px_60px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/40 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E0A852]/40 bg-[#E0A852]/15">
              <Icon className="h-4 w-4 text-[#E0A852]" />
            </div>
            <div>
              <h2 id="legal-policy-title" className="font-display text-lg font-bold uppercase tracking-wide">{title}</h2>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#E0A852]">{subtitle}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[#E0A852] hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[68vh] overflow-y-auto px-6 py-6 sm:px-8">
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-[#E0A852]/20 bg-[#E0A852]/10 p-4 text-xs leading-relaxed text-[#E0A852]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <span>This is a practical website draft for FBGH’s New York City and Philadelphia operations. Have counsel review it against your final company structure, vendors, insurance, and collection practices before publication.</span>
          </div>
          <div className="space-y-7">
            {sections.map((section) => (
              <section key={section.title}>
                <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-[0.12em] text-[#E0A852]">{section.title}</h3>
                <p className="text-xs leading-relaxed text-[#F4EDE4]/85 sm:text-[13px]">{section.body}</p>
              </section>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-black/40 px-6 py-4">
          <span className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#E0A852] sm:inline-flex"><CheckCircle2 className="h-3.5 w-3.5" /> PEOPLE · PURPOSE · PROSPERITY</span>
          <button type="button" onClick={onClose} className="pb-btn pb-btn-primary !px-5 !py-2 !text-xs">UNDERSTOOD</button>
        </div>
      </div>
    </div>
  );
};
