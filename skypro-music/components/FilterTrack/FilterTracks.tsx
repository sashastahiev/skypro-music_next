'use client'
import { useState } from 'react';
import styles from './FilterTracks.module.css';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/store/store';
export default function Filter() {
  type BlockListState = "genre" | "author" | "year" | "none";
  const [blockList, setBlockList] = useState<BlockListState>("none");
  const tracks = useAppSelector((state) => state.tracks.Playlist);
  let listGenre: string[] = [...new Set(tracks.flatMap(track => track.genre))];
  let listAuthor: string[] = [...new Set(tracks.map(track => track.author))];
  let listYear: string[] = [...new Set(tracks.map(track => track.release_date))];
  const namePlaylist = useAppSelector((state) => state.tracks.namePlaylist);
  const changeBlockList = (state: BlockListState) => {
    if (state === blockList)
      setBlockList("none");
    else
      setBlockList(state);
  };
  const category = () => {
    const param = useParams();
    if (param.id === '4')
      return 'Инди заряд'
    else if (param.id === '3')
      return '100 танцевальных хитов'
    else if (param.id === '2')
      return 'Плейлист дня'
    else if (namePlaylist === 'Избранное')
      return namePlaylist
    return 'Треки'
  }
  const [nameCategory, setCategory] = useState(category())
  return (
    <>
    <h2 className={styles.centerblock__h2}>{nameCategory}</h2>
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
        <div style={{position: 'relative', marginRight: '10px'}}>
          <div onClick={() => changeBlockList("author")} className={styles.filter__button}>исполнителю</div>
          {blockList === 'author' && 
          <div className={styles.filter__block}>
            <ul className={styles.filter__list}>
              {listAuthor.map((item) => (
                <li className={styles.itemList} key={item}>{item}</li>
              ))}
            </ul>
          </div>}
          <div className={styles.circleLength}>{listAuthor.length}</div>
        </div>
        <div style={{position: 'relative', marginRight: '10px'}}>
          <div onClick={() => changeBlockList("year")} className={styles.filter__button}>году выпуска</div>
          {blockList === 'year' && 
          <div  className={styles.filter__block}>
            <ul className={styles.filter__list}>
              {listYear.map((item) => (
                <li className={styles.itemList} key={item}>{item}</li>
              ))}
            </ul>
          </div>}
          <div className={styles.circleLength}>{listYear.length}</div>
        </div>
        <div style={{position: 'relative'}}>
          <div onClick={() => changeBlockList("genre")} className={styles.filter__button}>жанру</div>
          {blockList === 'genre' && 
          <div  className={styles.filter__block}>
            <ul className={styles.filter__list}>
              {listGenre.map((item) => (
                <li className={styles.itemList} key={item}>{item}</li>
              ))}
            </ul>
          </div>}
          <div className={styles.circleLength}>{listGenre.length}</div>
        </div>
    </div>
    </>
  );
}