'use client'
import { useAppDispatch, useAppSelector } from '@/store/store';
import Track from '../Track/Track';
import styles from './BarTrack.module.css';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { setCurrentTrack, setIsLoop, setIsPlay, setIsShuffle } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/types';
import { useAudio } from '@/context/AudioContext';
import { useTheme } from '@/context/ThemeContext';

export default function BarTrack() {
  const { theme } = useTheme();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlayTrackInd = useAppSelector((state) => state.tracks.isPlay);
  const isLooptrack = useAppSelector((state) => state.tracks.isLoop);
  const isShuffleTrack = useAppSelector((state) => state.tracks.isShuffle);
  const { audioRef } = useAudio();
  const volumeSliderRef = useRef<HTMLInputElement>(null);
  const playlist: TrackType[] = useAppSelector((state) => state.tracks.PlaylistForFilter)
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
   setTracks(playlist);
  },[playlist])
  function formatDuration(seconds: number) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    if (Number.isNaN(seconds)) {
      minutes = 0;
      secs = 0;
    }
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  const playStart = async () => {
    if (isPlayTrackInd){
      await audioRef?.current?.play();
    }
    else if (!isPlayTrackInd)
      await audioRef?.current?.pause();
  }
  useEffect(() => {
    playStart();
  },[isPlayTrackInd])
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      if (isFinite(duration) && duration > 0) {
        const newProgress = (currentTime / duration) * 100;
        setProgress(newProgress);
      }
    }
  };
  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const progressWidth = rect.width;
    const newProgress = (clickX / progressWidth) * 100;

    setProgress(newProgress);
    audioRef.current.currentTime = Math.round((newProgress / 100) * audioRef.current.duration);
  };
const nextTrack = async () => {
    if (!audioRef.current || !currentTrack) return;
    console.log(tracks)
    let currentId: number = await currentTrack.id;
    let nextId: number;
    if (isShuffleTrack) {
      do {
        nextId = Math.floor(Math.random() * tracks.length);
      } while (nextId === currentId && tracks.length > 1);
    } else {
      nextId = (currentId + 1 + tracks.length) % tracks.length;
    }
    const nextTrack: TrackType = tracks[nextId];
    await dispatch(setCurrentTrack(nextTrack));
    await dispatch(setIsPlay(true));
    try {
      setIsLoading(true);
      await audioRef.current.load();
      await new Promise(resolve => {
        audioRef.current!.onloadeddata = resolve;
      });
      await audioRef.current.play();
      setIsLoading(false);
    } catch (error) {
      console.error('Ошибка воспроизведения следующего трека:', error);
      await dispatch(setIsPlay(false));
    }
    console.log(nextId)
  };
  const prevTrack = async () => {
    if (!audioRef.current || !currentTrack) return;
    await dispatch(setIsPlay(false))
    let currentId: number = currentTrack.id;
    let prevId: number = (currentId - 1 + tracks.length) % tracks.length;
    const prevTrack: TrackType = tracks[prevId];
    await dispatch(setCurrentTrack(prevTrack));
    await dispatch(setIsPlay(true));
    try {
      setIsLoading(true);
      await audioRef.current.load();
      await new Promise(resolve => {
        audioRef.current!.onloadeddata = resolve;
      });
      await audioRef.current.play();
      setIsLoading(false);
    } catch (error) {
      console.error('Ошибка воспроизведения предыдущего трека:', error);
      await dispatch(setIsPlay(false));
    }
  };
  const toggleIsLoop = () => {
    dispatch(setIsLoop(!isLooptrack));
  };
  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (!isPlayTrackInd) {
        await dispatch(setIsPlay(true));
      } else {
        await dispatch(setIsPlay(false));
      }
    } catch (error) {
      console.error('Ошибка управления воспроизведением:', error);
    }
  };
  const toggleIsShuffle = () => {
    dispatch(setIsShuffle(!isShuffleTrack));
  };

  const onEndedTrack = async () => {
    if (isLooptrack) {
      try {
        await audioRef.current?.play();
      } catch (error) {
        console.error('Ошибка зацикливания трека:', error);
      }
    } else {
      await nextTrack();
    }
  };
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume: number = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  const handleLoadedData = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }
  };
  if (!currentTrack) return <></>;

  return (
    <>
    <div style={{backgroundColor: theme === 'light' ? 'white' : ''}} className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack.track_file}
        loop={isLooptrack}
        onEnded={onEndedTrack}
        onTimeUpdate={handleTimeUpdate}
        preload="auto"
        onLoadedData={handleLoadedData}
      />
        <div className={styles.bar__content}>
          <div
              className={styles.progressContainer}
              onClick={handleProgressClick}
          >
            <div
            className={styles.bar__playerProgress}
            ref={progressBarRef}
            >
              <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className={styles.bar__playerBlock}>
            <div className={styles.bar__player}>
                <div className={styles.player__controls}>
                <div onClick={prevTrack} className={cn(styles.player__btnPrev, styles.btn)}>
                    <svg className={styles.player__btnPrevSvg}>
                    <use xlinkHref="/image/icon/sprite.svg#icon-prev"></use>
                    </svg>
                </div>
                { isLoading ? <div className={styles.loader_spinner}></div> : 
                <div onClick={() => togglePlay()} className={cn(styles.player__btnPlay, styles.btn)}>
                    {!isPlayTrackInd ?
                    <svg className={styles.player__btnPlaySvg}>
                        <use xlinkHref="/image/icon/sprite.svg#icon-play"></use>
                    </svg>
                    :
                    <svg className={styles.player__btnPlaySvg}>
                        <use xlinkHref="/image/icon/pause.svg"></use>
                    </svg>}
                </div>}
                <div onClick={nextTrack} className={cn(styles.player__btnNext, styles.btn)}>
                    <svg className={styles.player__btnNextSvg}>
                    <use xlinkHref="/image/icon/sprite.svg#icon-next"></use>
                    </svg>
                </div>
                <div onClick={toggleIsLoop}  className={cn(styles.player__btnRepeat, {[styles.btnIcon]: !isLooptrack})}>
                    <svg className={!isLooptrack ? styles.player__btnRepeatSvg : styles.btnActive}>
                    <use xlinkHref="/image/icon/sprite.svg#icon-repeat"></use>
                    </svg>
                </div>
                <div  onClick={toggleIsShuffle} className={cn(styles.player__btnShuffle, {[styles.btnIcon]: !isShuffleTrack})}>
                    <svg className={!isShuffleTrack ? styles.player__btnShuffleSvg : styles.btnShuffleActive}>
                    <use xlinkHref="/image/icon/sprite.svg#icon-shuffle"></use>
                    </svg>
                </div>
                </div>
                <div className={styles.player__trackPlay}>
                <Track />
                <div className={styles.trackPlay__dislike}>
                    <div className={cn(styles.player__btnShuffle, styles.btnIcon)}>
                    <svg className={styles.trackPlay__likeSvg}>
                        {currentTrack.isLike ? <use xlinkHref="/image/icon/LikeActive.svg"></use> :
                        <use xlinkHref="/image/icon/sprite.svg#icon-like"></use>}
                    </svg>
                    </div>
                </div>
                </div>
            </div>
            <div className={styles.bar__volumeBlock}>
              <div style={{ color: theme === 'dark' ? 'white' : 'black', marginRight: '20px' , userSelect: 'none'}}>
                {formatDuration(
                  Math.round(audioRef.current ? audioRef.current.currentTime : 0)
                )}/
                {formatDuration(
                  Math.round(audioRef.current && !isNaN(audioRef.current.duration)
                    ? audioRef.current.duration
                    : 0
                  )
                )}
              </div>
                <div className={styles.volume__content}>
                  <div className={styles.volume__image}>
                    <svg className={styles.volume__svg}>
                      <use xlinkHref="/image/icon/sprite.svg#icon-volume"></use>
                    </svg>
                  </div>
                  <div className={cn(styles.volume__progress, styles.btn)}>
                      <input
                      ref={volumeSliderRef}
                      className={cn(styles.volume__progressLine, styles.btn)}
                      type="range"
                      name="range"
                      min="0"
                      max="1"
                      step="0.01"
                      defaultValue="0.2"
                      onChange={handleVolumeChange}
                      />
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}