import React from 'react';
import BearSkullIcon from './icons/BearSkullIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 rounded-t-lg bg-black/40 border-b-2 border-red-900/50">
      <div className="flex items-center justify-center gap-4">
        <BearSkullIcon className="h-10 w-10 md:h-12 md:w-12 text-red-600/70 -scale-x-100" />
        <div>
          <h1 className="text-5xl md:text-7xl text-gray-200 font-creepster tracking-[0.2em] animate-flicker" style={{ textShadow: '0 0 5px #ff4444, 0 0 15px #990000, 2px 2px 3px #000' }}>
            SKAREBEARS
          </h1>
          <p className="text-red-900 max-w-2xl mx-auto text-xs md:text-sm font-roboto-mono uppercase tracking-[0.4em] mt-1 font-bold">
            NIGHTMARE ENGINE
          </p>
        </div>
        <BearSkullIcon className="h-10 w-10 md:h-12 md:w-12 text-red-600/70" />
      </div>
    </header>
  );
};

export default Header;
