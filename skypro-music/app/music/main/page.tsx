'use client'
import Playlist from '@/components/Playlist/Playlist';
import Filter from '@/components/FilterTrack/FilterTracks';
import { AudioProvider } from '@/context/AudioContext';
export default function Home() {
  return (
    <>
    <Filter/>
    <AudioProvider>
        <Playlist />
    </AudioProvider>
    </>
  );
}