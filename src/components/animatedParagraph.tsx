import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedParagraphProps {
  name: string;
  hovered: boolean;
}

export default function AnimatedParagraph(props: AnimatedParagraphProps) {
  const { name, hovered } = props;
  const [isTextLongEnough, setIsTextLongEnough] = useState(false);
  const [animationEndPercentage , setAnimationEndPercentage ] = useState('')
  const textRef = useRef<HTMLSpanElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  // Verificar se o texto é maior que a div para poder aplicar o efeito de "infinity text"
  useEffect(() => {
    if (textRef.current && divRef.current) {
      const textWidth = textRef.current.offsetWidth;
      const divWidth = divRef.current.offsetWidth;

      console.log("nome:", name);
      console.log("textWidth:", textWidth);
      console.log("divWidth:", divWidth);
      console.log("porcentagem 1:", `-${((textWidth / divWidth) * 100)}%`);
      console.log("porcentagem 2:", `-${((textWidth / divWidth) * 100) + 10}%`);
      
      
      setIsTextLongEnough(textWidth > divWidth);
      setAnimationEndPercentage(`-${((textWidth / divWidth) * 100) + 20}%`)
    }
  }, [name]);

  return (
    <div className="w-full overflow-hidden" ref={divRef}>
      <motion.div
        initial={{ x: "0%" }}
        animate={hovered && isTextLongEnough ? { x: animationEndPercentage } : { x: "0%" }}
        transition={{
          x: {
            duration: hovered ? 5 : 0,
            repeat: hovered ? Infinity : 0,
            repeatType: "loop",
            ease: "linear",
          },
        }}
      >
        <span
          className="uppercase text-xs tracking-[.08em] text-background whitespace-nowrap inline-block"
          ref={textRef}
        >
          {name}
        </span>
      </motion.div>
    </div>
  );
}
