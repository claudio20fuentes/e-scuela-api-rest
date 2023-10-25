// create context and provider
import React, { createContext, useEffect, useState } from "react";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { getAllBloques } from "@services/bloquesServices";
import { getOneProfesor } from "@services/profesoresServices";

import { formatDate } from "@utils/formatter";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({
    name: "",
    mail: "",
    phone: "",
    roleId: 5,
  });
  const [userBloques, setUserBloques] = useState([]);
  const [date, setDate] = useState({ day: "", time: "", fullDate: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setUserData();
    setDateContext();
  }, []);

  const setDateContext = (date) => {
    const formattedDate = formatDate(date);
    if (formattedDate) {
      setDate(formattedDate);
    }
  };

  const getBloques = async (query = false, date = false) => {
    const bloques = await getAllBloques(query, date);
    console.log(bloques)
    setUserBloques(bloques);
  };

  const setUserData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        jwt(token);
      } catch (error) {
        localStorage.clear();
        navigate("/auth/login");
        window.location.reload(true);
      }
      localStorage.setItem("token", token);
      const userDecoded = jwt(token);
      if (userDecoded) {
        await getBloques();
        setUser(userDecoded);
      }
    } else {
      localStorage.clear();
      navigate("/auth/login");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setUserData,
        userBloques,
        getBloques,
        setDateContext,
        date,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
