import styles from './Main.module.css'
import Filter from '@/components/FilterTrack/FilterTracks'
import Playlist from '../Playlist/Playlist';
import MenuNav from '../MenuNav/MenuNav';
import Sibebar from '../Sibebar/Sibebar';

export default function Main() {
  return (
    <main className={styles.main}>
        <MenuNav />
        <div className={styles.centerblock}>
            <div className={styles.centerblock__search}>
            <svg className={styles.search__svg}>
                <use xlinkHref="/image/icon/sprite.svg#icon-search"></use>
            </svg>
            <input
                className={styles.search__text}
                type="search"
                placeholder="Поиск"
                name="search"
            />
            </div>
            <Filter />
            <Playlist />
        </div>
        <Sibebar />
    </main>
    );
}