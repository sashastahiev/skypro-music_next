'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './FilterTracks.module.css';
import { TrackType } from '@/sharedTypes/types';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setPlaylistForFilter } from '@/store/features/trackSlice';
import { useTheme } from '@/context/ThemeContext';

export default function Filter() {
  const { theme } = useTheme();
  type BlockListState = "genre" | "author" | "year" | "none";
  const dispatch = useAppDispatch();
  const [blockList, setBlockList] = useState<BlockListState>("none");
  const playlist: TrackType[] = useAppSelector((state) => state.tracks.Playlist);
  const paylistFilter: TrackType[] = useAppSelector((state) => state.tracks.PlaylistForFilter)
  const name: string | null = useAppSelector((state) => state.tracks.namePlaylist);
  const [namePlaylist, setName] = useState<string>('');
  const [listGenre,setlistGenre] = useState<string[]>([]);
  const [listAuthor, setlistAuthor] = useState<string[]>([]);
  const [listYear, setlistYear] = useState<string[]>([]);
  const [DeleteFilter,setDeleteFilter] = useState<boolean>(false);

  const authorBlockRef = useRef<HTMLDivElement>(null);
  const yearBlockRef = useRef<HTMLDivElement>(null);
  const genreBlockRef = useRef<HTMLDivElement>(null);
  const authorButtonRef = useRef<HTMLDivElement>(null);
  const yearButtonRef = useRef<HTMLDivElement>(null);
  const genreButtonRef = useRef<HTMLDivElement>(null);

  const changeBlockList = (state: BlockListState) => {
    if (state === blockList)
      setBlockList("none");
    else
      setBlockList(state);
  };
  const DelFilter = () => {
    dispatch(setPlaylistForFilter(playlist));
    setBlockList("none");
    setDeleteFilter(false);
  }
  const setPlaylistWithFilter = async (filter: string, name: string) => {
    let tracksWithFilter: TrackType[] = [];
    if (name === 'author'){
      tracksWithFilter = paylistFilter.filter((item) => item.author === filter)
    }
    else if (name === 'year'){
      tracksWithFilter = paylistFilter.filter((item) => item.release_date === filter)
    }
    else if (name === 'genre'){
      tracksWithFilter = paylistFilter.filter((item) => item.genre.includes(filter));
    }
    await dispatch(setPlaylistForFilter(tracksWithFilter));
    setDeleteFilter(true);
  }
  const setFilter = () => {
    setlistGenre([...new Set(playlist.flatMap(track => track.genre))]);
    setlistAuthor([...new Set(playlist.map(track => track.author))]);
    setlistYear([...new Set(playlist.map(track => track.release_date))]);
  }
  useEffect(() => {
    setName(name);
    setFilter();
  },[playlist])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutside =
        (!authorBlockRef.current || !authorBlockRef.current.contains(target)) &&
        (!yearBlockRef.current || !yearBlockRef.current.contains(target)) &&
        (!genreBlockRef.current || !genreBlockRef.current.contains(target)) &&
        (!authorButtonRef.current || !authorButtonRef.current.contains(target)) &&
        (!yearButtonRef.current || !yearButtonRef.current.contains(target)) &&
        (!genreButtonRef.current || !genreButtonRef.current.contains(target));
      if (isOutside) {
        setBlockList("none");
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <>
    <h2 style={{color: theme === 'light' ? 'black' : ''}} className={styles.centerblock__h2}>{namePlaylist}</h2>
    <div className={styles.centerblock__filter}>
      <div style={{color: theme === 'light' ? 'black' : ''}}  className={styles.filter__title}>Искать по:</div>
        <div style={{position: 'relative', marginRight: '10px'}}>
          <div ref={authorButtonRef} style={{color: theme === 'light' ? 'black' : '', border: theme === 'light' ? '1px solid black' : ''}} 
            onClick={() => changeBlockList("author")} className={styles.filter__button}>
            исполнителю
            <div className={styles.shine}></div>
          </div>
          {blockList === 'author' && 
          <div ref={authorBlockRef} style={{backgroundColor: theme === 'light' ? '#c9c9c9' : ''}} className={styles.filter__block}>
            <ul className={styles.filter__list}>
              {listAuthor.map((item) => (
                <li onClick={() => setPlaylistWithFilter(item, 'author')} 
                className={styles.itemList} 
                key={item}>{item}</li>
              ))}
            </ul>
          </div>}
          <div className={styles.circleLength}>{listAuthor.length}</div>
        </div>
        <div style={{position: 'relative', marginRight: '10px'}}>
          <div ref={genreButtonRef} style={{color: theme === 'light' ? 'black' : '', border: theme === 'light' ? '1px solid black' : ''}}  
            onClick={() => changeBlockList("year")} className={styles.filter__button}>году выпуска</div>
          {blockList === 'year' && 
          <div ref={genreBlockRef} style={{backgroundColor: theme === 'light' ? '#c9c9c9' : ''}} className={styles.filter__block}>
            <ul className={styles.filter__list}>
              {listYear.map((item) => (
                <li onClick={() => setPlaylistWithFilter(item, 'genre')} 
                className={styles.itemList} 
                key={item}>{item}</li>
              ))}
            </ul>
          </div>}
          <div className={styles.circleLength}>{listYear.length}</div>
        </div>
        <div style={{position: 'relative'}}>
          <div ref={yearButtonRef} style={{color: theme === 'light' ? 'black' : '', border: theme === 'light' ? '1px solid black' : ''}} 
            onClick={() => changeBlockList("genre")} className={styles.filter__button}>жанру</div>
          {blockList === 'genre' && 
          <div ref={yearBlockRef} style={{backgroundColor: theme === 'light' ? '#c9c9c9' : ''}} className={styles.filter__block}>
            <ul className={styles.filter__list}>
              {listGenre.map((item) => (
                <li onClick={() => setPlaylistWithFilter(item, 'genre')} 
                className={styles.itemList}
                key={item}>{item}</li>
              ))}
            </ul>
          </div>}
          <div className={styles.circleLength}>{listGenre.length}</div>
        </div>
        {DeleteFilter && <div onClick={() => DelFilter()} className={styles.filter__buttonFilter}>Cбросить фильтры</div>}
    </div>
    </>
  );
}
