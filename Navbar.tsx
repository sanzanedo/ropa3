import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { AppTab } from '../types/clothing';
import { 
  Sliders, 
  VolumeX, 
  Volume2, 
  HelpCircle, 
  BookOpen, 
  Layers, 
  Award, 
  CloudSun,
  Sparkles,
  SunMoon,
  SpellCheck
} from 'lucide-react';

interface NavbarProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange }) => {
  const { 
    settings, 
    updateSetting, 
    isSpeaking, 
    stopSpeaking, 
    setIsA11yModalOpen, 
    setIsShortcutsOpen 
  } = useAccessibility();

  const tabs: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    { id: 'catalogo', label: 'Vocabulario', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'tarjetas', label: 'Tarjetas', icon: <Layers className="w-5 h-5" /> },
    { id: 'quiz', label: 'Adivinanzas', icon: <Award className="w-5 h-5" /> },
    { id: 'silabas', label: 'Sílabas', icon: <SpellCheck className="w-5 h-5" /> },
    { id: 'clima', label: 'Armario y Clima', icon: <CloudSun className="w-5 h-5" /> },
  ];

  // Quick font size step
  const fontSizes = ['normal', 'grande', 'muy-grande', 'gigante'] as const;
  const currentSizeIndex = fontSizes.indexOf(settings.fontSize);

  const handleDecreaseFont = () => {
    if (currentSizeIndex > 0) {
      updateSetting('fontSize', fontSizes[currentSizeIndex - 1]);
    }
  };

  const handleIncreaseFont = () => {
    if (currentSizeIndex < fontSizes.length - 1) {
      updateSetting('fontSize', fontSizes[currentSizeIndex + 1]);
    }
  };

  // Quick toggle high contrast theme
  const toggleContrast = () => {
    if (settings.theme === 'claro') {
      updateSetting('theme', 'amarillo-negro');
    } else if (settings.theme === 'amarillo-negro') {
      updateSetting('theme', 'oscuro');
    } else {
      updateSetting('theme', 'claro');
    }
  };

  return (
    <header 
      className="sticky top-0 z-40 border-b-2 transition-colors"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-main)',
        color: 'var(--text-main)',
        boxShadow: 'var(--card-shadow)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        {/* Top bar: Brand & Quick Accessibility bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: 'var(--border-main)' }}>
          {/* Logo & App Title */}
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl border-2"
              style={{
                backgroundColor: 'var(--accent-badge)',
                color: 'var(--accent-badge-text)',
                borderColor: 'var(--focus-ring)'
              }}
              aria-hidden="true"
            >
              👕
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-none">
                Vestiteca
              </h1>
              <span className="text-xs sm:text-sm opacity-80 font-medium">
                Léxico Inclusivo y Accesible de la Ropa
              </span>
            </div>
          </div>

          {/* Quick Accessibility Controls Bar */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Audio Indicator / Stop audio button */}
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="px-3 py-1.5 rounded-lg border-2 font-bold text-xs flex items-center gap-1.5 animate-pulse cursor-pointer"
                style={{
                  backgroundColor: '#fee2e2',
                  color: '#991b1b',
                  borderColor: '#ef4444'
                }}
                title="Detener lectura por voz actual (Alt+S o Escape)"
                aria-label="Detener lectura por voz"
              >
                <VolumeX className="w-4 h-4" />
                <span>Parar voz</span>
              </button>
            )}

            {/* Quick Text Size Stepper */}
            <div className="flex items-center rounded-lg border border-current overflow-hidden text-xs font-bold" aria-label="Control rápido de tamaño de texto">
              <button
                onClick={handleDecreaseFont}
                disabled={currentSizeIndex === 0}
                className="px-2.5 py-1.5 hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-35 cursor-pointer"
                title="Reducir tamaño de letra"
                aria-label="Reducir tamaño de letra"
              >
                A-
              </button>
              <span className="px-2 py-1.5 border-x border-current text-[11px] opacity-80">
                {settings.fontSize === 'normal' ? '1x' : settings.fontSize === 'grande' ? '1.2x' : settings.fontSize === 'muy-grande' ? '1.4x' : '1.6x'}
              </span>
              <button
                onClick={handleIncreaseFont}
                disabled={currentSizeIndex === fontSizes.length - 1}
                className="px-2.5 py-1.5 hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-35 cursor-pointer"
                title="Aumentar tamaño de letra"
                aria-label="Aumentar tamaño de letra"
              >
                A+
              </button>
            </div>

            {/* Quick Contrast toggle */}
            <button
              onClick={toggleContrast}
              className="p-1.5 rounded-lg border border-current hover:opacity-80 transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
              title="Cambiar modo de contraste"
              aria-label="Cambiar modo de contraste"
            >
              <SunMoon className="w-4 h-4" />
              <span className="hidden md:inline">Contraste</span>
            </button>

            {/* Lectura fácil quick toggle */}
            <button
              onClick={() => updateSetting('easyReadMode', !settings.easyReadMode)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                settings.easyReadMode ? 'ring-2 ring-sky-500' : ''
              }`}
              style={{
                backgroundColor: settings.easyReadMode ? 'var(--accent-badge)' : 'transparent',
                color: settings.easyReadMode ? 'var(--accent-badge-text)' : 'inherit',
                borderColor: 'var(--border-main)'
              }}
              aria-pressed={settings.easyReadMode}
              title="Modo Lectura Fácil con sílabas resaltadas"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lectura Fácil</span>
            </button>

            {/* Main Accessibility Settings Button */}
            <button
              onClick={() => setIsA11yModalOpen(true)}
              className="px-3 py-1.5 rounded-lg border-2 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition hover:opacity-90 cursor-pointer"
              style={{
                backgroundColor: 'var(--primary-main)',
                color: 'var(--primary-text)',
                borderColor: 'var(--focus-ring)'
              }}
              aria-haspopup="dialog"
              aria-label="Abrir panel completo de accesibilidad (Alt+A)"
            >
              <Sliders className="w-4 h-4" />
              <span>Accesibilidad</span>
            </button>

            {/* Help / Shortcuts */}
            <button
              onClick={() => setIsShortcutsOpen(true)}
              className="p-1.5 rounded-lg border hover:opacity-80 transition cursor-pointer"
              style={{ borderColor: 'var(--border-main)' }}
              title="Atajos de teclado y ayuda (?)"
              aria-label="Atajos de teclado y ayuda"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-0.5 no-scrollbar" aria-label="Secciones de aprendizaje">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-sm sm:text-base whitespace-nowrap transition cursor-pointer border-2 ${
                  isActive 
                    ? 'shadow-xs' 
                    : 'border-transparent hover:opacity-85'
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--accent-badge)' : 'transparent',
                  color: isActive ? 'var(--accent-badge-text)' : 'var(--text-main)',
                  borderColor: isActive ? 'var(--focus-ring)' : 'transparent'
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
