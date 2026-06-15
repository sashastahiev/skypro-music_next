// components/Layout.tsx
'use client'
import styles from './layout.module.css';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
    <div className={styles.wrapper}>
        <div className={styles.containerEnter}>
          <div className={styles.modal__block}>
             <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}