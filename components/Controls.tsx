import React from 'react';
import SaveIcon from './icons/SaveIcon';
import LoadIcon from './icons/LoadIcon';
import LogoIcon from './icons/LogoIcon';
import SparklesIcon from './icons/SparklesIcon';

interface ControlsProps {
  onGenerate: () => void;
  isLoading: boolean;
  onSave: () => void;
  onLoad: () => void;
  isSaveDisabled: boolean;
  isLoadDisabled: boolean;
  isCoolingDown: boolean;
  cooldownTime: number;
  selectedTraitCount: number;
  randomTraitCount: number;
  onRandomTraitCountChange: (count: number) => void;
  isLogoMode: boolean;
  onToggleLogoMode: () => void;
  onRandomizeTraits: () => void;
  onFullRandomize: () => void;
}

const Controls: React.FC<ControlsProps> = ({ 
  onGenerate, 
  isLoading, 
  onSave,
  onLoad,
  isSaveDisabled,
  isLoadDisabled,
  isCoolingDown,
  cooldownTime,
  selectedTraitCount,
  randomTraitCount,
  onRandomTraitCountChange,
  isLogoMode,
  onToggleLogoMode,
  onRandomizeTraits,
  onFullRandomize
}) => {
  const anyGenerationDisabled = isLoading || isCoolingDown;

  const getButtonText = (baseText: string) => {
    if (isLoading) return 'SUMMONING...';
    if (isCoolingDown) return `RECHARGING... ${cooldownTime}s`;
    return baseText;
  };
  
  return (
    <div className="panel p-4">
      <div>
        <div className="flex gap-2 items-stretch">
          <button
            onClick={onGenerate}
            disabled={anyGenerationDisabled}
            className="flex-grow bg-red-900 hover:bg-red-800 disabled:bg-gray-800 border-2 border-red-700 disabled:border-gray-700 rounded-lg text-white disabled:text-gray-500 transition-all flex items-center justify-center text-lg font-bold p-3 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-red"
          >
            <span>{getButtonText('GENERATE')}</span>
          </button>
          <button
            onClick={onToggleLogoMode}
            disabled={anyGenerationDisabled}
            className={`w-16 h-auto flex-shrink-0 rounded-lg border-2 transition-colors flex flex-col items-center justify-center gap-1 p-1 text-xs disabled:opacity-50 disabled:cursor-not-allowed ${
              isLogoMode
                ? 'bg-green-900/50 border-green-700 text-green-300'
                : 'bg-gray-800 hover:bg-gray-700 border-gray-600 text-gray-500'
            }`}
            title="Toggle Logo Mode"
          >
            <LogoIcon className="h-5 w-5" />
            <span>BRAND</span>
          </button>
        </div>
        
      </div>

       <div className="mt-4 border-2 border-gray-900 rounded-lg p-3 bg-black/30">
        <label htmlFor="random-trait-slider" className="block mb-2 uppercase tracking-widest text-center text-gray-500 text-xs">
          RANDOM MUTATIONS: <span className="font-bold text-lg text-red-400">{randomTraitCount}</span>
        </label>
        <input
          id="random-trait-slider"
          type="range"
          min="1"
          max="20"
          value={randomTraitCount}
          onChange={(e) => onRandomTraitCountChange(Number(e.target.value))}
          disabled={anyGenerationDisabled}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed range-slider"
          aria-label="Number of random traits"
        />
        <div className="flex gap-2 mt-3">
            <button
            onClick={onRandomizeTraits}
            disabled={anyGenerationDisabled}
            className="flex-1 bg-purple-900 hover:bg-purple-800 disabled:bg-gray-800 border-2 border-purple-700 disabled:border-gray-700 rounded-lg text-white disabled:text-gray-500 transition-colors flex items-center justify-center text-xs font-bold p-2 disabled:opacity-50 disabled:cursor-not-allowed gap-2"
            >
                <SparklesIcon className="h-4 w-4" />
                <span>{getButtonText('MUTATE')}</span>
            </button>
            <button
            onClick={onFullRandomize}
            disabled={anyGenerationDisabled}
            className="flex-1 bg-red-900 hover:bg-red-800 disabled:bg-gray-800 border-2 border-red-700 disabled:border-gray-700 rounded-lg text-white disabled:text-gray-500 transition-colors flex items-center justify-center text-xs font-bold p-2 disabled:opacity-50 disabled:cursor-not-allowed gap-2"
            >
                <SparklesIcon className="h-4 w-4" />
                <span>{getButtonText('ANARCHY')}</span>
            </button>
        </div>
      </div>
      
      <div className="my-4 h-px bg-red-900/30"></div>

      <div className="flex items-center gap-4">
        <span className="text-xs uppercase tracking-widest text-gray-600">SPECIMEN</span>
         <div className="flex-grow h-px bg-red-900/30"></div>
        <button
          onClick={onSave}
          disabled={isLoading || isSaveDisabled}
          className="w-16 h-12 rounded-md bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 text-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          title="Save Nightmare"
        >
          <SaveIcon className="h-6 w-6" />
        </button>
        <button
          onClick={onLoad}
          disabled={anyGenerationDisabled || isLoadDisabled}
          className="w-16 h-12 rounded-md bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 text-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          title="Load Nightmare"
        >
          <LoadIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Controls;