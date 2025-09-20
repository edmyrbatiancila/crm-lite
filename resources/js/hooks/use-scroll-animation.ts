import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useScrollAnimation = (amount = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount,
    margin: "-100px 0px -100px 0px"
  });

  return { ref, isInView };
};