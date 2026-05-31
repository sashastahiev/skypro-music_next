'use client'
import Image from 'next/image';
import styles from './Sibebar.module.css'
export default function Sibebar() {
  return (
    <>
    <div className={styles.main__sidebar}>
        <div className={styles.sidebar__personal}>
            <p className={styles.sidebar__personalName}>Sergey.Ivanov</p>
            <div className={styles.sidebar__icon}>
            <svg>
                <use xlinkHref="/image/icon/sprite.svg#logout"></use>
            </svg>
            </div>
        </div>
        <div className={styles.sidebar__block}>
            <div className={styles.sidebar__list}>
            <div className={styles.sidebar__item}>
                <a className={styles.sidebar__link} href="#">
                <Image
                    className={styles.sidebar__img}
                    src="/image/playlist01.png"
                    alt="day's playlist"
                    width={250}
                    height={170}
                />
                </a>
            </div>
            <div className={styles.sidebar__item}>
                <a className={styles.sidebar__link} href="#">
                <Image
                    className={styles.sidebar__img}
                    src="/image/playlist02.png"
                    alt="day's playlist"
                    width={250}
                    height={170}
                />
                </a>
            </div>
            <div className={styles.sidebar__item}>
                <a className={styles.sidebar__link} href="#">
                <Image
                    className={styles.sidebar__img}
                    src="/image/playlist03.png"
                    alt="day's playlist"
                    width={250}
                    height={170}
                />
                </a>
            </div>
            </div>
        </div>
    </div>
    </>
  );
}