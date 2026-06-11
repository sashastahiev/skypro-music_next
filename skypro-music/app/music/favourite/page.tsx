'use client'
import { useAppDispatch } from '@/store/store';
import styles from './page.module.css';
import Main from '@/components/Main/Main';
import { setNamePlaylist } from '@/store/features/trackSlice';

export default function Favourite() {
  const dispatch = useAppDispatch()
  const setPlaylist = async () => {
    await dispatch(setNamePlaylist('Избранное'))
  }
  if (localStorage.getItem('access') === 'undefined'){
     window.location.href = '/auth/signin';
  }
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