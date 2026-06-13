'use client'
import Image from 'next/image';
import styles from './Sibebar.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function Sibebar() {
    const [name, setName] = useState<string>('Sergey.Ivanov');
    useEffect(() => {
        const storedName = localStorage.getItem('name');
        setName(storedName || 'Sergey.Ivanov'); // fallback к начальному значению
    }, []);
  return (
    <>
    <div className={styles.main__sidebar}>
        <div className={styles.sidebar__personal}>
            <p className={styles.sidebar__personalName}>{name}</p>
            <div className={styles.sidebar__icon}>
            <svg>
                <use xlinkHref="/image/icon/sprite.svg#logout"></use>
            </svg>
            </div>
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