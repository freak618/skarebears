
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <svg 
      className="animate-spin h-10 w-10 text-red-400" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-4.09 2.454-7.613 6-9.2V2C4.648 2 2 4.648 2 8h2c0-2.206 1.794-4 4-4v2c-3.131 0-5.698 2.567-5.698 5.698h2.09c0-1.991 1.611-3.602 3.608-3.602v-2.09z M12 22v-2c2.206 0 4-1.794 4-4h2c0 3.352-2.648 6-6 6v-2z M17.698 14.302c-1.991 0-3.602-1.611-3.602-3.608h-2.09c0 3.131 2.567 5.698 5.698 5.698v-2.09z"
      />
      <circle
        cx="9" cy="12" r="1.5" fill="#000"
      />
      <circle
        cx="15" cy="12" r="1.5" fill="#000"
      />
    </svg>
  );
};

export default Spinner;
