import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { FontFamilyType, FontSizeType, ThemeType, SpacingType } from '../types/accessibility';
import { 
  X, 
  RotateCcw, 
  Volume2, 
  Type, 
  Eye, 
  Sliders, 
  BookOpen, 
  Sparkles,
  Check,
  Play
} from 'lucide-react';

export const AccessibilityPanel: React.FC = () => {
  const { 
    settings, 
    updateSetting, 
    resetSettings, 
    isA11yModalOpen, 
    setIsA11yModalOpen,
    voices,
    speakText,
    isSpeaking,
    stopSpeaking
  } = useAccessibility();

  if (!isA11yModalOpen) return null;

  const fonts: { id: FontFamilyType; label: string; desc: string; sample: string }[] = [
    { id: 'lexend', label: 'Lexend', desc: 'Diseñada científicamente para fluidez lectora', sample: 'La ropa de diario' },
    { id: 'atkinson', label: 'Atkinson Hyperlegible', desc: 'Creada por Braille Institute para máxima distinción', sample: 'La ropa de diario' },
    { id: 'comic', label: 'Comic Redondeada', desc: 'Trazos amigables con apoyo para dislexia', sample: 'La ropa de diario' },
    { id: 'lora', label: 'Lora (Serif)', desc: 'Tipografía clásica con serifa y buen espaciado', sample: 'La ropa de diario' },
    { id: 'mono', label: 'Space Mono', desc: 'Letras de ancho fijo que evitan confusión visual', sample: 'La ropa de diario' },
    { id: 'system', label: 'Sistema', desc: 'Tipografía predeterminada de tu dispositivo', sample: 'La ropa de diario' },
  ];

  const sizes: { id: FontSizeType; label: string; scale: string }[] = [
    { id: 'normal', label: 'Normal', scale: '100%' },
    { id: 'grande', label: 'Grande', scale: '115%' },
    { id: 'muy-grande', label: 'Muy grande', scale: '135%' },
    { id: 'gigante', label: 'Gigante', scale: '160%' },
  ];

  const themes: { id: ThemeType; label: string; bg: string; text: string; border: string }[] = [
    { id: 'claro', label: 'Claro Estándar', bg: '#FFFFFF', text: '#0F172A', border: '#94A3B8' },
    { id: 'oscuro', label: 'Oscuro Cómodo', bg: '#162032', text: '#F8FAFC', border: '#475569' },
    { id: 'amarillo-negro', label: 'Amarillo / Negro', bg: '#000000', text: '#FFFF00', border: '#FFFF00' },
    { id: 'negro-amarillo', label: 'Negro / Amarillo', bg: '#FFF59D', text: '#000000', border: '#000000' },
    { id: 'sepia', label: 'Sepia Descanso', bg: '#FBF0D9', text: '#3D2E1E', border: '#D4BE9B' },
    { id: 'azul-suave', label: 'Azul Noche Suave', bg: '#0F172A', text: '#E2E8F0', border: '#60A5FA' },
  ];

  const spacings: { id: SpacingType; label: string; desc: string }[] = [
    { id: 'normal', label: 'Normal', desc: 'Espaciado estándar' },
    { id: 'amplio', label: 'Amplio', desc: 'Mayor distancia entre líneas y letras' },
    { id: 'extra-amplio', label: 'Extra amplio', desc: 'Recomendado para dislexia' },
  ];

  const speechRates = [
    { val: 0.65, label: '0.6x Muy lenta' },
    { val: 0.85, label: '0.8x Pausada' },
    { val: 1.0, label: '1.0x Normal' },
    { val: 1.15, label: '1.2x Ligera' },
  ];

  const handleTestVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText('Hola. Esta es una prueba de lectura por voz para repasar las prendas de vestir.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-panel-title"
    >
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl p-6 sm:p-8 transition-all border-2"
        style={{
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-main)',
          borderColor: 'var(--border-main)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b mb-6" style={{ borderColor: 'var(--border-main)' }}>
          <div className="flex items-center gap-3">
            <div 
              className="p-2.5 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent-badge)', color: 'var(--accent-badge-text)' }}
            >
              <Eye className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 id="a11y-panel-title" className="text-xl sm:text-2xl font-bold tracking-tight">
                Panel de Accesibilidad e Inclusión
              </h2>
              <p className="text-sm opacity-85">
                Adapta el tipo de letra, tamaño, contraste y lectura por voz a tus necesidades.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsA11yModalOpen(false)}
            className="p-2.5 rounded-lg border hover:opacity-80 transition cursor-pointer flex items-center justify-center"
            style={{ borderColor: 'var(--border-main)' }}
            aria-label="Cerrar panel de accesibilidad (Escape)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-8">
          {/* SECTION 1: CONTRASTE Y TEMA VISUAL */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-5 h-5 text-sky-500" aria-hidden="true" />
              <h3 className="text-lg font-bold">1. Contraste y Colores</h3>
            </div>
            <p className="text-sm opacity-80 mb-3">
              Selecciona el tema que mejor se adapte a tu visión o nivel de descanso ocular:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {themes.map((t) => {
                const isSelected = settings.theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => updateSetting('theme', t.id)}
                    className={`p-3.5 rounded-xl text-left border-2 flex flex-col justify-between transition relative cursor-pointer ${
                      isSelected ? 'ring-3 ring-sky-500' : 'hover:opacity-90'
                    }`}
                    style={{
                      backgroundColor: t.bg,
                      color: t.text,
                      borderColor: isSelected ? 'var(--focus-ring)' : t.border
                    }}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-bold text-sm">{t.label}</span>
                      {isSelected && <Check className="w-5 h-5 font-bold" />}
                    </div>
                    <div className="text-xs opacity-90 border-t pt-1 border-current">
                      Aa Bb 123
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: TIPO DE LETRA */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Type className="w-5 h-5 text-emerald-500" aria-hidden="true" />
              <h3 className="text-lg font-bold">2. Tipo de Letra (Tipografía)</h3>
            </div>
            <p className="text-sm opacity-80 mb-3">
              Elige fuentes optimizadas para lectura fluida, baja visión o dislexia:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fonts.map((f) => {
                const isSelected = settings.fontFamily === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => updateSetting('fontFamily', f.id)}
                    className={`p-3.5 rounded-xl text-left border-2 transition cursor-pointer flex items-start justify-between ${
                      isSelected ? 'ring-3' : 'hover:opacity-90'
                    }`}
                    style={{
                      backgroundColor: 'var(--bg-subtle)',
                      borderColor: isSelected ? 'var(--focus-ring)' : 'var(--border-main)'
                    }}
                    aria-pressed={isSelected}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base">{f.label}</span>
                        {isSelected && <span className="text-xs px-2 py-0.5 rounded font-bold border border-current">Activa</span>}
                      </div>
                      <p className="text-xs opacity-75 mt-0.5">{f.desc}</p>
                      <p className={`text-base font-semibold mt-2 font-${f.id}`}>
                        {f.sample}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: TAMAÑO DE LETRA Y ESPACIADO */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-5 h-5 text-amber-500" aria-hidden="true" />
              <h3 className="text-lg font-bold">3. Tamaño y Espaciado de Texto</h3>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Tamaño de letra:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sizes.map((s) => {
                  const isSelected = settings.fontSize === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => updateSetting('fontSize', s.id)}
                      className={`p-3 rounded-xl border-2 font-bold text-center transition cursor-pointer ${
                        isSelected ? 'border-sky-500' : ''
                      }`}
                      style={{
                        backgroundColor: isSelected ? 'var(--accent-badge)' : 'var(--bg-subtle)',
                        color: isSelected ? 'var(--accent-badge-text)' : 'inherit',
                        borderColor: isSelected ? 'var(--focus-ring)' : 'var(--border-main)'
                      }}
                      aria-pressed={isSelected}
                    >
                      <div className="text-base">{s.label}</div>
                      <div className="text-xs opacity-75 font-normal">{s.scale}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Espaciado entre renglones y letras:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {spacings.map((sp) => {
                  const isSelected = settings.spacing === sp.id;
                  return (
                    <button
                      key={sp.id}
                      onClick={() => updateSetting('spacing', sp.id)}
                      className={`p-3 rounded-xl border-2 text-left transition cursor-pointer ${
                        isSelected ? 'border-sky-500' : ''
                      }`}
                      style={{
                        backgroundColor: isSelected ? 'var(--accent-badge)' : 'var(--bg-subtle)',
                        color: isSelected ? 'var(--accent-badge-text)' : 'inherit',
                        borderColor: isSelected ? 'var(--focus-ring)' : 'var(--border-main)'
                      }}
                      aria-pressed={isSelected}
                    >
                      <div className="font-bold text-sm">{sp.label}</div>
                      <div className="text-xs opacity-75">{sp.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 4: LECTURA POR VOZ (TEXT-TO-SPEECH) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className="w-5 h-5 text-indigo-500" aria-hidden="true" />
              <h3 className="text-lg font-bold">4. Lectura por Voz (Síntesis Sonora)</h3>
            </div>
            <p className="text-sm opacity-80 mb-3">
              Permite escuchar los nombres de las prendas, sílabas y definiciones con pronunciación clara:
            </p>

            <div className="p-4 rounded-xl border-2 space-y-4" style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-main)' }}>
              {/* Voice selector */}
              {voices.length > 0 && (
                <div>
                  <label htmlFor="voice-select" className="block text-sm font-semibold mb-1">
                    Voz seleccionada:
                  </label>
                  <select
                    id="voice-select"
                    value={settings.selectedVoiceURI}
                    onChange={(e) => updateSetting('selectedVoiceURI', e.target.value)}
                    className="w-full p-2.5 rounded-lg border text-sm cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-main)',
                      borderColor: 'var(--border-main)'
                    }}
                  >
                    {voices.map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Speed rate buttons */}
              <div>
                <label className="block text-sm font-semibold mb-2">Velocidad de locución:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {speechRates.map((sr) => {
                    const isSelected = Math.abs(settings.speechRate - sr.val) < 0.05;
                    return (
                      <button
                        key={sr.val}
                        onClick={() => updateSetting('speechRate', sr.val)}
                        className={`p-2.5 rounded-lg border-2 text-sm font-semibold text-center transition cursor-pointer`}
                        style={{
                          backgroundColor: isSelected ? 'var(--accent-badge)' : 'var(--bg-card)',
                          color: isSelected ? 'var(--accent-badge-text)' : 'inherit',
                          borderColor: isSelected ? 'var(--focus-ring)' : 'var(--border-main)'
                        }}
                      >
                        {sr.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Auto read toggle */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="font-semibold text-sm">Lectura automática</div>
                  <div className="text-xs opacity-75">Leer en voz alta automáticamente al cambiar de tarjeta o seleccionar prenda</div>
                </div>
                <button
                  onClick={() => updateSetting('autoRead', !settings.autoRead)}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition cursor-pointer ${
                    settings.autoRead ? 'bg-sky-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                  }`}
                  aria-pressed={settings.autoRead}
                  aria-label="Alternar lectura automática"
                >
                  <div className="w-6 h-6 rounded-full bg-white shadow-md" />
                </button>
              </div>

              {/* Test voice button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleTestVoice}
                  className="px-4 py-2.5 rounded-lg border-2 font-bold flex items-center gap-2 hover:opacity-90 transition cursor-pointer"
                  style={{
                    backgroundColor: 'var(--primary-main)',
                    color: 'var(--primary-text)',
                    borderColor: 'var(--focus-ring)'
                  }}
                >
                  {isSpeaking ? (
                    <>
                      <Volume2 className="w-5 h-5 animate-pulse" />
                      Detener prueba de voz
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Probar voz actual
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 5: APOYOS COGNITIVOS Y VISUALES */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-purple-500" aria-hidden="true" />
              <h3 className="text-lg font-bold">5. Apoyos Cognitivos y Visuales</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Easy Read Mode */}
              <button
                onClick={() => updateSetting('easyReadMode', !settings.easyReadMode)}
                className="p-4 rounded-xl border-2 text-left flex items-start justify-between transition cursor-pointer"
                style={{
                  backgroundColor: settings.easyReadMode ? 'var(--accent-badge)' : 'var(--bg-subtle)',
                  color: settings.easyReadMode ? 'var(--accent-badge-text)' : 'inherit',
                  borderColor: settings.easyReadMode ? 'var(--focus-ring)' : 'var(--border-main)'
                }}
                aria-pressed={settings.easyReadMode}
              >
                <div>
                  <div className="font-bold text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Modo Lectura Fácil
                  </div>
                  <p className="text-xs opacity-80 mt-1">
                    Destaca sílabas fonéticas, oraciones cortas y minimiza distracciones en pantalla.
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-md border flex items-center justify-center font-bold text-xs ${
                  settings.easyReadMode ? 'bg-sky-600 text-white border-transparent' : 'border-current'
                }`}>
                  {settings.easyReadMode ? '✓' : ''}
                </div>
              </button>

              {/* Reading Ruler */}
              <button
                onClick={() => updateSetting('readingRuler', !settings.readingRuler)}
                className="p-4 rounded-xl border-2 text-left flex items-start justify-between transition cursor-pointer"
                style={{
                  backgroundColor: settings.readingRuler ? 'var(--accent-badge)' : 'var(--bg-subtle)',
                  color: settings.readingRuler ? 'var(--accent-badge-text)' : 'inherit',
                  borderColor: settings.readingRuler ? 'var(--focus-ring)' : 'var(--border-main)'
                }}
                aria-pressed={settings.readingRuler}
              >
                <div>
                  <div className="font-bold text-base flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    Guía de Lectura Visual (Regla)
                  </div>
                  <p className="text-xs opacity-80 mt-1">
                    Barra horizontal que sigue el cursor para no perder el renglón ni cansarte.
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-md border flex items-center justify-center font-bold text-xs ${
                  settings.readingRuler ? 'bg-sky-600 text-white border-transparent' : 'border-current'
                }`}>
                  {settings.readingRuler ? '✓' : ''}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-8 border-t" style={{ borderColor: 'var(--border-main)' }}>
          <button
            onClick={resetSettings}
            className="px-4 py-2.5 rounded-lg border flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition cursor-pointer"
            style={{ borderColor: 'var(--border-main)' }}
          >
            <RotateCcw className="w-4 h-4" />
            Restablecer valores iniciales
          </button>

          <button
            onClick={() => setIsA11yModalOpen(false)}
            className="px-6 py-2.5 rounded-lg font-bold text-sm shadow-md transition cursor-pointer"
            style={{
              backgroundColor: 'var(--primary-main)',
              color: 'var(--primary-text)',
              border: '2px solid var(--focus-ring)'
            }}
          >
            Guardar y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
