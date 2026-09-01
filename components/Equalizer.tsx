import React from 'react';

const Equalizer: React.FC = () => {
  const bars = [
    { delay: '0s' },
    { delay: '0.2s' },
    { delay: '0.4s' },
    { delay: '0.1s' },
    { delay: '0.5s' },
    { delay: '0.3s' },
    { delay: '0.15s' },
    { delay: '0.35s' },
    { delay: '0.55s' },
    { delay: '0.05s' },
  ];

  return (
    <div className="flex items-end justify-center h-24 w-56 space-x-1.5">
      {bars.map((bar, index) => (
        <div 
          key={index}
          className="vu-meter-bar w-4 bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-300 rounded-t-sm" 
          style={{ animationDelay: bar.delay }}
        ></div>
      ))}
    </div>
  );
};

export default Equalizer;
