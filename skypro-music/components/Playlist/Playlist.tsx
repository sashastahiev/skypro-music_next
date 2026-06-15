'use client'
import styles from './Playlist.module.css'
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsPlay } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/types';
import { useEffect, useState } from 'react';
import BarTrack  from '@/components/BarTrack/BarTrack';
import { AudioProvider } from '@/context/AudioContext';
import { useApi } from '@/ts/api';

export default function Playlist() {
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const {fetchTrackDelete, fetchTrackAdd, fetchTracksAll} = useApi();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlayTrackInd = useAppSelector((state) => state.tracks.isPlay);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const onClickTrack = async (item: TrackType) => {
    if (isLoading) return;
    await dispatch(setIsPlay(false));
    await setIsLoading(true);
    try {
      await dispatch(setCurrentTrack(item));
      await dispatch(setIsPlay(true));
    } catch (error) {
      console.error('Ошибка при смене трека:', error);
    } finally {
      await setIsLoading(false);
    }
  };
  const setIsLike = async (e: React.MouseEvent, item: TrackType) => {
    e.stopPropagation()
    const updatedItem: TrackType = { ...item, isLike: !item.isLike };
    setTracks(tracks.map(track =>
      track.id === item.id ? updatedItem : track
    ));
    if (updatedItem.isLike){
      await fetchTrackAdd(updatedItem._id)
    }
    else {
      await fetchTrackDelete(updatedItem._id)
    }
  }
  const changeCategory = async () => {
    setIsLoading(true);
    let data: TrackType[] = [];
    if (localStorage.getItem('name')){
      data = await fetchTracksAll();
    }
    setTracks(data);
    setIsLoading(false);
  };
  useEffect(() => {
    changeCategory();
  },[]);
  return (
    <>
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={cn(styles.playlistTitle__col, styles.col01)}>Трек</div>
          <div className={cn(styles.playlistTitle__col, styles.col02)}>Исполнитель</div>
          <div className={cn(styles.playlistTitle__col, styles.col03)}>Альбом</div>
          <div className={cn(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/image/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        {!isLoading ? 
        <div className={styles.content__playlist}>
          {tracks.map((item, index) => (
            <div
              onClick={() => onClickTrack(item)}
              className={cn(
                styles.playlist__item,
                isLoading && styles.playlist__item_disabled
              )}
              key={index}
              style={{
                pointerEvents: isLoading ? 'none' : 'auto'
              }}
            >
        <div className={styles.playlist__track}>
          <div className={styles.track__title}>
            <div className={styles.track__titleImage}>
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/image/icon/sprite.svg#icon-note"></use>
              </svg>
              {currentTrack?._id === item._id && <div className={isPlayTrackInd ? styles.pulsing_circle : styles.pulsing_circle_nonActive}></div>}
            </div>
            <div className={styles.track__title}>
              <a className={styles.track__titleLink} href="#">
                {item.name} <span className={styles.track__titleSpan}></span>
              </a>
            </div>
          </div>
          <div className={styles.track__author}>
            <a className={styles.track__authorLink} href="#">
              {item.author}
            </a>
          </div>
          <div className={styles.track__album}>
            <a className={styles.track__albumLink} href="#">
              {item.album}
            </a>
          </div>
          <div className={styles.track__time}>
            <svg onClick={(e) => {setIsLike(e,item)}} className={styles.track__timeSvg}>
              {!item.isLike ? <use xlinkHref="/image/icon/sprite.svg#icon-like"></use>
              : 
              <use xlinkHref="/image/icon/LikeActive.svg"></use>}
            </svg>
            <span className={styles.track__timeText}>{formatDuration(item.duration_in_seconds)}</span>
          </div>
        </div>
    </div>
  ))}
  </div> : 
    <div className={styles.loader}>
      <div className={styles.loader_spinner}></div>
  </div>}
</div>
<AudioProvider>
  <BarTrack />
</AudioProvider>
</>
  );
}
