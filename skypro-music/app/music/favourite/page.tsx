'use client'
import PlaylistFavorite from '@/components/Playlist/PlaylistFavorite';
import FilterFavorite from '@/components/FilterTrack/FilterFavorite';
import { AudioProvider } from '@/context/AudioContext';
export default function Favorite() {
  return (
    <>
    <FilterFavorite/>
    <AudioProvider>
        <PlaylistFavorite />
    </AudioProvider>
    </>
  );
}