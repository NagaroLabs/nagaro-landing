const MorphingShape = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="relative w-[800px] h-[800px]">
        {/* Outer Ring */}
        <div className="absolute inset-0 animate-spin-slow">
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-10">
            <defs>
              <linearGradient id="morphGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#666666" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="180" fill="none" stroke="url(#morphGradient1)" strokeWidth="0.5" strokeDasharray="10 5" />
          </svg>
        </div>
        
        {/* Middle Ring */}
        <div className="absolute inset-12 animate-reverse-spin">
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-15">
            <circle cx="200" cy="200" r="150" fill="none" stroke="url(#morphGradient1)" strokeWidth="0.5" strokeDasharray="20 10" />
          </svg>
        </div>
        
        {/* Inner Ring */}
        <div className="absolute inset-24 animate-spin-slower">
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-20">
            <circle cx="200" cy="200" r="120" fill="none" stroke="url(#morphGradient1)" strokeWidth="1" strokeDasharray="5 15" />
          </svg>
        </div>

        {/* Morphing Blob */}
        <div className="absolute inset-32 animate-morph">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <radialGradient id="blobGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <path
              d="M200,100 C280,100 300,180 300,200 C300,280 280,300 200,300 C120,300 100,280 100,200 C100,120 120,100 200,100"
              fill="url(#blobGradient)"
              className="animate-morph-path"
            />
          </svg>
        </div>

        {/* Pulsing Core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-white/30 animate-pulse-core shadow-[0_0_60px_20px_rgba(255,255,255,0.1)]" />
        </div>
      </div>
    </div>
  );
};

export default MorphingShape;
