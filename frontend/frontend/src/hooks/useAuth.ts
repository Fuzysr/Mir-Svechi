import { useState, useCallback, useEffect } from 'react';
import type { User } from '../types';
import { apiLogin, apiRegister, apiGetMe, saveTokens, clearTokens, getAccessToken } from '../services/api';

const USER_KEY = 'mir-svechi-auth';

function loadCachedUser(): User | null {
  try {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(loadCachedUser);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (token && !user) {
      apiGetMe()
        .then((u) => {
          const mapped: User = {
            id: u.id,
            email: u.email,
            name: u.name,
            phone: u.phone,
            role: u.role,
            createdAt: u.created_at,
          };
          localStorage.setItem(USER_KEY, JSON.stringify(mapped));
          setUser(mapped);
        })
        .catch(() => {
          clearTokens();
          localStorage.removeItem(USER_KEY);
        });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const tokens = await apiLogin(email, password);
    saveTokens(tokens.access_token, tokens.refresh_token);
    const u = await apiGetMe();
    const mapped: User = {
      id: u.id,
      email: u.email,
      name: u.name,
      phone: u.phone,
      role: u.role,
      createdAt: u.created_at,
    };
    localStorage.setItem(USER_KEY, JSON.stringify(mapped));
    setUser(mapped);
    setShowAuthModal(false);
    return mapped;
  }, []);

  const register = useCallback(async (name: string, email: string, phone: string, password: string) => {
    const tokens = await apiRegister(name, email, phone, password);
    saveTokens(tokens.access_token, tokens.refresh_token);
    const u = await apiGetMe();
    const mapped: User = {
      id: u.id,
      email: u.email,
      name: u.name,
      phone: u.phone,
      role: u.role,
      createdAt: u.created_at,
    };
    localStorage.setItem(USER_KEY, JSON.stringify(mapped));
    setUser(mapped);
    setShowAuthModal(false);
    return mapped;
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const openAuthModal = useCallback(() => setShowAuthModal(true), []);
  const closeAuthModal = useCallback(() => setShowAuthModal(false), []);

  return { user, login, register, logout, showAuthModal, openAuthModal, closeAuthModal };
}
