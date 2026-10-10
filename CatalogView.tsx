import React, { useState, useMemo } from 'react';
import { ClothingItem } from '../../types/clothing';
import { CLOTHING_ITEMS, CATEGORIES_CONFIG, SEASONS_CONFIG } from '../../data/clothingData';
import { ItemCard } from '../ItemCard';
import { ItemDetailModal } from '../ItemDetailModal';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Search, Volume2, Filter, X } from 'lucide-react';

export const CatalogView: React.FC = () => {
  const { speakText, settings } = useAccessibility();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    return CLOTHING_ITEMS.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lemma.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.easyDefinition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.bodyPartLabel.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSeason = selectedSeason === 'all' || item.season === selectedSeason || item.season === 'todo-el-ano';

      return matchesSearch && matchesCat && matchesSeason;
    });
  }, [searchTerm, selectedCategory, selectedSeason]);

  const handleAnnounceCount = () => {
    speakText(`Hay ${filteredItems.length} prendas disponibles en la lista.`);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSeason('all');
  };

  return (
    <div className="space-y-6">
      {/* Intro section */}
      <div 
        className="p-5 sm:p-6 rounded-2xl border-2 flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-main)'
        }}
      >
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Diccionario Ilustrado de la Ropa
          </h2>
          <p className="text-sm sm:text-base opacity-85 leading-relaxed">
            Explora las prendas de vestir, escucha cómo se pronuncian y aprende sus sílabas y utilidades.
          </p>
        </div>

        <button
          onClick={handleAnnounceCount}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl border-2 font-bold text-sm flex items-center gap-2 hover:opacity-90 transition cursor-pointer"
          style={{
            backgroundColor: 'var(--accent-badge)',
            color: 'var(--accent-badge-text)',
            borderColor: 'var(--focus-ring)'
          }}
          title="Escuchar cuántas prendas hay en la vista"
          aria-label="Escuchar total de prendas filtradas"
        >
          <Volume2 className="w-4 h-4" />
          <span>{filteredItems.length} prendas encontradas</span>
        </button>
      </div>

      {/* Filter and Search controls */}
      <div 
        className="p-5 rounded-2xl border-2 space-y-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-main)'
        }}
      >
        {/* Search input with audio button */}
        <div className="relative">
          <label htmlFor="search-clothing" className="sr-only">
            Buscar prenda de ropa
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none opacity-60">
            <Search className="w-5 h-5" />
          </div>
          <input
            id="search-clothing"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre (ej: abrigo, calcetines, falda)..."
            className="w-full pl-11 pr-24 py-3 rounded-xl border-2 text-base font-medium focus:ring-4 transition"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-main)',
              borderColor: 'var(--border-main)'
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-10 pr-2 flex items-center opacity-70 hover:opacity-100 cursor-pointer"
              title="Borrar búsqueda"
              aria-label="Borrar texto de búsqueda"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => speakText(searchTerm ? `Buscando: ${searchTerm}` : 'Escribe el nombre de una prenda')}
            className="absolute inset-y-0 right-2 px-2.5 flex items-center opacity-80 hover:opacity-100 cursor-pointer"
            title="Escuchar término"
            aria-label="Escuchar término de búsqueda"
          >
            <Volume2 className="w-5 h-5 text-sky-500" />
          </button>
        </div>

        {/* Categories Pills / Filter buttons */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-bold opacity-80 flex items-center gap-1.5">
              <Filter className="w-4 h-4" />
              Filtrar por categoría:
            </span>
            {(selectedCategory !== 'all' || selectedSeason !== 'all' || searchTerm) && (
              <button
                onClick={handleClearFilters}
                className="text-xs font-bold underline hover:opacity-80 cursor-pointer"
              >
                Limpiar todos los filtros
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES_CONFIG.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl border-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                    isSelected ? 'shadow-xs' : 'hover:opacity-85'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--primary-main)' : 'var(--bg-subtle)',
                    color: isSelected ? 'var(--primary-text)' : 'inherit',
                    borderColor: isSelected ? 'var(--focus-ring)' : 'var(--border-main)'
                  }}
                  aria-pressed={isSelected}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Seasons filter buttons */}
        <div>
          <span className="block text-xs sm:text-sm font-bold opacity-80 mb-2">
            Filtrar por época o temporada:
          </span>
          <div className="flex flex-wrap gap-2">
            {SEASONS_CONFIG.map((sea) => {
              const isSelected = selectedSeason === sea.id;
              return (
                <button
                  key={sea.id}
                  onClick={() => setSelectedSeason(sea.id)}
                  className={`px-3 py-1.5 rounded-lg border-2 text-xs font-bold transition cursor-pointer ${
                    isSelected ? 'shadow-xs' : 'hover:opacity-85'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--accent-badge)' : 'var(--bg-subtle)',
                    color: isSelected ? 'var(--accent-badge-text)' : 'inherit',
                    borderColor: isSelected ? 'var(--focus-ring)' : 'var(--border-main)'
                  }}
                  aria-pressed={isSelected}
                >
                  {sea.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid of Items */}
      {filteredItems.length === 0 ? (
        <div 
          className="p-12 text-center rounded-2xl border-2 space-y-4"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-main)' }}
        >
          <div className="text-4xl">🔍</div>
          <h3 className="text-xl font-bold">No se encontraron prendas con esos filtros</h3>
          <p className="text-sm opacity-80">Prueba a escribir otra palabra o borra los filtros de búsqueda.</p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 rounded-xl font-bold border-2 cursor-pointer"
            style={{
              backgroundColor: 'var(--primary-main)',
              color: 'var(--primary-text)',
              borderColor: 'var(--focus-ring)'
            }}
          >
            Ver todas las prendas
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onSelect={(it) => setSelectedItem(it)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          items={filteredItems}
          onClose={() => setSelectedItem(null)}
          onNavigate={(newItem) => setSelectedItem(newItem)}
        />
      )}
    </div>
  );
};
