import { TrackType } from "@/sharedTypes/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import stylesSearch from './search.module.css';
import styles from '@/components/Playlist/Playlist.module.css'
import cn from "classnames";
import { useApi } from "@/ts/api";
import formatDuration from '@/utils/formatDurations'
import { setCurrentTrack, setIsPlay } from "@/store/features/trackSlice";
import { useTheme } from "@/context/ThemeContext";

export default function Search() {
    const {theme} = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<TrackType[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const playlist = useAppSelector(state => state.tracks.Playlist)
    const [allItems, setAllItems] = useState<TrackType[]>([]);
    const dispatch = useAppDispatch();
    const {fetchTrackDelete, fetchTrackAdd} = useApi();
    const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
    const isPlayTrackInd = useAppSelector((state) => state.tracks.isPlay);

    useEffect(() => {
        if (searchQuery.trim()) {
          const filtered = allItems.filter(item =>
            item.album.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSuggestions(filtered);
          setIsDropdownOpen(true);
        } else {
          setSuggestions([]);
          setIsDropdownOpen(false);
        }
    }, [searchQuery]);

    const onClickTrack = async (item: TrackType) => {
        await dispatch(setIsPlay(false));
        try {
          await dispatch(setCurrentTrack(item));
          await dispatch(setIsPlay(true));
        } catch (error) {
          console.error('Ошибка при смене трека:', error);
      };
    }

    const handleSuggestionClick = (suggestion: TrackType) => {
        setSearchQuery(suggestion.album);
        onClickTrack(suggestion);
        setIsDropdownOpen(false);
    };

    const setIsLike = async (e: React.MouseEvent, item: TrackType) => {
        e.preventDefault()
        const updatedItem: TrackType = { ...item, isLike: !item.isLike };
        setSuggestions(suggestions.map(track =>
            track.id === item.id ? updatedItem : track
        ));
        if (updatedItem.isLike){
        await fetchTrackAdd(updatedItem._id)
        }
        else {
        await fetchTrackDelete(updatedItem._id)
        }
    }
    useEffect(() => {
        setAllItems(playlist);
    },[playlist])
    return(
        <>
        <input
            style={{color: theme === 'light' ? 'black' : ''}}
            className={theme === 'dark' ? stylesSearch.search__text : stylesSearch.search__textLight}
            type="search"
            placeholder="Поиск"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setIsDropdownOpen(true)}
        />
        {isDropdownOpen && suggestions.length > 0 && (
        <>
        {<div className={stylesSearch.content__playlist}>
            {suggestions.map((item, index) => (
            <div
                onClick={() => handleSuggestionClick(item)}
                className={cn(
                    styles.playlist__item,
                )}
                key={index}
                >
            <div className={styles.playlist__track}>
                <div className={styles.track__title}>
                    <div style={{backgroundColor: theme === 'light' ? '#F6F4F4' : ''}} className={styles.track__titleImage}>
                    <svg className={styles.track__titleSvg}>
                        {theme === 'dark' ? <use xlinkHref="/image/icon/sprite.svg#icon-note"></use> :
                        <use xlinkHref="/image/icon/noteLight.svg"></use>}
                    </svg>
                    {currentTrack?._id === item._id && <div className={isPlayTrackInd ? styles.pulsing_circle : styles.pulsing_circle_nonActive}></div>}
                    </div>
                    <div className={styles.track__title}>
                    <a style={{color: theme === 'light' ? 'black' : ''}} className={styles.track__titleLink} href="#">
                        {item.name} <span className={styles.track__titleSpan}></span>
                    </a>
                    </div>
                </div>
                <div className={styles.track__author}>
                    <a style={{color: theme === 'light' ? 'black' : ''}} className={styles.track__authorLink} href="#">
                    {item.author}
                    </a>
                </div>
                <div className={styles.track__album}>
                    <a className={styles.track__albumLink} href="#">
                    {item.album}
                    </a>
                </div>
                <div className={styles.track__time}>
                    { localStorage.getItem('email') ? <>
                    <svg onClick={(e) => {setIsLike(e,item)}} className={styles.track__timeSvg}>
                    {!item.isLike ? <use xlinkHref="/image/icon/sprite.svg#icon-like"></use>
                    : 
                    <use xlinkHref="/image/icon/LikeActive.svg"></use>}
                    </svg></> : ''}
                    <span className={styles.track__timeText}>{formatDuration(item.duration_in_seconds)}</span>
                </div>
                </div>
            </div>
        ))}
        </div>}
        </>
    )}
    </>
    )
}