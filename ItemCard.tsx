import React from 'react';
import { ClothingItem } from '../types/clothing';
import { ClothingIcon } from './ClothingIcon';
import { useAccessibility } from '../context/AccessibilityContext';
import { Volume2, ChevronRight, Info } from 'lucide-react';

interface ItemCardProps {
  item: ClothingItem;
  onSelect: (item: ClothingItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onSelect }) => {
  const { speakText, isSpeaking, speakingText, settings } = useAccessibility();

  const isCurrentSpeaking = isSpeaking && speakingText?.includes(item.name);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Speak clearly with syllables & easy definition
    const speech = `${item.name}. ${item.syllables.join(' - ')}. ${item.easyDefinition}`;
    speakText(speech);
  };

  return (
    <article
      onClick={() => onSelect(item)}
      className="group relative rounded-2xl border-2 p-5 transition-all flex flex-col justify-between cursor-pointer hover:shadow-lg focus-within:ring-4"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: isCurrentSpeaking ? 'var(--focus-ring)' : 'var(--border-main)',
        boxShadow: 'var(--card-shadow)'
      }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        } else if (e.key === 'v' || e.key === 'V') {
          e.preventDefault();
          const speech = `${item.name}. ${item.syllables.join(' - ')}. ${item.easyDefinition}`;
          speakText(speech);
        }
      }}
      aria-label={`${item.name}, ${item.categoryLabel}`}
    >
      <div>
        {/* Top bar: Category & Pronounce button */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md border border-current opacity-85">
            {item.categoryLabel}
          </span>

          <button
            onClick={handleSpeak}
            className={`p-2 rounded-xl border-2 transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
              isCurrentSpeaking ? 'speaking-pulse ring-2 ring-sky-400' : 'hover:opacity-85'
            }`}
            style={{
              backgroundColor: 'var(--accent-badge)',
              color: 'var(--accent-badge-text)',
              borderColor: 'var(--focus-ring)'
            }}
            title={`Escuchar "${item.name}"`}
            aria-label={`Escuchar pronunciación de ${item.name}`}
          >
            <Volume2 className="w-4 h-4" />
            <span className="sr-only sm:not-sr-only">Escuchar</span>
          </button>
        </div>

        {/* Center: Scalable Illustration Icon */}
        <div 
          className="w-full py-5 flex items-center justify-center rounded-xl mb-4 transition-transform group-hover:scale-105"
          style={{ backgroundColor: 'var(--bg-subtle)' }}
        >
          <div style={{ color: 'var(--primary-main)' }}>
            <ClothingIcon name={item.icon} size={84} />
          </div>
        </div>

        {/* Item Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1" style={{ color: 'var(--text-main)' }}>
          {item.name}
        </h3>

        {/* Syllables breakdown */}
        <div className="flex items-center gap-1 flex-wrap mb-3" aria-label={`Separación silábica: ${item.syllables.join(' - ')}`}>
          {item.syllables.map((syl, i) => (
            <span
              key={i}
              className={`px-2 py-0.5 rounded text-xs sm:text-sm font-semibold border ${
                i === item.stressedIndex
                  ? 'border-amber-500 font-extrabold underline underline-offset-2'
                  : 'border-current opacity-75'
              }`}
            >
              {syl}
            </span>
          ))}
        </div>

        {/* Easy Definition snippet */}
        <p className="text-sm opacity-85 line-clamp-2 mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {item.easyDefinition}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t flex items-center justify-between text-xs font-semibold opacity-90" style={{ borderColor: 'var(--border-main)' }}>
        <span>📍 {item.bodyPartLabel}</span>
        <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
          Ver detalles <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </article>
  );
};
