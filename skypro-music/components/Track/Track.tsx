import { useAppSelector } from '@/store/store'
import styles from './Track.module.css'
import { useTheme } from '@/context/ThemeContext'
export default function Track() {
    const currentTrack = useAppSelector((state) => state.tracks.currentTrack)
    const { theme } = useTheme();
  return (
    <div className={styles.trackPlay__contain}>
        <div style={{backgroundColor: theme === 'light' ? '#F6F4F4' : ''}} className={styles.trackPlay__image}>
            <svg className={styles.trackPlay__svg}>
                {theme === 'dark' ? <use xlinkHref="/image/icon/sprite.svg#icon-note"></use> : 
                <use xlinkHref="/image/icon/noteLight.svg"></use> }
            </svg>
        </div>
        <div className={styles.trackPlay__author}>
            <a style={{color: theme === 'light' ? 'black' : ''}} className={styles.trackPlay__authorLink} href="">
                {currentTrack?.author}
            </a>
        </div>
        <div className={styles.trackPlay__album}>
            <a style={{color: theme === 'light' ? 'black' : ''}} className={styles.trackPlay__albumLink} href="">
                {currentTrack?.album}
            </a>
        </div>
    </div>
  )
}