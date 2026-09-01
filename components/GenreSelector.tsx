
import React, { useState, useMemo } from 'react';
import type { Genre } from '../types';
import { GENRES } from '../constants/genres';
import SearchIcon from './icons/SearchIcon';

interface GenreSelectorProps {
    selectedIds: number[];
    onToggle: (id: number) => void;
    isDisabled: boolean;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({ selectedIds, onToggle, isDisabled }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGenres = useMemo(() => {
        if (!searchTerm) {
            return GENRES;
        }
        const lowercasedFilter = searchTerm.toLowerCase();
        return GENRES.filter(genre =>
            genre.name.toLowerCase().includes(lowercasedFilter)
        );
    }, [searchTerm]);

    return (
        <div className="bg-gray-800/50 p-4 rounded-lg border-2 border-gray-700/50 shadow-inner font-roboto-mono">
            <h2 className="text-xl uppercase text-gray-400 mb-3 tracking-widest text-center">Genre Rack</h2>
            <p className="text-xs text-center text-gray-500 mb-3 -mt-2">Select up to 3 genres</p>
            
            <div className="mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search genres..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/50 border-2 border-gray-600 rounded-md py-2 pl-10 pr-4 text-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-500" />
                    </div>
                </div>
            </div>

            <ul className="space-y-1 max-h-[400px] overflow-y-auto pr-2 -mr-4">
                {filteredGenres.length > 0 ? filteredGenres.map(genre => (
                    <li key={genre.id}>
                        <label className={`flex items-center text-gray-400 text-xs p-2 rounded transition-colors ${isDisabled || (!selectedIds.includes(genre.id) && selectedIds.length >= 3) ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-gray-700/50'}`}>
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(genre.id)}
                                onChange={() => onToggle(genre.id)}
                                disabled={isDisabled || (!selectedIds.includes(genre.id) && selectedIds.length >= 3)}
                                className="appearance-none h-4 w-4 rounded-sm bg-gray-900 border-2 border-gray-600 checked:bg-purple-500 checked:border-purple-400 checked:shadow-[0_0_10px_rgba(168,85,247,0.7)] focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-sky-500 mr-3 transition-all duration-200 disabled:opacity-40"
                            />
                            <span className="flex-grow uppercase tracking-wider text-gray-300">{genre.name}</span>
                        </label>
                    </li>
                )) : (
                    <p className="text-gray-500 text-center py-4">No genres found for "{searchTerm}".</p>
                )}
            </ul>
        </div>
    );
};

export default GenreSelector;
