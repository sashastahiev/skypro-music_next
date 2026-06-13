'use client'
import { useEffect, useState } from 'react';
import styles from './FilterTracks.module.css';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { TrackType } from '@/sharedTypes/types';
import { useDispatch } from 'react-redux';
import { setPlaylist } from '@/store/features/trackSlice';
export default function Filter() {
  type BlockListState = "genre" | "author" | "year" | "none";
  const [blockList, setBlockList] = useState<BlockListState>("none");
  const dispatch = useDispatch();
  const playlist = useAppSelector((state) => state.tracks.Playlist)
  const [tracksFilter,setTracksFilter] = useState<TrackType[]>([]);
  const [tracks,setTracks] = useState<TrackType[]>(playlist);
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
  useEffect(() => {
    setTracks(playlist);
  },[playlist])
  useEffect(() => {
    try {
      dispatch(setPlaylist(tracksFilter));
    } catch {

    }
  },[tracksFilter])
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
  const clickIlemList = (name: string | string[], category: string) => {
    try {
      let newTracks: TrackType[] = [];
      if (category === 'author')
      {
        newTracks = tracks.filter(item => item.author === name)
      }
      if (category === 'year')
      {
        newTracks = tracks.filter(item => item.release_date === name)
      }
      if (category === 'genre')
      {
        newTracks = tracks.filter(item => item.genre === name)
      }
      setTracksFilter(newTracks);
    } catch {
      alert('Ошибка в фильтрации треков');
    }
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