'use client'
import Playlist from '@/components/Playlist/Playlist';
import Filter from '@/components/FilterTrack/FilterTracks';
import { AudioProvider } from '@/context/AudioContext';
import { TrackType } from '@/sharedTypes/types';
import { useApi } from '@/ts/api';
import { useAppDispatch } from '@/store/store';
import { setNamePlaylist, setPlaylist, setPlaylistForFilter } from '@/store/features/trackSlice';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  const {fetchTracksAll} = useApi();
  const setPlaylistAll = async () => {
    const data: TrackType[] = await fetchTracksAll();
    await dispatch(setPlaylist(data));
    await dispatch(setPlaylistForFilter(data));
    await dispatch(setNamePlaylist('Треки'));
  }
  useEffect(() => {
    setPlaylistAll();
  },[])
  return (
    <>
    <Filter/>
    <AudioProvider>
        <Playlist />
    </AudioProvider>
    </>
  );
}