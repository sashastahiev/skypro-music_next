'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './MenuNav.module.css';
import Image from 'next/image';
import { logout } from '@/utils/logout';
import { useTheme } from '@/context/ThemeContext';

export default function MenuNav() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [sign, setSign] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const setSignClient = () => {
    const name = localStorage.getItem('email')
    if (name !== null)
      setSign(true);
  }
  useEffect(() => {
    setSignClient();
  },[])
  return (
    <>
      <nav style={{ backgroundColor: theme === 'light' ? '#F6F5F3' : '#121212' }} className={styles.main__nav}>
        <div className={styles.nav__logo}>
          <Link href='/music/main'>
          <Image
            width={250}
            height={170}
            src={theme === 'dark' ? '/image/logo.png' : '/image/logo_modal.png'}
            alt='logo'
          />
          </Link>
        </div>
        <button
          className={`${styles.nav__burger} ${isMenuOpen ? styles.burger__active : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          <span className={theme === 'dark' ? styles.burger__line : styles.burger__lineDark}></span>
          <span className={theme === 'dark' ? styles.burger__line : styles.burger__lineDark}></span>
          <span className={theme === 'dark' ? styles.burger__line : styles.burger__lineDark}></span>
        </button>
        <div
          className={`${styles.nav__menu} ${isMenuOpen ? styles.menu__open : ''}`}
        >
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link style={{ color: theme === 'light' ? '#121212' : 'white' }} href="/" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link style={{ color: theme === 'light' ? 'black' : 'white' }} href="/music/favourite" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link style={{ color: theme === 'light' ? 'black' : 'white' }} onClick={logout} href="/auth/signin" className={styles.menu__link}>
                {sign ? 'Выйти' : 'Войти'}
              </Link>
            </li>
            <svg onClick={toggleTheme} className={styles.Themeimg__svg}>
              {theme === 'dark' ? <use xlinkHref="/image/icon/ThemeDark.svg"></use> : <use xlinkHref="/image/icon/ThemeLight.svg"></use>}
            </svg>
          </ul>
        </div>
      </nav>
    </>
  );
}
