import styles from './page.module.css';
import Main  from '../components/Main/Main';
import BarTrack  from '../components/BarTrack/BarTrack';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Main />
        <BarTrack />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}