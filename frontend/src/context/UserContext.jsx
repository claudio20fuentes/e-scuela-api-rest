// create context and provider
import React, { createContext, useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUserData();
  }, []);

  
  function setUserData() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        jwt(token);
      } catch (error) {
        localStorage.clear();
        navigate('/auth/login');
        window.location.reload(true);
      }
      localStorage.setItem('token', token);
      const info = jwt(token);
      if (info) {
        setUser(info);
      }
    } else {
      localStorage.clear();
      navigate('/auth/login');
    }
  }

  return (
    <UserContext.Provider value={{ user, setUserData, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
