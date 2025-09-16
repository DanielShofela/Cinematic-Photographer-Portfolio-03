
import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

interface CustomCursorProps {
  variant: 'default' | 'hover' | 'text';
}

const CustomCursor: React.FC<CustomCursorProps> = ({ variant }) => {
  const { x, y } = useMousePosition();

  const variants = {
    default: {
      height: 20,
      width: 20,
      border: '2px solid white',
      backgroundColor: 'transparent',
      x: x - 10,
      y: y - 10,
    },
    hover: {
      height: 60,
      width: 60,
      border: '2px solid white',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      x: x - 30,
      y: y - 30,
    },
    text: {
        height: 8,
        width: 8,
        border: '0px solid white',
        backgroundColor: 'white',
        x: x-4,
        y: y-4,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
      variants={variants}
      animate={variant}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  );
};

export default CustomCursor;
