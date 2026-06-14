'use client'
import { TrackType } from "@/sharedTypes/types";
import { useEffect, useState } from 'react';
export const useTrackData = () => {
  const [tracks, setTracks] = useState([]);
  const updateTracks = (newTracks: any) => {
    setTracks(newTracks);
  };
  return { tracks, updateTracks };
}