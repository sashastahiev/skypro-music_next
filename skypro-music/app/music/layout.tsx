'use client'
import React from 'react';
import MenuNav from '@/components/MenuNav/MenuNav';
import styles from './layout.module.css';
import Sibebar from '@/components/Sibebar/Sibebar';
import { useEffect } from 'react';
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
              <main>{children}</main>
          </div>
          <Sibebar />
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </div>
    </>
  );
}
