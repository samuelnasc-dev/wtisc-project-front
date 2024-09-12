import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    // Se o valor for 'undefined' ou 'null', o JSON.parse vai falhar, então usamos um try-catch
    try {
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Erro ao fazer parse do usuário do localStorage:", error);
      return null;
    }
  });

  const updateUser = (data) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
