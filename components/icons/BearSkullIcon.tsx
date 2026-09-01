import React from 'react';

const BearSkullIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="1.5"
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12 2C6.477 2 2 6.477 2 12v3a2 2 0 002 2h16a2 2 0 002-2v-3C22 6.477 17.523 2 12 2z"
        />
        <path
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9 10l-2 2m2-2l2 2m4 0l2-2m-2 2l-2-2m-2 5v2m4-2v2m-2-2h-1"
        />
        <path
             strokeLinecap="round" 
             strokeLinejoin="round" 
             d="M4.5 7.5a2 2 0 11-4 0 2 2 0 014 0z M23.5 7.5a2 2 0 11-4 0 2 2 0 014 0z"
        />
    </svg>
);

export default BearSkullIcon;