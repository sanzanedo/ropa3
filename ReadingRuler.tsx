import React, { useEffect, useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

export const ReadingRuler: React.FC = () => {
  const { settings } = useAccessibility();
  const [mouseY, setMouseY] = useState(300);

  useEffect(() => {
    if (!settings.readingRuler) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.readingRuler]);

  if (!settings.readingRuler) return null;

  return (
    <div 
      className="pointer-events-none fixed inset-x-0 z-50 transition-all duration-75 ease-out"
      style={{
        top: `${mouseY - 26}px`,
        height: '52px',
      }}
      aria-hidden="true"
    >
      <div 
        className="w-full h-full border-y-2 border-amber-500/80 bg-amber-400/15 backdrop-brightness-110 shadow-sm"
        style={{
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.22)'
        }}
      />
    </div>
  );
};
