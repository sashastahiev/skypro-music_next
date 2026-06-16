'use client'
import Playlist from '@/components/Playlist/Playlist';
import Filter from '@/components/FilterTrack/FilterTracks';
import { AudioProvider } from '@/context/AudioContext';
import { useParams } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { useApi } from '@/ts/api';
import { TrackType } from '@/sharedTypes/types';
import { setPlaylist, setNamePlaylist } from '@/store/features/trackSlice';
import { useEffect } from 'react';
export default function Category() {
  const param = useParams();
  const id = param.id ? param.id.toString : null;
  const dispatch = useAppDispatch();
  const {fetchTrackCategory} = useApi();
  const SetPlaylistCategory = async () => {
    const data: TrackType[] = await fetchTrackCategory(Number(id));
    await dispatch(setPlaylist(data));
    if (Number(id) === 2)
      await dispatch(setNamePlaylist('Плейлист дня'))
    if (Number(id) === 3)
      await dispatch(setNamePlaylist('100 танцевальных хитов'))
    if (Number(id) === 4)
      await dispatch(setNamePlaylist('Инди-заряд'))
  }
  useEffect(() => {
    SetPlaylistCategory();
  },[])
  return (
    <>
    <Filter/>
    <AudioProvider>
        <Playlist/>
    </AudioProvider>
    </>
  );
}