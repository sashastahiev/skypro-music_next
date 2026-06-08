import styles from './page.module.css';
import Main  from '../components/Main/Main';
import BarTrack  from '../components/BarTrack/BarTrack';
import { AudioProvider } from '@/context/AudioContext';
export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Main />
        <AudioProvider>
          <BarTrack />
        </AudioProvider>
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}