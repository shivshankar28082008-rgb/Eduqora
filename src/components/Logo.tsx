import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const LOGO_URL = 'https://i.ibb.co/5XDt2S4M/Chat-GPT-Image-Aug-17-2026-10-46-32-AM.png';

export const Logo: React.FC<LogoProps> = ({ className = '', size = 34, showText = true }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div 
        style={{ width: size, height: size }} 
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-900/60 to-slate-900 border border-indigo-500/30 shadow-md shadow-indigo-500/20 text-white p-0.5 flex-shrink-0 transition-transform duration-300 hover:scale-105 overflow-hidden"
      >
        {!imgError ? (
          <img 
            src={LOGO_URL} 
            alt="Eduqora Logo" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain rounded-lg"
            onError={() => setImgError(true)}
          />
        ) : (
          <svg 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path 
              d="M8 20L15 13M8 20L15 27" 
              stroke="white" 
              strokeWidth="3.2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path 
              d="M32 20L25 13M32 20L25 27" 
              stroke="white" 
              strokeWidth="3.2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <circle 
              cx="20" 
              cy="19" 
              r="6" 
              stroke="#a5b4fc" 
              strokeWidth="2.8" 
            />
            <path 
              d="M23 22L29 29" 
              stroke="#67e8f9" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
            />
          </svg>
        )}
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
              Eduqora
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              Lab
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
