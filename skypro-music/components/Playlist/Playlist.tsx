import styles from './Playlist.module.css'
import cn from 'classnames';
export default function Playlist() {
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
            <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
                <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                    <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/image/icon/sprite.svg#icon-note"></use>
                    </svg>
                </div>
                <div className={styles.track__title}>
                    <a className={styles.track__titleLink} href="">
                    Guilt <span className={styles.track__titleSpan}></span>
                    </a>
                </div>
                </div>
                <div className={styles.track__author}>
                <a className={styles.track__authorLink} href="">
                    Nero
                </a>
                </div>
                <div className={styles.track__album}>
                <a className={styles.track__albumLink} href="">
                    Welcome Reality
                </a>
                </div>
                <div className={styles.track__time}>
                <svg className={styles.track__timeSvg}>
                    <use xlinkHref="/image/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>4:44</span>
                </div>
            </div>
            </div>

            <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
                <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                    <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/image/icon/sprite.svg#icon-note"></use>
                    </svg>
                </div>
                <div className={styles.track__title}>
                    <a className={styles.track__titleLink} href="">
                    Elektro <span className={styles.track__titleSpan}></span>
                    </a>
                </div>
                </div>
                <div className={styles.track__author}>
                <a className={styles.track__authorLink} href="">
                    Dynoro, Outwork, Mr. Gee
                </a>
                </div>
                <div className={styles.track__album}>
                <a className={styles.track__albumLink} href="">
                    Elektro
                </a>
                </div>
                <div className={styles.track__time}>
                <svg className={styles.track__timeSvg}>
                    <use xlinkHref="/image/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>2:22</span>
                </div>
            </div>
            </div>

            <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
                <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                    <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/image/icon/sprite.svg#icon-note"></use>
                    </svg>
                </div>
                <div className={styles.track__title}>
                    <a className={styles.track__titleLink} href="">
                    I’m Fire <span className={styles.track__titleSpan}></span>
                    </a>
                </div>
                </div>
                <div className={styles.track__author}>
                <a className={styles.track__authorLink} href="">
                    Ali Bakgor
                </a>
                </div>
                <div className={styles.track__album}>
                <a className={styles.track__albumLink} href="">
                    I’m Fire
                </a>
                </div>
                <div className={styles.track__time}>
                <svg className={styles.track__timeSvg}>
                    <use xlinkHref="/image/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>2:22</span>
                </div>
            </div>
            </div>

            <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
                <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                    <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/image/icon/sprite.svg#icon-note"></use>
                    </svg>
                </div>
                <div className={styles.track__title}>
                    <a className={styles.track__titleLink} href="">
                    Non Stop
                    <span className={styles.track__titleSpan}>(Remix)</span>
                    </a>
                </div>
                </div>
                <div className={styles.track__author}>
                <a className={styles.track__authorLink} href="">
                    Стоункат, Psychopath
                </a>
                </div>
                <div className={styles.track__album}>
                <a className={styles.track__albumLink} href="">
                    Non Stop
                </a>
                </div>
                <div className={styles.track__time}>
                <svg className={styles.track__timeSvg}>
                    <use xlinkHref="/image/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>4:12</span>
                </div>
            </div>
            </div>

            <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
                <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                    <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/image/icon/sprite.svg#icon-note"></use>
                    </svg>
                </div>
                <div className={styles.track__title}>
                    <a className={styles.track__titleLink} href="">
                    Run Run
                    <span className={styles.track__titleSpan}>
                        (feat. AR/CO)
                    </span>
                    </a>
                </div>
                </div>
                <div className={styles.track__author}>
                    <a className={styles.track__authorLink} href="">
                        Jaded, Will Clarke, AR/CO
                    </a>
                </div>
                <div className={styles.track__album}>
                    <a className={styles.track__albumLink} href="">
                        Run Run
                    </a>
                </div>
                <div className={styles.track__time}>
                    <svg className={styles.track__timeSvg}>
                        <use xlinkHref="/image/icon/sprite.svg#icon-like"></use>
                    </svg>
                    <span className={styles.track__timeText}>2:54</span>
                </div>
            </div>
            </div>
        </div>
    </div>
    </>
  );
}