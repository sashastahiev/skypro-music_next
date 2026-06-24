import { fireEvent, render, screen } from '@testing-library/react';
import MenuNav from './MenuNav';

jest.mock('next/link', () => {
    const MockLink = ({ href, children, onClick, ...rest }: any) => (
        <a href={href} onClick={onClick} {...rest}>
            {children}
        </a>
    );
    MockLink.displayName = 'MockLink';
    return MockLink;
});

jest.mock('next/image', () => {
    const MockImage = ({ src, alt, ...rest }: any) => (
        <img src={src} alt={alt} {...rest} />
    );
    MockImage.displayName = 'MockImage';
    return MockImage;
});

jest.mock('@/utils/logout', () => ({
    logout: jest.fn(),
}));

const mockToggleTheme = jest.fn();

function mockTheme(theme: 'light' | 'dark') {
    jest.mock('@/context/ThemeContext', () => ({
        useTheme: () => ({ theme, toggleTheme: mockToggleTheme }),
    }));
}

jest.mock('@/context/ThemeContext', () => ({
    useTheme: () => ({ theme: 'dark', toggleTheme: mockToggleTheme }),
}));

const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, value: string) => {
            store[key] = value;
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
    localStorageMock.clear();
    mockToggleTheme.mockClear();
    jest.resetModules();
});

describe('MenuNav — рендер', () => {
    test('логотип отображается и ведёт на /music/main', () => {
        render(<MenuNav />);
        const logo = screen.getByRole('img', { name: /logo/i });
        expect(logo).toBeInTheDocument();
        expect(logo.closest('a')).toHaveAttribute('href', '/music/main');
    });

    test('навигационные ссылки присутствуют', () => {
        render(<MenuNav />);
        expect(screen.getByRole('link', { name: /главное/i })).toHaveAttribute(
            'href',
            '/',
        );
        expect(
            screen.getByRole('link', { name: /мой плейлист/i }),
        ).toHaveAttribute('href', '/music/favourite');
    });

    test('кнопка-бургер присутствует', () => {
        render(<MenuNav />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});

describe('MenuNav — бургер-меню', () => {
    test('меню изначально закрыто (aria-expanded="false")', () => {
        render(<MenuNav />);
        expect(screen.getByRole('button')).toHaveAttribute(
            'aria-expanded',
            'false',
        );
    });

    test('клик по бургеру открывает меню', () => {
        render(<MenuNav />);
        const burger = screen.getByRole('button');
        fireEvent.click(burger);
        expect(burger).toHaveAttribute('aria-expanded', 'true');
    });

    test('повторный клик закрывает меню', () => {
        render(<MenuNav />);
        const burger = screen.getByRole('button');
        fireEvent.click(burger);
        fireEvent.click(burger);
        expect(burger).toHaveAttribute('aria-expanded', 'false');
    });
});

describe('MenuNav — авторизация', () => {
    test('показывает "Войти", если email отсутствует в localStorage', () => {
        render(<MenuNav />);
        expect(
            screen.getByRole('link', { name: /войти/i }),
        ).toBeInTheDocument();
    });

    test('показывает "Выйти", если email есть в localStorage', () => {
        localStorageMock.setItem('email', 'user@example.com');
        render(<MenuNav />);
        expect(
            screen.getByRole('link', { name: /выйти/i }),
        ).toBeInTheDocument();
    });

    test('ссылка авторизации ведёт на /auth/signin', () => {
        render(<MenuNav />);
        const authLink = screen.getByRole('link', { name: /войти/i });
        expect(authLink).toHaveAttribute('href', '/auth/signin');
    });
});

describe('MenuNav — тема', () => {
    test('в тёмной теме логотип использует logo.png', () => {
        render(<MenuNav />); // тёмная тема по умолчанию
        const logo = screen.getByRole('img', { name: /logo/i });
        expect(logo).toHaveAttribute('src', '/image/logo.png');
    });

    test('клик по SVG вызывает toggleTheme', () => {
        render(<MenuNav />);
        const { container } = render(<MenuNav />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        fireEvent.click(svg!);
        expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
});
