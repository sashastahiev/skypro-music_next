// AudioContext.tsx
'use client'
import React, { createContext, useRef, useContext, useCallback, useState, useEffect } from 'react';
import { useTrackData } from '@/ts/data';

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlayCircle: boolean[]; // Экспортируем состояние
  playTrack: (src: string) => void;
  stopTrack: () => void;
  circleActive: (id: number) => void;
}

export const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { tracks } = useTrackData();
  const [isPlayCircle, setIsPlayCircle] = useState<boolean[]>(tracks.map(track => track.isPlaying));
  const circleActive = useCallback((id: number) => {
    setIsPlayCircle(prevArray =>
      prevArray.map((value) =>
         value === true ? false : value
        )
      );
      setIsPlayCircle(prevArray =>
        prevArray.map((value, i) =>
          i === id ? true : value
        )
      );
  }, [isPlayCircle]);

  const playTrack = useCallback((src: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
    } else {
      audioRef.current.src = src;
    }
    audioRef.current
      .play()
      .then(() => {
        console.log('Трек успешно запущен');
      })
      .catch((error) => {
        console.error('Ошибка при запуске трека:', error);
      });
  }, []);

  const stopTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return (
    <AudioContext.Provider value={{ audioRef, isPlayCircle, playTrack, stopTrack, circleActive }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
