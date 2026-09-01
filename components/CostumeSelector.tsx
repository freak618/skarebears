
import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { Costume } from '../types';
import { COSTUMES } from '../constants/costumes';
import SearchIcon from './icons/SearchIcon';
import ShuffleIcon from './icons/ShuffleIcon';

interface CostumeSelectorProps {
  selectedCostumeId: number | null;
  onChange: (costumeId: number | null) => void;
  isDisabled: boolean;
  onShuffle: () => void;
}

const CostumeSelector: React.FC<CostumeSelectorProps> = ({ selectedCostumeId, onChange, isDisabled, onShuffle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedCostume = COSTUMES.find(c => c.id === selectedCostumeId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  
  useEffect(() => {
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
    } else {
        setSearchTerm(''); 
    }
  }, [isOpen]);

  const filteredCostumes = useMemo(() => {
    if (!searchTerm) {
      return COSTUMES;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return COSTUMES.filter(costume =>
      costume.name.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm]);

  const handleSelect = (costumeId: number | null) => {
    onChange(costumeId);
    setIsOpen(false);
  };

  return (
    <div className="relative font-roboto-mono">
       <span className="block text-xs uppercase tracking-widest text-center text-gray-500 mb-1">
        Disguise
      </span>
      <div className="flex gap-2">
        <div ref={wrapperRef} className="flex-grow relative">
          <button
            id="costume-select-button"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            disabled={isDisabled}
            className="relative w-full bg-black/70 border-2 border-gray-700 text-red-300 rounded-md shadow-inner py-3 px-3 text-center focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
              <span className={`block truncate uppercase text-sm tracking-wider ${selectedCostume ? '' : 'text-gray-500'}`}>
                  {selectedCostume?.name || 'NONE'}
              </span>
          </button>

          {isOpen && (
            <div className="absolute z-20 mt-1 w-full bg-gray-900 shadow-lg rounded-md ring-2 ring-black ring-opacity-50 border-2 border-gray-700">
              <div className="p-2">
                      <div className="relative">
                          <input
                              ref={inputRef}
                              type="text"
                              placeholder="Search costumes..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="w-full bg-black/50 border-2 border-gray-600 rounded-md py-2 pl-10 pr-4 text-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <SearchIcon className="h-5 w-5 text-gray-500" />
                          </div>
                      </div>
                  </div>
                  <ul
                      className="max-h-60 overflow-auto focus:outline-none sm:text-sm py-1"
                      tabIndex={-1}
                      role="listbox"
                      aria-labelledby="costume-select-button"
                  >
                      <li
                          className="text-gray-500 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-red-800/50"
                          role="option"
                          aria-selected={!selectedCostumeId}
                          onClick={() => handleSelect(null)}
                      >
                          <div className="flex items-center">
                              <span className="font-normal ml-3 block truncate italic uppercase text-xs">Clear (None)</span>
                          </div>
                      </li>
                      {filteredCostumes.map((costume) => (
                          <li
                          key={costume.id}
                          className="text-gray-300 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-red-800/50"
                          id={`costume-option-${costume.id}`}
                          role="option"
                          aria-selected={costume.id === selectedCostumeId}
                          onClick={() => handleSelect(costume.id)}
                          >
                          <div className="flex items-center">
                              <span className={`font-normal ml-3 block truncate text-xs uppercase ${costume.id === selectedCostumeId ? 'font-semibold text-white' : ''}`}>
                              {costume.name}
                              </span>
                          </div>

                          {costume.id === selectedCostumeId && (
                              <span className="text-red-400 absolute inset-y-0 right-0 flex items-center pr-4">
                                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                              </span>
                          )}
                          </li>
                      ))}
                  </ul>
              </div>
          )}
        </div>
        <button
            onClick={onShuffle}
            disabled={isDisabled}
            className="w-auto px-4 flex-shrink-0 rounded-md bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 text-red-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            title="Randomize Disguise"
            aria-label="Randomize Disguise"
        >
            <ShuffleIcon className="h-5 w-5" />
            <span className="text-xs uppercase">Random</span>
        </button>
      </div>
    </div>
  );
};

export default CostumeSelector;
