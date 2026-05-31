import { useAppSelector } from '@/store/store'
import styles from './Track.module.css'
export default function Track() {
    const currentTrack = useAppSelector((state) => state.tracks.currentTrack)
  return (
    <div className={styles.trackPlay__contain}>
        <div className={styles.trackPlay__image}>
            <svg className={styles.trackPlay__svg}>
                <use xlinkHref="/image/icon/sprite.svg#icon-note"></use>
            </svg>
        </div>
        <div className={styles.trackPlay__author}>
            <a className={styles.trackPlay__authorLink} href="">
                {currentTrack?.author}
            </a>
        </div>
        <div className={styles.trackPlay__album}>
            <a className={styles.trackPlay__albumLink} href="">
                {currentTrack?.album}
            </a>
        </div>
    </div>
  )
}