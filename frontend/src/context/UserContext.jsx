// create context and provider
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getAllBloques } from "@services/bloquesServices";
import { getOneProfesor } from "@services/profesoresServices";

import { formatDate } from "@utils/formatter";
import jwt from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({
    name: "",
    mail: "",
    phone: "",
    roleId: 5,
  });
  const [success, setSuccess] = useState({});
  const [userBloques, setUserBloques] = useState([]);
  const [date, setDate] = useState({ day: "", time: "", fullDate: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setUserData();
    setDateContext();
  }, []);

  useEffect(() => {
    if(success.estado){
      setTimeout(() => {
        setSuccess({ estado: false, message: "" });
      }, 4000);
    }
  }, [success]);

  const setDateContext = (date) => {
    const formattedDate = formatDate(date);
    if (formattedDate) {
      setDate(formattedDate);
    }
  };

  const getBloques = async (query = false, date = false) => {
    const bloques = await getAllBloques(query, date);
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
    <>
      <UserContext.Provider
        value={{
          user,
          setUser,
          setUserData,
          userBloques,
          getBloques,
          setDateContext,
          date,
          success,
          setSuccess,
        }}
      >
        {props.children}
      </UserContext.Provider>
      {success.estado && (
        <Alert
          variant="filled"
          severity="success"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9999,
            color: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {success.message}
        </Alert>
      )}
    </>
  );
};
