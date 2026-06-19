'use client'
import styles from './Playlist.module.css'
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsPlay } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/types';
import { useEffect, useState } from 'react';
import { useApi } from '@/ts/api';
import formatDuration from '@/utils/formatDurations'
import { useTheme } from '@/context/ThemeContext';

export default function Playlist() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const playlist: TrackType[] = useAppSelector((state) => state.tracks.PlaylistForFilter);
  const namePlaylist: string = useAppSelector((state) => state.tracks.namePlaylist)
  const [tracks, setTracks] = useState<TrackType[]>([])
  const {fetchTrackDelete, fetchTrackAdd} = useApi();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlayTrackInd = useAppSelector((state) => state.tracks.isPlay);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onClickTrack = async (item: TrackType) => {
    if (isLoading) return;
      await dispatch(setIsPlay(false));
      setIsLoading(true);
    try {
      await dispatch(setCurrentTrack(item));
      await dispatch(setIsPlay(true));
    } catch (error) {
      console.error('Ошибка при смене трека:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTracks(playlist);
    setIsLoading(false);
  },[playlist])
  
  const setIsLike = async (e: React.MouseEvent, item: TrackType) => {
    e.stopPropagation()
    const updatedItem: TrackType = { ...item, isLike: !item.isLike };
    if (namePlaylist === 'Избранные'){
      setTracks(tracks.filter(track => track._id !== item._id))
    }
    else {
      setTracks(tracks.map(track =>
        track.id === item.id ? updatedItem : track
      ));
    }
    if (updatedItem.isLike){
      await fetchTrackAdd(updatedItem._id)
    }
    else {
      await fetchTrackDelete(updatedItem._id)
    }
  }
  return (
    <>
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={cn(styles.playlistTitle__col, styles.col01)}>Трек ({tracks.length})</div>
          <div className={cn(styles.playlistTitle__col, styles.col02)}>Исполнитель</div>
          <div className={cn(styles.playlistTitle__col, styles.col03)}>Альбом</div>
          {localStorage.getItem('access') ? <div className={styles.block4}></div> : ''}
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
            <div style={{backgroundColor: theme === 'light' ? '#F6F4F4' : ''}} className={styles.track__titleImage}>
              <svg className={styles.track__titleSvg}>
                {theme === 'dark' ? <use xlinkHref="/image/icon/sprite.svg#icon-note"></use> :
                <use xlinkHref="/image/icon/noteLight.svg"></use>}
              </svg>
              {currentTrack?._id === item._id && <div className={isPlayTrackInd ? styles.pulsing_circle : styles.pulsing_circle_nonActive}></div>}
            </div>
            <div className={styles.track__title}>
              <a style={{color: theme === 'light' ? 'black' : ''}} className={styles.track__titleLink} href="#">
                {item.name} <span className={styles.track__titleSpan}></span>
              </a>
            </div>
          </div>
          <div className={styles.track__author}>
            <a style={{color: theme === 'light' ? 'black' : ''}} className={styles.track__authorLink} href="#">
              {item.author}
            </a>
          </div>
          <div className={styles.track__album}>
            <a className={styles.track__albumLink} href="#">
              {item.album}
            </a>
          </div>
          <div className={styles.track__time}>
            { localStorage.getItem('email') ? <>
            <svg onClick={(e) => {setIsLike(e,item)}} className={styles.track__timeSvg}>
              {!item.isLike ? <use xlinkHref="/image/icon/sprite.svg#icon-like"></use>
              : 
              <use xlinkHref="/image/icon/LikeActive.svg"></use>}
            </svg></> : ''}
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
</>
  );
}
