import React, { useState } from 'react';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { AppTab } from './types/clothing';
import { Navbar } from './components/Navbar';
import { ReadingRuler } from './components/ReadingRuler';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { ShortcutsHelpModal } from './components/ShortcutsHelpModal';
import { CatalogView } from './components/views/CatalogView';
import { FlashcardsView } from './components/views/FlashcardsView';
import { QuizView } from './components/views/QuizView';
import { SyllablesView } from './components/views/SyllablesView';
import { WeatherWardrobeView } from './components/views/WeatherWardrobeView';

const AppContent: React.FC = () => {
  const { settings, setIsA11yModalOpen } = useAccessibility();
  const [currentTab, setCurrentTab] = useState<AppTab>('catalogo');

  // Compute root accessibility classes
  const themeClass = `theme-${settings.theme}`;
  const fontClass = `font-${settings.fontFamily}`;
  const sizeClass = `text-scale-${settings.fontSize}`;
  const spacingClass = `spacing-${settings.spacing}`;

  return (
    <div 
      className={`min-h-screen transition-colors duration-150 flex flex-col ${themeClass} ${fontClass} ${sizeClass} ${spacingClass}`}
      style={{
        backgroundColor: 'var(--bg-main)',
        color: 'var(--text-main)',
      }}
    >
      {/* Visual Tracking Reading Ruler (for dyslexia/tracking aid) */}
      <ReadingRuler />

      {/* Accessible Navbar */}
      <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentTab === 'catalogo' && <CatalogView />}
        {currentTab === 'tarjetas' && <FlashcardsView />}
        {currentTab === 'quiz' && <QuizView />}
        {currentTab === 'silabas' && <SyllablesView />}
        {currentTab === 'clima' && <WeatherWardrobeView />}
      </main>

      {/* Footer */}
      <footer 
        className="border-t py-6 mt-12 transition-colors"
        style={{
          borderColor: 'var(--border-main)',
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-muted)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="font-extrabold" style={{ color: 'var(--text-main)' }}>Vestiteca</span>
            <span>·</span>
            <span>Léxico Inclusivo y Accesible de la Ropa</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => setIsA11yModalOpen(true)}
              className="underline font-bold hover:opacity-80 cursor-pointer"
            >
              Configurar Accesibilidad
            </button>
            <span>·</span>
            <span>Atajo: Alt + A</span>
            <span>·</span>
            <span>Diseño inclusivo con apoyo fónico y lectura por voz</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AccessibilityPanel />
      <ShortcutsHelpModal />
    </div>
  );
};

export default function App() {
  return (
    <AccessibilityProvider>
      <AppContent />
    </AccessibilityProvider>
  );
}
