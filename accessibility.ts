export type FontFamilyType = 'lexend' | 'atkinson' | 'comic' | 'lora' | 'mono' | 'system';

export type FontSizeType = 'normal' | 'grande' | 'muy-grande' | 'gigante';

export type ThemeType = 
  | 'claro' 
  | 'oscuro' 
  | 'amarillo-negro' 
  | 'negro-amarillo' 
  | 'sepia' 
  | 'azul-suave';

export type SpacingType = 'normal' | 'amplio' | 'extra-amplio';

export interface AccessibilitySettings {
  fontFamily: FontFamilyType;
  fontSize: FontSizeType;
  theme: ThemeType;
  spacing: SpacingType;
  speechRate: number; // 0.6 - 1.2
  speechPitch: number; // 0.8 - 1.2
  autoRead: boolean; // Auto-read aloud on selection/step
  easyReadMode: boolean; // Simplified view, syllables highlighted
  readingRuler: boolean; // Horizontal visual focus line
  soundEffects: boolean; // Gentle UI chimes
  selectedVoiceURI: string; // Browser voice identifier
}
