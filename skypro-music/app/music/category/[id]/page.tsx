'use client'
import styles from './page.module.css';
import Main from '@/components/Main/Main';
export default function Category() {
  return (
    <>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Main />
        <footer className={styles.footer}></footer>
      </div>
    </div>
    </>
  );
}