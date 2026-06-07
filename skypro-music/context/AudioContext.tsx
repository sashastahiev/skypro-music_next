// AudioContext.tsx
'use client'
import React, { createContext, useRef, useContext, useCallback, useState, useEffect } from 'react';

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playTrack: (src: string) => void;
  stopTrack: () => void;
}

export const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
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
    <AudioContext.Provider value={{ audioRef, playTrack, stopTrack }}>
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
