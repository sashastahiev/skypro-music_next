'use client'
import { useEffect, useState } from 'react';
import styles from './FilterTracks.module.css';
import { TrackType } from '@/sharedTypes/types';
import classNames from 'classnames';
import { useAppSelector } from '@/store/store';

export default function Filter() {
  type BlockListState = "genre" | "author" | "year" | "none";
  const [blockList, setBlockList] = useState<BlockListState>("none");
  const playlist: TrackType[] = useAppSelector((state) => state.tracks.Playlist);
  const name: string | null = useAppSelector((state) => state.tracks.namePlaylist);
  const [namePlaylist, setName] = useState<string>('');
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
  const setFilter = () => {
    setlistGenre([...new Set(playlist.flatMap(track => track.genre))]);
    setlistAuthor([...new Set(playlist.map(track => track.author))]);
    setlistYear([...new Set(playlist.map(track => track.release_date))]);
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
    setTracks(playlist);
    setName(name);
    setFilter();
  },[playlist])
  return (
    <>
    <h2 className={classNames(styles.centerblock__h2,styles.fade_out_text)}>{namePlaylist}</h2>
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
        <div style={{position: 'relative', marginRight: '10px'}}>
          <div onClick={() => changeBlockList("author")} className={styles.filter__button}>
            исполнителю
            <div className={styles.shine}></div>
          </div>
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
