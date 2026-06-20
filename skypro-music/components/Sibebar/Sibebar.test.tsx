import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sibebar from './Sibebar';
import { useTheme } from '@/context/ThemeContext';

// Мокируем зависимости
jest.mock('@/utils/logout', () => ({
  logout: jest.fn()
}));

// Сохраняем оригинальные методы localStorage для восстановления после тестов
const originalGetItem = localStorage.getItem;

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  // Восстанавливаем оригинальный localStorage
  localStorage.getItem = originalGetItem;
});

describe('Sidebar Component', () => {
  const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

  test('должен корректно отображать sidebar в светлой теме с именем из localStorage', () => {
    // Мокаем useTheme для светлой темы
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: function (): void {
        throw new Error('Function not implemented.');
      }
    });

    // Мокаем localStorage с email
    localStorage.getItem = jest.fn().mockReturnValue('test@example.com');

    render(<Sibebar />);

    // Проверяем фон (светлая тема)
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toHaveStyle('background-color: white');

    // Проверяем отображение имени пользователя
    expect(screen.getByText('test@example.com')).toBeInTheDocument();

    // Проверяем наличие иконок плейлистов
    const playlistImages = screen.getAllByAltText('day\'s playlist');
    expect(playlistImages).toHaveLength(3);
  });

  test('должен отображать "Гость" если email отсутствует в localStorage', () => {
    // Мокаем useTheme для тёмной темы
    mockUseTheme.mockReturnValue({
        theme: 'dark',
        toggleTheme: function (): void {
            throw new Error('Function not implemented.');
        }
    });

    // Мокаем localStorage без email
    localStorage.getItem = jest.fn().mockReturnValue(null);

    render(<Sibebar />);

    // Проверяем фон (тёмная тема)
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toHaveStyle('background-color: black');

    // Проверяем отображение "Гость"
    expect(screen.getByText('Гость')).toBeInTheDocument();
  });

  test('должен вызывать функцию logout при клике на кнопку выхода', async () => {
    const mockLogout = jest.fn();
    jest.mock('@/utils/logout', () => ({ logout: mockLogout }));

    mockUseTheme.mockReturnValue({
        theme: 'light',
        toggleTheme: function (): void {
            throw new Error('Function not implemented.');
        }
    });
    localStorage.getItem = jest.fn().mockReturnValue('user@example.com');

    render(<Sibebar />);

    // Находим ссылку выхода (по тексту или атрибутам)
    const logoutLink = screen.getByRole('link', {
      name: /.*logout.*|.*logoutLight.*/i
    });

    await userEvent.click(logoutLink);

    // Проверяем вызов функции logout
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
