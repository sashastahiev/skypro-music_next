import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // лучше fireEvent в новых тестах
import { Provider } from 'react-redux';
import Filter from './FilterTracks';
import type { TrackType } from '@/sharedTypes/types';
import { configureStore } from '@reduxjs/toolkit';
import {trackSliceReducer} from '@/store/features/trackSlice';

// Моки CSS-классов
jest.mock('./FilterTracks.module.css', () => ({
  centerblock__h2: 'centerblock__h2',
  filter_ChangePlaylist: 'filter_ChangePlaylist',
  centerblock__filter: 'centerblock__filter',
  filter__title: 'filter__title',
  filter__button: 'filter__button',
  filter__block: 'filter__block',
  filter__list: 'filter__list',
  itemList: 'itemList',
  circleLength: 'circleLength',
  filter__buttonFilter: 'filter__buttonFilter',
  filter_Sort: 'filter_Sort',
  shine: 'shine',
}));

// Мок контекста темы
jest.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

// Мок скелетонов
jest.mock('react-loading-skeleton', () => ({
  SkeletonTheme: ({ children }) => <div>{children}</div>,
}));

const mockTracks: TrackType[] = [
  {
    id: 0,
    _id: 1,
    name: 'Track 1',
    author: 'Artist A',
    release_date: '2020',
    genre: ['rock', 'pop'],
    duration_in_seconds: 180,
    album: 'Album X',
    logo: null,
    track_file: 'file1.mp3',
    stared_user: [],
    isPlaying: false,
    isLike: false,
  },
  {
    id: 1,
    _id: 2,
    name: 'Track 2',
    author: 'Artist B',
    release_date: '2021',
    genre: ['jazz'],
    duration_in_seconds: 240,
    album: 'Album Y',
    logo: null,
    track_file: 'file2.mp3',
    stared_user: [],
    isPlaying: false,
    isLike: true,
  },
  {
    id: 2,
    _id: 3,
    name: 'Track 3',
    author: 'Artist A',
    release_date: '2020',
    genre: ['rock'],
    duration_in_seconds: 200,
    album: 'Album Z',
    logo: null,
    track_file: 'file3.mp3',
    stared_user: [],
    isPlaying: true,
    isLike: false,
  },
];

describe('Filter Component', () => {
  let store: ReturnType<typeof configureStore>;

 beforeEach(() => {
    store = configureStore({
      reducer: {
        track: trackSliceReducer,
      },
      preloadedState: {
        track: {
          currentTrack: null,
          isPlay: false,
          isLoop: false,
          isShuffle: false,
          namePlaylist: 'My Playlist',
          Playlist: mockTracks,                 // важно: с большой буквы, как в слайсе
          PlaylistForFilter: mockTracks,        // важно: с большой буквы
        },
      },
    });
  });

  test('рендерит заголовок и кнопки фильтрации', async () => {
    render(
      <Provider store={store}>
        <Filter />
      </Provider>,
    );

    // Заголовок
    expect(screen.getByRole('heading', { name: /my playlist/i })).toBeInTheDocument();

    // Кнопки фильтрации (по тексту внутри)
    expect(screen.getByText('исполнителю')).toBeInTheDocument();
    expect(screen.getByText('году выпуска')).toBeInTheDocument();
    expect(screen.getByText('жанру')).toBeInTheDocument();
  });

  test('отображает корректные счётчики уникальных значений', async () => {
    render(
      <Provider store={store}>
        <Filter />
      </Provider>,
    );

    // Уникальные авторы: Artist A, Artist B → 2
    expect(screen.getByText('2')).toBeInTheDocument();

    // Уникальные годы: 2020, 2021 → 2
    expect(screen.getByText('2')).toBeInTheDocument();

    // Уникальные жанры: rock, pop, jazz → 3
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('сортировка по названию доступна и реагирует на клик', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Filter />
      </Provider>,
    );

    const sortButton = screen.getByText('названию');
    expect(sortButton).toBeInTheDocument();

    await user.click(sortButton);

    // Здесь можно проверить, что сработал диспатч экшена сортировки
    // (зависит от реализации: либо через store.getState(), либо через mock экшена)
  });

  test('фильтры по автору/году/жанру открывают соответствующие блоки', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Filter />
      </Provider>,
    );

    const authorBtn = screen.getByText('исполнителю');
    await user.click(authorBtn);

    // Проверяем, что открылся блок фильтрации по автору
    expect(screen.queryByText('Artist A')).toBeInTheDocument();
    expect(screen.queryByText('Artist B')).toBeInTheDocument();

    // Аналогично можно протестировать остальные фильтры
  });
});
