
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCursor } from '../App';

const Hero: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { setVariant } = useCursor();

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(https://picsum.photos/id/48/1920/1080)',
          y,
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4"
        style={{ opacity }}
        onMouseEnter={() => setVariant('text')}
        onMouseLeave={() => setVariant('default')}
      >
        <motion.h1 
          className="font-heading text-6xl md:text-9xl tracking-wider"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
        >
          L'ART DE L'INSTANT
        </motion.h1>
        <motion.p 
          className="text-lg md:text-2xl mt-4 font-light tracking-widest"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
        >
          PHOTOGRAPHE
        </motion.p>
      </motion.div>
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ opacity }}
      >
          <div className="w-[2px] h-16 bg-white">
              <motion.div 
                  className="w-full bg-gray-500"
                  initial={{ height: "0%"}}
                  animate={{ height: "100%"}}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut"}}
              />
          </div>
      </motion.div>
    </div>
  );
};

export default Hero;
