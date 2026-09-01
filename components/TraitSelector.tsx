import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ALL_TRAIT_CATEGORIES } from '../constants/categories';
import type { TraitCategory } from '../constants/categories';
import SearchIcon from './icons/SearchIcon';
import ShuffleIcon from './icons/ShuffleIcon';

// --- Sub-component for individual category dropdowns ---
interface TraitCategorySelectorProps {
  category: TraitCategory;
  selectedIds: Set<number>;
  onToggle: (id: number) => void;
  onShuffle: () => void;
  isDisabled: boolean;
}

const TraitCategorySelector: React.FC<TraitCategorySelectorProps> = ({ category, selectedIds, onToggle, onShuffle, isDisabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedInCategory = useMemo(() => {
    return category.traits.filter(trait => selectedIds.has(trait.id));
  }, [category.traits, selectedIds]);

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

  const filteredTraits = useMemo(() => {
    if (!searchTerm) {
      return category.traits;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return category.traits.filter(trait =>
      trait.description.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm, category.traits]);
  
  const getButtonText = () => {
    if (selectedInCategory.length === 0) return category.name;
    if (selectedInCategory.length === 1) return selectedInCategory[0].description;
    return `${category.name} (${selectedInCategory.length} selected)`;
  };

  return (
    <div className="font-roboto-mono">
      <div className="flex gap-2">
        <div ref={wrapperRef} className="flex-grow relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            disabled={isDisabled}
            className="relative w-full bg-black/70 border-2 border-gray-700 text-red-300 rounded-md shadow-inner py-3 px-3 text-left focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
              <span className={`block truncate uppercase text-sm tracking-wider ${selectedInCategory.length === 0 ? 'text-gray-500' : ''}`}>
                  {getButtonText()}
              </span>
          </button>

          {isOpen && (
              <div className="absolute z-20 mt-1 w-full bg-gray-900 shadow-lg rounded-md ring-2 ring-black ring-opacity-50 border-2 border-gray-700">
                  <div className="p-2">
                      <div className="relative">
                          <input
                              ref={inputRef}
                              type="text"
                              placeholder={`Search ${category.name}...`}
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
                      className="max-h-60 overflow-y-auto focus:outline-none sm:text-sm py-1"
                      tabIndex={-1}
                      role="listbox"
                  >
                      {filteredTraits.map((trait) => (
                          <li key={trait.id}>
                              <label className={`flex items-center text-gray-400 text-xs p-2 rounded transition-colors w-full ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-gray-800/50'}`}>
                                  <input
                                      type="checkbox"
                                      checked={selectedIds.has(trait.id)}
                                      onChange={() => onToggle(trait.id)}
                                      disabled={isDisabled}
                                      className="scary-checkbox flex-shrink-0 mr-3"
                                  />
                                  <span className="text-gray-600 w-10 flex-shrink-0">{trait.id}.</span>
                                  <span className="flex-grow uppercase tracking-wider text-gray-300">{trait.description}</span>
                              </label>
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
            title={`Randomize ${category.name}`}
            aria-label={`Randomize ${category.name}`}
        >
            <ShuffleIcon className="h-5 w-5" />
            <span className="text-xs uppercase">Random</span>
        </button>
      </div>
    </div>
  );
};


// --- Main exported component ---
interface TraitSelectorProps {
    selectedIds: Set<number>;
    onToggle: (id: number) => void;
    isDisabled: boolean;
    onClear: () => void;
    onShuffleCategory: (category: TraitCategory) => void;
}

const TraitSelector: React.FC<TraitSelectorProps> = ({ selectedIds, onToggle, isDisabled, onClear, onShuffleCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchTerm) {
      return ALL_TRAIT_CATEGORIES;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return ALL_TRAIT_CATEGORIES
      .map(category => {
        // If the category name itself matches, show the whole category
        if (category.name.toLowerCase().includes(lowercasedFilter)) {
            return category;
        }
        // Otherwise, filter traits within the category
        const filteredTraits = category.traits.filter(trait =>
          trait.description.toLowerCase().includes(lowercasedFilter) ||
          String(trait.id).includes(lowercasedFilter)
        );
        return { ...category, traits: filteredTraits };
      })
      .filter(category => category.traits.length > 0);
  }, [searchTerm]);
  
  return (
    <div className="panel p-4">
      <h2 className="text-xl uppercase text-gray-500 mb-3 tracking-widest text-center font-creepster">Flesh-Weaving Panel</h2>
      
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search components or mutations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border-2 border-gray-700 rounded-md py-2 pl-10 pr-4 text-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
        </div>
        <div className="flex gap-2 mt-2">
            <button 
                onClick={onClear} 
                disabled={isDisabled || selectedIds.size === 0}
                className="text-xs uppercase bg-red-900/70 hover:bg-red-800/70 disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-gray-400 py-1 px-3 rounded-md transition-colors ml-auto">
                Purge All ({selectedIds.size})
            </button>
        </div>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 -mr-4">
        {filteredCategories.length > 0 ? filteredCategories.map((category) => (
            <TraitCategorySelector
                key={category.name}
                category={category}
                selectedIds={selectedIds}
                onToggle={onToggle}
                isDisabled={isDisabled}
                onShuffle={() => onShuffleCategory(category)}
            />
        )) : (
          <p className="text-gray-700 text-center py-4">No components found for "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
};

export default TraitSelector;