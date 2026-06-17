'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './MenuNav.module.css';
import Image from 'next/image';
import { exit } from '@/utils/logout';
export default function MenuNav() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [sign, setSign] = useState<boolean>(false)
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
      <nav className={styles.main__nav}>
        <div className={styles.nav__logo}>
          <Link href='/music/main'>
          <Image
            width={250}
            height={170}
            src='/image/logo.png'
            alt='logo'
          />
          </Link>
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
              <Link href="/music/favourite" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link onClick={exit} href="/auth/signin" className={styles.menu__link}>
                {sign ? 'Выйти' : 'Войти'}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
