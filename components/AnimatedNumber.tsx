import React, { useEffect } from 'react';
import { useMotionValue, useTransform, animate, motion } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, className }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, value, {
      duration: 1.5,
      ease: "easeOut"
    });

    return animation.stop;
  }, [value]);

  return <motion.span className={className}>{rounded}</motion.span>;
};

export default AnimatedNumber;