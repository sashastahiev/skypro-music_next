'use client'
import { useState } from 'react';
import styles from './FilterTracks.module.css';
import { data } from '@/ts/data';
export default function Filter() {
  type BlockListState = "genre" | "author" | "year" | "none";
  const [blockList, setBlockList] = useState<BlockListState>("none");
  const changeBlockList = (state: BlockListState) => {
    if (state === blockList)
      setBlockList("none");
    else
      setBlockList(state);
  };
  const [tracks,setTracks] = useState(data);
  let listGenre: string[] = [...new Set(tracks.map(track => track.genre))];
  let listAuthor: string[] = [...new Set(tracks.map(track => track.author))];
  let listYear: string[] = [...new Set(tracks.map(track => track.release_date))];
  return (
    <>
    <h2 className={styles.centerblock__h2}>Треки</h2>
    <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <div style={{position: 'relative', marginRight: '10px'}}>
          <div onClick={() => changeBlockList("author")} className={styles.filter__button}>исполнителю</div>
          {blockList === 'author' && 
          <div className={styles.filter__block}>
            <ul className={styles.filter__list}>
              {listAuthor.map((item) => (
                <li className={styles.itemList}>{item}</li>
              ))}
            </ul>
          </div>}
        </div>
        <div style={{position: 'relative', marginRight: '10px'}}>
          <div onClick={() => changeBlockList("year")} className={styles.filter__button}>году выпуска</div>
          {blockList === 'year' && 
          <div  className={styles.filter__block}>
            <ul className={styles.filter__list}>
              {listYear.map((item) => (
                <li className={styles.itemList}>{item}</li>
              ))}
            </ul>
          </div>}
        </div>
        <div style={{position: 'relative'}}>
          <div onClick={() => changeBlockList("genre")} className={styles.filter__button}>жанру</div>
          {blockList === 'genre' && 
          <div  className={styles.filter__block}>
            <ul className={styles.filter__list}>
              {listGenre.map((item) => (
                <li className={styles.itemList}>{item}</li>
              ))}
            </ul>
          </div>}
        </div>
    </div>
    </>
  );
}