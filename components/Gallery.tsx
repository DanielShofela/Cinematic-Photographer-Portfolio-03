
import React, { useRef } from 'react';
// FIX: Import 'Variants' type from framer-motion.
import { motion, Variants } from 'framer-motion';
import type { GalleryItem } from '../types';
import { galleryData } from '../data/galleryData';
import { useCursor } from '../App';

interface GalleryProps {
  onSelect: (item: GalleryItem) => void;
}

const getItemClass = (span: GalleryItem['span']) => {
  switch (span) {
    case 'col':
      return 'md:col-span-2';
    case 'row':
      return 'md:row-span-2';
    case 'large':
      return 'md:col-span-2 md:row-span-2';
    case 'normal':
    default:
      return '';
  }
};

const Gallery: React.FC<GalleryProps> = ({ onSelect }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // FIX: Explicitly type 'itemVariants' as 'Variants' from framer-motion to fix type inference issue with the 'ease' property.
  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const { setVariant } = useCursor();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  return (
    <div className="py-20 px-4 md:px-8">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-auto-dense gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {galleryData.map((item, index) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            className={`relative overflow-hidden group aspect-w-1 aspect-h-1 cursor-none ${getItemClass(item.span)}`}
            onClick={() => onSelect(item)}
            variants={itemVariants}
            onMouseEnter={() => {
              setVariant('hover');
              if (item.type === 'video') {
                const videoEl = videoRefs.current[index];
                if (videoEl) {
                  // The play() method returns a promise. We'll handle it to avoid uncaught errors.
                  const playPromise = videoEl.play();
                  if (playPromise !== undefined) {
                    playPromise.catch(() => {
                      // Autoplay was prevented. We can silently ignore in this UI.
                    });
                  }
                }
              }
            }}
            onMouseLeave={() => {
              setVariant('default');
              if (item.type === 'video') {
                const videoEl = videoRefs.current[index];
                if (videoEl) {
                  videoEl.pause();
                  videoEl.currentTime = 0; // Reset video to the beginning for the next hover.
                }
              }
            }}
          >
            {item.type === 'image' ? (
              <motion.img
                src={item.thumbnail}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            ) : (
              <motion.video
                // FIX: The ref callback was implicitly returning the element, which is not allowed. Changed to a function body to ensure it returns void.
                ref={(el) => { videoRefs.current[index] = el; }}
                src={item.src}
                poster={item.thumbnail}
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                loop
                muted
                playsInline
              />
            )}
            <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <h3 className="text-white font-heading tracking-wider text-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Gallery;
