'use client'
import Playlist from '@/components/Playlist/Playlist';
import Filter from '@/components/FilterTrack/FilterTracks';
import { AudioProvider } from '@/context/AudioContext';
import { useAppDispatch } from '@/store/store';
import { useApi } from '@/ts/api';
import { TrackType } from '@/sharedTypes/types';
import { setPlaylist, setNamePlaylist } from '@/store/features/trackSlice';
import { useEffect } from 'react';
export default function Favorite() {
  const dispatch = useAppDispatch();
    const {fetchTrackFavoriteAll} = useApi();
    const setPlaylistFavoriteAll = async () => {
      if (localStorage.getItem('name')){
        const data: TrackType[] = await fetchTrackFavoriteAll()
        dispatch(setPlaylist(data));
        dispatch(setNamePlaylist('Избранные'));
      }
    }
    useEffect(() => {
      setPlaylistFavoriteAll();
    })
  return (
    <>
    <Filter/>
    <AudioProvider>
        <Playlist />
    </AudioProvider>
    </>
  );
}