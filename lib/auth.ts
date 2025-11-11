import { cookies } from 'next/headers';

export interface User {
  username: string;
}

// Simple credential check - in production, use proper password hashing
const VALID_USERS = new Map([
  ['cankat', 'cankat123'],
  ['alperen', 'alperen123']
]);

export async function validateCredentials(username: string, password: string): Promise<boolean> {
  const validPassword = VALID_USERS.get(username);
  return validPassword === password;
}

export async function setAuthCookie(username: string) {
  const cookieStore = await cookies();
  cookieStore.set('auth_user', username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
}

export async function getAuthUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const username = cookieStore.get('auth_user')?.value;

  if (!username || !VALID_USERS.has(username)) {
    return null;
  }

  return { username };
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_user');
}
