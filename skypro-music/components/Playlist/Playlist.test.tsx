import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import Playlist from '@/components/Playlist/Playlist';
import type { TrackType } from '@/sharedTypes/types';
import { configureStore } from '@reduxjs/toolkit';
import { trackSliceReducer } from '@/store/features/trackSlice';

// --- ТИПОЗАЦИЯ СТОРА (НОВОЕ) ---
type RootState = ReturnType<typeof trackSliceReducer>;
type AppStore = ReturnType<typeof configureStore<{ tracks: RootState }>>;
// ------------------------------

jest.mock('./Playlist.module.css', () => ({
  centerblock__content: 'centerblock__content',
  content__title: 'content__title',
  playlistTitle__col: 'playlistTitle__col',
  col01: 'col01', col02: 'col02', col03: 'col03', col04: 'col04',
  block4: 'block4',
  playlist__item: 'playlist__item', playlist__item_disabled: 'playlist__item_disabled',
  track__title: 'track__title', track__titleImage: 'track__titleImage',
  track__titleSvg: 'track__titleSvg',
  pulsing_circle: 'pulsing_circle', pulsing_circle_nonActive: 'pulsing_circle_nonActive',
  track__titleLink: 'track__titleLink', track__titleSpan: 'track__titleSpan',
  track__author: 'track__author', track__authorLink: 'track__authorLink',
  track__album: 'track__album', track__albumLink: 'track__albumLink',
  track__time: 'track__time', track__timeSvg: 'track__timeSvg', track__timeText: 'track__timeText',
  loader: 'loader', loader_spinner: 'loader_spinner',
}));

jest.mock('@/utils/formatDurations', () => (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
});

jest.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

jest.mock('@/ts/api', () => ({
  useApi: () => ({
    fetchTrackDelete: jest.fn(),
    fetchTrackAdd: jest.fn(),
  }),
}));

const mockTracks: TrackType[] = [
  { id: 0, _id: 1, name: 'Track 1', author: 'Artist A', release_date: '2020', genre: ['rock', 'pop'], duration_in_seconds: 180, album: 'Album X', logo: null, track_file: 'file1.mp3', stared_user: [], isPlaying: false, isLike: false },
  { id: 1, _id: 2, name: 'Track 2', author: 'Artist B', release_date: '2021', genre: ['jazz'], duration_in_seconds: 240, album: 'Album Y', logo: null, track_file: 'file2.mp3', stared_user: [], isPlaying: false, isLike: true },
  { id: 2, _id: 3, name: 'Track 3', author: 'Artist A', release_date: '2020', genre: ['rock'], duration_in_seconds: 200, album: 'Album Z', logo: null, track_file: 'file3.mp3', stared_user: [], isPlaying: true, isLike: false },
];

describe('Playlist Component', () => {
  // ТИПИЗИРУЕМ ПЕРЕМЕННУЮ store
  let store: AppStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        tracks: trackSliceReducer,
      },
      preloadedState: {
        tracks: {
          currentTrack: null,
          isPlay: false,
          isLoop: false,
          isShuffle: false,
          namePlaylist: 'Избранные',
          Playlist: mockTracks,
          PlaylistForFilter: mockTracks,
        },
      },
    });
  });

  test('рендерит заголовки колонок и все треки из стора', () => {
    render(<Provider store={store}><Playlist /></Provider>);
    expect(screen.getByText('Трек (3)')).toBeInTheDocument();
    expect(screen.getByText('Исполнитель')).toBeInTheDocument();
    expect(screen.getByText('Альбом')).toBeInTheDocument();
    expect(screen.getByText('Track 1')).toBeInTheDocument();
  });

  test('при клике на трек обновляет currentTrack и isPlay в сторе', async () => {
    const user = userEvent.setup();
    render(<Provider store={store}><Playlist /></Provider>);

    await user.click(screen.getByText('Track 1'));

    // Теперь TypeScript знает, что store.getState() возвращает объект с ключом tracks
    const state = store.getState().tracks;

    expect(state.currentTrack).not.toBeNull();
    expect(state.currentTrack?.name).toBe('Track 1');
    expect(state.isPlay).toBe(true);
  });

  // test('корректно обрабатывает клик по лайку', async () => {
  //   const user = userEvent.setup();
  //   render(<Provider store={store}><Playlist /></Provider>);

  //   const track2Row = screen.getByText('Track 2')!;
  //   const likeIcon = track2Row.querySelector('svg')!;

  //   await user.click(likeIcon);

  //   expect(screen.queryByText('Track 2')).not.toBeInTheDocument();
  // });

  //   test('показывает лоадер при пустом PlaylistForFilter', () => {
  //     const customStore = configureStore({
  //       reducer: { tracks: trackSliceReducer },
  //       preloadedState: {
  //         tracks: {
  //           ...store.getState().tracks,
  //           PlaylistForFilter: [],
  //         },
  //       },
  //     });

  //     render(<Provider store={customStore}><Playlist /></Provider>);
  //     expect(document.querySelector('#loader')).toBeInTheDocument();
  //   });
});
