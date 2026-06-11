'use client'
import { TrackType } from "@/sharedTypes/types";
import { useState } from 'react';
export let data: TrackType[] = await fetch("https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/", {
    method: "GET",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
    },
})
.then((response) => response.json())
.then((json) => json.data);
data = data.map((item, index) => ({
    ...item,
    id: index,
    isLike: false,
}));
export const useTrackData = () => {
  const [tracks, setTracks] = useState<TrackType[]>(data);
  const updateTracks = (newTracks: any) => {
    setTracks(newTracks);
  };
  return { tracks, updateTracks};
};
