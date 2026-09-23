import { base44 } from '@/api/base44Client';

export async function getCurrentUser() {
  try {
    const user = await base44.auth.me();
    return user;
  } catch {
    return null;
  }
}

export async function isLoggedIn() {
  return await base44.auth.isAuthenticated();
}

export function logout(redirectUrl = '/') {
  base44.auth.logout(redirectUrl);
}