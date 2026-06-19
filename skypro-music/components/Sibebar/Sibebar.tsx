'use client'
import Image from 'next/image';
import styles from './Sibebar.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { logout } from '@/utils/logout';
import { useTheme } from '@/context/ThemeContext';
export default function Sibebar() {
    const { theme } = useTheme()
    const [name, setName] = useState<string>('Гость');
    useEffect(() => {
        try {
        const storedName = localStorage.getItem('email');
        setName(storedName || 'Гость'); 
        } catch {}
    }, []);
  return (
    <>
    <div style={{ backgroundColor: theme === 'light' ? 'white' : 'black'}} className={styles.main__sidebar}>
        <div className={styles.sidebar__personal}>
            <p style={{color: theme === 'light' ? 'black' : ''}} className={styles.sidebar__personalName}>{name}</p>
            <Link onClick={logout} href="/auth/signin">
                <div style={{backgroundColor: theme === 'light' ? 'white' : ''}}className={styles.sidebar__icon}>
                <svg>
                    {theme === 'dark' ? <use xlinkHref="/image/icon/sprite.svg#logout"></use> :
                    <use xlinkHref="/image/icon/logoutLight.svg"></use>}
                </svg>
                </div>
            </Link>
        </div>
        <div className={styles.sidebar__block}>
            <div className={styles.sidebar__list}>
            <div className={styles.sidebar__item}>
                <Link className={styles.sidebar__link} href="/music/category/2">
                <Image
                    className={styles.sidebar__img}
                    src="/image/playlist01.png"
                    alt="day's playlist"
                    width={250}
                    height={170}
                />
                </Link>
            </div>
            <div className={styles.sidebar__item}>
                <Link className={styles.sidebar__link} href="/music/category/3">
                <Image
                    className={styles.sidebar__img}
                    src="/image/playlist02.png"
                    alt="day's playlist"  
                    width={250}
                    height={170}              
                />
                </Link>
            </div>
            <div className={styles.sidebar__item}>
                <Link className={styles.sidebar__link} href="/music/category/4">
                <Image
                    className={styles.sidebar__img}
                    src="/image/playlist03.png"
                    alt="day's playlist"
                    width={250}
                    height={170}
                />
                </Link>
            </div>
            </div>
        </div>
    </div>
    </>
  );
}