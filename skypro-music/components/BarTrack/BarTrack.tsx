'use client'
import { useAppDispatch, useAppSelector } from '@/store/store';
import Track from '../Track/Track';
import styles from './BarTrack.module.css'
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { setCurrentTrack, setIsLoop, setIsPlay, setIsShuffle } from '@/store/features/trackSlice'
import { data } from '@/ts/data';
import { TrackType } from '@/sharedTypes/types';
export default function BarTrack() {
    const currentTrack = useAppSelector((state) => state.tracks.currentTrack)
    const isPlayTrackInd = useAppSelector((state) => state.tracks.isPlay)
    const isLooptrack = useAppSelector((state) => state.tracks.isLoop)
    const isShuffleTrack = useAppSelector((state) => state.tracks.isShuffle)
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const volumeSliderRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()
    function formatDuration(seconds: number) {
        let minutes = Math.floor(seconds / 60);
        let secs = seconds % 60;
        if (Number.isNaN(seconds))
        { minutes = 0; secs = 0}
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState<number>(0);
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
        audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    };
    const nextTrack = () => {
        if (audioRef.current) {
            let currentId: number | undefined = currentTrack?._id;
            if (currentId === undefined) { return; }
            if (currentId < data.length && isShuffleTrack){
                currentId = (Math.random()) % data.length;
            } else if (currentId < data.length - 1 && !isShuffleTrack){
                currentId = currentId + 1;
            }
            const nextTrack: TrackType = data[currentId];
            dispatch(setCurrentTrack(nextTrack));
        }
    };
    const prevTrack = () => {
        if (audioRef.current) {
             let currentId: number | undefined = currentTrack?._id;
            if (currentId === undefined) { return; }
            if (currentId > 0){
                currentId = currentId - 1;
            }
            const nextTrack: TrackType = data[currentId];
            dispatch(setCurrentTrack(nextTrack));
        }
    };
    const toogleIsLoop = () => {
        dispatch(setIsLoop(!isLooptrack))
    }
    const togglePlay = () => {
        if (audioRef.current && !isPlayTrackInd){
            audioRef.current.play()
            dispatch(setIsPlay(true))
        }
        else if (audioRef.current && isPlayTrackInd){
            audioRef.current.pause()
            dispatch(setIsPlay(false))
        }
    }
    const toogleIsShuffle = () => {
        dispatch(setIsShuffle(!isShuffleTrack))
    }
    const onEndedTrack = () => {
        if (!isLooptrack){
            nextTrack();
            dispatch(setIsPlay(true))
        }
    }
    useEffect(() => {
        if (audioRef.current) {
        audioRef.current.volume = 0.5;
        if (volumeSliderRef.current) {
            volumeSliderRef.current.value = '0.5';
        }
        }
    }, []);
    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };
    if (!currentTrack)
        return <></>
    return (
        <>
        <div className={styles.bar}>
            <audio 
            ref={audioRef} 
            src={currentTrack.track_file} 
            loop={isLooptrack}
            onEnded={() => onEndedTrack()}
            onTimeUpdate={handleTimeUpdate}
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
                    <div onClick={() => togglePlay()} className={cn(styles.player__btnPlay, styles.btn)}>
                        {!isPlayTrackInd ?
                        <svg className={styles.player__btnPlaySvg}>
                            <use xlinkHref="/image/icon/sprite.svg#icon-play"></use>
                        </svg>
                         :
                         <svg className={styles.player__btnPlaySvg}>
                            <use xlinkHref="/image/icon/pause.svg"></use>
                        </svg>}
                    </div>
                    <div onClick={nextTrack} className={cn(styles.player__btnNext, styles.btn)}>
                        <svg className={styles.player__btnNextSvg}>
                        <use xlinkHref="/image/icon/sprite.svg#icon-next"></use>
                        </svg>
                    </div>
                    <div onClick={toogleIsLoop}  className={cn(styles.player__btnRepeat, {[styles.btnIcon]: !isLooptrack})}>
                        <svg className={!isLooptrack ? styles.player__btnRepeatSvg : styles.btnActive}>
                        <use xlinkHref="/image/icon/sprite.svg#icon-repeat"></use>
                        </svg>
                    </div>
                    <div  onClick={toogleIsShuffle} className={cn(styles.player__btnShuffle, {[styles.btnIcon]: !isShuffleTrack})}>
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
                            <use xlinkHref="/image/icon/sprite.svg#icon-like"></use>
                        </svg>
                        </div>
                        <div className={cn(styles.trackPlay__dislike, styles.btnIcon)}>
                        <svg className={styles.trackPlay__dislikeSvg}>
                            <use xlinkHref="/image/icon/sprite.svg#icon-dislike"></use>
                        </svg>
                        </div>
                    </div>
                    </div>
                </div>
                <div className={styles.bar__volumeBlock}>
                    <div style={{color: 'white', marginRight:'20px'}}>
                        {formatDuration(Math.round(audioRef.current ? audioRef.current?.currentTime : 0))}/
                        {formatDuration(Math.round(audioRef.current ? audioRef.current?.duration : 0))}
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
                        defaultValue="0.5"
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