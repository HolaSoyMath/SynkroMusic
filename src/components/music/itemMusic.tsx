"use client";

import { formatTime } from "@/utils/msToMinuteAndSecond";
import { SetStateAction, useState } from "react";
import { Button } from "../ui/button";

interface ItemMusicProps {
  name: string;
  durationMs: number;
  musicId: string;
  setSelectedMusic: React.Dispatch<SetStateAction<string[]>>;
  selectedMusics: string[];
}

export default function ItemMusic(musics: ItemMusicProps) {
  const { name, durationMs, musicId, selectedMusics, setSelectedMusic } =
    musics;

  const checked = selectedMusics.includes(musicId);
  const [check, setCheck] = useState(checked);

  function changeMusicList(id: string) {
    setCheck(!check);

    if (selectedMusics.includes(id)) {
      setSelectedMusic(selectedMusics.filter((musicId) => musicId !== id));
    } else {
      setSelectedMusic([...selectedMusics, id]);
    }
  }

  return (
    <Button
      className="flex px-15 py-6 rounded-none w-full text-start bg-transparent shadow-none hover:bg-white/30 transform duration-300 cursor-pointer items-center"
      onClick={() => changeMusicList(musicId)}
    >
      <div className="w-1/12 h-full flex items-center">
        <input
          id={musicId}
          type="checkbox"
          checked={check}
          onChange={() => setCheck(!check)}
          color="red"
          className={`w-4 h-4 appearance-none cursor-pointer border-1 border-background rounded-sm transition-all duration-300 checked:bg-background `}
        />
      </div>

      <span className="uppercase text-xs tracking-[.08em] text-background w-10/12 line-clamp-1">
        {name}
      </span>
      <span className="uppercase text-xs tracking-[.08em] text-background w-1/12">
        {formatTime(durationMs)}
      </span>
    </Button>
  );
}
