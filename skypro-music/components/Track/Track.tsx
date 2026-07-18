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
            <div style={{color: theme === 'light' ? 'black' : ''}} className={styles.trackPlay__authorLink}>
                {currentTrack?.author}
            </div>
        </div>
        <div className={styles.trackPlay__album}>
            <div style={{color: theme === 'light' ? 'black' : ''}} className={styles.trackPlay__albumLink}>
                {currentTrack?.album}
            </div>
        </div>
    </div>
  )
}