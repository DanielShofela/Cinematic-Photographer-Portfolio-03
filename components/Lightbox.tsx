
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { GalleryItem } from '../types';
import { CloseIcon, NextIcon, PrevIcon } from './Icons';
import { useCursor } from '../App';

interface LightboxProps {
  item: GalleryItem;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onNext, onPrev }) => {
  const { setVariant } = useCursor();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div className="relative w-full h-full max-w-7xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <motion.div layoutId={`card-${item.id}`} className="w-full h-full flex items-center justify-center">
            {item.type === 'image' ? (
                <img src={item.src} alt={item.title} className="max-w-full max-h-full object-contain" />
            ) : (
                <video src={item.src} className="max-w-full max-h-full object-contain" controls autoPlay loop/>
            )}
        </motion.div>
      </motion.div>
      
      <motion.button
        className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
        onClick={onClose}
        onMouseEnter={() => setVariant('hover')} onMouseLeave={() => setVariant('default')}
        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, transition: {delay: 0.3} }} exit={{opacity: 0, scale: 0.5}}
      >
        <CloseIcon className="w-8 h-8" />
      </motion.button>
      
      <motion.button
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        onMouseEnter={() => setVariant('hover')} onMouseLeave={() => setVariant('default')}
        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, transition: {delay: 0.3} }} exit={{opacity: 0, scale: 0.5}}
      >
        <PrevIcon className="w-10 h-10" />
      </motion.button>
      
      <motion.button
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        onMouseEnter={() => setVariant('hover')} onMouseLeave={() => setVariant('default')}
        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, transition: {delay: 0.3} }} exit={{opacity: 0, scale: 0.5}}
      >
        <NextIcon className="w-10 h-10" />
      </motion.button>

      <motion.div 
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white font-heading tracking-wider text-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
      >
        {item.title}
      </motion.div>
    </motion.div>
  );
};

export default Lightbox;
