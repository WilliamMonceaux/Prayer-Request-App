'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const res = await fetch('/api/auth/me');

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          console.error(
            'Server sent HTML instead of JSON. Check the Network tab. Error:',
            text
          );
          return;
        }

        const data = await res.json();

        if (res.ok && data.user) {
          setCurrentUser(data.user);
        }
      } catch (err) {
        console.error('Session check failed', err);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const handleUpdateUser = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, handleUpdateUser, loading, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
