import React, { useState } from 'react';
import { CLOTHING_ITEMS } from '../../data/clothingData';
import { ClothingIcon } from '../ClothingIcon';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Volume2, SpellCheck, RefreshCw, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

export const SyllablesView: React.FC = () => {
  const { speakText, playSuccessSound } = useAccessibility();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSyllableIndex, setActiveSyllableIndex] = useState<number | null>(null);

  const item = CLOTHING_ITEMS[currentIndex];

  const handleSpeakSyllable = (syl: string, idx: number) => {
    setActiveSyllableIndex(idx);
    speakText(syl, () => setActiveSyllableIndex(null));
  };

  const handleSpeakFullWord = () => {
    speakText(`${item.name}. ${item.syllables.join(' - ')}.`);
  };

  const handleNext = () => {
    setActiveSyllableIndex(null);
    setCurrentIndex((prev) => (prev < CLOTHING_ITEMS.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveSyllableIndex(null);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : CLOTHING_ITEMS.length - 1));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Intro */}
      <div 
        className="p-5 rounded-2xl border-2 flex flex-wrap items-center justify-between gap-4"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <SpellCheck className="w-6 h-6 text-indigo-500" />
            Taller Fonológico de Sílabas
          </h2>
          <p className="text-xs sm:text-sm opacity-80">
            Toca cada sílaba para escuchar su sonido por separado y descubrir cuál lleva el acento.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakFullWord}
            className="px-4 py-2 rounded-xl border-2 font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:opacity-85 cursor-pointer"
            style={{
              backgroundColor: 'var(--primary-main)',
              color: 'var(--primary-text)',
              borderColor: 'var(--focus-ring)'
            }}
            title="Escuchar palabra completa"
            aria-label="Escuchar palabra completa"
          >
            <Volume2 className="w-4 h-4" />
            <span>Escuchar todo</span>
          </button>
        </div>
      </div>

      {/* Main interactive syllable card */}
      <div 
        className="p-6 sm:p-10 rounded-3xl border-3 flex flex-col items-center text-center space-y-8"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-main)',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        {/* Garment Illustration */}
        <div 
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-2 flex items-center justify-center p-3"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-main)',
            color: 'var(--primary-main)'
          }}
        >
          <ClothingIcon name={item.icon} size={90} />
        </div>

        {/* Word Title */}
        <div>
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: 'var(--primary-main)' }}>
            {item.name}
          </h3>
          <p className="text-sm opacity-80 mt-1">
            Esta palabra tiene <span className="font-bold underline">{item.syllables.length} sílabas</span>
          </p>
        </div>

        {/* Big tactile Syllables buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
          {item.syllables.map((syl, i) => {
            const isStressed = i === item.stressedIndex;
            const isActive = activeSyllableIndex === i;

            return (
              <button
                key={i}
                onClick={() => handleSpeakSyllable(syl, i)}
                className={`group relative min-w-[80px] sm:min-w-[100px] py-4 px-5 rounded-2xl border-3 font-black text-2xl sm:text-3xl transition-transform hover:scale-105 active:scale-95 cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isActive ? 'ring-4 ring-sky-500 scale-105' : ''
                }`}
                style={{
                  backgroundColor: isStressed ? 'var(--accent-badge)' : 'var(--bg-subtle)',
                  color: isStressed ? 'var(--accent-badge-text)' : 'inherit',
                  borderColor: isStressed ? 'var(--focus-ring)' : 'var(--border-main)'
                }}
                aria-label={`Sílaba ${i + 1}: ${syl}. ${isStressed ? 'Sílaba tónica con mayor fuerza de voz' : ''}`}
              >
                <span>{syl}</span>
                <span className="text-xs font-bold opacity-75 group-hover:opacity-100 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  {isStressed ? 'Tónica' : `Sí-la-ba ${i + 1}`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Pedagogical explanation */}
        <div 
          className="w-full p-4 rounded-2xl border text-sm sm:text-base leading-relaxed text-left flex items-start gap-3"
          style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-main)' }}
        >
          <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-300">
            ℹ️
          </div>
          <div>
            <p className="font-bold mb-1">
              La sílaba tónica es «{item.syllables[item.stressedIndex]}»
            </p>
            <p className="opacity-85 text-xs sm:text-sm">
              Es la que se pronuncia con un golpe de voz más fuerte. Al juntar todas las partes decimos: «{item.lemma}».
            </p>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between w-full pt-4 border-t" style={{ borderColor: 'var(--border-main)' }}>
          <button
            onClick={handlePrev}
            className="px-4 py-2.5 rounded-xl border-2 font-bold flex items-center gap-1.5 hover:opacity-85 cursor-pointer"
            style={{ borderColor: 'var(--border-main)' }}
            aria-label="Prenda anterior"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Anterior</span>
          </button>

          <span className="text-xs font-bold opacity-75">
            {currentIndex + 1} de {CLOTHING_ITEMS.length}
          </span>

          <button
            onClick={handleNext}
            className="px-4 py-2.5 rounded-xl border-2 font-bold flex items-center gap-1.5 hover:opacity-85 cursor-pointer"
            style={{ borderColor: 'var(--border-main)' }}
            aria-label="Siguiente prenda"
          >
            <span>Siguiente</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
