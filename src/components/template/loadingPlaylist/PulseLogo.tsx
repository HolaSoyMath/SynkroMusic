"use client";

import { useEffect } from "react";
import { animate } from "animejs";
import Image from "next/image";

type PulseLogoProps = {
  duration: number
}

export default function PulseLogo(props: PulseLogoProps) {
  const { duration } = props
  
  useEffect(() => {
    animate(".logo", {
      scale: [
        { to: 2, duration: duration, ease: "inOut" },
        { to: 2, duration: 200 },
        { to: 1, duration: duration, ease: "inOut" },
        { to: 1, duration: 2000 },
      ],
      loop: true,
    });
  });

  return (
    <div className="absolute w-28 h-28 flex items-center justify-center top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-black">
      <Image src={"/logoSemBG.png"} alt="Logo" className="logo" width={112} height={112}/>
    </div>
  );
}
