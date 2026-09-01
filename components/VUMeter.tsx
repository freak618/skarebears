import React from 'react';

const VUMeter: React.FC = () => {
  return (
    <div className="flex items-end justify-center h-16 w-48 space-x-2">
      <div className="vu-meter-bar w-4 bg-gradient-to-t from-green-500 via-yellow-400 to-red-500 rounded-t-sm" style={{ animationDelay: '0s' }}></div>
      <div className="vu-meter-bar w-4 bg-gradient-to-t from-green-500 via-yellow-400 to-red-500 rounded-t-sm" style={{ animationDelay: '0.2s' }}></div>
      <div className="vu-meter-bar w-4 bg-gradient-to-t from-green-500 via-yellow-400 to-red-500 rounded-t-sm" style={{ animationDelay: '0.4s' }}></div>
      <div className="vu-meter-bar w-4 bg-gradient-to-t from-green-500 via-yellow-400 to-red-500 rounded-t-sm" style={{ animationDelay: '0.1s' }}></div>
      <div className="vu-meter-bar w-4 bg-gradient-to-t from-green-500 via-yellow-400 to-red-500 rounded-t-sm" style={{ animationDelay: '0.5s' }}></div>
      <div className="vu-meter-bar w-4 bg-gradient-to-t from-green-500 via-yellow-400 to-red-500 rounded-t-sm" style={{ animationDelay: '0.3s' }}></div>
    </div>
  );
};

export default VUMeter;
