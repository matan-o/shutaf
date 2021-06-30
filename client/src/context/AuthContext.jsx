import { createContext, useEffect, useState } from "react";
import storage from "../utils/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const cookie = storage.getItem("token");
    setIsUser(cookie && cookie.length > 0);
    setIsAdmin(storage.getItem("isAdmin") == 1);
    setUserId(storage.getItem("userId"));
  }, []);

  const login = (jwt, admin, id) => {
    setIsUser(true);
    setIsAdmin(admin);
    storage.setItem("token", jwt, 1);
    storage.setItem("isAdmin", admin ? "1" : "0", 1);
    storage.setItem("userId", id, 1);
    setUserId(id);
  };

  const logout = () => {
    storage.deleteItem("token");
    storage.deleteItem("isAdmin");
    storage.deleteItem("userId");
    setIsUser(false);
    setIsAdmin(false);
    setUserId("");
  };

  const state = {
    user,
    setUser,
    isUser,
    userId,
    isAdmin,
    login,
    logout,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
