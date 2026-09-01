

import React from 'react';
import SparklesIcon from './SparklesIcon';

const Icon = ({ className, d }: { className?: string, d: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
);

const TraitCategoryIcon: React.FC<{ categoryName: string; className?: string }> = ({ categoryName, className }) => {
    switch (categoryName) {
        case 'Archetype': return <Icon className={className} d="M12 4a2 2 0 100-4 2 2 0 000 4zm-1 2h2v12h-2z M8 9h8 M8 15h8" />;
        case 'Material & Texture': return <Icon className={className} d="M4 6c3 0 3 3 6 3s3-3 6-3 3 3 6 3M4 12c3 0 3 3 6 3s3-3 6-3 3 3 6 3M4 18c3 0 3 3 6 3s3-3 6-3 3 3 6 3" />;
        case 'Face Paint & Markings': return <Icon className={className} d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM9 10h.01M15 10h.01M9 15h6M16 6L8 18" />;
        case 'Head & Features': return <Icon className={className} d="M5 10 C5 7 19 7 19 10 L19 12 C19 15 5 15 5 12 Z M9 10V7 M15 10V7" />;
        case 'Eyes (CRITICAL)': return <Icon className={className} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />;
        case 'Clothing & Attire': return <Icon className={className} d="M4 6l2-2h12l2 2v14H4z M12 4v16" />;
        case 'Props & Weapons': return <Icon className={className} d="M3 3l18 18m-9-1.5L3 10.5l9 9z" />;
        case 'Atmosphere & Effects': return <Icon className={className} d="M12 2v2m0 16v-2m8.07-8.07h-2M4.93 12h-2m14.14-7.07l-1.41 1.41M7.76 16.24l-1.41 1.41m14.14 0l-1.41-1.41M7.76 7.76L6.34 6.34M15 12a3 3 0 11-6 0 3 3 0 016 0z" />;
        case 'Elemental & Organic': return <Icon className={className} d="M17.657 18.657L13.414 14.414m2.828-2.828l4.243 4.243M12 21a9 9 0 110-18 9 9 0 010 18z" />;
        case 'Material & Texture II': return <Icon className={className} d="M4 6c3 0 3 3 6 3s3-3 6-3 3 3 6 3M4 12c3 0 3 3 6 3s3-3 6-3 3 3 6 3M4 18c3 0 3 3 6 3s3-3 6-3 3 3 6 3" />;
        default: return <Icon className={className} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />;
    }
};

export default TraitCategoryIcon;