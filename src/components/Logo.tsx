import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  showTagline?: boolean;
}

// Determine base URL dynamically for root, subfolders, GitHub Pages, and Hostinger deployments
const getLogoUrl = () => {
  try {
    const rawBase = import.meta.env.BASE_URL || './';
    const cleanBase = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;
    return `${cleanBase}/assets/aistudio/51df364f-7587-436e-8c6e-7cd13ccd11f6_f68bf07f.jpg`;
  } catch {
    return './assets/aistudio/51df364f-7587-436e-8c6e-7cd13ccd11f6_f68bf07f.jpg';
  }
};

export const LOGO_URL = getLogoUrl();

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 34, 
  showText = true,
  showTagline = false,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(LOGO_URL);
  const [imgError, setImgError] = useState(false);

  const handleImgError = () => {
    if (imgSrc.includes('aistudio')) {
      setImgSrc('./assets/codevaible-logo.jpg');
    } else if (imgSrc.includes('codevaible-logo.jpg')) {
      setImgSrc('/logo.jpg');
    } else {
      setImgError(true);
    }
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div 
        style={{ width: size, height: size }} 
        className="relative flex items-center justify-center rounded-xl bg-white shadow-xs border border-slate-200/90 dark:border-slate-700/80 p-0.5 flex-shrink-0 transition-transform duration-300 hover:scale-105 overflow-hidden"
      >
        {!imgError ? (
          <img 
            src={imgSrc} 
            alt="Codevaible Logo" 
            className="w-full h-full object-contain rounded-lg"
            onError={handleImgError}
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
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif]">
              Codevaible
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              Lab
            </span>
          </div>
          {showTagline && (
            <span className="text-[8.5px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
              Learn • Build • Grow
            </span>
          )}
        </div>
      )}
    </div>
  );
};
