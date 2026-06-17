'use client'
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { useApi } from '@/ts/api';

export default function Signin() {
  const {fetchSignIn, fetchGetToken} = useApi();
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.login) {
      setError('Введите почту');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(formData.login)) {
      setError('Некорректный формат почты');
      setIsLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Введите пароль');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetchSignIn(formData.login, formData.password);
      if (!response.ok) {
        switch (response.status) {
          case 400:
            setError('Неверные данные для входа');
            break;
          case 401:
            setError('Неверный email или пароль');
            break;
          case 404:
            setError('Сервер не найден');
            break;
          case 500:
            setError('Внутренняя ошибка сервера');
            break;
          default:
            setError(`Ошибка ${response.status}: проблема с авторизацией`);
        }
        setIsLoading(false);
        return;
      }
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setIsLoading(false);
        return;
      }
      localStorage.setItem('email', formData.login)
      const access = await fetchGetToken(formData.login,formData.password)
      localStorage.setItem('access',access);
      window.location.href = '/music/main';
    } catch (error: unknown) {
      let errorMessage = 'Произошла непредвиденная ошибка';
      if (error instanceof TypeError) {
        errorMessage = 'Ошибка сети: проверьте подключение к интернету';
      } else if (error instanceof SyntaxError) {
        errorMessage = 'Ошибка парсинга ответа сервера';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form className={styles.modal__form} onSubmit={handleSubmit}>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/image/logo_modal.png" alt="logo" />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        value={formData.login}
        onChange={handleChange}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChange}
      />
      {error && (
        <div className={styles.errorContainer}>
          <span className={styles.errorMessage}>{error}</span>
        </div>
      )}
      <button
        className={classNames(
          styles.modal__btnEnter,
          isLoading && styles.modal__btnLoading
        )}
        disabled={isLoading}
      >
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
      <Link href="/auth/signup" className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </form>
  );
}
