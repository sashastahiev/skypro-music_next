'use client'
import { TrackType } from "@/sharedTypes/types";
import { useParams } from "next/navigation";
import { useState } from 'react';
const access =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwOTYwNDMxLCJpYXQiOjE2OTA5NjAxMzEsImp0aSI6ImE4NDAwZjRkNWUzMTQ4NGJiMzE4YzUzMjE3Y2NhNWZmIiwidXNlcl9pZCI6NzkyfQ.SfvLYWbz72DQqWK7SyF4Yx9Zxx8hGsNxHEcwOU0RTk4";

export let data: TrackType[] = await fetch("https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${access}`,
  },
})
  .then((response) => response.json())
  .then((response) => response.data);
data = data.map((item, index) => ({
    ...item,
    id: index
  }));
export const useTrackData = () => {
  const [tracks, setTracks] = useState<TrackType[]>(data);
  const updateTracks = (newTracks: TrackType[]) => {
    setTracks(newTracks);
  };
  return { tracks, updateTracks};
};
