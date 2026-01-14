const CyberGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Grid Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cyberGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="gridFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="30%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="gridMask">
            <rect width="100%" height="100%" fill="url(#gridFade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#cyberGrid)" mask="url(#gridMask)" />
      </svg>

      {/* Scanning Line */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-scan-line" />
      
      {/* Vertical Accent Lines */}
      <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse-slow" />
      <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Corner Accents */}
      <div className="absolute top-20 left-10 w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/30 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
      <div className="absolute top-20 right-10 w-20 h-20">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-white/30 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
      <div className="absolute bottom-20 left-10 w-20 h-20">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white/30 to-transparent" />
        <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-white/30 to-transparent" />
      </div>
      <div className="absolute bottom-20 right-10 w-20 h-20">
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-white/30 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-white/30 to-transparent" />
      </div>
    </div>
  );
};

export default CyberGrid;
