'use client'
import Playlist from '@/components/Playlist/Playlist';
import Filter from '@/components/FilterTrack/FilterTracks';
import { AudioProvider } from '@/context/AudioContext';
import { useAppDispatch } from '@/store/store';
import { useApi } from '@/ts/api';
import { TrackType } from '@/sharedTypes/types';
import { setPlaylist, setNamePlaylist, setPlaylistForFilter } from '@/store/features/trackSlice';
import { useEffect } from 'react';
import BarTrack from '@/components/BarTrack/BarTrack';
export default function Favorite() {
  const dispatch = useAppDispatch();
    const {fetchTrackFavoriteAll} = useApi();
    const setPlaylistFavoriteAll = async () => {
      if (localStorage.getItem('email')){
        const data: TrackType[] = await fetchTrackFavoriteAll()
        await dispatch(setPlaylist(data));
        await dispatch(setPlaylistForFilter(data));
        await dispatch(setNamePlaylist('Избранные'));
      }
    }
    useEffect(() => {
      setPlaylistFavoriteAll();
    },[])
  return (
    <>
    <Filter/>
    <AudioProvider>
        <Playlist />
        <BarTrack />
    </AudioProvider>
    </>
  );
}