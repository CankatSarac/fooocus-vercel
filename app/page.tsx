import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth';
import FooocusFrame from '@/components/FooocusFrame';
import LogoutButton from '@/components/LogoutButton';
import styles from './page.module.css';

export default async function HomePage() {
  const user = await getAuthUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Fooocus Platform</h1>
        <div className={styles.userInfo}>
          <span className={styles.username}>Welcome, {user.username}</span>
          <LogoutButton />
        </div>
      </header>
      <main className={styles.main}>
        <FooocusFrame />
      </main>
    </div>
  );
}
