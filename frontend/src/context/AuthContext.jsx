import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchWithAuth from '../utils/fetchWithAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accesstoken, setAccessToken] = useState(() => localStorage.getItem('accesstoken'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = (token) => {
    console.log('🔓 Login called with token:', token);
    localStorage.setItem('accesstoken', token);
    setAccessToken(token);
    navigate('/dashboard');
  };

  const logout = async () => {
    console.log('🔒 Logging out user...');
    try {
      await fetch('http://localhost:5000/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      console.log('Logout request sent.');

    } catch (err) {
      console.error('Logout error:', err);
      console.error('Logout error:', err);
    }
    localStorage.removeItem('accesstoken');
    setAccessToken(null);
    setUser(null);
    navigate('/login');
  };

  const fetchUser = async () => {
    try {
      const res = await fetchWithAuth('http://localhost:5000/api/users/me', {}, login, logout);
      if (!res.ok) throw new Error('Failed to fetch user');
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error('AuthContext: fetchUser error', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect triggered. accesstoken =', accesstoken);
    if (accesstoken) {
      console.log('Attempting to fetch user info...');
      fetchUser();
    } else {
       console.log(' No access token found. Skipping fetchUser.');
      setLoading(false);
    }
  }, [accesstoken]);

  const value = {
    accesstoken,
    user,
    login,
    logout,
    isAuthenticated: !!accesstoken,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
