'use client'
import MenuNav from '@/components/MenuNav/MenuNav';
import styles from './page.module.css';
import { AudioProvider } from '@/context/AudioContext';
import Sibebar from '@/components/Sibebar/Sibebar';
import { useEffect } from 'react';
import PlaylistCategory from '@/components/Playlist/PlaylistCategory';
import { useParams } from 'next/navigation';
import FilterCategory from '@/components/FilterTrack/FilterCategory';
export default function Category() {
  const param = useParams();
  const id = param.id ? param.id.toString() : null;
  useEffect(() => {
    try {
      if (!localStorage.getItem('access')) {
        window.location.href = '/auth/signin';
      }
    } catch {}
  }, []); 
  return (
    <>
    <div className={styles.wrapper}>
      <div className={styles.container}>
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
              <FilterCategory id={id} />
              <AudioProvider>
                  <PlaylistCategory id={id}/>
              </AudioProvider>
          </div>
          <Sibebar />
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </div>
    </>
  );
}