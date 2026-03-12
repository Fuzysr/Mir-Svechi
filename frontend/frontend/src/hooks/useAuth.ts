import { useState, useCallback } from 'react';
import type { User } from '../types';

const AUTH_KEY = 'mir-svechi-auth';

function loadUser(): User | null {
  try {
    const saved = localStorage.getItem(AUTH_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(loadUser);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const login = useCallback((email: string, _password: string) => {
    const mockUser: User = {
      id: 'user-1',
      email,
      name: email.split('@')[0],
      phone: '+7 (900) 000-00-00',
      role: email === 'admin@mirsvchi.ru' ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    setShowAuthModal(false);
    return mockUser;
  }, []);

  const register = useCallback((name: string, email: string, phone: string, _password: string) => {
    const mockUser: User = {
      id: 'user-' + Date.now(),
      email,
      name,
      phone,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    setShowAuthModal(false);
    return mockUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  const openAuthModal = useCallback(() => setShowAuthModal(true), []);
  const closeAuthModal = useCallback(() => setShowAuthModal(false), []);

  return { user, login, register, logout, showAuthModal, openAuthModal, closeAuthModal };
}
