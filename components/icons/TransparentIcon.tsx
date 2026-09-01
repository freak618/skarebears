
import React from 'react';

const TransparentIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4h4v4h-4z M16 8h4v4h-4z M4 12h4v4H4z M8 16h4v4H8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 10h4v4h-4z" />
    </svg>
);

export default TransparentIcon;
