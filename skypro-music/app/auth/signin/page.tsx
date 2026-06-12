'use client'
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

export default function Signin() {
  localStorage.setItem('access','undefined')
  const [formData, setFormData] = useState({
    login: '',
    password: ''
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

    try {
      const response = await fetch("https://webdev-music-003b5b991590.herokuapp.com/user/login/", {
        method: "POST",
        body: JSON.stringify({
          email: formData.login,
          password: formData.password
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Проверка HTTP-статуса
      if (!response.ok) {
        // Обрабатываем разные коды ошибок
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
      if (data.message) {
        // Например, сервер может вернуть сообщение об успешной авторизации
        console.log('Успех:', data.message);
      }
      localStorage.setItem('email', formData.login)
      localStorage.setItem('password', formData.password)
      localStorage.setItem('name',data.username)
      const access = await fetch("https://webdev-music-003b5b991590.herokuapp.com/user/token/", {
        method: "POST",
        body: JSON.stringify({
          email: formData.login,
          password: formData.password
        }),
        headers: {
          // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
      localStorage.setItem('access',access.access);
      // Перенаправление после успешного входа
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
      <div className={styles.wrapper}>
        <div className={styles.containerEnter}>
          <div className={styles.modal__block}>
            <form className={styles.modal__form} onSubmit={handleSubmit}>
              <a href="/music/main">
                <div className={styles.modal__logo}>
                  <img src="/image/logo_modal.png" alt="logo" />
                </div>
              </a>
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
          </div>
        </div>
      </div>
  );
}
