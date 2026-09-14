import React from 'react';

interface LanguageIconProps {
  id: string;
  size?: number;
  className?: string;
}

export const LanguageIcon: React.FC<LanguageIconProps> = ({ id, size = 24, className = '' }) => {
  const langId = id.toLowerCase();

  switch (langId) {
    case 'html':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          {/* HTML5 Orange Shield */}
          <path d="M5.5 3L8 28.5L16 30.5L24 28.5L26.5 3H5.5Z" fill="#E34F26"/>
          <path d="M16 5V28.3L22.3 26.7L24.4 5H16Z" fill="#EF652A"/>
          {/* Stylized '5' */}
          <path d="M9.5 8.5H22.5L22.1 12H13.5L13.8 15.5H21.7L21 23L16 24.5L11 23L10.7 19H14.1L14.3 20.7L16 21.2L17.7 20.7L17.9 18.5H10.5L9.5 8.5Z" fill="white"/>
        </svg>
      );

    case 'css':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          {/* CSS3 Blue Shield */}
          <path d="M5.5 3L8 28.5L16 30.5L24 28.5L26.5 3H5.5Z" fill="#2062AF"/>
          <path d="M16 5V28.3L22.3 26.7L24.4 5H16Z" fill="#2980D6"/>
          {/* Stylized '3' */}
          <path d="M9.5 8.5H22.5L22.2 12H13.6L13.8 14.5H21.9L21.2 23L16 24.5L10.8 23L10.5 19.5H13.9L14.1 20.8L16 21.3L17.9 20.8L18.1 17.5H10.4L9.5 8.5Z" fill="white"/>
        </svg>
      );

    case 'javascript':
    case 'js':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 rounded-md ${className}`}
        >
          {/* JS Yellow Badge */}
          <rect width="32" height="32" rx="4" fill="#F7DF1E"/>
          {/* Bold stylized JS glyph */}
          <path d="M9 16.5H12V21C12 22.5 11 23 9.5 23C8.2 23 7.3 22.4 7 21.6L8.8 20.4C9.1 20.8 9.5 21.2 10.1 21.2C10.6 21.2 10.8 21 10.8 20.2V16.5H9ZM16 16.5C18.5 16.5 20.5 17.5 20.5 19.5C20.5 21.5 19 22.2 17.5 22.7C16.2 23.1 15.6 23.3 15.6 23.8C15.6 24.2 16.1 24.5 17 24.5C18 24.5 18.8 24 19.3 23.2L21 24.3C20.1 25.6 18.6 26.2 16.8 26.2C14.2 26.2 12.5 25.1 12.5 23.2C12.5 21.3 13.9 20.5 15.5 20.1C16.8 19.7 17.3 19.5 17.3 19C17.3 18.6 16.9 18.3 16.2 18.3C15.3 18.3 14.6 18.7 14.1 19.3L12.5 18.1C13.4 16.9 14.7 16.5 16 16.5Z" fill="#1C1B18"/>
        </svg>
      );

    case 'python':
    case 'py':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          {/* Python Blue Top Snake */}
          <path d="M15.8 3C9.8 3 10.2 5.6 10.2 5.6L10.2 8.3H16V9.2H7.9C7.9 9.2 4 8.7 4 14.8C4 20.8 7.4 20.5 7.4 20.5H9.5V17.6C9.5 17.6 9.4 14.1 12.9 14.1H18.6C18.6 14.1 21.9 14.2 21.9 11L21.9 6.2C21.9 6.2 22.4 3 15.8 3ZM12.5 4.8C13.2 4.8 13.8 5.4 13.8 6.1C13.8 6.8 13.2 7.4 12.5 7.4C11.8 7.4 11.2 6.8 11.2 6.1C11.2 5.4 11.8 4.8 12.5 4.8Z" fill="#3776AB"/>
          {/* Python Yellow Bottom Snake */}
          <path d="M16.2 29C22.2 29 21.8 26.4 21.8 26.4L21.8 23.7H16V22.8H24.1C24.1 22.8 28 23.3 28 17.2C28 11.2 24.6 11.5 24.6 11.5H22.5V14.4C22.5 14.4 22.6 17.9 19.1 17.9H13.4C13.4 17.9 10.1 17.8 10.1 21L10.1 25.8C10.1 25.8 9.6 29 16.2 29ZM19.5 27.2C18.8 27.2 18.2 26.6 18.2 25.9C18.2 25.2 18.8 24.6 19.5 24.6C20.2 24.6 20.8 25.2 20.8 25.9C20.8 26.6 20.2 27.2 19.5 27.2Z" fill="#FFD43B"/>
        </svg>
      );

    case 'sql':
    case 'mysql':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          {/* Relational Database Cylinders */}
          <ellipse cx="16" cy="7" rx="11" ry="3.8" fill="#00758F"/>
          <ellipse cx="16" cy="7" rx="10" ry="3" fill="#00A1C9"/>
          
          <path d="M5 7V15C5 17.1 9.9 18.8 16 18.8C22.1 18.8 27 17.1 27 15V7C27 9.1 22.1 10.8 16 10.8C9.9 10.8 5 9.1 5 7Z" fill="#00758F"/>
          <path d="M5.5 14.5C6.5 16 10.8 17.5 16 17.5C21.2 17.5 25.5 16 26.5 14.5V15C26.5 17.1 21.8 18.8 16 18.8C10.2 18.8 5.5 17.1 5.5 15V14.5Z" fill="#F29111"/>

          <path d="M5 16V24C5 26.1 9.9 27.8 16 27.8C22.1 27.8 27 26.1 27 24V16C27 18.1 22.1 19.8 16 19.8C9.9 19.8 5 18.1 5 16Z" fill="#005E73"/>
          <ellipse cx="16" cy="24" rx="11" ry="3.8" fill="#00758F"/>
        </svg>
      );

    case 'c':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          {/* C Blue Hexagon */}
          <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" fill="#5C6BC0"/>
          <path d="M16 4.5L25.5 10.2V21.8L16 27.5L6.5 21.8V10.2L16 4.5Z" fill="#3949AB"/>
          {/* Centered 'C' */}
          <path d="M21 11.5C20 10.5 18.5 10 16.5 10C12.8 10 10.5 12.8 10.5 16C10.5 19.2 12.8 22 16.5 22C18.5 22 20 21.5 21 20.5L19.5 18.8C18.8 19.4 17.8 19.8 16.5 19.8C14.2 19.8 12.8 18.2 12.8 16C12.8 13.8 14.2 12.2 16.5 12.2C17.8 12.2 18.8 12.6 19.5 13.2L21 11.5Z" fill="white"/>
        </svg>
      );

    case 'cpp':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          {/* C++ Royal Blue Hexagon */}
          <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" fill="#00599C"/>
          <path d="M16 4.5L25.5 10.2V21.8L16 27.5L6.5 21.8V10.2L16 4.5Z" fill="#004482"/>
          {/* 'C++' Text */}
          <path d="M14 12C13.2 11.2 12 10.8 10.5 10.8C7.5 10.8 5.5 13 5.5 16C5.5 19 7.5 21.2 10.5 21.2C12 21.2 13.2 20.8 14 20L12.8 18.6C12.2 19.1 11.4 19.4 10.5 19.4C8.7 19.4 7.5 18 7.5 16C7.5 14 8.7 12.6 10.5 12.6C11.4 12.6 12.2 12.9 12.8 13.4L14 12Z" fill="white"/>
          {/* Plus signs */}
          <path d="M17.5 14.5H19V13H20.2V14.5H21.7V15.7H20.2V17.2H19V15.7H17.5V14.5Z" fill="#659AD2"/>
          <path d="M22.5 15.8H24V14.3H25.2V15.8H26.7V17H25.2V18.5H24V17H22.5V15.8Z" fill="#659AD2"/>
        </svg>
      );

    case 'java':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          {/* Crimson & Orange Steaming Cup */}
          <path d="M10 24C10 24 12 25.5 16 25.5C20 25.5 22 24 22 24C22 24 21 27 16 27C11 27 10 24 10 24Z" fill="#E76F00"/>
          <path d="M9 19.5C9 19.5 12 21.5 16 21.5C20 21.5 23 19.5 23 19.5C23 19.5 22 23 16 23C10 23 9 19.5 9 19.5Z" fill="#5382A1"/>
          {/* Vapor Streams */}
          <path d="M14.5 4C14.5 4 12.5 7 15 9C17.5 11 16 13 16 13C16 13 18 10.5 15.8 9C13.6 7.5 15.5 5.5 15.5 5.5" stroke="#E76F00" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M18 6C18 6 16.5 8.5 18.5 10C20.5 11.5 19 13.5 19 13.5C19 13.5 20.8 11.5 19 10C17.2 8.5 18.8 7 18.8 7" stroke="#5382A1" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M8 15C8 15 11.5 17 16 17C20.5 17 24 15 24 15C24 15 23 18 16 18C9 18 8 15 8 15Z" fill="#E76F00"/>
        </svg>
      );

    case 'php':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 ${className}`}
        >
          {/* PHP Indigo Stadium Oval */}
          <ellipse cx="16" cy="16" rx="14" ry="9" fill="#777BB4"/>
          {/* 'php' script */}
          <path d="M10 13H12.5C13.8 13 14.5 13.7 14.5 14.7C14.5 15.8 13.7 16.5 12.4 16.5H10.8L10 19.5H8.5L10 13ZM11.1 15.3H12.2C12.8 15.3 13.1 15 13.1 14.7C13.1 14.4 12.8 14.2 12.2 14.2H11.4L11.1 15.3ZM16 13H17.4L16.8 15.2C17.2 14.5 17.9 14.1 18.7 14.1C19.7 14.1 20.3 14.7 20.1 15.7L19.1 19.5H17.6L18.5 16C18.6 15.5 18.3 15.2 17.8 15.2C17.2 15.2 16.7 15.6 16.5 16.3L15.6 19.5H14.1L16 13ZM22 13H24.5C25.8 13 26.5 13.7 26.5 14.7C26.5 15.8 25.7 16.5 24.4 16.5H22.8L22 19.5H20.5L22 13ZM23.1 15.3H24.2C24.8 15.3 25.1 15 25.1 14.7C25.1 14.4 24.8 14.2 24.2 14.2H23.4L23.1 15.3Z" fill="white"/>
        </svg>
      );

    default:
      return (
        <div 
          style={{ width: size, height: size }}
          className={`flex items-center justify-center rounded bg-slate-800 text-indigo-400 font-mono font-bold text-xs ${className}`}
        >
          {id.slice(0, 3).toUpperCase()}
        </div>
      );
  }
};
