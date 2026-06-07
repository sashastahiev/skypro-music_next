'use client'
import styles from './Playlist.module.css'
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsPlay } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/types';
import { useTrackData } from '@/ts/data';
import { useAudio } from '@/context/AudioContext';
import { useState } from 'react';

export default function Playlist() {
  const dispatch = useAppDispatch();
  const { playTrack, stopTrack } = useAudio();
  const { tracks } = useTrackData();
  const { circleActive, isPlayCircle } = useAudio();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  // Состояние для отслеживания загрузки
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = (item: TrackType) => {
    onClickTrack(item);
    circleActive(item._id);
  };
  function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  const onClickTrack = async (item: TrackType) => {
    // Если уже идёт обработка другого трека — выходим
    if (isLoading) return;

    // Устанавливаем ID текущего трека как загружаемого
    setIsLoading(true);

    try {
      // Останавливаем текущий трек, если он есть
      if (currentTrack) {
        stopTrack();
      }

      // Устанавливаем новый трек
      await dispatch(setCurrentTrack(item));
      await dispatch(setIsPlay(true));
      if (currentTrack)

      // Запускаем воспроизведение нового трека
      if (item.track_file) {
        playTrack(item.track_file);
      }
    } catch (error) {
      console.error('Ошибка при смене трека:', error);
    } finally {
      // Сбрасываем состояние загрузки после завершения
      setIsLoading(false);
    }
  };

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
          {tracks.map((item) => (
            <div
              onClick={() => handleClick(item)}
              className={cn(
                styles.playlist__item,
                // Добавляем класс disabled, если трек загружается
                isLoading && styles.playlist__item_disabled
              )}
              key={item._id}
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
            {isPlayCircle[item._id] && <div className={styles.pulsing_circle}></div>}
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
</>
  );
}
