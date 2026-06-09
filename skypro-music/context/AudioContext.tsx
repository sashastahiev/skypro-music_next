'use client'
import React, { createContext, useRef, useContext, useState, useEffect } from 'react';

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  playTrack: () => void;
  stopTrack: () => void;
}

export const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playTrack = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
    } catch (error) {
      console.error('Ошибка при запуске трека:', error);
    }
  };

  const stopTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

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
