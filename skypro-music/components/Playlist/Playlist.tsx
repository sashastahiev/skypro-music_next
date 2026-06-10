'use client'
import styles from './Playlist.module.css'
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsPlay } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/types';
import { useTrackData } from '@/ts/data';
import { useAudio } from '@/context/AudioContext';
import { useState } from 'react';
import BarTrack  from '@/components/BarTrack/BarTrack';
import { AudioProvider } from '@/context/AudioContext';
import { useParams } from 'next/navigation';
export default function Playlist() {
  const dispatch = useAppDispatch();
  const { playTrack } = useAudio();
  const { tracks, updateTracks } = useTrackData();
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
    setIsLoading(true);
    try {
      dispatch(setCurrentTrack(item));
      dispatch(setIsPlay(true));
      await playTrack();
    } catch (error) {
      console.error('Ошибка при смене трека:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const param = useParams();
  const changeCategory = async () => {
    const access =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwOTcxMjcxLCJpYXQiOjE2OTA5NjAxMzEsImp0aSI6ImE4YzQ5NDNmOWNmNTRlZjI5NmFmNTMyOWUwODM4YWQ5IiwidXNlcl9pZCI6NzkyfQ.5n8YHTjsgAnYnc4gioyV1wPnxM2D16PS6c9kNhC-JoE";

    const data = await fetch(`https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/${param.id}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then((response) => response.json())
    // const newTracks = data.data.items.map((item: any) => tracks[item])
    const idSet = new Set(data.data.items);

    // Фильтруем объекты по условию: _id должен быть в массиве idsToFind
    const filteredTracks = tracks.filter(track => idSet.has(track._id));
    updateTracks(filteredTracks);
  }
  changeCategory();
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
        <div className={styles.content__playlist}>
          {tracks.map((item, index) => (
            <div
              onClick={() => onClickTrack(item)}
              className={cn(
                styles.playlist__item,
                // Добавляем класс disabled, если трек загружается
                isLoading && styles.playlist__item_disabled
              )}
              key={index}
              // Блокируем взаимодействие через CSS pointer-events
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
            {currentTrack?.id === item.id && <div className={isPlayTrackInd ? styles.pulsing_circle : styles.pulsing_circle_nonActive}></div>}
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
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/image/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>{formatDuration(item.duration_in_seconds)}</span>
        </div>
      </div>
    </div>
  ))}
</div>
</div>
<AudioProvider>
  <BarTrack />
</AudioProvider>
</>
  );
}
