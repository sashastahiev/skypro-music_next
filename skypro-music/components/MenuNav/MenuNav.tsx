'use client'
import Link from 'next/link';
import { useState } from 'react';
import styles from './MenuNav.module.css';
import Image from 'next/image';
export default function MenuNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={styles.main__nav}>
        <div className={styles.nav__logo}>
          <Image
            width={250}
            height={170}
            src='/image/logo.png'
            alt='logo'
          />
        </div>
        <button
          className={`${styles.nav__burger} ${isMenuOpen ? styles.burger__active : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          <span className={styles.burger__line}></span>
          <span className={styles.burger__line}></span>
          <span className={styles.burger__line}></span>
        </button>
        <div
          className={`${styles.nav__menu} ${isMenuOpen ? styles.menu__open : ''}`}
        >
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/playlist" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/login" className={styles.menu__link}>
                Войти
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
