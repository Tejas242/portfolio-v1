import { useEffect, useRef } from "react";

interface UseTypewriterProps {
  words: string[];
}

interface UseTypewriterResult {
  textRef: React.MutableRefObject<HTMLDivElement | null>;
}

const useTypewriter = ({
  words,
}: UseTypewriterProps): UseTypewriterResult => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const typeWords = async () => {
      for (let i = 0; i < words.length; i++) {
        const currentWord = words[i];

        // Print the word
        for (let j = 0; j <= currentWord.length; j++) {
          if (textRef.current) {
            textRef.current.innerHTML = `${currentWord.slice(
              0,
              j
            )}<span class="typing-cursor">|</span>`;
          }
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Wait for a moment
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Delete the word
        
          for (let k = currentWord.length; k >= 0; k--) {
            if (textRef.current) {
              textRef.current.innerHTML = `${currentWord.slice(
                0,
                k
              )}<span class="typing-cursor">|</span>`;
            }
            await new Promise((resolve) => setTimeout(resolve, 50));
          }
        

        if (i == words.length - 1) i = -1;

        // Wait for a moment before the next word
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    };

    typeWords();
  }, [words]);

  return { textRef };
};

export default useTypewriter;
