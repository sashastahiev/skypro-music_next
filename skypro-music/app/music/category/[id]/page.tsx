'use client'
import MenuNav from '@/components/MenuNav/MenuNav';
import styles from './page.module.css';
import Filter from '@/components/FilterTrack/FilterTracks';
import { AudioProvider } from '@/context/AudioContext';
import Playlist from '@/components/Playlist/Playlist';
import Sibebar from '@/components/Sibebar/Sibebar';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
export default function Category() {
  const param = useParams();
  const id: any = param.id;
  useEffect(() => {
    if (!localStorage.getItem('access')){
    window.location.href = '/auth/signin';
  }
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
              <Filter />
              <AudioProvider>
                  <Playlist id={id}/>
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