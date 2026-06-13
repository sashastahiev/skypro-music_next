'use client'
import { useAppDispatch } from '@/store/store';
import styles from './page.module.css';
import Main from '@/components/Main/Main';
import { setNamePlaylist } from '@/store/features/trackSlice';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch()
  const setPlaylist = () => {
    dispatch(setNamePlaylist('Треки'))
  }
  useEffect(() => {
     if (!localStorage.getItem('access')){
     window.location.href = '/auth/signin';
    }
  })
  setPlaylist();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Main />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}