import React from 'react';

const Turntable: React.FC = () => {
  return (
    <div className="w-56 h-56 relative">
      {/* Turntable Base */}
      <svg viewBox="0 0 200 200" className="absolute inset-0">
        <rect x="10" y="10" width="180" height="180" rx="15" fill="#1f2937" />
        <rect x="15" y="15" width="170" height="170" rx="10" fill="#374151" stroke="#4b5563" strokeWidth="2" />
        
        {/* Tonearm Base */}
        <circle cx="170" cy="170" r="12" fill="#111827" />
        <circle cx="170" cy="170" r="8" fill="#4b5563" />

        {/* Tonearm */}
        <g transform="rotate(15, 100, 100)">
            <line x1="170" y1="170" x2="110" y2="70" stroke="#888" strokeWidth="4" strokeLinecap="round" />
            <line x1="110" y1="70" x2="100" y2="75" stroke="#888" strokeWidth="4" />
            <circle cx="98" cy="76" r="3" fill="#ccc" />
        </g>
        
        {/* Platter */}
        <circle cx="100" cy="100" r="80" fill="#111827" />
      </svg>
      
      {/* Spinning Record */}
      <div className="absolute inset-0 flex items-center justify-center record-spin">
        <svg viewBox="0 0 200 200" className="w-48 h-48">
          {/* Record vinyl */}
          <circle cx="100" cy="100" r="75" fill="black" stroke="#222" strokeWidth="1" />
          {/* Grooves */}
          <circle cx="100" cy="100" r="70" stroke="#333" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="60" stroke="#282828" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="50" stroke="#333" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="40" stroke="#282828" strokeWidth="1" fill="none" />
          
          {/* Label */}
          <circle cx="100" cy="100" r="35" fill="#f59e0b" />
          <circle cx="100" cy="100" r="33" fill="#d97706" />
          <text x="100" y="95" textAnchor="middle" fill="black" fontSize="10" fontWeight="bold" className="font-roboto-mono uppercase">GOTH</text>
          <text x="100" y="110" textAnchor="middle" fill="black" fontSize="10" fontWeight="bold" className="font-roboto-mono uppercase">HOP</text>
          
          {/* Spindle Hole */}
          <circle cx="100" cy="100" r="5" fill="white" />
          <circle cx="100"cy="100" r="4" fill="#1f2937" />
        </svg>
      </div>
    </div>
  );
};

export default Turntable;