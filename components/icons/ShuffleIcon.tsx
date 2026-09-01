
import React from 'react';

const ShuffleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.036 3.964L7.964 12l8.072 8.036" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.964 3.964L16.036 12 7.964 20.036" />
  </svg>
);

export default ShuffleIcon;
