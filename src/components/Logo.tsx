import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showBorder?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  width = 40, 
  height = 40,
  showBorder = true
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`
        relative
        ${showBorder ? 'p-1' : ''}
        rounded-full
        ${showBorder ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : ''}
        flex items-center justify-center
        transition-transform duration-300 hover:scale-105
      `}>
        <div className={`
          ${showBorder ? 'bg-white' : ''}
          rounded-full
          p-0.5
          flex items-center justify-center
        `}>
          <img
            src="/logo.png"
            alt="AI Resume Builder Logo"
            width={width}
            height={height}
            className="rounded-full object-contain"
          />
        </div>
        {showBorder && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default Logo; 