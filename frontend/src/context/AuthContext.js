'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import API from '../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      API.get('/auth/profile')
        .then((res) => setUser(res.data))
        .catch(() => Cookies.remove('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    Cookies.set('token', data.token, { expires: 7 });
    setUser(data);
    return data;
  };

  const register = async (name, email, password, phone) => {
    const { data } = await API.post('/auth/register', { name, email, password, phone });
    Cookies.set('token', data.token, { expires: 7 });
    setUser(data);
    return data;
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
