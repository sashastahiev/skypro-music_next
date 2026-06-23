import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuNav from './MenuNav';

// Мокируем зависимости
jest.mock('next/link', () => {
  const MockLink = ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('next/image', () => {
  const MockImage = (props: any) => <img {...props} />;
  MockImage.displayName = 'MockImage';
  return MockImage;
});

jest.mock('@/utils/logout', () => ({
  logout: jest.fn(),
}));

jest.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme: jest.fn() }),
}));

describe('MenuNav Component', () => {
  it('должен корректно рендериться и отображать основные элементы', () => {
    render(<MenuNav />);

    // Проверяем наличие навигационного элемента
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    // Проверяем логотип
    const logoLink = screen.getByRole('link', { name: /logo/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/music/main');

    // Проверяем кнопку бургера
    const burgerButton = screen.getByRole('button', {
      name: /(span){3}/i, // Ищем кнопку с тремя спанами (бургер)
    });
    expect(burgerButton).toBeInTheDocument();
    expect(burgerButton).toHaveAttribute('aria-expanded', 'false');

    // Проверяем пункты меню
    const menuList = screen.getByRole('list');
    const menuItems = within(menuList).getAllByRole('listitem');
    expect(menuItems).toHaveLength(3);

    // Проверяем ссылки в меню
    expect(screen.getByRole('link', { name: 'Главное' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Мой плейлист' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Войти' })).toBeInTheDocument();
  });
});

it('должен открывать/закрывать меню при клике на бургер и менять тему', async () => {
  const mockToggleTheme = jest.fn();

  jest.mock('@/context/ThemeContext', () => ({
    useTheme: () => ({ theme: 'light', toggleTheme: mockToggleTheme }),
  }));

  render(<MenuNav />);
  const user = userEvent.setup();

  // Проверяем начальное состояние — меню закрыто
  expect(screen.queryByRole('list')).not.toHaveClass('menu__open');

  // Кликаем на бургер для открытия меню
  const burgerButton = screen.getByRole('button');
  await user.click(burgerButton);

  // Проверяем, что меню открылось
  expect(burgerButton).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('list')).toHaveClass('menu__open');

  // Снова кликаем на бургер — закрываем меню
  await user.click(burgerButton);
  expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getByRole('list')).not.toHaveClass('menu__open');

  // Кликаем на иконку смены темы
  const themeIcon = screen.getByRole('img', { hidden: true }); // SVG может не иметь явного role
  await user.click(themeIcon);

  // Проверяем вызов функции смены темы
  expect(mockToggleTheme).toHaveBeenCalledTimes(1);
});
