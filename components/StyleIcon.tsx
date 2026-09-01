import React from 'react';

interface StyleIconProps {
  styleId: number;
  className?: string;
}

const CubeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const SprayCanIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a4 4 0 004-4v-5a2 2 0 00-2-2h- академик1a2 2 0 00-2 2v2m-6-4h.01M9 4h6a2 2 0 012 2v2H7V6a2 2 0 012-2z" />
    </svg>
);

const SkullIcon: React.FC<{ className?: string }> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.104 0 2.103-.28 3-.804M12 8V4m0 4c-1.104 0-2.103-.28-3-.804m3 .804c1.104 0 2.103.28 3 .804m-3-.804V4m0 4c-1.104 0-2.103.28-3 .804m-6 6.196c0 4.418 4.03 8 9 8s9-3.582 9-8c0-2.023-.768-3.87-2.047-5.325m-14.906 0A9.006 9.006 0 0112 4c1.857 0 3.58.54 5.047 1.481M4 14.196V10a8 8 0 018-8v0a8 8 0 018 8v4.196" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
        <path d="M9 12h6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const BoomboxIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
);


const PaintBrushIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

const StyleIcon: React.FC<StyleIconProps> = ({ styleId, className }) => {
  if (styleId >= 1 && styleId <= 15) {
    return <CubeIcon className={className} />; // 3D & Render Styles
  }
  if (styleId >= 16 && styleId <= 30) {
    return <SprayCanIcon className={className} />; // Streetwear & Urban Art
  }
  if (styleId >= 31 && styleId <= 45) {
    return <SkullIcon className={className} />; // Punk & Goth Styles
  }
  if (styleId >= 46 && styleId <= 55) {
    return <BoomboxIcon className={className} />; // Hip Hop Styles
  }
  
  // Default icon for "Other & Hybrid Styles"
  return <PaintBrushIcon className={className} />;
};

export default StyleIcon;
