'use client'
import { useEffect, useState } from 'react';
import styles from './FilterTracks.module.css';
import { TrackType } from '@/sharedTypes/types';
import { useApi } from '@/ts/api';

export default function Filter() {
  type BlockListState = "genre" | "author" | "year" | "none";
  const [blockList, setBlockList] = useState<BlockListState>("none");
  const {fetchTracksAll} = useApi();
  const [tracks,setTracks] = useState<TrackType[]>([]);
  const [listGenre,setlistGenre] = useState<string[]>([]);
  const [listAuthor, setlistAuthor] = useState<string[]>([]);;
  const [listYear, setlistYear] = useState<string[]>([]);;
  const changeBlockList = (state: BlockListState) => {
    if (state === blockList)
      setBlockList("none");
    else
      setBlockList(state);
  };
  const setPlaylist = async () => {
    let data: TrackType[] = await fetchTracksAll();
    await setTracks(data);
  }
  const setFilter = async () => {
    await setlistGenre([...new Set(tracks.flatMap(track => track.genre))]);
    await setlistAuthor([...new Set(tracks.flatMap(track => track.author))]);
    await setlistYear([...new Set(tracks.flatMap(track => track.release_date))]);
  }
  const clickIlemList = (name: string | string[], category: string) => {
    try {
      let newTracks: TrackType[] = [];
      if (category === 'author'){
        newTracks = tracks.filter(item => item.author === name)
      }
      if (category === 'year'){
        newTracks = tracks.filter(item => item.release_date === name)
      }
      if (category === 'genre'){
        newTracks = tracks.filter(item => item.genre === name)
      }
      setTracks(newTracks);
    } catch {
      alert('Ошибка в фильтрации треков');
    }
  }
  useEffect(() => {
    setPlaylist();
    setFilter();
  },[])
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
                <li onClick={() => clickIlemList(item, 'author')} className={styles.itemList} key={item}>{item}</li>
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
                <li onClick={() => clickIlemList(item, 'year')} className={styles.itemList} key={item}>{item}</li>
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
                <li onClick={() => clickIlemList(item, 'genre')} className={styles.itemList} key={item}>{item}</li>
              ))}
            </ul>
          </div>}
          <div className={styles.circleLength}>{listGenre.length}</div>
        </div>
    </div>
    </>
  );
}
