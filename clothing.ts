export type ClothingCategory = 
  | 'diario' 
  | 'abrigo' 
  | 'calzado' 
  | 'accesorios' 
  | 'dormir' 
  | 'deporte';

export type Season = 'verano' | 'invierno' | 'entretiempo' | 'todo-el-ano';

export type BodyPart = 'cabeza' | 'torso' | 'piernas' | 'pies' | 'manos' | 'cuello' | 'cuerpo-entero';

export interface ClothingItem {
  id: string;
  name: string; // e.g., "La camiseta"
  lemma: string; // e.g., "Camiseta"
  article: 'el' | 'la' | 'los' | 'las';
  gender: 'masculino' | 'femenino';
  number: 'singular' | 'plural';
  category: ClothingCategory;
  categoryLabel: string;
  season: Season;
  seasonLabel: string;
  bodyPart: BodyPart;
  bodyPartLabel: string;
  syllables: string[]; // e.g., ['ca', 'mi', 'se', 'ta']
  stressedIndex: number; // 0-based index of tonic syllable
  easyDefinition: string; // Lectura fácil
  exampleSentence: string; // Frase cotidiana
  curiosityOrTip: string; // Consejo de autonomía / cómo ponérselo
  icon: string; // Icon identifier
}

export type AppTab = 'catalogo' | 'tarjetas' | 'quiz' | 'silabas' | 'clima';
