
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Filter from './FilterTracks';
import type { TrackType } from '@/sharedTypes/types';

// Мокируем зависимости
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

jest.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

jest.mock('react-loading-skeleton', () => ({
  SkeletonTheme: ({ children }: any) => <div>{children}</div>,
}));

describe('Filter Component', () => {
  let store: any;
  let mockTracks: TrackType[];

  beforeEach(() => {
    mockTracks = [
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
  });

  it('должен корректно рендериться и отображать элементы фильтрации', async () => {
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );

    // Проверяем заголовок плейлиста
    await waitFor(() => {
      expect(screen.getByText('My Playlist')).toBeInTheDocument();
    });

    // Проверяем наличие всех кнопок фильтрации
    expect(screen.getByText('исполнителю')).toBeInTheDocument();
    expect(screen.getByText('году выпуска')).toBeInTheDocument();
    expect(screen.getByText('жанру')).toBeInTheDocument();

    // Проверяем счётчики
    expect(screen.getByText('2')).toBeInTheDocument(); // количество авторов (Artist A, Artist B)
    expect(screen.getByText('2')).toBeInTheDocument(); // количество годов (2020, 2021)
    expect(screen.getByText('3')).toBeInTheDocument(); // количество жанров (rock, pop, jazz)

    // Проверяем элемент сортировки
    expect(screen.getByText('названию')).toBeInTheDocument();
  });
});
