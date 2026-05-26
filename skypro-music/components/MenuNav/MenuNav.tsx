import Link from 'next/link';
import styles from './MenuNav.module.css'
export default function MenuNav() {
  return (
    <>
    <nav className={styles.main__nav}>
        <div className={styles.nav__logo}>
            {/*TODO: img –> Image*/}
            <img
            width={250}
            height={170}
            className={styles.logo__image}
            src='/image/logo.png'
            alt='logo'
            />
        </div>
        <div className={styles.nav__burger}>
            <span className={styles.burger__line}></span>
            <span className={styles.burger__line}></span>
            <span className={styles.burger__line}></span>
        </div>
        <div className={styles.nav__menu}>
            <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
                {/*TODO: a -> Link*/}
                <a href="#" className={styles.menu__link}>
                Главное
                </a>
            </li>
            <li className={styles.menu__item}>
                <a href="#" className={styles.menu__link}>
                Мой плейлист
                </a>
            </li>
            <li className={styles.menu__item}>
                <a href="#" className={styles.menu__link}>
                Войти
                </a>
            </li>
            </ul>
        </div>
        </nav>

    </>
  );
}