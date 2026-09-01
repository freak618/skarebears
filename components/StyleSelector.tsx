import React, { useState, useRef, useEffect } from 'react';
import type { DrawingStyle } from '../types';
import StyleIcon from './StyleIcon';

interface StyleSelectorProps {
  styles: DrawingStyle[];
  selectedStyleId: number;
  onChange: (styleId: number) => void;
  isDisabled: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyleId, onChange, isDisabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedStyle = styles.find(s => s.id === selectedStyleId) || styles[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSelect = (styleId: number) => {
    onChange(styleId);
    setIsOpen(false);
  };

  return (
    <div className="relative font-roboto-mono">
      <span className="block text-xs uppercase tracking-widest text-center text-gray-400 mb-1">
        Style
      </span>
      <div ref={wrapperRef}>
        <button
          id="style-select-button"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isDisabled}
          className="relative w-full bg-black/70 border-2 border-gray-600 text-sky-300 rounded-md shadow-inner py-3 px-3 text-center focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="block truncate uppercase text-sm tracking-wider">{selectedStyle.name}</span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 w-full bg-gray-900 shadow-lg max-h-60 rounded-md py-1 text-base ring-2 ring-black ring-opacity-50 overflow-auto focus:outline-none sm:text-sm border-2 border-gray-700"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="style-select-button"
          >
            {styles.map((style) => (
              <li
                key={style.id}
                className="text-gray-300 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-sky-600/50"
                id={`style-option-${style.id}`}
                role="option"
                aria-selected={style.id === selectedStyleId}
                onClick={() => handleSelect(style.id)}
              >
                <div className="flex items-center">
                  <StyleIcon styleId={style.id} className="h-4 w-4 text-gray-500" />
                  <span className={`font-normal ml-3 block truncate text-xs uppercase tracking-wider ${style.id === selectedStyleId ? 'font-semibold text-white' : ''}`}>
                    {style.name}
                  </span>
                </div>

                {style.id === selectedStyleId && (
                  <span className="text-sky-400 absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StyleSelector;