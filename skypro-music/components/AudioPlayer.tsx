import { useAppSelector } from '@/store/store';
import { useState, useRef } from 'react';

const AudioPlayer = () => {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack)
  // Использование useRef для получения доступа к элементу <audio>
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // Состояние для управления воспроизведением
  const [isPlaying, setIsPlaying] = useState(false);

  // Функция для воспроизведения и паузы
  const togglePlay = () => {
    const audio = audioRef.current
    setIsPlaying(false)
      if (isPlaying && audio?.currentSrc) {
        audio.pause();
      } else if (audio?.currentSrc){
        audio.play();
      }
      setIsPlaying((prev) => !prev);
  };

  return (
    <div style={{display:'block', backgroundColor:'white'}}>
      <audio ref={audioRef} src='https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Chase.mp3'></audio>
      <button style={{display: 'block', opacity:'1'}} onClick={togglePlay}>
        {!isPlaying ? 'Пауза' : 'Воспроизведение'}
      </button>
    </div>
  );
};

export default AudioPlayer;