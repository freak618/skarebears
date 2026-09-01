
import React, { useState, useEffect } from 'react';
import VUMeter from './VUMeter';
import type { Trait } from '../types';

interface CreatureDisplayProps {
  image: string | null;
  traits: Trait[];
  isLoading: boolean;
  error: string | null;
}

const LOADING_MESSAGES = [
  'Mixing down the track...',
  'Bouncing the stems...',
  'Applying compression...',
  'Calibrating the monitors...',
  'Adjusting the levels...',
  'Patching in the effects...',
  'Mastering the final cut...',
  'Rendering the waveform...',
];

const CreatureDisplay: React.FC<CreatureDisplayProps> = ({ image, traits, isLoading, error }) => {
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

  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border-2 border-gray-700/50 shadow-inner flex flex-col gap-4 sticky top-6 h-full min-h-[500px] font-roboto-mono">
      <div className="aspect-square bg-black/70 rounded-md flex items-center justify-center border-2 border-black relative overflow-hidden shadow-inner">
        {isLoading && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 p-4 text-center">
            <VUMeter />
            <p className="text-gray-300 mt-6 text-sm tracking-widest uppercase">{loadingMessage}</p>
          </div>
        )}
        {error && !isLoading && (
          <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center p-4 z-10">
            <p className="text-red-300 text-center font-semibold text-sm uppercase tracking-wider">{error}</p>
          </div>
        )}
        {!image && !isLoading && (
          <div className="text-center text-gray-700 p-4">
          </div>
        )}
        {image && <img src={image} alt="Generated Art" className="object-contain h-full w-full" />}
      </div>
      <div className="flex-grow min-h-[100px] bg-black/50 p-4 rounded-md border-2 border-black shadow-inner">
        <h3 className="text-sm uppercase text-gray-400 mb-3 tracking-widest">Track List:</h3>
        {traits.length > 0 ? (
           <div className="flex flex-col gap-1 text-sm max-h-[150px] overflow-y-auto pr-2">
            {traits.map((trait, index) => (
              <div key={trait.id} className="flex items-center gap-3">
                  <span className="text-gray-500 w-6 flex-shrink-0">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sky-400 font-bold w-12 flex-shrink-0">ID:{trait.id}</span>
                  <span className="text-gray-300 truncate">{trait.description}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic text-center py-4">NO TRACKS LOADED</p>
        )}
      </div>
    </div>
  );
};

export default CreatureDisplay;