'use client'
import React from 'react';
import MenuNav from '@/components/MenuNav/MenuNav';
import styles from './layout.module.css';
import Sidebar from '@/components/Sibebar/Sibebar';
import Search from '@/components/SearchFilter/search';
import { ThemeProvider } from '@/context/ThemeProvider';
import { useTheme } from '@/context/ThemeContext'; 
import { AudioProvider } from '@/context/AudioContext';
import BarTrack from '@/components/BarTrack/BarTrack';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <ThemeContent>{children}</ThemeContent>
    </ThemeProvider>
  );
}

const ThemeContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div style={{ backgroundColor: theme === 'light' ? 'rgb(246, 245, 243)' : ''}} className={styles.wrapper}>
      <div style={{ backgroundColor: theme === 'light' ? 'rgb(246, 245, 243)' : ''}} className={styles.container}>
        <main className={styles.main}>
          <MenuNav />
          <div style={{ backgroundColor: theme === 'light' ? 'white' : 'black'}} className={styles.centerblock}>
            <div className={styles.centerblock__search}>
              {/* <svg className={styles.search__svg}>
                <use xlinkHref="/image/icon/sprite.svg#icon-search"></use>
              </svg> */}
              <Search />
            </div>
            <main>{children}</main>
            <AudioProvider>
              <BarTrack />
            </AudioProvider>
          </div>
          <Sidebar />
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
};
