import React, { useState, useEffect } from "react";
import { MapPin, Users, CheckCircle } from "lucide-react";

interface RequestRideTooltipProps {
  children: React.ReactNode;
}

const STEPS = [
  {
    icon: MapPin,
    title: "TELL US WHERE",
    desc: "Pick your route & date",
  },
  {
    icon: Users,
    title: "YOUR PARTY",
    desc: "Passengers, luggage & vehicle",
  },
  {
    icon: CheckCircle,
    title: "WE HANDLE THE REST",
    desc: "Chauffeur dispatched to you",
  },
];

export const RequestRideTooltip: React.FC<RequestRideTooltipProps> = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const STEP_DURATION = 1800;
    const TICK = 30;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += TICK;
      setProgress((elapsed / STEP_DURATION) * 100);
      if (elapsed >= STEP_DURATION) {
        elapsed = 0;
        setActiveStep((prev) => (prev + 1) % STEPS.length);
        setProgress(0);
      }
    }, TICK);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ride-tooltip-trigger relative inline-block">
      {children}

      {/* Tooltip card — appears below the button with high z-index and no clipping */}
      <div
        className="ride-tooltip absolute top-[calc(100%+14px)] right-0 z-[9999] w-[280px] shadow-2xl"
        role="tooltip"
      >
        {/* Arrow pointing UP towards the button */}
        <div className="absolute -top-1.5 right-8 w-3 h-3 bg-white rotate-45 border-l border-t border-silver-border z-10" />

        <div className="bg-white border border-silver-border shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-md overflow-hidden text-left">
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-silver-border bg-silver-cloud">
            <span className="text-[9px] tracking-[0.25em] uppercase text-champagne-gold font-mono font-medium">
              3 SIMPLE STEPS
            </span>
          </div>

          {/* Steps */}
          <div className="px-4 py-3 space-y-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;
              return (
                <div
                  key={step.title}
                  className={`flex items-start gap-3 transition-all duration-400 ${
                    isActive ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isActive
                        ? "bg-champagne-gold/15 text-champagne-gold"
                        : "bg-silver-mist text-ink-muted"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div
                      className={`text-[9px] tracking-[0.15em] uppercase font-semibold ${
                        isActive ? "text-ink-black" : "text-ink-muted"
                      }`}
                    >
                      {i + 1}. {step.title}
                    </div>
                    <div className="text-[10px] text-ink-secondary mt-0.5">{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="h-0.5 bg-silver-mist">
            <div
              className="h-full bg-champagne-gold transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
