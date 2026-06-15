'use client'
import PlaylistCategory from '@/components/Playlist/PlaylistCategory';
import FilterCategory from '@/components/FilterTrack/FilterCategory';
import { AudioProvider } from '@/context/AudioContext';
import { useParams } from 'next/navigation';
export default function Category() {
  const param = useParams();
  const id = param.id ? param.id.toString() : null;
  return (
    <>
    <FilterCategory id={id}/>
    <AudioProvider>
        <PlaylistCategory id={id}/>
    </AudioProvider>
    </>
  );
}