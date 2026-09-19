import React from 'react';

interface SakhiEmblemProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withPulse?: boolean;
}

export const SakhiEmblem: React.FC<SakhiEmblemProps> = ({
  size = 'md',
  className = '',
  withPulse = false,
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {withPulse && (
        <span className="absolute inset-0 rounded-full bg-[#E58C8A]/25 animate-ping" />
      )}
      <div
        className={`${sizeMap[size]} rounded-2xl bg-gradient-to-br from-[#8C3A4E] via-[#A84960] to-[#E58C8A] p-[2px] shadow-sm flex items-center justify-center`}
      >
        <div className="w-full h-full bg-[#3B121E] rounded-[14px] flex items-center justify-center p-1.5 text-[#F7E7E2]">
          {/* Sacred Lotus Heart Waveform Emblem */}
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Outer Protective Care Petals */}
            <path
              d="M24 6C24 6 15 16 15 25C15 31.5 19.5 35 24 35C28.5 35 33 31.5 33 25C33 16 24 6 24 6Z"
              fill="url(#sakhi-petal-gradient)"
              fillOpacity="0.4"
            />
            {/* Left Lotus Leaf */}
            <path
              d="M24 35C17 35 9 29 9 21C9 14 18 19 24 35Z"
              fill="#E58C8A"
              fillOpacity="0.65"
            />
            {/* Right Lotus Leaf */}
            <path
              d="M24 35C31 35 39 29 39 21C39 14 30 19 24 35Z"
              fill="#E58C8A"
              fillOpacity="0.65"
            />
            {/* Central Heart Waveform Signal */}
            <path
              d="M17 26C17 21 24 16 24 16C24 16 31 21 31 26C31 30 27 34 24 36C21 34 17 30 17 26Z"
              fill="#FDEEE9"
            />
            {/* Gentle Signal Radiance Lines */}
            <circle cx="24" cy="25" r="2.5" fill="#8C3A4E" />
            <path
              d="M20 39C21.2 40 22.5 40.5 24 40.5C25.5 40.5 26.8 40 28 39"
              stroke="#FDEEE9"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <defs>
              <linearGradient
                id="sakhi-petal-gradient"
                x1="24"
                y1="6"
                x2="24"
                y2="35"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FAD4CD" />
                <stop offset="1" stopColor="#A84960" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};
