'use client'
import { useAppDispatch, useAppSelector } from '@/store/store';
import Track from '../Track/Track';
import styles from './BarTrack.module.css'
import cn from 'classnames';
import { useRef } from 'react';
import { setIsPlay } from '@/store/features/trackSlice'
export default function BarTrack() {
    const currentTrack = useAppSelector((state) => state.tracks.currentTrack)
    const isPlayTrackInd = useAppSelector((state) => state.tracks.isPlay)
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const dispatch = useAppDispatch()
    const playTrack = () => {
        if (audioRef.current && !isPlayTrackInd){
            audioRef.current.play()
            dispatch(setIsPlay(true))
        }
        else if (audioRef.current && isPlayTrackInd){
            audioRef.current.pause()
            dispatch(setIsPlay(false))
        }
    }
    if (!currentTrack)
        return <></>
    return (
        <>
        <div className={styles.bar}>
            <audio ref={audioRef} src={currentTrack.track_file} />
            <div className={styles.bar__content}>
                <div className={styles.bar__playerProgress}></div>
                <div className={styles.bar__playerBlock}>
                <div className={styles.bar__player}>
                    <div className={styles.player__controls}>
                    <div className={cn(styles.player__btnPrev, styles.btn)}>
                        <svg className={styles.player__btnPrevSvg}>
                        <use xlinkHref="/image/icon/sprite.svg#icon-prev"></use>
                        </svg>
                    </div>
                    <div onClick={() => playTrack()} className={cn(styles.player__btnPlay, styles.btn)}>
                        {!isPlayTrackInd ?
                        <svg className={styles.player__btnPlaySvg}>
                            <use xlinkHref="/image/icon/sprite.svg#icon-play"></use>
                        </svg>
                         :
                         <svg className={styles.player__btnPlaySvg}>
                            <use xlinkHref="/image/icon/pause.svg"></use>
                        </svg>}
                    </div>
                    <div className={styles.player__btnNext}>
                        <svg className={styles.player__btnNextSvg}>
                        <use xlinkHref="/image/icon/sprite.svg#icon-next"></use>
                        </svg>
                    </div>
                    <div className={cn(styles.player__btnRepeat, styles.btnIcon)}>
                        <svg className={styles.player__btnRepeatSvg}>
                        <use xlinkHref="/image/icon/sprite.svg#icon-repeat"></use>
                        </svg>
                    </div>
                    <div className={cn(styles.player__btnShuffle, styles.btnIcon)}>
                        <svg className={styles.player__btnShuffleSvg}>
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
                    <div className={styles.volume__content}>
                    <div className={styles.volume__image}>
                        <svg className={styles.volume__svg}>
                        <use xlinkHref="/image/icon/sprite.svg#icon-volume"></use>
                        </svg>
                    </div>
                    <div className={cn(styles.volume__progress, styles.btn)}>
                        <input
                        className={cn(styles.volume__progressLine, styles.btn)}
                        type="range"
                        name="range"
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