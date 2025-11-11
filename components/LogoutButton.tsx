'use client';

import { useRouter } from 'next/navigation';
import styles from './LogoutButton.module.css';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={handleLogout} className={styles.button}>
      Logout
    </button>
  );
}
