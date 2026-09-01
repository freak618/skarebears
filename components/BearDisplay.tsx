
import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import type { Trait } from '../types';
import DownloadIcon from './icons/DownloadIcon';
import TransparentIcon from './icons/TransparentIcon';
import TraitCategoryIcon from './icons/TraitCategoryIcon';
import { ALL_TRAIT_CATEGORIES } from '../constants/categories';
import type { TraitCategory } from '../constants/categories';

interface BearDisplayProps {
  image: string | null;
  traits: Trait[];
  isLoading: boolean;
  error: string | null;
  onMakeTransparent: () => void;
  isMakingTransparent: boolean;
  isLogoMode: boolean;
}

const LOADING_MESSAGES = [
  "Stitching flesh...",
  "Consulting the abyss...",
  "Carving arcane runes...",
  "Awakening nightmares...",
  "Channeling forgotten spirits...",
  "Breaching the veil...",
  "Calibrating torment matrix...",
  "Harvesting soul fragments...",
];

const getCategoryForTraitId = (traitId: number): TraitCategory | undefined => {
    return ALL_TRAIT_CATEGORIES.find(category => 
        traitId >= category.range.start && traitId <= category.range.end
    );
};

const GlitchingSkull: React.FC = () => {
    return (
      <div className="w-56 h-56 relative">
        <style>
          {`
            @keyframes glitch-line { 0%, 100% { opacity: 0; } 50% { opacity: 0.8; } }
            @keyframes glitch-block-1 { 2%, 64% { transform: translate(0, 0); } 65% { transform: translate(-2px, 2px); } 66% { transform: translate(2px, -3px); } 67% { transform: translate(0, 0); } }
            @keyframes glitch-block-2 { 5%, 59% { transform: translate(0, 0); } 60% { transform: translate(3px, 1px); } 61% { transform: translate(-1px, -2px); } 62% { transform: translate(0, 0); } }
            .glitch-line-1 { animation: glitch-line 1s steps(1, end) infinite; }
            .glitch-line-2 { animation: glitch-line 1.5s steps(1, end) infinite; }
            .glitch-block-1 { animation: glitch-block-1 3s infinite; }
            .glitch-block-2 { animation: glitch-block-2 5s infinite; }
          `}
        </style>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <clipPath id="skull-clip">
              <path d="M50 10 C 25 10, 20 30, 20 50 C 20 80, 30 90, 50 90 C 70 90, 80 80, 80 50 C 80 30, 75 10, 50 10 Z M 40 60 L 60 60 M 45 70 L 55 70" />
            </clipPath>
          </defs>
          {/* Main Skull */}
          <g className="glitch-block-1" fill="#d1c7b7">
            <path d="M50 10 C 25 10, 20 30, 20 50 C 20 80, 30 90, 50 90 C 70 90, 80 80, 80 50 C 80 30, 75 10, 50 10 Z" />
            <circle cx="35" cy="45" r="8" fill="black" />
            <circle cx="65" cy="45" r="8" fill="black" />
            <polygon points="47,60 53,60 50,52" fill="black" />
            <rect x="40" y="65" width="20" height="2" fill="black" />
            <rect x="38" y="70" width="4" height="6" fill="black" />
            <rect x="44" y="70" width="4" height="6" fill="black" />
            <rect x="52" y="70" width="4" height="6" fill="black" />
            <rect x="58" y="70" width="4" height="6" fill="black" />
          </g>
          {/* Glitch Overlay */}
          <g className="glitch-block-2" clipPath="url(#skull-clip)">
            <rect className="glitch-line-1" x="0" y="30" width="100" height="2" fill="#ff3333" />
            <rect className="glitch-line-2" x="0" y="55" width="100" height="3" fill="#00ff00" />
          </g>
        </svg>
      </div>
    );
};


const BearDisplay: React.FC<BearDisplayProps> = ({ image, traits, isLoading, error, onMakeTransparent, isMakingTransparent, isLogoMode }) => {
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);

  useEffect(() => {
    if (isLoading) {
      setLoadingMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
      const interval = setInterval(() => {
        setLoadingMessage(prevMessage => {
            let newMessage = prevMessage;
            while (newMessage === prevMessage) {
                newMessage = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
            }
            return newMessage;
        });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);
  
  const handleSave = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = 'skarebear-nightmare.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const anyLoading = isLoading || isMakingTransparent;

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-red-900/50 p-6 flex flex-col gap-4 sticky top-6 h-full min-h-[500px] font-roboto">
      <div className="aspect-square bg-black/70 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-800 relative overflow-hidden shadow-[inset_0_0_20px_black]">
        {isLoading && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 p-4 text-center">
            <GlitchingSkull />
            <p className="text-red-400 mt-6 font-bold text-lg tracking-widest uppercase font-roboto-mono">{loadingMessage}</p>
          </div>
        )}
         {isMakingTransparent && !isLoading && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 p-4 text-center">
            <Spinner />
            <p className="text-red-300 mt-4 font-semibold text-lg">Excising background...</p>
          </div>
        )}
        {error && !anyLoading && (
          <div className="absolute inset-0 bg-red-900/80 flex items-center justify-center p-4 z-10">
            <p className="text-red-200 text-center font-bold font-roboto-mono text-lg uppercase tracking-wider">{error}</p>
          </div>
        )}
        {!image && !anyLoading && (
          <div className="text-center text-gray-800 p-4">
            <p className="text-4xl font-black-ops text-gray-900" style={{textShadow: '1px 1px 0 #000'}}>AWAITING SUMMONS</p>
            <p className="text-gray-700 font-roboto-mono mt-2">Configure parameters and generate</p>
          </div>
        )}
        {image && <img src={image} alt="Generated Skarebear Concept" className="object-contain h-full w-full" />}
      </div>
       <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleSave}
          disabled={!image || anyLoading}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 border-2 border-gray-700 disabled:border-gray-800 rounded-lg text-green-400 disabled:text-gray-600 transition-colors p-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <DownloadIcon className="h-5 w-5" />
          <span className="font-roboto-mono text-sm font-bold">SAVE ARTIFACT</span>
        </button>
        <button
          onClick={onMakeTransparent}
          disabled={!image || anyLoading}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 border-2 border-gray-700 disabled:border-gray-800 rounded-lg text-purple-400 disabled:text-gray-600 transition-colors p-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isMakingTransparent ? (
            <svg className="animate-spin h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <TransparentIcon className="h-5 w-5" />
          )}
          <span className="font-roboto-mono text-sm font-bold">
            {isMakingTransparent ? 'ERASING...' : 'TO THE VOID'}
          </span>
        </button>
      </div>
      <div className="flex-grow min-h-[100px]">
        <h3 className="text-xl font-creepster text-red-500 mb-3 tracking-wider" style={{textShadow: '1px 1px 2px black'}}>INFERNAL BLUEPRINT:</h3>
        {traits.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 -mr-2">
            {traits.map((trait) => {
                const category = getCategoryForTraitId(trait.id);
                return (
                  <div key={trait.id} className="bg-black/50 border border-red-900/50 rounded-lg p-3 flex items-center gap-3 animate-fade-in transition-all duration-300 shadow-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-black/40 rounded-md flex items-center justify-center border-2 border-gray-800/50">
                          <TraitCategoryIcon categoryName={category?.name || 'Unknown'} className="h-6 w-6 text-red-500 opacity-70" />
                      </div>
                      <div className="flex-grow min-w-0">
                         <p className="text-xs text-gray-600 font-mono uppercase truncate" title={category?.name || 'Unknown Category'}>{category?.name || `ID: ${trait.id}`}</p>
                         <p className="font-roboto text-sm text-gray-300 truncate" title={trait.description}>{trait.description}</p>
                      </div>
                  </div>
                );
            })}
          </div>
        ) : (
          <p className="text-gray-700 italic">Blueprint is empty. The ritual requires components.</p>
        )}
      </div>
    </div>
  );
};

export default BearDisplay;