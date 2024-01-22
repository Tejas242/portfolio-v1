"use client"
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import useTypewriter from "../hooks/useTypewriter"; // Update the path accordingly

const UbuntuTypewriter = ({ words }: { words: string[] }) => {
  const { textRef } = useTypewriter({ words });

  return (
    <motion.div ref={textRef} className="mt-10 text-4xl" >
      <AnimatePresence>
        <motion.span
          key="cursor"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.8, yoyo: Infinity }}
        >
          |
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};

export default UbuntuTypewriter;
