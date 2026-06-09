'use client'
import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Локальная валидация
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

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      setIsLoading(false);
      return;
    }

    if (!formData.name) {
      setError('Введите имя пользователя');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://webdev-music-003b5b991590.herokuapp.com/user/signup/", {
        method: "POST",
        body: JSON.stringify({
            email: formData.login,
            password: formData.password,
            username: formData.login,
        }),
        headers: {
            // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
            "content-type": "application/json",
        },
      })
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка регистрации');
      }
      const data = await response.json();
      // Перенаправление после успешной регистрации
      window.location.href = '/auth/signin';
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
      <div className={styles.wrapper}>
        <div className={styles.containerEnter}>
          <div className={styles.modal__block}>
            <form className={styles.modal__form} onSubmit={handleSubmit}>
              <Link href="/music/main">
                <div className={styles.modal__logo}>
                  <img src="/image/logo_modal.png" alt="logo" />
                </div>
              </Link>
              <input
                className={styles.modal__input}
                type="text"
                name="name"
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
              />
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
                  styles.modal__btnSignupEnt,
                  isLoading && styles.modal__btnLoading
                )}
                disabled={isLoading}
              >
                {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
