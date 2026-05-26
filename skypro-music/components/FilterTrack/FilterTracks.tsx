import styles from './FilterTracks.module.css';
export default function Filter() {
  return (
    <>
    <h2 className={styles.centerblock__h2}>Треки</h2>
    <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <div className={styles.filter__button}>исполнителю</div>
        <div className={styles.filter__button}>году выпуска</div>
        <div className={styles.filter__button}>жанру</div>
    </div>
    </>
  );
}