'use client'
import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { useApi } from '@/ts/api';
import { useRouter } from 'next/navigation';

export default function SignUp() { 
  const router = useRouter();
  const { fetchGetToken, fetchSignUp} = useApi();
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    name: ''
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
      await fetchSignUp(formData.login, formData.password, formData.name);
      localStorage.setItem('email', formData.login)
      localStorage.setItem('name',formData.name)
      const access = await fetchGetToken(formData.login,formData.password)
      localStorage.setItem('access',access);
      router.push('/music/main');
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
  );
}
