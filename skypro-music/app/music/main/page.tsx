'use client'
import styles from './page.module.css';
import Main from '@/components/Main/Main';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    try {
      if (!localStorage.getItem('access')){
      window.location.href = '/auth/signin';
      } 
    } catch {}
  })
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Main />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}