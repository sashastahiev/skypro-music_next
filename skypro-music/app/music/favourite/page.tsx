'use client'
import MenuNav from '@/components/MenuNav/MenuNav';
import styles from './page.module.css';
import { AudioProvider } from '@/context/AudioContext';
import Sibebar from '@/components/Sibebar/Sibebar';
import { useEffect } from 'react';
import PlaylistFavorite from '@/components/Playlist/PlaylistFavorite';
import FilterFavorite from '@/components/FilterTrack/FilterFavorite';
export default function Favorite() {
  useEffect(() => {
    try {
      if (!localStorage.getItem('access')){
      window.location.href = '/auth/signin';
      } 
    } catch {}
  })
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
              <FilterFavorite />
              <AudioProvider>
                  <PlaylistFavorite />
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