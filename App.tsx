
import React, { useState, useEffect, createContext, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { GalleryItem } from './types';
import { galleryData } from './data/galleryData';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';

type CursorVariant = 'default' | 'hover' | 'text';

interface CursorContextType {
  setVariant: (variant: CursorVariant) => void;
}

export const CursorContext = createContext<CursorContextType | undefined>(undefined);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);
  
  const handleItemSelect = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
  };
  
  const handleNext = () => {
    if (!selectedItem) return;
    const currentIndex = galleryData.findIndex(item => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % galleryData.length;
    setSelectedItem(galleryData[nextIndex]);
  };
  
  const handlePrev = () => {
    if (!selectedItem) return;
    const currentIndex = galleryData.findIndex(item => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    setSelectedItem(galleryData[prevIndex]);
  };

  const cursorContextValue = {
    setVariant: setCursorVariant,
  };

  return (
    <CursorContext.Provider value={cursorContextValue}>
      <CustomCursor variant={cursorVariant} />
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {!isLoading && (
        <main className="bg-[#0a0a0a]">
          <Hero />
          <Gallery onSelect={handleItemSelect} />
          <footer className="text-center p-10 text-xs text-gray-500">
            <p>&copy; 2024 Artiste Photographe. Tous droits réservés.</p>
          </footer>
        </main>
      )}

      <AnimatePresence>
        {selectedItem && (
          <Lightbox 
            item={selectedItem} 
            onClose={handleCloseLightbox}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
    const context = useContext(CursorContext);
    if (context === undefined) {
        throw new Error('useCursor must be used within a CursorProvider');
    }
    return context;
};

export default App;
