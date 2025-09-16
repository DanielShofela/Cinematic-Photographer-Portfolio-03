
import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const sentence = "STYLE CINÉMATIQUE IMMERSIF".split("");

  const sentenceVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <motion.div
      className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-[100]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      <motion.h1
        className="font-heading text-4xl md:text-6xl text-white tracking-widest"
        variants={sentenceVariants}
        initial="hidden"
        animate="visible"
      >
        {sentence.map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
};

export default LoadingScreen;
