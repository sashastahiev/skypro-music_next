
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Playlist from './Playlist';
import type { TrackType } from '@/sharedTypes/types';

// Мокируем зависимости
jest.mock('./Playlist.module.css', () => ({
  centerblock__content: 'centerblock__content',
  content__title: 'content__title',
  playlistTitle__col: 'playlistTitle__col',
  col01: 'col01',
  // ... остальные классы
}));

jest.mock('@/utils/formatDurations', () => (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
});

jest.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

